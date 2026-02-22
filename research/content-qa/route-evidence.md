# Route Evidence (Web QA)

Date: 2026-02-22

## Method
- Route trust uses a matrix: `Trust` (source reliability), `Relevancy` (match to route topology), `Quality` (distance and harbor practicality coherence).
- Verdicts combine web-source evidence with local geometry/canonical-NM consistency checks.
- Canonical itinerary NM remains `route.distance` / `stop.nm`; geometry NM is tracked separately.

## Source Registry
- `sailingissues_distances`: [SailingIssues: Distances between Greek ports](https://sailingissues.com/distances-greek-ports.html)
- `sailingissues_cyclades`: [SailingIssues: Cyclades itineraries](https://sailingissues.com/yachting-guide/cyclades-itineraries.html)
- `ionian_saronic_day1`: [Ionian Charter: Saronic route day 1-2](https://www.ionian-charter.com/el/lagoon/item/203-saronic-day1-2)
- `sailgreece_distances`: [Sail Greece Yachts: Sailing distance calculator](https://www.sailgreeceyachts.com/sailing-distances-greece.html)
- `sailgreece_routes`: [Sail Greece Yachts: Greek island sailing routes overview](https://www.sailgreeceyachts.com/greek_island_sailing_routes.html)
- `sailgreece_saronic`: [Sail Greece Yachts: Saronic Gulf route](https://www.sailgreeceyachts.com/sailing_route_saronic_gulf.html)
- `sailgreece_peloponnese`: [Sail Greece Yachts: Saronic + Eastern Peloponnese route](https://www.sailgreeceyachts.com/sailing_route_saronic_and_eastern_peloponnesus.html)
- `sailgreece_cyclades_1`: [Sail Greece Yachts: Cyclades route 1](https://www.sailgreeceyachts.com/sailing_route_cyclades_islands_1.html)
- `sailgreece_cyclades_2`: [Sail Greece Yachts: Cyclades route 2](https://www.sailgreeceyachts.com/sailing_route_cyclades_islands_2.html)
- `sailgreece_north_cyclades`: [Sail Greece Yachts: Northern + Middle Cyclades route](https://www.sailgreeceyachts.com/sailing_route_northern_and_middle_cyclades.html)
- `moorings_greece`: [Moorings: Greece destination overview](https://www.moorings.com/destinations/mediterranean/greece)
- `moorings_athens`: [Moorings: Athens base information](https://www.moorings.com/destinations/mediterranean/greece/athens)
- `cruiserswiki_cyclades`: [CruisersWiki: Cyclades islands](https://www.cruiserswiki.org/wiki/Cyclades_Islands)
- `cruiserswiki_skiathos`: [CruisersWiki: Skiathos](https://www.cruiserswiki.org/wiki/Skiathos)
- `cruiserswiki_alonnisos`: [CruisersWiki: Alonnisos](https://www.cruiserswiki.org/wiki/Alonnisos)
- `cruiserswiki_patmos`: [CruisersWiki: Patmos](https://www.cruiserswiki.org/wiki/Patmos)
- `cruiserswiki_leros`: [CruisersWiki: Leros](https://www.cruiserswiki.org/wiki/Leros)
- `alonissos_park`: [National Marine Park of Alonissos (official site)](https://www.alonissos-park.gr/)

## Route Verdicts
| Route ID | Verdict | Trust | Canonical NM | Seaway NM | Delta | Evidence |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `saronic` | Trusted | 0.86 | 270 | 247 | 8.5% | `ionian_saronic_day1`, `sailingissues_distances`, `sailgreece_saronic`, `sailgreece_distances` |
| `klassisk-kykladene` | Conditional | 0.78 | 293 | 294.2 | 0.4% | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_1`, `sailgreece_distances` |
| `fulle-kykladene` | Conditional | 0.76 | 322 | 322 | 0% | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_cyclades_2`, `sailgreece_distances` |
| `smaa-kykladene` | Conditional | 0.75 | 323 | 299.7 | 7.2% | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_north_cyclades`, `sailgreece_distances` |
| `nordlige-kykladene` | Conditional | 0.77 | 204 | 200.4 | 1.8% | `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_north_cyclades`, `sailgreece_distances` |
| `lipsi-tur-retur` | Conditional | 0.71 | 375 | 355.4 | 5.2% | `sailingissues_distances`, `sailgreece_distances`, `cruiserswiki_patmos`, `cruiserswiki_leros` |
| `sporadene` | Needs revision | 0.66 | 302 | 292 | 3.3% | `sailingissues_distances`, `moorings_greece`, `cruiserswiki_skiathos`, `cruiserswiki_alonnisos`, `alonissos_park` |
| `saronisk-kyklader` | Conditional | 0.74 | 288 | 278.3 | 3.4% | `ionian_saronic_day1`, `sailingissues_cyclades`, `sailingissues_distances`, `sailgreece_routes` |

## Notes
- `saronic`: Distance profile and protected-gulf pattern are consistent; canonical NM is now internally consistent.
- `klassisk-kykladene`: Widely recommended Cyclades structure; open-water exposure and Meltemi sensitivity should remain explicit in copy.
- `fulle-kykladene`: Plausible advanced Cyclades circuit; includes longer exposed legs that require condition-aware planning.
- `smaa-kykladene`: Small-Cyclades focus is plausible; route messaging should keep weather-window guidance prominent.
- `nordlige-kykladene`: Northern-Cyclades loop is coherent; route remains weather-dependent around exposed channels.
- `lipsi-tur-retur`: Long eastern extension is feasible but demanding; copy should continue to frame this as advanced mileage.
- `sporadene`: Sporades content is route-feasible, but round-trip from Alimos is schedule-sensitive and should stay explicitly caveated.
- `saronisk-kyklader`: Hybrid route is coherent; transition legs between sheltered and exposed sectors should remain explicitly signposted.

## Applied Data Correction Matrix
| Change | Old | New | Trust | Relevancy | Quality | Decision |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `smaa-kykladene.distance` parity vs `sum(stop.nm)` | 321 | 323 | 1.00 | 1.00 | 0.98 | Updated |
| `lipsi-tur-retur.distance` parity vs `sum(stop.nm)` | 377 | 375 | 1.00 | 1.00 | 0.98 | Updated |

## Measurement Provenance
- [OpenSeaMap trip-planner workflow](https://wiki.openseamap.org/wiki/h:En:Trip_Planner)
- [Leaflet distance reference](https://leafletjs.com/reference)
- [Nautical mile definition (NWS)](https://www.weather.gov/ggw/GlossaryN)
