/**
 * IMAGE_URLS — curated Unsplash photo base URLs for all destinations
 * Sourced from sailing-routes-claude STOP_IMAGES and sailing-map ROUTE_HEROES.
 * Usage: IMAGE_URLS["Aegina"] returns the base URL without query params.
 */
window.IMAGE_URLS = {

  // ── Route hero images ───────────────────────────────────────────────────
  "hero-classic-cyclades":  "https://images.unsplash.com/photo-1746917833825-9d834847ed56",
  "hero-saronic":           "https://images.unsplash.com/photo-1756155062023-524adfefb747",
  "hero-deep-cyclades":     "https://images.unsplash.com/photo-1513921789195-fe5dd0f15c64",
  "hero-dodecanese":        "https://images.unsplash.com/photo-1680205415325-3ceebea06319",
  "hero-sporades":          "https://images.unsplash.com/photo-1630926517544-58f45c00804a",
  "hero-ionian":            "https://images.unsplash.com/photo-1571021785662-712e369a2829",

  // ── Attica & mainland ports ──────────────────────────────────────────────
  "Piraeus":                "https://images.unsplash.com/photo-1695479315311-d3e8fb693390",
  "Alimos Marina":          "https://images.unsplash.com/photo-1695479315311-d3e8fb693390",
  "Lavrion":                "https://images.unsplash.com/photo-1695479315311-d3e8fb693390",
  "Cape Sounion":           "https://images.unsplash.com/photo-1520283451192-c3b05d7db25b",

  // ── Saronic Gulf ────────────────────────────────────────────────────────
  "Aegina":                 "https://images.unsplash.com/photo-1685902099987-229cf85ccba9",
  "Angistri":               "https://images.unsplash.com/photo-1539724491468-b5da9e2e3a87",
  "Poros":                  "https://images.unsplash.com/photo-1661329942813-7520558a2108",
  "Hydra":                  "https://images.unsplash.com/photo-1677268357206-c6cb0e71d9e3",
  "Spetses":                "https://images.unsplash.com/photo-1539724491468-b5da9e2e3a87",
  "Porto Heli":             "https://images.unsplash.com/photo-1602246731546-a81958471656",
  "Ermioni":                "https://images.unsplash.com/photo-1602246731546-a81958471656",
  "Navplion":               "https://images.unsplash.com/photo-1625186823734-e581d48b7ce6",

  // ── Peloponnese ──────────────────────────────────────────────────────────
  "Monemvasia":             "https://images.unsplash.com/photo-1607614372586-72d399dc57b6",
  "Elafonisos":             "https://images.unsplash.com/photo-1654163170293-aa3b529f669f",
  "Kythira":                "https://images.unsplash.com/photo-1566658255255-59a1426287b9",
  "Leonidio":               "https://images.unsplash.com/photo-1607614372586-72d399dc57b6",
  "Kyparissi":              "https://images.unsplash.com/photo-1607614372586-72d399dc57b6",

  // ── Western Cyclades ─────────────────────────────────────────────────────
  "Kea":                    "https://images.unsplash.com/photo-1507445761851-c6c3c69b4512",
  "Kythnos":                "https://images.unsplash.com/photo-1661807029914-cef6da0f72fd",
  "Serifos":                "https://images.unsplash.com/photo-1564958067614-c77cfca1a72a",
  "Sifnos":                 "https://images.unsplash.com/photo-1595216433227-31036820720a",
  "Milos":                  "https://images.unsplash.com/photo-1693941545104-ceb48653ba6d",
  "Folegandros":            "https://images.unsplash.com/photo-1513921789195-fe5dd0f15c64",

  // ── Central & Eastern Cyclades ───────────────────────────────────────────
  "Santorini":              "https://images.unsplash.com/photo-1531876137992-22b6ce5221f1",
  "Ios":                    "https://images.unsplash.com/photo-1601581875031-e3af5bfb27a8",
  "Naxos":                  "https://images.unsplash.com/photo-1652639032641-181ce7236ec6",
  "Paros":                  "https://images.unsplash.com/photo-1602008194020-13ac6665ebdb",
  "Mykonos":                "https://images.unsplash.com/photo-1494356830678-78f6cd754f1a",
  "Syros":                  "https://images.unsplash.com/photo-1746314177081-68a06ca3518b",
  "Andros":                 "https://images.unsplash.com/photo-1650980867635-98ee58ef17b3",
  "Tinos":                  "https://images.unsplash.com/photo-1627886427864-1f27b8b18cc6",
  "Delos":                  "https://images.unsplash.com/photo-1654418392363-f9d15856e223",

  // ── Small Cyclades ───────────────────────────────────────────────────────
  "Koufonisia":             "https://images.unsplash.com/photo-1606834138864-449f4617b41d",
  "Schinoussa":             "https://images.unsplash.com/photo-1606834138864-449f4617b41d",
  "Iraklia":                "https://images.unsplash.com/photo-1606834138864-449f4617b41d",
  "Donoussa":               "https://images.unsplash.com/photo-1606834138864-449f4617b41d",
  "Rinia":                  "https://images.unsplash.com/photo-1606834138864-449f4617b41d",
  "Amorgos":                "https://images.unsplash.com/photo-1683463170502-7d3d9a641283",
  "Dokos":                  "https://images.unsplash.com/photo-1606834138864-449f4617b41d",

  // ── Dodecanese ───────────────────────────────────────────────────────────
  "Patmos":                 "https://images.unsplash.com/photo-1730562934913-17f443692079",
  "Lipsi":                  "https://images.unsplash.com/photo-1730562934913-17f443692079",
  "Leros":                  "https://images.unsplash.com/photo-1691246806224-a6e9dde3678d",
  "Kalymnos":               "https://images.unsplash.com/photo-1570551649284-3c61341b63f1",
  "Kos":                    "https://images.unsplash.com/photo-1691246806224-a6e9dde3678d",
  "Nisyros":                "https://images.unsplash.com/photo-1542099139-dec5aba3fee4",
  "Tilos":                  "https://images.unsplash.com/photo-1542099139-dec5aba3fee4",
  "Symi":                   "https://images.unsplash.com/photo-1672175157531-a2ebfd59eeb6",
  "Rhodes":                 "https://images.unsplash.com/photo-1680205415325-3ceebea06319",

  // ── Sporades ─────────────────────────────────────────────────────────────
  "South Evia":             "https://images.unsplash.com/photo-1631196719498-375bf6622ce5",
  "Evia Sør":               "https://images.unsplash.com/photo-1631196719498-375bf6622ce5",
  "Skyros":                 "https://images.unsplash.com/photo-1631196719498-375bf6622ce5",
  "Alonissos":              "https://images.unsplash.com/photo-1631720070979-30d8eb728ce4",
  "Marine Park":            "https://images.unsplash.com/photo-1631720070979-30d8eb728ce4",
  "Skopelos":               "https://images.unsplash.com/photo-1630926517544-58f45c00804a",
  "Skiathos":               "https://images.unsplash.com/photo-1471085507142-12355181f804",
  "Trikeri":                "https://images.unsplash.com/photo-1631720070979-30d8eb728ce4",
  "North Evia":             "https://images.unsplash.com/photo-1631196719498-375bf6622ce5",
  "Kymi":                   "https://images.unsplash.com/photo-1631196719498-375bf6622ce5",

  // ── Crete ────────────────────────────────────────────────────────────────
  "Heraklion":              "https://images.unsplash.com/photo-1616690572187-fbd8a346a1ac",
  "Rethymno":               "https://images.unsplash.com/photo-1555698152-c637efae776f",
  "Chania":                 "https://images.unsplash.com/photo-1697730247203-0b47351da1a1",

  // ── Generic fallbacks ────────────────────────────────────────────────────
  "greek-island":           "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "greek-sea":              "https://images.unsplash.com/photo-1559827260-dc66d52bef19",

};
