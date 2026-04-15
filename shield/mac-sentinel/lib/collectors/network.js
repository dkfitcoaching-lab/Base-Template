// Network collector — LAN devices, Wi-Fi state, open sockets.
//
// Sources:
//   arp -an                    ARP cache (IP, MAC, interface)
//   networksetup -listallhardwareports
//   /usr/sbin/networksetup -getairportnetwork <iface>
//   /System/Library/.../airport -I   (deprecated in recent macOS but still present on many)
//   ifconfig                   interface addresses
//   lsof -i -n -P              listening + established sockets with process
//   route -n get default       default gateway
//   scutil --dns               DNS resolvers

'use strict';

const { run, runLines } = require('../shell');

const AIRPORT_BIN = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';

/**
 * Parse `arp -an` output. Example line:
 *   ? (192.168.1.1) at ac:de:48:00:11:22 on en0 ifscope [ethernet]
 */
function parseArp(stdout) {
  const devices = [];
  const re = /^\?\s+\(([\d.]+)\)\s+at\s+([0-9a-f:]+|\(incomplete\))\s+on\s+(\S+)/i;
  for (const line of stdout.split('\n')) {
    const m = line.trim().match(re);
    if (!m) continue;
    const [, ip, mac, iface] = m;
    if (mac === '(incomplete)') continue;
    devices.push({
      ip,
      mac: mac.toLowerCase(),
      iface,
      fingerprint: `${mac.toLowerCase()}@${iface}`,
    });
  }
  return devices;
}

/**
 * Parse `ifconfig` for interface names, MACs, IPv4 addresses, link status.
 */
function parseIfconfig(stdout) {
  const ifaces = {};
  let current = null;
  for (const line of stdout.split('\n')) {
    const ifaceMatch = line.match(/^(\w+\d*): flags=/);
    if (ifaceMatch) {
      current = ifaceMatch[1];
      ifaces[current] = { name: current, mac: null, ipv4: [], status: 'unknown' };
      continue;
    }
    if (!current) continue;
    const etherMatch = line.match(/^\s*ether\s+([0-9a-f:]+)/i);
    if (etherMatch) ifaces[current].mac = etherMatch[1].toLowerCase();
    const inetMatch = line.match(/^\s*inet\s+([\d.]+)\s/);
    if (inetMatch) ifaces[current].ipv4.push(inetMatch[1]);
    const statusMatch = line.match(/^\s*status:\s+(\w+)/);
    if (statusMatch) ifaces[current].status = statusMatch[1];
  }
  return ifaces;
}

/**
 * Parse `airport -I` which outputs key:value lines.
 */
function parseAirport(stdout) {
  const out = {};
  for (const line of stdout.split('\n')) {
    const m = line.match(/^\s*(\w+):\s*(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return {
    ssid: out.SSID || null,
    bssid: out.BSSID || null,
    channel: out.channel || null,
    rssi: out.agrCtlRSSI || null,
    noise: out.agrCtlNoise || null,
    linkAuth: out.linkAuth || null,
    state: out.state || null,
  };
}

/**
 * Parse `lsof -i -n -P` into structured entries.
 * Columns: COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
 */
function parseLsof(stdout) {
  const conns = [];
  const lines = stdout.split('\n').slice(1); // drop header
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split(/\s+/);
    if (parts.length < 9) continue;
    const [cmd, pid, user, , , , , node, ...rest] = parts;
    const name = rest.join(' ');
    const state = name.includes('(LISTEN)') ? 'LISTEN'
                : name.includes('(ESTABLISHED)') ? 'ESTABLISHED'
                : name.includes('->') ? 'CONNECTED'
                : 'OTHER';
    conns.push({
      command: cmd,
      pid: parseInt(pid, 10) || null,
      user,
      proto: node,
      name,
      state,
    });
  }
  return conns;
}

/**
 * Find the Wi-Fi hardware port name from `networksetup -listallhardwareports`.
 */
function parseHardwarePorts(stdout) {
  const ports = {};
  const blocks = stdout.split(/\n\s*\n/);
  for (const block of blocks) {
    const nameMatch  = block.match(/Hardware Port:\s*(.+)/);
    const deviceMatch = block.match(/Device:\s*(\S+)/);
    const macMatch   = block.match(/Ethernet Address:\s*([0-9a-f:]+)/i);
    if (nameMatch && deviceMatch) {
      ports[nameMatch[1].trim()] = {
        port: nameMatch[1].trim(),
        device: deviceMatch[1].trim(),
        mac: macMatch ? macMatch[1].toLowerCase() : null,
      };
    }
  }
  return ports;
}

async function collect() {
  const [arpRes, ifconfigRes, lsofRes, hwRes, routeRes, dnsRes] = await Promise.all([
    run('/usr/sbin/arp', ['-an']),
    run('/sbin/ifconfig', []),
    run('/usr/sbin/lsof', ['-i', '-n', '-P', '-l'], { timeout: 15000 }),
    run('/usr/sbin/networksetup', ['-listallhardwareports']),
    run('/sbin/route', ['-n', 'get', 'default']),
    run('/usr/sbin/scutil', ['--dns']),
  ]);

  const arpDevices = parseArp(arpRes.stdout);
  const ifaces = parseIfconfig(ifconfigRes.stdout);
  const hardwarePorts = parseHardwarePorts(hwRes.stdout);
  const connections = parseLsof(lsofRes.stdout);

  // Wi-Fi state — try airport first, fall back silently.
  let wifi = null;
  const airportRes = await run(AIRPORT_BIN, ['-I'], { timeout: 4000 });
  if (airportRes.code === 0 && airportRes.stdout) {
    wifi = parseAirport(airportRes.stdout);
  }

  // Attempt to also pull SSID via networksetup for the Wi-Fi port.
  const wifiPort = Object.values(hardwarePorts).find(p => /wi-?fi|airport/i.test(p.port));
  if (wifiPort) {
    const nsRes = await run('/usr/sbin/networksetup', ['-getairportnetwork', wifiPort.device], { timeout: 4000 });
    const nsMatch = nsRes.stdout.match(/Current Wi-Fi Network:\s*(.+)/);
    if (nsMatch) {
      wifi = wifi || {};
      wifi.ssid = wifi.ssid || nsMatch[1].trim();
      wifi.device = wifiPort.device;
    }
  }

  // Parse default gateway.
  let gateway = null;
  const gwMatch = routeRes.stdout.match(/gateway:\s*([\d.]+)/);
  if (gwMatch) gateway = gwMatch[1];
  const gwIface = routeRes.stdout.match(/interface:\s*(\S+)/);

  // Parse DNS resolvers (just the first resolver block).
  const dnsServers = [];
  for (const m of dnsRes.stdout.matchAll(/nameserver\[\d+\]\s*:\s*([\d.a-f:]+)/g)) {
    dnsServers.push(m[1]);
  }

  // Count LISTEN sockets for quick alerting.
  const listeners = connections.filter(c => c.state === 'LISTEN');

  return {
    arp: arpDevices,
    interfaces: ifaces,
    hardwarePorts,
    wifi,
    gateway,
    gatewayIface: gwIface ? gwIface[1] : null,
    dnsServers: Array.from(new Set(dnsServers)),
    connections,
    listeners,
    listenerCount: listeners.length,
    connectionCount: connections.length,
    collectedAt: new Date().toISOString(),
  };
}

module.exports = { collect, parseArp, parseIfconfig, parseAirport, parseLsof, parseHardwarePorts };
