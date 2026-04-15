// SHIELD PWA — main application wiring.
//
// Responsibilities:
//   - PIN setup / unlock / auto-lock
//   - Service worker registration
//   - View routing (dashboard / journal / harden / evidence / settings)
//   - Poll Mac Sentinel when paired, merge into UI state
//   - Journal entry creation with encrypted photo attachments
//   - Hardening checklist progress (stored encrypted)
//   - Kill switch via iOS Shortcut
//   - Evidence export (signed JSON + printable HTML)
//   - Danger-zone wipe

'use strict';

(function () {
  const UI = window.ShieldUI;
  const Crypto = window.ShieldCrypto;
  const Storage = window.ShieldStorage;
  const Ledger = window.ShieldLedger;
  const SentinelClient = window.ShieldSentinelClient;

  // ─── App state ───────────────────────────────────────────────────────
  const state = {
    key: null,                 // CryptoKey — in memory only
    ledger: null,              // ShieldLedger instance
    sentinel: null,            // ShieldSentinelClient
    sentinelTamper: null,      // bool | null
    sentinelStatus: null,      // latest /status response
    sentinelAlerts: [],
    checklist: {},             // { [id]: { done, at } }
    autoLockSeconds: 60,
    autoLockTimer: null,
    pollTimer: null,
    locked: true,
    wrongPinCount: 0,
    maxWrongPin: 10,
    settingsLoaded: null,
  };

  // ─── SW registration ─────────────────────────────────────────────────
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.error('SW registration failed:', err));
  }

  // ─── PIN / unlock ────────────────────────────────────────────────────
  async function boot() {
    const settings = await Storage.getAllSettings();
    state.settingsLoaded = settings;
    if (!settings.pinSalt || !settings.verifier) {
      // First run: setup
      setLockPrompt('Create a 6+ digit PIN');
      bindLockInput(async (pin) => {
        if (pin.length < 6) return setLockError('PIN must be at least 6 characters.');
        setLockPrompt('Confirm PIN');
        bindLockInput(async (confirm) => {
          if (confirm !== pin) return setLockError('PINs do not match. Starting over.');
          const salt = Crypto.randomBytes(Crypto.SALT_BYTES);
          const vSalt = Crypto.randomBytes(Crypto.SALT_BYTES);
          const verifier = await Crypto.makeVerifier(pin, vSalt);
          await Storage.setSetting('pinSalt', Array.from(salt));
          await Storage.setSetting('verifierSalt', Array.from(vSalt));
          await Storage.setSetting('verifier', verifier);
          await Storage.setSetting('autoLockSeconds', 60);
          await Storage.setSetting('createdAt', new Date().toISOString());
          await unlockWithPin(pin);
        });
      });
      return;
    }
    setLockPrompt('Enter your PIN');
    bindLockInput(async (pin) => {
      const ok = await tryUnlock(pin, settings);
      if (!ok) {
        state.wrongPinCount++;
        setLockError(`Wrong PIN. ${state.maxWrongPin - state.wrongPinCount} attempts remaining.`);
        if (state.wrongPinCount >= state.maxWrongPin) {
          setLockError('Too many wrong attempts. Wiping.');
          await Storage.wipeAll();
          setTimeout(() => location.reload(), 1500);
        }
      } else {
        state.wrongPinCount = 0;
      }
    });
  }

  async function tryUnlock(pin, settings) {
    const vSalt = Uint8Array.from(settings.verifierSalt);
    const candidate = await Crypto.makeVerifier(pin, vSalt);
    if (!Crypto.constantTimeEqual(candidate, settings.verifier)) return false;
    await unlockWithPin(pin);
    return true;
  }

  async function unlockWithPin(pin) {
    const settings = await Storage.getAllSettings();
    const salt = Uint8Array.from(settings.pinSalt);
    state.key = await Crypto.deriveKey(pin, salt);
    state.ledger = new Ledger(state.key);
    const ok = await state.ledger.load();
    if (!ok) {
      await state.ledger.append('LEDGER_TAMPER', 'CRITICAL', state.ledger.tamperInfo || { reason: 'unknown' });
    }
    await state.ledger.append('APP_OPEN', 'INFO', { ua: navigator.userAgent.slice(0, 180) });
    state.autoLockSeconds = settings.autoLockSeconds || 60;
    // Load checklist
    try {
      const rows = await Storage.getAllEncrypted('checklist', state.key);
      for (const r of rows) {
        if (r && r.id) state.checklist[r.id] = r;
      }
    } catch (err) {
      console.error('checklist load failed:', err);
    }
    // Sentinel: auto-init if paired
    if (settings.sentinelUrl && settings.sentinelFingerprint) {
      state.sentinel = new SentinelClient({
        url: settings.sentinelUrl,
        fingerprint: settings.sentinelFingerprint,
        pin,
      });
    }
    // Hydrate any cached Sentinel state from previous sessions so the
    // dashboard shows something even if we're currently off-network.
    await hydrateFromCache();
    state.locked = false;
    UI.showLock(false);
    UI.showView('dashboard');
    refreshAll();        // render cached state immediately
    startPolling();      // then try to refresh live
    armAutoLock();
  }

  function lockNow() {
    if (state.ledger) state.ledger.append('APP_LOCK', 'INFO', {});
    state.key = null;
    state.ledger = null;
    state.sentinel = null;
    state.sentinelStatus = null;
    state.sentinelAlerts = [];
    state.checklist = {};
    state.locked = true;
    if (state.pollTimer) { clearInterval(state.pollTimer); state.pollTimer = null; }
    if (state.autoLockTimer) { clearTimeout(state.autoLockTimer); state.autoLockTimer = null; }
    UI.showLock(true);
    document.getElementById('pin-input').value = '';
    setLockPrompt('Enter your PIN');
    setLockError('');
    // Force full reload for cleanliness (wipes in-memory key fully).
    setTimeout(() => location.reload(), 100);
  }

  function setLockPrompt(msg) { document.getElementById('lock-prompt').textContent = msg; }
  function setLockError(msg)  { document.getElementById('lock-error').textContent = msg; }

  function bindLockInput(handler) {
    const input = document.getElementById('pin-input');
    input.value = '';
    input.focus();
    const onKey = (e) => {
      if (e.key === 'Enter') {
        const val = input.value;
        input.value = '';
        handler(val);
      }
    };
    // Remove previous listener by replacing the node
    const clone = input.cloneNode(true);
    input.parentNode.replaceChild(clone, input);
    clone.addEventListener('keydown', onKey);
    clone.focus();
  }

  // ─── Auto-lock ───────────────────────────────────────────────────────
  function armAutoLock() {
    if (state.autoLockTimer) clearTimeout(state.autoLockTimer);
    state.autoLockTimer = setTimeout(lockNow, state.autoLockSeconds * 1000);
  }
  function resetAutoLock() {
    if (state.locked) return;
    armAutoLock();
  }
  ['click', 'touchstart', 'keydown', 'scroll'].forEach(ev =>
    document.addEventListener(ev, resetAutoLock, { passive: true }));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !state.locked) lockNow();
  });

  // ─── Polling ─────────────────────────────────────────────────────────
  async function startPolling() {
    if (state.pollTimer) clearInterval(state.pollTimer);
    state.pollTimer = setInterval(pollOnce, 10_000);
    pollOnce();
  }
  async function pollOnce() {
    if (state.sentinel) {
      const status = await state.sentinel.getStatus();
      if (status) {
        state.sentinelStatus = status;
        state.sentinelTamper = !!status.ledgerTampered;
        state.lastSentinelSyncAt = new Date().toISOString();
        // Cache the latest Sentinel state encrypted so it is available
        // the next time the PWA opens when off-network (driving, at
        // work, on cellular). We also cache alerts separately.
        try {
          await window.ShieldStorage.putEncrypted('settings_cache', state.key, 'sentinelStatus', {
            status,
            cachedAt: state.lastSentinelSyncAt,
          });
        } catch (err) { console.warn('cache write failed:', err.message); }
      }
      const alerts = await state.sentinel.getAlerts();
      if (Array.isArray(alerts)) {
        state.sentinelAlerts = alerts;
        try {
          await window.ShieldStorage.putEncrypted('settings_cache', state.key, 'sentinelAlerts', {
            alerts,
            cachedAt: state.lastSentinelSyncAt,
          });
        } catch {}
      }
      // Also persist the lastSync as a plaintext setting so we can
      // render "Last sync 3h ago" even before the user unlocks the key.
      try { await window.ShieldStorage.setSetting('lastSentinelSyncAt', state.lastSentinelSyncAt); } catch {}
    }
    refreshAll();
  }

  // Load any cached Sentinel state that was captured while on-network,
  // so when the user opens the PWA off-network the dashboard shows the
  // last-known posture rather than a blank card.
  async function hydrateFromCache() {
    try {
      const settings = await window.ShieldStorage.getAllSettings();
      if (settings.lastSentinelSyncAt) state.lastSentinelSyncAt = settings.lastSentinelSyncAt;
      const cached = await window.ShieldStorage.getEncrypted('settings_cache', state.key, 'sentinelStatus');
      if (cached && cached.status) {
        state.sentinelStatus = cached.status;
        state.sentinelTamper = !!cached.status.ledgerTampered;
      }
      const cachedAlerts = await window.ShieldStorage.getEncrypted('settings_cache', state.key, 'sentinelAlerts');
      if (cachedAlerts && Array.isArray(cachedAlerts.alerts)) state.sentinelAlerts = cachedAlerts.alerts;
    } catch (err) {
      // Cache store may not exist yet (first run) — ignore silently.
    }
  }

  // ─── Refresh ─────────────────────────────────────────────────────────
  function refreshAll() {
    const status = state.sentinelStatus;
    const topSev = status ? status.topSeverity : 'INFO';
    // "Live" if we have a sync within the last 30s AND we're currently
    // able to reach the Sentinel (last pollOnce succeeded with no error).
    const lastSyncMs = state.lastSentinelSyncAt ? Date.now() - new Date(state.lastSentinelSyncAt).getTime() : null;
    const isLive = lastSyncMs != null && lastSyncMs < 30_000 && !state.sentinel?.lastError;
    UI.renderStatusCard({
      topSeverity: topSev,
      ts: status?.ts,
      summary: status?.summary,
      lastSyncAt: state.lastSentinelSyncAt,
      isLive,
    });
    UI.renderPosture(status?.summary);
    // Alerts: merge sentinel alerts with local ledger entries.
    const localAlerts = (state.ledger?.getAll() || []).filter(e => e.severity !== 'INFO');
    const merged = [...(state.sentinelAlerts || []), ...localAlerts];
    UI.renderAlertFeed(merged);
    UI.renderLanList(status?.snapshot, new Set());
    UI.renderBtList(status?.snapshot);

    // Journal
    if (state.ledger) {
      const journalEntries = state.ledger.getAll().filter(e => e.type === 'JOURNAL_ENTRY' || e.severity !== 'INFO');
      UI.renderJournalList(journalEntries);
    }

    // Checklist
    UI.renderChecklist(window.SHIELD_CHECKLIST, state.checklist);

    // Evidence integrity
    UI.renderIntegrityStatus(state.ledger?.tamperInfo, state.sentinelTamper);

    // Sentinel settings
    const settings = state.settingsLoaded || {};
    UI.renderSentinelStatus({
      paired: !!(settings.sentinelUrl && settings.sentinelFingerprint),
      connected: !!state.sentinelStatus,
      url: settings.sentinelUrl,
      fingerprint: settings.sentinelFingerprint,
      lastError: state.sentinel?.lastError,
    });
    document.getElementById('sentinel-url').value = settings.sentinelUrl || '';
    document.getElementById('sentinel-fp').value = settings.sentinelFingerprint || '';
    document.getElementById('autolock').value = settings.autoLockSeconds || 60;
  }

  // ─── Handlers ────────────────────────────────────────────────────────
  document.getElementById('btn-lock').addEventListener('click', lockNow);

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => UI.showView(tab.dataset.view));
  });

  document.getElementById('kill-fab').addEventListener('click', async () => {
    if (!confirm('Kill Switch will:\n\n• Log the current state\n• Run the iOS "SHIELD Kill Switch" Shortcut\n• Lock SHIELD\n\nContinue?')) return;
    try {
      if (state.ledger) await state.ledger.append('KILL_SWITCH', 'CRITICAL', { source: 'pwa-fab', ts: new Date().toISOString() });
      if (state.sentinel) await state.sentinel.recordKillSwitch({ source: 'pwa-fab' });
    } catch {}
    window.ShieldShortcuts.killSwitch();
    setTimeout(lockNow, 600);
  });

  // Journal save
  document.getElementById('btn-journal-save').addEventListener('click', async () => {
    const text = document.getElementById('je-text').value.trim();
    const severity = document.getElementById('je-severity').value;
    const photoEl = document.getElementById('je-photo');
    if (!text) return alert('Entry cannot be empty.');
    let photoData = null;
    if (photoEl.files && photoEl.files[0]) {
      photoData = await fileToDataUrl(photoEl.files[0]);
    }
    const entry = await state.ledger.append('JOURNAL_ENTRY', severity, { text, photoData });
    if (state.sentinel) {
      // Push a reference (without the photo) to the Sentinel ledger so
      // cross-device integrity includes this entry.
      await state.sentinel.pushJournal({ id: entry.id, text, severity, hash: entry.hash, ts: entry.ts });
    }
    document.getElementById('je-text').value = '';
    photoEl.value = '';
    refreshAll();
    UI.showView('journal');
  });
  document.getElementById('btn-journal-clear').addEventListener('click', () => {
    document.getElementById('je-text').value = '';
    document.getElementById('je-photo').value = '';
  });

  // Checklist clicks
  document.getElementById('checklist-root').addEventListener('click', async (e) => {
    const item = e.target.closest('[data-check-id]');
    if (!item) return;
    const id = item.dataset.checkId;
    const now = new Date().toISOString();
    const current = state.checklist[id];
    const next = { id, done: !current?.done, at: now };
    state.checklist[id] = next;
    await Storage.putEncrypted('checklist', state.key, id, next);
    await state.ledger.append(next.done ? 'CHECKLIST_CHECKED' : 'CHECKLIST_UNCHECKED', 'INFO', { id });
    refreshAll();
  });

  // Journal delete
  document.getElementById('journal-list').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-delete-id]');
    if (!btn) return;
    if (!confirm('Delete this entry? The deletion itself is logged as a tamper-evident event.')) return;
    // Require a second PIN entry for delete? For now, a strong confirm is enough; we log the event.
    await state.ledger.remove(btn.dataset.deleteId);
    refreshAll();
  });

  // Sentinel pair
  document.getElementById('btn-sentinel-pair').addEventListener('click', async () => {
    const url = document.getElementById('sentinel-url').value.trim() || 'https://127.0.0.1:17333';
    const fp = document.getElementById('sentinel-fp').value.trim().toLowerCase();
    if (!/^[0-9a-f]{64}$/.test(fp)) return alert('Fingerprint must be 64 hex chars.');
    const pin = prompt('Re-enter PIN to pair:');
    if (!pin) return;
    // Build a transient client to verify pairing.
    const client = new SentinelClient({ url, fingerprint: fp, pin });
    const ok = await client.pair(pin, fp);
    if (!ok) return alert('Pair failed: ' + (client.lastError || 'unknown'));
    await Storage.setSetting('sentinelUrl', url);
    await Storage.setSetting('sentinelFingerprint', fp);
    state.sentinel = client;
    state.settingsLoaded = await Storage.getAllSettings();
    pollOnce();
  });
  document.getElementById('btn-sentinel-unpair').addEventListener('click', async () => {
    if (!confirm('Unpair Mac Sentinel?')) return;
    await Storage.setSetting('sentinelUrl', null);
    await Storage.setSetting('sentinelFingerprint', null);
    state.sentinel = null;
    state.sentinelStatus = null;
    state.settingsLoaded = await Storage.getAllSettings();
    refreshAll();
  });

  // Shortcut tests
  document.getElementById('btn-killswitch-test').addEventListener('click', () => window.ShieldShortcuts.killSwitch());
  document.getElementById('btn-shortcut-night').addEventListener('click', () => window.ShieldShortcuts.nightMode());
  document.getElementById('btn-shortcut-morning').addEventListener('click', () => window.ShieldShortcuts.morningCheck());

  // Save settings
  document.getElementById('btn-save-settings').addEventListener('click', async () => {
    const val = parseInt(document.getElementById('autolock').value, 10);
    if (!Number.isFinite(val) || val < 15 || val > 900) return alert('Auto-lock must be 15–900 seconds.');
    await Storage.setSetting('autoLockSeconds', val);
    state.autoLockSeconds = val;
    state.settingsLoaded = await Storage.getAllSettings();
    armAutoLock();
    alert('Saved.');
  });

  // Wipe
  document.getElementById('btn-wipe').addEventListener('click', async () => {
    if (!confirm('This will ERASE all SHIELD data on this device. It cannot be undone. Continue?')) return;
    if (!confirm('Are you sure? Ledger, journal, checklist, and PIN will all be wiped.')) return;
    await Storage.wipeAll();
    location.reload();
  });

  // Export
  document.getElementById('btn-export-json').addEventListener('click', async () => {
    const blob = await buildExport();
    const file = new Blob([JSON.stringify(blob, null, 2)], { type: 'application/json' });
    downloadBlob(file, `shield-export-${Date.now()}.json`);
  });
  document.getElementById('btn-export-html').addEventListener('click', async () => {
    const blob = await buildExport();
    const html = renderPrintableHtml(blob);
    const file = new Blob([html], { type: 'text/html' });
    downloadBlob(file, `shield-report-${Date.now()}.html`);
  });
  document.getElementById('btn-export-share').addEventListener('click', async () => {
    const blob = await buildExport();
    try {
      await navigator.clipboard.writeText(JSON.stringify(blob));
      alert('Export copied to clipboard.');
    } catch (err) {
      alert('Clipboard denied: ' + err.message);
    }
  });

  // Mark all reviewed — cosmetic; keeps entries but does nothing destructive.
  document.getElementById('btn-mark-all').addEventListener('click', () => {
    refreshAll();
  });

  // ─── Export builders ────────────────────────────────────────────────
  async function buildExport() {
    const local = state.ledger.getAll();
    let sentinelExport = null;
    if (state.sentinel) sentinelExport = await state.sentinel.getExport();
    return {
      generatedAt: new Date().toISOString(),
      device: navigator.userAgent,
      pwa: {
        ledgerCount: local.length,
        lastHash: state.ledger.lastHash,
        tamperInfo: state.ledger.tamperInfo,
        entries: local.map(e => ({ ...e, payload: stripPhotoDataForExport(e.payload) })),
      },
      sentinel: sentinelExport,
    };
  }
  function stripPhotoDataForExport(p) {
    if (!p || typeof p !== 'object') return p;
    const out = { ...p };
    if (out.photoData && typeof out.photoData === 'string') out.photoData = '[photo attached — decrypted in PWA only]';
    return out;
  }
  function renderPrintableHtml(blob) {
    const row = (e) => `
      <tr class="${e.severity}">
        <td>${escapeHtml(new Date(e.ts).toLocaleString())}</td>
        <td>${escapeHtml(e.type)}</td>
        <td>${escapeHtml(e.severity)}</td>
        <td><pre>${escapeHtml(JSON.stringify(e.payload, null, 2))}</pre></td>
      </tr>`;
    const pwaRows = (blob.pwa?.entries || []).map(row).join('');
    const senRows = (blob.sentinel?.entries || []).map(row).join('');
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SHIELD Evidence Report</title>
<style>
body{font-family:system-ui,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;color:#222}
h1{border-bottom:2px solid #C23B22;padding-bottom:8px}
h2{margin-top:32px}
table{border-collapse:collapse;width:100%;font-size:12px}
th,td{border:1px solid #ddd;padding:6px;text-align:left;vertical-align:top}
th{background:#f4f4f4}
tr.CRITICAL{background:#fbe8e3}
tr.HIGH{background:#fdebd5}
tr.MEDIUM{background:#fdf8e0}
pre{white-space:pre-wrap;word-wrap:break-word;margin:0;font-size:11px}
.meta{color:#666;font-size:12px}
</style></head><body>
<h1>SHIELD Evidence Report</h1>
<p class="meta">Generated ${escapeHtml(blob.generatedAt)}<br>Device: ${escapeHtml(blob.device)}</p>

<h2>PWA Journal</h2>
<p class="meta">Entries: ${blob.pwa?.ledgerCount ?? 0} · Last hash: <code>${escapeHtml(blob.pwa?.lastHash || '')}</code> · Tamper: ${blob.pwa?.tamperInfo ? 'DETECTED — ' + escapeHtml(JSON.stringify(blob.pwa.tamperInfo)) : 'not detected'}</p>
<table><thead><tr><th>Timestamp</th><th>Type</th><th>Sev</th><th>Payload</th></tr></thead><tbody>${pwaRows}</tbody></table>

<h2>Mac Sentinel Ledger</h2>
${blob.sentinel ? `<p class="meta">Entries: ${blob.sentinel.ledgerCount ?? 0} · Last hash: <code>${escapeHtml(blob.sentinel.ledgerLastHash || '')}</code> · Tamper: ${blob.sentinel.ledgerTampered ? 'DETECTED' : 'not detected'}</p>
<table><thead><tr><th>Timestamp</th><th>Type</th><th>Sev</th><th>Payload</th></tr></thead><tbody>${senRows}</tbody></table>` : '<p class="meta">Sentinel not paired — no data.</p>'}
</body></html>`;
  }
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // ─── Boot ────────────────────────────────────────────────────────────
  boot();
})();
