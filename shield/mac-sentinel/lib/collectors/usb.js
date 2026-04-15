// USB device collector.
//
// Enumerates every USB device via system_profiler SPUSBDataType.
// A new unknown USB device is a physical-access warning (juice-jacking,
// hostile cable, BadUSB, HID injection). Flagged as MEDIUM on first
// appearance; whitelist via the PWA.

'use strict';

const { run } = require('../shell');

function walkUsb(tree, out, depth = 0) {
  if (!tree) return;
  if (Array.isArray(tree)) {
    for (const item of tree) walkUsb(item, out, depth);
    return;
  }
  if (typeof tree !== 'object') return;
  if (tree._name) {
    out.push({
      name: tree._name,
      manufacturer: tree.manufacturer || null,
      vendorId: tree.vendor_id || null,
      productId: tree.product_id || null,
      serial: tree.serial_num || null,
      location: tree.location_id || null,
      speed: tree.device_speed || null,
      bcdDevice: tree.bcd_device || null,
      fingerprint: [tree.vendor_id, tree.product_id, tree.serial_num, tree.location_id].filter(Boolean).join('/'),
    });
  }
  if (tree._items) walkUsb(tree._items, out, depth + 1);
}

async function collect() {
  const res = await run('/usr/sbin/system_profiler', ['SPUSBDataType', '-json'], { timeout: 10000 });
  if (res.code !== 0 || !res.stdout) {
    return { available: false, devices: [], error: res.error || 'system_profiler failed' };
  }
  let parsed;
  try { parsed = JSON.parse(res.stdout); } catch (err) {
    return { available: false, devices: [], error: 'parse failed: ' + err.message };
  }
  const root = parsed?.SPUSBDataType || [];
  const devices = [];
  walkUsb(root, devices);
  return {
    available: true,
    devices,
    count: devices.length,
    collectedAt: new Date().toISOString(),
  };
}

module.exports = { collect };
