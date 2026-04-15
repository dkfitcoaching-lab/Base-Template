// SHIELD PWA — hardening checklist data model.
//
// Mirrors docs/HARDENING.md. Each item has an id, a phase, a short title,
// a description, and a checked state stored in IndexedDB under the
// `checklist` store (encrypted).

'use strict';

(function (window) {
  const ITEMS = [
    // Phase 0 — from a known-clean device
    { id: 'p0-rotate-apple-id',    phase: 'Phase 0 — from a clean device', title: 'Change Apple ID password',          desc: 'From a different, known-clean device. Use a 16+ character password stored in a manager.' },
    { id: 'p0-signout-devices',    phase: 'Phase 0 — from a clean device', title: 'Sign out every Apple ID device',    desc: 'appleid.apple.com → Devices → sign out anything you do not recognize.' },
    { id: 'p0-trusted-numbers',    phase: 'Phase 0 — from a clean device', title: 'Review trusted phone numbers',      desc: 'Remove any number you do not control.' },
    { id: 'p0-family-sharing',     phase: 'Phase 0 — from a clean device', title: 'Review Family Sharing',             desc: 'Remove unknown members. Leave the family if it isn\'t yours.' },

    // Phase 1 — iPhone
    { id: 'p1-ios-update',         phase: 'Phase 1 — iPhone', title: 'Update to latest iOS',                desc: 'Settings → General → Software Update.' },
    { id: 'p1-lockdown-mode',      phase: 'Phase 1 — iPhone', title: 'Enable Lockdown Mode',                desc: 'Settings → Privacy & Security → Lockdown Mode → Turn On & Restart. Highest single-step impact.' },
    { id: 'p1-stolen-device',      phase: 'Phase 1 — iPhone', title: 'Enable Stolen Device Protection',    desc: 'Settings → Face ID & Passcode → Stolen Device Protection → On.' },
    { id: 'p1-profiles',           phase: 'Phase 1 — iPhone', title: 'Review VPN & Device Management',     desc: 'Settings → General → VPN & Device Management. Delete any profile you did not install yourself.' },
    { id: 'p1-airdrop',            phase: 'Phase 1 — iPhone', title: 'AirDrop → Off or Contacts Only',     desc: 'Settings → General → AirDrop.' },
    { id: 'p1-bluetooth-off',      phase: 'Phase 1 — iPhone', title: 'Bluetooth off when not in use',      desc: 'Settings → Bluetooth → Off.' },
    { id: 'p1-analytics-off',      phase: 'Phase 1 — iPhone', title: 'Turn off Analytics sharing',         desc: 'Settings → Privacy & Security → Analytics & Improvements → Off.' },
    { id: 'p1-adp',                phase: 'Phase 1 — iPhone', title: 'Enable Advanced Data Protection',    desc: 'Settings → [Name] → iCloud → Advanced Data Protection → On. End-to-end encrypts iCloud.' },
    { id: 'p1-security-keys',      phase: 'Phase 1 — iPhone', title: 'Add hardware security keys',         desc: 'Settings → Sign-In & Security → Security Keys. Use two YubiKeys (one primary, one backup).' },
    { id: 'p1-imessage-contacts',  phase: 'Phase 1 — iPhone', title: 'iMessage Contact Key Verification',  desc: 'Settings → Messages → iMessage Contact Key Verification → On.' },
    { id: 'p1-safari-extensions',  phase: 'Phase 1 — iPhone', title: 'Safari extensions — remove unknown', desc: 'Settings → Safari → Extensions.' },
    { id: 'p1-keyboards',          phase: 'Phase 1 — iPhone', title: 'Remove third-party keyboards',       desc: 'Settings → General → Keyboard → Keyboards.' },

    // Phase 2 — Mac
    { id: 'p2-mac-update',         phase: 'Phase 2 — MacBook', title: 'Update to latest macOS',            desc: 'System Settings → General → Software Update.' },
    { id: 'p2-mac-lockdown',       phase: 'Phase 2 — MacBook', title: 'Enable Lockdown Mode',              desc: 'System Settings → Privacy & Security → Lockdown Mode.' },
    { id: 'p2-filevault',          phase: 'Phase 2 — MacBook', title: 'Enable FileVault',                  desc: 'Store recovery key physically — NOT in iCloud if iCloud may be compromised.' },
    { id: 'p2-firewall',           phase: 'Phase 2 — MacBook', title: 'Firewall on + Stealth + Block all', desc: 'System Settings → Privacy & Security → Firewall → Options.' },
    { id: 'p2-gatekeeper',         phase: 'Phase 2 — MacBook', title: 'Gatekeeper set to App Store + identified', desc: 'System Settings → Privacy & Security → Gatekeeper.' },
    { id: 'p2-sharing-off',        phase: 'Phase 2 — MacBook', title: 'Turn off ALL Sharing services',     desc: 'System Settings → General → Sharing. Every toggle off.' },
    { id: 'p2-login-items',        phase: 'Phase 2 — MacBook', title: 'Review Login Items & Background',  desc: 'System Settings → General → Login Items & Extensions.' },
    { id: 'p2-mac-profiles',       phase: 'Phase 2 — MacBook', title: 'Remove unknown Configuration Profiles', desc: 'System Settings → Privacy & Security → Profiles.' },
    { id: 'p2-privacy-permissions',phase: 'Phase 2 — MacBook', title: 'Audit privacy permissions',         desc: 'Full Disk Access / Accessibility / Input Monitoring / Screen Recording / Automation — remove unfamiliar apps.' },
    { id: 'p2-terminal-checks',    phase: 'Phase 2 — MacBook', title: 'Terminal: verify SIP, FileVault, Firewall, Gatekeeper', desc: 'Commands listed in docs/HARDENING.md §Phase 2 step 10.' },
    { id: 'p2-mac-password',       phase: 'Phase 2 — MacBook', title: 'Change Mac login password',        desc: 'Use a long passphrase — do not reuse your Apple ID password.' },
    { id: 'p2-safari-ext',         phase: 'Phase 2 — MacBook', title: 'Safari extensions — remove unknown', desc: 'Safari → Settings → Extensions.' },
    { id: 'p2-launch-manual',      phase: 'Phase 2 — MacBook', title: 'ls LaunchAgents and LaunchDaemons', desc: 'One-time manual inspection of ~/Library/LaunchAgents, /Library/LaunchAgents, /Library/LaunchDaemons.' },

    // Phase 3 — Network
    { id: 'p3-router-admin',       phase: 'Phase 3 — Network', title: 'Change router admin password',     desc: 'Not the Wi-Fi password — the admin login.' },
    { id: 'p3-router-firmware',    phase: 'Phase 3 — Network', title: 'Update router firmware',           desc: 'From the manufacturer\'s site.' },
    { id: 'p3-wps-upnp-off',       phase: 'Phase 3 — Network', title: 'Disable WPS, UPnP, WAN admin',     desc: '' },
    { id: 'p3-wpa3',               phase: 'Phase 3 — Network', title: 'Wi-Fi: WPA3 (or WPA2-AES)',        desc: 'Never WEP, never mixed mode.' },
    { id: 'p3-wifi-password',      phase: 'Phase 3 — Network', title: 'Rotate Wi-Fi password',            desc: 'Long passphrase.' },
    { id: 'p3-baseline-devices',   phase: 'Phase 3 — Network', title: 'Record device list from router',   desc: 'Ground truth for SHIELD\'s new-device alerts.' },
    { id: 'p3-guest-off',          phase: 'Phase 3 — Network', title: 'Guest network off (or isolated)',  desc: '' },
    { id: 'p3-dns',                phase: 'Phase 3 — Network', title: 'Set router DNS to 9.9.9.9 or 1.1.1.1', desc: 'Privacy-respecting resolvers.' },

    // Phase 4 — other accounts
    { id: 'p4-google',              phase: 'Phase 4 — other accounts', title: 'Rotate Google account',        desc: 'Password + 2FA + review sessions + OAuth app audit.' },
    { id: 'p4-github',              phase: 'Phase 4 — other accounts', title: 'Rotate GitHub account',        desc: 'Add security key. Review PATs + SSH keys.' },
    { id: 'p4-bank',                phase: 'Phase 4 — other accounts', title: 'Rotate bank/finance accounts', desc: '' },
    { id: 'p4-email',               phase: 'Phase 4 — other accounts', title: 'Rotate email providers',       desc: '' },
    { id: 'p4-registrar',           phase: 'Phase 4 — other accounts', title: 'Rotate domain registrar',      desc: '' },
    { id: 'p4-oauth-audit',         phase: 'Phase 4 — other accounts', title: 'Revoke unknown OAuth apps',    desc: 'Google, GitHub, Apple, etc.' },
  ];

  window.SHIELD_CHECKLIST = ITEMS;
})(window);
