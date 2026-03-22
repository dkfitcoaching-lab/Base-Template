# Coaching Lab — Base App Template

## FIRST SESSION PROTOCOL — READ THIS TO THE USER

**If this is the user's first time interacting with Claude Code on this repo, introduce yourself and walk them through the system. Read the contents of WELCOME_FAITH.md aloud to them in a warm, conversational tone. After the welcome, ask if they have any questions before getting started.**

To check if it's their first session: if they seem unfamiliar, say hi, or ask "how does this work" — read them the welcome guide. If they jump straight into a task, they already know the system — skip the intro and get to work.

---

## What This Is
This is the **base app template** for a coaching management platform. It is a fully functional, white-label coaching app that gets customized for each new client. David built the original for IFBB Pro Big Mike Ely, then stripped it down to this clean template.

The app handles: client management, session logging, scheduling, meal plans, workout programs, anabolics/peptides/supplement protocols, PDF generation, SMS reminders, cloud sync, and more.

## How This Gets Used
1. A new coaching client signs up for the software
2. You (Faith) talk to the client about what they want (branding, colors, features, etc.)
3. You open Claude Code, describe what needs to happen
4. Claude (me) builds it, tests it, and delivers it
5. Zero coding required from you — ever

---

## Architecture
- **Single-file vanilla JS SPA**: `index.html` (~3800 lines)
- No framework — pure functions returning HTML strings, swapped via innerHTML
- localStorage for persistence with optional Supabase cloud sync
- Navigation: `go(tab)`, `push(view, data)`, `pop()` with navStack
- PWA with manifest.json, service worker, canvas-generated theme icons

## Key Data Structures
- `clients` — array of client objects (stored in localStorage as `fm_clients`)
- `sessions` — session logs with exercises, sets, rates
- `schedule` — scheduled sessions with reminders
- `mealPlans` — meal plans with foods referencing FOOD_DB by index
- `_programs` — program builder data (sections, client assignment)
- `_workouts` — workout templates with exercises and cardio
- Client fields: `anabolics[]`, `peptides[]`, `fatloss[]`, `supplements[]`, `water{}`, `program{}`

## Themes
- Default: Crimson (`LS.get("theme","crimson")`)
- CSS variables switch via `body.theme-crimson` class
- `var(--goldGrad)` and `var(--acc)` are theme-aware
- Dynamic canvas icons generated for PWA home screen
- Two built-in themes: Crimson (red) and Gold

## Customization Points (For Each New Client)
When setting up for a new coaching client, these are the things to customize:
1. **App name** — page title, manifest, header logo text
2. **Logo letter** — the single letter in the header icon (currently "C")
3. **Subtitle text** — under the logo (currently "CLIENT MANAGEMENT")
4. **Theme colors** — can add new themes beyond crimson/gold
5. **PDF cover page** — branding text and logo on generated PDFs
6. **SMS signature** — personalize reminder messages
7. **Tutorial text** — first-run walkthrough content
8. **Domain/CNAME** — for GitHub Pages hosting
9. **book.html** — external booking page branding

## Program Builder
- Programs have sections: training, nutrition, anabolics, peptides, fatloss, supplements, water, protocol
- Each section delegates to a renderer function
- CRITICAL PATTERN: `renderProgramBuilder()` must check `_editWorkout` and `_editMealPlan` BEFORE rendering sections, otherwise sub-editors won't display
- Auto-populates sections based on client's services when assigned
- PDF builder reads checkboxes into local vars BEFORE calling closeModal()

## Known Patterns & Gotchas
1. **Render priority**: `renderNutrition()` → checks `_editProgram` → `_editWorkout` → `_editMealPlan` in order
2. **Modal scroll**: showModal handles all scrolling. Do NOT add `max-height` + `overflow-y:auto` to content inside modals — it breaks iOS
3. **Theme colors**: Never hardcode colors — use CSS variables (`var(--bg)`, `var(--acc)`, etc.)
4. **Function naming**: Workout builder uses `pickWkExCustom()` (not `pickExerciseCustom` which is for client program days)
5. **Cloud sync**: `save()` persists all data stores. `savePrograms()` and `saveWorkouts()` are for local-only saves
6. **iOS keyboard**: focusout listener resets scroll position after keyboard dismiss
7. **All picker modals** should allow custom entry with fully customizable dose/timing/frequency fields

## Databases (in-code constants)
- `FOOD_DB[]` — foods with macros, `ck` flag (1=cooked, 0=dry/raw), categories P/C/F/V
- `ANABOLICS_DB[]` — categories: Anabolic Steroids, AI, SERMs, Prolactin Support, Peptides, SARMs, Ancillaries, Fat Loss/GLPs
- `SUPP_DB[]` — supplement categories with preset doses/timings
- `CARDIO_DB[]` — cardio types with modes
- `EXERCISE_DB{}` — exercise groups with exercises

## Naming Convention for Compounds
ALL compounds in ANABOLICS_DB, Fat Loss/GLPs, and Peptides MUST follow this format:
**"Pharmaceutical Name / Brand or Common Name"** (pharma first, common second)

Examples:
- `Oxandrolone / Anavar` (NOT "Anavar / Oxandrolone")
- `Semaglutide / Ozempic / Wegovy`
- `Tirzepatide / Mounjaro / Zepbound`

## Testing Checklist
After any changes, always:
1. Extract JS and validate: `sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/app_js.js && node -c /tmp/app_js.js`
2. Check all onclick handlers reference existing functions
3. Verify modals open and scroll properly (no nested overflow containers)
4. Verify render chain: renderNutrition → renderProgramBuilder → sub-editors

## Pending Features (Base Template Improvements)
### High Priority
1. **Fat Loss / GLP section**: Full CRUD as program section type "fatloss"
2. **Supplement database expansion**: Full SUPP_DB with category picker modal
3. **Food prep state indicators**: Show "(cooked)" / "(dry)" badges from FOOD_DB `ck` property
4. **Dosage customization**: All pickers must allow custom dose entry (free text)

### Medium Priority
- Notes fields on individual supplement entries and meal items
- Client filter reset on tab switch
- Clean up dead code: `renderWorkoutBuilder`, `_nutView`, `_guideSearch`

### Low Priority
- Remove duplicate items from ANABOLICS_DB "Ancillaries" that are now in "Fat Loss/GLPs"
