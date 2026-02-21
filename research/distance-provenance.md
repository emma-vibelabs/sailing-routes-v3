# Distance Provenance and NM Trust Model

Last updated: 2026-02-21

## Purpose
This project intentionally exposes two NM values:
- Canonical itinerary NM (`stops[].nm`, `route.distance`)
- Map geometry NM (computed from currently rendered route shape)

These are different on purpose: planning value vs rendered-shape value.

## Canonical Distance Policy
Canonical itinerary values live in `public/routes-data.js`:
- Per leg: `stops[].nm`
- Per route total: `route.distance`

UI cards and route detail totals use canonical values.
Canonical values are not automatically rewritten from map geometry.

## Map Geometry Policy
Map geometry has two modes:
- `straight`: stop-to-stop direct lines
- `seaway`: stop-to-stop with optional `stops[].waypoints` on inbound legs

Geometry distance is measured using Leaflet geodesic distance (`map.distance`) and converted with:
- `1 NM = 1852 m`

Map geometry NM is shown in the measure panel, including a one-click "Measure active route" action for reproducible route-level measurement in the active mode.

## Source Index
External references used for canonical distance sanity checks and leg cross-checking:
- SailingIssues - Distances between Greek ports: https://sailingissues.com/distances-greek-ports.html
- SailingIssues - Cyclades itineraries: https://sailingissues.com/yachting-guide/cyclades-itineraries.html
- Ionian Charter (Saronic example legs): https://www.ionian-charter.com/el/lagoon/item/203-saronic-day1-2
- Sail Greece distances calculator: https://www.sailgreeceyachts.com/sailing-distances-greece.html
- OpenSeaMap trip planner workflow: https://wiki.openseamap.org/wiki/h:En:Trip_Planner
- Leaflet reference (distance APIs): https://leafletjs.com/reference
- NWS glossary (nautical mile): https://www.weather.gov/ggw/GlossaryN

## Route-to-Source Mapping
- `saronic`: SailingIssues distances + Ionian Charter (Alimos->Aegina, Poros->Hydra, Hydra->Spetses examples) + Sail Greece calculator.
- `klassisk-kykladene`: SailingIssues Cyclades itineraries + SailingIssues distances + Sail Greece calculator.
- `fulle-kykladene`: SailingIssues Cyclades itineraries + SailingIssues distances + Sail Greece calculator.
- `smaa-kykladene`: SailingIssues Cyclades itineraries + SailingIssues distances + Sail Greece calculator.
- `nordlige-kykladene`: SailingIssues Cyclades itineraries + SailingIssues distances + Sail Greece calculator.
- `lipsi-tur-retur`: SailingIssues distances + Sail Greece calculator.
- `sporadene`: SailingIssues distances + Sail Greece calculator.
- `saronisk-kyklader`: Hybrid of Saronic + Cyclades references above; anchor legs cross-checked in Ionian Charter/SailingIssues and calculator.

## Anchor Legs (Manual Reference Points)
These are representative legs used as recurring spot checks when editing waypoints:
- Alimos Marina -> Aegina
- Aegina -> Poros
- Poros -> Hydra
- Hydra -> Spetses
- Alimos Marina -> Kea (via Sounion corridor)
- Syros -> Alimos Marina return corridor
- Cape Sounion -> Alimos Marina return corridor

Reference set for anchor legs:
- Ionian Charter Saronic examples
- SailingIssues distances and itinerary pages
- Sail Greece calculator

## Audit Policy
Automated audit script: `scripts/check-distances.mjs`

Checks:
- Route delta: `abs(canonical - seaway) / canonical <= 10%`
- Leg delta: `abs(canonicalLeg - seawayLeg) / canonicalLeg <= 25%`
- Reports also include straight totals for transparent mode comparison.
- Marker overlap: same-coordinate active-route stops must get unique pixel offsets.

Waivers:
- Optional file: `research/distance-waivers.json`
- Route waiver key: `routes.<routeId>`
- Leg waiver key: `legs.<routeId>:day<dayNumber>` (or `<routeId>:<dayNumber>`)

## Current Baseline (2026-02-21)
From `npm run check:distances`:
- `saronic`: canonical 270.0 NM, seaway delta 8.5%
- `klassisk-kykladene`: canonical 293.0 NM, seaway delta 0.4%
- `fulle-kykladene`: canonical 322.0 NM, seaway delta 0.0%
- `smaa-kykladene`: canonical 323.0 NM, seaway delta 7.2%
- `nordlige-kykladene`: canonical 204.0 NM, seaway delta 1.8%
- `lipsi-tur-retur`: canonical 375.0 NM, seaway delta 5.2%
- `sporadene`: canonical 302.0 NM, seaway delta 3.3%
- `saronisk-kyklader`: canonical 288.0 NM, seaway delta 3.4%

## Why This Is Trustworthy
- Canonical trip NM remains explicit and source-backed.
- Map NM is mode-specific, measurable, and reproducible.
- Delta thresholds prevent silent divergence.
- Waivers are explicit metadata, not hidden in code.
- The audit is scriptable in CI/local (`npm run check:distances`).

## Internal Supporting Research
- `research/01-classic-cyclades.md`
- `research/02-saronic-gulf.md`
- `research/03-small-cyclades.md`
- `research/04-dodecanese.md`
- `research/05-sporades.md`
- `research/06-ionian.md`
