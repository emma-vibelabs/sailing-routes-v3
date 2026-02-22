/**
 * Seaway waypoint overrides (leg inbound by stop day).
 * Seed source: searoute maritime graph (generated 2026-02-22), then manually pruned.
 * Policy: keep only overrides that pass NM audit thresholds and improve sea-lane realism.
 * Format: window.SEA_WAYPOINTS[routeId][day] = [[lat,lng], ...]
 */
window.SEA_WAYPOINTS = {
  "saronic": {},
  "klassisk-kykladene": {
    "11": [
      [
        36.84934,
        25.25767
      ]
    ]
  },
  "fulle-kykladene": {
    "10": [
      [
        36.84934,
        25.25767
      ]
    ],
    "13": [
      [
        37.4836,
        25.17282
      ],
      [
        37.50072,
        25.08254
      ]
    ]
  },
  "smaa-kykladene": {
    "4": [
      [
        37.50072,
        25.08254
      ],
      [
        37.48367,
        25.17246
      ]
    ],
    "11": [
      [
        36.79835,
        25.50726
      ],
      [
        36.82119,
        25.39548
      ],
      [
        36.84934,
        25.25767
      ]
    ],
    "12": [
      [
        36.84934,
        25.25767
      ]
    ],
    "14": [
      [
        37.27952,
        24.23668
      ],
      [
        37.35615,
        24.15979
      ],
      [
        37.5496,
        23.9657
      ],
      [
        37.61615,
        23.88591
      ],
      [
        37.8192,
        23.6425
      ]
    ]
  },
  "nordlige-kykladene": {
    "2": [
      [
        37.8,
        24.45
      ],
      [
        37.88397,
        24.6065
      ]
    ],
    "7": [
      [
        37.4836,
        25.17282
      ],
      [
        37.50072,
        25.08254
      ]
    ]
  },
  "lipsi-tur-retur": {
    "3": [
      [
        37.50072,
        25.08254
      ],
      [
        37.48367,
        25.17246
      ]
    ],
    "4": [
      [
        37.4836,
        25.17282
      ],
      [
        37.45968,
        25.16928
      ],
      [
        37.2885,
        25.53108
      ],
      [
        37.28312,
        26.02335
      ],
      [
        37.28239,
        26.09022
      ],
      [
        37.2784,
        26.17701
      ]
    ]
  },
  "sporadene": {},
  "saronisk-kyklader": {}
};
