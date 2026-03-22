# DK Fit Coaching Lab — Base Template Checkpoint

## Template Source
Copied from `dkfitcoaching-lab/bigmike` repository (the original Big Mike Ely coaching app).

## Template Status

### Included From Source
- [x] Full coaching app SPA (index.html ~3900 lines)
- [x] Public booking page (book.html)
- [x] PWA manifest, service worker, icons
- [x] GitHub Pages deployment workflow
- [x] Supabase cloud sync functions (send-sms, auto-remind)
- [x] Database migration schema
- [x] Technical architecture documentation
- [x] Claude Code development instructions (CLAUDE.md)
- [x] Full audit hook system (.claude/settings.local.json)

### What Needs Customization Per Deployment
- [ ] Coach name (replace "Big Mike Ely" throughout)
- [ ] Brand name and taglines
- [ ] CNAME file (new domain)
- [ ] manifest.json (app name, description)
- [ ] CSS color variables (brand colors)
- [ ] Icons and apple-touch-icon (brand logo)
- [ ] book.html (coach-specific copy)
- [ ] Birthday system removal (_bdayExpiry block)
- [ ] PDF cover page branding
- [ ] Supabase project setup (new project per client)
- [ ] Twilio phone number configuration

### Pending Feature Work (Inherited From Source)
- [ ] Fat Loss / GLP section (new program section type)
- [ ] Supplement database expansion (SUPP_DB with picker modal)
- [ ] Food prep state indicators (cooked/dry badges)
- [ ] Dosage customization (custom dose entry in all pickers)

## Architecture Quick Reference

### Navigation
```js
go(tab)           // switch main tab
push(view, data)  // navigate to sub-view (stacked)
pop()             // go back
render()          // re-render current view
```

### Data Storage
```js
LS.get(key, default)  // read from localStorage (fm_ prefix)
LS.set(key, value)    // write to localStorage
save()                // persist all data + trigger cloud sync
```

### Modals
```js
showModal(title, html)      // open modal overlay
closeModal()                // close it
showConfirm(title, msg)     // returns Promise<boolean>
showDoubleConfirm(title, msg) // two-step confirm for destructive actions
```

### PDF Generation
```js
_renderPDFToFile(pages, filename, docType, pageLabel)
// pages[0] = cover page, pages[1+] = content pages
```
