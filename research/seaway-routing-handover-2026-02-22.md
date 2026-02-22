# Seaway Routing Handover (2026-02-22)

## Goal and Problem Statement
- Goal: make `Seaway` mode look like plausible marine navigation and clearly better than `Straight` mode.
- Constraint: keep canonical itinerary distance policy (`stop.nm` and `route.distance`) and pass `scripts/check-distances.mjs` thresholds.
- Current blocker: Saronic route still has visually unsatisfying legs in seaway mode, even after multiple passes.

## Current Architecture
- Route rendering mode logic is in `/Users/emmafjelldahl/Documents/kodeprosjekter/sailing-routes-v3/public/app.js`.
- Mode state keys:
  - `sr-route-mode`
  - `sr-active-route`
- Seaway geometry source order:
  1. `window.SEA_WAYPOINTS[routeId][day]` (from `/Users/emmafjelldahl/Documents/kodeprosjekter/sailing-routes-v3/public/sea-waypoints.js`)
  2. fallback to `stop.waypoints` in `/Users/emmafjelldahl/Documents/kodeprosjekter/sailing-routes-v3/public/routes-data.js`
- Distance audit uses the same seaway source order in `/Users/emmafjelldahl/Documents/kodeprosjekter/sailing-routes-v3/scripts/check-distances.mjs`.

## Commits Related to This Work
- `fe89b81` feat(map): seaway/straight modes, active-route prioritization, NM audit + provenance
- `31f29c0` fix(map): stabilize seaway mode routing overrides
- `678eeb2` fix(map): refine saronic seaway leg geometry
- `1a69b8c` fix(map): improve saronic seaway curvature in southern legs
- `2c27582` feat(map): expand seaway waypoint coverage across all routes
- `3e15eb9` fix(map): align saronic seaway southbound and return corridors

## What Was Tried

### 1) Override-based seaway routing layer
- Added `/Users/emmafjelldahl/Documents/kodeprosjekter/sailing-routes-v3/public/sea-waypoints.js`.
- Wired into app and audit scripts.
- Outcome:
  - Good: allows leg-level control without breaking original route data.
  - Good: reproducible and auditable.
  - Bad: quality depends entirely on manual waypoint curation quality.

### 2) Auto-generation from searoute maritime graph
- Attempted generating waypoints automatically and filtering by NM policies.
- Outcome:
  - Initial auto output caused major detours and threshold failures (multiple legs > 25%, route deltas > 10%).
  - Several generated legs looked geographically implausible near coast and port approaches.
  - Auto output required heavy manual pruning; automation alone did not produce production-quality paths.

### 3) Saronic iterative manual tuning
- Multiple passes on Saronic legs (`day 6,7,9,10,11,12,13,14`).
- Tried:
  - reducing zig-zag points,
  - aligning southbound/return corridors,
  - smoothing around Monemvasia/Elafonisos/Kythira segment,
  - keeping seaway NM within policy.
- Outcome:
  - Improved compared to baseline.
  - Still visually not acceptable for stakeholder expectations in some map views.

### 4) Full all-routes waypoint expansion
- Added waypoint coverage across all route families to reduce completely straight long legs.
- Outcome:
  - Distance audit passes.
  - Visual quality improved in many routes.
  - Remaining quality complaints are concentrated in Saronic seaway behavior.

## What Worked
- Two rendering modes (`Seaway` and `Straight`) are stable and switch correctly.
- Active route behavior and marker prioritization remain functional.
- Canonical NM governance remains intact.
- `npm run check:distances` passes with current data.
- Production deploys from `main` are working.

## What Did Not Work (or Not Enough)
- Auto-generated marine paths from graph routing were not reliable enough for final visuals.
- Pure threshold-based filtering is not sufficient to guarantee good geometry.
- Passing distance audit does not imply visually credible seaway paths.
- Saronic still suffers from geometry that can appear as awkward near-parallel tracks or overly linear coastal runs depending on zoom and viewpoint.

## Key Diagnostic Findings
- Total sailing legs (canonical > 0): `91`.
- Legs with canonical >= 20 NM: `58`.
- Current long legs still very close to straight geometry (`seaway/straight < 1.03`): `29`.
- This indicates many long legs still need stronger marine shaping even though NM checks pass.

Saronic current leg snapshot (from local diagnostic run):
- Day 7 Porto Heli -> Monemvasia: straight `38.1`, seaway `38.5`, delta vs canonical `8.4%`.
- Day 11 Kythira -> Monemvasia: straight `26.5`, seaway `26.8`, delta `4.3%`.
- Day 12 Monemvasia -> Spetses: straight `34.7`, seaway `41.0`, delta `2.3%`.
- These pass policy but still create unsatisfying visual lane behavior in some views.

## Root Cause Hypothesis
- The current model is waypoint-per-inbound-leg without a shared lane graph.
- Outbound and return legs are authored independently, so they can drift into visually inconsistent corridors.
- There is no topology validation (no "same corridor id", no corridor continuity rule, no coastline-awareness score).
- Therefore geometry can be numerically valid while still looking wrong.

## Recommended Pickup Plan (for next dev)

### Phase 1: Introduce lane primitives (data model)
- Add a lane catalog (named sea corridors), e.g.:
  - `saronic_southbound_outer_lane`
  - `saronic_return_inner_lane`
  - `attica_kea_lane`
- Map each leg to a lane id plus optional segment cut.
- Keep existing `SEA_WAYPOINTS` as compatibility fallback.

### Phase 2: Enforce geometric consistency
- Add a script `scripts/check-route-geometry.mjs` with hard failures on:
  - excessive lane drift between paired legs (outbound/return) when shared lane is expected,
  - abrupt angle changes (spikes),
  - long legs with seaway ratio too close to straight (configurable minimum, e.g. 1.03 for open-water legs),
  - optional coastline proximity anomalies (if coastline dataset is added later).

### Phase 3: Saronic-first hardening
- Rebuild Saronic using lane ids, not ad-hoc waypoints.
- Explicitly pair:
  - day 7 with day 12 (main corridor relationship),
  - day 9 with day 10 and day 11 transitions.
- Decide if visual strategy should show:
  - identical corridor on outbound/return (single thick overlap), or
  - intentional small directional offset for readability.

### Phase 4: Apply same lane approach to all routes
- Migrate all long legs to lane-id approach.
- Keep audit thresholds and existing canonical NM policy unchanged.

## Repro and Validation Commands
- Syntax checks:
  - `node --check /Users/emmafjelldahl/Documents/kodeprosjekter/sailing-routes-v3/public/app.js`
  - `node --check /Users/emmafjelldahl/Documents/kodeprosjekter/sailing-routes-v3/public/sea-waypoints.js`
  - `node --check /Users/emmafjelldahl/Documents/kodeprosjekter/sailing-routes-v3/scripts/check-distances.mjs`
- Distance governance:
  - `npm run check:distances`
- Visual QA:
  - Run local server and capture per-route screenshots in both modes via Playwright.
  - Compare `*-seaway.png` vs `*-straight.png` route by route.

## Notes About External Tools Used
- A wrong npm package named `searoute` (service router library) was initially installed by name collision and is not the maritime routing package.
- Maritime `searoute` usage was done through Python in `.venv-searoute` (`import searoute as sr`).
- Python marine graph output frequently needed manual correction and pruning for this domain.

## Handover Summary
- System is stable and deployable.
- Distance policy is enforced and currently passing.
- Major progress made on all-route coverage.
- Remaining issue is not plumbing; it is geometry quality strategy.
- Next dev should implement lane-based geometry governance (not more ad-hoc waypoint edits).
