# Welcome to Coaching Lab — Your AI-Powered Development System

Hey Faith! David built this system so you can run a coaching software business without writing a single line of code. Here's everything you need to know.

---

## The Big Picture

You have an AI-powered development system where you literally just talk. You open the app (Claude Code), tap your microphone, and speak naturally — as long-winded as you want. The AI (me, Claude) listens to everything you say, understands what you want, and builds it. No coding. No technical knowledge. David engineered this entire system specifically so that you can operate it by just having a conversation.

---

## How a Typical Workflow Goes

**Example: A new client buys the software and wants customizations**

### Step 1 — Plan Mode (talk it out first)

When you first start, you'll be in what's called "Plan Mode." This is your brainstorming/planning phase. You just talk and tell me what the client wants:

*"Hey, so this client is a gym called Iron Paradise, they want their logo colors to be black and gold, they want to track 50 trainers, each trainer needs to be able to log their clients' workouts and meal plans..."*

I'll take everything you say, organize it into a clear step-by-step plan, and show it back to you. You review it. If something's off, just say *"no, change this part to..."* and I'll adjust. Once you're happy with the plan, you approve it.

**The key thing about Plan Mode:** I can NOT make any changes to the actual app. I can only research, read files, and build the plan. This is a safety net — nothing gets touched until you're confident the plan is right.

### Step 2 — Code Mode (I build it)

Once you approve the plan, you switch to Code Mode (you just type `/code` or tell me to switch). Now I execute everything from the plan. I make all the changes, test them, and verify everything works. You don't need to understand what's happening technically — just watch the progress updates and confirm things look right when I show you previews.

---

## What David Built Behind the Scenes

- A detailed instruction file that tells me exactly how this app is built, what every piece does, where everything lives, and what rules to follow
- A full audit and testing system — every single change I make gets validated automatically
- The entire app is a single-file architecture, which means there's no complex web of files to manage
- Commit and push systems so every change is saved and versioned — nothing ever gets lost

---

## The Quality Audit

Every change goes through a quality check:
- JavaScript syntax validation (catches any code errors instantly)
- All buttons and interactions are verified to work
- Modals, screens, and navigation are checked
- The full render chain is tested (screens load in the right order)
- Nothing ships with bugs

This carries over to every single copy of the app we build for clients.

---

## How "Saving Your Work" Works (Commit & Push)

When I make changes, those changes need to be saved in two steps. Think of it like writing a document:

- **Commit** = Clicking "Save" on your computer. It saves a snapshot of everything I just changed, with a little note describing what was done (like "Added client's custom colors" or "Built meal plan screen"). This save is local — it's on your machine only.

- **Push** = Clicking "Upload" or "Sync." This takes that saved snapshot and uploads it to GitHub (the cloud backup) so it's safe forever, and David can see it too.

**You won't have to do this manually.** At the end of a session, just tell me:
- *"Go ahead and save everything and push it up"*
- Or even just: *"Commit and push"*

And I handle all of it. I'll write the save note, save it, and upload it.

**If you ever want to check what's been saved**, just ask me:
- *"What changes have been made?"*
- *"Show me the recent saves"*

And I'll show you a plain-English summary.

---

## Quick Reference

| What you want | What to say |
|---|---|
| Start planning | Just start talking about what you need |
| Approve a plan | Tell me it looks good, or say "approve" |
| Switch to building | `/code` or "switch to code mode" |
| Save your work | "Commit and push" |
| Check what changed | "What changes have been made?" |
| Ask for help | Just ask — literally anything |
| Something looks wrong | "That's not right, change X to Y" |

---

## In Simple Terms

1. You talk to me like you're talking to a developer on your team
2. I plan it out and show you what I'm going to do
3. You say "looks good" or "change this"
4. I build it, test it, and deliver it
5. Zero coding required from you — ever

David set all of this up so the two of you can run this as a business where you handle the client relationships and customization requests, and the AI system he built handles all the technical execution. You're the bridge between the client and the technology.

---

*If you have any questions at all, just ask. There's no such thing as a dumb question here — I'm built to help.*
