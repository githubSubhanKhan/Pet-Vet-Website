# Massapequa Pet Vet — concept landing page

Open `index.html` in any modern browser. No build step or server needed.

```
index.html          the landing page
css/styles.css      all styles (tokens at the top, responsive rules at the bottom)
js/main.js          live open/closed status, mobile menu, services filter, team scroller
images/             original illustrations, species icons, favicon, social share image
fonts/              self-hosted Bricolage Grotesque + Figtree (SIL Open Font License)
AUDIT.md            findings on the current mpetvet.com and recommended tech stack
```

Notes
- The map, staff photos and booking links load from the internet; offline, the map area shows a placeholder and staff photos fall back to initials.
- Clinic hours live in `js/main.js` (`HOURS`) and in the hours table in `index.html`; update both if they change.
- All animation respects the visitor's "reduce motion" setting.
