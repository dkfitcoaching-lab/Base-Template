// Login / authentication event collector.
//
// Sources:
//   last                       recent login session history
//   log show --last 1h --predicate '...' authentication events
//
// We're looking for:
//   - Recent successful and failed interactive logins
//   - SSH logins (if SSH is enabled, which it shouldn't be)
//   - sudo / su invocations
//   - screensharing sessions

'use strict';

const { run, runLines } = require('../shell');

async function collectLast(limit = 25) {
  const lines = await runLines('/usr/bin/last', ['-n', String(limit)], { timeout: 6000 });
  const out = [];
  for (const line of lines) {
    if (!line || /wtmp begins/i.test(line)) continue;
    // Columns are variable but typically:
    //   user  tty  host  date  [still logged in | - endtime (duration)]
    const parts = line.split(/\s+/);
    if (parts.length < 3) continue;
    out.push({
      user: parts[0],
      tty: parts[1],
      host: parts[2],
      when: parts.slice(3, 7).join(' '),
      raw: line,
    });
  }
  return out;
}

async function collectAuthLog(minutes = 60) {
  // `log show` is available to any user; it can show a surprising amount.
  // We scope to a short window to keep the call fast.
  const res = await run(
    '/usr/bin/log',
    ['show', '--last', `${minutes}m`, '--style', 'compact', '--predicate',
     'eventMessage CONTAINS[c] "authentication" OR eventMessage CONTAINS[c] "sudo" OR eventMessage CONTAINS[c] "su:" OR eventMessage CONTAINS[c] "login"'],
    { timeout: 30000, maxBuffer: 32 * 1024 * 1024 },
  );
  if (res.code !== 0) return { available: false, events: [], error: res.stderr?.trim() || res.error };
  const events = [];
  let failures = 0;
  let sudoCount = 0;
  for (const line of res.stdout.split('\n')) {
    if (!line.trim()) continue;
    if (/fail/i.test(line)) failures++;
    if (/sudo/i.test(line)) sudoCount++;
    // We keep the raw line; downstream UI can pretty-print.
    if (events.length < 200) events.push(line);
  }
  return { available: true, events, failures, sudoCount };
}

async function collect() {
  const [last, auth] = await Promise.all([
    collectLast(25),
    collectAuthLog(60),
  ]);
  return {
    last,
    auth,
    lastCount: last.length,
    authFailureCount: auth.failures || 0,
    authSudoCount: auth.sudoCount || 0,
    collectedAt: new Date().toISOString(),
  };
}

module.exports = { collect };
