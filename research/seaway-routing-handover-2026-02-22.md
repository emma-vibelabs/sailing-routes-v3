# Seaway Routing Handover (2026-02-22)

## Goal and Problem Statement
- Goal: make `Seaway` mode look like plausible marine navigation and clearly better than `Straight` mode.
- Constraint: keep canonical itinerary distance policy (`stop.nm` and `route.distance`) and pass `scripts/check-distances.mjs` thresholds.
- Current status: **dormant** — feature works but has remaining land-crossing issues on some routes. Come back to it when there's time for a proper coastline-aware approach.

## Current Architecture
- Route rendering mode logic is in `public/app.js`.
- Mode state keys:
  - `sr-route-mode`
  - `sr-active-route`
- Seaway geometry source order:
  1. `window.SEA_WAYPOINTS[routeId][day]` (from `public/sea-waypoints.js`)
  2. fallback to `stop.waypoints` in `public/routes-data.js`
- Distance audit: `scripts/check-distances.mjs` (uses same source order)
- Geometry quality gate: `scripts/check-route-geometry.mjs` (checks flatness, missing WPs, angle spikes)
- npm scripts: `npm run check:distances`, `npm run check:geometry`

## To Deactivate Seaway Mode
If you want to hide the feature from users:
1. In `app.js`, change `let currentRouteMode = 'seaway'` → `'straight'`
2. Hide the route-type picker UI (the `<div>` containing `RUTETYPE` / `Sjøvei` / `Rett` buttons)
3. No need to delete `sea-waypoints.js` — it simply won't be used

To reactivate: reverse the above.

## Work Done in This Session

### Phase 1: Geometry quality gate script
- Created `scripts/check-route-geometry.mjs` modeled on `check-distances.mjs`
- Checks: FLAT (ratio < 1.03 on legs >= 15 NM), NO_WP (0 waypoints on legs >= 8 NM), SPIKE (> 120° direction change)
- Added `"check:geometry"` npm script to `package.json`
- Baseline: 56 issues (31 FLAT, 21 NO_WP, 1 SPIKE)

### Phase 2: Lateral offset fixes for visible curvature
- Added/recrafted waypoints across 6 routes to get seaway/straight ratio above 1.03
- Routes fixed: saronic, lipsi-tur-retur, sporadene, saronisk-kyklader, klassisk-kykladene, fulle-kykladene
- Routes NOT touched: smaa-kykladene, nordlige-kykladene
- Final: 36 issues (21 FLAT, 15 NO_WP, 0 SPIKE) — all plan-targeted legs pass
- Commit: `ca88a7c`

### Phase 3: Land-crossing fixes
- **Sporadene days 1 & 13**: Added waypoints to route around Attica peninsula via Saronic Gulf coast (instead of cutting straight through)
- **Saronic day 7**: Shifted waypoints east (lng 23.06→23.10) to stay offshore along Peloponnese coast
- **Saronic day 9**: Moved waypoints from west of coast (lng 22.91-22.96) to east (23.04-23.07) to stay at sea between Monemvasia and Elafonisos
- **Saronic day 11**: Rerouted east around Cape Maleas (lng 23.22) instead of going up the west side of the peninsula
- Commit: `7ce3701`

### Known remaining land-crossing issues
- Not all routes have been checked at close zoom — there may be more legs clipping coastlines
- The distance budget (25% per leg) makes it hard to route around peninsulas on short legs
- Day 9 Monemvasia→Elafonisos (14 NM) and day 13 Evia Sør→Alimos (35 NM) are at 15% and 23% of budget — very tight

## Commits Related to This Work
- `fe89b81` feat(map): seaway/straight modes, active-route prioritization, NM audit + provenance
- `31f29c0` fix(map): stabilize seaway mode routing overrides
- `678eeb2` fix(map): refine saronic seaway leg geometry
- `1a69b8c` fix(map): improve saronic seaway curvature in southern legs
- `2c27582` feat(map): expand seaway waypoint coverage across all routes
- `3e15eb9` fix(map): align saronic seaway southbound and return corridors
- `ca88a7c` fix(map): add lateral offsets to seaway waypoints for visible curvature
- `7ce3701` fix(map): reroute seaway waypoints to avoid land crossings

## Root Cause and Why This Is Hard
- Waypoints are manually curated lat/lng pairs with no coastline awareness
- The system has no concept of "land" — it just draws straight lines between points
- Each leg has a distance budget (canonical NM ± 25%) that limits how far you can detour
- Short legs near coastlines (e.g., Monemvasia→Elafonisos at 14 NM) often can't afford the detour needed to route around land
- Outbound and return legs are authored independently, creating inconsistent corridors

## Recommended Approach for Proper Fix

### Option A: Coastline-aware validation (pragmatic)
- Add a coastline GeoJSON dataset (e.g., Natural Earth 50m)
- Write a script that checks each line segment for land intersection
- Auto-flag legs that cross land
- Manually fix flagged legs with waypoints that stay at sea

### Option B: Lane-based geometry (architectural)
- Define named sea corridors (e.g., `saronic_southbound_outer`)
- Map each leg to a lane + segment cut
- Enforce corridor consistency between paired outbound/return legs
- More work upfront but eliminates ad-hoc waypoint quality issues

### Option C: Use a proper maritime routing API
- Feed origin/destination to a maritime routing service (searoute, MarineTraffic, etc.)
- Import the resulting waypoints, prune to fit distance budget
- Previous attempt with Python `searoute` produced mediocre results that needed heavy manual editing

## Repro and Validation Commands
```bash
# Syntax checks
node --check public/app.js
node --check public/sea-waypoints.js

# Distance governance (must pass)
npm run check:distances

# Geometry quality (informational — exits 1 if issues remain)
npm run check:geometry

# Visual QA
npx serve public    # then open localhost in browser, check each route in Sjøvei mode
```
