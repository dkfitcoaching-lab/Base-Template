# Coaching Lab — Base App Template Checkpoint

## What This Is
This is the **base app template** — a white-label version of the coaching platform, stripped of all client-specific branding. It serves as the starting point for every new client deployment.

## Origin
Created from the Big Mike Ely Coaching Lab app (the original build). All Mike-specific branding, the birthday gift system, and personal references have been removed. Core functionality is 100% intact.

## Architecture
Single-file SPA at `index.html` (~3800 lines). Vanilla JS, localStorage + Supabase sync. PWA-ready.

## What's Included (Generic & Ready)
- Client CRUD with full profiles
- Session logging with exercises, sets, reps, PRs
- Schedule management with SMS reminders
- Meal plan builder with FOOD_DB (100+ foods)
- Workout builder with EXERCISE_DB (150+ exercises, 9 muscle groups)
- Anabolics protocol builder with ANABOLICS_DB (8 categories)
- Supplement tracking
- Peptides management
- Water/hydration tracking
- Program builder (8 section types: training, nutrition, anabolics, peptides, fatloss, supplements, water, protocol)
- PDF generation (individual sections or combined)
- Two themes: Crimson and Gold
- PIN lock security
- Cloud sync via Supabase
- Import/export (JSON backup)
- External booking page (book.html)

## Customization Points Per Client
1. App name (title, manifest, header)
2. Logo letter/icon
3. Subtitle text
4. Theme colors (can add new themes)
5. PDF cover page branding
6. SMS signature
7. Tutorial text
8. Domain (CNAME)
9. Booking page branding (book.html)

## Files
- `index.html` — The entire app
- `book.html` — External booking portal
- `manifest.json` — PWA manifest
- `sw.js` — Service worker
- `CNAME` — GitHub Pages domain
- `CLAUDE.md` — Development instructions (includes Faith's onboarding protocol)
- `WELCOME_FAITH.md` — First-session onboarding guide for Faith
- `supabase/` — Cloud sync functions (SMS, auto-remind, schema)
