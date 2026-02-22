# Image Audit (Trust/Relevancy/Quality Matrix)

Date: 2026-02-22

## Scoring Model
- `Trust`: source provenance confidence (location metadata / known source quality).
- `Relevancy`: visual match to stop identity (harbor/island context).
- `Quality`: framing/resolution suitability for cards/heroes.
- Rule: replace only when new asset has better weighted score or solves a hard mismatch.

## Applied Replacements
| Key | Previous | Current | Trust | Relevancy | Quality | Grade | Evidence | Rationale |
| --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| Alimos Marina | https://images.unsplash.com/photo-1695479315311-d3e8fb693390 | https://images.unsplash.com/photo-1613806470308-9a7cf4820063 | 0.73 | 0.64 | 0.81 | Regional fit | `unsplash_alimos` | Previous image was low-stop-specific; replacement is location-tagged to Alimos/Athens region. |
| Aegina | https://images.unsplash.com/photo-1685902099987-229cf85ccba9 | https://images.unsplash.com/photo-1566658250122-f325851b112d | 0.84 | 0.78 | 0.83 | Regional fit | `unsplash_aegina` | Replacement has explicit Aegina location metadata and maritime context. |
| Hydra | https://images.unsplash.com/photo-1677268357206-c6cb0e71d9e3 | https://images.unsplash.com/photo-1663868124748-fd3cad63c59b | 0.83 | 0.76 | 0.82 | Regional fit | `unsplash_hydra` | Replacement has explicit Hydra location metadata and harbor context. |
| Alonissos | https://images.unsplash.com/photo-1631720070979-30d8eb728ce4 | https://images.unsplash.com/photo-1710872417249-5e353f45f8e0 | 0.79 | 0.62 | 0.80 | Regional fit | `unsplash_alonissos` | Replacement has explicit Alonissos location metadata and nautical framing. |
| Marine Park | https://images.unsplash.com/photo-1631720070979-30d8eb728ce4 | https://images.unsplash.com/photo-1710872417249-5e353f45f8e0 | 0.79 | 0.60 | 0.80 | Regional fit | `unsplash_alonissos` | Kept consistent with Alonissos image lineage and metadata provenance. |

## Full Referenced-Key Grades
| Image Key | Grade | Decision |
| --- | --- | --- |
| Aegina | Regional fit | Replaced (matrix-improved) |
| Alimos Marina | Regional fit | Replaced (matrix-improved) |
| Alonissos | Regional fit | Replaced (matrix-improved) |
| Amorgos | Regional fit | Kept |
| Andros | Regional fit | Kept |
| Cape Sounion | Regional fit | Kept |
| Delos | Regional fit | Kept |
| Elafonisos | Regional fit | Kept |
| Evia Sør | Regional fit | Kept |
| Folegandros | Regional fit | Kept |
| Hydra | Regional fit | Replaced (matrix-improved) |
| Ios | Regional fit | Kept |
| Kalymnos | Regional fit | Kept |
| Kea | Regional fit | Kept |
| Kos | Regional fit | Kept |
| Koufonisia | Regional fit | Kept |
| Kymi | Regional fit | Kept |
| Kythira | Regional fit | Kept |
| Kythnos | Regional fit | Kept |
| Lavrion | Regional fit | Kept |
| Leros | Regional fit | Kept |
| Lipsi | Mismatch | Kept (insufficient-confidence alternative) |
| Milos | Regional fit | Kept |
| Monemvasia | Regional fit | Kept |
| Mykonos | Regional fit | Kept |
| Naxos | Regional fit | Kept |
| Nisyros | Regional fit | Kept |
| Paros | Regional fit | Kept |
| Patmos | Regional fit | Kept |
| Poros | Regional fit | Kept |
| Porto Heli | Regional fit | Kept |
| Rhodes | Regional fit | Kept |
| Santorini | Regional fit | Kept |
| Schinoussa | Regional fit | Kept |
| Serifos | Regional fit | Kept |
| Sifnos | Regional fit | Kept |
| Skiathos | Regional fit | Kept |
| Skopelos | Regional fit | Kept |
| Skyros | Regional fit | Kept |
| South Evia | Regional fit | Kept |
| Spetses | Regional fit | Kept |
| Symi | Regional fit | Kept |
| Syros | Regional fit | Kept |
| Tinos | Regional fit | Kept |
