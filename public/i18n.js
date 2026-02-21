/* ============================================
   i18n — Lightweight bilingual support (NO/EN)
   Load BEFORE all other scripts
   ============================================ */

var I18n = (function () {
  'use strict';

  var STORAGE_KEY = 'seilruter-lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'no';

  // ---- UI String Translations ----
  var strings = {

    // Entry screen
    'entry.eyebrow':       { no: 'EN SEILTUR I HELLAS', en: 'A SAILING TRIP IN GREECE' },
    'entry.title':         { no: 'Hvor skal vi<br><em>seile?</em>', en: 'Where shall we<br><em>sail?</em>' },
    'entry.intro':         { no: '8 ruter gjennom det greske øyriket. 14 dager. April\u2013mai 2026. Utforsk rutene, se detaljene, og stem på din favoritt.',
                             en: '8 routes through the Greek islands. 14 days. April\u2013May 2026. Explore the routes, see the details, and vote for your favourite.' },
    'entry.featureVote':   { no: 'Stem på din favorittute', en: 'Vote for your favourite route' },
    'entry.featurePacking': { no: 'Personlig pakkeliste', en: 'Personal packing list' },
    'entry.featureCountdown': { no: 'Nedtelling til avgang', en: 'Countdown to departure' },
    'entry.featureNotes':  { no: 'Private reisenotater', en: 'Private travel notes' },
    'entry.button':        { no: 'Se rutene', en: 'See the routes' },
    'entry.createAccount': { no: 'Opprett konto / Logg inn', en: 'Create account / Log in' },
    'entry.prepLink':      { no: 'Eller se forberedelser til turen', en: 'Or see trip preparations' },
    'entry.footnote':      { no: '18. april \u2013 2. mai 2026', en: 'April 18 \u2013 May 2, 2026' },

    // Top bar / navigation
    'header.title':        { no: 'SEILRUTER HELLAS 2026', en: 'SAILING ROUTES GREECE 2026' },
    'tab.explore':         { no: 'Utforsk', en: 'Explore' },
    'tab.vote':            { no: 'Stem', en: 'Vote' },
    'tab.plan':            { no: 'Planlegg', en: 'Plan' },
    'tab.routes':          { no: 'Ruter', en: 'Routes' },
    'tab.stops':           { no: 'Stopp', en: 'Stops' },
    'tab.minside':         { no: 'Min side', en: 'My page' },

    // Route list
    'route.details':       { no: 'Detaljer', en: 'Details' },
    'route.vote':          { no: 'Stem', en: 'Vote' },

    // Route detail
    'detail.back':         { no: 'Alle ruter', en: 'All routes' },
    'detail.nm':           { no: 'Nautiske mil', en: 'Nautical miles' },
    'detail.sailingDays':  { no: 'Seilingsdager', en: 'Sailing days' },
    'detail.restDays':     { no: 'Hviledager', en: 'Rest days' },
    'detail.difficulty':   { no: 'Vanskelighetsgrad', en: 'Difficulty' },
    'detail.dayByDay':     { no: 'Dag for dag', en: 'Day by day' },
    'detail.day':          { no: 'Dag', en: 'Day' },
    'detail.restBadge':    { no: 'Hvile', en: 'Rest' },
    'detail.restDay':      { no: 'hviledag', en: 'rest day' },
    'detail.voteFor':      { no: 'Stem på', en: 'Vote for' },
    'detail.voted':        { no: '\u2713 Stemt!', en: '\u2713 Voted!' },

    // Weather labels
    'weather.airDay':      { no: 'Luft (dag)', en: 'Air (day)' },
    'weather.airNight':    { no: 'Luft (natt)', en: 'Air (night)' },
    'weather.seaTemp':     { no: 'Sjøtemp', en: 'Sea temp' },
    'weather.wind':        { no: 'Vind', en: 'Wind' },

    // Stops
    'stops.search':        { no: 'Søk i stopp...', en: 'Search stops...' },
    'stops.backAll':       { no: 'Alle stopp', en: 'All stops' },
    'stops.back':          { no: 'Tilbake', en: 'Back' },
    'stops.route':         { no: 'rute', en: 'route' },
    'stops.routes':        { no: 'ruter', en: 'routes' },
    'stops.highlights':    { no: 'Highlights', en: 'Highlights' },
    'stops.anchorage':     { no: 'Ankerplass', en: 'Anchorage' },
    'stops.protection':    { no: 'Beskyttelse', en: 'Protection' },
    'stops.bottom':        { no: 'Bunn', en: 'Bottom' },
    'stops.depth':         { no: 'Dybde', en: 'Depth' },
    'stops.facilities':    { no: 'Fasiliteter', en: 'Facilities' },
    'stops.restaurants':   { no: 'Restauranter', en: 'Restaurants' },
    'stops.mustDo':        { no: 'Ikke gå glipp av', en: "Don't miss" },
    'stops.localSpecialty': { no: 'Lokal spesialitet', en: 'Local specialty' },
    'stops.routesThrough': { no: 'Ruter gjennom', en: 'Routes through' },

    // Region labels
    'region.alle':              { no: 'Alle', en: 'All' },
    'region.saroniske':         { no: 'Saroniske', en: 'Saronic' },
    'region.kykladene':         { no: 'Kykladane', en: 'Cyclades' },
    'region.sma-kykladene':     { no: 'Små Kykladane', en: 'Small Cyclades' },
    'region.nordlige-kykladene': { no: 'Nordlege Kykl.', en: 'Northern Cycl.' },
    'region.dodekanesene':      { no: 'Dodekanesene', en: 'Dodecanese' },
    'region.sporadene':         { no: 'Sporadene', en: 'Sporades' },
    'region.attika':            { no: 'Attika', en: 'Attica' },
    'region.peloponnese':       { no: 'Peloponnese', en: 'Peloponnese' },
    'region.evia':              { no: 'Evia', en: 'Evia' },

    // Vote
    'vote.header':         { no: 'Hvilken rute frister mest?', en: 'Which route is most tempting?' },
    'vote.sub':            { no: 'Din stemme teller! Velg din favoritt for seilasen i 2026.', en: 'Your vote counts! Choose your favourite for the 2026 voyage.' },
    'vote.submit':         { no: 'Stem', en: 'Vote' },
    'vote.change':         { no: 'Endre', en: 'Change' },
    'vote.remove':         { no: 'Fjern', en: 'Remove' },
    'vote.results':        { no: 'Resultater', en: 'Results' },

    // Map / mobile
    'map.button':          { no: 'Kart', en: 'Map' },
    'map.back':            { no: 'Tilbake', en: 'Back' },

    // Prep section
    'prep.eyebrow':        { no: 'FORBEREDELSER', en: 'PREPARATIONS' },
    'prep.title':          { no: 'Klar for<br><em>seilas?</em>', en: 'Ready to<br><em>sail?</em>' },
    'prep.subtitle':       { no: 'Alt du trenger å vite før to uker på seilbåt i Hellas',
                             en: 'Everything you need to know before two weeks on a sailboat in Greece' },
    'prep.back':           { no: 'Tilbake', en: 'Back' },
    'prep.essential':      { no: 'Essensielt', en: 'Essential' },
    'prep.notBring':       { no: 'Ikke ta med', en: "Don't bring" },
    'prep.makePersonal':   { no: 'Gjør turen personlig', en: 'Make the trip personal' },
    'prep.voteFeature':    { no: 'Stem på din favorittute', en: 'Vote for your favourite route' },
    'prep.packingFeature': { no: 'Personlig pakkeliste med avkrysning', en: 'Personal packing list with checkboxes' },
    'prep.countdownFeature': { no: 'Nedtellingskalender til avgang', en: 'Countdown calendar to departure' },
    'prep.notesFeature':   { no: 'Private reisenotater', en: 'Private travel notes' },
    'prep.myPlanning':     { no: 'Min planlegging', en: 'My planning' },

    // Prep nav cards
    'prep.ourBoat':        { no: 'Vår båt', en: 'Our boat' },
    'prep.ourBoatDesc':    { no: 'Beneteau Oceanis 51.1 — Mighty M', en: 'Beneteau Oceanis 51.1 — Mighty M' },
    'prep.boatLife':       { no: 'Livet om bord', en: 'Life on board' },
    'prep.boatLifeDesc':   { no: 'Hva du kan forvente av to uker på seilbåt', en: 'What to expect from two weeks on a sailboat' },
    'prep.seasickness':    { no: 'Sjøsyke', en: 'Seasickness' },
    'prep.seasicknessDesc': { no: 'Medisiner, forebygging og tips fra erfarne seilere', en: 'Medicine, prevention and tips from experienced sailors' },
    'prep.packing':        { no: 'Pakkeliste', en: 'Packing list' },
    'prep.packingDesc':    { no: 'Foreslått pakkeliste for Hellas i slutten av mai', en: 'Suggested packing list for Greece in late May' },
    'prep.planningDesc':   { no: 'Pakkeliste, notater, nedtelling og stemming', en: 'Packing list, notes, countdown and voting' },

    // Calendar / tasks
    'cal.daysLeft':        { no: 'dager til avgang', en: 'days until departure' },
    'cal.noTasks':         { no: 'Ingen oppgaver denne dagen', en: 'No tasks this day' },
    'cal.departure':       { no: '\u26f5 Avgang! Bon voyage!', en: '\u26f5 Departure! Bon voyage!' },
    'cal.removeTitle':     { no: 'Fjern fra listen', en: 'Remove from list' },
    'cal.preparations':    { no: 'Forberedelser', en: 'Preparations' },
    'cal.removedTasks':    { no: 'Fjernede oppgaver', en: 'Removed tasks' },
    'cal.removedSub':      { no: 'Trykk for å legge tilbake', en: 'Tap to restore' },
    'cal.addBack':         { no: '+ Legg til', en: '+ Add back' },

    // Auth
    'auth.register':       { no: 'Opprett konto', en: 'Create account' },
    'auth.login':          { no: 'Logg inn', en: 'Log in' },
    'auth.logout':         { no: 'Logg ut', en: 'Log out' },
    'auth.name':           { no: 'Navn', en: 'Name' },
    'auth.email':          { no: 'E-post', en: 'Email' },
    'auth.password':       { no: 'Passord (min 8 tegn)', en: 'Password (min 8 characters)' },
    'auth.submit.register': { no: 'Registrer deg', en: 'Sign up' },
    'auth.submit.login':   { no: 'Logg inn', en: 'Log in' },
    'auth.waiting':        { no: 'Venter...', en: 'Loading...' },
    'auth.hasAccount':     { no: 'Har du allerede konto? Logg inn', en: 'Already have an account? Log in' },
    'auth.noAccount':      { no: 'Har du ikke konto? Registrer deg', en: "Don't have an account? Sign up" },
    'auth.subtitle':       { no: 'For å bruke din personlige pakkeliste, notater og nedtelling',
                             en: 'To use your personal packing list, notes and countdown' },
    'auth.role.label':     { no: 'Jeg reiser som', en: 'I am travelling as' },
    'auth.role.skipper':   { no: 'Skipper', en: 'Skipper' },
    'auth.role.passenger': { no: 'Passasjer', en: 'Passenger' },

    // Personal dashboard
    'personal.greeting':   { no: 'Hei,', en: 'Hi,' },
    'personal.dashboardSub': { no: 'Her er status på forberedelsene dine.', en: 'Here\u2019s your preparation status.' },
    'personal.nextTask':   { no: 'Neste oppgave', en: 'Next task' },
    'personal.notes':      { no: 'Mine notater', en: 'My notes' },
    'personal.notesSaved': { no: 'Lagret', en: 'Saved' },
    'personal.notesPlaceholder': { no: 'Tanker, ønsker, ting å huske for turen...', en: 'Thoughts, wishes, things to remember for the trip...' },
    'personal.settings':   { no: 'Innstillinger', en: 'Settings' },
    'personal.myRole':     { no: 'Min rolle', en: 'My role' },
    'personal.roleSaved':  { no: 'Rolle lagret ✓', en: 'Role saved ✓' },
    'personal.roleError':  { no: 'Kunne ikke lagre rolle', en: 'Could not save role' },

    // Guest fallback
    'guest':               { no: 'Gjest', en: 'Guest' },
    'sailor':              { no: 'Seiler', en: 'Sailor' },
  };

  // Month / day names
  var monthNames = {
    no: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  var dayNames = {
    no: ['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'],
    en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  };

  var dayNamesFull = {
    no: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  };

  // ---- Core API ----

  function t(key) {
    var entry = strings[key];
    if (!entry) { console.warn('Missing i18n key:', key); return key; }
    return entry[currentLang] || entry['no'] || key;
  }

  function lang() { return currentLang; }

  function setLang(code) {
    currentLang = code;
    localStorage.setItem(STORAGE_KEY, code);
    document.documentElement.lang = code === 'no' ? 'no' : 'en';
  }

  // Pick the right language from a bilingual { no, en } object
  // Falls back gracefully: if plain string, return as-is
  function pick(obj) {
    if (typeof obj === 'string') return obj;
    if (obj && typeof obj === 'object' && (obj.no !== undefined || obj.en !== undefined)) {
      return obj[currentLang] || obj['no'] || '';
    }
    return obj || '';
  }

  // Pick from an array of bilingual objects
  function pickArray(arr) {
    if (!Array.isArray(arr)) return arr || [];
    return arr.map(function (item) { return pick(item); });
  }

  function getMonthNames() { return monthNames[currentLang] || monthNames['no']; }
  function getDayNames() { return dayNames[currentLang] || dayNames['no']; }
  function getDayNamesFull() { return dayNamesFull[currentLang] || dayNamesFull['no']; }

  // Apply language to static HTML elements with data-i18n attributes
  function applyToDOM() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.title = currentLang === 'en' ? 'Sailing Routes Greece 2026' : 'Seilruter Hellas 2026';
  }

  return {
    t: t,
    lang: lang,
    setLang: setLang,
    pick: pick,
    pickArray: pickArray,
    getMonthNames: getMonthNames,
    getDayNames: getDayNames,
    getDayNamesFull: getDayNamesFull,
    applyToDOM: applyToDOM,
  };
})();

// Shorthand
var t = I18n.t;
