/* ============================================
   Forberedelsesinnhold — Seiltur Hellas 2026
   Basert på research av 25+ kilder
   ============================================ */

const PREP_CONTENT = {

  // ---- LIVET OM BORD ----
  boatLife: {
    title: 'Livet om bord',
    subtitle: 'Hva du kan forvente av to uker på seilbåt',
    icon: '⛵',
    sections: [
      {
        heading: 'Plass og oppbevaring',
        body: `Lugarene er kompakte — en dobbelseng med begrenset takhøyde og små skap. Det er ingenting som ligner et hotellrom. Alt du har med må passe i smale skap og nettinghyller. Bruk <strong>myk bag</strong> (aldri koffert!) som kan brettes flat når den er tom. Pakk lett — du kommer til å leve i badeklær 80% av tiden.

Fellesarealet er salong (innendørs) og cockpit (utendørs). Du kommer til å tilbringe mesteparten av tiden i cockpit.`,
      },
      {
        heading: 'Toalettet (the head)',
        body: `Ombord kalles toalettet "the head". Det fungerer annerledes enn hjemme:

<strong>Gullregelen:</strong> Ingenting går ned i toalettet som du ikke har spist først. Toalettpapir kastes i søppelbøtten ved siden av — aldri i toalettet.

Manuelt toalett krever pumping (10-12 pumpetak). Elektrisk toalett har to knapper. Begge typene demonstreres på dag 1. Et tett maritimt toalett er en alvorlig (og ekkel) situasjon. Vær forsiktig.`,
      },
      {
        heading: 'Gruppedynamikk',
        body: `To uker på relativt liten plass med flere mennesker krever litt bevisst innsats:

• <strong>Fordel oppgaver tidlig</strong> — oppvask, rengjøring, matansvar, fortøyningshjelp
• <strong>Respekter alenetid</strong> — baugen, en stille del av cockpit, en spasertur på land
• <strong>Vær fleksibel med reiseruten</strong> — vær trumfer planer, skipperen har siste ord
• <strong>Sol og tretthet gjør folk irritable</strong> — drikk vann, sov godt, vær tålmodig`,
      },
      {
        heading: 'Mat og proviantering',
        body: `Du trenger IKKE å handle for to uker på dag 1. Greske øyer, selv små, har butikker og bakerier. Dere stopper nesten hver dag.

<strong>Dag 1 (Athen):</strong> Vann, pasta, ris, olivenolje, kaffe, frukt, grønnsaker, brød, feta, oliven, egg, yoghurt, snacks, vin/øl.

<strong>Underveis:</strong> Ferskt brød fra lokale bakerier daglig. Fisk fra fiskere eller marked. Etterfyll vann og is.

<strong>Typisk måltidsmønster:</strong>
• Frokost om bord: Yoghurt + honning, brød + ost, kaffe
• Lunsj om bord: Gresk salat, smørbrød, hummus
• Middag: Veksle mellom taverna på land og grilling/matlaging om bord

Tips: Å spise ute hver kveld i to uker blir dyrt. Veksle med matlaging om bord.`,
      },
      {
        heading: 'Søvn på sjøen',
        body: `Båten gynger. For noen er det beroligende, for andre tar det 1-2 netter å venne seg til.

• <strong>Ørepropper er essensielle</strong> — fenderknirking, vantskramling, bølgeskvulp, nabobåter, havnerestauranter
• <strong>Sovemaske hjelper</strong> — tidlig middelhavs-soloppgang lyser opp lugaren
• <strong>Forut-lugarer har mest bevegelse</strong>, akter-lugarer er roligst
• På monoskrog: Prøv å sove på tvers (side til side) i stedet for langs — det reduserer gyngefølelsen`,
      },
      {
        heading: 'En typisk dag',
        body: `<strong>07:00–08:30</strong> — Våkne, kaffe, frokost i cockpit, bad
<strong>09:00–10:00</strong> — Kaste loss, seil settes
<strong>10:00–14:00</strong> — Seiling til neste destinasjon (3-6 timer typisk)
<strong>14:00–15:00</strong> — Ankomst, ankring eller fortøyning, bad
<strong>15:00–18:00</strong> — Utforske øya, snorkling, hvile, strand
<strong>18:00–19:00</strong> — Sundowner i cockpit, klargjøring for kvelden
<strong>20:00–22:00</strong> — Middag (taverna eller om bord)
<strong>22:00+</strong> — Stjernekikking fra dekk, kort/spill, tidlig kveld`,
      },
    ],
  },

  // ---- SJØSYKE ----
  seasickness: {
    title: 'Sjøsyke',
    subtitle: 'Forebygging og håndtering',
    icon: '💊',
    sections: [
      {
        heading: 'Slik fungerer sjøsyke',
        body: `Sjøsyke oppstår når hjernen mottar motstridende signaler fra øynene (som ser en stabil kahytt) og balanseorganet i øret (som kjenner bevegelse). Nesten alle kan bli sjøsyke under riktige forhold.

<strong>Den gode nyheten:</strong> De fleste tilvenner seg innen 24-48 timer. De første dagene er verst, deretter tilpasser kroppen seg. I slutten av mai er Meltemi-vinden mild (F3-4), så forholdene er ganske behagelige.`,
      },
      {
        heading: 'Medisiner',
        body: `<strong>Viktigst:</strong> Ta medisin FØR du blir kvalm. Når kvalmen har begynt, er det mye vanskeligere å stoppe. Start kvelden før eller morgenen på første seiledag.`,
        medications: [
          {
            name: 'Stugeron (cinnarizin)',
            dosage: '30mg (2 tabletter) 2 timer før seiling, deretter 15mg hver 8. time',
            notes: 'Seilernes favoritt. I en undersøkelse svarte 96% at den var effektiv. Kjøpes reseptfritt på apotek (farmakeio) i Hellas. Mild døsighet, tørr munn. Billig og lett tilgjengelig.',
            rating: '⭐ Anbefalt',
          },
          {
            name: 'Scopoderm (skopolamin-plaster)',
            dosage: 'Plaster bak øret, varer 72 timer. Påføres 6-8 timer FØR forventet bevegelse',
            notes: 'Praktisk for flerdag-seiling. Krever resept. Bivirkninger: tørr munn, tåkesyn, døsighet. Ikke kombiner med alkohol.',
            rating: 'Effektiv',
          },
          {
            name: 'Bonine (meclizin)',
            dosage: '25-50mg 1 time før seiling, varer 24 timer',
            notes: 'Mindre døsig enn Dramamine. Reseptfritt. God balanse mellom effekt og bivirkninger.',
            rating: 'God',
          },
          {
            name: 'Dramamine (dimenhydrinat)',
            dosage: '50-100mg 30-60 min før seiling',
            notes: 'Klassikeren, men betydelig døsighet (83% rapporterer bivirkninger). "Less Drowsy"-versjonen (meclizin-basert) er mye bedre.',
            rating: 'OK',
          },
        ],
      },
      {
        heading: 'Naturlige tiltak',
        body: `• <strong>Ingefær</strong> — vitenskapelig bevist å hjelpe mot kvalme. Ingefærkapsler, -drops, eller -te. Ingen bivirkninger, kan kombineres med medisiner
• <strong>Akupressur-armbånd (Sea-Band)</strong> — fungerer for noen, ingen bivirkninger, rimelige. Verdt å prøve som supplement
• <strong>Grønt eple</strong> — gammel seilertradisjon, mange sverger til det`,
      },
      {
        heading: 'Tips fra erfarne seilere',
        body: `1. <strong>Hold deg på dekk og se på horisonten</strong> — å gå under dekk er den raskeste veien til kvalme
2. <strong>Styr båten</strong> — å aktivt styre reduserer sjøsyke dramatisk fordi hjernen forventer bevegelsen
3. <strong>Hold deg hydrert og spis lett</strong> — kjeks, brød, ingefærkjeks. Unngå tungt/fettet mat
4. <strong>Unngå lesing og skjermer underveis</strong>
5. <strong>Test medisinen hjemme først</strong> — forstå hvordan den påvirker deg
6. <strong>Sov godt</strong> — tretthet forverrer sjøsyke`,
      },
    ],
  },

  // ---- PAKKELISTE ----
  packingList: {
    title: 'Pakkeliste',
    subtitle: 'Forslag til hva du bør ha med — Hellas i slutten av mai',
    icon: '🎒',
    categories: [
      {
        id: 'bag',
        name: 'Bag',
        icon: '👜',
        items: [
          { text: 'Myk duffelbag eller ryggsekk (ALDRI hard koffert!)', essential: true },
          { text: 'Tørrsekk/dry bag (5-10L) for elektronikk', essential: true },
          { text: 'Ziplock-poser (diverse størrelser)', essential: false },
        ],
      },
      {
        id: 'clothing',
        name: 'Klær',
        icon: '👕',
        items: [
          { text: 'Badeklær / badeshorts (2-3 stk)', essential: true },
          { text: 'Lette shorts (2-3 stk)', essential: true },
          { text: 'T-skjorter / singlet (3-4 stk, quick-dry)', essential: true },
          { text: 'UV-trøye / rashguard (langarm)', essential: true },
          { text: 'Lett fleece / genser for kvelden', essential: true },
          { text: 'Vindjakke / lett regnjakke', essential: true },
          { text: 'Ett fint antrekk for taverna-kveld', essential: true },
          { text: 'Sarong / pareo (allsidig: håndkle, dekke, teppe)', essential: false },
          { text: 'Undertøy (quick-dry syntetisk)', essential: true },
        ],
      },
      {
        id: 'footwear',
        name: 'Sko (maks 3 par)',
        icon: '👟',
        items: [
          { text: 'Seilersko / dekksko med LYSE, ikke-merkende såler', essential: true },
          { text: 'Vannsko / reefsko (greske strender er steinete!)', essential: true },
          { text: 'Sandaler / flip-flops for land', essential: true },
        ],
      },
      {
        id: 'sun',
        name: 'Solbeskyttelse',
        icon: '☀️',
        items: [
          { text: 'Solkrem SPF50+ (2 store flasker, kjøp hjemme — 16-22€ i Hellas)', essential: true },
          { text: 'Solhatt med bred brem (som kan festes — vinden tar den!)', essential: true },
          { text: 'Polariserte solbriller (reduserer blending fra vannet)', essential: true },
          { text: 'UV-leppepomade med SPF', essential: true },
          { text: 'After-sun / aloe vera', essential: true },
          { text: 'IKKE spray-solkrem (gjør dekket glatt og farlig)', essential: false },
        ],
      },
      {
        id: 'health',
        name: 'Helse',
        icon: '💊',
        items: [
          { text: 'Sjøsyketabletter (Stugeron — kjøpes i Hellas)', essential: true },
          { text: 'Personlige medisiner (nok for hele turen + ekstra dager)', essential: true },
          { text: 'Reiseapotek: ibuprofen, plaster, antiseptisk krem', essential: true },
          { text: 'Antihistaminkrem for insektsbitt', essential: false },
          { text: 'Anti-diaré tabletter', essential: false },
          { text: 'Insektsmiddel (mygg ved havner om kvelden)', essential: true },
        ],
      },
      {
        id: 'documents',
        name: 'Dokumenter',
        icon: '📄',
        items: [
          { text: 'Pass / ID', essential: true },
          { text: 'Europeisk helsetrygdkort (EHIC)', essential: true },
          { text: 'Reiseforsikring (print en kopi)', essential: true },
          { text: 'Kontanter i euro (mange små øyer er cash-only)', essential: true },
          { text: 'Bank-/kredittkort', essential: true },
          { text: 'Seilersertifikat om du har (ICC)', essential: false },
          { text: 'Kopi av bookingbekreftelser', essential: false },
        ],
      },
      {
        id: 'practical',
        name: 'Praktisk',
        icon: '🔧',
        items: [
          { text: 'Vanntett mobildeksel', essential: true },
          { text: 'Hodelykt (IPX67, med rød LED for natt)', essential: true },
          { text: 'Klyperl / klesklyper (6-10 stk, for tørking på livlinen)', essential: true },
          { text: 'Vannflaske (refill)', essential: true },
          { text: 'Europeisk strømadapter + USB-lader (multi-port)', essential: true },
          { text: 'Powerbank 20.000mAh+ (begrenset lading om bord)', essential: true },
          { text: 'Ørepropper', essential: true },
          { text: 'Sovemaske', essential: true },
          { text: 'Lite mikrofiberhåndkle (tørker raskt)', essential: true },
          { text: 'Liten vaskepose / vaskemiddel for håndvask', essential: false },
        ],
      },
      {
        id: 'fun',
        name: 'Underholdning',
        icon: '🎲',
        items: [
          { text: 'Snorkelmaske + snorkel', essential: false },
          { text: 'Kindle / e-leser (vanntett!)', essential: false },
          { text: 'Kortspill (Uno, vanlig kortstokk)', essential: false },
          { text: 'Bluetooth-høyttaler (én per gruppe, vanntett)', essential: false },
          { text: 'Nedlastede podcaster, musikk, lydbøker', essential: false },
          { text: 'Liten dagssekk for øy-utflukter', essential: false },
          { text: 'GoPro / undervannkamera', essential: false },
          { text: 'Notatbok + penn', essential: false },
        ],
      },
    ],
    notBring: [
      'Hard koffert (kan ikke oppbevares)',
      'Mer enn 3 par sko',
      'Fysiske bøker (tunge, tar plass — bruk Kindle)',
      'Hårføner / rettetang (ingen strøm til dette)',
      'Dyrt smykker (mistes, skades)',
      'Store håndklær (tar evig å tørke)',
      'Fulle toalettartikler (dekanter til små flasker)',
      'Laptop OG nettbrett OG e-leser (velg én)',
      'Formelle klær (Hellas er casual)',
      'Spray-solkrem (gjør dekket glatt)',
    ],
    goldenRule: 'Pakk det du tror du trenger. Fjern halvparten.',
  },

  // ---- VÆR & FORHOLD ----
  weather: {
    title: 'Vær og forhold',
    subtitle: 'Hva du kan forvente i slutten av mai',
    conditions: [
      { label: 'Lufttemperatur', value: '25-28°C (dag), 18-20°C (kveld)', icon: '🌡' },
      { label: 'Sjøtemperatur', value: '18-22°C — svømmbart, men friskt', icon: '🌊' },
      { label: 'Meltemi-vind', value: 'Mild i mai (F3-4), styrke om ettermiddagen', icon: '💨' },
      { label: 'Regn', value: 'Tilnærmet null. Klar himmel.', icon: '☀️' },
      { label: 'UV-stråling', value: 'Svært sterk, forsterket av vannrefleksjon', icon: '⚡' },
    ],
  },
};
