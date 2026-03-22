# Welcome, Faith — How This System Works

## The Big Picture
David built this AI-powered development system where you literally just talk. You open the app (Claude Code), tap your microphone, and speak naturally — as long-winded as you want. The AI (me, Claude) listens to everything you say, understands what you want, and builds it. No coding. No technical knowledge. David engineered this entire system specifically so that you can operate it by just having a conversation.

## How a Typical Workflow Goes
*Example: a new client buys the software and wants customizations*

### Step 1 — Plan Mode (talk it out first)
When you first start, you'll be in what's called "Plan Mode." This is your brainstorming/planning phase. You just talk and tell me what the client wants:

- "Hey, so this client is a gym called Iron Paradise, they want their logo colors to be black and gold, they want to track 50 trainers, each trainer needs to be able to log their clients' workouts and meal plans..."

I'll take everything you say, organize it into a clear step-by-step plan, and show it back to you. You review it. If something's off, just say "no, change this part to..." and I'll adjust. Once you're happy with the plan, you approve it.

**The key thing about Plan Mode:** I can NOT make any changes to the actual app. I can only research, read files, and build the plan. This is a safety net David built in — nothing gets touched until you're confident the plan is right.

### Step 2 — Code Mode (I build it)
Once you approve the plan, you switch to Code Mode (you just type `/code` or tell me to switch). Now I execute everything from the plan. I make all the changes, test them, and verify everything works. You don't need to understand what's happening technically — David built the system so that I handle all of that. You just watch the progress updates and confirm things look right when I show you previews.

## What David Built Behind the Scenes (so you understand why this works)
- A detailed instruction file (this CLAUDE.md file) that tells me exactly how this app is built, what every piece does, where everything lives, and what rules to follow
- A full audit and testing system — every single change I make gets validated automatically. I check for errors, verify nothing broke, and run quality checks before anything goes live
- The entire app is a single-file architecture, which means there's no complex web of files to manage — it's streamlined specifically for this workflow
- Commit and push systems so every change is saved and versioned — nothing ever gets lost

## The Quality Audit
Every change goes through what David set up as a mass accuracy audit. This means:
- JavaScript syntax validation (catches any code errors instantly)
- All buttons and interactions are verified to work
- Modals, screens, and navigation are checked
- The full render chain is tested (screens load in the right order)
- Nothing ships with bugs — period

This audit system carries over to every single copy of the app we build for clients. Same standard, every time.

## In Simple Terms
1. You talk to me like you're talking to a developer on your team
2. I plan it out and show you what I'm going to do
3. You say "looks good" or "change this"
4. I build it, test it, and deliver it
5. Zero coding required from you — ever

David set all of this up so the two of you can run this as a business where you handle the client relationships and customization requests, and the AI system he built handles all the technical execution. You're the bridge between the client and the technology.

## Your Setup — What David Set Up For You
1. **A shared Claude account** — this is where you'll talk to me (the AI). Think of it like opening a chat app. You open it, start a conversation, and tell me what you need.
2. **A shared GitHub account** — this is where the app's code lives. Think of GitHub like a Google Drive but specifically for code. Every version of the app is saved there, and nothing ever gets lost.

## How "Saving Your Work" Works (Commit & Push)
When I make changes to the app, those changes need to be saved in two steps. Think of it like writing a document:

- **Commit** = Clicking "Save" on your computer. It saves a snapshot of everything I just changed, with a little note describing what was done (like "Added client's custom colors" or "Built meal plan screen"). This save is local — it's on your machine only.
- **Push** = Clicking "Upload" or "Sync." This takes that saved snapshot and uploads it to GitHub so it's backed up in the cloud, David can see it, and it's safe forever.

You won't have to do this manually. At the end of a session, you just tell me:
- "Go ahead and save everything and push it up"
- Or even just: "Commit and push"

And I handle all of it. I'll write the save note, save it, and upload it. You'll see a confirmation when it's done.

If you ever want to check what's been saved, just ask me:
- "What changes have been made?"
- "Show me the recent saves"

And I'll show you a plain-English summary.

## Quick Reference
- **Plan Mode** = safe zone, talk freely, nothing changes until you approve
- **Code Mode** = execution zone, I build what was planned
- **Talk naturally** = use voice-to-text, be as detailed as you want
- **"Commit and push"** = tell me to save and upload when you're done
- **If unsure** = just ask me, I'll explain anything

---

# DK Fit Coaching Lab — Base Template Technical Instructions

*Everything below this line is for Claude (the AI) to understand how the app works. Faith, you don't need to read any of this — it's my instruction manual.*

---

## CRITICAL: Quality Standard
This is the **Base Template** for the DK Fit Coaching Lab platform. It is used to create customized coaching apps for new clients/coaches. Every deployment must meet the same quality standard — **zero bugs, zero errors** when the end user opens and uses it.

## Architecture
- **Single-file vanilla JS SPA**: `index.html` (~3900+ lines)
- No framework — pure functions returning HTML strings, swapped via innerHTML
- localStorage for persistence with optional Supabase cloud sync
- Navigation: `go(tab)`, `push(view, data)`, `pop()` with navStack
- PWA with manifest.json, service worker, canvas-generated theme icons
- Hosted via GitHub Pages

## Key Data Structures
- `clients` — array of client objects (stored in localStorage as `fm_clients`)
- `sessions` — session logs with exercises, sets, rates
- `schedule` — scheduled sessions with reminders
- `mealPlans` — meal plans with foods referencing FOOD_DB by index
- `_programs` — program builder data (sections, client assignment)
- `_workouts` — workout templates with exercises and cardio
- Client fields: `anabolics[]`, `peptides[]`, `fatloss[]`, `supplements[]`, `water{}`, `program{}`

## Themes
- Default: Gold theme
- Crimson alternate theme available
- CSS variables switch via `body.theme-crimson` class
- `var(--goldGrad)` and `var(--acc)` are theme-aware
- Dynamic canvas icons generated for PWA home screen
- **When customizing for a new client:** update CSS variables in `:root` and `.theme-crimson` to match their brand colors

## Customization Checklist (For Each New Deployment)
When creating a new coach's app from this template, these items MUST be updated:
1. **Coach name** — search and replace "Big Mike Ely" / "BIG MIKE ELY" throughout index.html and book.html
2. **Brand name** — replace "IFBB Pro Big Mike Ely" / "Coaching Lab" references
3. **CNAME file** — create with the new domain (or remove if using github.io subdomain)
4. **manifest.json** — update `name`, `short_name`, `description`
5. **Colors** — update CSS `:root` variables if client wants different brand colors
6. **Icons** — replace `icons/` folder and `apple-touch-icon.png` with client's branding
7. **book.html** — update title, description, and any coach-specific references
8. **Birthday system** — remove the `_bdayExpiry` code block (it's Big Mike-specific)
9. **PDF branding** — update the cover page text in `_pdfCoverPage` function
10. **Supabase** — each client gets their own Supabase project (separate database)
11. **Twilio** — each client gets their own Twilio number or shares the business number

## Program Builder
- Programs have sections: training, nutrition, anabolics, peptides, fatloss, supplements, water, protocol
- Each section delegates to a renderer function
- CRITICAL PATTERN: `renderProgramBuilder()` must check `_editWorkout` and `_editMealPlan` BEFORE rendering sections, otherwise sub-editors won't display
- Auto-populates sections based on client's services when assigned
- PDF builder reads checkboxes into local vars BEFORE calling closeModal()

## Known Patterns & Gotchas
1. **Render priority**: `renderNutrition()` → checks `_editProgram` → `_editWorkout` → `_editMealPlan` in order. The program builder also checks `_editWorkout` and `_editMealPlan` first.
2. **Modal scroll**: showModal handles all scrolling. Do NOT add `max-height` + `overflow-y:auto` to content inside modals — it breaks iOS.
3. **Theme colors**: Never hardcode `#1a1408` or `#1a1000` — use `var(--bg)` for text on gradient backgrounds.
4. **Function naming**: Workout builder uses `pickWkExCustom()` (not `pickExerciseCustom` which is for client program days).
5. **Cloud sync**: `save()` persists all data stores including programs/workouts. `savePrograms()` and `saveWorkouts()` are for local-only saves.
6. **iOS keyboard**: focusout listener resets scroll position after keyboard dismiss.
7. **All picker modals** (exercises, anabolics, peptides, supplements, foods) should allow custom entry with fully customizable dose/timing/frequency fields — not just preset options.

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
- `Testosterone Cypionate / Test C` (NOT "Test C / Testosterone Cypionate")
- `Semaglutide / Ozempic / Wegovy`

This applies to every single entry. If a compound has multiple brand names, include them all separated by `/`.

## Testing Checklist
After any changes, always:
1. Extract JS and validate: `sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/check_js.js && node -c /tmp/check_js.js`
2. Check all onclick handlers reference existing functions
3. Verify modals open and scroll properly (no nested overflow containers)
4. Verify render chain: renderNutrition → renderProgramBuilder → sub-editors
5. Commit and push changes

## PENDING WORK (Template Improvements)
### High Priority
1. **Fat Loss / GLP section**: Add as new program section type "fatloss" with GLPs and fat burners, full CRUD like peptides section
2. **Supplement database expansion**: Add comprehensive SUPP_DB constant with picker modal
3. **Food prep state indicators**: Display cooked/dry badges based on FOOD_DB `ck` property
4. **Dosage customization**: All compound/supplement pickers must allow custom dose entry

### Medium Priority
- Notes fields on individual supplement entries and meal items
- Client filter reset on tab switch
- Clean up remaining dead code

### Low Priority
- Remove duplicate items from ANABOLICS_DB "Ancillaries" that are now in "Fat Loss/GLPs"
