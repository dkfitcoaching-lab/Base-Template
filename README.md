# Base-Template

DK Fit Coaching Lab — Base Template for deploying customized coaching apps.

## What Is This?

This is the master template for the coaching platform software. When a new client/coach purchases the software, we create a copy of this repository, customize it for their brand (name, colors, domain, logo), and deploy it as their own coaching app.

## How It Works

1. **Create a new repo** from this template on GitHub
2. **Open it in Claude Code** and tell Claude what the new client wants
3. **Claude customizes everything** — branding, colors, features
4. **Deploy via GitHub Pages** — the app goes live on the client's domain

## File Structure

```
Base-Template/
├── index.html              # The entire app (single-file SPA, ~3900 lines)
├── book.html               # Public booking page for clients
├── 404.html                # Redirect to index.html
├── manifest.json           # PWA manifest (app name, icons, theme)
├── sw.js                   # Service worker for offline caching
├── apple-touch-icon.png    # iOS home screen icon
├── .nojekyll               # Tells GitHub Pages not to use Jekyll
├── .gitignore              # Files to exclude from git
├── CLAUDE.md               # AI instructions (Faith's guide + technical docs)
├── TECHNICAL_ARCHITECTURE.md # Full system architecture reference
├── CHECKPOINT.md           # Development checkpoint/status
├── icons/                  # PWA icons (various sizes)
├── .github/workflows/      # GitHub Pages auto-deploy workflow
├── .claude/                # Claude Code settings and hooks
└── supabase/               # Cloud sync & SMS functions
    ├── functions/
    │   ├── send-sms/       # Twilio SMS integration
    │   └── auto-remind/    # Automated session reminders
    └── migrations/         # Database schema
```

## For Faith

Open the `CLAUDE.md` file — it starts with your complete guide on how to use this system. Everything you need to know is right there at the top.
