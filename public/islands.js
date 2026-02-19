/**
 * Greek Sailing Routes — Island & Destination Data
 * Norwegian text throughout. Keyed by slug.
 */
window.ISLANDS_DATA = {

  // ═══════════════════════════════════════════
  //  ATTIKA
  // ═══════════════════════════════════════════

  "alimos-marina": {
    name: "Alimos Marina",
    slug: "alimos-marina",
    region: "attika",
    lat: 37.910,
    lng: 23.710,
    tagline: "Athens' største marina — startpunktet for Saroniske- og Kykladeruter",
    description: "Alimos (Kalamaki) er den største marinaen i Athen-området med over 1000 plasser. Herfra seiler du direkte ut i Saroniske gulfen eller setter kursen sørøst mot Kykladene. Trikken går rett inn til sentrum på 30 minutter.",
    highlights: [
      "Over 1000 båtplasser — Grekenlands største marina",
      "Direkte trikkeforbindelse til Athen sentrum",
      "Fullservice: drivstoff, vann, strøm, verksted, proviantering"
    ],
    anchorage: {
      protection: "Full beskyttelse i marina",
      bottom: "Betongkaier med fortøyning",
      depth: "2-5m i marina",
      facilities: "Full service: vann, strøm, drivstoff, verksted, WiFi, dusj"
    },
    restaurants: [
      { name: "Thalassinos", specialty: "Sjømatrestaurant rett ved marinaen, dagfersk fisk", price: "€€€" },
      { name: "Psaropoula", specialty: "Klassisk gresk fisketaverna, grillet blekksprut", price: "€€" }
    ],
    mustDo: "Ta trikken til Akropolis og tilbake — perfekt siste kveld før avgang",
    localSpecialty: "Freddo espresso — gresk iskaffe som du finner på hvert hjørne",
    image: "Alimos Marina"
  },

  "lavrion": {
    name: "Lavrion",
    slug: "lavrion",
    region: "attika",
    lat: 37.713,
    lng: 24.054,
    tagline: "Porten til Kykladene — 14 nautiske mil til Kea",
    description: "Lavrion er det naturlige utgangspunktet for Kykladeseiling. Kun 14 NM til Kea, korteste overfarten fra fastlandet. Antikkens sølvgruver finansierte Athens flåte og demokrati — og gruvene kan fortsatt besøkes.",
    highlights: [
      "Korteste overgang til Kykladene (14 NM til Kea)",
      "Antikke sølvgruver som finansierte Athens gylne alder",
      "Moderne marina med full service og god proviantering"
    ],
    anchorage: {
      protection: "God fra alle retninger i marina",
      bottom: "Betongkaier med fortøyning",
      depth: "3-6m",
      facilities: "Full service marina, vann, strøm, drivstoff, minimarket"
    },
    restaurants: [
      { name: "To Kyma", specialty: "Sjømat og mezedes med havneutsikt", price: "€€" },
      { name: "Coralli", specialty: "Fersk fisk og ouzo ved vannkanten", price: "€€" }
    ],
    mustDo: "Besøk de antikke sølvgruvene i Thorikos — Europas eldste kjente teater ligger like ved",
    localSpecialty: "Lokal honning fra Attika-regionen, parfymert med timian",
    image: "Lavrion"
  },

  "cape-sounion": {
    name: "Cape Sounion",
    slug: "cape-sounion",
    region: "attika",
    lat: 37.650,
    lng: 24.024,
    tagline: "Poseidons tempel på klippen — Athens mest dramatiske solnedgang",
    description: "Poseidons tempel troner 60 meter over havet på Attikas sørligste punkt. Lord Byron risset inn navnet sitt i en søyle i 1810. Ankre opp i bukta under og svøm mens tempelet lyser opp i solnedgangen.",
    highlights: [
      "Poseidons tempel fra 444 f.Kr. — 15 doriske søyler mot himmelen",
      "Lord Byrons signatur risset inn i marmorsøylen",
      "Solnedgangen herfra regnes som Grekenlands vakreste"
    ],
    anchorage: {
      protection: "Moderat fra N-NW i bukta vest for klippen",
      bottom: "Sand",
      depth: "4-8m",
      facilities: "Ingen — ta med alt du trenger"
    },
    restaurants: [
      { name: "Akrogiali", specialty: "Taverna i bukta under tempelet, grillet fisk", price: "€€" },
      { name: "Ilion", specialty: "Gresk kjøkken med utsikt mot tempelet", price: "€€" }
    ],
    mustDo: "Ankre i bukta og svøm i solnedgangen mens Poseidons tempel lyser gyllen over deg",
    localSpecialty: "Attisk honning med valnøtter — serveres på tavernaen i bukta",
    image: "Cape Sounion"
  },

  // ═══════════════════════════════════════════
  //  SARONISKE GULFEN
  // ═══════════════════════════════════════════

  "aegina": {
    name: "Aegina",
    slug: "aegina",
    region: "saroniske",
    lat: 37.747,
    lng: 23.427,
    tagline: "Europas pistasjhovedstad — med et tempel som rivaliserer Parthenon",
    description: "Aegina produserer Europas beste pistasjenøtter, beskyttet med PDO-merking. Aphaia-tempelet fra 500 f.Kr. er like godt bevart som Parthenon, men uten folkemassene. Spøkelsesbyen Paleochora har 38 intakte bysantinske kirker mellom forlatte hus.",
    highlights: [
      "Europas pistasjhovedstad — PDO-beskyttet med årlig festival",
      "Aphaia-tempelet (500 f.Kr.) — like komplett som Parthenon, nesten ingen turister",
      "Paleochora spøkelsesby med 38 bysantinske kirker"
    ],
    anchorage: {
      protection: "God fra N-NE i hovedhavnen",
      bottom: "Sand og mudder",
      depth: "3-8m",
      facilities: "Kaibryggeplass, vann, drivstoff, proviantering i byen"
    },
    restaurants: [
      { name: "Skotadis", specialty: "Fiskemezedes og pistasjretter, familieeiet siden 1950-tallet", price: "€€" },
      { name: "Kappos Etsi", specialty: "Moderne gresk med pistasjpesto og lokal fisk", price: "€€" },
      { name: "To Steki", specialty: "Grillet blekksprut og billige karafler med retsina", price: "€" }
    ],
    mustDo: "Kjøp en pose ristede pistasjenøtter rett fra produsenten på havna og besøk Aphaia-tempelet i solnedgangen",
    localSpecialty: "Pistasjis — laget med ekte Aegina-pistasj, grønnere og smaksrikere enn noe du har prøvd",
    image: "Aegina"
  },

  "poros": {
    name: "Poros",
    slug: "poros",
    region: "saroniske",
    lat: 37.502,
    lng: 23.456,
    tagline: "200 meter fra fastlandet — sitronduftende øy i et smalt sund",
    description: "Poros ligger bare 200 meter fra Peloponnes, adskilt av et smalt sund der strømmen kan kjennes. Klokketårnet fra 1927 er landemerket. Like bak byen skjuler Lemonodasos seg — 30 000 sitrontrær som parfymerer hele øya om våren.",
    highlights: [
      "200 meter bredt sund til Peloponnes — seil gjennom som en fjord",
      "Lemonodasos — 30 000 sitrontrær i en duftende dal",
      "Klokketårnet fra 1927 med panoramautsikt over sundet"
    ],
    anchorage: {
      protection: "Utmerket fra alle retninger i sundet",
      bottom: "Mudder og sand",
      depth: "4-10m",
      facilities: "Kaibryggeplass langs hovedgata, vann, drivstoff, butikker"
    },
    restaurants: [
      { name: "Oasis", specialty: "Gresk taverna med utsikt over sundet, god moussaka", price: "€€" },
      { name: "Karavolos", specialty: "Snegler (karavolos) og grillet fisk rett ved vannet", price: "€€" }
    ],
    mustDo: "Gå opp til klokketårnet ved solnedgang og se utover sundet mens Peloponnes gløder orange",
    localSpecialty: "Sitronlikør laget av frukt fra Lemonodasos-lunden",
    image: "Poros"
  },

  "hydra": {
    name: "Hydra",
    slug: "hydra",
    region: "saroniske",
    lat: 37.349,
    lng: 23.462,
    tagline: "Bilfri kunstnerøy — kun esler og vannbåter",
    description: "Helt bilfritt — ingen kjøretøy av noe slag. Kun esler, vannbåter og føtter. Leonard Cohen bodde her i syv år og skrev noen av sine mest kjente sanger. Den amfiteatralske havnen med kapteinsvillaer fra 1700-tallet er uendret.",
    highlights: [
      "Bilfri øy — kun esler og vannbåter for transport",
      "Leonard Cohens kunstnerkoloni — han bodde her 1960-67",
      "Amfiteatralsk havn med kapteinsvillaer fra 1700-tallet"
    ],
    anchorage: {
      protection: "God fra N-NW",
      bottom: "Sand og stein",
      depth: "3-8m",
      facilities: "Kaibryggeplass, vann, drivstoff"
    },
    restaurants: [
      { name: "Xeri Elia (Douskos)", specialty: "Grillmat, 200 år familiedrift, Leonard Cohens stammested", price: "€€" },
      { name: "Techne", specialty: "Moderne gresk, kalamari og lam med utsikt", price: "€€€" },
      { name: "Omilos", specialty: "Cocktails og sjømat ved bassenget på havnen", price: "€€€" }
    ],
    mustDo: "Gå kystveien vestover til Kaminia-bukta — en stille fiskerhavn med to tavernaer rett på vannet",
    localSpecialty: "Amygdalota — mandelkaker med rosevann, bakt på øya",
    image: "Hydra"
  },

  "spetses": {
    name: "Spetses",
    slug: "spetses",
    region: "saroniske",
    lat: 37.257,
    lng: 23.150,
    tagline: "Hestevogner og furuskog — John Fowles' magiske øy",
    description: "Nesten bilfri — hestevogner og mopeder er transportmiddelet. Bouboulina, gresk frigjøringsadmiral, bodde her. John Fowles underviste på Anargyrios-skolen og skrev 'The Magus' inspirert av øya. Furuskoger helt ned til sjøen.",
    highlights: [
      "Hestevogner i stedet for biler — bilfritt sentrum",
      "Bouboulina-museet — den kvinnelige admiralens hjem fra frigjøringskrigen",
      "John Fowles skrev 'The Magus' her — Anargyrios-skolen er kulissen"
    ],
    anchorage: {
      protection: "God fra N-NW i Baltiza (gammel havn)",
      bottom: "Sand og sjøgress",
      depth: "3-6m",
      facilities: "Kai, vann, drivstoff, butikker i gamlebyen"
    },
    restaurants: [
      { name: "On the Verandah", specialty: "Sjømat med havutsikt, daglig fangst", price: "€€€" },
      { name: "Tarsanas", specialty: "Tradisjonell gresk i gammelt skipsverft, grillet blekksprut", price: "€€" }
    ],
    mustDo: "Lei en hestevogn rundt øya — 25 km kystlinje med furuskoger som stuper ned i krystallblått vann",
    localSpecialty: "Psarosoupa — tyktflytende fiskesuppe med sitron og egg, en lokal spesialitet",
    image: "Spetses"
  },

  "porto-heli": {
    name: "Porto Heli",
    slug: "porto-heli",
    region: "saroniske",
    lat: 37.322,
    lng: 23.148,
    tagline: "Den greske rivieraen — beskyttet bukt med Peloponnesos som bakteppe",
    description: "Porto Heli er en dyp, naturlig beskyttet bukt på Peloponnes-kysten, rett overfor Spetses. Populært blant gresk overklasse og internasjonale seilere. Det nærliggende antikke Halieis under vann er en av Middelhavsområdets best bevarte sunkne byer.",
    highlights: [
      "En av Saroniske gulfens best beskyttede naturhavner",
      "Undervannsruinene av antikke Halieis — synlig med snorkel",
      "Gresk riviera-stemning med luksusresorts og tradisjonelle tavernaer side om side"
    ],
    anchorage: {
      protection: "Utmerket fra alle retninger",
      bottom: "Mudder og sand",
      depth: "3-12m",
      facilities: "Marina, vann, strøm, drivstoff, butikker"
    },
    restaurants: [
      { name: "Paleo", specialty: "Moderne gresk med lokal fisk og Peloponnes-vin", price: "€€€" },
      { name: "Sto Molo", specialty: "Taverna på kaien, grillet fisk og ouzo", price: "€€" }
    ],
    mustDo: "Snorkle over de sunkne ruinene av Halieis — murene fra den antikke byen ligger på 1-3 meters dyp",
    localSpecialty: "Argolida-appelsiner — de beste i Hellas, brukt i lokale desserter og juice",
    image: "Porto Heli"
  },

  "monemvasia": {
    name: "Monemvasia",
    slug: "monemvasia",
    region: "peloponnese",
    lat: 36.687,
    lng: 23.057,
    tagline: "Bysantinsk festning på en klippe — én inngang, tusen års historie",
    description: "En massiv klippe forbundet til fastlandet med en enkelt bro. Middelalderbyens eneste inngang er gjennom en smal port i murveggen — derav navnet 'moni emvasis' (eneste inngang). Bilfritt innenfor murene. Malvasia-vinen herfra var middelalderens mest ettertraktede.",
    highlights: [
      "Bysantinsk festningsby med kun én inngang gjennom murveggen",
      "Bilfri middelalderby — steinlagde gater mellom restaurerte hus",
      "Malvasia-vin — middelalderens mest berømte vin, fortsatt produsert lokalt"
    ],
    anchorage: {
      protection: "Moderat fra S-SW i bukta nord for klippen",
      bottom: "Sand og stein",
      depth: "4-10m",
      facilities: "Begrenset — kai tilgjengelig, proviantering i byen"
    },
    restaurants: [
      { name: "Matoula", specialty: "Bysantinsk-inspirerte retter i middelalderhvelv, lam med honning", price: "€€€" },
      { name: "To Kanoni", specialty: "Sjømat på festningsmuren med utsikt over havet", price: "€€" }
    ],
    mustDo: "Gå opp til den øvre festningen ved solnedgang — utsikten over Lakoniske gulfen er overveldende",
    localSpecialty: "Malvasia-vin — søt dessertvin med 800 års ubrutt tradisjon",
    image: "Monemvasia"
  },

  "elafonisos": {
    name: "Elafonisos",
    slug: "elafonisos",
    region: "peloponnese",
    lat: 36.484,
    lng: 22.970,
    tagline: "Rosa sand og karibisk vann — Grekenlands best bevarte hemmelighet",
    description: "Simos-stranden ser ut som den hører hjemme i Karibia: rosa-hvit sand, turkist vann, sanddyner med einer. Øya har knapt 1000 innbyggere og nesten ingen turisme utenom juli-august. Perfekt ankringsplass for en natt under stjernene.",
    highlights: [
      "Simos-stranden — rosa sand og karibisk turkist vann",
      "Sanddyner dekket med einer mellom to buktene",
      "Nesten uberørt — knapt turisme utenfor høysesong"
    ],
    anchorage: {
      protection: "God fra N-NE i Simos-bukta",
      bottom: "Sand",
      depth: "3-6m",
      facilities: "Minimalt — liten havn på nordsiden, proviantering begrenset"
    },
    restaurants: [
      { name: "Nautilus", specialty: "Fiskeaverna på havnen, dagfersk fangst", price: "€€" },
      { name: "Pavlos", specialty: "Grillet blekksprut og sjømat-mezedes", price: "€" }
    ],
    mustDo: "Ankre mellom de to Simos-buktene og gå over sanddynene ved solnedgang",
    localSpecialty: "Villsamlet kapris fra øya — spises som mezedes med ouzo",
    image: "Elafonisos"
  },

  "kythira": {
    name: "Kythira",
    slug: "kythira",
    region: "saroniske",
    lat: 36.225,
    lng: 23.017,
    tagline: "Afrodites fødested — der Ionerhavet møter Egeerhavet",
    description: "Mytologiens Afrodite ble født av havskummet her. Kythira henger mellom tre hav og har vært venetiansk, britisk og gresk. Chora med den venetianske festningen troner over stupbratte klipper. Mindre turistifisert enn nesten alle andre greske øyer.",
    highlights: [
      "Afrodites mytologiske fødested — Aphrodite-helligdommen kan besøkes",
      "Venetiansk festning i Chora med panoramautsikt",
      "Kythira-honning — regnes som Grekenlands beste timian-honning"
    ],
    anchorage: {
      protection: "God fra N-NW i Kapsali (dobbelbukt sør for Chora)",
      bottom: "Sand",
      depth: "4-8m",
      facilities: "Kai i Kapsali, vann, begrenset drivstoff"
    },
    restaurants: [
      { name: "Hydragogion", specialty: "Tradisjonell mat i gammel vannmølle, lam fra øya", price: "€€" },
      { name: "Filio", specialty: "Hjemmelaget pasta og lokal ost i Chora", price: "€€" }
    ],
    mustDo: "Besøk Mylopotamos-fossefallet og den skjulte grotten bak vannet — helt magisk",
    localSpecialty: "Kythira timian-honning — mange kaller den Grekenlands aller beste",
    image: "Kythira"
  },

  // ═══════════════════════════════════════════
  //  VESTLIGE KYKLADENE
  // ═══════════════════════════════════════════

  "kea": {
    name: "Kea",
    slug: "kea",
    region: "kykladene",
    lat: 37.630,
    lng: 24.320,
    tagline: "Nærmeste kykladen — 14 NM fra Lavrion, med en 2600 år gammel steinløve",
    description: "Bare 14 NM fra Lavrion — den nærmeste kykladeøya til fastlandet og den perfekte første stoppen. Kea-løven fra 600 f.Kr. er hugget rett ut av fjellet, 6 meter lang. Eikeskog i stedet for typisk kyklade-ørken. Mest populær blant atenere som helgeøy.",
    highlights: [
      "Kea-løven (600 f.Kr.) — 6 meter lang, hugget direkte i fjellet",
      "Kun 14 NM fra Lavrion — korteste overgang fra fastlandet",
      "Eikeskog og grønne daler — atypisk for Kykladene"
    ],
    anchorage: {
      protection: "God fra N-NW i Korissia-bukta",
      bottom: "Sand og mudder",
      depth: "3-10m",
      facilities: "Kai, vann, drivstoff, butikker i Korissia"
    },
    restaurants: [
      { name: "Rolando's", specialty: "Moderne gresk med lokal ost og honning, terrasse i Ioulida", price: "€€€" },
      { name: "Magazes", specialty: "Taverna ved stranden i Korissia, fisk og mezedes", price: "€€" }
    ],
    mustDo: "Gå den antikke stien fra Korissia til Ioulida (1 time) og besøk Kea-løven — 2600 år gammel og fortsatt majestetisk",
    localSpecialty: "Paspalas — tradisjonsrik grise-charcuterie som kun lages på Kea",
    image: "Kea"
  },

  "kythnos": {
    name: "Kythnos",
    slug: "kythnos",
    region: "kykladene",
    lat: 37.388,
    lng: 24.430,
    tagline: "Varme kilder i havet og en strand som strekker seg til begge sider",
    description: "Loutra har varme kilder som renner rett ut i havet — bad i naturlig oppvarmet sjøvann. Kolona-stranden er en smal sandbanke som forbinder øya med en holme, med strand på begge sider. Uturistifisert og tidløs.",
    highlights: [
      "Loutra — varme kilder som renner direkte ut i havet",
      "Kolona dobbeltsidig sandbanke-strand mellom øya og en holme",
      "En av de minst turistifiserte kykladeøyene"
    ],
    anchorage: {
      protection: "God fra N i Loutra-bukta, god fra S i Merihas",
      bottom: "Sand",
      depth: "3-8m",
      facilities: "Kai i Merihas, vann, drivstoff, minimarked"
    },
    restaurants: [
      { name: "To Kandouni", specialty: "Familiedrevet taverna i Chora, hjemmelaget mat", price: "€" },
      { name: "Ostria", specialty: "Sjømat og grillet kjøtt ved Merihas-havnen", price: "€€" }
    ],
    mustDo: "Bad i de varme kildene i Loutra ved solnedgang — naturlig oppvarmet sjøvann i steinbasseng",
    localSpecialty: "Kythniansk sfela — lokalt produsert myk hvitost, spist fersk med honning",
    image: "Kythnos"
  },

  "serifos": {
    name: "Serifos",
    slug: "serifos",
    region: "kykladene",
    lat: 37.159,
    lng: 24.510,
    tagline: "Dramatisk hilltop-chora og forlatte gruver — Kykladenes ville hjerte",
    description: "Chora klamrer seg til toppen av en bratt ås som et ørnebol — en av Kykladenes mest spektakulære. Øya har gruvehistorie tilbake til bronsealderen. Livadi-bukta er en naturlig havn med god ankring og tav​ernaer langs vannet.",
    highlights: [
      "Chora på klippen — en av Kykladenes mest fotogene landsbyer",
      "Forlatte jerngruver fra antikken til 1900-tallet — industriell arkeologi",
      "Livadi-bukta — romslig, god ankring og avslappet stemning"
    ],
    anchorage: {
      protection: "God fra N-NE i Livadi-bukta",
      bottom: "Sand, god holdekraft",
      depth: "4-10m",
      facilities: "Kai, vann, drivstoff, butikker i Livadi"
    },
    restaurants: [
      { name: "Aloni", specialty: "Tradisjonell gresk mat i Chora med utsikt over hele øya", price: "€€" },
      { name: "Yacht Club Serifos", specialty: "Sjømat og pasta rett på stranden i Livadi", price: "€€" }
    ],
    mustDo: "Gå opp de 300 trinnene til Chora på kveldstid — utsikten over Kykladene i solnedgang er uforglemmelig",
    localSpecialty: "Marathopita — pai fylt med villsamlet fennikel og lokal ost",
    image: "Serifos"
  },

  "sifnos": {
    name: "Sifnos",
    slug: "sifnos",
    region: "kykladene",
    lat: 36.960,
    lng: 24.715,
    tagline: "Grekenlands gastronomiske hovedstad — hjemstedet til det greske kjøkkenets far",
    description: "Sifnos er fødestedet til Nikolaos Tselementes, mannen som skrev den greske kokebok-bibelen. Øya er uoffisiell mathovedstad i Kykladene med over 100 km merkedeturstier mellom landsbyer. Keramikktradisjonen går 3000 år tilbake.",
    highlights: [
      "Gastronomisk hovedstad — Tselementes (gresk matkultur-far) ble født her",
      "Over 100 km merkede turstier mellom pittoreske landsbyer",
      "3000 år ubrutt keramikktradisjon — verksteder kan besøkes"
    ],
    anchorage: {
      protection: "God fra N-NE i Kamares-bukta",
      bottom: "Sand og mudder",
      depth: "4-12m",
      facilities: "Kai i Kamares, vann, drivstoff, supermarked"
    },
    restaurants: [
      { name: "Omega 3", specialty: "Dagfersk sjømat på havnen i Kamares", price: "€€" },
      { name: "Drakakis", specialty: "Tradisjonell sifniansk mat, revithada (langkokt kikertstuing)", price: "€€" },
      { name: "Chrysso", specialty: "Kreativ gresk i Artemonas, bruk av lokale urter og ost", price: "€€€" }
    ],
    mustDo: "Spis revithada — kikertstuing langkokt over natten i leirovn — den er Sifnos' signaturrett",
    localSpecialty: "Revithada — kikertstuing langkokt over natten i tradisjonell leirovn, kun på søndager i mange tavernaer",
    image: "Sifnos"
  },

  "milos": {
    name: "Milos",
    slug: "milos",
    region: "kykladene",
    lat: 36.745,
    lng: 24.440,
    tagline: "Sarakiniko-månelandskap og Kleftiko-sjøgrotter — 80 strender i vulkansk paradis",
    description: "Vulkansk øy med over 80 strender i forskjellige farger. Sarakiniko ser ut som et månelandskap i hvitt med turkist hav. Kleftiko-sjøgrottene er kun tilgjengelige fra sjøen. Venus de Milo ble funnet her i 1820. Adamas-havnen er en av Middelhavets største naturhavner.",
    highlights: [
      "Sarakiniko — hvitt månelandskap som stuper ned i turkist hav",
      "Kleftiko-sjøgrotter — kun tilgjengelig med båt, spektakulært for snorkling",
      "Adamas — en av Middelhavets største naturlige havner"
    ],
    anchorage: {
      protection: "Utmerket i Adamas fra nesten alle vindretninger",
      bottom: "Mudder, utmerket holdekraft",
      depth: "4-15m",
      facilities: "Full service i Adamas: kai, vann, strøm, drivstoff, verksted"
    },
    restaurants: [
      { name: "O! Hamos!", specialty: "Legendarisk taverna i Adamas — revet lam og lokal ost, bestill i forveien", price: "€€" },
      { name: "Medusa", specialty: "Sjømat i Mandrakia fiskerhavn, 4 bord rett på vannet", price: "€€€" },
      { name: "Astakas", specialty: "Hummer og sjømat med utsikt over Pollonia", price: "€€€" }
    ],
    mustDo: "Seil til Kleftiko-grottene tidlig morgen — snorkle gjennom turkise huler og naturlige buer før dagsbåtene kommer",
    localSpecialty: "Pitarakia — små paier med fersk lokal ost og mynte, stekt i olivenolje",
    image: "Milos"
  },

  "folegandros": {
    name: "Folegandros",
    slug: "folegandros",
    region: "kykladene",
    lat: 36.621,
    lng: 24.910,
    tagline: "Chora på 200-metersklippen — Kykladenes vakreste landsby uten folkemassene",
    description: "Chora balanserer på kanten av en 200 meter høy klippe — mange kaller den Kykladenes vakreste landsby. Chrysospilia ('gyllen grotte') på nordkysten har stalaktitter som glinser i gull. Matsata-pasta er øyas egen pastavariant, hjemmelaget overalt.",
    highlights: [
      "Chora på 200-metersklippen — regnet som Kykladenes vakreste",
      "Chrysospilia — 'gyllen grotte' med gullglinsende stalaktitter",
      "Panagia-kirken opplyst om natten på klippekanten — ikonisk syn"
    ],
    anchorage: {
      protection: "Moderat i Karavostasi fra N-NE",
      bottom: "Sand og stein",
      depth: "3-8m",
      facilities: "Liten kai i Karavostasi, begrenset vann og drivstoff"
    },
    restaurants: [
      { name: "Pounta", specialty: "Utsikt fra klippekanten i Chora, hjemmelaget matsata-pasta", price: "€€" },
      { name: "Eva's Garden", specialty: "Hage-restaurant med lokal mat, kje og kaninretter", price: "€€" }
    ],
    mustDo: "Gå opp den bratte stien til Panagia-kirken ved solnedgang — 200 meter over havet, opplyst i mørket",
    localSpecialty: "Matsata — hjemmelaget pasta med kje eller kanin i tomatsaus, Folegandros' signaturrett",
    image: "Folegandros"
  },

  // ═══════════════════════════════════════════
  //  HOVED-KYKLADENE
  // ═══════════════════════════════════════════

  "paros": {
    name: "Paros",
    slug: "paros",
    region: "kykladene",
    lat: 37.085,
    lng: 25.152,
    tagline: "Naoussa fiskerhavn og parisk marmor — Kykladenes uanstrengte hjerte",
    description: "Paros har alt uten anmassenhet. Naoussa er en av Egeerhavet mest fotogene fiskerhavner. Parisk marmor — verdens fineste — ble brukt til Venus de Milo og Napoleons grav. Golden Beach er blant verdens beste for windsurfing.",
    highlights: [
      "Naoussa fiskerhavn — fargerike båter og hvitkalkedehusfasader",
      "Parisk marmor — verdens fineste, brukt til Venus de Milo",
      "Golden Beach — verdensklasse windsurfing med Meltemi-vind"
    ],
    anchorage: {
      protection: "God fra N-NW i Parikia, god fra NE i Naoussa",
      bottom: "Sand",
      depth: "3-10m",
      facilities: "Kai og bøyer i Parikia, vann, drivstoff, full proviantering"
    },
    restaurants: [
      { name: "Mario", specialty: "Institusjon i Naoussa, sjømat og pasta siden 1980-tallet", price: "€€€" },
      { name: "Siparos", specialty: "Farm-to-table i Naoussa, lokale råvarer og naturvin", price: "€€€" },
      { name: "Taverna Glafkos", specialty: "Enkel fiskeaverna på havnen i Naoussa, grillet dagsfangst", price: "€€" }
    ],
    mustDo: "Spis middag på en av de små tavernaene i Naoussa havn mens fiskebåtene dukker inn i skumringen",
    localSpecialty: "Gouna — soltørket makrell, Paros' signaturdish, servert grillet med sitron",
    image: "Paros"
  },

  "naxos": {
    name: "Naxos",
    slug: "naxos",
    region: "kykladene",
    lat: 37.100,
    lng: 25.378,
    tagline: "Størst og mest selvforsynt — Portara, graviera og Kitron-likør",
    description: "Den største kykladeøya er den mest selvforsynte: egne poteter, ost, kjøtt, frukt. Portara — den enorme marmorporten på holmen ved havna — er Naxos' ikon. Graviera-osten herfra er Grekenlands beste. Kitron-likør lages av sitrusfrukten citron, kun på Naxos.",
    highlights: [
      "Portara — den kolossale Apollon-tempelporten, Naxos' ikoniske landemerke",
      "Naxos graviera — regnet som Grekenlands beste ost",
      "Kitron-likør — laget av citron-frukt som kun dyrkes her"
    ],
    anchorage: {
      protection: "God fra N-NW i Naxos havn",
      bottom: "Sand",
      depth: "3-10m",
      facilities: "Kai, vann, drivstoff, full proviantering i byen"
    },
    restaurants: [
      { name: "To Elliniko", specialty: "Naxiansk tradisjonsmat — lokal ost, poteter og kjøtt", price: "€€" },
      { name: "Meze2", specialty: "Kreative mezedes og Naxos-vin i gamlebyen", price: "€€" },
      { name: "Apostolis", specialty: "Sjømat-taverna rett ved Portara, grillet blekksprut", price: "€€" }
    ],
    mustDo: "Gå ut til Portara ved solnedgang — den enorme marmorporten rammer inn den perfekte Egeerhavet-solnedgangen",
    localSpecialty: "Kitron-likør — destillert av citron-bladene, finnes i tre varianter (grønn, klar, gul)",
    image: "Naxos"
  },

  "ios": {
    name: "Ios",
    slug: "ios",
    region: "kykladene",
    lat: 36.723,
    lng: 25.282,
    tagline: "Homers grav og 12 vindmøller — mye mer enn festøy",
    description: "Ios rommer Homers antatte grav i nord og 12 vindmøller over Chora. Ja, nattelivet er legendarisk, men øya har fantastiske strender, en av Kykladenes fineste Choraer og overraskende god mat. Mylopotas-stranden er kilometerlang.",
    highlights: [
      "Homers grav — den legendariske dikterens antatte hvilested",
      "12 vindmøller i rekke over Chora — fotogent fra alle vinkler",
      "Mylopotas — kilometerlang gyllen sandstrand"
    ],
    anchorage: {
      protection: "God fra N-NW i Ios-havnen (Ormos)",
      bottom: "Sand, god holdekraft",
      depth: "4-12m",
      facilities: "Kai, vann, drivstoff, butikker"
    },
    restaurants: [
      { name: "Grandma's", specialty: "Hjemmelaget gresk i Chora — moussaka og pastitsio som bestemor lager", price: "€€" },
      { name: "Lord Byron", specialty: "Sjømat og utsikt i Chora, dagfersk fisk", price: "€€€" }
    ],
    mustDo: "Gå den antikke stien til Homers grav på nordspissen — ensom vandring med panoramautsikt over Sikinos og Santorini",
    localSpecialty: "Skordostoumpi — lokal hvitløk-dipp med mandler, servert til brød",
    image: "Ios"
  },

  "santorini": {
    name: "Santorini",
    slug: "santorini",
    region: "kykladene",
    lat: 36.393,
    lng: 25.461,
    tagline: "Kalderaen — verdens mest dramatiske vulkanutsikt og 3600 år gammel by under asken",
    description: "Det vulkanske utbruddet rundt 1600 f.Kr. skapte kalderaen og begravde Akrotiri — et 'minoisk Pompeii' som nå er utgravd. Assyrtiko-druen vokser i kurver på bakken for å overleve vinden og gir mineralsk, unik vin. Kveldslyset over kalderaen er uten sidestykke.",
    highlights: [
      "Kalderaen — 300 meter stupbratte klipper ned til vulkankrateret",
      "Akrotiri — 'minoisk Pompeii' med 3600 år gamle fresker",
      "Assyrtiko-vin fra Estate Argyros — vulkanjord gir unik mineralsk smak"
    ],
    anchorage: {
      protection: "Moderat i Athinios/Vlychada fra N-NE, ankring i kalderaen ustabil",
      bottom: "Vulkansk, varierende holdekraft — bruk bøyer i kalderaen",
      depth: "Svært dypt i kalderaen (40-80m), bøyer nødvendig",
      facilities: "Begrenset kai i Athinios, Vlychada marina sør har bedre fasiliteter"
    },
    restaurants: [
      { name: "To Psaraki", specialty: "Sjømat i Vlychada ved de spektakulære vulkanske klippene", price: "€€" },
      { name: "Metaxy Mas", specialty: "Kretisk-inspirert mat i Exo Gonia — regnes som Santorinis beste", price: "€€" },
      { name: "Selene", specialty: "Fine dining med santorinsk-inspirert meny, Assyrtiko-vinmeny", price: "€€€€" }
    ],
    mustDo: "Besøk Estate Argyros for vinsmakings — Assyrtiko fra vulkanjord med utsikt over Egeerhavet",
    localSpecialty: "Fava — gul linsepur fra lokalt dyrkede linser, Santorinis nasjonalrett",
    image: "Santorini"
  },

  "mykonos": {
    name: "Mykonos",
    slug: "mykonos",
    region: "kykladene",
    lat: 37.445,
    lng: 25.329,
    tagline: "Little Venice og fem vindmøller — porten til hellige Delos",
    description: "Mykonos er Kykladenes kosmopolitiske hjerte, men under glamouren er det en genuin kyklade-chora. Little Venice med husene rett over vannet og de fem vindmøllene er ikoniske. Den egentlige perlen er nærhet til Delos — Apollons fødested og UNESCO-verdensarv.",
    highlights: [
      "Little Venice — hus som henger over havet, perfekt for solnedgang",
      "Fem ikoniske vindmøller på åsen over Chora",
      "15 minutter med båt til Delos — Apollons fødested (UNESCO)"
    ],
    anchorage: {
      protection: "Moderat i gammel havn fra N-NW, ny marina Tourlos bedre",
      bottom: "Sand",
      depth: "3-8m",
      facilities: "Tourlos marina: kai, vann, drivstoff. Gammel havn: begrenset"
    },
    restaurants: [
      { name: "Kiki's Tavern", specialty: "Grillmat ved Agios Sostis-stranden — ingen reservasjon, bare kø og vent", price: "€€" },
      { name: "Joanna's Nikos Place", specialty: "Sjømat i Megali Ammos, familiedrevet i generasjoner", price: "€€€" },
      { name: "M-eating", specialty: "Kvalitetskjøtt og deli i Chora", price: "€€€" }
    ],
    mustDo: "Ta morgenbåten til Delos — Apollons fødested med Løvenes terrasse og antikke mosaikker — tilbake til lunsj",
    localSpecialty: "Louza — lufttørket svinekjøtt krydret med pepper og allehånde, Mykonos' svar på prosciutto",
    image: "Mykonos"
  },

  "syros": {
    name: "Syros",
    slug: "syros",
    region: "kykladene",
    lat: 37.445,
    lng: 24.894,
    tagline: "Kykladenes administrative hovedstad — nyklassisisme, loukoumi og rebetiko",
    description: "Ermoupoli er Kykladenes hovedstad med Grekenlands best bevarte nyklassisistiske arkitektur. Markos Vamvakaris — rebetiko-musikkens far — ble født her. Loukoumi (gresk lokum) fra Syros er berømt i hele Hellas. To høyder: katolske Ano Syros og ortodokse Ermoupoli.",
    highlights: [
      "Ermoupoli — nyklassisistisk hovedstad med Apollon-teater (mini-La Scala)",
      "Markos Vamvakaris-museet — rebetiko-musikkens fødested",
      "To religioner, to høyder — katolske Ano Syros og ortodokse Ermoupoli"
    ],
    anchorage: {
      protection: "God fra N-NW i Ermoupoli havn",
      bottom: "Mudder, god holdekraft",
      depth: "3-10m",
      facilities: "Full service: kai, vann, strøm, drivstoff, verksted"
    },
    restaurants: [
      { name: "Mazi", specialty: "Moderne gresk i Ermoupoli, kreative mezedes", price: "€€€" },
      { name: "Allou Yialou", specialty: "Sjømat rett på stranden, fersk og enkel", price: "€€" }
    ],
    mustDo: "Spis loukoumi fra en av de tradisjonelle butikkene i Ermoupoli og besøk det lille Apollon-teateret — en Mini-La Scala",
    localSpecialty: "Loukoumi — gresk lokum med rosevann, Syros' mest kjente eksportvare",
    image: "Syros"
  },

  // ═══════════════════════════════════════════
  //  SMÅ KYKLADENE
  // ═══════════════════════════════════════════

  "koufonisia": {
    name: "Koufonisia",
    slug: "koufonisia",
    region: "sma-kykladene",
    lat: 36.933,
    lng: 25.598,
    tagline: "400 innbyggere og øya som nekter å ha det travelt",
    description: "Pano Koufonisi har bare 400 fastboende og ingen biler utenom en renovasjonsbil. Østkysten er en ubrutt rekke med strender og naturlige basseng i sandstein. Pori Beach har sjøgrotter du kan svømme inn i. Tempo: null.",
    highlights: [
      "Østkysten — ubrutt rekke med strender og naturlige sjøbasseng",
      "Pori Beach med sjøgrotter du kan svømme gjennom",
      "400 innbyggere og kun én bil (renovasjonen)"
    ],
    anchorage: {
      protection: "Moderat fra N i havnen, utsatt for Meltemi",
      bottom: "Sand",
      depth: "2-6m",
      facilities: "Liten kai, vann, minimarked"
    },
    restaurants: [
      { name: "Captain Nikolas", specialty: "Fisk fra eierens egen båt, servert på kaien", price: "€€" },
      { name: "Scholio", specialty: "Grillet blekksprut og lokal raki i gammel skolebygning", price: "€€" }
    ],
    mustDo: "Gå kystveien østover fra Chora langs alle buktene — hver sving avslører en ny strand vakrere enn den forrige",
    localSpecialty: "Dagfersk hummer servert enkel med sitron — Koufonisias stolthet",
    image: "Koufonisia"
  },

  "schinoussa": {
    name: "Schinoussa",
    slug: "schinoussa",
    region: "sma-kykladene",
    lat: 36.872,
    lng: 25.520,
    tagline: "250 innbyggere, 18 strender — én landsby og én havn",
    description: "Schinoussa har 250 fastboende, én landsby (Chora), én havn (Mersini) og 18 strender. Det er hele øya. Ingen turistshop, ingen nattklubb, bare rolig gresk øyliv med tavernaer som serverer det fiskerne hentet opp i dag.",
    highlights: [
      "18 strender fordelt på 250 innbyggere — din private strand garantert",
      "Én landsby, én havn — Grekenland destillert til sitt enkleste",
      "Tsigouri-stranden — turkist vann og nesten alltid tom"
    ],
    anchorage: {
      protection: "Moderat fra N-NE i Mersini",
      bottom: "Sand",
      depth: "3-6m",
      facilities: "Minimal kai, vann tilgjengelig, én minibutikk"
    },
    restaurants: [
      { name: "Deli", specialty: "Hjemmelaget mat i Chora, geiterett og lokale grønnsaker", price: "€" },
      { name: "Mersini", specialty: "Taverna på havnen, dagfersk fisk fra lokale fiskere", price: "€€" }
    ],
    mustDo: "Gå til Tsigouri-stranden — 15 minutter fra Chora, turkist vann og sannsynligvis helt tom",
    localSpecialty: "Geitekjøtt tilberedt med lokale urter — geitene vandrer fritt over øya",
    image: "Schinoussa"
  },

  "amorgos": {
    name: "Amorgos",
    slug: "amorgos",
    region: "sma-kykladene",
    lat: 36.833,
    lng: 25.890,
    tagline: "Hozoviotissa-klosteret i klippen og 'The Big Blue' — Kykladenes villeste øy",
    description: "Hozoviotissa-klosteret fra 1088 e.Kr. er bygget inn i en 300 meter høy klippe over havet — et av Grekenlands mest dramatiske syn. Luc Bessons 'The Big Blue' ble filmet her. To havner: Katapola og Aegiali, forbundet av en dramatisk fjellvei.",
    highlights: [
      "Hozoviotissa-klosteret (1088) — bygget inn i en 300 meter høy klippe",
      "'The Big Blue' (1988) — filmet i Agia Anna-bukta",
      "To havner og en dramatisk fjellvei mellom dem"
    ],
    anchorage: {
      protection: "God fra N i Katapola (dyp bukt), moderat i Aegiali",
      bottom: "Sand og mudder",
      depth: "4-15m i Katapola",
      facilities: "Kai i begge havner, vann, drivstoff, butikker"
    },
    restaurants: [
      { name: "Tranzistor", specialty: "Kafé og mat med bohemsk stemning i Chora", price: "€€" },
      { name: "Limani tou Katapola", specialty: "Sjømat-taverna på Katapola-kaien, dagfersk fisk", price: "€€" }
    ],
    mustDo: "Besøk Hozoviotissa-klosteret — 300 trinn opp klippen, munkene serverer raki og loukoumi på toppen",
    localSpecialty: "Psimeni raki — raki infusert med honning og krydder, servert av munkene i Hozoviotissa",
    image: "Amorgos"
  },

  // ═══════════════════════════════════════════
  //  NORDLIGE KYKLADENE
  // ═══════════════════════════════════════════

  "andros": {
    name: "Andros",
    slug: "andros",
    region: "nordlige-kykladene",
    lat: 37.831,
    lng: 24.935,
    tagline: "Grønneste kykladen — fossefaller, museer og vandrerparadis",
    description: "Andros er den grønneste og nest største kykladeøya, med bekker, fossefaller og eikeskog. Museum of Contemporary Art (MOCA) med verk av Rodin og Picasso. Byen Andros balanserer på en smal halvøy med ruinene av en venetiansk borg ytterst.",
    highlights: [
      "MOCA — Museum of Contemporary Art med Rodin, Picasso og samtidskunst",
      "Fossefall og grønne daler — unikt for Kykladene",
      "Andros by på smal halvøy med venetiansk borgru ytterst"
    ],
    anchorage: {
      protection: "God fra S-SW i Batsi, moderat i Andros by",
      bottom: "Sand",
      depth: "3-10m",
      facilities: "Kai i Batsi og Gavrio, vann, drivstoff, butikker"
    },
    restaurants: [
      { name: "Stamatis", specialty: "Sjømat-taverna i Batsi rett på vannet", price: "€€" },
      { name: "Endochora", specialty: "Moderne gresk med lokale produkter i Andros by", price: "€€€" }
    ],
    mustDo: "Gå turstien fra Andros by til Achla-stranden via Pythara-fossefallet — Kykladenes beste dagsvandring",
    localSpecialty: "Fourtalia — omelett med lokal pølse og poteter, Andros' hverdagsrett",
    image: "Andros"
  },

  "tinos": {
    name: "Tinos",
    slug: "tinos",
    region: "nordlige-kykladene",
    lat: 37.548,
    lng: 25.163,
    tagline: "1000 duehus og marmorlandsbyer — Kykladenes best bevarte hemmelighet for matentusiaster",
    description: "Tinos har over 1000 ornamenterte duehus spredt over landskapet — arkitektoniske perler fra venetiansk tid. Marmorlandsbyene Pyrgos og Panormos holder skulpturtradisjonen levende. Matscenen er Kykladenes mest spennende med lokale oster, artisjokkretter og naturvin.",
    highlights: [
      "Over 1000 ornamenterte duehus — venetiansk arkitektonisk arv",
      "Pyrgos marmorskulptur-landsby med museum og aktive verksteder",
      "Mathovedstad med lokale oster, artisjokkretter og naturvin"
    ],
    anchorage: {
      protection: "Moderat fra N i Tinos by (utsatt for Meltemi), bedre i Panormos",
      bottom: "Sand og stein",
      depth: "3-8m",
      facilities: "Kai i Tinos by, vann, drivstoff, full proviantering"
    },
    restaurants: [
      { name: "Marathia", specialty: "Farm-to-table i Falatados, lokal ost og kjøtt", price: "€€" },
      { name: "Thalassaki", specialty: "Sjømat rett ved havnen i Tinos by", price: "€€" },
      { name: "Dino's", specialty: "Artisjokkretter og lokale oster i Pyrgos", price: "€€" }
    ],
    mustDo: "Besøk Pyrgos marmorlandsby — se skulptørene jobbe og besøk Chalepas-museet",
    localSpecialty: "Louza — lufttørket svinekjøtt krydret med allehånde, og lokal Tinos-ost (volaki, kopanisti)",
    image: "Tinos"
  },

  "delos": {
    name: "Delos",
    slug: "delos",
    region: "nordlige-kykladene",
    lat: 37.396,
    lng: 25.268,
    tagline: "Apollons fødested — UNESCO-verdensarv og hele Egeerhavet helligste øy",
    description: "Delos var antikkens helligste øy — Apollon og Artemis ble født her ifølge mytologien. Hele øya er et arkeologisk museum under åpen himmel: Løvenes terrasse, Dionyssos-mosaikkene og det antikke teateret. Ingen bor her — kun dagbesøk tillatt fra Mykonos.",
    highlights: [
      "Løvenes terrasse — ikonisk rekke med marmor-løver fra 600 f.Kr.",
      "Antikke mosaikker av Dionysos — usedvanlig godt bevart",
      "Hele øya er UNESCO-verdensarv — et friluft-museum"
    ],
    anchorage: {
      protection: "Begrenset — kun dagsanløp tillatt, forbud mot overnatting",
      bottom: "Stein og sand",
      depth: "2-5m ved landsettingskaien",
      facilities: "Ingen — ta med vann og mat fra Mykonos"
    },
    restaurants: [
      { name: "Museumskafeen", specialty: "Enkel kafé ved inngangen, kaffe og snacks", price: "€" }
    ],
    mustDo: "Gå opp til toppen av Mount Kynthos (113m) for 360-graders utsikt over Kykladene — det var her Apollon ble født",
    localSpecialty: "Ta med proviant fra Mykonos — det finnes ingen restauranter på øya",
    image: "Delos"
  },

  // ═══════════════════════════════════════════
  //  DODEKANESENE
  // ═══════════════════════════════════════════

  "patmos": {
    name: "Patmos",
    slug: "patmos",
    region: "dodekanesene",
    lat: 37.312,
    lng: 26.548,
    tagline: "Egeerhavet Jerusalem — der Johannes skrev Åpenbaringen",
    description: "Johannes-klosteret (1088) og Apokalypse-grotten der Johannes skrev Åpenbaringen er UNESCO-verdensarv. Patmos kalles 'Egeerhavet Jerusalem.' Skala-havnen er avslappet, Chora er middelaldermagi med klosteret som kronen. Overraskende bra mat og kunstscene.",
    highlights: [
      "Apokalypse-grotten — der Johannes skrev Åpenbaringen",
      "Johannes-klosteret (1088) — UNESCO-verdensarv med 900 års historie",
      "Chora — bilfri middelalderby kronetopp med klosteret"
    ],
    anchorage: {
      protection: "God fra N-NW i Skala-havnen",
      bottom: "Sand og mudder",
      depth: "4-12m",
      facilities: "Kai i Skala, vann, drivstoff, butikker og restauranter"
    },
    restaurants: [
      { name: "Benetos", specialty: "Fin dining i Sapsila-bukta, egen urte-hage, sjømat", price: "€€€" },
      { name: "Tzivaeri", specialty: "Tradisjonell gresk i Skala, grillet fisk og mezedes", price: "€€" }
    ],
    mustDo: "Besøk Apokalypse-grotten tidlig morgen — sprekken i fjellet der Guds stemme angivelig talte er fortsatt synlig",
    localSpecialty: "Pougia — søte buketter med mandler og sukker, Patmos' tradisjonelle gave",
    image: "Patmos"
  },

  "lipsi": {
    name: "Lipsi",
    slug: "lipsi",
    region: "dodekanesene",
    lat: 37.302,
    lng: 26.746,
    tagline: "Kalypsos øy — liten, stille og med Egeerhavet blåeste vann",
    description: "Lipsi var ifølge myten Kalypsos øy der Odyssevs ble holdt fanget i syv år. I virkeligheten er det en bitteliten øy med noen hundre innbyggere, utrolig blått vann og en enslig landsby rundt havnen. Vinproduksjon med muscat-druene pågår fortsatt i liten skala.",
    highlights: [
      "Mytologisk Kalypso-øy — der Odyssevs ble holdt fanget",
      "Lienous-stranden — dobbel bukt med Egeerhavet blåeste vann",
      "Muscat-vinproduksjon i liten skala fra lokale vingårder"
    ],
    anchorage: {
      protection: "God fra N-NW i hovedhavnen",
      bottom: "Sand",
      depth: "3-8m",
      facilities: "Kai, vann, minimarked"
    },
    restaurants: [
      { name: "Manolis Tastes", specialty: "Familiedrevet taverna på havnen, gresk husmannskost", price: "€" },
      { name: "The Rock", specialty: "Sjømat og cocktails med solnedgangsutsikt", price: "€€" }
    ],
    mustDo: "Gå til Lienous-stranden — en dobbel turkis bukt 20 minutter fra havnen, perfekt for å forstå hvorfor Odyssevs ble værende",
    localSpecialty: "Lokal muscat-vin — søt dessertvin produsert i svært begrenset mengde",
    image: "Lipsi"
  },

  "leros": {
    name: "Leros",
    slug: "leros",
    region: "dodekanesene",
    lat: 37.148,
    lng: 26.862,
    tagline: "Art deco fra italiensk tid og dype naturhavner — Egeerhavet uoppdagede perle",
    description: "Leros ble bygget opp av italienerne på 1930-tallet og har uventet art deco-arkitektur i Lakki — en av Middelhavets største naturhavner. Pandeli-festningen gir panoramautsikt. Agia Marina er en sjarmerende havn med tavernaer langs vannet.",
    highlights: [
      "Lakki — italiensk art deco-by fra 1930-tallet, en av Middelhavets største naturhavner",
      "Pandeli-festningen med 360-graders utsikt over øya",
      "Agia Marina — idyllisk havn med fargerike hus og tavernaer"
    ],
    anchorage: {
      protection: "Utmerket i Lakki fra alle vindretninger (enorm naturhavn)",
      bottom: "Mudder, utmerket holdekraft",
      depth: "5-15m",
      facilities: "Kai i Lakki og Agia Marina, vann, drivstoff"
    },
    restaurants: [
      { name: "Mylos", specialty: "Sjømat i gammel vindmølle ved Agia Marina", price: "€€" },
      { name: "Psaropoula", specialty: "Enkel fiskeaverna i Pandeli, grillet dagsfangst", price: "€€" }
    ],
    mustDo: "Gå gjennom Lakki og opplev 1930-tallets italienske art deco — kino, markedshall og boligkvartaler i fascistisk monumental stil",
    localSpecialty: "Pitaroudia — kikertkaker med mynte og løk, stekt i olivenolje",
    image: "Leros"
  },

  "kalymnos": {
    name: "Kalymnos",
    slug: "kalymnos",
    region: "dodekanesene",
    lat: 36.950,
    lng: 26.985,
    tagline: "Svampdykkerøya som ble verdens klatrehovedstad",
    description: "Kalymnos var svampdykkerhovedstaden i Egeerhavet i århundrer — museet forteller historien. I dag er øya verdenskjent for sportsklatring med tusenvis av ruter i den oransje kalksteinen. Havnen Pothia er livlig og fargerik med nyklassisistiske kapteinsvillaer.",
    highlights: [
      "Verdens beste sportsklatring — tusenvis av ruter i oransje kalkstein",
      "Svampdykkertradisjon med museum og aktive dykkere",
      "Pothia havn — fargerike nyklassisistiske kapteinsvillaer"
    ],
    anchorage: {
      protection: "God fra N-NW i Pothia, utmerket i Vathy (dyp fjordbukt)",
      bottom: "Mudder i Vathy, sand i Pothia",
      depth: "5-15m",
      facilities: "Kai i Pothia, vann, drivstoff, butikker"
    },
    restaurants: [
      { name: "Stukas", specialty: "Barasti-taverna ved stranden, grillet blekksprut og sjømat", price: "€€" },
      { name: "Pandelis", specialty: "Sjømat-institusjon i Pothia havn, dagfersk fangst", price: "€€" }
    ],
    mustDo: "Besøk den fjordlignende Vathy-bukta med seilbåten — omgitt av stupbratte klipper og olivenlunder",
    localSpecialty: "Mermizeli — lokal honningkake med sesamfrø, tradisjonelt servert til svampdykkerne",
    image: "Kalymnos"
  },

  "kos": {
    name: "Kos",
    slug: "kos",
    region: "dodekanesene",
    lat: 36.893,
    lng: 26.943,
    tagline: "Hippokrates' fødested — medisinens vugge med det eldste platantreet i Europa",
    description: "Hippokrates — medisinens far — ble født her. Asklepieion-helligdommen der han underviste ligger på en bakketopp med utsikt til Tyrkia. Hippokrates' platantre på torget er angivelig 2400 år gammelt. Johannitterborgen dominerer havnen.",
    highlights: [
      "Asklepieion — medisinens helligdom der Hippokrates underviste",
      "Hippokrates' platantre — angivelig 2400 år, Europas eldste",
      "Johannitterborgen (1300-tallet) i havnen, godt bevart"
    ],
    anchorage: {
      protection: "God fra N-NW i Kos marina",
      bottom: "Sand og mudder",
      depth: "3-8m",
      facilities: "Full service marina: vann, strøm, drivstoff, butikker"
    },
    restaurants: [
      { name: "Petrino", specialty: "Tradisjonell gresk i steinbygning i gamlebyen", price: "€€" },
      { name: "H2O", specialty: "Sjømat med utsikt mot Tyrkia, kreative fiskeretter", price: "€€€" }
    ],
    mustDo: "Besøk Asklepieion ved soloppgang — terrassene med utsikt over Tyrkia i morgenlyset, nesten alene",
    localSpecialty: "Koukouvagia-brød — «ugle-brød» formet som en fugl, bakt til påske men tilgjengelig hele sommeren",
    image: "Kos"
  },

  "nisyros": {
    name: "Nisyros",
    slug: "nisyros",
    region: "dodekanesene",
    lat: 36.586,
    lng: 27.167,
    tagline: "Levende vulkankrater du kan gå ned i — Dodekanesenes mest unike opplevelse",
    description: "Nisyros er en aktiv vulkansk øy der du bokstavelig talt kan gå ned i krateret. Stefanos-krateret er 300 meter bredt og lukter av svovel. Mandraki med den venetianske festningen og Panagia Spiliani-klosteret i grotten er uventet sjarmerende. Nesten ingen turister utover dagsbåter.",
    highlights: [
      "Stefanos vulkankrater — 300 meter bredt, du går ned i det",
      "Panagia Spiliani — kloster bygget inn i en naturlig grotte",
      "Mandraki — fargerik havneby med venetiansk festning"
    ],
    anchorage: {
      protection: "God fra N-NE i Mandraki, moderat i Pali",
      bottom: "Vulkansk sand og stein",
      depth: "3-8m",
      facilities: "Kai i Mandraki, vann, begrenset drivstoff"
    },
    restaurants: [
      { name: "Irini", specialty: "Tradisjonell mat i Mandraki med havutsikt, kaninstuing", price: "€€" },
      { name: "Aphrodite", specialty: "Sjømat i Pali fiskerhavn, enkel og fersk", price: "€€" }
    ],
    mustDo: "Gå ned i Stefanos-krateret — svovelgass bobler opp fra sprekker i den varme bakken under føttene",
    localSpecialty: "Soumada — mandeldrikk servert kald, Nisyros' erfriskende signatur",
    image: "Nisyros"
  },

  "symi": {
    name: "Symi",
    slug: "symi",
    region: "dodekanesene",
    lat: 36.623,
    lng: 27.838,
    tagline: "Pastell nyklassisistisk havn — Dodekanesenes vakreste førsteinntrykk",
    description: "Å seile inn i Symi havn er et av Egeerhavet mest spektakulære øyeblikk: hundrevis av pastellfargede nyklassisistiske hus klatrer opp fjellsidene. Øya var en gang rikere enn Rhodos takket være svampdykking. Panormitis-klosteret i sør tiltrekker pilgrimsreisende.",
    highlights: [
      "Gialos havn — hundrevis av pastellfargede nyklassisistiske hus i amfiteater",
      "Panormitis-klosteret — pilgrimssted med ikoniske fresker",
      "Symi-reker — bittesmå, søte reker som kun finnes her"
    ],
    anchorage: {
      protection: "God fra N-NW i Gialos havn",
      bottom: "Sand og mudder",
      depth: "4-12m",
      facilities: "Kai, vann, drivstoff, restauranter og butikker langs havnen"
    },
    restaurants: [
      { name: "Tholos", specialty: "Sjømat-taverna med Symi-reker som spesialitet", price: "€€€" },
      { name: "Manos Fish Restaurant", specialty: "Grillet fisk på kaien i Gialos, dagfersk", price: "€€€" },
      { name: "Giorgos & Maria", specialty: "Hjemmelaget gresk mat oppe i Chorio, fantastisk utsikt", price: "€€" }
    ],
    mustDo: "Seil inn i Gialos havn ved solnedgang — pastellhusene gløder gylne og det er et av Grekenlands mest ikoniske syn",
    localSpecialty: "Symi-reker — bittesmå, søte reker kun fra disse farvannene, grillet eller i pasta",
    image: "Symi"
  },

  "rhodes": {
    name: "Rhodes",
    slug: "rhodes",
    region: "dodekanesene",
    lat: 36.434,
    lng: 28.224,
    tagline: "Europas best bevarte middelalderby og Lindos' akropolis over Egeerhavet",
    description: "Rhodos' gammel by er Europas best bevarte middelalderby — UNESCO-verdensarv med 4 km bymur, Stormesterens palass og gater fra korsfarertiden. Lindos med sin akropolis 116 meter over havet er spektakulært. Kolossus av Rhodos stod en gang ved havnen.",
    highlights: [
      "Middelalderby (UNESCO) — Europas best bevarte, 4 km bymur intakt",
      "Stormesterens palass — Johannitterordenens hovedkvarter",
      "Lindos akropolis — dorisk tempel 116 meter over turkist hav"
    ],
    anchorage: {
      protection: "God i Mandraki havn fra N-NW, marina i Rhodos by",
      bottom: "Sand og mudder",
      depth: "3-10m",
      facilities: "Full service marina, vann, strøm, drivstoff, verksted"
    },
    restaurants: [
      { name: "Mavrikos", specialty: "Familiedrevet i Lindos siden 1933, kreativ gresk med lokal fisk", price: "€€€" },
      { name: "To Steno", specialty: "Skjult taverna i gamlebyen, grillet lam og lokale mezedes", price: "€€" },
      { name: "Tamam", specialty: "Moderne gresk i gamlebyen, god vinliste", price: "€€€" }
    ],
    mustDo: "Gå Riddergatens lengde i gamlebyen — middelalderens best bevarte gate i Europa, steinlagt med korsfarersymboler",
    localSpecialty: "Melekouni — energibar fra sesam og honning, tradisjonelt servert i bryllup",
    image: "Rhodes"
  },

  // ═══════════════════════════════════════════
  //  SPORADENE
  // ═══════════════════════════════════════════

  "skiathos": {
    name: "Skiathos",
    slug: "skiathos",
    region: "sporadene",
    lat: 39.163,
    lng: 23.490,
    tagline: "60+ strender og Lalaria — Egeerhavet mest strandrike øy",
    description: "Skiathos har over 60 strender på en øy du kan kjøre rundt på en time. Lalaria-stranden med hvite rullesteiner, naturlig steinbue og krystallklart vann er kun tilgjengelig med båt. Furuskog dekker mesteparten av øya ned til strandkanten.",
    highlights: [
      "Over 60 strender — fra lange sandstrender til skjulte bukter",
      "Lalaria-stranden — hvite rullesteiner, naturlig steinbue, kun båttilgang",
      "Furuskog helt ned til strandkanten — grønt møter turkist"
    ],
    anchorage: {
      protection: "God i Skiathos havn fra N-NE, flere beskyttede bukter rundt øya",
      bottom: "Sand og sjøgress",
      depth: "3-10m",
      facilities: "Kai i havnen, vann, drivstoff, full proviantering"
    },
    restaurants: [
      { name: "Marmita", specialty: "Kreativ gresk mat i gamlebyen, reservér i forveien", price: "€€€" },
      { name: "Alexandros", specialty: "Taverna med havutsikt i gamlebyen, tradisjonelle retter", price: "€€" }
    ],
    mustDo: "Seil til Lalaria-stranden om morgenen — hvite rullesteiner, turkist vann og en naturlig steinbue, helt magisk",
    localSpecialty: "Tyropita Skiathou — lokal ostepai med geiteost foldet i spiralform",
    image: "Skiathos"
  },

  "skopelos": {
    name: "Skopelos",
    slug: "skopelos",
    region: "sporadene",
    lat: 39.122,
    lng: 23.727,
    tagline: "Mamma Mia-øya — Agios Ioannis-kapellet på klippen og plommelunder",
    description: "Skopelos ble verdensberømt da 'Mamma Mia!' ble filmet her. Agios Ioannis Kastri-kapellet på en klippe over havet er ikonisk — bryllupsscenen ble filmet her. Øya er også kjent for plommer (prunes), mandler og furuskog som dekker 80% av overflaten.",
    highlights: [
      "Agios Ioannis Kastri — kapellet på klippen fra 'Mamma Mia!'",
      "Skopelos by — en av Grekenlands vakreste havnebyer med 120 kirker",
      "80% skogdekke — den grønneste øya i Egeerhavet"
    ],
    anchorage: {
      protection: "God fra N-NW i Skopelos havn, Panormos-bukta godt beskyttet",
      bottom: "Sand og mudder",
      depth: "4-12m",
      facilities: "Kai i Skopelos by, vann, drivstoff, butikker"
    },
    restaurants: [
      { name: "Adrina Taverna", specialty: "Sjømat med utsikt over Panormos-bukta", price: "€€€" },
      { name: "Agnanti", specialty: "Moderne gresk med panoramautsikt fra Glossa, prisvinnende", price: "€€€" },
      { name: "Finikas", specialty: "Tradisjonell taverna i havnen, grillet dagsfangst", price: "€€" }
    ],
    mustDo: "Gå de 110 trinnene opp til Agios Ioannis Kastri-kapellet — utsikten er like bra som i filmen",
    localSpecialty: "Skopelos plommepai — kotopita med lokale svisker og kanel, søt-salt magi",
    image: "Skopelos"
  },

  "alonissos": {
    name: "Alonissos",
    slug: "alonissos",
    region: "sporadene",
    lat: 39.150,
    lng: 23.865,
    tagline: "Nasjonal marinpark med munkeseler — Middelhavets mest beskyttede hav",
    description: "Alonissos er senteret i Grekenlands nasjonale marinpark — det største marine verneområdet i Europa. Middelhavets sjeldne munkesel lever her. Undervannssarkeologi avsløre antikke skipsvrak du kan dykke til. Gamlebyen Palio Alonissos ligger forlatt men delvis restaurert på åskammen.",
    highlights: [
      "Nasjonal marinpark — Europas største marine verneområde",
      "Middelhavs-munkesel (Monachus monachus) — verdens sjeldneste sel",
      "Antikke skipsvrak for dykking — undervannssarkeologisk museum"
    ],
    anchorage: {
      protection: "God fra N-NW i Patitiri, flere beskyttede bukter i parken",
      bottom: "Sand og sjøgress (posidonia)",
      depth: "4-15m",
      facilities: "Kai i Patitiri, vann, drivstoff, butikker"
    },
    restaurants: [
      { name: "Archipelagos", specialty: "Sjømat med panoramautsikt i Patitiri", price: "€€€" },
      { name: "Astrofengia", specialty: "Taverna i Palio Alonissos gamlebyen, lokal mat og solnedgang", price: "€€" }
    ],
    mustDo: "Ta en båttur inn i marinparken — sjansen for å se munkeseler er reell, og de ubebodde øyene er urørte",
    localSpecialty: "Villsamlet sjøfennikel (kritamo) marinert i olje og eddik — vokser på klippene",
    image: "Alonissos"
  },

  "skyros": {
    name: "Skyros",
    slug: "skyros",
    region: "sporadene",
    lat: 38.903,
    lng: 24.562,
    tagline: "Skyros-hester og bysantinsk festning — Sporadenes villeste og mest isolerte øy",
    description: "Skyros er delt i to: grønn og frodig i nord, steinete og gold i sør. Skyros-ponnier — en av verdens sjeldneste hesteraser — lever halvvilt her. Chora med den bysantinske festningen over havet er kompakt og autentisk. Rupert Brooke er gravlagt på øya.",
    highlights: [
      "Skyros-ponnier — en av verdens sjeldneste hesteraser, lever halvvilt",
      "Bysantinsk festning (Kastro) over Chora med panoramautsikt",
      "Todelt landskap — grønn nord og dramatisk steinete sør"
    ],
    anchorage: {
      protection: "God fra N-NW i Linaria-havnen",
      bottom: "Sand og mudder",
      depth: "3-10m",
      facilities: "Kai i Linaria, vann, drivstoff, minimarked"
    },
    restaurants: [
      { name: "Manos", specialty: "Familietaverna i Chora med lokal geiterett og skyriansk ost", price: "€€" },
      { name: "Istories tou Barba", specialty: "Kreativ gresk i Chora, god vinliste", price: "€€" }
    ],
    mustDo: "Besøk Skyros-ponniene på den søndre delen av øya — de halvville hestene lever mellom steinene",
    localSpecialty: "Skyros lobster pasta — hummer kokt med pasta i tomatsaus, øyas stolthet",
    image: "Skyros"
  },

  // ═══════════════════════════════════════════
  //  EVIA
  // ═══════════════════════════════════════════

  "evia": {
    name: "Evia",
    slug: "evia",
    region: "sporadene",
    lat: 38.600,
    lng: 23.865,
    tagline: "Grekenlands nest største øy — Chalkis-broen med den uforklarlige tidevannsstrømmen",
    description: "Evia er Grekenlands nest største øy, men føles ikke som en øy — den er forbundet med fastlandet via bro ved Chalkis. Tidevannsstrømmen i Euripos-sundet snur retning opptil 14 ganger daglig, noe Aristoteles angivelig studerte uten å finne svaret. Varierte landskap fra fjell til termiske kilder.",
    highlights: [
      "Euripos-strømmen — snur retning opptil 14 ganger om dagen, uforklart siden Aristoteles",
      "Grekenlands nest største øy med enormt variert terreng",
      "Loutra Aidipsos — termiske kilder brukt siden antikken"
    ],
    anchorage: {
      protection: "Varierer — mange beskyttede bukter langs vestkysten",
      bottom: "Sand, mudder, sjøgress avhengig av sted",
      depth: "3-15m",
      facilities: "Varierer — Chalkis og Karystos har best fasiliteter"
    },
    restaurants: [
      { name: "Nea Elvetia", specialty: "Sjømat i Karystos, utsikt mot Kafireas-kanalen", price: "€€" },
      { name: "Bourtzi", specialty: "Fiskeaverna i Chalkis ved Euripos-broen", price: "€€" }
    ],
    mustDo: "Se tidevannsstrømmen snu i Euripos-sundet fra Chalkis-broen — et naturfenomen som forbauset Aristoteles",
    localSpecialty: "Figs of Evia — PDO-beskyttet fikenvariant, tørket og servert med honning og valnøtter",
    image: "South Evia"
  }

};
