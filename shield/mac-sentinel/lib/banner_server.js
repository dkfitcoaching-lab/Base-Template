// SHIELD Mac Sentinel — network deterrent banner server.
//
// Serves a short HTML notice on port 80 of the local interface (disabled
// by default). Any device on the LAN that browses to this Mac's IP will
// see the notice. This is pure deterrence — it does not block, filter,
// or redirect traffic. It exists to make it clear to anyone probing the
// network that it is actively monitored and that unauthorized access is
// a federal and state crime.
//
// Port 80 requires root on macOS (privileged port). The sentinel runs
// as the user under LaunchAgent, so by default this server is DISABLED
// in config/defaults.json. To enable it, an operator must either:
//   a) run the sentinel as a LaunchDaemon (system scope) — documented
//      in docs/DEPLOY.md under "Advanced: deterrent banner"
//   b) bind to an unprivileged port (8080) and set up pf redirection
//      from 80 → 8080
//
// When bind fails, we log and return a disabled handle so the rest of
// the sentinel continues unaffected.
//
// Legal note: publishing this notice on your own network is legitimate
// and well-tested. See docs/LEGAL.md.

'use strict';

const http = require('http');
const { nowIso } = require('./crypto');

const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NOTICE</title>
<style>
:root { color-scheme: dark; }
* { box-sizing: border-box; }
body {
  margin: 0; padding: 48px 24px;
  background: #0A0A0C; color: #F0ECE6;
  font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
}
.card {
  max-width: 680px;
  width: 100%;
  background: #111115;
  border: 1px solid #24242B;
  border-left: 4px solid #C23B22;
  border-radius: 12px;
  padding: 40px 36px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
}
.label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #C23B22; font-weight: 700; margin-bottom: 8px; }
h1 { font-size: 22px; font-weight: 600; margin: 0 0 20px; letter-spacing: -0.01em; color: #F0ECE6; }
p { font-size: 14px; line-height: 1.7; color: #D4CFC8; margin: 0 0 14px; }
.code { font-family: 'SF Mono', Menlo, Monaco, monospace; font-size: 12px; color: #908A84; border-top: 1px solid #24242B; padding-top: 16px; margin-top: 24px; }
strong { color: #F0ECE6; font-weight: 600; }
</style>
</head>
<body>
<div class="card">
<div class="label">Notice</div>
<h1>This network is monitored by an active intrusion detection system.</h1>
<p>All connections to this computer are recorded with device identifiers, timestamps, and cryptographic integrity verification. Records are preserved in a hash-chained, tamper-evident ledger suitable for submission to law enforcement.</p>
<p>Unauthorized access to, or use of, this computer or the network to which it is attached is a violation of the United States Computer Fraud and Abuse Act (<strong>18 U.S.C. § 1030</strong>) and Ohio Revised Code <strong>§ 2913.04</strong>. Penalties include federal and state criminal prosecution.</p>
<p>If you have reached this page in error, disconnect now.</p>
<div class="code">
Observation started: __OBSERVED_SINCE__<br>
Request logged: __NOW__<br>
Source: __SOURCE_IP__
</div>
</div>
</body>
</html>
`;

class BannerServer {
  /**
   * @param {object} ctx
   * @param {object} ctx.config      bannerServer block from config
   * @param {function} ctx.append    ledger.append
   * @param {string} ctx.observedSince  ISO timestamp when SHIELD was installed
   */
  constructor(ctx) {
    this.config = ctx.config || {};
    this.append = ctx.append;
    this.observedSince = ctx.observedSince;
    this.server = null;
    this.recentIps = new Map(); // ip -> lastServedAt (for dedup in log)
    this.running = false;
  }

  /**
   * Attempt to start. On failure (almost always: EACCES on port 80),
   * we log once and return quietly. Other parts of the sentinel are
   * unaffected.
   */
  async start() {
    if (!this.config.enabled) return { started: false, reason: 'disabled-in-config' };
    const port = this.config.port || 80;
    const host = this.config.bindAddress || '0.0.0.0';
    return new Promise((resolve) => {
      try {
        this.server = http.createServer((req, res) => this._handle(req, res));
        this.server.on('error', (err) => {
          this.append('BANNER_SERVER_ERROR', 'LOW', {
            error: err.code || err.message,
            port, host,
            message: err.code === 'EACCES'
              ? 'Banner server requires root to bind port 80. Install as LaunchDaemon to enable.'
              : 'Banner server bind failed.',
          });
          this.server = null;
          this.running = false;
          resolve({ started: false, reason: err.code || 'error' });
        });
        this.server.listen(port, host, () => {
          this.running = true;
          this.append('BANNER_SERVER_STARTED', 'INFO', { port, host });
          resolve({ started: true, port, host });
        });
      } catch (err) {
        this.append('BANNER_SERVER_ERROR', 'LOW', { error: err.message });
        resolve({ started: false, reason: err.message });
      }
    });
  }

  async stop() {
    if (this.server) {
      return new Promise((resolve) => this.server.close(() => { this.running = false; resolve(); }));
    }
  }

  _handle(req, res) {
    const ip = (req.socket && req.socket.remoteAddress) || 'unknown';
    const now = Date.now();
    const last = this.recentIps.get(ip) || 0;
    // Dedup per IP to 15 minutes — avoid filling the ledger from a
    // single curious client hitting refresh.
    if (now - last > 15 * 60 * 1000) {
      this.recentIps.set(ip, now);
      this.append('BANNER_SERVED', 'INFO', { ip, method: req.method, url: req.url });
    }
    const body = HTML_TEMPLATE
      .replace('__OBSERVED_SINCE__', this.observedSince || 'unknown')
      .replace('__NOW__', nowIso())
      .replace('__SOURCE_IP__', ip.replace(/[^0-9a-fA-F:.]/g, ''));
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
    });
    res.end(body);
  }
}

module.exports = BannerServer;
