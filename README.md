# Tripora

Travel discovery and trip planning — React 18 + Vite, Framer Motion, Chart.js, LocalStorage (no backend, no paid APIs).

```
npm install
npm run dev
npm run build
npm run check:images   # verifies every image URL in src/data/destinations.js (needs internet)
```

## Features
- 15 destinations with search, category/country/budget filters, sorting and URL-synced filters
- Destination pages with an animated photo gallery + lightbox (keyboard, swipe, thumbnails, focus trap)
- Trip planner: multi-select preferences, same-day trips allowed (end date before start date rejected), per-day itinerary, edit via `/planner?edit=<id>`, prefill via `/planner?dest=<id>`
- My Trips dashboard, wishlist, budget calculator (doughnut chart), profile, contact form validation
- Everything persists in LocalStorage (`tripora:wishlist`, `tripora:trips`, `tripora:profile`, `tripora:budget`); older string-format preferences are migrated automatically
- Images never show as broken: any missing/failed photo is replaced by a built-in illustrated postcard

## Real gallery photos
Hero photos come from `image` in `src/data/destinations.js`. The three extra gallery frames per destination show illustrated postcards until you add URLs to `EXTRA_PHOTOS` at the top of that file, e.g. `bali: [ubudUrl, tanahLotUrl, uluwatuUrl]`. Run `npm run check:images` after editing.

Deploy: push to GitHub, import in Vercel (Vite preset). `vercel.json` handles SPA routing.
