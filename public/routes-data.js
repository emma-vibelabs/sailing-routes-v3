/**
 * Greek Sailing Routes — Comprehensive Route Data
 * 7 curated routes with full day-by-day itineraries
 * All coordinates verified, distances in NM, times at ~5.5kn avg
 * Bilingual: { no, en } for all user-facing strings
 */

window.ROUTES_DATA = [

  // ─────────────────────────────────────────────
  // Route 1: Saroniske Bukt
  // ─────────────────────────────────────────────
  {
    id: "saronic",
    name: { no: "Saroniske Bukt", en: "Saronic Gulf" },
    tagline: { no: "Den tryggeste introduksjonen til gresk seiling", en: "The safest introduction to Greek sailing" },
    region: { no: "Saroniske bukta & Peloponnese", en: "Saronic Gulf & Peloponnese" },
    color: "#2d8a6e",
    description: {
      no: "Den perfekte ruten for de som seiler i Hellas for første gang. Korte dagsetapper mellom historiske oyer med rolig sjø og forutsigbar vind. Fra Athen sørover langs Peloponnese med stopp ved Hydra, Monemvasia og den vakre øya Elafonisos.",
      en: "The perfect route for first-time sailors in Greece. Short daily legs between historic islands with calm seas and predictable winds. From Athens southward along the Peloponnese with stops at Hydra, Monemvasia, and the beautiful island of Elafonisos."
    },
    distance: 270,
    sailingDays: 12,
    restDays: 2,
    difficulty: { no: "Lett", en: "Easy" },
    difficultyLevel: 1,
    startPort: "Alimos Marina",
    endPort: "Alimos Marina",
    bestFor: { no: "Nybegynnere, kultur, historie", en: "Beginners, culture, history" },
    heroImage: "Hydra",
    weather: {
      airDay: "18-23\u00b0C",
      airNight: "12-15\u00b0C",
      seaTemp: "17-19\u00b0C",
      wind: "10-15kn (NW-N)",
      description: {
        no: "Stabile nordvestlige vindar i Saroniske bukta. Sjelden over 20 knop. Ideelt for nybegynnere med korte etappar.",
        en: "Stable northwesterly winds in the Saronic Gulf. Rarely above 20 knots. Ideal for beginners with short legs."
      }
    },
    stops: [
      {
        day: 0,
        name: "Alimos Marina",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 0,
        hours: 0,
        highlight: { no: "Avgang fra Athen", en: "Departure from Athens" },
        isRest: false,
        image: "Alimos Marina"
      },
      {
        day: 1,
        name: "Aegina",
        port: "Aegina Town",
        lat: 37.7470,
        lng: 23.4270,
        nm: 17,
        hours: 3.1,
        highlight: { no: "Afaia-tempelet, pistasjenotter, sjarmerande hamn", en: "Temple of Afaia, pistachio nuts, charming harbour" },
        isRest: false,
        image: "Aegina"
      },
      {
        day: 2,
        name: "Poros",
        port: "Poros Town",
        lat: 37.5040,
        lng: 23.4570,
        nm: 17,
        hours: 3.1,
        highlight: { no: "Smal kanal mellom Poros og Peloponnese, klokketårn", en: "Narrow channel between Poros and Peloponnese, clock tower" },
        isRest: false,
        image: "Poros"
      },
      {
        day: 3,
        name: "Hydra",
        port: "Hydra Town",
        lat: 37.3490,
        lng: 23.4620,
        nm: 12,
        hours: 2.2,
        highlight: { no: "Bilfri øy, eselpakking, kunstgallerier", en: "Car-free island, donkey transport, art galleries" },
        isRest: false,
        image: "Hydra"
      },
      {
        day: 4,
        name: "Hydra (hviledag)",
        port: "Hydra Town",
        lat: 37.3490,
        lng: 23.4620,
        nm: 0,
        hours: 0,
        highlight: { no: "Utforsk Hydra til fots, svømming i Vlychos-bukta", en: "Explore Hydra on foot, swimming in Vlychos bay" },
        isRest: true,
        image: "Hydra"
      },
      {
        day: 5,
        name: "Spetses",
        port: "Spetses Old Harbour",
        lat: 37.2600,
        lng: 23.1550,
        nm: 18,
        hours: 3.3,
        highlight: { no: "Historisk sjøfartsmuseum, dufta av furu", en: "Historic maritime museum, scent of pine" },
        isRest: false,
        image: "Spetses"
      },
      {
        day: 6,
        name: "Porto Heli",
        port: "Porto Heli",
        lat: 37.3180,
        lng: 23.1500,
        nm: 5,
        hours: 0.9,
        highlight: { no: "Beskyttet bukt, fantastiske sjømat-restaurantar", en: "Sheltered bay, fantastic seafood restaurants" },
        isRest: false,
        image: "Porto Heli"
      },
      {
        day: 7,
        name: "Monemvasia",
        port: "Monemvasia",
        lat: 36.6880,
        lng: 23.0540,
        nm: 42,
        hours: 7.6,
        highlight: { no: "Middelalderby i fjellet, magisk om kvelden", en: "Medieval town in the rock, magical in the evening" },
        isRest: false,
        image: "Monemvasia"
      },
      {
        day: 8,
        name: "Monemvasia (hviledag)",
        port: "Monemvasia",
        lat: 36.6880,
        lng: 23.0540,
        nm: 0,
        hours: 0,
        highlight: { no: "Utforsk festningsbyen, vinsmaking, solnedgang frå murene", en: "Explore the fortress town, wine tasting, sunset from the walls" },
        isRest: true,
        image: "Monemvasia"
      },
      {
        day: 9,
        name: "Elafonisos",
        port: "Elafonisos",
        lat: 36.4800,
        lng: 22.9490,
        nm: 14,
        hours: 2.5,
        highlight: { no: "Simos-stranda \u2014 Hellas' vakraste strand", en: "Simos beach \u2014 the most beautiful beach in Greece" },
        isRest: false,
        image: "Elafonisos"
      },
      {
        day: 10,
        name: "Kythira",
        port: "Kapsali",
        lat: 36.2500,
        lng: 22.9850,
        nm: 14,
        hours: 2.5,
        highlight: { no: "Avsides øy, venetiansk borg, rolig atmosfære", en: "Remote island, Venetian fortress, tranquil atmosphere" },
        isRest: false,
        image: "Kythira"
      },
      {
        day: 11,
        name: "Monemvasia (retur)",
        port: "Monemvasia",
        lat: 36.6880,
        lng: 23.0540,
        nm: 28,
        hours: 5.1,
        highlight: { no: "Tilbake nordover, siste kveld i den magiske festningsbyen", en: "Back northward, last evening in the magical fortress town" },
        isRest: false,
        image: "Monemvasia"
      },
      {
        day: 12,
        name: "Spetses",
        port: "Spetses Old Harbour",
        lat: 37.2600,
        lng: 23.1550,
        nm: 42,
        hours: 7.6,
        highlight: { no: "Lang seildag nordover, stopp for lunsj undervegs", en: "Long sailing day northward, lunch stop along the way" },
        isRest: false,
        image: "Spetses"
      },
      {
        day: 13,
        name: "Poros",
        port: "Poros Town",
        lat: 37.5040,
        lng: 23.4570,
        nm: 28,
        hours: 5.1,
        highlight: { no: "Siste seildag gjennom den smale kanalen", en: "Last sailing day through the narrow channel" },
        isRest: false,
        image: "Poros"
      },
      {
        day: 14,
        name: "Alimos Marina (retur)",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 33,
        hours: 6.0,
        highlight: { no: "Tilbake til Athen, levering av båt", en: "Back to Athens, boat handover" },
        isRest: false,
        image: "Alimos Marina"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Route 2: Klassisk Kykladene
  // ─────────────────────────────────────────────
  {
    id: "klassisk-kykladene",
    name: { no: "Klassiske Kykladane", en: "Classic Cyclades" },
    tagline: { no: "Den ikoniske Kykladeruten med Milos, Folegandros og Ios", en: "The iconic Cyclades route with Milos, Folegandros, and Ios" },
    region: { no: "Vestlege & sentrale Kykladane", en: "Western & Central Cyclades" },
    color: "#3d5a8e",
    description: {
      no: "Dei vestlege Kykladane byr på nokre av Hellas' vakraste øyar. Frå dei rolige gruveøyane Serifos og Sifnos til den dramatiske Milos med Kleftiko-grotene. Folegandros er den skjulte perla dei fleste aldri ser.",
      en: "The western Cyclades offer some of the most beautiful islands in Greece. From the quiet mining islands of Serifos and Sifnos to the dramatic Milos with its Kleftiko sea caves. Folegandros is the hidden gem most people never see."
    },
    distance: 293,
    sailingDays: 12,
    restDays: 2,
    difficulty: { no: "Middels", en: "Medium" },
    difficultyLevel: 2,
    startPort: "Alimos Marina",
    endPort: "Alimos Marina",
    bestFor: { no: "Middels erfarne, fotografi, mat", en: "Intermediate sailors, photography, food" },
    heroImage: "Milos",
    weather: {
      airDay: "20-26\u00b0C",
      airNight: "14-18\u00b0C",
      seaTemp: "18-22\u00b0C",
      wind: "12-20kn (N Meltemi)",
      description: {
        no: "Meltemi-vinden kan blase 15-25kn i juli-august. Vaar og haust gir meir moderate forhold. Godt beskytta hamner undervegs.",
        en: "The Meltemi wind can blow 15\u201325kn in July\u2013August. Spring and autumn bring more moderate conditions. Well-sheltered harbours along the way."
      }
    },
    stops: [
      {
        day: 0,
        name: "Alimos Marina",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 0,
        hours: 0,
        highlight: { no: "Avgang fr\u00e5 Athen", en: "Departure from Athens" },
        isRest: false,
        image: "Alimos Marina"
      },
      {
        day: 1,
        name: "Kea (Tzia)",
        port: "Korissia",
        lat: 37.6300,
        lng: 24.3220,
        nm: 35,
        hours: 6.4,
        highlight: { no: "Kea-l\u00f8va, hyggelig hamn \u2014 f\u00f8rste seildag via Cape Sounion", en: "The Lion of Kea, cosy harbour \u2014 first sailing day via Cape Sounion" },
        isRest: false,
        image: "Kea"
      },
      {
        day: 2,
        name: "Kythnos Loutra",
        port: "Loutra",
        lat: 37.4470,
        lng: 24.4200,
        nm: 13,
        hours: 2.4,
        highlight: { no: "Varme kjelder ved sjøen, avslappa atmosfære", en: "Hot springs by the sea, relaxed atmosphere" },
        isRest: false,
        image: "Kythnos"
      },
      {
        day: 3,
        name: "Serifos",
        port: "Livadi",
        lat: 37.1430,
        lng: 24.4890,
        nm: 20,
        hours: 3.6,
        highlight: { no: "Kvit Chora på toppen, gammal gruveøy, fin strand", en: "White Chora on the hilltop, old mining island, lovely beach" },
        isRest: false,
        image: "Serifos"
      },
      {
        day: 4,
        name: "Sifnos",
        port: "Kamares",
        lat: 36.9650,
        lng: 24.7080,
        nm: 15,
        hours: 2.7,
        highlight: { no: "Mathovudstaden i Kykladane, keramikk, Chryssopigi-klosteret", en: "Culinary capital of the Cyclades, ceramics, Chryssopigi monastery" },
        isRest: false,
        image: "Sifnos"
      },
      {
        day: 5,
        name: "Sifnos (hviledag)",
        port: "Kamares",
        lat: 36.9650,
        lng: 24.7080,
        nm: 0,
        hours: 0,
        highlight: { no: "Vandring til Kastro, matlagingskurs, keramikkverkstad", en: "Hike to Kastro, cooking class, ceramics workshop" },
        isRest: true,
        image: "Sifnos"
      },
      {
        day: 6,
        name: "Milos \u2014 Adamas",
        port: "Adamas",
        lat: 36.7200,
        lng: 24.4450,
        nm: 26,
        hours: 4.7,
        highlight: { no: "Vulkansk øy, Sarakiniko måneoverflate, fargerike fiskarhus", en: "Volcanic island, Sarakiniko moonscape, colourful fishermen's houses" },
        isRest: false,
        image: "Milos"
      },
      {
        day: 7,
        name: "Milos \u2014 Kleftiko",
        port: "Kleftiko (ankring)",
        lat: 36.6640,
        lng: 24.3300,
        nm: 6,
        hours: 1.1,
        highlight: { no: "Sjørøvargrotene, snorkling i krystallklart vatn", en: "Pirate caves, snorkelling in crystal-clear water" },
        isRest: false,
        image: "Milos"
      },
      {
        day: 8,
        name: "Folegandros",
        port: "Karavostasis",
        lat: 36.6210,
        lng: 24.9100,
        nm: 32,
        hours: 5.8,
        highlight: { no: "Dramatiske klipper, Chora med utsikt, den skjulte perla", en: "Dramatic cliffs, Chora with a view, the hidden gem" },
        isRest: false,
        image: "Folegandros"
      },
      {
        day: 9,
        name: "Folegandros (hviledag)",
        port: "Karavostasis",
        lat: 36.6210,
        lng: 24.9100,
        nm: 0,
        hours: 0,
        highlight: { no: "Vandring til Panagia-kyrkja på klippen, solnedgang frå Chora", en: "Hike to the Panagia church on the cliff, sunset from Chora" },
        isRest: true,
        image: "Folegandros"
      },
      {
        day: 10,
        name: "Ios",
        port: "Ios Marina",
        lat: 36.7230,
        lng: 25.2810,
        nm: 23,
        hours: 4.2,
        highlight: { no: "Mylopotas strand, livleg natteliv, vakker Chora", en: "Mylopotas beach, lively nightlife, beautiful Chora" },
        isRest: false,
        image: "Ios"
      },
      {
        day: 11,
        name: "Paros \u2014 Naoussa",
        port: "Naoussa",
        lat: 37.1230,
        lng: 25.2360,
        nm: 26,
        hours: 4.7,
        highlight: { no: "Fargerike fiskarbåt i hamna, gourmetrestaurantar", en: "Colourful fishing boats in the harbour, gourmet restaurants" },
        isRest: false,
        image: "Paros"
      },
      {
        day: 12,
        name: "Naxos",
        port: "Naxos Town",
        lat: 37.1030,
        lng: 25.3760,
        nm: 9,
        hours: 1.6,
        highlight: { no: "Portara-tempelet, største øy i Kykladane, grønt innland", en: "The Portara temple gate, largest island in the Cyclades, green interior" },
        isRest: false,
        image: "Naxos"
      },
      {
        day: 13,
        name: "Syros",
        port: "Ermoupoli",
        lat: 37.4420,
        lng: 24.9420,
        nm: 30,
        hours: 5.5,
        highlight: { no: "Kykladane sin hovudstad, neoklassisk arkitektur, Apollon-teateret", en: "Capital of the Cyclades, neoclassical architecture, the Apollo Theatre" },
        isRest: false,
        image: "Syros"
      },
      {
        day: 14,
        name: "Alimos Marina (retur)",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 58,
        hours: 10.5,
        highlight: { no: "Siste seildag tilbake via Cape Sounion til Athen", en: "Final sailing day back via Cape Sounion to Athens" },
        isRest: false,
        image: "Alimos Marina"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Route 3: Fulle Kykladene
  // ─────────────────────────────────────────────
  {
    id: "fulle-kykladene",
    name: { no: "Fulle Kykladane", en: "Full Cyclades" },
    tagline: { no: "Santorini, Mykonos og alt imellom", en: "Santorini, Mykonos, and everything in between" },
    region: { no: "Vestlege, sentrale & austlege Kykladane", en: "Western, Central & Eastern Cyclades" },
    color: "#8e3d5a",
    description: {
      no: "Den ultimate Kykladeruten som inkluderer både dei ikoniske øyane Santorini og Mykonos, og dei meir autentiske vestlege øyane. Ein ambisiøs rute med lengre etappar som krev erfaring med Meltemi-vinden.",
      en: "The ultimate Cyclades route including both the iconic islands of Santorini and Mykonos, and the more authentic western islands. An ambitious route with longer legs that requires experience with the Meltemi wind."
    },
    distance: 322,
    sailingDays: 13,
    restDays: 1,
    difficulty: { no: "Middels-Avansert", en: "Moderate-Advanced" },
    difficultyLevel: 3,
    startPort: "Alimos Marina",
    endPort: "Alimos Marina",
    bestFor: { no: "Erfarne seglare, fotografi, heilskapeleg Kykladane-oppleving", en: "Experienced sailors, photography, complete Cyclades experience" },
    heroImage: "Santorini",
    weather: {
      airDay: "22-28\u00b0C",
      airNight: "16-20\u00b0C",
      seaTemp: "19-23\u00b0C",
      wind: "15-25kn (N Meltemi)",
      description: {
        no: "Sterk Meltemi gjennom sentrale Kykladane, spesielt mellom Naxos-Paros-Mykonos. Krev erfaring. Best i juni eller september.",
        en: "Strong Meltemi through the central Cyclades, especially between Naxos\u2013Paros\u2013Mykonos. Requires experience. Best in June or September."
      }
    },
    stops: [
      {
        day: 0,
        name: "Alimos Marina",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 0,
        hours: 0,
        highlight: { no: "Avgang fr\u00e5 Athen", en: "Departure from Athens" },
        isRest: false,
        image: "Alimos Marina"
      },
      {
        day: 1,
        name: "Kea (Tzia)",
        port: "Korissia",
        lat: 37.6300,
        lng: 24.3220,
        nm: 35,
        hours: 6.4,
        highlight: { no: "F\u00f8rste natt, roleg overgang via Cape Sounion", en: "First night, calm transition via Cape Sounion" },
        isRest: false,
        image: "Kea"
      },
      {
        day: 2,
        name: "Kythnos",
        port: "Loutra",
        lat: 37.4470,
        lng: 24.4200,
        nm: 13,
        hours: 2.4,
        highlight: { no: "Varme kjelder, dobbeltstranda Kolona", en: "Hot springs, the double beach of Kolona" },
        isRest: false,
        image: "Kythnos"
      },
      {
        day: 3,
        name: "Serifos",
        port: "Livadi",
        lat: 37.1430,
        lng: 24.4890,
        nm: 20,
        hours: 3.6,
        highlight: { no: "Kvit Chora, roleg gruveøy, fin ankerplass", en: "White Chora, quiet mining island, good anchorage" },
        isRest: false,
        image: "Serifos"
      },
      {
        day: 4,
        name: "Sifnos",
        port: "Kamares",
        lat: 36.9650,
        lng: 24.7080,
        nm: 15,
        hours: 2.7,
        highlight: { no: "Matparadiset i Kykladane", en: "The food paradise of the Cyclades" },
        isRest: false,
        image: "Sifnos"
      },
      {
        day: 5,
        name: "Milos",
        port: "Adamas",
        lat: 36.7200,
        lng: 24.4450,
        nm: 22,
        hours: 4.0,
        highlight: { no: "Sarakiniko, Kleftiko, fargerike Klima-fiskarhus", en: "Sarakiniko, Kleftiko, colourful Klima fishermen's houses" },
        isRest: false,
        image: "Milos"
      },
      {
        day: 6,
        name: "Folegandros",
        port: "Karavostasis",
        lat: 36.6210,
        lng: 24.9100,
        nm: 28,
        hours: 5.1,
        highlight: { no: "Dramatisk Chora, Panagia-kyrkja", en: "Dramatic Chora, the Panagia church" },
        isRest: false,
        image: "Folegandros"
      },
      {
        day: 7,
        name: "Santorini \u2014 Vlychada",
        port: "Vlychada Marina",
        lat: 36.3510,
        lng: 25.4300,
        nm: 30,
        hours: 5.5,
        highlight: { no: "Caldera-utsikt, vulkanske klipper, vinturar", en: "Caldera views, volcanic cliffs, wine tours" },
        isRest: false,
        image: "Santorini"
      },
      {
        day: 8,
        name: "Santorini (hviledag)",
        port: "Vlychada Marina",
        lat: 36.3510,
        lng: 25.4300,
        nm: 0,
        hours: 0,
        highlight: { no: "Oia solnedgang, Fira, vinsmaking på Santo Wines", en: "Oia sunset, Fira, wine tasting at Santo Wines" },
        isRest: true,
        image: "Santorini"
      },
      {
        day: 9,
        name: "Ios",
        port: "Ios Marina",
        lat: 36.7230,
        lng: 25.2810,
        nm: 24,
        hours: 4.4,
        highlight: { no: "Mylopotas strand, Homers grav", en: "Mylopotas beach, Homer's tomb" },
        isRest: false,
        image: "Ios"
      },
      {
        day: 10,
        name: "Naxos",
        port: "Naxos Town",
        lat: 37.1030,
        lng: 25.3760,
        nm: 24,
        hours: 4.4,
        highlight: { no: "Portara, gamal bydel, lengste sandstrender i Kykladane", en: "Portara, old town, the longest sandy beaches in the Cyclades" },
        isRest: false,
        image: "Naxos"
      },
      {
        day: 11,
        name: "Paros",
        port: "Parikia",
        lat: 37.1230,
        lng: 25.2360,
        nm: 9,
        hours: 1.6,
        highlight: { no: "Panagia Ekatontapyliani, gamlebyen, Naoussa", en: "Panagia Ekatontapyliani, old town, Naoussa" },
        isRest: false,
        image: "Paros"
      },
      {
        day: 12,
        name: "Mykonos",
        port: "Mykonos New Marina",
        lat: 37.4450,
        lng: 25.3260,
        nm: 22,
        hours: 4.0,
        highlight: { no: "Vindmøllene, Little Venice, kosmopolitisk atmosfære", en: "The windmills, Little Venice, cosmopolitan atmosphere" },
        isRest: false,
        image: "Mykonos"
      },
      {
        day: 13,
        name: "Syros",
        port: "Ermoupoli",
        lat: 37.4420,
        lng: 24.9420,
        nm: 22,
        hours: 4.0,
        highlight: { no: "Neoklassisk perle, Kykladane sin hovudstad", en: "Neoclassical gem, capital of the Cyclades" },
        isRest: false,
        image: "Syros"
      },
      {
        day: 14,
        name: "Alimos Marina (retur)",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 58,
        hours: 10.5,
        highlight: { no: "Lang siste seildag via Cape Sounion til Athen", en: "Long final sailing day via Cape Sounion to Athens" },
        isRest: false,
        image: "Alimos Marina"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Route 4: Små Kykladene
  // ─────────────────────────────────────────────
  {
    id: "smaa-kykladene",
    name: { no: "Små Kykladane", en: "Small Cyclades" },
    tagline: { no: "Koufonisia, Schinoussa og Amorgos \u2014 dei hemmelege øyane", en: "Koufonisia, Schinoussa, and Amorgos \u2014 the secret islands" },
    region: { no: "Sentrale & austlege Kykladane", en: "Central & Eastern Cyclades" },
    color: "#8e6e3d",
    description: {
      no: "Opplev Kykladane slik dei var før turismen tok over. Dei små øyane søraust for Naxos \u2014 Koufonisia, Schinoussa og Amorgos \u2014 byr på Hellas' klaraste vatn, uberørte strender og genuin gresk gjestfridom.",
      en: "Experience the Cyclades the way they were before tourism took over. The small islands southeast of Naxos \u2014 Koufonisia, Schinoussa, and Amorgos \u2014 offer the clearest water in Greece, untouched beaches, and genuine Greek hospitality."
    },
    distance: 321,
    sailingDays: 12,
    restDays: 2,
    difficulty: { no: "Middels", en: "Medium" },
    difficultyLevel: 2,
    startPort: "Alimos Marina",
    endPort: "Alimos Marina",
    bestFor: { no: "Rolege øyar, snorkling, autentisk Hellas", en: "Quiet islands, snorkelling, authentic Greece" },
    heroImage: "Amorgos",
    weather: {
      airDay: "21-27\u00b0C",
      airNight: "15-19\u00b0C",
      seaTemp: "19-23\u00b0C",
      wind: "12-18kn (N-NE)",
      description: {
        no: "Moderate Meltemi-forhold i dei små Kykladane. Hamner kan vere utsette, sjekk vermelding. Ankerplassar krev oppmerksamheit.",
        en: "Moderate Meltemi conditions in the Small Cyclades. Harbours can be exposed, check the forecast. Anchorages require attention."
      }
    },
    stops: [
      {
        day: 0,
        name: "Alimos Marina",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 0,
        hours: 0,
        highlight: { no: "Avgang fr\u00e5 Athen", en: "Departure from Athens" },
        isRest: false,
        image: "Alimos Marina"
      },
      {
        day: 1,
        name: "Kea (Tzia)",
        port: "Korissia",
        lat: 37.6300,
        lng: 24.3220,
        nm: 35,
        hours: 6.4,
        highlight: { no: "F\u00f8rste stopp via Cape Sounion, roleg overgang", en: "First stop via Cape Sounion, calm transition" },
        isRest: false,
        image: "Kea"
      },
      {
        day: 2,
        name: "Kythnos",
        port: "Loutra",
        lat: 37.4470,
        lng: 24.4200,
        nm: 13,
        hours: 2.4,
        highlight: { no: "Varme kjelder, Kolona dobbeltbeach", en: "Hot springs, Kolona double beach" },
        isRest: false,
        image: "Kythnos"
      },
      {
        day: 3,
        name: "Syros",
        port: "Ermoupoli",
        lat: 37.4420,
        lng: 24.9420,
        nm: 28,
        hours: 5.1,
        highlight: { no: "Neoklassisk hovudstad, proviantering", en: "Neoclassical capital, provisioning" },
        isRest: false,
        image: "Syros"
      },
      {
        day: 4,
        name: "Mykonos",
        port: "Mykonos New Marina",
        lat: 37.4450,
        lng: 25.3260,
        nm: 22,
        hours: 4.0,
        highlight: { no: "Vindmøllene, Little Venice", en: "The windmills, Little Venice" },
        isRest: false,
        image: "Mykonos"
      },
      {
        day: 5,
        name: "Naxos",
        port: "Naxos Town",
        lat: 37.1030,
        lng: 25.3760,
        nm: 24,
        hours: 4.4,
        highlight: { no: "Portara, base for dei små øyane", en: "Portara, base for the small islands" },
        isRest: false,
        image: "Naxos"
      },
      {
        day: 6,
        name: "Koufonisia",
        port: "Ano Koufonisi",
        lat: 36.9350,
        lng: 25.5960,
        nm: 16,
        hours: 2.9,
        highlight: { no: "Turkis vatn, naturlege sjøpoolar, bilfri", en: "Turquoise water, natural sea pools, car-free" },
        isRest: false,
        image: "Koufonisia"
      },
      {
        day: 7,
        name: "Koufonisia (hviledag)",
        port: "Ano Koufonisi",
        lat: 36.9350,
        lng: 25.5960,
        nm: 0,
        hours: 0,
        highlight: { no: "Pori-stranda, kajakktur rundt øyane, sjømat ved hamna", en: "Pori beach, kayak trip around the islands, seafood by the harbour" },
        isRest: true,
        image: "Koufonisia"
      },
      {
        day: 8,
        name: "Schinoussa",
        port: "Mersini",
        lat: 36.8720,
        lng: 25.5240,
        nm: 6,
        hours: 1.1,
        highlight: { no: "Minste busette øy, ekte gresk kvardagsliv", en: "Smallest inhabited island, authentic Greek daily life" },
        isRest: false,
        image: "Schinoussa"
      },
      {
        day: 9,
        name: "Amorgos \u2014 Katapola",
        port: "Katapola",
        lat: 36.8230,
        lng: 25.8540,
        nm: 19,
        hours: 3.5,
        highlight: { no: "Hozoviotissa-klosteret i fjellveggen, Le Grand Bleu-øy", en: "Hozoviotissa monastery in the cliff face, The Big Blue island" },
        isRest: false,
        image: "Amorgos"
      },
      {
        day: 10,
        name: "Amorgos (hviledag)",
        port: "Katapola",
        lat: 36.8230,
        lng: 25.8540,
        nm: 0,
        hours: 0,
        highlight: { no: "Vandring til klosteret, Agia Anna strand, Chora", en: "Hike to the monastery, Agia Anna beach, Chora" },
        isRest: true,
        image: "Amorgos"
      },
      {
        day: 11,
        name: "Ios",
        port: "Ios Marina",
        lat: 36.7230,
        lng: 25.2810,
        nm: 32,
        hours: 5.8,
        highlight: { no: "Mylopotas, Chora med utsikt", en: "Mylopotas, Chora with a view" },
        isRest: false,
        image: "Ios"
      },
      {
        day: 12,
        name: "Paros",
        port: "Parikia",
        lat: 37.1230,
        lng: 25.2360,
        nm: 26,
        hours: 4.7,
        highlight: { no: "Siste øybesøk, proviantering", en: "Last island visit, provisioning" },
        isRest: false,
        image: "Paros"
      },
      {
        day: 13,
        name: "Serifos",
        port: "Livadi",
        lat: 37.1430,
        lng: 24.4890,
        nm: 42,
        hours: 7.6,
        highlight: { no: "Lang seildag vestover, kvit Chora i solnedgang", en: "Long sailing day westward, white Chora at sunset" },
        isRest: false,
        image: "Serifos"
      },
      {
        day: 14,
        name: "Alimos Marina (retur)",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 60,
        hours: 10.9,
        highlight: { no: "Lang siste seildag heim via Kea og Cape Sounion", en: "Long final sailing day home via Kea and Cape Sounion" },
        isRest: false,
        image: "Alimos Marina"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Route 5: Nordlege Kykladene
  // ─────────────────────────────────────────────
  {
    id: "nordlige-kykladene",
    name: { no: "Nordlege Kykladane", en: "Northern Cyclades" },
    tagline: { no: "Andros, Tinos og Delos \u2014 kultur og historie", en: "Andros, Tinos, and Delos \u2014 culture and history" },
    region: { no: "Nordlege Kykladane", en: "Northern Cyclades" },
    color: "#5a3d8e",
    description: {
      no: "Ei kortare rute fokusert på dei nordlege Kykladane \u2014 Andros med sine vassdragar og vandrestigar, Tinos med det heilage valfartsm\u00e5let, og den heilage øy Delos der ingen bur. Perfekt for dei som vil ha kultur framfor strandliv.",
      en: "A shorter route focused on the northern Cyclades \u2014 Andros with its waterfalls and hiking trails, Tinos with its sacred pilgrimage site, and the holy island of Delos where no one lives. Perfect for those who prefer culture over beach life."
    },
    distance: 204,
    sailingDays: 9,
    restDays: 2,
    difficulty: { no: "Middels", en: "Medium" },
    difficultyLevel: 2,
    startPort: "Alimos Marina",
    endPort: "Alimos Marina",
    bestFor: { no: "Kulturinteresserte, vandring, arkeologi, kortare tur", en: "Culture enthusiasts, hiking, archaeology, shorter trip" },
    heroImage: "Delos",
    weather: {
      airDay: "19-25\u00b0C",
      airNight: "13-17\u00b0C",
      seaTemp: "17-21\u00b0C",
      wind: "12-20kn (N Meltemi)",
      description: {
        no: "Kara Strait mellom Andros og Evia kan ha sterk Meltemi. Batsi og Panormos er godt beskytta. Tinos-kanalen kan vere utfordrande.",
        en: "The Kafireas Strait between Andros and Evia can have strong Meltemi. Batsi and Panormos are well sheltered. The Tinos channel can be challenging."
      }
    },
    stops: [
      {
        day: 0,
        name: "Alimos Marina",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 0,
        hours: 0,
        highlight: { no: "Avgang fr\u00e5 Athen", en: "Departure from Athens" },
        isRest: false,
        image: "Alimos Marina"
      },
      {
        day: 1,
        name: "Kea (Tzia)",
        port: "Korissia",
        lat: 37.6300,
        lng: 24.3220,
        nm: 35,
        hours: 6.4,
        highlight: { no: "Kea-l\u00f8va, vandring til Ioulida \u2014 f\u00f8rste seildag via Sounion", en: "The Lion of Kea, hike to Ioulida \u2014 first sailing day via Sounion" },
        isRest: false,
        image: "Kea"
      },
      {
        day: 2,
        name: "Andros \u2014 Batsi",
        port: "Batsi",
        lat: 37.8400,
        lng: 24.7700,
        nm: 28,
        hours: 5.1,
        highlight: { no: "Beskytta vik på vestsida, fargerik landsby", en: "Sheltered bay on the west side, colourful village" },
        isRest: false,
        image: "Andros"
      },
      {
        day: 3,
        name: "Andros (hviledag)",
        port: "Batsi",
        lat: 37.8400,
        lng: 24.7700,
        nm: 0,
        hours: 0,
        highlight: { no: "Vandring langs dei kjende Andros-stiane, vassdragar, Chora med museum", en: "Hiking the famous Andros trails, waterfalls, Chora with its museum" },
        isRest: true,
        image: "Andros"
      },
      {
        day: 4,
        name: "Tinos \u2014 Panormos",
        port: "Panormos",
        lat: 37.6000,
        lng: 25.0620,
        nm: 22,
        hours: 4.0,
        waypoints: [[37.71, 24.72], [37.68, 24.78], [37.65, 24.90]],
        highlight: { no: "Kunstnarlandsby, marmorverkstadar, duvehus", en: "Artist village, marble workshops, dovecotes" },
        isRest: false,
        image: "Tinos"
      },
      {
        day: 5,
        name: "Mykonos",
        port: "Mykonos New Marina",
        lat: 37.4450,
        lng: 25.3260,
        nm: 20,
        hours: 3.6,
        highlight: { no: "Vindmøllene, Little Venice, shopping", en: "The windmills, Little Venice, shopping" },
        isRest: false,
        image: "Mykonos"
      },
      {
        day: 6,
        name: "Delos",
        port: "Delos (ankring)",
        lat: 37.3960,
        lng: 25.2670,
        nm: 5,
        hours: 0.9,
        highlight: { no: "UNESCO-arkeologisk stad, Apollon sin heilage øy, overnatting forbode i land", en: "UNESCO archaeological site, Apollo's sacred island, overnight stays on land forbidden" },
        isRest: false,
        image: "Delos"
      },
      {
        day: 7,
        name: "Syros",
        port: "Ermoupoli",
        lat: 37.4420,
        lng: 24.9420,
        nm: 18,
        hours: 3.3,
        highlight: { no: "Neoklassisk perle, Apollon-teateret, loukoumia", en: "Neoclassical gem, the Apollo Theatre, loukoumia sweets" },
        isRest: false,
        image: "Syros"
      },
      {
        day: 8,
        name: "Syros (hviledag)",
        port: "Ermoupoli",
        lat: 37.4420,
        lng: 24.9420,
        nm: 0,
        hours: 0,
        highlight: { no: "Vandring til Ano Syros, Vaporia-kvarteret, gresk opera", en: "Walk up to Ano Syros, Vaporia quarter, Greek opera" },
        isRest: true,
        image: "Syros"
      },
      {
        day: 9,
        name: "Kythnos",
        port: "Loutra",
        lat: 37.4470,
        lng: 24.4200,
        nm: 28,
        hours: 5.1,
        highlight: { no: "Varme kjelder, siste roleg kveld", en: "Hot springs, last quiet evening" },
        isRest: false,
        image: "Kythnos"
      },
      {
        day: 10,
        name: "Cape Sounion",
        port: "Sounion (ankring)",
        lat: 37.6500,
        lng: 24.0250,
        nm: 24,
        hours: 4.4,
        highlight: { no: "Poseidon-tempelet i solnedgang, ankring under klippene", en: "Temple of Poseidon at sunset, anchoring beneath the cliffs" },
        isRest: false,
        image: "Cape Sounion"
      },
      {
        day: 11,
        name: "Alimos Marina (retur)",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 24,
        hours: 4.4,
        waypoints: [[37.64, 23.97], [37.65, 23.86], [37.71, 23.75], [37.82, 23.72]],
        highlight: { no: "Siste etappe langs Attika-kysten til Athen", en: "Final leg along the Attica coast to Athens" },
        isRest: false,
        image: "Alimos Marina"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Route 6: Lipsi tur-retur
  // ─────────────────────────────────────────────
  {
    id: "lipsi-tur-retur",
    name: { no: "Lipsi tur-retur", en: "Lipsi Round Trip" },
    tagline: { no: "Til Dodekanesene og tilbake \u2014 Lipsi, Patmos og Små Kykladane", en: "To the Dodecanese and back \u2014 Lipsi, Patmos, and the Small Cyclades" },
    region: { no: "Kykladane & Dodekanesene", en: "Cyclades & Dodecanese" },
    color: "#8e3d8e",
    description: {
      no: "Dei som trur Lipsi er for langt unna har ikkje prøvd. Ut gjennom Kykladane via Syros og Mykonos, éin lang dag over ope hav til Patmos, og der ligg Lipsi og ventar. Heimturen går via Amorgos og Koufonisia \u2014 heilt andre øyar, heilt anna stemning. Krev éin tidleg morgen og éin god værmelding.",
      en: "Those who think Lipsi is too far away haven't tried. Out through the Cyclades via Syros and Mykonos, one long day across open sea to Patmos, and there lies Lipsi waiting. The return goes via Amorgos and Koufonisia \u2014 completely different islands, a completely different feel. Requires one early morning and one good weather forecast."
    },
    distance: 377,
    sailingDays: 12,
    restDays: 2,
    difficulty: { no: "Middels-Avansert", en: "Moderate-Advanced" },
    difficultyLevel: 3,
    startPort: "Alimos Marina",
    endPort: "Alimos Marina",
    bestFor: { no: "Erfarne seglare, eventyr, to regionar i éin tur", en: "Experienced sailors, adventure, two regions in one trip" },
    heroImage: "Lipsi",
    weather: {
      airDay: "22-28\u00b0C",
      airNight: "16-20\u00b0C",
      seaTemp: "19-23\u00b0C",
      wind: "12-22kn (N Meltemi)",
      description: {
        no: "Kryssinga Mykonos\u2013Patmos (68nm) er nøkkeletappen \u2014 planlegg med stabil værmelding og tidleg avgang. Meltemi kan vere sterk i sentrale Kykladane. Dodekanesene er gjerne varmare og rolegare. Heimturen har to lange dagar (50nm + 45nm).",
        en: "The Mykonos\u2013Patmos crossing (68nm) is the key passage \u2014 plan with a stable forecast and early departure. Meltemi can be strong in the central Cyclades. The Dodecanese tend to be warmer and calmer. The return has two long days (50nm + 45nm)."
      }
    },
    stops: [
      {
        day: 0,
        name: "Alimos Marina",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 0,
        hours: 0,
        highlight: { no: "Avgang frå Athen mot aust", en: "Departure from Athens heading east" },
        isRest: false,
        image: "Alimos Marina"
      },
      {
        day: 1,
        name: "Kea (Tzia)",
        port: "Korissia",
        lat: 37.6300,
        lng: 24.3220,
        nm: 35,
        hours: 6.4,
        highlight: { no: "Første stopp via Sounion \u2014 Kea-løva, roleg hamn", en: "First stop via Sounion \u2014 the Lion of Kea, quiet harbour" },
        isRest: false,
        image: "Kea"
      },
      {
        day: 2,
        name: "Syros",
        port: "Ermoupoli",
        lat: 37.4420,
        lng: 24.9420,
        nm: 38,
        hours: 6.9,
        highlight: { no: "Kykladane sin hovudstad, proviantering for lange etappar", en: "Capital of the Cyclades, provisioning for the long legs ahead" },
        isRest: false,
        image: "Syros"
      },
      {
        day: 3,
        name: "Mykonos",
        port: "Mykonos New Marina",
        lat: 37.4450,
        lng: 25.3260,
        nm: 22,
        hours: 4.0,
        highlight: { no: "Vindmøllene, Little Venice \u2014 siste stopp før den store kryssinga", en: "The windmills, Little Venice \u2014 last stop before the big crossing" },
        isRest: false,
        image: "Mykonos"
      },
      {
        day: 4,
        name: "Patmos",
        port: "Skala",
        lat: 37.3210,
        lng: 26.5480,
        nm: 68,
        hours: 12.4,
        waypoints: [[37.42, 25.70], [37.38, 26.00], [37.35, 26.30]],
        highlight: { no: "DEN STORE ETAPPEN \u2014 68nm over ope hav, avgang ved daggry", en: "THE BIG LEG \u2014 68nm across open sea, departure at dawn" },
        isRest: false,
        image: "Patmos"
      },
      {
        day: 5,
        name: "Lipsi",
        port: "Lipsi",
        lat: 37.2940,
        lng: 26.7430,
        nm: 11,
        hours: 2.0,
        highlight: { no: "MÅLET! Turkis paradis, tavernaer ved hamna, bilfri ro", en: "THE DESTINATION! Turquoise paradise, tavernas by the harbour, car-free tranquillity" },
        isRest: false,
        image: "Lipsi"
      },
      {
        day: 6,
        name: "Lipsi (kviledag)",
        port: "Lipsi",
        lat: 37.2940,
        lng: 26.7430,
        nm: 0,
        hours: 0,
        highlight: { no: "Snorkling i Katsadia-bukta, vandring til Panagia tou Charou, gresk tempo", en: "Snorkelling in Katsadia bay, hike to Panagia tou Charou, Greek pace of life" },
        isRest: true,
        image: "Lipsi"
      },
      {
        day: 7,
        name: "Leros",
        port: "Lakki",
        lat: 37.1520,
        lng: 26.8600,
        nm: 11,
        hours: 2.0,
        highlight: { no: "Art deco-arkitektur frå Italia-tida, stor naturhamn, svampdykking", en: "Art Deco architecture from the Italian era, large natural harbour, sponge diving" },
        isRest: false,
        image: "Leros"
      },
      {
        day: 8,
        name: "Patmos (retur)",
        port: "Skala",
        lat: 37.3210,
        lng: 26.5480,
        nm: 18,
        hours: 3.3,
        highlight: { no: "Apokalypsegrotta, UNESCO-klosteret, Chora i solnedgang", en: "Cave of the Apocalypse, UNESCO monastery, Chora at sunset" },
        isRest: false,
        image: "Patmos"
      },
      {
        day: 9,
        name: "Amorgos",
        port: "Katapola",
        lat: 36.8230,
        lng: 25.8540,
        nm: 45,
        hours: 8.2,
        waypoints: [[37.15, 26.30], [36.95, 26.05]],
        highlight: { no: "Le Grand Bleu-øy \u2014 Hozoviotissa-klosteret i fjellveggen", en: "The Big Blue island \u2014 Hozoviotissa monastery in the cliff face" },
        isRest: false,
        image: "Amorgos"
      },
      {
        day: 10,
        name: "Amorgos (kviledag)",
        port: "Katapola",
        lat: 36.8230,
        lng: 25.8540,
        nm: 0,
        hours: 0,
        highlight: { no: "Vandring til klosteret, Agia Anna strand, Chora med utsikt", en: "Hike to the monastery, Agia Anna beach, Chora with a view" },
        isRest: true,
        image: "Amorgos"
      },
      {
        day: 11,
        name: "Koufonisia",
        port: "Ano Koufonisi",
        lat: 36.9350,
        lng: 25.5960,
        nm: 16,
        hours: 2.9,
        highlight: { no: "Små Kykladane \u2014 turkis sjøpoolar, bilfri øy, naturleg paradis", en: "Small Cyclades \u2014 turquoise sea pools, car-free island, natural paradise" },
        isRest: false,
        image: "Koufonisia"
      },
      {
        day: 12,
        name: "Naxos",
        port: "Naxos Town",
        lat: 37.1030,
        lng: 25.3760,
        nm: 16,
        hours: 2.9,
        highlight: { no: "Portara-tempelet, grønt innland, siste rolege dag", en: "The Portara temple gate, green interior, last quiet day" },
        isRest: false,
        image: "Naxos"
      },
      {
        day: 13,
        name: "Kythnos",
        port: "Loutra",
        lat: 37.4470,
        lng: 24.4200,
        nm: 50,
        hours: 9.1,
        waypoints: [[37.20, 25.05], [37.30, 24.70]],
        highlight: { no: "Lang heimreise-dag gjennom Kykladane, varme kjelder som velkomst", en: "Long homeward day through the Cyclades, hot springs as a welcome" },
        isRest: false,
        image: "Kythnos"
      },
      {
        day: 14,
        name: "Alimos Marina (retur)",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 45,
        hours: 8.2,
        waypoints: [[37.55, 24.15], [37.65, 24.02]],
        highlight: { no: "Siste etappe via Cape Sounion \u2014 velfortent solnedgang over Poseidon-tempelet", en: "Final leg via Cape Sounion \u2014 well-earned sunset over the Temple of Poseidon" },
        isRest: false,
        image: "Alimos Marina"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Route 7: Sporadene
  // ─────────────────────────────────────────────
  {
    id: "sporadene",
    name: { no: "Sporadene", en: "Sporades" },
    tagline: { no: "Dei grøne øyane \u2014 furu, klar sjø og marinpark", en: "The green islands \u2014 pine, clear sea, and marine park" },
    region: { no: "Nordlege Egeiske hav", en: "Northern Aegean Sea" },
    color: "#3d8e5a",
    description: {
      no: "Sporadene er Hellas' grøne hemmelighet \u2014 furuklede øyar med krystallklart vatn nord i Egeerhavet. Alonissos marinpark er Europas største marine verneområde. Skopelos er Mamma Mia-øy og Skiathos har dei beste strendene.",
      en: "The Sporades are Greece's green secret \u2014 pine-clad islands with crystal-clear water in the northern Aegean. Alonissos Marine Park is Europe's largest marine protected area. Skopelos is the Mamma Mia island and Skiathos has the best beaches."
    },
    distance: 302,
    sailingDays: 10,
    restDays: 3,
    difficulty: { no: "Middels", en: "Medium" },
    difficultyLevel: 2,
    startPort: "Alimos Marina",
    endPort: "Alimos Marina",
    bestFor: { no: "Natur, dyreliv, snorkling, roleg tempo", en: "Nature, wildlife, snorkelling, relaxed pace" },
    heroImage: "Skopelos",
    weather: {
      airDay: "20-27\u00b0C",
      airNight: "14-18\u00b0C",
      seaTemp: "19-23\u00b0C",
      wind: "8-15kn (N-NW)",
      description: {
        no: "Mildare vindar enn Kykladane. Sporadene er godt beskytta av Evia. Varmare vatn og meir stabile forhold. Ideelt for avslappa segling.",
        en: "Milder winds than the Cyclades. The Sporades are well sheltered by Evia. Warmer water and more stable conditions. Ideal for relaxed sailing."
      }
    },
    stops: [
      {
        day: 0,
        name: "Alimos Marina",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 0,
        hours: 0,
        highlight: { no: "Avgang fr\u00e5 Athen nordover", en: "Departure from Athens heading north" },
        isRest: false,
        image: "Alimos Marina"
      },
      {
        day: 1,
        name: "Cape Sounion",
        port: "Sounion (ankring)",
        lat: 37.6500,
        lng: 24.0250,
        nm: 24,
        hours: 4.4,
        waypoints: [[37.82, 23.72], [37.71, 23.75], [37.65, 23.86], [37.64, 23.97]],
        highlight: { no: "Poseidon-tempelet i solnedgang, ankring for natta", en: "Temple of Poseidon at sunset, anchoring for the night" },
        isRest: false,
        image: "Cape Sounion"
      },
      {
        day: 2,
        name: "Evia Sør",
        port: "Karystos",
        lat: 38.0100,
        lng: 24.2300,
        nm: 24,
        hours: 4.4,
        highlight: { no: "Venetiansk borg, roleg kystby", en: "Venetian fortress, quiet coastal town" },
        isRest: false,
        image: "Evia Sør"
      },
      {
        day: 3,
        name: "Skyros",
        port: "Linaria",
        lat: 38.9000,
        lng: 24.5600,
        nm: 62,
        hours: 11.3,
        waypoints: [[38.05, 24.45], [38.13, 24.60], [38.40, 24.65], [38.65, 24.58]],
        highlight: { no: "Vill øy med Skyros-ponni, Rupert Brooke sitt gravsted", en: "Wild island with Skyros ponies, Rupert Brooke's grave" },
        isRest: false,
        image: "Skyros"
      },
      {
        day: 4,
        name: "Skyros (hviledag)",
        port: "Linaria",
        lat: 38.9000,
        lng: 24.5600,
        nm: 0,
        hours: 0,
        highlight: { no: "Chora på klippen, Skyros-ponniar, folkekunstmuseum", en: "Chora on the cliff, Skyros ponies, folk art museum" },
        isRest: true,
        image: "Skyros"
      },
      {
        day: 5,
        name: "Alonissos",
        port: "Patitiri",
        lat: 39.1450,
        lng: 23.8600,
        nm: 40,
        hours: 7.3,
        highlight: { no: "Port for Nasjonalparken, gamal bydel, dykking", en: "Gateway to the National Park, old town, diving" },
        isRest: false,
        image: "Alonissos"
      },
      {
        day: 6,
        name: "Alonissos Marinpark (hviledag)",
        port: "Patitiri",
        lat: 39.1450,
        lng: 23.8600,
        nm: 0,
        hours: 0,
        highlight: { no: "Europas største marine verneområde, munkesel, delfinar", en: "Europe's largest marine protected area, monk seals, dolphins" },
        isRest: true,
        image: "Alonissos"
      },
      {
        day: 7,
        name: "Skopelos",
        port: "Skopelos Town",
        lat: 39.1200,
        lng: 23.7270,
        nm: 9,
        hours: 1.6,
        highlight: { no: "Mamma Mia-øy, 360 kyrkjer, plommedyrking", en: "Mamma Mia island, 360 churches, plum farming" },
        isRest: false,
        image: "Skopelos"
      },
      {
        day: 8,
        name: "Skiathos",
        port: "Skiathos Town",
        lat: 39.1600,
        lng: 23.4900,
        nm: 14,
        hours: 2.5,
        highlight: { no: "60+ strender inkl. Koukounaries, livleg by", en: "60+ beaches incl. Koukounaries, lively town" },
        isRest: false,
        image: "Skiathos"
      },
      {
        day: 9,
        name: "Skiathos (hviledag)",
        port: "Skiathos Town",
        lat: 39.1600,
        lng: 23.4900,
        nm: 0,
        hours: 0,
        highlight: { no: "Lalaria strand (båt), Kastro ruinar, vannsport", en: "Lalaria beach (by boat), Kastro ruins, water sports" },
        isRest: true,
        image: "Skiathos"
      },
      {
        day: 10,
        name: "Skopelos (retur)",
        port: "Skopelos Town",
        lat: 39.1200,
        lng: 23.7270,
        nm: 14,
        hours: 2.5,
        highlight: { no: "Agios Ioannis-kyrkja (Mamma Mia-brurevika)", en: "Agios Ioannis church (the Mamma Mia wedding chapel)" },
        isRest: false,
        image: "Skopelos"
      },
      {
        day: 11,
        name: "Evia \u2014 Kymi",
        port: "Kymi",
        lat: 38.6350,
        lng: 24.1120,
        nm: 42,
        hours: 7.6,
        highlight: { no: "Roleg kystby på Evia, proviantering", en: "Quiet coastal town on Evia, provisioning" },
        isRest: false,
        image: "Kymi"
      },
      {
        day: 12,
        name: "Evia Sør",
        port: "Karystos",
        lat: 38.0100,
        lng: 24.2300,
        nm: 38,
        hours: 6.9,
        waypoints: [[38.50, 24.20], [38.30, 24.35], [38.15, 24.55], [38.13, 24.60], [38.05, 24.45]],
        highlight: { no: "Tilbake sørover langs Evias austkyst", en: "Back south along Evia's east coast" },
        isRest: false,
        image: "Evia Sør"
      },
      {
        day: 13,
        name: "Alimos Marina (retur)",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 35,
        hours: 6.4,
        highlight: { no: "Siste etappe heim via Sounion til Athen", en: "Final leg home via Sounion to Athens" },
        isRest: false,
        image: "Alimos Marina"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Route 8: Saronisk + Kykladene (Hybrid)
  // ─────────────────────────────────────────────
  {
    id: "saronisk-kyklader",
    name: { no: "Saronisk + Kykladane", en: "Saronic + Cyclades" },
    tagline: { no: "Det beste frå to verder — Saroniske bukta møter Kykladane", en: "The best of both worlds \u2014 the Saronic Gulf meets the Cyclades" },
    region: { no: "Saroniske bukta & vestlege Kykladane", en: "Saronic Gulf & Western Cyclades" },
    color: "#06b6d4",
    description: {
      no: "Ruten som nektar \u00e5 velje. Start med den beskytta Saroniske bukta \u2014 bilfrie Hydra, furukledde Poros \u2014 og kryss det opne havet til dei vestlege Kykladane. Utforsk vulkanlandskapet p\u00e5 Milos, matparadiset Sifnos og landsbyane p\u00e5 Paros f\u00f8r du tredar tilbake via Kea og Cape Sounion. To verder i \u00e9in tur.",
      en: "The route that refuses to choose. Start with the sheltered Saronic Gulf \u2014 car-free Hydra, pine-clad Poros \u2014 and cross the open sea to the western Cyclades. Explore the volcanic landscape of Milos, the culinary paradise of Sifnos, and the villages of Paros before heading back via Kea and Cape Sounion. Two worlds in one trip."
    },
    distance: 288,
    sailingDays: 11,
    restDays: 3,
    difficulty: { no: "Middels", en: "Medium" },
    difficultyLevel: 2,
    startPort: "Alimos Marina",
    endPort: "Alimos Marina",
    bestFor: { no: "Variasjon, to regionar, allsidig oppleving", en: "Variety, two regions, well-rounded experience" },
    heroImage: "Hydra",
    weather: {
      airDay: "19-25\u00b0C",
      airNight: "13-17\u00b0C",
      seaTemp: "17-21\u00b0C",
      wind: "10-18kn (N-NW)",
      description: {
        no: "Saroniske bukta gir rolege forhold dei fyrste dagane. Kryssinga Hydra\u2013Kythnos (~44nm) er n\u00f8kkelpassasjen \u2014 planlegg tidleg avgang og sjekk v\u00earmeldinga. Seint i april gir typisk lette nordlege vindar (10-15 knop). Vestlege Kykladane er relativt beskytta.",
        en: "The Saronic Gulf provides calm conditions for the first days. The Hydra\u2013Kythnos crossing (~44nm) is the key passage \u2014 plan an early departure and check the forecast. Late April typically brings light northerly winds (10\u201315 knots). The western Cyclades are relatively sheltered."
      }
    },
    stops: [
      {
        day: 0,
        name: "Alimos Marina",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 0,
        hours: 0,
        highlight: { no: "Avgang fr\u00e5 Athen", en: "Departure from Athens" },
        isRest: false,
        image: "Alimos Marina"
      },
      {
        day: 1,
        name: "Aegina",
        port: "Aegina Town",
        lat: 37.7470,
        lng: 23.4270,
        nm: 17,
        hours: 3.1,
        highlight: { no: "Afaia-tempelet, pistasjehovudstaden i Hellas", en: "Temple of Afaia, pistachio capital of Greece" },
        isRest: false,
        image: "Aegina"
      },
      {
        day: 2,
        name: "Poros",
        port: "Poros Town",
        lat: 37.5040,
        lng: 23.4570,
        nm: 17,
        hours: 3.1,
        highlight: { no: "Furukledde \u00f8y, ikonisk klokkert\u00e5rn, smal kanal", en: "Pine-clad island, iconic clock tower, narrow channel" },
        isRest: false,
        image: "Poros"
      },
      {
        day: 3,
        name: "Hydra",
        port: "Hydra Town",
        lat: 37.3490,
        lng: 23.4620,
        nm: 12,
        hours: 2.2,
        highlight: { no: "Ingen bilar, ingen syklar \u2014 esel, galleri, kunstnarliv", en: "No cars, no bikes \u2014 donkeys, galleries, artist life" },
        isRest: false,
        image: "Hydra"
      },
      {
        day: 4,
        name: "Hydra (hviledag)",
        port: "Hydra Town",
        lat: 37.3490,
        lng: 23.4620,
        nm: 0,
        hours: 0,
        highlight: { no: "Vlychos-stranda, klippevandring til Kamini, solnedgangsdrink", en: "Vlychos beach, cliff walk to Kamini, sunset drink" },
        isRest: true,
        image: "Hydra"
      },
      {
        day: 5,
        name: "Kythnos (kryssinga!)",
        port: "Loutra",
        lat: 37.4470,
        lng: 24.4200,
        nm: 44,
        hours: 8.0,
        highlight: { no: "DEN store kryssinga \u2014 ope hav fr\u00e5 Saroniske bukta til Kykladane! Varme kjelder i Loutra", en: "THE big crossing \u2014 open sea from the Saronic Gulf to the Cyclades! Hot springs in Loutra" },
        isRest: false,
        image: "Kythnos"
      },
      {
        day: 6,
        name: "Serifos",
        port: "Livadi",
        lat: 37.1430,
        lng: 24.4890,
        nm: 20,
        hours: 3.6,
        highlight: { no: "Dramatisk Chora p\u00e5 toppen, kvite terningshus, Livadi strand", en: "Dramatic Chora on the hilltop, white cubic houses, Livadi beach" },
        isRest: false,
        image: "Serifos"
      },
      {
        day: 7,
        name: "Sifnos",
        port: "Kamares",
        lat: 36.9650,
        lng: 24.7080,
        nm: 15,
        hours: 2.7,
        highlight: { no: "Mathovudstaden i Kykladane \u2014 matlagingskurs, 365 kyrkjer", en: "Culinary capital of the Cyclades \u2014 cooking classes, 365 churches" },
        isRest: false,
        image: "Sifnos"
      },
      {
        day: 8,
        name: "Milos",
        port: "Adamas",
        lat: 36.7200,
        lng: 24.4450,
        nm: 22,
        hours: 4.0,
        highlight: { no: "Sarakiniko m\u00e5neoverflate, Kleftiko-grotene, Adamas hamn", en: "Sarakiniko moonscape, Kleftiko caves, Adamas harbour" },
        isRest: false,
        image: "Milos"
      },
      {
        day: 9,
        name: "Milos (hviledag)",
        port: "Adamas",
        lat: 36.7200,
        lng: 24.4450,
        nm: 0,
        hours: 0,
        highlight: { no: "Utforsk Kleftiko med jolle, katakombane, Plaka solnedgang", en: "Explore Kleftiko by dinghy, the catacombs, Plaka sunset" },
        isRest: true,
        image: "Milos"
      },
      {
        day: 10,
        name: "Paros",
        port: "Naoussa",
        lat: 37.1230,
        lng: 25.2360,
        nm: 48,
        hours: 8.7,
        highlight: { no: "Lang seildag austover \u2014 Naoussa fiskerlandsby, marmorgruvene", en: "Long sailing day eastward \u2014 Naoussa fishing village, the marble quarries" },
        isRest: false,
        image: "Paros"
      },
      {
        day: 11,
        name: "Paros (hviledag)",
        port: "Naoussa",
        lat: 37.1230,
        lng: 25.2360,
        nm: 0,
        hours: 0,
        highlight: { no: "Lefkes fjelllandsby, Golden Beach, dagstur til Antiparos", en: "Lefkes mountain village, Golden Beach, day trip to Antiparos" },
        isRest: true,
        image: "Paros"
      },
      {
        day: 12,
        name: "Kea (Tzia)",
        port: "Korissia",
        lat: 37.6300,
        lng: 24.3220,
        nm: 55,
        hours: 10.0,
        highlight: { no: "Lang returdag vestover \u2014 Kea-l\u00f8va, stille bukter, Ioulida", en: "Long return day westward \u2014 the Lion of Kea, quiet coves, Ioulida" },
        isRest: false,
        image: "Kea"
      },
      {
        day: 13,
        name: "Cape Sounion",
        port: "Sounion (ankring)",
        lat: 37.6500,
        lng: 24.0250,
        nm: 14,
        hours: 2.5,
        highlight: { no: "Poseidon-tempelet i solnedgang \u2014 ankring under dei antikke s\u00f8ylene", en: "Temple of Poseidon at sunset \u2014 anchoring beneath the ancient columns" },
        isRest: false,
        image: "Cape Sounion"
      },
      {
        day: 14,
        name: "Alimos Marina (retur)",
        port: "Alimos",
        lat: 37.9100,
        lng: 23.7050,
        nm: 24,
        hours: 4.4,
        waypoints: [[37.64, 23.97], [37.65, 23.86], [37.71, 23.75], [37.82, 23.72]],
        highlight: { no: "Siste seildag langs Attika-kysten tilbake til Athen", en: "Final sailing day along the Attica coast back to Athens" },
        isRest: false,
        image: "Alimos Marina"
      }
    ]
  }

];
