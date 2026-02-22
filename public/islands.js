/**
 * Greek Sailing Routes — Island & Destination Data
 * Bilingual (NO/EN). Keyed by slug.
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
    tagline: { no: "Athens' største marina — startpunktet for Saroniske- og Kykladeruter", en: "Athens' largest marina — starting point for Saronic and Cyclades routes" },
    description: { no: "Alimos (Kalamaki) er den største marinaen i Athen-området med over 1000 plasser. Herfra seiler du direkte ut i Saroniske gulfen eller setter kursen sørøst mot Kykladane. Trikken går rett inn til sentrum på 30 minutter.", en: "Alimos (Kalamaki) is the largest marina in the Athens area with over 1,000 berths. From here you sail directly into the Saronic Gulf or set course southeast toward the Cyclades. The tram runs straight to the city center in 30 minutes." },
    highlights: [
      { no: "Over 1000 båtplasser — Grekenlands største marina", en: "Over 1,000 berths — Greece's largest marina" },
      { no: "Direkte trikkeforbindelse til Athen sentrum", en: "Direct tram connection to Athens city center" },
      { no: "Fullservice: drivstoff, vann, strøm, verksted, proviantering", en: "Full service: fuel, water, electricity, workshop, provisioning" }
    ],
    anchorage: {
      protection: { no: "Full beskyttelse i marina", en: "Full protection in marina" },
      bottom: { no: "Betongkaier med fortøyning", en: "Concrete quays with mooring" },
      depth: { no: "2-5m i marina", en: "2-5m in marina" },
      facilities: { no: "Full service: vann, strøm, drivstoff, verksted, WiFi, dusj", en: "Full service: water, electricity, fuel, workshop, WiFi, showers" }
    },
    restaurants: [
      { name: "Thalassinos", specialty: { no: "Sjømatrestaurant rett ved marinaen, dagfersk fisk", en: "Seafood restaurant right by the marina, daily fresh fish" }, price: "€€€" },
      { name: "Psaropoula", specialty: { no: "Klassisk gresk fisketaverna, grillet blekksprut", en: "Classic Greek fish taverna, grilled octopus" }, price: "€€" }
    ],
    mustDo: { no: "Ta trikken til Akropolis og tilbake — perfekt siste kveld før avgang", en: "Take the tram to the Acropolis and back — perfect last evening before departure" },
    localSpecialty: { no: "Freddo espresso — gresk iskaffe som du finner på hvert hjørne", en: "Freddo espresso — Greek iced coffee found on every corner" },
    image: "Alimos Marina"
  },

  "lavrion": {
    name: "Lavrion",
    slug: "lavrion",
    region: "attika",
    lat: 37.713,
    lng: 24.054,
    tagline: { no: "Porten til Kykladane — 14 nautiske mil til Kea", en: "Gateway to the Cyclades — 14 nautical miles to Kea" },
    description: { no: "Lavrion er det naturlige utgangspunktet for Kykladeseiling. Kun 14 NM til Kea, korteste overfarten fra fastlandet. Antikkens sølvgruver finansierte Athens flåte og demokrati — og gruvene kan fortsatt besøkes.", en: "Lavrion is the natural starting point for Cyclades sailing. Only 14 NM to Kea, the shortest crossing from the mainland. The ancient silver mines financed Athens' fleet and democracy — and the mines can still be visited." },
    highlights: [
      { no: "Korteste overgang til Kykladane (14 NM til Kea)", en: "Shortest crossing to the Cyclades (14 NM to Kea)" },
      { no: "Antikke sølvgruver som finansierte Athens gylne alder", en: "Ancient silver mines that financed Athens' golden age" },
      { no: "Moderne marina med full service og god proviantering", en: "Modern marina with full service and good provisioning" }
    ],
    anchorage: {
      protection: { no: "God fra alle retninger i marina", en: "Good from all directions in marina" },
      bottom: { no: "Betongkaier med fortøyning", en: "Concrete quays with mooring" },
      depth: { no: "3-6m", en: "3-6m" },
      facilities: { no: "Full service marina, vann, strøm, drivstoff, minimarket", en: "Full service marina, water, electricity, fuel, minimarket" }
    },
    restaurants: [
      { name: "To Kyma", specialty: { no: "Sjømat og mezedes med havneutsikt", en: "Seafood and mezedes with harbor views" }, price: "€€" },
      { name: "Coralli", specialty: { no: "Fersk fisk og ouzo ved vannkanten", en: "Fresh fish and ouzo at the waterfront" }, price: "€€" }
    ],
    mustDo: { no: "Besøk de antikke sølvgruvene i Thorikos — Europas eldste kjente teater ligger like ved", en: "Visit the ancient silver mines at Thorikos — Europe's oldest known theater is right nearby" },
    localSpecialty: { no: "Lokal honning fra Attika-regionen, parfymert med timian", en: "Local honey from the Attica region, perfumed with thyme" },
    image: "Lavrion"
  },

  "cape-sounion": {
    name: "Cape Sounion",
    slug: "cape-sounion",
    region: "attika",
    lat: 37.650,
    lng: 24.024,
    tagline: { no: "Poseidons tempel på klippen — Athens mest dramatiske solnedgang", en: "Poseidon's temple on the cliff — Athens' most dramatic sunset" },
    description: { no: "Poseidons tempel troner 60 meter over havet på Attikas sørligste punkt. Lord Byron risset inn navnet sitt i en søyle i 1810. Ankre opp i bukta under og svøm mens tempelet lyser opp i solnedgangen.", en: "Poseidon's temple towers 60 meters above the sea at Attica's southernmost point. Lord Byron carved his name into a column in 1810. Anchor in the bay below and swim while the temple glows in the sunset." },
    highlights: [
      { no: "Poseidons tempel fra 444 f.Kr. — 15 doriske søyler mot himmelen", en: "Poseidon's temple from 444 BC — 15 Doric columns against the sky" },
      { no: "Lord Byrons signatur risset inn i marmorsøylen", en: "Lord Byron's signature carved into the marble column" },
      { no: "Solnedgangen herfra regnes som Grekenlands vakreste", en: "The sunset from here is considered the most beautiful in Greece" }
    ],
    anchorage: {
      protection: { no: "Moderat fra N-NW i bukta vest for klippen", en: "Moderate from N-NW in the bay west of the cliff" },
      bottom: { no: "Sand", en: "Sand" },
      depth: { no: "4-8m", en: "4-8m" },
      facilities: { no: "Ingen — ta med alt du trenger", en: "None — bring everything you need" }
    },
    restaurants: [
      { name: "Akrogiali", specialty: { no: "Taverna i bukta under tempelet, grillet fisk", en: "Taverna in the bay below the temple, grilled fish" }, price: "€€" },
      { name: "Ilion", specialty: { no: "Gresk kjøkken med utsikt mot tempelet", en: "Greek cuisine with views of the temple" }, price: "€€" }
    ],
    mustDo: { no: "Ankre i bukta og svøm i solnedgangen mens Poseidons tempel lyser gyllen over deg", en: "Anchor in the bay and swim at sunset while Poseidon's temple glows golden above you" },
    localSpecialty: { no: "Attisk honning med valnøtter — serveres på tavernaen i bukta", en: "Attic honey with walnuts — served at the taverna in the bay" },
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
    tagline: { no: "Europas pistasjhovedstad — med et tempel som rivaliserer Parthenon", en: "Europe's pistachio capital — with a temple that rivals the Parthenon" },
    description: { no: "Aegina produserer Europas beste pistasjenøtter, beskyttet med PDO-merking. Aphaia-tempelet fra 500 f.Kr. er like godt bevart som Parthenon, men uten folkemassene. Spøkelsesbyen Paleochora har 38 intakte bysantinske kirker mellom forlatte hus.", en: "Aegina produces Europe's finest pistachios, protected with PDO certification. The Temple of Aphaia from 500 BC is as well preserved as the Parthenon, but without the crowds. The ghost town of Paleochora has 38 intact Byzantine churches among abandoned houses." },
    highlights: [
      { no: "Europas pistasjhovedstad — PDO-beskyttet med årlig festival", en: "Europe's pistachio capital — PDO-protected with an annual festival" },
      { no: "Aphaia-tempelet (500 f.Kr.) — like komplett som Parthenon, nesten ingen turister", en: "Temple of Aphaia (500 BC) — as complete as the Parthenon, almost no tourists" },
      { no: "Paleochora spøkelsesby med 38 bysantinske kirker", en: "Paleochora ghost town with 38 Byzantine churches" }
    ],
    anchorage: {
      protection: { no: "God fra N-NE i hovedhavnen", en: "Good from N-NE in the main harbor" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: { no: "3-8m", en: "3-8m" },
      facilities: { no: "Kaibryggeplass, vann, drivstoff, proviantering i byen", en: "Quay berth, water, fuel, provisioning in town" }
    },
    restaurants: [
      { name: "Skotadis", specialty: { no: "Fiskemezedes og pistasjretter, familieeiet siden 1950-tallet", en: "Fish mezedes and pistachio dishes, family-owned since the 1950s" }, price: "€€" },
      { name: "Kappos Etsi", specialty: { no: "Moderne gresk med pistasjpesto og lokal fisk", en: "Modern Greek with pistachio pesto and local fish" }, price: "€€" },
      { name: "To Steki", specialty: { no: "Grillet blekksprut og billige karafler med retsina", en: "Grilled octopus and cheap carafes of retsina" }, price: "€" }
    ],
    mustDo: { no: "Kjøp en pose ristede pistasjenøtter rett fra produsenten på havna og besøk Aphaia-tempelet i solnedgangen", en: "Buy a bag of roasted pistachios straight from the producer at the harbor and visit the Temple of Aphaia at sunset" },
    localSpecialty: { no: "Pistasjis — laget med ekte Aegina-pistasj, grønnere og smaksrikere enn noe du har prøvd", en: "Pistachio ice cream — made with real Aegina pistachios, greener and more flavorful than anything you've tried" },
    image: "Aegina"
  },

  "poros": {
    name: "Poros",
    slug: "poros",
    region: "saroniske",
    lat: 37.502,
    lng: 23.456,
    tagline: { no: "200 meter fra fastlandet — sitronduftende øy i et smalt sund", en: "200 meters from the mainland — lemon-scented island in a narrow strait" },
    description: { no: "Poros ligger bare 200 meter fra Peloponnes, adskilt av et smalt sund der strømmen kan kjennes. Klokketårnet fra 1927 er landemerket. Like bak byen skjuler Lemonodasos seg — 30 000 sitrontrær som parfymerer hele øya om våren.", en: "Poros lies just 200 meters from the Peloponnese, separated by a narrow strait where the current can be felt. The 1927 clock tower is the landmark. Just behind the town hides Lemonodasos — 30,000 lemon trees that perfume the entire island in spring." },
    highlights: [
      { no: "200 meter bredt sund til Peloponnes — seil gjennom som en fjord", en: "200-meter-wide strait to the Peloponnese — sail through it like a fjord" },
      { no: "Lemonodasos — 30 000 sitrontrær i en duftende dal", en: "Lemonodasos — 30,000 lemon trees in a fragrant valley" },
      { no: "Klokketårnet fra 1927 med panoramautsikt over sundet", en: "The 1927 clock tower with panoramic views over the strait" }
    ],
    anchorage: {
      protection: { no: "Utmerket fra alle retninger i sundet", en: "Excellent from all directions in the strait" },
      bottom: { no: "Mudder og sand", en: "Mud and sand" },
      depth: { no: "4-10m", en: "4-10m" },
      facilities: { no: "Kaibryggeplass langs hovedgata, vann, drivstoff, butikker", en: "Quay berth along the main street, water, fuel, shops" }
    },
    restaurants: [
      { name: "Oasis", specialty: { no: "Gresk taverna med utsikt over sundet, god moussaka", en: "Greek taverna with views over the strait, great moussaka" }, price: "€€" },
      { name: "Karavolos", specialty: { no: "Snegler (karavolos) og grillet fisk rett ved vannet", en: "Snails (karavolos) and grilled fish right by the water" }, price: "€€" }
    ],
    mustDo: { no: "Gå opp til klokketårnet ved solnedgang og se utover sundet mens Peloponnes gløder orange", en: "Walk up to the clock tower at sunset and look out over the strait as the Peloponnese glows orange" },
    localSpecialty: { no: "Sitronlikør laget av frukt fra Lemonodasos-lunden", en: "Lemon liqueur made from fruit of the Lemonodasos grove" },
    image: "Poros"
  },

  "hydra": {
    name: "Hydra",
    slug: "hydra",
    region: "saroniske",
    lat: 37.349,
    lng: 23.462,
    tagline: { no: "Bilfri kunstnerøy — kun esler og vannbåter", en: "Car-free artists' island — only donkeys and water taxis" },
    description: { no: "Helt bilfritt — ingen kjøretøy av noe slag. Kun esler, vannbåter og føtter. Leonard Cohen bodde her i syv år og skrev noen av sine mest kjente sanger. Den amfiteatralske havnen med kapteinsvillaer fra 1700-tallet er uendret.", en: "Completely car-free — no vehicles of any kind. Only donkeys, water taxis, and feet. Leonard Cohen lived here for seven years and wrote some of his most famous songs. The amphitheater-shaped harbor with 18th-century captains' mansions remains unchanged." },
    highlights: [
      { no: "Bilfri øy — kun esler og vannbåter for transport", en: "Car-free island — only donkeys and water taxis for transport" },
      { no: "Leonard Cohens kunstnerkoloni — han bodde her 1960-67", en: "Leonard Cohen's artists' colony — he lived here 1960-67" },
      { no: "Amfiteatralsk havn med kapteinsvillaer fra 1700-tallet", en: "Amphitheater-shaped harbor with 18th-century captains' mansions" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW", en: "Good from N-NW" },
      bottom: { no: "Sand og stein", en: "Sand and rock" },
      depth: { no: "3-8m", en: "3-8m" },
      facilities: { no: "Kaibryggeplass, vann, drivstoff", en: "Quay berth, water, fuel" }
    },
    restaurants: [
      { name: "Xeri Elia (Douskos)", specialty: { no: "Grillmat, 200 år familiedrift, Leonard Cohens stammested", en: "Grilled food, 200 years family-run, Leonard Cohen's regular spot" }, price: "€€" },
      { name: "Techne", specialty: { no: "Moderne gresk, kalamari og lam med utsikt", en: "Modern Greek, calamari and lamb with views" }, price: "€€€" },
      { name: "Omilos", specialty: { no: "Cocktails og sjømat ved bassenget på havnen", en: "Cocktails and seafood by the pool at the harbor" }, price: "€€€" }
    ],
    mustDo: { no: "Gå kystveien vestover til Kaminia-bukta — en stille fiskerhavn med to tavernaer rett på vannet", en: "Walk the coastal path west to Kaminia bay — a quiet fishing harbor with two tavernas right on the water" },
    localSpecialty: { no: "Amygdalota — mandelkaker med rosevann, bakt på øya", en: "Amygdalota — almond cakes with rosewater, baked on the island" },
    image: "Hydra"
  },

  "spetses": {
    name: "Spetses",
    slug: "spetses",
    region: "saroniske",
    lat: 37.257,
    lng: 23.150,
    tagline: { no: "Hestevogner og furuskog — John Fowles' magiske øy", en: "Horse carriages and pine forests — John Fowles' magical island" },
    description: { no: "Nesten bilfri — hestevogner og mopeder er transportmiddelet. Bouboulina, gresk frigjøringsadmiral, bodde her. John Fowles underviste på Anargyrios-skolen og skrev 'The Magus' inspirert av øya. Furuskoger helt ned til sjøen.", en: "Nearly car-free — horse carriages and mopeds are the means of transport. Bouboulina, Greek liberation admiral, lived here. John Fowles taught at the Anargyrios school and wrote 'The Magus' inspired by the island. Pine forests stretch all the way down to the sea." },
    highlights: [
      { no: "Hestevogner i stedet for biler — bilfritt sentrum", en: "Horse carriages instead of cars — car-free center" },
      { no: "Bouboulina-museet — den kvinnelige admiralens hjem fra frigjøringskrigen", en: "Bouboulina Museum — the female admiral's home from the War of Independence" },
      { no: "John Fowles skrev 'The Magus' her — Anargyrios-skolen er kulissen", en: "John Fowles wrote 'The Magus' here — the Anargyrios school is the setting" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Baltiza (gammel havn)", en: "Good from N-NW in Baltiza (old harbor)" },
      bottom: { no: "Sand og sjøgress", en: "Sand and seagrass" },
      depth: { no: "3-6m", en: "3-6m" },
      facilities: { no: "Kai, vann, drivstoff, butikker i gamlebyen", en: "Quay, water, fuel, shops in the old town" }
    },
    restaurants: [
      { name: "On the Verandah", specialty: { no: "Sjømat med havutsikt, daglig fangst", en: "Seafood with sea views, daily catch" }, price: "€€€" },
      { name: "Tarsanas", specialty: { no: "Tradisjonell gresk i gammelt skipsverft, grillet blekksprut", en: "Traditional Greek in an old shipyard, grilled octopus" }, price: "€€" }
    ],
    mustDo: { no: "Lei en hestevogn rundt øya — 25 km kystlinje med furuskoger som stuper ned i krystallblått vann", en: "Rent a horse carriage around the island — 25 km of coastline with pine forests plunging into crystal blue water" },
    localSpecialty: { no: "Psarosoupa — tyktflytende fiskesuppe med sitron og egg, en lokal spesialitet", en: "Psarosoupa — thick fish soup with lemon and egg, a local specialty" },
    image: "Spetses"
  },

  "porto-heli": {
    name: "Porto Heli",
    slug: "porto-heli",
    region: "saroniske",
    lat: 37.322,
    lng: 23.148,
    tagline: { no: "Den greske rivieraen — beskyttet bukt med Peloponnesos som bakteppe", en: "The Greek Riviera — sheltered bay with the Peloponnese as backdrop" },
    description: { no: "Porto Heli er en dyp, naturlig beskyttet bukt på Peloponnes-kysten, rett overfor Spetses. Populært blant gresk overklasse og internasjonale seilere. Det nærliggende antikke Halieis under vann er en av Middelhavsområdets best bevarte sunkne byer.", en: "Porto Heli is a deep, naturally sheltered bay on the Peloponnese coast, directly opposite Spetses. Popular with the Greek elite and international sailors. The nearby ancient Halieis underwater is one of the Mediterranean's best-preserved sunken cities." },
    highlights: [
      { no: "En av Saroniske gulfens best beskyttede naturhavner", en: "One of the Saronic Gulf's best-protected natural harbors" },
      { no: "Undervannsruinene av antikke Halieis — synlig med snorkel", en: "The underwater ruins of ancient Halieis — visible with a snorkel" },
      { no: "Gresk riviera-stemning med luksusresorts og tradisjonelle tavernaer side om side", en: "Greek Riviera atmosphere with luxury resorts and traditional tavernas side by side" }
    ],
    anchorage: {
      protection: { no: "Utmerket fra alle retninger", en: "Excellent from all directions" },
      bottom: { no: "Mudder og sand", en: "Mud and sand" },
      depth: { no: "3-12m", en: "3-12m" },
      facilities: { no: "Marina, vann, strøm, drivstoff, butikker", en: "Marina, water, electricity, fuel, shops" }
    },
    restaurants: [
      { name: "Paleo", specialty: { no: "Moderne gresk med lokal fisk og Peloponnes-vin", en: "Modern Greek with local fish and Peloponnese wine" }, price: "€€€" },
      { name: "Sto Molo", specialty: { no: "Taverna på kaien, grillet fisk og ouzo", en: "Taverna on the quay, grilled fish and ouzo" }, price: "€€" }
    ],
    mustDo: { no: "Snorkle over de sunkne ruinene av Halieis — murene fra den antikke byen ligger på 1-3 meters dyp", en: "Snorkel over the sunken ruins of Halieis — the walls of the ancient city lie at 1-3 meters depth" },
    localSpecialty: { no: "Argolida-appelsiner — de beste i Hellas, brukt i lokale desserter og juice", en: "Argolida oranges — the best in Greece, used in local desserts and juice" },
    image: "Porto Heli"
  },

  // ═══════════════════════════════════════════
  //  PELOPONNESE
  // ═══════════════════════════════════════════

  "monemvasia": {
    name: "Monemvasia",
    slug: "monemvasia",
    region: "peloponnese",
    lat: 36.687,
    lng: 23.057,
    tagline: { no: "Bysantinsk festning på en klippe — én inngang, tusen års historie", en: "Byzantine fortress on a cliff — one entrance, a thousand years of history" },
    description: { no: "En massiv klippe forbundet til fastlandet med en enkelt bro. Middelalderbyens eneste inngang er gjennom en smal port i murveggen — derav navnet 'moni emvasis' (eneste inngang). Bilfritt innenfor murene. Malvasia-vinen herfra var middelalderens mest ettertraktede.", en: "A massive cliff connected to the mainland by a single bridge. The medieval town's only entrance is through a narrow gate in the wall — hence the name 'moni emvasis' (single entrance). Car-free within the walls. The Malvasia wine from here was the most sought-after of the Middle Ages." },
    highlights: [
      { no: "Bysantinsk festningsby med kun én inngang gjennom murveggen", en: "Byzantine fortress town with only one entrance through the wall" },
      { no: "Bilfri middelalderby — steinlagde gater mellom restaurerte hus", en: "Car-free medieval town — cobblestone streets between restored houses" },
      { no: "Malvasia-vin — middelalderens mest berømte vin, fortsatt produsert lokalt", en: "Malvasia wine — the most famous wine of the Middle Ages, still produced locally" }
    ],
    anchorage: {
      protection: { no: "Moderat fra S-SW i bukta nord for klippen", en: "Moderate from S-SW in the bay north of the cliff" },
      bottom: { no: "Sand og stein", en: "Sand and rock" },
      depth: { no: "4-10m", en: "4-10m" },
      facilities: { no: "Begrenset — kai tilgjengelig, proviantering i byen", en: "Limited — quay available, provisioning in town" }
    },
    restaurants: [
      { name: "Matoula", specialty: { no: "Bysantinsk-inspirerte retter i middelalderhvelv, lam med honning", en: "Byzantine-inspired dishes in medieval vaults, lamb with honey" }, price: "€€€" },
      { name: "To Kanoni", specialty: { no: "Sjømat på festningsmuren med utsikt over havet", en: "Seafood on the fortress wall overlooking the sea" }, price: "€€" }
    ],
    mustDo: { no: "Gå opp til den øvre festningen ved solnedgang — utsikten over Lakoniske gulfen er overveldende", en: "Walk up to the upper fortress at sunset — the view over the Laconic Gulf is overwhelming" },
    localSpecialty: { no: "Malvasia-vin — søt dessertvin med 800 års ubrutt tradisjon", en: "Malvasia wine — sweet dessert wine with 800 years of unbroken tradition" },
    image: "Monemvasia"
  },

  "elafonisos": {
    name: "Elafonisos",
    slug: "elafonisos",
    region: "peloponnese",
    lat: 36.484,
    lng: 22.970,
    tagline: { no: "Rosa sand og karibisk vann — Grekenlands best bevarte hemmelighet", en: "Pink sand and Caribbean waters — Greece's best-kept secret" },
    description: { no: "Simos-stranden ser ut som den hører hjemme i Karibia: rosa-hvit sand, turkist vann, sanddyner med einer. Øya har knapt 1000 innbyggere og nesten ingen turisme utenom juli-august. Perfekt ankringsplass for en natt under stjernene.", en: "Simos beach looks like it belongs in the Caribbean: pink-white sand, turquoise water, sand dunes with juniper. The island has barely 1,000 inhabitants and almost no tourism outside July-August. Perfect anchorage for a night under the stars." },
    highlights: [
      { no: "Simos-stranden — rosa sand og karibisk turkist vann", en: "Simos beach — pink sand and Caribbean turquoise water" },
      { no: "Sanddyner dekket med einer mellom to buktene", en: "Sand dunes covered with juniper between the two bays" },
      { no: "Nesten uberørt — knapt turisme utenfor høysesong", en: "Nearly untouched — barely any tourism outside peak season" }
    ],
    anchorage: {
      protection: { no: "God fra N-NE i Simos-bukta", en: "Good from N-NE in Simos bay" },
      bottom: { no: "Sand", en: "Sand" },
      depth: { no: "3-6m", en: "3-6m" },
      facilities: { no: "Minimalt — liten havn på nordsiden, proviantering begrenset", en: "Minimal — small harbor on the north side, provisioning limited" }
    },
    restaurants: [
      { name: "Nautilus", specialty: { no: "Fiskeaverna på havnen, dagfersk fangst", en: "Fish taverna at the harbor, daily fresh catch" }, price: "€€" },
      { name: "Pavlos", specialty: { no: "Grillet blekksprut og sjømat-mezedes", en: "Grilled octopus and seafood mezedes" }, price: "€" }
    ],
    mustDo: { no: "Ankre mellom de to Simos-buktene og gå over sanddynene ved solnedgang", en: "Anchor between the two Simos bays and walk over the sand dunes at sunset" },
    localSpecialty: { no: "Villsamlet kapris fra øya — spises som mezedes med ouzo", en: "Wild-foraged capers from the island — eaten as mezedes with ouzo" },
    image: "Elafonisos"
  },

  "kythira": {
    name: "Kythira",
    slug: "kythira",
    region: "saroniske",
    lat: 36.225,
    lng: 23.017,
    tagline: { no: "Afrodites fødested — der Ionerhavet møter Egeerhavet", en: "Aphrodite's birthplace — where the Ionian Sea meets the Aegean" },
    description: { no: "Mytologiens Afrodite ble født av havskummet her. Kythira henger mellom tre hav og har vært venetiansk, britisk og gresk. Chora med den venetianske festningen troner over stupbratte klipper. Mindre turistifisert enn nesten alle andre greske øyer.", en: "Mythological Aphrodite was born from the sea foam here. Kythira hangs between three seas and has been Venetian, British, and Greek. Chora with its Venetian fortress towers above sheer cliffs. Less touristified than almost any other Greek island." },
    highlights: [
      { no: "Afrodites mytologiske fødested — Aphrodite-helligdommen kan besøkes", en: "Aphrodite's mythological birthplace — the Aphrodite sanctuary can be visited" },
      { no: "Venetiansk festning i Chora med panoramautsikt", en: "Venetian fortress in Chora with panoramic views" },
      { no: "Kythira-honning — regnes som Grekenlands beste timian-honning", en: "Kythira honey — considered the best thyme honey in Greece" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Kapsali (dobbelbukt sør for Chora)", en: "Good from N-NW in Kapsali (double bay south of Chora)" },
      bottom: { no: "Sand", en: "Sand" },
      depth: { no: "4-8m", en: "4-8m" },
      facilities: { no: "Kai i Kapsali, vann, begrenset drivstoff", en: "Quay in Kapsali, water, limited fuel" }
    },
    restaurants: [
      { name: "Hydragogion", specialty: { no: "Tradisjonell mat i gammel vannmølle, lam fra øya", en: "Traditional food in an old watermill, lamb from the island" }, price: "€€" },
      { name: "Filio", specialty: { no: "Hjemmelaget pasta og lokal ost i Chora", en: "Homemade pasta and local cheese in Chora" }, price: "€€" }
    ],
    mustDo: { no: "Besøk Mylopotamos-fossefallet og den skjulte grotten bak vannet — helt magisk", en: "Visit the Mylopotamos waterfall and the hidden cave behind the water — truly magical" },
    localSpecialty: { no: "Kythira timian-honning — mange kaller den Grekenlands aller beste", en: "Kythira thyme honey — many call it the very best in Greece" },
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
    tagline: { no: "Nærmeste kykladen — 14 NM fra Lavrion, med en 2600 år gammel steinløve", en: "The nearest Cycladic island — 14 NM from Lavrion, with a 2,600-year-old stone lion" },
    description: { no: "Bare 14 NM fra Lavrion — den nærmeste kykladeøya til fastlandet og den perfekte første stoppen. Kea-løven fra 600 f.Kr. er hugget rett ut av fjellet, 6 meter lang. Eikeskog i stedet for typisk kyklade-ørken. Mest populær blant atenere som helgeøy.", en: "Just 14 NM from Lavrion — the closest Cycladic island to the mainland and the perfect first stop. The Lion of Kea from 600 BC is carved directly into the rock, 6 metres long. Oak forests instead of typical Cycladic barrenness. Most popular among Athenians as a weekend island." },
    highlights: [
      { no: "Kea-løven (600 f.Kr.) — 6 meter lang, hugget direkte i fjellet", en: "The Lion of Kea (600 BC) — 6 metres long, carved directly into the rock" },
      { no: "Kun 14 NM fra Lavrion — korteste overgang fra fastlandet", en: "Only 14 NM from Lavrion — the shortest crossing from the mainland" },
      { no: "Eikeskog og grønne daler — atypisk for Kykladane", en: "Oak forests and green valleys — atypical for the Cyclades" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Korissia-bukta", en: "Good from N-NW in Korissia bay" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "3-10m",
      facilities: { no: "Kai, vann, drivstoff, butikker i Korissia", en: "Quay, water, fuel, shops in Korissia" }
    },
    restaurants: [
      { name: "Rolando's", specialty: { no: "Moderne gresk med lokal ost og honning, terrasse i Ioulida", en: "Modern Greek with local cheese and honey, terrace in Ioulida" }, price: "€€€" },
      { name: "Magazes", specialty: { no: "Taverna ved stranden i Korissia, fisk og mezedes", en: "Beachside taverna in Korissia, fish and mezedes" }, price: "€€" }
    ],
    mustDo: { no: "Gå den antikke stien fra Korissia til Ioulida (1 time) og besøk Kea-løven — 2600 år gammel og fortsatt majestetisk", en: "Walk the ancient path from Korissia to Ioulida (1 hour) and visit the Lion of Kea — 2,600 years old and still majestic" },
    localSpecialty: { no: "Paspalas — tradisjonsrik grise-charcuterie som kun lages på Kea", en: "Paspalas — traditional pork charcuterie made only on Kea" },
    image: "Kea"
  },

  "kythnos": {
    name: "Kythnos",
    slug: "kythnos",
    region: "kykladene",
    lat: 37.388,
    lng: 24.430,
    tagline: { no: "Varme kilder i havet og en strand som strekker seg til begge sider", en: "Hot springs in the sea and a beach stretching to both sides" },
    description: { no: "Loutra har varme kilder som renner rett ut i havet — bad i naturlig oppvarmet sjøvann. Kolona-stranden er en smal sandbanke som forbinder øya med en holme, med strand på begge sider. Uturistifisert og tidløs.", en: "Loutra has hot springs flowing directly into the sea — bathe in naturally heated seawater. Kolona beach is a narrow sandbar connecting the island to an islet, with beach on both sides. Untouristy and timeless." },
    highlights: [
      { no: "Loutra — varme kilder som renner direkte ut i havet", en: "Loutra — hot springs flowing directly into the sea" },
      { no: "Kolona dobbeltsidig sandbanke-strand mellom øya og en holme", en: "Kolona double-sided sandbar beach between the island and an islet" },
      { no: "En av de minst turistifiserte kykladeøyene", en: "One of the least touristy Cycladic islands" }
    ],
    anchorage: {
      protection: { no: "God fra N i Loutra-bukta, god fra S i Merihas", en: "Good from N in Loutra bay, good from S in Merihas" },
      bottom: { no: "Sand", en: "Sand" },
      depth: "3-8m",
      facilities: { no: "Kai i Merihas, vann, drivstoff, minimarked", en: "Quay in Merihas, water, fuel, minimarket" }
    },
    restaurants: [
      { name: "To Kandouni", specialty: { no: "Familiedrevet taverna i Chora, hjemmelaget mat", en: "Family-run taverna in Chora, homemade food" }, price: "€" },
      { name: "Ostria", specialty: { no: "Sjømat og grillet kjøtt ved Merihas-havnen", en: "Seafood and grilled meat at Merihas harbour" }, price: "€€" }
    ],
    mustDo: { no: "Bad i de varme kildene i Loutra ved solnedgang — naturlig oppvarmet sjøvann i steinbasseng", en: "Bathe in the hot springs of Loutra at sunset — naturally heated seawater in stone pools" },
    localSpecialty: { no: "Kythniansk sfela — lokalt produsert myk hvitost, spist fersk med honning", en: "Kythnian sfela — locally produced soft white cheese, eaten fresh with honey" },
    image: "Kythnos"
  },

  "kythnos-loutra": {
    name: "Kythnos Loutra",
    slug: "kythnos-loutra",
    region: "kykladene",
    lat: 37.447,
    lng: 24.420,
    tagline: { no: "Loutra-bukta med termiske kilder rett ved kaia", en: "Loutra bay with thermal springs right by the quay" },
    description: { no: "Loutra er den klassiske yacht-stoppen nord på Kythnos. Den lille bukta gir kort vei til varme kilder ved sjøen og tavernaer langs strandpromenaden.", en: "Loutra is the classic yacht stop on northern Kythnos. The small bay gives easy access to thermal springs by the sea and tavernas along the waterfront." },
    highlights: [
      { no: "Termiske kilder ved sjøen i gangavstand fra havna", en: "Thermal springs by the sea within walking distance from the harbor" },
      { no: "Rolig bukt som fungerer godt som første stopp etter fastlandet", en: "Calm bay that works well as a first stop after the mainland" },
      { no: "Kort avstand til Chora med taxi/buss", en: "Short ride to Chora by taxi/bus" }
    ],
    anchorage: {
      protection: { no: "Best i nordlige vinder inne i Loutra-bukta", en: "Best in northerly winds inside Loutra bay" },
      bottom: { no: "Sand med gode holdeforhold", en: "Sand with generally good holding" },
      depth: "3-8m",
      facilities: { no: "Kai, vann og tavernaer i sesong", en: "Quay, water, and tavernas in season" }
    },
    restaurants: [
      { name: "Sailor's", specialty: { no: "Enkle mezedes og fisk ved kaifronten", en: "Simple mezedes and fish on the quay front" }, price: "€€" },
      { name: "Abyss", specialty: { no: "Uformell middag med utsikt over bukta", en: "Casual dinner overlooking the bay" }, price: "€€" }
    ],
    mustDo: { no: "Ta et kveldsbad i de varme kildene ved Loutra", en: "Take an evening dip in Loutra's thermal springs" },
    localSpecialty: { no: "Lokal ost og timianhonning fra Kythnos", en: "Local cheese and thyme honey from Kythnos" },
    image: "Kythnos"
  },

  "serifos": {
    name: "Serifos",
    slug: "serifos",
    region: "kykladene",
    lat: 37.159,
    lng: 24.510,
    tagline: { no: "Dramatisk hilltop-chora og forlatte gruver — Kykladanes ville hjerte", en: "Dramatic hilltop chora and abandoned mines — the wild heart of the Cyclades" },
    description: { no: "Chora klamrer seg til toppen av en bratt ås som et ørnebol — en av Kykladanes mest spektakulære. Øya har gruvehistorie tilbake til bronsealderen. Livadi-bukta er en naturlig havn med god ankring og tavernaer langs vannet.", en: "Chora clings to the top of a steep hill like an eagle's nest — one of the most spectacular in the Cyclades. The island has a mining history stretching back to the Bronze Age. Livadi bay is a natural harbour with good anchorage and tavernas along the waterfront." },
    highlights: [
      { no: "Chora på klippen — en av Kykladanes mest fotogene landsbyer", en: "Chora on the cliff — one of the most photogenic villages in the Cyclades" },
      { no: "Forlatte jerngruver fra antikken til 1900-tallet — industriell arkeologi", en: "Abandoned iron mines from antiquity to the 1900s — industrial archaeology" },
      { no: "Livadi-bukta — romslig, god ankring og avslappet stemning", en: "Livadi bay — spacious, good anchorage and a laid-back atmosphere" }
    ],
    anchorage: {
      protection: { no: "God fra N-NE i Livadi-bukta", en: "Good from N-NE in Livadi bay" },
      bottom: { no: "Sand, god holdekraft", en: "Sand, good holding" },
      depth: "4-10m",
      facilities: { no: "Kai, vann, drivstoff, butikker i Livadi", en: "Quay, water, fuel, shops in Livadi" }
    },
    restaurants: [
      { name: "Aloni", specialty: { no: "Tradisjonell gresk mat i Chora med utsikt over hele øya", en: "Traditional Greek food in Chora with views across the whole island" }, price: "€€" },
      { name: "Yacht Club Serifos", specialty: { no: "Sjømat og pasta rett på stranden i Livadi", en: "Seafood and pasta right on the beach in Livadi" }, price: "€€" }
    ],
    mustDo: { no: "Gå opp de 300 trinnene til Chora på kveldstid — utsikten over Kykladane i solnedgang er uforglemmelig", en: "Climb the 300 steps to Chora in the evening — the sunset view across the Cyclades is unforgettable" },
    localSpecialty: { no: "Marathopita — pai fylt med villsamlet fennikel og lokal ost", en: "Marathopita — pie filled with wild-foraged fennel and local cheese" },
    image: "Serifos"
  },

  "sifnos": {
    name: "Sifnos",
    slug: "sifnos",
    region: "kykladene",
    lat: 36.960,
    lng: 24.715,
    tagline: { no: "Grekenlands gastronomiske hovedstad — hjemstedet til det greske kjøkkenets far", en: "Greece's gastronomic capital — birthplace of the father of Greek cuisine" },
    description: { no: "Sifnos er fødestedet til Nikolaos Tselementes, mannen som skrev den greske kokebok-bibelen. Øya er uoffisiell mathovedstad i Kykladane med over 100 km merkede turstier mellom landsbyer. Keramikktradisjonen går 3000 år tilbake.", en: "Sifnos is the birthplace of Nikolaos Tselementes, the man who wrote the bible of Greek cookery. The island is the unofficial culinary capital of the Cyclades with over 100 km of marked hiking trails between villages. The pottery tradition dates back 3,000 years." },
    highlights: [
      { no: "Gastronomisk hovedstad — Tselementes (gresk matkultur-far) ble født her", en: "Gastronomic capital — Tselementes (father of Greek cuisine) was born here" },
      { no: "Over 100 km merkede turstier mellom pittoreske landsbyer", en: "Over 100 km of marked hiking trails between picturesque villages" },
      { no: "3000 år ubrutt keramikktradisjon — verksteder kan besøkes", en: "3,000 years of unbroken pottery tradition — workshops open to visitors" }
    ],
    anchorage: {
      protection: { no: "God fra N-NE i Kamares-bukta", en: "Good from N-NE in Kamares bay" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "4-12m",
      facilities: { no: "Kai i Kamares, vann, drivstoff, supermarked", en: "Quay in Kamares, water, fuel, supermarket" }
    },
    restaurants: [
      { name: "Omega 3", specialty: { no: "Dagfersk sjømat på havnen i Kamares", en: "Daily-fresh seafood at the harbour in Kamares" }, price: "€€" },
      { name: "Drakakis", specialty: { no: "Tradisjonell sifniansk mat, revithada (langkokt kikertstuing)", en: "Traditional Sifnian food, revithada (slow-cooked chickpea stew)" }, price: "€€" },
      { name: "Chrysso", specialty: { no: "Kreativ gresk i Artemonas, bruk av lokale urter og ost", en: "Creative Greek cuisine in Artemonas, using local herbs and cheese" }, price: "€€€" }
    ],
    mustDo: { no: "Spis revithada — kikertstuing langkokt over natten i leirovn — den er Sifnos' signaturrett", en: "Eat revithada — chickpea stew slow-cooked overnight in a clay oven — it is Sifnos' signature dish" },
    localSpecialty: { no: "Revithada — kikertstuing langkokt over natten i tradisjonell leirovn, kun på søndager i mange tavernaer", en: "Revithada — chickpea stew slow-cooked overnight in a traditional clay oven, only on Sundays at many tavernas" },
    image: "Sifnos"
  },

  "milos": {
    name: "Milos",
    slug: "milos",
    region: "kykladene",
    lat: 36.745,
    lng: 24.440,
    tagline: { no: "Sarakiniko-månelandskap og Kleftiko-sjøgrotter — 80 strender i vulkansk paradis", en: "Sarakiniko moonscape and Kleftiko sea caves — 80 beaches in a volcanic paradise" },
    description: { no: "Vulkansk øy med over 80 strender i forskjellige farger. Sarakiniko ser ut som et månelandskap i hvitt med turkist hav. Kleftiko-sjøgrottene er kun tilgjengelige fra sjøen. Venus de Milo ble funnet her i 1820. Adamas-havnen er en av Middelhavets største naturhavner.", en: "A volcanic island with over 80 beaches in different colours. Sarakiniko looks like a white moonscape plunging into turquoise sea. The Kleftiko sea caves are only accessible from the water. The Venus de Milo was found here in 1820. Adamas harbour is one of the largest natural harbours in the Mediterranean." },
    highlights: [
      { no: "Sarakiniko — hvitt månelandskap som stuper ned i turkist hav", en: "Sarakiniko — white moonscape plunging into turquoise sea" },
      { no: "Kleftiko-sjøgrotter — kun tilgjengelig med båt, spektakulært for snorkling", en: "Kleftiko sea caves — only accessible by boat, spectacular for snorkelling" },
      { no: "Adamas — en av Middelhavets største naturlige havner", en: "Adamas — one of the largest natural harbours in the Mediterranean" }
    ],
    anchorage: {
      protection: { no: "Utmerket i Adamas fra nesten alle vindretninger", en: "Excellent in Adamas from nearly all wind directions" },
      bottom: { no: "Mudder, utmerket holdekraft", en: "Mud, excellent holding" },
      depth: "4-15m",
      facilities: { no: "Full service i Adamas: kai, vann, strøm, drivstoff, verksted", en: "Full service in Adamas: quay, water, power, fuel, boatyard" }
    },
    restaurants: [
      { name: "O! Hamos!", specialty: { no: "Legendarisk taverna i Adamas — revet lam og lokal ost, bestill i forveien", en: "Legendary taverna in Adamas — pulled lamb and local cheese, book ahead" }, price: "€€" },
      { name: "Medusa", specialty: { no: "Sjømat i Mandrakia fiskerhavn, 4 bord rett på vannet", en: "Seafood in Mandrakia fishing harbour, 4 tables right on the water" }, price: "€€€" },
      { name: "Astakas", specialty: { no: "Hummer og sjømat med utsikt over Pollonia", en: "Lobster and seafood with views over Pollonia" }, price: "€€€" }
    ],
    mustDo: { no: "Seil til Kleftiko-grottene tidlig morgen — snorkle gjennom turkise huler og naturlige buer før dagsbåtene kommer", en: "Sail to the Kleftiko caves early morning — snorkel through turquoise caverns and natural arches before the day-trip boats arrive" },
    localSpecialty: { no: "Pitarakia — små paier med fersk lokal ost og mynte, stekt i olivenolje", en: "Pitarakia — small pies with fresh local cheese and mint, fried in olive oil" },
    image: "Milos"
  },

  "folegandros": {
    name: "Folegandros",
    slug: "folegandros",
    region: "kykladene",
    lat: 36.621,
    lng: 24.910,
    tagline: { no: "Chora på 200-metersklippen — Kykladanes vakreste landsby uten folkemassene", en: "Chora on the 200-metre cliff — the most beautiful village in the Cyclades without the crowds" },
    description: { no: "Chora balanserer på kanten av en 200 meter høy klippe — mange kaller den Kykladanes vakreste landsby. Chrysospilia ('gyllen grotte') på nordkysten har stalaktitter som glinser i gull. Matsata-pasta er øyas egen pastavariant, hjemmelaget overalt.", en: "Chora balances on the edge of a 200-metre cliff — many call it the most beautiful village in the Cyclades. Chrysospilia ('golden cave') on the north coast has stalactites that glimmer gold. Matsata pasta is the island's own pasta variety, homemade everywhere." },
    highlights: [
      { no: "Chora på 200-metersklippen — regnet som Kykladanes vakreste", en: "Chora on the 200-metre cliff — considered the most beautiful in the Cyclades" },
      { no: "Chrysospilia — 'gyllen grotte' med gullglinsende stalaktitter", en: "Chrysospilia — 'golden cave' with gold-glimmering stalactites" },
      { no: "Panagia-kirken opplyst om natten på klippekanten — ikonisk syn", en: "Panagia church illuminated at night on the cliff edge — an iconic sight" }
    ],
    anchorage: {
      protection: { no: "Moderat i Karavostasi fra N-NE", en: "Moderate in Karavostasi from N-NE" },
      bottom: { no: "Sand og stein", en: "Sand and rock" },
      depth: "3-8m",
      facilities: { no: "Liten kai i Karavostasi, begrenset vann og drivstoff", en: "Small quay in Karavostasi, limited water and fuel" }
    },
    restaurants: [
      { name: "Pounta", specialty: { no: "Utsikt fra klippekanten i Chora, hjemmelaget matsata-pasta", en: "Cliff-edge views in Chora, homemade matsata pasta" }, price: "€€" },
      { name: "Eva's Garden", specialty: { no: "Hage-restaurant med lokal mat, kje og kaninretter", en: "Garden restaurant with local food, kid goat and rabbit dishes" }, price: "€€" }
    ],
    mustDo: { no: "Gå opp den bratte stien til Panagia-kirken ved solnedgang — 200 meter over havet, opplyst i mørket", en: "Hike the steep path to Panagia church at sunset — 200 metres above the sea, illuminated after dark" },
    localSpecialty: { no: "Matsata — hjemmelaget pasta med kje eller kanin i tomatsaus, Folegandros' signaturrett", en: "Matsata — homemade pasta with kid goat or rabbit in tomato sauce, Folegandros' signature dish" },
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
    tagline: { no: "Naoussa fiskerhavn og parisk marmor — Kykladanes uanstrengte hjerte", en: "Naoussa fishing harbour and Parian marble — the effortless heart of the Cyclades" },
    description: { no: "Paros har alt uten anmassenhet. Naoussa er en av Egeerhavet mest fotogene fiskerhavner. Parisk marmor — verdens fineste — ble brukt til Venus de Milo og Napoleons grav. Golden Beach er blant verdens beste for windsurfing.", en: "Paros has everything without pretension. Naoussa is one of the Aegean's most photogenic fishing harbours. Parian marble — the world's finest — was used for the Venus de Milo and Napoleon's tomb. Golden Beach ranks among the world's best for windsurfing." },
    highlights: [
      { no: "Naoussa fiskerhavn — fargerike båter og hvitkalkedehusfasader", en: "Naoussa fishing harbour — colourful boats and whitewashed facades" },
      { no: "Parisk marmor — verdens fineste, brukt til Venus de Milo", en: "Parian marble — the world's finest, used for the Venus de Milo" },
      { no: "Golden Beach — verdensklasse windsurfing med Meltemi-vind", en: "Golden Beach — world-class windsurfing with the Meltemi wind" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Parikia, god fra NE i Naoussa", en: "Good from N-NW in Parikia, good from NE in Naoussa" },
      bottom: { no: "Sand", en: "Sand" },
      depth: "3-10m",
      facilities: { no: "Kai og bøyer i Parikia, vann, drivstoff, full proviantering", en: "Quay and mooring buoys in Parikia, water, fuel, full provisioning" }
    },
    restaurants: [
      { name: "Mario", specialty: { no: "Institusjon i Naoussa, sjømat og pasta siden 1980-tallet", en: "An institution in Naoussa, seafood and pasta since the 1980s" }, price: "€€€" },
      { name: "Siparos", specialty: { no: "Farm-to-table i Naoussa, lokale råvarer og naturvin", en: "Farm-to-table in Naoussa, local produce and natural wine" }, price: "€€€" },
      { name: "Taverna Glafkos", specialty: { no: "Enkel fiskeaverna på havnen i Naoussa, grillet dagsfangst", en: "Simple fish taverna on the harbour in Naoussa, grilled daily catch" }, price: "€€" }
    ],
    mustDo: { no: "Spis middag på en av de små tavernaene i Naoussa havn mens fiskebåtene dukker inn i skumringen", en: "Have dinner at one of the small tavernas in Naoussa harbour as the fishing boats slip in at dusk" },
    localSpecialty: { no: "Gouna — soltørket makrell, Paros' signaturdish, servert grillet med sitron", en: "Gouna — sun-dried mackerel, Paros' signature dish, served grilled with lemon" },
    image: "Paros"
  },

  "naxos": {
    name: "Naxos",
    slug: "naxos",
    region: "kykladene",
    lat: 37.100,
    lng: 25.378,
    tagline: { no: "Størst og mest selvforsynt — Portara, graviera og Kitron-likør", en: "Largest and most self-sufficient — Portara, graviera and Kitron liqueur" },
    description: { no: "Den største kykladeøya er den mest selvforsynte: egne poteter, ost, kjøtt, frukt. Portara — den enorme marmorporten på holmen ved havna — er Naxos' ikon. Graviera-osten herfra er Grekenlands beste. Kitron-likør lages av sitrusfrukten citron, kun på Naxos.", en: "The largest Cycladic island is the most self-sufficient: its own potatoes, cheese, meat, fruit. The Portara — the enormous marble gateway on the islet by the harbour — is the icon of Naxos. The graviera cheese from here is considered the best in Greece. Kitron liqueur is made from the citron fruit, grown only on Naxos." },
    highlights: [
      { no: "Portara — den kolossale Apollon-tempelporten, Naxos' ikoniske landemerke", en: "Portara — the colossal Temple of Apollo gateway, the iconic landmark of Naxos" },
      { no: "Naxos graviera — regnet som Grekenlands beste ost", en: "Naxos graviera — considered the best cheese in Greece" },
      { no: "Kitron-likør — laget av citron-frukt som kun dyrkes her", en: "Kitron liqueur — made from citron fruit grown only here" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Naxos havn", en: "Good from N-NW in Naxos harbour" },
      bottom: { no: "Sand", en: "Sand" },
      depth: "3-10m",
      facilities: { no: "Kai, vann, drivstoff, full proviantering i byen", en: "Quay, water, fuel, full provisioning in town" }
    },
    restaurants: [
      { name: "To Elliniko", specialty: { no: "Naxiansk tradisjonsmat — lokal ost, poteter og kjøtt", en: "Traditional Naxian food — local cheese, potatoes and meat" }, price: "€€" },
      { name: "Meze2", specialty: { no: "Kreative mezedes og Naxos-vin i gamlebyen", en: "Creative mezedes and Naxos wine in the old town" }, price: "€€" },
      { name: "Apostolis", specialty: { no: "Sjømat-taverna rett ved Portara, grillet blekksprut", en: "Seafood taverna right by the Portara, grilled octopus" }, price: "€€" }
    ],
    mustDo: { no: "Gå ut til Portara ved solnedgang — den enorme marmorporten rammer inn den perfekte Egeerhavet-solnedgangen", en: "Walk out to the Portara at sunset — the enormous marble gateway frames the perfect Aegean sunset" },
    localSpecialty: { no: "Kitron-likør — destillert av citron-bladene, finnes i tre varianter (grønn, klar, gul)", en: "Kitron liqueur — distilled from citron leaves, available in three varieties (green, clear, yellow)" },
    image: "Naxos"
  },

  "ios": {
    name: "Ios",
    slug: "ios",
    region: "kykladene",
    lat: 36.723,
    lng: 25.282,
    tagline: { no: "Homers grav og 12 vindmøller — mye mer enn festøy", en: "Homer's tomb and 12 windmills — far more than a party island" },
    description: { no: "Ios rommer Homers antatte grav i nord og 12 vindmøller over Chora. Ja, nattelivet er legendarisk, men øya har fantastiske strender, en av Kykladanes fineste Choraer og overraskende god mat. Mylopotas-stranden er kilometerlang.", en: "Ios is home to Homer's supposed tomb in the north and 12 windmills above Chora. Yes, the nightlife is legendary, but the island has fantastic beaches, one of the finest Choras in the Cyclades and surprisingly good food. Mylopotas beach stretches for a kilometre." },
    highlights: [
      { no: "Homers grav — den legendariske dikterens antatte hvilested", en: "Homer's tomb — the legendary poet's supposed resting place" },
      { no: "12 vindmøller i rekke over Chora — fotogent fra alle vinkler", en: "12 windmills in a row above Chora — photogenic from every angle" },
      { no: "Mylopotas — kilometerlang gyllen sandstrand", en: "Mylopotas — a kilometre-long golden sandy beach" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Ios-havnen (Ormos)", en: "Good from N-NW in Ios harbour (Ormos)" },
      bottom: { no: "Sand, god holdekraft", en: "Sand, good holding" },
      depth: "4-12m",
      facilities: { no: "Kai, vann, drivstoff, butikker", en: "Quay, water, fuel, shops" }
    },
    restaurants: [
      { name: "Grandma's", specialty: { no: "Hjemmelaget gresk i Chora — moussaka og pastitsio som bestemor lager", en: "Homemade Greek in Chora — moussaka and pastitsio just like grandma makes" }, price: "€€" },
      { name: "Lord Byron", specialty: { no: "Sjømat og utsikt i Chora, dagfersk fisk", en: "Seafood and views in Chora, daily-fresh fish" }, price: "€€€" }
    ],
    mustDo: { no: "Gå den antikke stien til Homers grav på nordspissen — ensom vandring med panoramautsikt over Sikinos og Santorini", en: "Walk the ancient path to Homer's tomb on the northern tip — a solitary hike with panoramic views over Sikinos and Santorini" },
    localSpecialty: { no: "Skordostoumpi — lokal hvitløk-dipp med mandler, servert til brød", en: "Skordostoumpi — local garlic dip with almonds, served with bread" },
    image: "Ios"
  },

  "santorini": {
    name: "Santorini",
    slug: "santorini",
    region: "kykladene",
    lat: 36.393,
    lng: 25.461,
    tagline: { no: "Kalderaen — verdens mest dramatiske vulkanutsikt og 3600 år gammel by under asken", en: "The caldera — the world's most dramatic volcanic vista and a 3,600-year-old city beneath the ash" },
    description: { no: "Det vulkanske utbruddet rundt 1600 f.Kr. skapte kalderaen og begravde Akrotiri — et 'minoisk Pompeii' som nå er utgravd. Assyrtiko-druen vokser i kurver på bakken for å overleve vinden og gir mineralsk, unik vin. Kveldslyset over kalderaen er uten sidestykke.", en: "The volcanic eruption around 1600 BC created the caldera and buried Akrotiri — a 'Minoan Pompeii' now excavated. The Assyrtiko grape grows in basket shapes on the ground to survive the wind, producing mineral, singular wine. The evening light over the caldera is without equal." },
    highlights: [
      { no: "Kalderaen — 300 meter stupbratte klipper ned til vulkankrateret", en: "The caldera — 300-metre sheer cliffs down to the volcanic crater" },
      { no: "Akrotiri — 'minoisk Pompeii' med 3600 år gamle fresker", en: "Akrotiri — 'Minoan Pompeii' with 3,600-year-old frescoes" },
      { no: "Assyrtiko-vin fra Estate Argyros — vulkanjord gir unik mineralsk smak", en: "Assyrtiko wine from Estate Argyros — volcanic soil yields a unique mineral character" }
    ],
    anchorage: {
      protection: { no: "Moderat i Athinios/Vlychada fra N-NE, ankring i kalderaen ustabil", en: "Moderate in Athinios/Vlychada from N-NE, anchoring in the caldera is unstable" },
      bottom: { no: "Vulkansk, varierende holdekraft — bruk bøyer i kalderaen", en: "Volcanic, variable holding — use mooring buoys in the caldera" },
      depth: { no: "Svært dypt i kalderaen (40-80m), bøyer nødvendig", en: "Very deep in the caldera (40-80m), mooring buoys required" },
      facilities: { no: "Begrenset kai i Athinios, Vlychada marina sør har bedre fasiliteter", en: "Limited quay in Athinios, Vlychada marina to the south has better facilities" }
    },
    restaurants: [
      { name: "To Psaraki", specialty: { no: "Sjømat i Vlychada ved de spektakulære vulkanske klippene", en: "Seafood in Vlychada by the spectacular volcanic cliffs" }, price: "€€" },
      { name: "Metaxy Mas", specialty: { no: "Kretisk-inspirert mat i Exo Gonia — regnes som Santorinis beste", en: "Cretan-inspired cuisine in Exo Gonia — widely regarded as Santorini's best" }, price: "€€" },
      { name: "Selene", specialty: { no: "Fine dining med santorinsk-inspirert meny, Assyrtiko-vinmeny", en: "Fine dining with a Santorini-inspired menu, Assyrtiko wine list" }, price: "€€€€" }
    ],
    mustDo: { no: "Besøk Estate Argyros for vinsmakings — Assyrtiko fra vulkanjord med utsikt over Egeerhavet", en: "Visit Estate Argyros for wine tasting — Assyrtiko from volcanic soil with views over the Aegean" },
    localSpecialty: { no: "Fava — gul linsepur fra lokalt dyrkede linser, Santorinis nasjonalrett", en: "Fava — yellow split pea puree from locally grown lentils, Santorini's national dish" },
    image: "Santorini"
  },

  "mykonos": {
    name: "Mykonos",
    slug: "mykonos",
    region: "kykladene",
    lat: 37.445,
    lng: 25.329,
    tagline: { no: "Little Venice og fem vindmøller — porten til hellige Delos", en: "Little Venice and five windmills — the gateway to sacred Delos" },
    description: { no: "Mykonos er Kykladanes kosmopolitiske hjerte, men under glamouren er det en genuin kyklade-chora. Little Venice med husene rett over vannet og de fem vindmøllene er ikoniske. Den egentlige perlen er nærhet til Delos — Apollons fødested og UNESCO-verdensarv.", en: "Mykonos is the cosmopolitan heart of the Cyclades, but beneath the glamour lies a genuine Cycladic chora. Little Venice with its houses right over the water and the five windmills are iconic. The real gem is the proximity to Delos — birthplace of Apollo and a UNESCO World Heritage Site." },
    highlights: [
      { no: "Little Venice — hus som henger over havet, perfekt for solnedgang", en: "Little Venice — houses hanging over the sea, perfect for sunset" },
      { no: "Fem ikoniske vindmøller på åsen over Chora", en: "Five iconic windmills on the hill above Chora" },
      { no: "15 minutter med båt til Delos — Apollons fødested (UNESCO)", en: "15 minutes by boat to Delos — birthplace of Apollo (UNESCO)" }
    ],
    anchorage: {
      protection: { no: "Moderat i gammel havn fra N-NW, ny marina Tourlos bedre", en: "Moderate in the old harbour from N-NW, new Tourlos marina is better" },
      bottom: { no: "Sand", en: "Sand" },
      depth: "3-8m",
      facilities: { no: "Tourlos marina: kai, vann, drivstoff. Gammel havn: begrenset", en: "Tourlos marina: quay, water, fuel. Old harbour: limited" }
    },
    restaurants: [
      { name: "Kiki's Tavern", specialty: { no: "Grillmat ved Agios Sostis-stranden — ingen reservasjon, bare kø og vent", en: "Grilled food by Agios Sostis beach — no reservations, just queue and wait" }, price: "€€" },
      { name: "Joanna's Nikos Place", specialty: { no: "Sjømat i Megali Ammos, familiedrevet i generasjoner", en: "Seafood in Megali Ammos, family-run for generations" }, price: "€€€" },
      { name: "M-eating", specialty: { no: "Kvalitetskjøtt og deli i Chora", en: "Quality meats and deli in Chora" }, price: "€€€" }
    ],
    mustDo: { no: "Ta morgenbåten til Delos — Apollons fødested med Løvenes terrasse og antikke mosaikker — tilbake til lunsj", en: "Take the morning boat to Delos — birthplace of Apollo with the Terrace of the Lions and ancient mosaics — back in time for lunch" },
    localSpecialty: { no: "Louza — lufttørket svinekjøtt krydret med pepper og allehånde, Mykonos' svar på prosciutto", en: "Louza — air-dried pork seasoned with pepper and allspice, Mykonos' answer to prosciutto" },
    image: "Mykonos"
  },

  "syros": {
    name: "Syros",
    slug: "syros",
    region: "kykladene",
    lat: 37.445,
    lng: 24.894,
    tagline: { no: "Kykladanes administrative hovedstad — nyklassisisme, loukoumi og rebetiko", en: "The administrative capital of the Cyclades — neoclassicism, loukoumi and rebetiko" },
    description: { no: "Ermoupoli er Kykladanes hovedstad med Grekenlands best bevarte nyklassisistiske arkitektur. Markos Vamvakaris — rebetiko-musikkens far — ble født her. Loukoumi (gresk lokum) fra Syros er berømt i hele Hellas. To høyder: katolske Ano Syros og ortodokse Ermoupoli.", en: "Ermoupoli is the capital of the Cyclades with Greece's best-preserved neoclassical architecture. Markos Vamvakaris — the father of rebetiko music — was born here. Loukoumi (Greek Turkish delight) from Syros is famous throughout Greece. Two hilltops: Catholic Ano Syros and Orthodox Ermoupoli." },
    highlights: [
      { no: "Ermoupoli — nyklassisistisk hovedstad med Apollon-teater (mini-La Scala)", en: "Ermoupoli — neoclassical capital with the Apollo Theatre (a mini La Scala)" },
      { no: "Markos Vamvakaris-museet — rebetiko-musikkens fødested", en: "The Markos Vamvakaris Museum — birthplace of rebetiko music" },
      { no: "To religioner, to høyder — katolske Ano Syros og ortodokse Ermoupoli", en: "Two religions, two hilltops — Catholic Ano Syros and Orthodox Ermoupoli" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Ermoupoli havn", en: "Good from N-NW in Ermoupoli harbour" },
      bottom: { no: "Mudder, god holdekraft", en: "Mud, good holding" },
      depth: "3-10m",
      facilities: { no: "Full service: kai, vann, strøm, drivstoff, verksted", en: "Full service: quay, water, power, fuel, boatyard" }
    },
    restaurants: [
      { name: "Mazi", specialty: { no: "Moderne gresk i Ermoupoli, kreative mezedes", en: "Modern Greek in Ermoupoli, creative mezedes" }, price: "€€€" },
      { name: "Allou Yialou", specialty: { no: "Sjømat rett på stranden, fersk og enkel", en: "Seafood right on the beach, fresh and simple" }, price: "€€" }
    ],
    mustDo: { no: "Spis loukoumi fra en av de tradisjonelle butikkene i Ermoupoli og besøk det lille Apollon-teateret — en Mini-La Scala", en: "Eat loukoumi from one of the traditional shops in Ermoupoli and visit the small Apollo Theatre — a mini La Scala" },
    localSpecialty: { no: "Loukoumi — gresk lokum med rosevann, Syros' mest kjente eksportvare", en: "Loukoumi — Greek Turkish delight with rosewater, Syros' most famous export" },
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
    tagline: { no: "400 innbyggere og øya som nekter å ha det travelt", en: "400 inhabitants and the island that refuses to rush" },
    description: { no: "Pano Koufonisi har bare 400 fastboende og ingen biler utenom en renovasjonsbil. Østkysten er en ubrutt rekke med strender og naturlige basseng i sandstein. Pori Beach har sjøgrotter du kan svømme inn i. Tempo: null.", en: "Pano Koufonisi has just 400 permanent residents and no cars except a garbage truck. The east coast is an unbroken string of beaches and natural sandstone pools. Pori Beach has sea caves you can swim into. Pace: zero." },
    highlights: [
      { no: "Østkysten — ubrutt rekke med strender og naturlige sjøbasseng", en: "East coast — unbroken string of beaches and natural sea pools" },
      { no: "Pori Beach med sjøgrotter du kan svømme gjennom", en: "Pori Beach with sea caves you can swim through" },
      { no: "400 innbyggere og kun én bil (renovasjonen)", en: "400 inhabitants and only one car (the garbage truck)" }
    ],
    anchorage: {
      protection: { no: "Moderat fra N i havnen, utsatt for Meltemi", en: "Moderate from N in the harbour, exposed to Meltemi" },
      bottom: { no: "Sand", en: "Sand" },
      depth: "2-6m",
      facilities: { no: "Liten kai, vann, minimarked", en: "Small quay, water, minimarket" }
    },
    restaurants: [
      { name: "Captain Nikolas", specialty: { no: "Fisk fra eierens egen båt, servert på kaien", en: "Fish from the owner's own boat, served on the quay" }, price: "€€" },
      { name: "Scholio", specialty: { no: "Grillet blekksprut og lokal raki i gammel skolebygning", en: "Grilled octopus and local raki in an old schoolhouse" }, price: "€€" }
    ],
    mustDo: { no: "Gå kystveien østover fra Chora langs alle buktene — hver sving avslører en ny strand vakrere enn den forrige", en: "Walk the coastal path east from Chora along all the coves — every turn reveals a new beach more beautiful than the last" },
    localSpecialty: { no: "Dagfersk hummer servert enkel med sitron — Koufonisias stolthet", en: "Daily-fresh lobster served simply with lemon — Koufonisia's pride" },
    image: "Koufonisia"
  },

  "schinoussa": {
    name: "Schinoussa",
    slug: "schinoussa",
    region: "sma-kykladene",
    lat: 36.872,
    lng: 25.520,
    tagline: { no: "250 innbyggere, 18 strender — én landsby og én havn", en: "250 inhabitants, 18 beaches — one village and one harbour" },
    description: { no: "Schinoussa har 250 fastboende, én landsby (Chora), én havn (Mersini) og 18 strender. Det er hele øya. Ingen turistshop, ingen nattklubb, bare rolig gresk øyliv med tavernaer som serverer det fiskerne hentet opp i dag.", en: "Schinoussa has 250 permanent residents, one village (Chora), one harbour (Mersini) and 18 beaches. That's the entire island. No tourist shops, no nightclubs, just peaceful Greek island life with tavernas serving what the fishermen caught today." },
    highlights: [
      { no: "18 strender fordelt på 250 innbyggere — din private strand garantert", en: "18 beaches shared among 250 inhabitants — your private beach guaranteed" },
      { no: "Én landsby, én havn — Grekenland destillert til sitt enkleste", en: "One village, one harbour — Greece distilled to its simplest" },
      { no: "Tsigouri-stranden — turkist vann og nesten alltid tom", en: "Tsigouri beach — turquoise water and almost always empty" }
    ],
    anchorage: {
      protection: { no: "Moderat fra N-NE i Mersini", en: "Moderate from N-NE in Mersini" },
      bottom: { no: "Sand", en: "Sand" },
      depth: "3-6m",
      facilities: { no: "Minimal kai, vann tilgjengelig, én minibutikk", en: "Minimal quay, water available, one mini-shop" }
    },
    restaurants: [
      { name: "Deli", specialty: { no: "Hjemmelaget mat i Chora, geiterett og lokale grønnsaker", en: "Homemade food in Chora, goat dishes and local vegetables" }, price: "€" },
      { name: "Mersini", specialty: { no: "Taverna på havnen, dagfersk fisk fra lokale fiskere", en: "Harbour taverna, daily-fresh fish from local fishermen" }, price: "€€" }
    ],
    mustDo: { no: "Gå til Tsigouri-stranden — 15 minutter fra Chora, turkist vann og sannsynligvis helt tom", en: "Walk to Tsigouri beach — 15 minutes from Chora, turquoise water and probably completely empty" },
    localSpecialty: { no: "Geitekjøtt tilberedt med lokale urter — geitene vandrer fritt over øya", en: "Goat meat prepared with local herbs — the goats roam freely across the island" },
    image: "Schinoussa"
  },

  "amorgos": {
    name: "Amorgos",
    slug: "amorgos",
    region: "sma-kykladene",
    lat: 36.833,
    lng: 25.890,
    tagline: { no: "Hozoviotissa-klosteret i klippen og 'The Big Blue' — Kykladanes villeste øy", en: "The Hozoviotissa monastery in the cliff and 'The Big Blue' — the wildest island in the Cyclades" },
    description: { no: "Hozoviotissa-klosteret fra 1088 e.Kr. er bygget inn i en 300 meter høy klippe over havet — et av Grekenlands mest dramatiske syn. Luc Bessons 'The Big Blue' ble filmet her. To havner: Katapola og Aegiali, forbundet av en dramatisk fjellvei.", en: "The Hozoviotissa monastery from 1088 AD is built into a 300-metre-high cliff above the sea — one of Greece's most dramatic sights. Luc Besson's 'The Big Blue' was filmed here. Two harbours: Katapola and Aegiali, connected by a dramatic mountain road." },
    highlights: [
      { no: "Hozoviotissa-klosteret (1088) — bygget inn i en 300 meter høy klippe", en: "Hozoviotissa monastery (1088) — built into a 300-metre-high cliff" },
      { no: "'The Big Blue' (1988) — filmet i Agia Anna-bukta", en: "'The Big Blue' (1988) — filmed in Agia Anna bay" },
      { no: "To havner og en dramatisk fjellvei mellom dem", en: "Two harbours and a dramatic mountain road between them" }
    ],
    anchorage: {
      protection: { no: "God fra N i Katapola (dyp bukt), moderat i Aegiali", en: "Good from N in Katapola (deep bay), moderate in Aegiali" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "4-15m i Katapola",
      facilities: { no: "Kai i begge havner, vann, drivstoff, butikker", en: "Quay in both harbours, water, fuel, shops" }
    },
    restaurants: [
      { name: "Tranzistor", specialty: { no: "Kafé og mat med bohemsk stemning i Chora", en: "Café and food with a bohemian vibe in Chora" }, price: "€€" },
      { name: "Limani tou Katapola", specialty: { no: "Sjømat-taverna på Katapola-kaien, dagfersk fisk", en: "Seafood taverna on the Katapola quay, daily-fresh fish" }, price: "€€" }
    ],
    mustDo: { no: "Besøk Hozoviotissa-klosteret — 300 trinn opp klippen, munkene serverer raki og loukoumi på toppen", en: "Visit the Hozoviotissa monastery — 300 steps up the cliff, the monks serve raki and loukoumi at the top" },
    localSpecialty: { no: "Psimeni raki — raki infusert med honning og krydder, servert av munkene i Hozoviotissa", en: "Psimeni raki — raki infused with honey and spices, served by the monks at Hozoviotissa" },
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
    tagline: { no: "Grønneste kykladen — fossefaller, museer og vandrerparadis", en: "The greenest Cycladic island — waterfalls, museums and a hiker's paradise" },
    description: { no: "Andros er den grønneste og nest største kykladeøya, med bekker, fossefaller og eikeskog. Museum of Contemporary Art (MOCA) med verk av Rodin og Picasso. Byen Andros balanserer på en smal halvøy med ruinene av en venetiansk borg ytterst.", en: "Andros is the greenest and second-largest Cycladic island, with streams, waterfalls and oak forests. The Museum of Contemporary Art (MOCA) holds works by Rodin and Picasso. The town of Andros balances on a narrow peninsula with the ruins of a Venetian castle at its tip." },
    highlights: [
      { no: "MOCA — Museum of Contemporary Art med Rodin, Picasso og samtidskunst", en: "MOCA — Museum of Contemporary Art with Rodin, Picasso and contemporary art" },
      { no: "Fossefall og grønne daler — unikt for Kykladane", en: "Waterfalls and green valleys — unique in the Cyclades" },
      { no: "Andros by på smal halvøy med venetiansk borgru ytterst", en: "Andros town on a narrow peninsula with Venetian castle ruins at the tip" }
    ],
    anchorage: {
      protection: { no: "God fra S-SW i Batsi, moderat i Andros by", en: "Good from S-SW in Batsi, moderate in Andros town" },
      bottom: { no: "Sand", en: "Sand" },
      depth: "3-10m",
      facilities: { no: "Kai i Batsi og Gavrio, vann, drivstoff, butikker", en: "Quay in Batsi and Gavrio, water, fuel, shops" }
    },
    restaurants: [
      { name: "Stamatis", specialty: { no: "Sjømat-taverna i Batsi rett på vannet", en: "Seafood taverna in Batsi right on the water" }, price: "€€" },
      { name: "Endochora", specialty: { no: "Moderne gresk med lokale produkter i Andros by", en: "Modern Greek cuisine with local produce in Andros town" }, price: "€€€" }
    ],
    mustDo: { no: "Gå turstien fra Andros by til Achla-stranden via Pythara-fossefallet — Kykladanes beste dagsvandring", en: "Hike the trail from Andros town to Achla beach via Pythara waterfall — the best day hike in the Cyclades" },
    localSpecialty: { no: "Fourtalia — omelett med lokal pølse og poteter, Andros' hverdagsrett", en: "Fourtalia — omelette with local sausage and potatoes, Andros' everyday dish" },
    image: "Andros"
  },

  "tinos": {
    name: "Tinos",
    slug: "tinos",
    region: "nordlige-kykladene",
    lat: 37.548,
    lng: 25.163,
    tagline: { no: "1000 duehus og marmorlandsbyer — Kykladanes best bevarte hemmelighet for matentusiaster", en: "1,000 dovecotes and marble villages — the Cyclades' best-kept secret for food lovers" },
    description: { no: "Tinos har over 1000 ornamenterte duehus spredt over landskapet — arkitektoniske perler fra venetiansk tid. Marmorlandsbyene Pyrgos og Panormos holder skulpturtradisjonen levende. Matscenen er Kykladanes mest spennende med lokale oster, artisjokkretter og naturvin.", en: "Tinos has over 1,000 ornate dovecotes scattered across the landscape — architectural gems from the Venetian era. The marble villages of Pyrgos and Panormos keep the sculptural tradition alive. The food scene is the most exciting in the Cyclades, with local cheeses, artichoke dishes and natural wine." },
    highlights: [
      { no: "Over 1000 ornamenterte duehus — venetiansk arkitektonisk arv", en: "Over 1,000 ornate dovecotes — Venetian architectural heritage" },
      { no: "Pyrgos marmorskulptur-landsby med museum og aktive verksteder", en: "Pyrgos marble sculpture village with museum and active workshops" },
      { no: "Mathovedstad med lokale oster, artisjokkretter og naturvin", en: "Food capital with local cheeses, artichoke dishes and natural wine" }
    ],
    anchorage: {
      protection: { no: "Moderat fra N i Tinos by (utsatt for Meltemi), bedre i Panormos", en: "Moderate from N in Tinos town (exposed to Meltemi), better in Panormos" },
      bottom: { no: "Sand og stein", en: "Sand and rock" },
      depth: "3-8m",
      facilities: { no: "Kai i Tinos by, vann, drivstoff, full proviantering", en: "Quay in Tinos town, water, fuel, full provisioning" }
    },
    restaurants: [
      { name: "Marathia", specialty: { no: "Farm-to-table i Falatados, lokal ost og kjøtt", en: "Farm-to-table in Falatados, local cheese and meat" }, price: "€€" },
      { name: "Thalassaki", specialty: { no: "Sjømat rett ved havnen i Tinos by", en: "Seafood right by the harbour in Tinos town" }, price: "€€" },
      { name: "Dino's", specialty: { no: "Artisjokkretter og lokale oster i Pyrgos", en: "Artichoke dishes and local cheeses in Pyrgos" }, price: "€€" }
    ],
    mustDo: { no: "Besøk Pyrgos marmorlandsby — se skulptørene jobbe og besøk Chalepas-museet", en: "Visit the Pyrgos marble village — watch the sculptors at work and visit the Chalepas museum" },
    localSpecialty: { no: "Louza — lufttørket svinekjøtt krydret med allehånde, og lokal Tinos-ost (volaki, kopanisti)", en: "Louza — air-dried pork seasoned with allspice, and local Tinos cheese (volaki, kopanisti)" },
    image: "Tinos"
  },

  "delos": {
    name: "Delos",
    slug: "delos",
    region: "nordlige-kykladene",
    lat: 37.396,
    lng: 25.268,
    tagline: { no: "Apollons fødested — UNESCO-verdensarv og hele Egeerhavet helligste øy", en: "Birthplace of Apollo — UNESCO World Heritage Site and the holiest island in the Aegean" },
    description: { no: "Delos var antikkens helligste øy — Apollon og Artemis ble født her ifølge mytologien. Hele øya er et arkeologisk museum under åpen himmel: Løvenes terrasse, Dionyssos-mosaikkene og det antikke teateret. Ingen bor her — kun dagbesøk tillatt fra Mykonos.", en: "Delos was the holiest island in antiquity — Apollo and Artemis were born here according to mythology. The entire island is an open-air archaeological museum: the Terrace of the Lions, the Dionysus mosaics and the ancient theatre. No one lives here — only day visits are allowed from Mykonos." },
    highlights: [
      { no: "Løvenes terrasse — ikonisk rekke med marmor-løver fra 600 f.Kr.", en: "Terrace of the Lions — iconic row of marble lions from 600 BC" },
      { no: "Antikke mosaikker av Dionysos — usedvanlig godt bevart", en: "Ancient Dionysus mosaics — exceptionally well preserved" },
      { no: "Hele øya er UNESCO-verdensarv — et friluft-museum", en: "The entire island is a UNESCO World Heritage Site — an open-air museum" }
    ],
    anchorage: {
      protection: { no: "Begrenset — kun dagsanløp tillatt, forbud mot overnatting", en: "Limited — day visits only, overnight stays prohibited" },
      bottom: { no: "Stein og sand", en: "Rock and sand" },
      depth: "2-5m ved landsettingskaien",
      facilities: { no: "Ingen — ta med vann og mat fra Mykonos", en: "None — bring water and food from Mykonos" }
    },
    restaurants: [
      { name: "Museumskafeen", specialty: { no: "Enkel kafé ved inngangen, kaffe og snacks", en: "Simple café at the entrance, coffee and snacks" }, price: "€" }
    ],
    mustDo: { no: "Gå opp til toppen av Mount Kynthos (113m) for 360-graders utsikt over Kykladane — det var her Apollon ble født", en: "Climb to the top of Mount Kynthos (113m) for a 360-degree view of the Cyclades — this is where Apollo was born" },
    localSpecialty: { no: "Ta med proviant fra Mykonos — det finnes ingen restauranter på øya", en: "Bring provisions from Mykonos — there are no restaurants on the island" },
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
    tagline: { no: "Egeerhavet Jerusalem — der Johannes skrev Åpenbaringen", en: "The Jerusalem of the Aegean — where John wrote the Book of Revelation" },
    description: { no: "Johannes-klosteret (1088) og Apokalypse-grotten der Johannes skrev Åpenbaringen er UNESCO-verdensarv. Patmos kalles 'Egeerhavet Jerusalem.' Skala-havnen er avslappet, Chora er middelaldermagi med klosteret som kronen. Overraskende bra mat og kunstscene.", en: "The Monastery of St. John (1088) and the Cave of the Apocalypse where John wrote the Book of Revelation are UNESCO World Heritage Sites. Patmos is called 'the Jerusalem of the Aegean.' Skala harbour is relaxed, Chora is medieval magic crowned by the monastery. Surprisingly good food and art scene." },
    highlights: [
      { no: "Apokalypse-grotten — der Johannes skrev Åpenbaringen", en: "Cave of the Apocalypse — where John wrote the Book of Revelation" },
      { no: "Johannes-klosteret (1088) — UNESCO-verdensarv med 900 års historie", en: "Monastery of St. John (1088) — UNESCO World Heritage Site with 900 years of history" },
      { no: "Chora — bilfri middelalderby kronetopp med klosteret", en: "Chora — car-free medieval hilltop village crowned by the monastery" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Skala-havnen", en: "Good from N-NW in Skala harbour" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "4-12m",
      facilities: { no: "Kai i Skala, vann, drivstoff, butikker og restauranter", en: "Quay in Skala, water, fuel, shops and restaurants" }
    },
    restaurants: [
      { name: "Benetos", specialty: { no: "Fin dining i Sapsila-bukta, egen urte-hage, sjømat", en: "Fine dining in Sapsila bay, own herb garden, seafood" }, price: "€€€" },
      { name: "Tzivaeri", specialty: { no: "Tradisjonell gresk i Skala, grillet fisk og mezedes", en: "Traditional Greek in Skala, grilled fish and mezedes" }, price: "€€" }
    ],
    mustDo: { no: "Besøk Apokalypse-grotten tidlig morgen — sprekken i fjellet der Guds stemme angivelig talte er fortsatt synlig", en: "Visit the Cave of the Apocalypse early morning — the crack in the rock where God's voice allegedly spoke is still visible" },
    localSpecialty: { no: "Pougia — søte buketter med mandler og sukker, Patmos' tradisjonelle gave", en: "Pougia — sweet bouquets of almonds and sugar, the traditional gift of Patmos" },
    image: "Patmos"
  },

  "lipsi": {
    name: "Lipsi",
    slug: "lipsi",
    region: "dodekanesene",
    lat: 37.302,
    lng: 26.746,
    tagline: { no: "Kalypsos øy — liten, stille og med Egeerhavet blåeste vann", en: "Calypso's island — small, quiet and home to the bluest waters in the Aegean" },
    description: { no: "Lipsi var ifølge myten Kalypsos øy der Odyssevs ble holdt fanget i syv år. I virkeligheten er det en bitteliten øy med noen hundre innbyggere, utrolig blått vann og en enslig landsby rundt havnen. Vinproduksjon med muscat-druene pågår fortsatt i liten skala.", en: "According to myth, Lipsi was Calypso's island where Odysseus was held captive for seven years. In reality, it is a tiny island with a few hundred inhabitants, incredibly blue water and a single village around the harbour. Wine production from muscat grapes continues on a small scale." },
    highlights: [
      { no: "Mytologisk Kalypso-øy — der Odyssevs ble holdt fanget", en: "Mythological Calypso's island — where Odysseus was held captive" },
      { no: "Lienous-stranden — dobbel bukt med Egeerhavet blåeste vann", en: "Lienous beach — double bay with the bluest water in the Aegean" },
      { no: "Muscat-vinproduksjon i liten skala fra lokale vingårder", en: "Small-scale muscat wine production from local vineyards" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i hovedhavnen", en: "Good from N-NW in the main harbour" },
      bottom: { no: "Sand", en: "Sand" },
      depth: "3-8m",
      facilities: { no: "Kai, vann, minimarked", en: "Quay, water, minimarket" }
    },
    restaurants: [
      { name: "Manolis Tastes", specialty: { no: "Familiedrevet taverna på havnen, gresk husmannskost", en: "Family-run taverna on the harbour, Greek home cooking" }, price: "€" },
      { name: "The Rock", specialty: { no: "Sjømat og cocktails med solnedgangsutsikt", en: "Seafood and cocktails with sunset views" }, price: "€€" }
    ],
    mustDo: { no: "Gå til Lienous-stranden — en dobbel turkis bukt 20 minutter fra havnen, perfekt for å forstå hvorfor Odyssevs ble værende", en: "Walk to Lienous beach — a double turquoise bay 20 minutes from the harbour, perfect for understanding why Odysseus stayed" },
    localSpecialty: { no: "Lokal muscat-vin — søt dessertvin produsert i svært begrenset mengde", en: "Local muscat wine — sweet dessert wine produced in very limited quantities" },
    image: "Lipsi"
  },

  "leros": {
    name: "Leros",
    slug: "leros",
    region: "dodekanesene",
    lat: 37.148,
    lng: 26.862,
    tagline: { no: "Art deco fra italiensk tid og dype naturhavner — Egeerhavet uoppdagede perle", en: "Italian-era art deco and deep natural harbours — the Aegean's undiscovered gem" },
    description: { no: "Leros ble bygget opp av italienerne på 1930-tallet og har uventet art deco-arkitektur i Lakki — en av Middelhavets største naturhavner. Pandeli-festningen gir panoramautsikt. Agia Marina er en sjarmerende havn med tavernaer langs vannet.", en: "Leros was built up by the Italians in the 1930s and features unexpected art deco architecture in Lakki — one of the Mediterranean's largest natural harbours. Pandeli fortress offers panoramic views. Agia Marina is a charming harbour with tavernas along the waterfront." },
    highlights: [
      { no: "Lakki — italiensk art deco-by fra 1930-tallet, en av Middelhavets største naturhavner", en: "Lakki — Italian art deco town from the 1930s, one of the Mediterranean's largest natural harbours" },
      { no: "Pandeli-festningen med 360-graders utsikt over øya", en: "Pandeli fortress with 360-degree views over the island" },
      { no: "Agia Marina — idyllisk havn med fargerike hus og tavernaer", en: "Agia Marina — idyllic harbour with colourful houses and tavernas" }
    ],
    anchorage: {
      protection: { no: "Utmerket i Lakki fra alle vindretninger (enorm naturhavn)", en: "Excellent in Lakki from all wind directions (enormous natural harbour)" },
      bottom: { no: "Mudder, utmerket holdekraft", en: "Mud, excellent holding" },
      depth: "5-15m",
      facilities: { no: "Kai i Lakki og Agia Marina, vann, drivstoff", en: "Quay in Lakki and Agia Marina, water, fuel" }
    },
    restaurants: [
      { name: "Mylos", specialty: { no: "Sjømat i gammel vindmølle ved Agia Marina", en: "Seafood in an old windmill at Agia Marina" }, price: "€€" },
      { name: "Psaropoula", specialty: { no: "Enkel fiskeaverna i Pandeli, grillet dagsfangst", en: "Simple fish taverna in Pandeli, grilled catch of the day" }, price: "€€" }
    ],
    mustDo: { no: "Gå gjennom Lakki og opplev 1930-tallets italienske art deco — kino, markedshall og boligkvartaler i fascistisk monumental stil", en: "Walk through Lakki and experience 1930s Italian art deco — cinema, market hall and residential quarters in fascist monumental style" },
    localSpecialty: { no: "Pitaroudia — kikertkaker med mynte og løk, stekt i olivenolje", en: "Pitaroudia — chickpea fritters with mint and onion, fried in olive oil" },
    image: "Leros"
  },

  "kalymnos": {
    name: "Kalymnos",
    slug: "kalymnos",
    region: "dodekanesene",
    lat: 36.950,
    lng: 26.985,
    tagline: { no: "Svampdykkerøya som ble verdens klatrehovedstad", en: "The sponge-diving island that became the world's rock climbing capital" },
    description: { no: "Kalymnos var svampdykkerhovedstaden i Egeerhavet i århundrer — museet forteller historien. I dag er øya verdenskjent for sportsklatring med tusenvis av ruter i den oransje kalksteinen. Havnen Pothia er livlig og fargerik med nyklassisistiske kapteinsvillaer.", en: "Kalymnos was the sponge-diving capital of the Aegean for centuries — the museum tells the story. Today the island is world-famous for sport climbing with thousands of routes in the orange limestone. Pothia harbour is lively and colourful with neoclassical sea captains' mansions." },
    highlights: [
      { no: "Verdens beste sportsklatring — tusenvis av ruter i oransje kalkstein", en: "World-class sport climbing — thousands of routes in orange limestone" },
      { no: "Svampdykkertradisjon med museum og aktive dykkere", en: "Sponge-diving tradition with museum and active divers" },
      { no: "Pothia havn — fargerike nyklassisistiske kapteinsvillaer", en: "Pothia harbour — colourful neoclassical sea captains' mansions" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Pothia, utmerket i Vathy (dyp fjordbukt)", en: "Good from N-NW in Pothia, excellent in Vathy (deep fjord-like bay)" },
      bottom: { no: "Mudder i Vathy, sand i Pothia", en: "Mud in Vathy, sand in Pothia" },
      depth: "5-15m",
      facilities: { no: "Kai i Pothia, vann, drivstoff, butikker", en: "Quay in Pothia, water, fuel, shops" }
    },
    restaurants: [
      { name: "Stukas", specialty: { no: "Barasti-taverna ved stranden, grillet blekksprut og sjømat", en: "Barasti taverna on the beach, grilled octopus and seafood" }, price: "€€" },
      { name: "Pandelis", specialty: { no: "Sjømat-institusjon i Pothia havn, dagfersk fangst", en: "Seafood institution in Pothia harbour, daily fresh catch" }, price: "€€" }
    ],
    mustDo: { no: "Besøk den fjordlignende Vathy-bukta med seilbåten — omgitt av stupbratte klipper og olivenlunder", en: "Visit the fjord-like Vathy bay by sailboat — surrounded by sheer cliffs and olive groves" },
    localSpecialty: { no: "Mermizeli — lokal honningkake med sesamfrø, tradisjonelt servert til svampdykkerne", en: "Mermizeli — local honey cake with sesame seeds, traditionally served to the sponge divers" },
    image: "Kalymnos"
  },

  "kos": {
    name: "Kos",
    slug: "kos",
    region: "dodekanesene",
    lat: 36.893,
    lng: 26.943,
    tagline: { no: "Hippokrates' fødested — medisinens vugge med det eldste platantreet i Europa", en: "Birthplace of Hippocrates — the cradle of medicine with the oldest plane tree in Europe" },
    description: { no: "Hippokrates — medisinens far — ble født her. Asklepieion-helligdommen der han underviste ligger på en bakketopp med utsikt til Tyrkia. Hippokrates' platantre på torget er angivelig 2400 år gammelt. Johannitterborgen dominerer havnen.", en: "Hippocrates — the father of medicine — was born here. The Asklepieion sanctuary where he taught sits on a hilltop overlooking Turkey. The Plane Tree of Hippocrates in the square is said to be 2,400 years old. The Castle of the Knights dominates the harbour." },
    highlights: [
      { no: "Asklepieion — medisinens helligdom der Hippokrates underviste", en: "Asklepieion — the sanctuary of medicine where Hippocrates taught" },
      { no: "Hippokrates' platantre — angivelig 2400 år, Europas eldste", en: "Plane Tree of Hippocrates — said to be 2,400 years old, the oldest in Europe" },
      { no: "Johannitterborgen (1300-tallet) i havnen, godt bevart", en: "Castle of the Knights (14th century) in the harbour, well preserved" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Kos marina", en: "Good from N-NW in Kos marina" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "3-8m",
      facilities: { no: "Full service marina: vann, strøm, drivstoff, butikker", en: "Full service marina: water, electricity, fuel, shops" }
    },
    restaurants: [
      { name: "Petrino", specialty: { no: "Tradisjonell gresk i steinbygning i gamlebyen", en: "Traditional Greek in a stone building in the old town" }, price: "€€" },
      { name: "H2O", specialty: { no: "Sjømat med utsikt mot Tyrkia, kreative fiskeretter", en: "Seafood with views towards Turkey, creative fish dishes" }, price: "€€€" }
    ],
    mustDo: { no: "Besøk Asklepieion ved soloppgang — terrassene med utsikt over Tyrkia i morgenlyset, nesten alene", en: "Visit the Asklepieion at sunrise — the terraces overlooking Turkey in the morning light, almost alone" },
    localSpecialty: { no: "Koukouvagia-brød — «ugle-brød» formet som en fugl, bakt til påske men tilgjengelig hele sommeren", en: "Koukouvagia bread — 'owl bread' shaped like a bird, baked for Easter but available all summer" },
    image: "Kos"
  },

  "nisyros": {
    name: "Nisyros",
    slug: "nisyros",
    region: "dodekanesene",
    lat: 36.586,
    lng: 27.167,
    tagline: { no: "Levende vulkankrater du kan gå ned i — Dodekanesenes mest unike opplevelse", en: "A living volcanic crater you can walk into — the most unique experience in the Dodecanese" },
    description: { no: "Nisyros er en aktiv vulkansk øy der du bokstavelig talt kan gå ned i krateret. Stefanos-krateret er 300 meter bredt og lukter av svovel. Mandraki med den venetianske festningen og Panagia Spiliani-klosteret i grotten er uventet sjarmerende. Nesten ingen turister utover dagsbåter.", en: "Nisyros is an active volcanic island where you can literally walk down into the crater. The Stefanos crater is 300 metres wide and smells of sulphur. Mandraki with its Venetian fortress and the Panagia Spiliani monastery built into a cave is unexpectedly charming. Almost no tourists beyond day boats." },
    highlights: [
      { no: "Stefanos vulkankrater — 300 meter bredt, du går ned i det", en: "Stefanos volcanic crater — 300 metres wide, you walk down into it" },
      { no: "Panagia Spiliani — kloster bygget inn i en naturlig grotte", en: "Panagia Spiliani — monastery built into a natural cave" },
      { no: "Mandraki — fargerik havneby med venetiansk festning", en: "Mandraki — colourful harbour town with a Venetian fortress" }
    ],
    anchorage: {
      protection: { no: "God fra N-NE i Mandraki, moderat i Pali", en: "Good from N-NE in Mandraki, moderate in Pali" },
      bottom: { no: "Vulkansk sand og stein", en: "Volcanic sand and rock" },
      depth: "3-8m",
      facilities: { no: "Kai i Mandraki, vann, begrenset drivstoff", en: "Quay in Mandraki, water, limited fuel" }
    },
    restaurants: [
      { name: "Irini", specialty: { no: "Tradisjonell mat i Mandraki med havutsikt, kaninstuing", en: "Traditional food in Mandraki with sea views, rabbit stew" }, price: "€€" },
      { name: "Aphrodite", specialty: { no: "Sjømat i Pali fiskerhavn, enkel og fersk", en: "Seafood in Pali fishing harbour, simple and fresh" }, price: "€€" }
    ],
    mustDo: { no: "Gå ned i Stefanos-krateret — svovelgass bobler opp fra sprekker i den varme bakken under føttene", en: "Walk down into the Stefanos crater — sulphur gas bubbles up from cracks in the hot ground beneath your feet" },
    localSpecialty: { no: "Soumada — mandeldrikk servert kald, Nisyros' erfriskende signatur", en: "Soumada — almond drink served cold, the refreshing signature of Nisyros" },
    image: "Nisyros"
  },

  "symi": {
    name: "Symi",
    slug: "symi",
    region: "dodekanesene",
    lat: 36.623,
    lng: 27.838,
    tagline: { no: "Pastell nyklassisistisk havn — Dodekanesenes vakreste førsteinntrykk", en: "Pastel neoclassical harbour — the most beautiful first impression in the Dodecanese" },
    description: { no: "Å seile inn i Symi havn er et av Egeerhavet mest spektakulære øyeblikk: hundrevis av pastellfargede nyklassisistiske hus klatrer opp fjellsidene. Øya var en gang rikere enn Rhodos takket være svampdykking. Panormitis-klosteret i sør tiltrekker pilgrimsreisende.", en: "Sailing into Symi harbour is one of the most spectacular moments in the Aegean: hundreds of pastel-coloured neoclassical houses climb the hillsides. The island was once wealthier than Rhodes thanks to sponge diving. The Panormitis monastery in the south attracts pilgrims." },
    highlights: [
      { no: "Gialos havn — hundrevis av pastellfargede nyklassisistiske hus i amfiteater", en: "Gialos harbour — hundreds of pastel-coloured neoclassical houses in an amphitheatre" },
      { no: "Panormitis-klosteret — pilgrimssted med ikoniske fresker", en: "Panormitis monastery — pilgrimage site with iconic frescoes" },
      { no: "Symi-reker — bittesmå, søte reker som kun finnes her", en: "Symi shrimp — tiny, sweet shrimp found only here" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Gialos havn", en: "Good from N-NW in Gialos harbour" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "4-12m",
      facilities: { no: "Kai, vann, drivstoff, restauranter og butikker langs havnen", en: "Quay, water, fuel, restaurants and shops along the harbour" }
    },
    restaurants: [
      { name: "Tholos", specialty: { no: "Sjømat-taverna med Symi-reker som spesialitet", en: "Seafood taverna with Symi shrimp as the speciality" }, price: "€€€" },
      { name: "Manos Fish Restaurant", specialty: { no: "Grillet fisk på kaien i Gialos, dagfersk", en: "Grilled fish on the quay in Gialos, daily fresh" }, price: "€€€" },
      { name: "Giorgos & Maria", specialty: { no: "Hjemmelaget gresk mat oppe i Chorio, fantastisk utsikt", en: "Homemade Greek food up in Chorio, fantastic views" }, price: "€€" }
    ],
    mustDo: { no: "Seil inn i Gialos havn ved solnedgang — pastellhusene gløder gylne og det er et av Grekenlands mest ikoniske syn", en: "Sail into Gialos harbour at sunset — the pastel houses glow golden and it is one of Greece's most iconic sights" },
    localSpecialty: { no: "Symi-reker — bittesmå, søte reker kun fra disse farvannene, grillet eller i pasta", en: "Symi shrimp — tiny, sweet shrimp only from these waters, grilled or in pasta" },
    image: "Symi"
  },

  "rhodes": {
    name: "Rhodes",
    slug: "rhodes",
    region: "dodekanesene",
    lat: 36.434,
    lng: 28.224,
    tagline: { no: "Europas best bevarte middelalderby og Lindos' akropolis over Egeerhavet", en: "Europe's best-preserved medieval town and the Acropolis of Lindos above the Aegean" },
    description: { no: "Rhodos' gammel by er Europas best bevarte middelalderby — UNESCO-verdensarv med 4 km bymur, Stormesterens palass og gater fra korsfarertiden. Lindos med sin akropolis 116 meter over havet er spektakulært. Kolossus av Rhodos stod en gang ved havnen.", en: "The Old Town of Rhodes is Europe's best-preserved medieval town — a UNESCO World Heritage Site with 4 km of city walls, the Palace of the Grand Master and streets from the Crusader era. Lindos with its acropolis 116 metres above the sea is spectacular. The Colossus of Rhodes once stood at the harbour." },
    highlights: [
      { no: "Middelalderby (UNESCO) — Europas best bevarte, 4 km bymur intakt", en: "Medieval town (UNESCO) — Europe's best preserved, 4 km of city walls intact" },
      { no: "Stormesterens palass — Johannitterordenens hovedkvarter", en: "Palace of the Grand Master — headquarters of the Knights of St. John" },
      { no: "Lindos akropolis — dorisk tempel 116 meter over turkist hav", en: "Acropolis of Lindos — Doric temple 116 metres above turquoise sea" }
    ],
    anchorage: {
      protection: { no: "God i Mandraki havn fra N-NW, marina i Rhodos by", en: "Good in Mandraki harbour from N-NW, marina in Rhodes town" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "3-10m",
      facilities: { no: "Full service marina, vann, strøm, drivstoff, verksted", en: "Full service marina, water, electricity, fuel, boatyard" }
    },
    restaurants: [
      { name: "Mavrikos", specialty: { no: "Familiedrevet i Lindos siden 1933, kreativ gresk med lokal fisk", en: "Family-run in Lindos since 1933, creative Greek with local fish" }, price: "€€€" },
      { name: "To Steno", specialty: { no: "Skjult taverna i gamlebyen, grillet lam og lokale mezedes", en: "Hidden taverna in the old town, grilled lamb and local mezedes" }, price: "€€" },
      { name: "Tamam", specialty: { no: "Moderne gresk i gamlebyen, god vinliste", en: "Modern Greek in the old town, good wine list" }, price: "€€€" }
    ],
    mustDo: { no: "Gå Riddergatens lengde i gamlebyen — middelalderens best bevarte gate i Europa, steinlagt med korsfarersymboler", en: "Walk the full length of the Street of the Knights in the old town — the best-preserved medieval street in Europe, paved with Crusader symbols" },
    localSpecialty: { no: "Melekouni — energibar fra sesam og honning, tradisjonelt servert i bryllup", en: "Melekouni — energy bar of sesame and honey, traditionally served at weddings" },
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
    tagline: { no: "60+ strender og Lalaria — Egeerhavet mest strandrike øy", en: "60+ beaches and Lalaria — the most beach-rich island in the Aegean" },
    description: { no: "Skiathos har over 60 strender på en øy du kan kjøre rundt på en time. Lalaria-stranden med hvite rullesteiner, naturlig steinbue og krystallklart vann er kun tilgjengelig med båt. Furuskog dekker mesteparten av øya ned til strandkanten.", en: "Skiathos has over 60 beaches on an island you can drive around in an hour. Lalaria beach with white pebbles, a natural stone arch and crystal-clear water is only accessible by boat. Pine forest covers most of the island right down to the waterline." },
    highlights: [
      { no: "Over 60 strender — fra lange sandstrender til skjulte bukter", en: "Over 60 beaches — from long sandy stretches to hidden coves" },
      { no: "Lalaria-stranden — hvite rullesteiner, naturlig steinbue, kun båttilgang", en: "Lalaria beach — white pebbles, natural stone arch, boat access only" },
      { no: "Furuskog helt ned til strandkanten — grønt møter turkist", en: "Pine forest right down to the waterline — green meets turquoise" }
    ],
    anchorage: {
      protection: { no: "God i Skiathos havn fra N-NE, flere beskyttede bukter rundt øya", en: "Good in Skiathos harbour from N-NE, several sheltered bays around the island" },
      bottom: { no: "Sand og sjøgress", en: "Sand and seagrass" },
      depth: "3-10m",
      facilities: { no: "Kai i havnen, vann, drivstoff, full proviantering", en: "Quay in the harbour, water, fuel, full provisioning" }
    },
    restaurants: [
      { name: "Marmita", specialty: { no: "Kreativ gresk mat i gamlebyen, reservér i forveien", en: "Creative Greek cuisine in the old town, book ahead" }, price: "€€€" },
      { name: "Alexandros", specialty: { no: "Taverna med havutsikt i gamlebyen, tradisjonelle retter", en: "Taverna with sea views in the old town, traditional dishes" }, price: "€€" }
    ],
    mustDo: { no: "Seil til Lalaria-stranden om morgenen — hvite rullesteiner, turkist vann og en naturlig steinbue, helt magisk", en: "Sail to Lalaria beach in the morning — white pebbles, turquoise water and a natural stone arch, pure magic" },
    localSpecialty: { no: "Tyropita Skiathou — lokal ostepai med geiteost foldet i spiralform", en: "Tyropita Skiathou — local cheese pie with goat cheese folded in a spiral" },
    image: "Skiathos"
  },

  "skopelos": {
    name: "Skopelos",
    slug: "skopelos",
    region: "sporadene",
    lat: 39.122,
    lng: 23.727,
    tagline: { no: "Mamma Mia-øya — Agios Ioannis-kapellet på klippen og plommelunder", en: "The Mamma Mia island — the Agios Ioannis chapel on the cliff and plum orchards" },
    description: { no: "Skopelos ble verdensberømt da 'Mamma Mia!' ble filmet her. Agios Ioannis Kastri-kapellet på en klippe over havet er ikonisk — bryllupsscenen ble filmet her. Øya er også kjent for plommer (prunes), mandler og furuskog som dekker 80% av overflaten.", en: "Skopelos became world-famous when 'Mamma Mia!' was filmed here. The Agios Ioannis Kastri chapel on a cliff above the sea is iconic — the wedding scene was filmed here. The island is also known for plums (prunes), almonds and pine forest covering 80% of its surface." },
    highlights: [
      { no: "Agios Ioannis Kastri — kapellet på klippen fra 'Mamma Mia!'", en: "Agios Ioannis Kastri — the clifftop chapel from 'Mamma Mia!'" },
      { no: "Skopelos by — en av Grekenlands vakreste havnebyer med 120 kirker", en: "Skopelos town — one of Greece's most beautiful harbour towns with 120 churches" },
      { no: "80% skogdekke — den grønneste øya i Egeerhavet", en: "80% forest cover — the greenest island in the Aegean" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Skopelos havn, Panormos-bukta godt beskyttet", en: "Good from N-NW in Skopelos harbour, Panormos bay well sheltered" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "4-12m",
      facilities: { no: "Kai i Skopelos by, vann, drivstoff, butikker", en: "Quay in Skopelos town, water, fuel, shops" }
    },
    restaurants: [
      { name: "Adrina Taverna", specialty: { no: "Sjømat med utsikt over Panormos-bukta", en: "Seafood with views over Panormos bay" }, price: "€€€" },
      { name: "Agnanti", specialty: { no: "Moderne gresk med panoramautsikt fra Glossa, prisvinnende", en: "Modern Greek with panoramic views from Glossa, award-winning" }, price: "€€€" },
      { name: "Finikas", specialty: { no: "Tradisjonell taverna i havnen, grillet dagsfangst", en: "Traditional taverna in the harbour, grilled catch of the day" }, price: "€€" }
    ],
    mustDo: { no: "Gå de 110 trinnene opp til Agios Ioannis Kastri-kapellet — utsikten er like bra som i filmen", en: "Climb the 110 steps to the Agios Ioannis Kastri chapel — the view is just as good as in the film" },
    localSpecialty: { no: "Skopelos plommepai — kotopita med lokale svisker og kanel, søt-salt magi", en: "Skopelos plum pie — kotopita with local prunes and cinnamon, sweet-savoury magic" },
    image: "Skopelos"
  },

  "alonissos": {
    name: "Alonissos",
    slug: "alonissos",
    region: "sporadene",
    lat: 39.150,
    lng: 23.865,
    tagline: { no: "Nasjonal marinpark med munkeseler — Middelhavets mest beskyttede hav", en: "National marine park with monk seals — the most protected waters in the Mediterranean" },
    description: { no: "Alonissos er senteret i Grekenlands nasjonale marinpark — det største marine verneområdet i Europa. Middelhavets sjeldne munkesel lever her. Undervannssarkeologi avsløre antikke skipsvrak du kan dykke til. Gamlebyen Palio Alonissos ligger forlatt men delvis restaurert på åskammen.", en: "Alonissos is at the centre of Greece's national marine park — the largest marine protected area in Europe. The rare Mediterranean monk seal lives here. Underwater archaeology reveals ancient shipwrecks you can dive to. The old town of Palio Alonissos sits abandoned but partly restored on the hilltop." },
    highlights: [
      { no: "Nasjonal marinpark — Europas største marine verneområde", en: "National marine park — Europe's largest marine protected area" },
      { no: "Middelhavs-munkesel (Monachus monachus) — verdens sjeldneste sel", en: "Mediterranean monk seal (Monachus monachus) — the world's rarest seal" },
      { no: "Antikke skipsvrak for dykking — undervannssarkeologisk museum", en: "Ancient shipwrecks for diving — underwater archaeological museum" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Patitiri, flere beskyttede bukter i parken", en: "Good from N-NW in Patitiri, several sheltered bays within the park" },
      bottom: { no: "Sand og sjøgress (posidonia)", en: "Sand and seagrass (posidonia)" },
      depth: "4-15m",
      facilities: { no: "Kai i Patitiri, vann, drivstoff, butikker", en: "Quay in Patitiri, water, fuel, shops" }
    },
    restaurants: [
      { name: "Archipelagos", specialty: { no: "Sjømat med panoramautsikt i Patitiri", en: "Seafood with panoramic views in Patitiri" }, price: "€€€" },
      { name: "Astrofengia", specialty: { no: "Taverna i Palio Alonissos gamlebyen, lokal mat og solnedgang", en: "Taverna in Palio Alonissos old town, local food and sunset" }, price: "€€" }
    ],
    mustDo: { no: "Ta en båttur inn i marinparken — sjansen for å se munkeseler er reell, og de ubebodde øyene er urørte", en: "Take a boat trip into the marine park — the chance of spotting monk seals is real, and the uninhabited islands are pristine" },
    localSpecialty: { no: "Villsamlet sjøfennikel (kritamo) marinert i olje og eddik — vokser på klippene", en: "Wild-foraged sea fennel (kritamo) marinated in oil and vinegar — grows on the cliffs" },
    image: "Alonissos"
  },

  "alonissos-marinpark": {
    name: "Alonissos Marinpark",
    slug: "alonissos-marinpark",
    region: "sporadene",
    lat: 39.145,
    lng: 23.860,
    tagline: { no: "Hviledag i Alonissos' marine verneområde", en: "Rest day in Alonissos' marine protected waters" },
    description: { no: "Denne stoppet representerer en rolig dag i og rundt den nasjonale marine parken. Fokus er natur, klart vann og respekt for verneområdets regler.", en: "This stop represents a quiet day in and around the national marine park. The focus is nature, clear water, and respecting protected-area rules." },
    highlights: [
      { no: "Store sjanser for delfin-observasjoner i rolige perioder", en: "Good chances of dolphin sightings in calm periods" },
      { no: "Adgang til skjermede bukter med svært klart vann", en: "Access to sheltered coves with very clear water" },
      { no: "Nærhet til Patitiri for forsyninger", en: "Close to Patitiri for provisioning" }
    ],
    anchorage: {
      protection: { no: "Varierer mellom buktene; velg etter vindretning", en: "Varies by bay; choose according to wind direction" },
      bottom: { no: "Sand og sjøgress", en: "Sand and seagrass" },
      depth: "4-15m",
      facilities: { no: "Basis i Patitiri: vann, drivstoff, butikker", en: "Basics in Patitiri: water, fuel, shops" }
    },
    restaurants: [
      { name: "Ostria", specialty: { no: "Sjømat i Patitiri havn", en: "Seafood in Patitiri harbor" }, price: "€€" },
      { name: "Menta", specialty: { no: "Lokale retter i gamlebyen", en: "Local dishes in the old town" }, price: "€€" }
    ],
    mustDo: { no: "Legg opp dagen rundt korte svømmeturer og rolig naturutforskning", en: "Plan the day around short swims and quiet nature exploration" },
    localSpecialty: { no: "Kritamo og lokal honning", en: "Sea fennel and local honey" },
    image: "Alonissos"
  },

  "skyros": {
    name: "Skyros",
    slug: "skyros",
    region: "sporadene",
    lat: 38.903,
    lng: 24.562,
    tagline: { no: "Skyros-hester og bysantinsk festning — Sporadenes villeste og mest isolerte øy", en: "Skyrian horses and a Byzantine fortress — the wildest and most isolated island of the Sporades" },
    description: { no: "Skyros er delt i to: grønn og frodig i nord, steinete og gold i sør. Skyros-ponnier — en av verdens sjeldneste hesteraser — lever halvvilt her. Chora med den bysantinske festningen over havet er kompakt og autentisk. Rupert Brooke er gravlagt på øya.", en: "Skyros is split in two: green and lush in the north, rocky and barren in the south. Skyrian ponies — one of the world's rarest horse breeds — live semi-wild here. Chora with its Byzantine fortress above the sea is compact and authentic. Rupert Brooke is buried on the island." },
    highlights: [
      { no: "Skyros-ponnier — en av verdens sjeldneste hesteraser, lever halvvilt", en: "Skyrian ponies — one of the world's rarest horse breeds, living semi-wild" },
      { no: "Bysantinsk festning (Kastro) over Chora med panoramautsikt", en: "Byzantine fortress (Kastro) above Chora with panoramic views" },
      { no: "Todelt landskap — grønn nord og dramatisk steinete sør", en: "Dual landscape — green north and dramatically rocky south" }
    ],
    anchorage: {
      protection: { no: "God fra N-NW i Linaria-havnen", en: "Good from N-NW in Linaria harbour" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "3-10m",
      facilities: { no: "Kai i Linaria, vann, drivstoff, minimarked", en: "Quay in Linaria, water, fuel, minimarket" }
    },
    restaurants: [
      { name: "Manos", specialty: { no: "Familietaverna i Chora med lokal geiterett og skyriansk ost", en: "Family taverna in Chora with local goat dishes and Skyrian cheese" }, price: "€€" },
      { name: "Istories tou Barba", specialty: { no: "Kreativ gresk i Chora, god vinliste", en: "Creative Greek in Chora, good wine list" }, price: "€€" }
    ],
    mustDo: { no: "Besøk Skyros-ponniene på den søndre delen av øya — de halvville hestene lever mellom steinene", en: "Visit the Skyrian ponies in the southern part of the island — the semi-wild horses live among the rocks" },
    localSpecialty: { no: "Skyros lobster pasta — hummer kokt med pasta i tomatsaus, øyas stolthet", en: "Skyros lobster pasta — lobster cooked with pasta in tomato sauce, the island's pride" },
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
    tagline: { no: "Grekenlands nest største øy — Chalkis-broen med den uforklarlige tidevannsstrømmen", en: "Greece's second-largest island — the Chalkis bridge with the inexplicable tidal current" },
    description: { no: "Evia er Grekenlands nest største øy, men føles ikke som en øy — den er forbundet med fastlandet via bro ved Chalkis. Tidevannsstrømmen i Euripos-sundet snur retning opptil 14 ganger daglig, noe Aristoteles angivelig studerte uten å finne svaret. Varierte landskap fra fjell til termiske kilder.", en: "Evia is Greece's second-largest island, but it doesn't feel like an island — it is connected to the mainland by a bridge at Chalkis. The tidal current in the Euripus Strait reverses direction up to 14 times daily, something Aristotle reportedly studied without finding the answer. Varied landscapes from mountains to thermal springs." },
    highlights: [
      { no: "Euripos-strømmen — snur retning opptil 14 ganger om dagen, uforklart siden Aristoteles", en: "Euripus current — reverses direction up to 14 times a day, unexplained since Aristotle" },
      { no: "Grekenlands nest største øy med enormt variert terreng", en: "Greece's second-largest island with enormously varied terrain" },
      { no: "Loutra Aidipsos — termiske kilder brukt siden antikken", en: "Loutra Aidipsos — thermal springs used since antiquity" }
    ],
    anchorage: {
      protection: { no: "Varierer — mange beskyttede bukter langs vestkysten", en: "Varies — many sheltered bays along the west coast" },
      bottom: { no: "Sand, mudder, sjøgress avhengig av sted", en: "Sand, mud, seagrass depending on location" },
      depth: "3-15m",
      facilities: { no: "Varierer — Chalkis og Karystos har best fasiliteter", en: "Varies — Chalkis and Karystos have the best facilities" }
    },
    restaurants: [
      { name: "Nea Elvetia", specialty: { no: "Sjømat i Karystos, utsikt mot Kafireas-kanalen", en: "Seafood in Karystos, views towards the Kafireas Channel" }, price: "€€" },
      { name: "Bourtzi", specialty: { no: "Fiskeaverna i Chalkis ved Euripos-broen", en: "Fish taverna in Chalkis by the Euripus bridge" }, price: "€€" }
    ],
    mustDo: { no: "Se tidevannsstrømmen snu i Euripos-sundet fra Chalkis-broen — et naturfenomen som forbauset Aristoteles", en: "Watch the tidal current reverse in the Euripus Strait from the Chalkis bridge — a natural phenomenon that baffled Aristotle" },
    localSpecialty: { no: "Figs of Evia — PDO-beskyttet fikenvariant, tørket og servert med honning og valnøtter", en: "Figs of Evia — PDO-protected fig variety, dried and served with honey and walnuts" },
    image: "South Evia"
  },

  "evia-sør": {
    name: "Evia Sør",
    slug: "evia-sør",
    region: "sporadene",
    lat: 38.010,
    lng: 24.230,
    tagline: { no: "Karystos-området på sør-Evia, med trygg havn før nordlige etapper", en: "Karystos area in southern Evia, with a secure harbor before northern legs" },
    description: { no: "Sør-Evia brukes som mellomstopp mellom Attika og Sporadene. Karystos gir gode forsyningsmuligheter og en praktisk havn for værvindu videre nordover.", en: "South Evia is used as a transition stop between Attica and the Sporades. Karystos provides good provisioning and a practical harbor while waiting for a weather window northbound." },
    highlights: [
      { no: "Praktisk værvindu-stopp ved kryssing mot Skyros/Sporadene", en: "Practical weather-window stop before crossing to Skyros/Sporades" },
      { no: "Karystos med dagligliv og mindre charterpress", en: "Karystos with local daily life and less charter pressure" },
      { no: "God base for tidlig avgang neste dag", en: "Good base for an early departure the next day" }
    ],
    anchorage: {
      protection: { no: "Karystos havn gir god beskyttelse i moderate forhold", en: "Karystos harbor offers good protection in moderate conditions" },
      bottom: { no: "Sand og mudder", en: "Sand and mud" },
      depth: "3-10m",
      facilities: { no: "Kai, vann, drivstoff og proviantering", en: "Quay, water, fuel, and provisioning" }
    },
    restaurants: [
      { name: "Aegea", specialty: { no: "Sjømat ved havnepromenaden", en: "Seafood by the harbor promenade" }, price: "€€" },
      { name: "To Kima", specialty: { no: "Klassisk taverna med enkle lokale retter", en: "Classic taverna with simple local dishes" }, price: "€€" }
    ],
    mustDo: { no: "Bruk stoppet til værbrief, proviantering og tidlig natt før lengre etappe", en: "Use this stop for weather briefing, provisioning, and an early night before a longer leg" },
    localSpecialty: { no: "Lokale fiken og ost fra Evia", en: "Local Evia figs and cheese" },
    image: "Evia Sør"
  }

};
