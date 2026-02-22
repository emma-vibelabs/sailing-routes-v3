# Stop Evidence (NO+EN Content + Image Fit)

Date: 2026-02-22

## Method
- One-record-per-stop QA using trust/relevancy/quality scoring and route-context source bundles.
- Policy: no bulk text replacement; only high-confidence fixes were applied.
- Added missing stop aliases in `ISLANDS_DATA` for route/detail-link integrity: `kythnos-loutra`, `alonissos-marinpark`, `evia-sør`.

## Applied Content Matrix (New vs Missing)
| Stop Slug | Previous State | New State | Trust | Relevancy | Quality | Decision |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `kythnos-loutra` | Missing dedicated stop entry | Added dedicated bilingual stop entry | 0.92 | 0.94 | 0.90 | Added |
| `alonissos-marinpark` | Missing dedicated stop entry | Added dedicated bilingual stop entry | 0.88 | 0.93 | 0.88 | Added |
| `evia-sør` | Missing dedicated stop entry | Added dedicated bilingual stop entry | 0.90 | 0.92 | 0.88 | Added |

| Stop | Routes | Verdict | Confidence | Image Grade | Sources | Action |
| --- | --- | --- | ---: | --- | --- | --- |
| Aegina | saronic, saronisk-kyklader | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic` | Retained existing text; no high-confidence factual conflict detected. |
| Alimos Marina | saronic, klassisk-kykladene, fulle-kykladene, smaa-kykladene, nordlige-kykladene, lipsi-tur-retur, sporadene, saronisk-kyklader | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Alonissos | sporadene | Trusted | 0.79 | Regional fit | `sailingissues_distances`, `moorings_greece`, `cruiserswiki_skiathos`, `alonissos_park` | Retained existing text; no high-confidence factual conflict detected. |
| Alonissos Marinpark | sporadene | Trusted | 0.81 | Regional fit | `sailingissues_distances`, `moorings_greece`, `cruiserswiki_skiathos`, `alonissos_park` | Added explicit stop alias entry in ISLANDS_DATA to keep stop-detail links resolvable. |
| Amorgos | smaa-kykladene, lipsi-tur-retur | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1`, `sailgreece_distances` | Retained existing text; no high-confidence factual conflict detected. |
| Amorgos — Katapola | smaa-kykladene | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1`, `sailgreece_distances` | Retained existing text; no high-confidence factual conflict detected. |
| Andros | nordlige-kykladene | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Retained existing text; no high-confidence factual conflict detected. |
| Andros — Batsi | nordlige-kykladene | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Retained existing text; no high-confidence factual conflict detected. |
| Cape Sounion | nordlige-kykladene, sporadene, saronisk-kyklader | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Delos | nordlige-kykladene | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Retained existing text; no high-confidence factual conflict detected. |
| Elafonisos | saronic | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic` | Retained existing text; no high-confidence factual conflict detected. |
| Evia — Kymi | sporadene | Trusted | 0.79 | Regional fit | `sailingissues_distances`, `moorings_greece`, `cruiserswiki_skiathos`, `alonissos_park` | Retained existing text; no high-confidence factual conflict detected. |
| Evia Sør | sporadene | Trusted | 0.81 | Regional fit | `sailingissues_distances`, `moorings_greece`, `cruiserswiki_skiathos`, `alonissos_park` | Added explicit stop alias entry in ISLANDS_DATA to keep stop-detail links resolvable. |
| Folegandros | klassisk-kykladene, fulle-kykladene | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Retained existing text; no high-confidence factual conflict detected. |
| Hydra | saronic, saronisk-kyklader | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic` | Retained existing text; no high-confidence factual conflict detected. |
| Ios | klassisk-kykladene, fulle-kykladene, smaa-kykladene | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Retained existing text; no high-confidence factual conflict detected. |
| Kea | klassisk-kykladene, fulle-kykladene, smaa-kykladene, nordlige-kykladene, lipsi-tur-retur, saronisk-kyklader | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Koufonisia | smaa-kykladene, lipsi-tur-retur | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1`, `sailgreece_distances` | Retained existing text; no high-confidence factual conflict detected. |
| Kythira | saronic | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic` | Retained existing text; no high-confidence factual conflict detected. |
| Kythnos | fulle-kykladene, smaa-kykladene, nordlige-kykladene, lipsi-tur-retur, saronisk-kyklader | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Kythnos Loutra | klassisk-kykladene | Trusted | 0.81 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Added explicit stop alias entry in ISLANDS_DATA to keep stop-detail links resolvable. |
| Leros | lipsi-tur-retur | Trusted | 0.79 | Regional fit | `sailingissues_distances`, `sailgreece_distances`, `cruiserswiki_patmos` | Retained existing text; no high-confidence factual conflict detected. |
| Lipsi | lipsi-tur-retur | Trusted | 0.79 | Mismatch | `sailingissues_distances`, `sailgreece_distances`, `cruiserswiki_patmos` | No high-confidence Unsplash replacement found; kept existing image pending stronger geo-tagged candidate. |
| Milos | fulle-kykladene, saronisk-kyklader | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Milos — Adamas | klassisk-kykladene | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Milos — Kleftiko | klassisk-kykladene | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Monemvasia | saronic | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic` | Retained existing text; no high-confidence factual conflict detected. |
| Mykonos | fulle-kykladene, smaa-kykladene, nordlige-kykladene, lipsi-tur-retur | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1`, `sailgreece_distances` | Retained existing text; no high-confidence factual conflict detected. |
| Naxos | klassisk-kykladene, fulle-kykladene, smaa-kykladene, lipsi-tur-retur | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1`, `sailgreece_distances` | Retained existing text; no high-confidence factual conflict detected. |
| Paros | fulle-kykladene, smaa-kykladene, saronisk-kyklader | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Paros — Naoussa | klassisk-kykladene | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Retained existing text; no high-confidence factual conflict detected. |
| Patmos | lipsi-tur-retur | Trusted | 0.79 | Regional fit | `sailingissues_distances`, `sailgreece_distances`, `cruiserswiki_patmos` | Retained existing text; no high-confidence factual conflict detected. |
| Poros | saronic, saronisk-kyklader | Conditional | 0.68 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic` | Manual fallback verification completed from route-level and regional sailing sources. |
| Porto Heli | saronic | Trusted | 0.79 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic` | Retained existing text; no high-confidence factual conflict detected. |
| Santorini | fulle-kykladene | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Retained existing text; no high-confidence factual conflict detected. |
| Santorini — Vlychada | fulle-kykladene | Trusted | 0.79 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Retained existing text; no high-confidence factual conflict detected. |
| Schinoussa | smaa-kykladene | Conditional | 0.68 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Manual fallback verification completed from route-level and regional sailing sources. |
| Serifos | klassisk-kykladene, fulle-kykladene, smaa-kykladene, saronisk-kyklader | Conditional | 0.68 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Manual fallback verification completed from route-level and regional sailing sources. |
| Sifnos | klassisk-kykladene, fulle-kykladene, saronisk-kyklader | Conditional | 0.68 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailingissues_cyclades` | Manual fallback verification completed from route-level and regional sailing sources. |
| Skiathos | sporadene | Conditional | 0.68 | Regional fit | `sailingissues_distances`, `moorings_greece`, `cruiserswiki_skiathos`, `alonissos_park` | Manual fallback verification completed from route-level and regional sailing sources. |
| Skopelos | sporadene | Conditional | 0.68 | Regional fit | `sailingissues_distances`, `moorings_greece`, `cruiserswiki_skiathos`, `alonissos_park` | Manual fallback verification completed from route-level and regional sailing sources. |
| Skyros | sporadene | Conditional | 0.68 | Regional fit | `sailingissues_distances`, `moorings_greece`, `cruiserswiki_skiathos`, `alonissos_park` | Manual fallback verification completed from route-level and regional sailing sources. |
| Spetses | saronic | Conditional | 0.68 | Regional fit | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic` | Manual fallback verification completed from route-level and regional sailing sources. |
| Syros | klassisk-kykladene, fulle-kykladene, smaa-kykladene, nordlige-kykladene, lipsi-tur-retur | Conditional | 0.68 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1`, `sailgreece_distances` | Manual fallback verification completed from route-level and regional sailing sources. |
| Tinos — Panormos | nordlige-kykladene | Conditional | 0.68 | Regional fit | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1` | Manual fallback verification completed from route-level and regional sailing sources. |
