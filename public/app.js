/* ============================================
   Seilruter Hellas 2026 — v3
   Main application logic
   ============================================ */

(function () {
  'use strict';

  // ---- i18n shorthand ----
  var P = I18n.pick; // pick bilingual field

  // ---- State ----
  let selectedRoute = null;
  let map = null;
  let routeLayers = {};      // { routeId: { polyline, markers[] } }
  let activeRouteId = null;
  let currentRouteMode = 'seaway'; // seaway | straight
  let currentSection = 'explore';   // explore | vote | plan
  let currentSubTab = 'routes';     // routes | stops (within explore)
  let currentPrepView = 'landing';
  let currentStopFilter = 'alle';
  let voteSelection = null;
  let totalVoteCount = 0;
  let measurementMode = false;
  let measurementWaypoints = [];
  let measurementLine = null;
  let measurementUi = null;
  let showActiveRouteMeasurement = false;
  let routeModeUi = null;

  const STORAGE_KEYS = {
    activeRouteId: 'sr-active-route',
    routeMode: 'sr-route-mode',
  };

  const LOCAL_SHARED_KEYS = {
    notes: 'sr-shared-notes',
    packingChecked: 'sr-shared-packing-checked',
  };

  let sharedPlanningPollTimer = null;
  let sharedPlanningSaveTimer = null;
  let pendingSharedPlanningPatch = {};
  let lastSharedPlanningState = null;
  let notesSaveTimeout = null;

  // ---- Mobile state ----
  let isMobile = window.innerWidth <= 768;
  let pushingState = false; // flag to prevent re-push during popstate

  window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    if (wasMobile !== isMobile) {
      if (!isMobile) {
        document.body.removeAttribute('data-map-state');
      } else if (!document.body.dataset.mapState) {
        setMapState('hidden');
      }
      if (map) setTimeout(() => map.invalidateSize(), 100);
    }
  });

  // ---- Helpers ----
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- Elements ----
  const screens = {
    entry: document.getElementById('entry'),
    app: document.getElementById('app'),
  };

  const enterBtn = document.getElementById('enterBtn');

  // ---- More Helpers ----
  function unsplash(id, w, h) {
    const urls = window.IMAGE_URLS || {};
    const baseUrl = urls[id] || urls['greek-island'];
    if (baseUrl) return baseUrl + '?w=' + (w||400) + '&h=' + (h||300) + '&fit=crop&auto=format';
    if (id && id.includes('-') && /\d/.test(id)) {
      return 'https://images.unsplash.com/photo-' + id + '?w=' + (w||400) + '&h=' + (h||300) + '&fit=crop&auto=format';
    }
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=' + (w||400) + '&h=' + (h||300) + '&fit=crop&auto=format';
  }

  function slugify(name) {
    const base = name
      .replace(/\s*\(.*?\)/g, '')
      .replace(/\s*—\s*.*/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-zæøå0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return base;
  }

  function findIsland(name) {
    const islands = window.ISLANDS_DATA || {};
    const slug = slugify(name);
    if (islands[slug]) return { island: islands[slug], slug };
    for (const [key, isl] of Object.entries(islands)) {
      if (isl.name.toLowerCase() === name.toLowerCase().replace(/\s*\(.*?\)/, '').replace(/\s*—.*/, '').trim()) {
        return { island: isl, slug: key };
      }
    }
    return { island: null, slug };
  }

  function difficultyColor(level) {
    const colors = ['#2d8a6e', '#6e8a2d', '#c4842d', '#c43d3d'];
    return colors[Math.min(level - 1, 3)] || colors[0];
  }

  function difficultyPercent(level) {
    return [25, 50, 75, 100][Math.min(level - 1, 3)] || 25;
  }

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // no-op (private mode / storage blocked)
    }
  }

  function readJsonArrayStorage(key) {
    const raw = readStorage(key);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeJsonArrayStorage(key, value) {
    writeStorage(key, JSON.stringify(Array.isArray(value) ? value : []));
  }

  function normalizeStringArray(value, maxItems) {
    if (!Array.isArray(value)) return [];
    const seen = new Set();
    const out = [];
    for (const item of value) {
      if (typeof item !== 'string') continue;
      const trimmed = item.trim();
      if (!trimmed || seen.has(trimmed)) continue;
      seen.add(trimmed);
      out.push(trimmed);
      if (maxItems && out.length >= maxItems) break;
    }
    return out;
  }

  function arraysEqualAsSets(a, b) {
    const left = normalizeStringArray(a).sort();
    const right = normalizeStringArray(b).sort();
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i++) {
      if (left[i] !== right[i]) return false;
    }
    return true;
  }

  function routeModeLabel(mode) {
    const isEn = I18n.lang() === 'en';
    if (mode === 'straight') return isEn ? 'Straight lines' : 'Rette linjer';
    return isEn ? 'Seaway (approx)' : 'Sjøvei (omtrentlig)';
  }

  function displayDay(stop) {
    const rawDay = Number(stop && stop.day);
    if (!Number.isFinite(rawDay)) return 1;
    return Math.max(1, rawDay);
  }

  // ---- Screen transitions ----
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    if (name === 'app' && !map) initMap();
  }

  // ---- Language toggle ----
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const stored = I18n.lang();
    langToggle.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === stored)
    );
    if (stored !== 'no') I18n.applyToDOM();

    langToggle.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newLang = btn.dataset.lang;
        I18n.setLang(newLang);
        langToggle.querySelectorAll('.lang-btn').forEach(b =>
          b.classList.toggle('active', b.dataset.lang === newLang)
        );
        I18n.applyToDOM();
        updateMeasurementUi();
        updateRouteModeUi();
      });
    });
  }

  // ============================================
  // ENTRY SCREEN — rotating hero + live votes
  // ============================================
  let entryImageInterval = null;

  function initEntryScreen() {
    const routes = window.ROUTES_DATA || [];
    if (!routes.length) return;
    const bg = document.getElementById('entryHeroBg');
    if (!bg) return;
    let i = 0;
    function cycle() {
      const r = routes[i % routes.length];
      bg.style.backgroundImage = `url('${unsplash(r.heroImage, 900, 500)}')`;
      i++;
    }
    cycle();
    entryImageInterval = setInterval(cycle, 3500);

    // Fetch live vote count
    fetch('/api/results').then(r => r.json()).then(data => {
      if (data && data.tally) {
        const total = Object.values(data.tally).reduce((a, b) => a + b, 0);
        totalVoteCount = total;
        const el = document.getElementById('entryLiveVotes');
        if (el && total > 0) {
          el.textContent = total + (total === 1 ? ' stemme' : ' stemmer') + ' så langt';
        }
      }
    }).catch(() => {});
  }

  initEntryScreen();

  // ---- Early auth restore (persistent login) ----
  Auth.getSession().then(session => {
    if (session && session.user) {
      if (prepInitialized) renderPrepNavCards();
      updateUserButton();
    }
  }).catch(() => {});

  // ---- User button (login/logout) in header ----
  function updateUserButton() {
    const btn = document.getElementById('topUserBtn');
    if (!btn) return;
    if (Auth.isLoggedIn()) {
      btn.style.display = 'flex';
      btn.style.background = 'var(--accent)';
      btn.style.borderColor = 'var(--accent)';
      btn.style.color = '#fff';
    } else {
      btn.style.display = 'none';
    }
  }

  (function initUserButton() {
    const btn = document.getElementById('topUserBtn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const existing = document.querySelector('.top-user-menu');
      if (existing) { existing.remove(); return; }
      if (!Auth.isLoggedIn()) {
        switchSection('plan');
        pushAppState({ section: 'plan', prepView: 'personal' });
        showPrepSub('personal');
        return;
      }
      const user = Auth.getUser();
      const name = user?.name || user?.email?.split('@')[0] || '';
      const menu = document.createElement('div');
      menu.className = 'top-user-menu';
      menu.innerHTML = `
        <div class="top-user-menu-name">${escapeHtml(name)}</div>
        <button class="top-user-menu-item" id="userMenuAccount">${t('tab.minside')}</button>
        <button class="top-user-menu-item" id="userMenuLogout">${t('auth.logout')}</button>
      `;
      document.querySelector('.top-bar').appendChild(menu);
      menu.querySelector('#userMenuAccount').addEventListener('click', () => {
        menu.remove();
        switchSection('plan');
        pushAppState({ section: 'plan', prepView: 'personal' });
        showPrepSub('personal');
      });
      menu.querySelector('#userMenuLogout').addEventListener('click', async () => {
        menu.remove();
        await Auth.signOut();
        updateUserButton();
        if (prepInitialized) renderPrepNavCards();
      });
      document.addEventListener('click', function closeMenu() {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }, { once: true });
    });
  })();

  // ---- Entry ----
  function enterApp(targetSection) {
    targetSection = targetSection || 'explore';
    if (entryImageInterval) { clearInterval(entryImageInterval); entryImageInterval = null; }
    // Set voterLabel from auth if logged in
    const user = Auth.isLoggedIn() ? Auth.getUser() : null;
    if (user) {
      document.getElementById('voterLabel').textContent = user.name || user.email?.split('@')[0] || '';
    }
    showScreen('app');
    renderRoutesList();
    renderStopsPanel();
    renderVoteList();
    fetchTally();
    initPrepSection();
    if (isMobile) initMobileMap();
    switchSection(targetSection);
    if (targetSection === 'explore') {
      switchSubTab('routes');
      history.replaceState({ section: 'explore', subTab: 'routes' }, '', '#explore');
    } else {
      history.replaceState({ section: targetSection }, '', '#' + targetSection);
    }
  }

  // Auth-aware entry screen
  function updateEntryForLoggedIn() {
    const valueProp = document.getElementById('entryValueProp');
    const authBtn = document.getElementById('entryAuthBtn');
    const loggedIn = document.getElementById('entryLoggedIn');
    const greeting = document.getElementById('entryGreeting');
    if (!valueProp || !loggedIn) return;
    if (Auth.isLoggedIn()) {
      const user = Auth.getUser();
      const name = user?.name || user?.email?.split('@')[0] || t('sailor');
      valueProp.classList.add('hidden');
      if (authBtn) authBtn.classList.add('hidden');
      loggedIn.classList.remove('hidden');
      greeting.textContent = t('personal.greeting') + ' ' + name + '!';
    } else {
      valueProp.classList.remove('hidden');
      if (authBtn) authBtn.classList.remove('hidden');
      loggedIn.classList.add('hidden');
    }
  }
  updateEntryForLoggedIn();

  enterBtn.addEventListener('click', () => enterApp('explore'));

  document.getElementById('entryAuthBtn').addEventListener('click', () => {
    enterApp('plan');
    setTimeout(() => showPrepSub('personal'), 100);
  });

  // Prep shortcut from entry screen
  document.getElementById('prepShortcut').addEventListener('click', (e) => {
    e.preventDefault();
    enterApp('plan');
  });

  // ============================================
  // SECTION & TAB SWITCHING
  // ============================================
  function switchSection(section) {
    currentSection = section;
    if (section !== 'plan') stopSharedPlanningPolling();
    const exploreEl = document.getElementById('exploreSection');
    const prepEl = document.getElementById('prepSection');
    const subNav = document.getElementById('subNav');
    const fab = document.getElementById('mapFab');

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.section === section)
    );

    // Clear route name in header when not on explore
    if (section !== 'explore') {
      document.getElementById('activeRouteName').textContent = '';
    }

    if (section === 'plan') {
      exploreEl.classList.add('hidden');
      prepEl.classList.remove('hidden');
      if (subNav) subNav.style.display = 'none';
      if (fab) fab.style.display = 'none';
      if (!prepInitialized) initPrepSection();
      showPrepLanding();
    } else if (section === 'vote') {
      exploreEl.classList.remove('hidden');
      prepEl.classList.add('hidden');
      if (subNav) subNav.style.display = 'none';
      if (fab) fab.style.display = 'none';
      document.querySelectorAll('.tab-panel').forEach(p =>
        p.classList.toggle('active', p.id === 'panel-vote')
      );
    } else {
      // explore
      exploreEl.classList.remove('hidden');
      prepEl.classList.add('hidden');
      if (subNav) subNav.style.display = '';
      if (fab) fab.style.display = '';
      switchSubTab(currentSubTab);
    }
  }

  function switchSubTab(subTab) {
    currentSubTab = subTab;
    document.querySelectorAll('.sub-nav-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.subTab === subTab)
    );
    document.querySelectorAll('.tab-panel').forEach(p =>
      p.classList.toggle('active', p.id === 'panel-' + subTab)
    );
    if (subTab === 'routes') {
      document.getElementById('routeDetail').style.display = 'none';
      document.getElementById('routesList').style.display = '';
      const fab = document.getElementById('mapFab');
      if (fab) fab.classList.remove('fab-lifted');
    }
    if (subTab === 'stops') {
      document.getElementById('stopDetail').style.display = 'none';
      document.getElementById('stopsGrid').style.display = '';
      document.querySelector('.stops-header').style.display = '';
    }
  }

  // ---- History / pushState ----
  function pushAppState(state) {
    if (pushingState) return;
    history.pushState(state, '', '#' + (state.section || 'explore'));
  }

  function restoreAppState(state) {
    if (!state) return;
    pushingState = true;
    if (state.mapFull && isMobile) {
      setMapState('full');
      document.body.style.overflow = 'hidden';
    } else if (document.body.dataset.mapState === 'full') {
      setMapState('hidden');
      document.body.style.overflow = '';
    }
    if (state.section) switchSection(state.section);
    if (state.section === 'explore' && state.subTab) switchSubTab(state.subTab);
    if (state.routeDetail) showRouteDetail(state.routeDetail);
    else if (state.section === 'explore' && !state.stopDetail) {
      document.getElementById('routeDetail').style.display = 'none';
      document.getElementById('routesList').style.display = '';
      // Lower FAB when leaving route detail
      const fab = document.getElementById('mapFab');
      if (fab) fab.classList.remove('fab-lifted');
    }
    if (state.stopDetail) showStopDetail(state.stopDetail);
    else if (state.section === 'explore' && state.subTab === 'stops') {
      document.getElementById('stopDetail').style.display = 'none';
      document.getElementById('stopsGrid').style.display = '';
      document.querySelector('.stops-header').style.display = '';
    }
    if (state.prepView && state.section === 'plan') {
      if (state.prepView === 'landing') showPrepLanding();
      else showPrepSub(state.prepView);
    }
    pushingState = false;
  }

  window.addEventListener('popstate', (e) => {
    if (e.state) {
      restoreAppState(e.state);
    } else {
      // No state — go back to entry screen or explore
      if (document.body.dataset.mapState === 'full') {
        setMapState('hidden');
        document.body.style.overflow = '';
      } else if (screens.app.classList.contains('active')) {
        pushingState = true;
        switchSection('explore');
        switchSubTab('routes');
        document.getElementById('routeDetail').style.display = 'none';
        document.getElementById('routesList').style.display = '';
        const fab = document.getElementById('mapFab');
        if (fab) fab.classList.remove('fab-lifted');
        pushingState = false;
      }
    }
  });

  // Main tab click handlers
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchSection(btn.dataset.section);
      pushAppState({ section: btn.dataset.section });
    });
  });

  // Sub-tab click handlers
  document.querySelectorAll('.sub-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchSubTab(btn.dataset.subTab);
      pushAppState({ section: 'explore', subTab: btn.dataset.subTab });
    });
  });

  // ============================================
  // MAP
  // ============================================
  function routePointKey(lat, lng) {
    return `${Number(lat).toFixed(5)},${Number(lng).toFixed(5)}`;
  }

  function collisionOffsets(count) {
    if (count <= 1) return [{ x: 0, y: 0 }];
    if (count === 2) return [{ x: -12, y: 0 }, { x: 12, y: 0 }];
    if (count === 3) return [{ x: -11, y: 7 }, { x: 11, y: 7 }, { x: 0, y: -10 }];
    if (count === 4) return [{ x: -12, y: 0 }, { x: 12, y: 0 }, { x: 0, y: -12 }, { x: 0, y: 12 }];

    const radius = 13 + Math.min(10, Math.floor((count - 5) / 2));
    const result = [];
    for (let i = 0; i < count; i++) {
      const angle = (-Math.PI / 2) + (i * 2 * Math.PI / count);
      result.push({
        x: Math.round(Math.cos(angle) * radius),
        y: Math.round(Math.sin(angle) * radius),
      });
    }
    return result;
  }

  function computeRouteOverlapOffsets(stops) {
    const grouped = {};
    const byIndex = {};

    (stops || []).forEach((stop, index) => {
      const key = routePointKey(stop.lat, stop.lng);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(index);
    });

    Object.values(grouped).forEach(indices => {
      if (indices.length < 2) return;
      const offsets = collisionOffsets(indices.length);
      indices.forEach((idx, order) => {
        byIndex[idx] = offsets[order];
      });
    });

    return byIndex;
  }

  function seawayWaypointsForLeg(route, stop) {
    const dayKey = stop && stop.day !== undefined && stop.day !== null ? String(stop.day) : null;
    const overrides = window.SEA_WAYPOINTS || {};
    const routeOverrides = route && route.id ? overrides[route.id] : null;
    if (routeOverrides && dayKey && Array.isArray(routeOverrides[dayKey])) {
      return routeOverrides[dayKey];
    }
    return Array.isArray(stop && stop.waypoints) ? stop.waypoints : [];
  }

  function buildRouteCoords(route, mode) {
    const coords = [];
    (route.stops || []).forEach(stop => {
      if (mode === 'seaway') {
        seawayWaypointsForLeg(route, stop).forEach(wp => {
          if (Array.isArray(wp) && wp.length >= 2) coords.push([wp[0], wp[1]]);
        });
      }
      coords.push([stop.lat, stop.lng]);
    });
    return coords;
  }

  function routeModeButtonText(mode) {
    const isEn = I18n.lang() === 'en';
    if (mode === 'straight') return isEn ? 'Straight' : 'Rett';
    return isEn ? 'Seaway' : 'Sjøvei';
  }

  function routeModeControlTitle() {
    return I18n.lang() === 'en' ? 'Route rendering' : 'Rutetype';
  }

  function createStopIcon(route, stop, index, isActive, offset) {
    const markerOffset = offset || { x: 0, y: 0 };

    if (!isActive) {
      return L.divIcon({
        className: 'numbered-marker-wrapper',
        html: `<div class="inactive-stop-marker" style="--offset-x:${markerOffset.x}px;--offset-y:${markerOffset.y}px;--marker-color:${route.color}"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
    }

    const isStart = index === 0;
    return L.divIcon({
      className: 'numbered-marker-wrapper',
      html: `<div class="numbered-marker ${isStart ? 'start-marker' : ''}" style="--offset-x:${markerOffset.x}px;--offset-y:${markerOffset.y}px;background:${route.color}">${displayDay(stop)}</div>`,
      iconSize: isStart ? [30, 30] : [24, 24],
      iconAnchor: isStart ? [15, 15] : [12, 12],
    });
  }

  function flattenLatLngs(latlngs, out) {
    if (!Array.isArray(latlngs)) return out;
    latlngs.forEach(item => {
      if (!item) return;
      if (Array.isArray(item)) flattenLatLngs(item, out);
      else if (typeof item.lat === 'number' && typeof item.lng === 'number') out.push(item);
      else if (typeof item[0] === 'number' && typeof item[1] === 'number') out.push(L.latLng(item[0], item[1]));
    });
    return out;
  }

  function polylineNm(polyline) {
    if (!map || !polyline) return 0;
    const points = flattenLatLngs(polyline.getLatLngs(), []);
    if (points.length < 2) return 0;
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += map.distance(points[i - 1], points[i]) / 1852;
    }
    return total;
  }

  function activeRouteGeometryNm() {
    if (!activeRouteId || !routeLayers[activeRouteId]) return 0;
    return polylineNm(routeLayers[activeRouteId].polyline);
  }

  function getDefaultRouteId() {
    const routes = window.ROUTES_DATA || [];
    if (!routes.length) return null;
    const stored = readStorage(STORAGE_KEYS.activeRouteId);
    if (stored && routes.some(route => route.id === stored)) return stored;
    return routes[0].id;
  }

  function updateLegendState() {
    const legend = document.getElementById('mapLegend');
    if (!legend) return;
    legend.querySelectorAll('.legend-item').forEach(item => {
      const isActive = item.dataset.route === activeRouteId;
      item.classList.toggle('selected', isActive);
      item.classList.toggle('dimmed', !isActive);
    });
  }

  function fitRoute(routeId, options) {
    const layer = routeLayers[routeId];
    if (!map || !layer) return;
    map.fitBounds(layer.polyline.getBounds(), {
      padding: [50, 50],
      maxZoom: 10,
      animate: !(options && options.animate === false),
      duration: options && typeof options.duration === 'number' ? options.duration : 0.6,
    });
  }

  function applyRouteVisualState() {
    const routes = window.ROUTES_DATA || [];
    routes.forEach(route => {
      const layer = routeLayers[route.id];
      if (!layer) return;

      const isActive = route.id === activeRouteId;
      layer.polyline.setLatLngs(layer.coordsByMode[currentRouteMode]);
      layer.polyline.setStyle({
        opacity: isActive ? 0.92 : 0.22,
        weight: isActive ? 4 : 2,
        dashArray: isActive ? null : '7 8',
      });
      if (isActive) layer.polyline.bringToFront();

      layer.markers.forEach(entry => {
        const offset = isActive ? (layer.overlapOffsets[entry.index] || { x: 0, y: 0 }) : { x: 0, y: 0 };
        entry.marker.setIcon(createStopIcon(route, entry.stop, entry.index, isActive, offset));
        entry.marker.setOpacity(1);
        entry.marker.setZIndexOffset(isActive ? (1400 + entry.index) : (80 + entry.index));
      });
    });

    updateLegendState();
    updateMeasurementUi();
  }

  function setRouteMode(mode, options) {
    const nextMode = mode === 'straight' ? 'straight' : 'seaway';
    const shouldFit = !(options && options.fit === false);
    const shouldPersist = !(options && options.persist === false);

    currentRouteMode = nextMode;
    if (shouldPersist) writeStorage(STORAGE_KEYS.routeMode, nextMode);

    applyRouteVisualState();
    if (shouldFit && activeRouteId) fitRoute(activeRouteId);
    updateRouteModeUi();
  }

  function updateRouteModeUi() {
    if (!routeModeUi) return;
    routeModeUi.title.textContent = routeModeControlTitle();
    routeModeUi.seaway.textContent = routeModeButtonText('seaway');
    routeModeUi.straight.textContent = routeModeButtonText('straight');
    routeModeUi.seaway.classList.toggle('active', currentRouteMode === 'seaway');
    routeModeUi.straight.classList.toggle('active', currentRouteMode === 'straight');
  }

  function initRouteModeControl() {
    const RouteModeControl = L.Control.extend({
      options: { position: 'topright' },
      onAdd: function () {
        const container = L.DomUtil.create('div', 'route-mode-control');
        container.innerHTML = `
          <div class="route-mode-label" data-role="title"></div>
          <div class="route-mode-switch">
            <button type="button" class="route-mode-btn" data-role="seaway"></button>
            <button type="button" class="route-mode-btn" data-role="straight"></button>
          </div>
        `;

        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        const title = container.querySelector('[data-role="title"]');
        const seaway = container.querySelector('[data-role="seaway"]');
        const straight = container.querySelector('[data-role="straight"]');

        seaway.addEventListener('click', () => setRouteMode('seaway'));
        straight.addEventListener('click', () => setRouteMode('straight'));

        routeModeUi = { title, seaway, straight };
        updateRouteModeUi();

        return container;
      }
    });

    new RouteModeControl().addTo(map);
  }

  function initMap() {
    map = L.map('map', { center: [37.5, 25.0], zoom: 7, zoomControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19,
    }).addTo(map);

    const storedMode = readStorage(STORAGE_KEYS.routeMode);
    currentRouteMode = storedMode === 'straight' ? 'straight' : 'seaway';

    initNauticalScale();
    initWaypointMeasureTool();
    initRouteModeControl();
    (window.ROUTES_DATA || []).forEach(route => drawRoute(route));
    renderLegend();
    const defaultRouteId = getDefaultRouteId();
    if (defaultRouteId) selectRoute(defaultRouteId, { fit: false, persist: false });
    updateRouteModeUi();
  }

  function drawRoute(route) {
    const coordsByMode = {
      straight: buildRouteCoords(route, 'straight'),
      seaway: buildRouteCoords(route, 'seaway'),
    };

    const polyline = L.polyline(coordsByMode[currentRouteMode], {
      color: route.color,
      weight: 3,
      opacity: 0.7,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    polyline.on('click', (e) => {
      if (measurementMode) {
        if (e && e.originalEvent) L.DomEvent.stop(e.originalEvent);
        addMeasurementWaypoint(e.latlng);
        return;
      }
      selectRoute(route.id, { fit: true });
    });

    const markers = route.stops.map((stop, i) => {
      const marker = L.marker([stop.lat, stop.lng], {
        icon: createStopIcon(route, stop, i, false, { x: 0, y: 0 }),
        zIndexOffset: 80 + i,
      }).addTo(map);
      const { slug: stopSlug, island: stopIsland } = findIsland(stop.name);
      const nameHtml = stopIsland
        ? `<a href="#" class="popup-stop-link" data-slug="${stopSlug}" style="color:var(--accent);text-decoration:underline;font-weight:600;cursor:pointer">${escapeHtml(stop.name)}</a>`
        : `<strong>${escapeHtml(stop.name)}</strong>`;
      marker.bindPopup(`
        ${nameHtml}<br>
        ${t('detail.day')} ${displayDay(stop)}${stop.nm ? ' &middot; ' + stop.nm + ' NM' : ''}
        ${stop.highlight ? '<br><em>' + escapeHtml(P(stop.highlight)) + '</em>' : ''}
      `);
      marker.on('click', (e) => {
        if (measurementMode) {
          marker.closePopup();
          if (e && e.originalEvent) L.DomEvent.stop(e.originalEvent);
          addMeasurementWaypoint(marker.getLatLng());
          return;
        }
        selectRoute(route.id, { fit: true });
      });
      marker.on('popupopen', () => {
        const link = marker.getPopup().getElement()?.querySelector('.popup-stop-link');
        if (link) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            marker.closePopup();
            // Close fullscreen map visually WITHOUT history.back()
            // (history.back would trigger popstate and overwrite the navigation)
            if (isMobile && document.body.dataset.mapState === 'full') {
              setMapState('hidden');
              document.body.style.overflow = '';
            }
            switchSection('explore');
            switchSubTab('stops');
            showStopDetail(link.dataset.slug);
            pushAppState({ section: 'explore', subTab: 'stops', stopDetail: link.dataset.slug });
          });
        }
      });
      return { marker, stop, index: i };
    });

    routeLayers[route.id] = {
      route,
      polyline,
      markers,
      coordsByMode,
      overlapOffsets: computeRouteOverlapOffsets(route.stops),
    };
  }

  function selectRoute(routeId, options) {
    const routes = window.ROUTES_DATA || [];
    const shouldFit = !(options && options.fit === false);
    const shouldPersist = !(options && options.persist === false);
    const fallbackRouteId = getDefaultRouteId();

    if (!routeId || !routeLayers[routeId]) routeId = fallbackRouteId;
    if (!routeId || !routeLayers[routeId]) return;

    activeRouteId = routeId;
    if (shouldPersist) writeStorage(STORAGE_KEYS.activeRouteId, routeId);

    applyRouteVisualState();
    if (shouldFit) fitRoute(routeId);

    const route = routes.find(r => r.id === routeId);
    if (route) document.getElementById('activeRouteName').textContent = P(route.name);
    document.querySelectorAll('.route-card').forEach(card => card.classList.toggle('selected', card.dataset.routeId === routeId));
    if (isMobile) {
      const fab = document.getElementById('mapFab');
      if (fab && route) fab.querySelector('span').textContent = P(route.name);
    }
  }

  function resetMapView() {
    const routeId = activeRouteId || getDefaultRouteId();
    if (!routeId) return;
    selectRoute(routeId, { fit: true, persist: false });
  }

  function renderLegend() {
    const legend = document.getElementById('mapLegend');
    const routes = window.ROUTES_DATA || [];
    legend.innerHTML = routes.map(r => `
      <div class="legend-item" data-route="${r.id}">
        <span class="legend-dot" style="background:${r.color}"></span>
        <span class="legend-name">${escapeHtml(P(r.name))}</span>
      </div>
    `).join('');
    legend.querySelectorAll('.legend-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.route;
        if (activeRouteId === id) fitRoute(id);
        else selectRoute(id, { fit: true });
      });
    });
    updateLegendState();
  }

  function waypointLabel(index) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (index < alphabet.length) return alphabet[index];
    const letter = alphabet[index % alphabet.length];
    const cycle = Math.floor(index / alphabet.length);
    return letter + cycle;
  }

  function waypointIcon(label) {
    return L.divIcon({
      className: 'measure-waypoint-wrapper',
      html: `<div class="measure-waypoint">${label}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  }

  function measurementText(key) {
    const isEn = I18n.lang() === 'en';
    const labels = {
      toggleOff: isEn ? 'Route measure' : 'Rute-måler',
      toggleOn: isEn ? 'Route measure: ON' : 'Rute-måler: PÅ',
      hint: isEn ? 'Tap chart to add A-B points. Drag points for turns.' : 'Trykk i kartet for A-B-punkter. Dra punktene for svinger.',
      total: isEn ? 'Total distance' : 'Total distanse',
      undo: isEn ? 'Undo' : 'Angre',
      clear: isEn ? 'Clear' : 'Nullstill',
      empty: isEn ? 'Add at least two points for NM.' : 'Legg minst to punkter for NM.',
      method: isEn
        ? 'Trip NM uses itinerary data. Map NM uses the selected route rendering mode.'
        : 'Tur-NM bruker reisedata. Kart-NM bruker valgt rutetype.',
      activeRoute: isEn ? 'Measure active route' : 'Mål aktiv rute',
      canonical: isEn ? 'Itinerary (canonical)' : 'Reiseplan (kanonisk)',
      geometry: isEn ? 'Map geometry' : 'Kartgeometri',
      mode: isEn ? 'Mode' : 'Modus',
      noActiveRoute: isEn ? 'Select a route to compare canonical NM vs map geometry NM.' : 'Velg en rute for å sammenligne kanonisk NM mot kart-NM.',
    };
    return labels[key] || '';
  }

  function formatNm(nm) {
    if (nm >= 10) return Math.round(nm).toString();
    if (nm >= 1) return (Math.round(nm * 10) / 10).toFixed(1).replace(/\.0$/, '');
    if (nm >= 0.1) return nm.toFixed(1).replace(/\.0$/, '');
    return nm.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  }

  function refreshWaypointLabels() {
    measurementWaypoints.forEach((marker, i) => {
      marker.setIcon(waypointIcon(waypointLabel(i)));
    });
  }

  function removeWaypoint(marker) {
    const index = measurementWaypoints.indexOf(marker);
    if (index === -1) return;
    map.removeLayer(marker);
    measurementWaypoints.splice(index, 1);
    refreshWaypointLabels();
    updateMeasurementPath();
  }

  function updateMeasurementUi() {
    if (!measurementUi) return;

    measurementUi.toggle.textContent = measurementMode ? measurementText('toggleOn') : measurementText('toggleOff');
    measurementUi.toggle.classList.toggle('active', measurementMode);
    measurementUi.body.classList.toggle('hidden', !measurementMode);
    measurementUi.undo.textContent = measurementText('undo');
    measurementUi.clear.textContent = measurementText('clear');
    measurementUi.method.textContent = measurementText('method');
    measurementUi.activeRoute.textContent = measurementText('activeRoute');

    const latlngs = measurementWaypoints.map(marker => marker.getLatLng());
    let totalNm = 0;
    const segments = [];

    for (let i = 1; i < latlngs.length; i++) {
      const nm = map.distance(latlngs[i - 1], latlngs[i]) / 1852;
      totalNm += nm;
      segments.push({
        from: waypointLabel(i - 1),
        to: waypointLabel(i),
        nm,
      });
    }

    measurementUi.hint.textContent = measurementText('hint');
    measurementUi.totalLabel.textContent = `${measurementText('total')}: ${formatNm(totalNm)} NM`;
    measurementUi.undo.disabled = measurementWaypoints.length === 0;
    measurementUi.clear.disabled = measurementWaypoints.length === 0;

    const route = (window.ROUTES_DATA || []).find(r => r.id === activeRouteId);
    measurementUi.activeRoute.disabled = !route;
    if (route) {
      const geometryNm = activeRouteGeometryNm();
      measurementUi.routeSummary.innerHTML = `
        <div class="measure-route-row"><span>${measurementText('canonical')}</span><strong>~${formatNm(route.distance)} NM</strong></div>
        <div class="measure-route-row"><span>${measurementText('geometry')} (${routeModeLabel(currentRouteMode)})</span><strong>${formatNm(geometryNm)} NM</strong></div>
      `;
    } else {
      measurementUi.routeSummary.textContent = measurementText('noActiveRoute');
    }

    if (segments.length) {
      measurementUi.empty.classList.add('hidden');
      let segmentHtml = segments.map(seg =>
        `<div class="measure-segment-row"><span>${seg.from} -> ${seg.to}</span><strong>${formatNm(seg.nm)} NM</strong></div>`
      ).join('');
      if (showActiveRouteMeasurement && route) {
        segmentHtml = `<div class="measure-segment-row measure-segment-highlight"><span>${escapeHtml(P(route.name))} (${routeModeLabel(currentRouteMode)})</span><strong>${formatNm(activeRouteGeometryNm())} NM</strong></div>` + segmentHtml;
      }
      measurementUi.segmentList.innerHTML = segmentHtml;
    } else {
      if (showActiveRouteMeasurement && route) {
        measurementUi.empty.classList.add('hidden');
        measurementUi.segmentList.innerHTML = `<div class="measure-segment-row measure-segment-highlight"><span>${escapeHtml(P(route.name))} (${routeModeLabel(currentRouteMode)})</span><strong>${formatNm(activeRouteGeometryNm())} NM</strong></div>`;
        measurementUi.totalLabel.textContent = `${measurementText('total')}: ${formatNm(activeRouteGeometryNm())} NM`;
      } else {
        measurementUi.segmentList.innerHTML = '';
        measurementUi.empty.classList.remove('hidden');
        measurementUi.empty.textContent = measurementText('empty');
      }
    }
  }

  function measureActiveRoute() {
    if (!activeRouteId || !routeLayers[activeRouteId]) return;
    if (measurementWaypoints.length || measurementLine) {
      clearMeasurementWaypoints();
    }
    showActiveRouteMeasurement = true;
    setMeasurementMode(true);
    updateMeasurementUi();
  }

  function updateMeasurementPath() {
    const latlngs = measurementWaypoints.map(marker => marker.getLatLng());
    if (latlngs.length >= 2) {
      if (!measurementLine) {
        measurementLine = L.polyline(latlngs, {
          color: '#173f57',
          weight: 3,
          opacity: 0.95,
          dashArray: '10 7',
          lineCap: 'round',
          lineJoin: 'round',
          interactive: false,
        }).addTo(map);
      } else {
        measurementLine.setLatLngs(latlngs);
      }
    } else if (measurementLine) {
      map.removeLayer(measurementLine);
      measurementLine = null;
    }
    updateMeasurementUi();
  }

  function addMeasurementWaypoint(latlng) {
    if (!map || !latlng) return;
    showActiveRouteMeasurement = false;
    const marker = L.marker(latlng, {
      draggable: true,
      icon: waypointIcon(waypointLabel(measurementWaypoints.length)),
      zIndexOffset: 1000,
      keyboard: false,
    }).addTo(map);

    marker.on('drag', updateMeasurementPath);
    marker.on('dragend', updateMeasurementPath);
    marker.on('contextmenu', (e) => {
      if (e && e.originalEvent) L.DomEvent.stop(e.originalEvent);
      removeWaypoint(marker);
    });

    measurementWaypoints.push(marker);
    refreshWaypointLabels();
    updateMeasurementPath();
  }

  function undoMeasurementWaypoint() {
    const marker = measurementWaypoints.pop();
    if (!marker) return;
    map.removeLayer(marker);
    refreshWaypointLabels();
    updateMeasurementPath();
  }

  function clearMeasurementWaypoints() {
    measurementWaypoints.forEach(marker => map.removeLayer(marker));
    measurementWaypoints = [];
    showActiveRouteMeasurement = false;
    if (measurementLine) {
      map.removeLayer(measurementLine);
      measurementLine = null;
    }
    updateMeasurementUi();
  }

  function setMeasurementMode(enabled) {
    measurementMode = !!enabled;
    if (map) {
      const container = map.getContainer();
      container.classList.toggle('measure-mode', measurementMode);
    }
    updateMeasurementUi();
  }

  function initWaypointMeasureTool() {
    const MeasureControl = L.Control.extend({
      options: { position: 'topright' },
      onAdd: function () {
        const container = L.DomUtil.create('div', 'measure-control');
        container.innerHTML = `
          <button type="button" class="measure-toggle" data-role="toggle"></button>
          <div class="measure-body hidden" data-role="body">
            <p class="measure-hint" data-role="hint"></p>
            <div class="measure-total" data-role="total"></div>
            <button type="button" class="measure-active-route" data-role="activeRoute"></button>
            <p class="measure-method" data-role="method"></p>
            <div class="measure-route-summary" data-role="routeSummary"></div>
            <div class="measure-actions">
              <button type="button" data-role="undo"></button>
              <button type="button" data-role="clear"></button>
            </div>
            <div class="measure-empty" data-role="empty"></div>
            <div class="measure-segments" data-role="segments"></div>
          </div>
        `;

        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        const toggle = container.querySelector('[data-role="toggle"]');
        const body = container.querySelector('[data-role="body"]');
        const hint = container.querySelector('[data-role="hint"]');
        const totalLabel = container.querySelector('[data-role="total"]');
        const activeRoute = container.querySelector('[data-role="activeRoute"]');
        const method = container.querySelector('[data-role="method"]');
        const routeSummary = container.querySelector('[data-role="routeSummary"]');
        const undo = container.querySelector('[data-role="undo"]');
        const clear = container.querySelector('[data-role="clear"]');
        const empty = container.querySelector('[data-role="empty"]');
        const segmentList = container.querySelector('[data-role="segments"]');

        undo.textContent = measurementText('undo');
        clear.textContent = measurementText('clear');

        toggle.addEventListener('click', () => setMeasurementMode(!measurementMode));
        activeRoute.addEventListener('click', () => measureActiveRoute());
        undo.addEventListener('click', () => undoMeasurementWaypoint());
        clear.addEventListener('click', () => clearMeasurementWaypoints());

        measurementUi = { toggle, body, hint, totalLabel, activeRoute, method, routeSummary, undo, clear, empty, segmentList };
        updateMeasurementUi();

        return container;
      }
    });

    new MeasureControl().addTo(map);

    map.on('click', (e) => {
      if (!measurementMode) return;
      addMeasurementWaypoint(e.latlng);
    });
  }

  function roundedScaleNm(maxNm) {
    if (!maxNm || maxNm <= 0) return 0.1;

    const smallSteps = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500];
    for (let i = smallSteps.length - 1; i >= 0; i--) {
      if (smallSteps[i] <= maxNm) return smallSteps[i];
    }

    const magnitude = Math.pow(10, Math.floor(Math.log10(maxNm)));
    const candidates = [1, 2, 5].map(step => step * magnitude);
    let rounded = candidates[0];
    candidates.forEach(candidate => {
      if (candidate <= maxNm) rounded = candidate;
    });
    return rounded;
  }

  function initNauticalScale() {
    const NauticalScale = L.Control.extend({
      options: { position: 'bottomleft', maxWidth: 140 },
      onAdd: function (mapInstance) {
        const container = L.DomUtil.create('div', 'nautical-scale-control');
        container.innerHTML = `
          <div class="nautical-scale-label"></div>
          <div class="nautical-scale-bar-wrap">
            <div class="nautical-scale-bar"></div>
          </div>
        `;
        this._label = container.querySelector('.nautical-scale-label');
        this._bar = container.querySelector('.nautical-scale-bar');

        L.DomEvent.disableClickPropagation(container);
        mapInstance.on('zoomend moveend resize', this._update, this);
        this._update();
        return container;
      },
      onRemove: function (mapInstance) {
        mapInstance.off('zoomend moveend resize', this._update, this);
      },
      _update: function () {
        if (!this._map) return;
        const size = this._map.getSize();
        if (!size || !size.x || !size.y) return;

        const maxWidth = this.options.maxWidth || 140;
        const center = L.point(size.x / 2, size.y / 2);
        const leftPoint = L.point(center.x - maxWidth / 2, center.y);
        const rightPoint = L.point(center.x + maxWidth / 2, center.y);

        const left = this._map.containerPointToLatLng(leftPoint);
        const right = this._map.containerPointToLatLng(rightPoint);
        const nmAtMaxWidth = this._map.distance(left, right) / 1852;
        if (!nmAtMaxWidth || nmAtMaxWidth <= 0) return;

        const nm = roundedScaleNm(nmAtMaxWidth);
        const widthPx = Math.max(24, Math.round(maxWidth * (nm / nmAtMaxWidth)));

        this._bar.style.width = `${widthPx}px`;
        this._label.textContent = `${formatNm(nm)} NM`;
      },
    });

    new NauticalScale().addTo(map);
  }

  // ============================================
  // ROUTES LIST
  // ============================================
  function renderRoutesList() {
    const list = document.getElementById('routesList');
    const routes = window.ROUTES_DATA || [];
    list.innerHTML = routes.map((r, i) => `
      <div class="route-card${activeRouteId === r.id ? ' selected' : ''}" data-route-id="${r.id}" style="animation-delay:${0.05 * i}s">
        <div class="route-card-hero" style="background-image:url('${unsplash(r.heroImage, 600, 300)}')">
          <div class="route-card-label">
            <div class="route-region">${escapeHtml(P(r.region))}</div>
            <div class="route-name">${escapeHtml(P(r.name))}</div>
          </div>
        </div>
        <div class="route-card-body">
          <div class="route-card-desc">${escapeHtml(P(r.tagline))}</div>
          <div class="route-card-stats">
            <span><span class="stat-icon">⛵</span> ~${r.distance} NM</span>
            <span><span class="stat-icon">📅</span> ${r.sailingDays}+${r.restDays}d</span>
            <span class="difficulty-badge" style="background:${difficultyColor(r.difficultyLevel)}20;color:${difficultyColor(r.difficultyLevel)}">${escapeHtml(P(r.difficulty))}</span>
          </div>
          <div class="route-card-actions">
            <button class="btn-detail" data-route="${r.id}">${t('route.details')}</button>
          </div>
        </div>
      </div>
    `).join('');
    list.querySelectorAll('.route-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-detail') || e.target.closest('.btn-vote')) return;
        selectRoute(card.dataset.routeId);
      });
    });
    list.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', () => showRouteDetail(btn.dataset.route));
    });
  }

  function showRouteDetail(routeId) {
    const routes = window.ROUTES_DATA || [];
    const r = routes.find(x => x.id === routeId);
    if (!r) return;
    selectRoute(routeId);
    const detail = document.getElementById('routeDetail');

    detail.innerHTML = `
      <button class="detail-back">&larr; ${t('detail.back')}</button>
      <div class="detail-hero" style="background-image:url('${unsplash(r.heroImage, 700, 350)}')">
        <div class="detail-hero-text">
          <div class="detail-region">${escapeHtml(P(r.region))}</div>
          <h2>${escapeHtml(P(r.name))}</h2>
        </div>
      </div>
      <div class="detail-tagline">${escapeHtml(P(r.tagline))}</div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-value">~${r.distance}</div>
          <div class="stat-label">${t('detail.nm')}</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${r.sailingDays}</div>
          <div class="stat-label">${t('detail.sailingDays')}</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${r.restDays}</div>
          <div class="stat-label">${t('detail.restDays')}</div>
        </div>
      </div>

      <div class="difficulty-meter">
        <div class="meter-label">${t('detail.difficulty')}</div>
        <div class="meter-bar">
          <div class="meter-fill" style="width:${difficultyPercent(r.difficultyLevel)}%;background:${difficultyColor(r.difficultyLevel)}"></div>
        </div>
        <div class="meter-text" style="color:${difficultyColor(r.difficultyLevel)}">${escapeHtml(P(r.difficulty))}</div>
      </div>

      <p class="detail-desc">${P(r.description)}</p>

      <div class="weather-cards">
        <div class="weather-card">
          <div class="wc-icon">☀️</div>
          <div class="wc-value">${r.weather.airDay}</div>
          <div class="wc-label">${t('weather.airDay')}</div>
        </div>
        <div class="weather-card">
          <div class="wc-icon">🌙</div>
          <div class="wc-value">${r.weather.airNight}</div>
          <div class="wc-label">${t('weather.airNight')}</div>
        </div>
        <div class="weather-card">
          <div class="wc-icon">🌊</div>
          <div class="wc-value">${r.weather.seaTemp}</div>
          <div class="wc-label">${t('weather.seaTemp')}</div>
        </div>
        <div class="weather-card">
          <div class="wc-icon">💨</div>
          <div class="wc-value">${r.weather.wind}</div>
          <div class="wc-label">${t('weather.wind')}</div>
        </div>
      </div>

      <div class="itinerary-title">${t('detail.dayByDay')}</div>
      <div class="itinerary-table">
        ${r.stops.map((s, i) => {
          const prevName = i > 0 ? r.stops[i-1].name : '';
          const routeText = i === 0 ? s.name : (s.isRest ? `${s.name} (${t('detail.restDay')})` : `${prevName} → ${s.name}`);
          const { island, slug } = findIsland(s.name);
          const thumbId = island ? island.image : (s.image || null);
          return `
            <div class="itinerary-row ${s.isRest ? 'rest' : ''}" data-stop-slug="${slug}">
              <span class="itin-day">${t('detail.day')} ${displayDay(s)}</span>
              <img class="itin-thumb" src="${unsplash(thumbId, 72, 72)}" alt="${escapeHtml(s.name)}" loading="lazy" />
              <div class="itin-info">
                <div class="itin-route-name">${escapeHtml(routeText)}</div>
                <div class="itin-highlight">${escapeHtml(P(s.highlight) || '')}</div>
              </div>
              <div class="itin-stats">
                ${s.isRest
                  ? `<span class="itin-rest-badge">${t('detail.restBadge')}</span>`
                  : (s.nm ? `<div class="itin-nm">⛵ ${s.nm} NM</div><div class="itin-hours">~${s.hours || Math.round(s.nm / 5.5)}t</div>` : '')
                }
              </div>
              ${island ? '<svg class="itin-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
            </div>
          `;
        }).join('')}
      </div>

      <button class="detail-vote-btn" style="background:${r.color}" data-route="${r.id}">${t('detail.voteFor')} ${escapeHtml(P(r.name))}</button>
    `;

    detail.querySelector('.detail-back').addEventListener('click', () => {
      detail.style.display = 'none';
      document.getElementById('routesList').style.display = '';
      resetMapView();
      // Lower FAB back to default position (no vote button)
      const fab = document.getElementById('mapFab');
      if (fab) fab.classList.remove('fab-lifted');
      pushAppState({ section: 'explore', subTab: 'routes' });
    });
    detail.querySelector('.detail-vote-btn').addEventListener('click', () => openVoteFlow(r.id));

    // Click itinerary row → show full stop detail
    detail.querySelectorAll('.itinerary-row').forEach(row => {
      row.addEventListener('click', () => {
        const slug = row.dataset.stopSlug;
        const islands = window.ISLANDS_DATA || {};
        if (islands[slug]) {
          currentSubTab = 'stops';
          switchSubTab('stops');
          showStopDetail(slug, () => {
            currentSubTab = 'routes';
            switchSubTab('routes');
            showRouteDetail(r.id);
          });
        } else {
          const stop = r.stops.find(s => slugify(s.name) === slug);
          if (stop && map) {
            map.setView([stop.lat, stop.lng], 12, { animate: true, duration: 0.5 });
            if (isMobile) showMobileMap();
          }
        }
      });
    });

    document.getElementById('routesList').style.display = 'none';
    detail.style.display = '';
    document.getElementById('sidebar').scrollTop = 0;
    // Lift FAB above fixed vote button
    const fab = document.getElementById('mapFab');
    if (fab) fab.classList.add('fab-lifted');
    pushAppState({ section: 'explore', subTab: 'routes', routeDetail: routeId });
  }

  // ============================================
  // STOPS PANEL
  // ============================================
  function renderStopsPanel() {
    const islands = window.ISLANDS_DATA || {};
    const regions = new Set(['alle']);
    Object.values(islands).forEach(isl => { if (isl.region) regions.add(isl.region); });

    const filtersEl = document.getElementById('regionFilters');
    filtersEl.innerHTML = Array.from(regions).map(r =>
      `<button class="region-pill ${r === 'alle' ? 'active' : ''}" data-region="${r}">${t('region.' + r) || r}</button>`
    ).join('');

    filtersEl.querySelectorAll('.region-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        currentStopFilter = pill.dataset.region;
        filtersEl.querySelectorAll('.region-pill').forEach(p => p.classList.toggle('active', p === pill));
        renderStopsGrid();
      });
    });
    document.getElementById('stopsSearch').addEventListener('input', () => renderStopsGrid());
    renderStopsGrid();
  }

  function renderStopsGrid() {
    const grid = document.getElementById('stopsGrid');
    const islands = window.ISLANDS_DATA || {};
    const routes = window.ROUTES_DATA || [];
    const search = (document.getElementById('stopsSearch').value || '').toLowerCase();

    const entries = Object.values(islands)
      .filter(isl => {
        if (currentStopFilter !== 'alle' && isl.region !== currentStopFilter) return false;
        if (search && !isl.name.toLowerCase().includes(search) && !(P(isl.tagline) || '').toLowerCase().includes(search)) return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    function routesForIsland(slug) {
      return routes.filter(r => r.stops.some(s => slugify(s.name) === slug || s.name.toLowerCase().includes(slug.replace(/-/g, ' '))));
    }

    grid.innerHTML = entries.map(isl => {
      const rts = routesForIsland(isl.slug);
      return `
        <div class="stop-card" data-slug="${isl.slug}">
          <div class="stop-card-img" style="background-image:url('${unsplash(isl.image, 300, 200)}')">
            <span class="stop-card-region">${t('region.' + isl.region)}</span>
          </div>
          <div class="stop-card-body">
            <div class="stop-card-name">${escapeHtml(isl.name)}</div>
            <div class="stop-card-desc">${escapeHtml(P(isl.tagline) || '')}</div>
            <div class="stop-card-routes">${rts.length} ${rts.length !== 1 ? t('stops.routes') : t('stops.route')}</div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.stop-card').forEach(card => {
      card.addEventListener('click', () => showStopDetail(card.dataset.slug));
    });
  }

  function showStopDetail(slug, onBack) {
    const islands = window.ISLANDS_DATA || {};
    const routes = window.ROUTES_DATA || [];
    const isl = islands[slug];
    if (!isl) return;

    if (map && isl.lat && isl.lng) map.setView([isl.lat, isl.lng], 12, { animate: true, duration: 0.5 });

    const detail = document.getElementById('stopDetail');
    const throughRoutes = routes.filter(r => r.stops.some(s => slugify(s.name) === slug || s.name.toLowerCase().includes(slug.replace(/-/g, ' '))));
    const backLabel = onBack ? `&larr; ${t('stops.back')}` : `&larr; ${t('stops.backAll')}`;
    const highlights = isl.highlights ? I18n.pickArray(isl.highlights) : null;

    detail.innerHTML = `
      <button class="detail-back">${backLabel}</button>
      <div class="stop-detail-img" style="background-image:url('${unsplash(isl.image, 700, 350)}')"></div>
      <h3>${escapeHtml(isl.name)}</h3>
      <span class="stop-region-tag">${t('region.' + isl.region)}</span>
      <p class="stop-desc">${P(isl.description) || ''}</p>

      ${highlights ? `
        <div class="stop-section">
          <div class="stop-section-title">${t('stops.highlights')}</div>
          <ul style="padding-left:1rem;font-size:0.82rem;color:var(--text-muted);line-height:1.6">
            ${highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${isl.anchorage ? `
        <div class="stop-section">
          <div class="stop-section-title">${t('stops.anchorage')}</div>
          <div class="anchorage-grid">
            <div class="anchorage-item"><strong>${t('stops.protection')}:</strong> ${escapeHtml(P(isl.anchorage.protection))}</div>
            <div class="anchorage-item"><strong>${t('stops.bottom')}:</strong> ${escapeHtml(P(isl.anchorage.bottom))}</div>
            <div class="anchorage-item"><strong>${t('stops.depth')}:</strong> ${escapeHtml(P(isl.anchorage.depth))}</div>
            <div class="anchorage-item"><strong>${t('stops.facilities')}:</strong> ${escapeHtml(P(isl.anchorage.facilities) || '—')}</div>
          </div>
        </div>
      ` : ''}

      ${isl.restaurants && isl.restaurants.length ? `
        <div class="stop-section">
          <div class="stop-section-title">${t('stops.restaurants')}</div>
          ${isl.restaurants.map(r => `
            <div class="restaurant-item">
              <div class="restaurant-name">${escapeHtml(r.name)} <span style="color:var(--text-light)">${r.price || ''}</span></div>
              <div class="restaurant-info">${escapeHtml(P(r.specialty))}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${isl.mustDo ? `
        <div class="stop-section">
          <div class="stop-section-title">${t('stops.mustDo')}</div>
          <div class="must-do-box">${P(isl.mustDo)}</div>
        </div>
      ` : ''}

      ${isl.localSpecialty ? `
        <div class="stop-section">
          <div class="stop-section-title">${t('stops.localSpecialty')}</div>
          <p style="font-size:0.82rem;color:var(--text-muted)">${P(isl.localSpecialty)}</p>
        </div>
      ` : ''}

      ${throughRoutes.length ? `
        <div class="stop-section">
          <div class="stop-section-title">${t('stops.routesThrough')} ${escapeHtml(isl.name)}</div>
          <div class="stop-routes-list">
            ${throughRoutes.map(r => `<span class="stop-route-chip" style="background:${r.color}">${escapeHtml(P(r.name))}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    `;

    detail.querySelector('.detail-back').addEventListener('click', () => {
      detail.style.display = 'none';
      if (onBack) { onBack(); }
      else { document.getElementById('stopsGrid').style.display = ''; document.querySelector('.stops-header').style.display = ''; }
    });

    document.getElementById('stopsGrid').style.display = 'none';
    document.querySelector('.stops-header').style.display = 'none';
    detail.style.display = '';
    document.getElementById('sidebar').scrollTop = 0;
    pushAppState({ section: 'explore', subTab: 'stops', stopDetail: slug });
  }

  // ============================================
  // VOTING — Single-viewport inline voting
  // ============================================
  let currentTally = {};
  let currentVoters = {};

  function openVoteFlow(preselectedRouteId) {
    switchSection('vote');
    // Scroll to the preselected route row
    if (preselectedRouteId) {
      setTimeout(() => {
        const row = document.querySelector(`.vote-row[data-route="${preselectedRouteId}"]`);
        if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  function renderVoteList() {
    const routes = window.ROUTES_DATA || [];
    const total = Object.values(currentTally).reduce((a, b) => a + b, 0) || 0;
    const sorted = [...routes].sort((a, b) => (currentTally[b.id] || 0) - (currentTally[a.id] || 0));
    const loggedIn = Auth.isLoggedIn();
    const user = loggedIn ? Auth.getUser() : null;

    // Only check existing vote for LOGGED IN users
    let userVotedRoute = null;
    if (loggedIn) {
      const userName = user?.email?.split('@')[0] || user?.name || '';
      for (const [routeId, names] of Object.entries(currentVoters)) {
        if (names.some(n => n.toLowerCase() === userName.toLowerCase())) {
          userVotedRoute = routeId;
          break;
        }
      }
    }

    const listEl = document.getElementById('voteList');
    listEl.innerHTML = `
      <div class="vote-rows">
        ${sorted.map((r) => {
          const count = currentTally[r.id] || 0;
          const pct = total > 0 ? (count / total * 100) : 0;
          const isMyVote = userVotedRoute === r.id;
          const voters = (currentVoters[r.id] || []);

          // Right-side action zone:
          // - My vote → ✓ + "Fjern"
          // - Not my vote → count + colored vote tap zone
          let actionHtml = '';
          if (isMyVote) {
            actionHtml = `<div class="vote-row-action my" data-route="${r.id}"><span class="vote-row-voted">✓</span><span class="vote-row-remove-label">${t('vote.remove')}</span></div>`;
          } else {
            actionHtml = `<div class="vote-row-action" data-route="${r.id}" style="--vote-color:${r.color}"><span class="vote-row-count">${count}</span><span class="vote-row-action-label">${userVotedRoute ? t('vote.change') : t('vote.submit')}</span></div>`;
          }

          return `
            <div class="vote-row ${isMyVote ? 'my-vote' : ''}" data-route="${r.id}">
              <div class="vote-row-bar" style="width:${pct}%;background:${r.color}"></div>
              <div class="vote-row-content">
                <div class="vote-row-left" data-route="${r.id}">
                  <span class="vote-row-dot" style="background:${r.color}"></span>
                  <div class="vote-row-info">
                    <span class="vote-row-name">${escapeHtml(P(r.name))}</span>
                    ${voters.length ? `<span class="vote-row-voters">${voters.map(v => escapeHtml(v)).join(', ')}</span>` : ''}
                  </div>
                </div>
                ${actionHtml}
              </div>
            </div>`;
        }).join('')}
      </div>
      ${total > 0 ? `<div class="vote-total">${total} ${total === 1 ? (I18n.lang() === 'en' ? 'vote' : 'stemme') : (I18n.lang() === 'en' ? 'votes' : 'stemmer')}</div>` : ''}
    `;

    // LEFT side → navigate to route detail
    listEl.querySelectorAll('.vote-row-left').forEach(left => {
      left.addEventListener('click', (e) => {
        e.stopPropagation();
        const routeId = left.dataset.route;
        switchSection('explore');
        switchSubTab('routes');
        showRouteDetail(routeId);
        pushAppState({ section: 'explore', subTab: 'routes', routeDetail: routeId });
      });
    });

    // RIGHT side action zone → vote/change
    listEl.querySelectorAll('.vote-row-action:not(.my)').forEach(action => {
      action.addEventListener('click', (e) => {
        e.stopPropagation();
        submitVote(action.dataset.route);
      });
    });

    // RIGHT side "my" action zone → remove vote
    listEl.querySelectorAll('.vote-row-action.my').forEach(action => {
      action.addEventListener('click', (e) => {
        e.stopPropagation();
        removeVote();
      });
    });
  }

  async function submitVote(routeId) {
    if (!Auth.isLoggedIn()) {
      const authPrompt = document.createElement('div');
      authPrompt.className = 'vote-auth-prompt';
      authPrompt.innerHTML = `
        <div class="vote-auth-box">
          <p>${I18n.lang() === 'en' ? 'You need to log in to vote.' : 'Du må logge inn for å stemme.'}</p>
          <div class="vote-auth-buttons">
            <button class="vote-auth-login">${t('auth.login')}</button>
            <button class="vote-auth-register">${t('auth.register')}</button>
          </div>
          <button class="vote-auth-dismiss">✕</button>
        </div>
      `;
      const existing = document.querySelector('.vote-auth-prompt');
      if (existing) existing.remove();
      document.getElementById('panel-vote').appendChild(authPrompt);
      authPrompt.querySelector('.vote-auth-login').addEventListener('click', () => {
        authPrompt.remove();
        switchSection('plan');
        pushAppState({ section: 'plan', prepView: 'personal' });
        showPrepSub('personal');
      });
      authPrompt.querySelector('.vote-auth-register').addEventListener('click', () => {
        authPrompt.remove();
        switchSection('plan');
        pushAppState({ section: 'plan', prepView: 'personal' });
        showPrepSub('personal');
      });
      authPrompt.querySelector('.vote-auth-dismiss').addEventListener('click', () => authPrompt.remove());
      return;
    }

    // Optimistic UI — immediately mark as voted
    const btn = document.querySelector(`.vote-row-btn[data-route="${routeId}"]`);
    if (btn) { btn.textContent = '…'; btn.disabled = true; }

    try {
      const res = await Auth.authFetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ route: routeId }),
      });
      const data = await res.json();
      if (data.success) {
        currentTally = data.tally;
        currentVoters = data.voters;
        renderVoteList();
        updateVoteBadge(data.tally);
        // Update detail vote btn if visible
        const detailBtn = document.querySelector('.detail-vote-btn[data-route="' + routeId + '"]');
        if (detailBtn) { detailBtn.textContent = t('detail.voted'); detailBtn.style.opacity = '0.7'; detailBtn.style.pointerEvents = 'none'; }
      }
    } catch (err) { console.error('Vote error:', err); }
  }

  async function removeVote() {
    if (!Auth.isLoggedIn()) return;

    try {
      const res = await Auth.authFetch('/api/vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        currentTally = data.tally;
        currentVoters = data.voters;
        renderVoteList();
        updateVoteBadge(data.tally);
      }
    } catch (err) { console.error('Remove vote error:', err); }
  }

  async function fetchTally() {
    try {
      const res = await fetch('/api/results');
      const data = await res.json();
      if (data.tally) {
        currentTally = data.tally;
        currentVoters = data.voters || {};
        renderVoteList();
        updateVoteBadge(data.tally);
      }
    } catch (err) { console.error('Tally fetch error:', err); }
  }

  function updateVoteBadge(tally) {
    const badge = document.getElementById('voteBadge');
    if (!badge) return;
    const total = Object.values(tally).reduce((a, b) => a + b, 0);
    totalVoteCount = total;
    if (total > 0) {
      badge.textContent = total;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  }


  // ============================================
  // FORBEREDELSER
  // ============================================
  let prepInitialized = false;

  function initPrepSection() {
    if (prepInitialized) return;
    prepInitialized = true;
    renderPrepNavCards();
  }

  function renderPrepNavCards() {
    const container = document.getElementById('prepNavCards');
    const isLoggedIn = Auth.isLoggedIn();
    let ctaHtml = '';

    if (!isLoggedIn) {
      ctaHtml = `
        <div class="prep-auth-cta">
          <div class="prep-cta-icon">⛵</div>
          <h3>${t('prep.makePersonal')}</h3>
          <div class="prep-cta-buttons">
            <button class="prep-cta-register" id="prepCtaRegister">${t('auth.register')}</button>
            <button class="prep-cta-login" id="prepCtaLogin">${t('auth.login')}</button>
          </div>
        </div>
      `;
    } else {
      const user = Auth.getUser();
      const name = user?.name || user?.email?.split('@')[0] || t('sailor');
      const tripStart = new Date('2026-04-18');
      const today = new Date(); today.setHours(0,0,0,0);
      const daysLeft = Math.max(0, Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24)));
      ctaHtml = `
        <div class="prep-user-card">
          <div class="prep-user-greeting">${t('personal.greeting')} ${escapeHtml(name)}!</div>
          <div class="prep-user-countdown">${daysLeft} ${t('cal.daysLeft')}</div>
          <button class="prep-user-go" data-prep="personal">${t('prep.myPlanning')} &rarr;</button>
        </div>
      `;
    }

    const cards = [
      { id: 'our-boat', icon: '🛥', title: t('prep.ourBoat'), desc: t('prep.ourBoatDesc') },
      { id: 'boat-life', icon: '⛵', title: t('prep.boatLife'), desc: t('prep.boatLifeDesc') },
      { id: 'seasickness', icon: '💊', title: t('prep.seasickness'), desc: t('prep.seasicknessDesc') },
      { id: 'packing', icon: '🎒', title: t('prep.packing'), desc: t('prep.packingDesc') },
      { id: 'personal', icon: '📋', title: t('prep.myPlanning'), desc: t('prep.planningDesc') },
    ];

    container.innerHTML = ctaHtml + cards.map((c, i) => `
      <div class="prep-card" data-prep="${c.id}" style="animation-delay:${0.08 * i}s">
        <div class="prep-card-icon">${c.icon}</div>
        <div class="prep-card-body">
          <div class="prep-card-title">${c.title}</div>
          <div class="prep-card-desc">${c.desc}</div>
        </div>
        <svg class="prep-card-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    `).join('');

    container.querySelectorAll('.prep-card').forEach(card => {
      card.addEventListener('click', () => showPrepSub(card.dataset.prep));
    });
    const registerBtn = container.querySelector('#prepCtaRegister');
    const loginBtn = container.querySelector('#prepCtaLogin');
    if (registerBtn) registerBtn.addEventListener('click', () => showPrepSub('personal'));
    if (loginBtn) loginBtn.addEventListener('click', () => showPrepSub('personal'));
    const goBtn = container.querySelector('.prep-user-go');
    if (goBtn) goBtn.addEventListener('click', () => showPrepSub(goBtn.dataset.prep));
  }

  function showPrepLanding() {
    stopSharedPlanningPolling();
    currentPrepView = 'landing';
    document.getElementById('prepLanding').classList.remove('hidden');
    document.querySelectorAll('.prep-sub').forEach(s => s.classList.add('hidden'));
    renderPrepNavCards();
    document.getElementById('prepScroll').scrollTop = 0;
    pushAppState({ section: 'plan', prepView: 'landing' });
  }

  function showPrepSub(view) {
    if (view !== 'personal') stopSharedPlanningPolling();
    currentPrepView = view;
    document.getElementById('prepLanding').classList.add('hidden');
    document.querySelectorAll('.prep-sub').forEach(s => s.classList.add('hidden'));
    const content = window.PREP_CONTENT || {};
    switch (view) {
      case 'our-boat': renderOurBoat('prepOurBoat'); break;
      case 'boat-life': renderPrepArticle('prepBoatLife', content.boatLife); break;
      case 'seasickness': renderSeasickness('prepSeasickness', content.seasickness); break;
      case 'packing': renderPublicPacking('prepPacking', content.packingList); break;
      case 'personal': renderPersonalArea('prepPersonal'); break;
    }
    document.getElementById('prepScroll').scrollTop = 0;
    pushAppState({ section: 'plan', prepView: view });
  }

  function renderOurBoat(containerId) {
    const el = document.getElementById(containerId);
    el.classList.remove('hidden');

    const base = 'https://ortsasailing.com/wp-content/gallery/mighty-m-oceanis-51-1/';
    const images = [
      'IMG_3262.jpeg', 'IMG_6376.jpeg', 'IMG_6377.jpeg', 'IMG_6380.jpeg',
      'IMG_6393.jpeg', 'IMG_6402.jpeg', 'IMG_6406.jpeg', 'IMG_6407.jpeg',
      'IMG_6408.jpeg', 'IMG_6409.jpeg', 'IMG_6410.jpeg', 'IMG_6411.jpeg',
      'IMG_6412.jpeg', 'IMG_6419.jpeg', 'IMG_6426.jpeg', 'IMG_3798.jpeg',
      'IMG_3800.jpeg', 'IMG_3804.jpeg', 'IMG_3807.jpeg', 'IMG_3813.jpeg',
      '3cb4f2de-5c08-4d32-a6d0-f871815cfa85.jpg',
      '95d95896-0367-46d8-a53d-6a1b72103be9.jpg',
      'd45e4939-a9f2-4a80-b9a1-e68c786c987b.jpg',
    ];

    const isEn = I18n.lang() === 'en';

    const specs = [
      { label: isEn ? 'Length' : 'Lengde', value: '15.94 m / 51\'1″' },
      { label: isEn ? 'Beam' : 'Bredde', value: '4.80 m / 15\'10″' },
      { label: isEn ? 'Year' : 'Årgang', value: '2023' },
      { label: isEn ? 'Cabins' : 'Lugarer', value: '5 + 1' },
      { label: 'WC', value: '3 + 1' },
      { label: isEn ? 'Engine' : 'Motor', value: 'Yanmar 110 hp' },
      { label: isEn ? 'Water' : 'Vann', value: '770 L' },
      { label: isEn ? 'Fuel' : 'Drivstoff', value: '400 L' },
      { label: isEn ? 'Sail area' : 'Seilareal', value: '122 m²' },
      { label: isEn ? 'Draught' : 'Dypgang', value: '2.05 m' },
    ];

    const equipment = isEn ? [
      'Generator 8000 kVA', 'Air conditioning 30 000 BTU', 'Solar panels',
      'Bow thruster', 'Fixed gangway', 'Bimini top + sprayhood',
      'Electric winch (portside)', 'Cockpit cushions & teak floor',
      'Espresso machine', 'Fans in all cabins + salon',
      'Bluetooth radio (salon + cockpit speakers)',
      'Raymarine Axiom+ 7″ chartplotter × 2',
      'Autopilot with wireless remote', 'AIS receiver', 'Wind & speed sensors',
    ] : [
      'Generator 8000 kVA', 'Aircondition 30 000 BTU', 'Solcellepaneler',
      'Baugpropell', 'Fast landgang', 'Bimini + sprayhood',
      'Elektrisk vinsj (babord)', 'Cockpitkontroll & tekk-dekk',
      'Espressomaskin', 'Vifter i alle lugarer + salong',
      'Bluetooth-radio (høyttalere i salong + cockpit)',
      'Raymarine Axiom+ 7″ kartplotter × 2',
      'Autopilot med trådløs fjernkontroll', 'AIS-mottaker', 'Vind- og fartsensorer',
    ];

    el.innerHTML = `
      <button class="prep-back">&larr; ${t('prep.back')}</button>
      <div class="boat-hero">
        <div class="boat-hero-img">
          <img src="${base}${images[0]}" alt="Mighty M" loading="eager" />
        </div>
        <div class="boat-hero-overlay">
          <h2 class="boat-hero-name">Mighty M</h2>
          <p class="boat-hero-model">Beneteau Oceanis 51.1</p>
        </div>
      </div>

      <p class="boat-intro">
        ${isEn
          ? 'Our home for two weeks — a brand new (2023) Beneteau Oceanis 51.1. Pure sailing pleasure with taut lines, a stepped hull and a spacious deck. Easy to handle, comfortable and smart.'
          : 'Vårt hjem i to uker — en splitter ny (2023) Beneteau Oceanis 51.1. Ren seilglede med stramme linjer, trinnsskrog og romslig dekk. Enkel å håndtere, komfortabel og smart.'}
      </p>

      <div class="boat-specs-grid">
        ${specs.map(s => `
          <div class="boat-spec">
            <span class="boat-spec-value">${s.value}</span>
            <span class="boat-spec-label">${s.label}</span>
          </div>
        `).join('')}
      </div>

      <h3 class="boat-section-title">${isEn ? 'Equipment' : 'Utstyr'}</h3>
      <ul class="boat-equipment">
        ${equipment.map(e => `<li>${e}</li>`).join('')}
      </ul>

      <h3 class="boat-section-title">${isEn ? 'Photo gallery' : 'Bildegalleri'}</h3>
      <div class="boat-gallery">
        ${images.map((img, i) => `
          <div class="boat-gallery-item" data-index="${i}">
            <img src="${base}${img}" alt="Mighty M ${i + 1}" loading="lazy" />
          </div>
        `).join('')}
      </div>

      <div class="boat-lightbox hidden" id="boatLightbox">
        <button class="boat-lb-close">&times;</button>
        <button class="boat-lb-prev">&lsaquo;</button>
        <button class="boat-lb-next">&rsaquo;</button>
        <img class="boat-lb-img" id="boatLbImg" src="" alt="" />
        <div class="boat-lb-counter" id="boatLbCounter"></div>
      </div>

      <div class="boat-source">
        <a href="https://ortsasailing.com/yachts/beneteau-oceanis-51-1-mighty-m/" target="_blank" rel="noopener">
          ${isEn ? 'View on OrtsaSailing.com' : 'Se på OrtsaSailing.com'} &rarr;
        </a>
      </div>
    `;

    el.querySelector('.prep-back').addEventListener('click', showPrepLanding);

    // Lightbox
    let lbIndex = 0;
    const lightbox = el.querySelector('#boatLightbox');
    const lbImg = el.querySelector('#boatLbImg');
    const lbCounter = el.querySelector('#boatLbCounter');

    function openLb(i) {
      lbIndex = i;
      lbImg.src = base + images[i];
      lbCounter.textContent = (i + 1) + ' / ' + images.length;
      lightbox.classList.remove('hidden');
    }
    function closeLb() { lightbox.classList.add('hidden'); }

    el.querySelectorAll('.boat-gallery-item').forEach(item => {
      item.addEventListener('click', () => openLb(parseInt(item.dataset.index)));
    });
    el.querySelector('.boat-lb-close').addEventListener('click', closeLb);
    el.querySelector('.boat-lb-prev').addEventListener('click', () => openLb((lbIndex - 1 + images.length) % images.length));
    el.querySelector('.boat-lb-next').addEventListener('click', () => openLb((lbIndex + 1) % images.length));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
  }

  function renderPrepArticle(containerId, data) {
    if (!data) return;
    const el = document.getElementById(containerId);
    el.classList.remove('hidden');
    el.innerHTML = `
      <button class="prep-back">&larr; ${t('prep.back')}</button>
      <div class="prep-article-header">
        <span class="prep-article-icon">${data.icon || ''}</span>
        <h2 class="prep-article-title">${P(data.title)}</h2>
        <p class="prep-article-subtitle">${P(data.subtitle)}</p>
      </div>
      <div class="prep-article-body">
        ${data.sections.map((s, i) => `
          <div class="prep-article-section" style="animation-delay:${0.06 * i}s">
            <h3>${P(s.heading)}</h3>
            <div class="prep-article-text">${P(s.body)}</div>
          </div>
        `).join('')}
      </div>
    `;
    el.querySelector('.prep-back').addEventListener('click', showPrepLanding);
  }

  function renderSeasickness(containerId, data) {
    if (!data) return;
    const el = document.getElementById(containerId);
    el.classList.remove('hidden');
    el.innerHTML = `
      <button class="prep-back">&larr; ${t('prep.back')}</button>
      <div class="prep-article-header">
        <span class="prep-article-icon">${data.icon || ''}</span>
        <h2 class="prep-article-title">${P(data.title)}</h2>
        <p class="prep-article-subtitle">${P(data.subtitle)}</p>
      </div>
      <div class="prep-article-body">
        ${data.sections.map((s, i) => `
          <div class="prep-article-section" style="animation-delay:${0.06 * i}s">
            <h3>${P(s.heading)}</h3>
            <div class="prep-article-text">${P(s.body)}</div>
            ${s.medications ? `
              <div class="med-cards">
                ${s.medications.map(m => `
                  <div class="med-card">
                    <div class="med-card-header">
                      <strong>${escapeHtml(m.name)}</strong>
                      <span class="med-rating">${escapeHtml(P(m.rating))}</span>
                    </div>
                    <div class="med-dosage">${escapeHtml(P(m.dosage))}</div>
                    <div class="med-notes">${escapeHtml(P(m.notes))}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
    el.querySelector('.prep-back').addEventListener('click', showPrepLanding);
  }

  function renderPublicPacking(containerId, data) {
    if (!data) return;
    const el = document.getElementById(containerId);
    el.classList.remove('hidden');
    el.innerHTML = `
      <button class="prep-back">&larr; ${t('prep.back')}</button>
      <div class="prep-article-header">
        <span class="prep-article-icon">${data.icon || ''}</span>
        <h2 class="prep-article-title">${P(data.title)}</h2>
        <p class="prep-article-subtitle">${P(data.subtitle)}</p>
      </div>
      <div class="packing-golden-rule">
        <div class="golden-rule-icon">💡</div>
        <div class="golden-rule-text">${P(data.goldenRule)}</div>
      </div>
      <div class="packing-categories">
        ${data.categories.map((cat, ci) => `
          <div class="packing-category" style="animation-delay:${0.06 * ci}s">
            <div class="packing-cat-header" data-toggle="cat-${cat.id}">
              <span class="packing-cat-icon">${cat.icon}</span>
              <span class="packing-cat-name">${P(cat.name)}</span>
              <span class="packing-cat-count">${cat.items.length}</span>
              <svg class="packing-cat-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="packing-cat-items" id="cat-${cat.id}">
              ${cat.items.map(item => `
                <label class="packing-item ${item.essential ? 'essential' : 'optional'}">
                  <input type="checkbox" disabled />
                  <span class="packing-item-text">${P(item.text)}</span>
                  ${item.essential ? `<span class="packing-essential-badge">${t('prep.essential')}</span>` : ''}
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="packing-not-bring">
        <h3>${t('prep.notBring')}</h3>
        <ul>
          ${data.notBring.map(item => `<li>${P(item)}</li>`).join('')}
        </ul>
      </div>
    `;
    el.querySelector('.prep-back').addEventListener('click', showPrepLanding);
    el.querySelectorAll('.packing-cat-header').forEach(header => {
      header.addEventListener('click', () => {
        const items = document.getElementById(header.dataset.toggle);
        const isOpen = !items.classList.contains('collapsed');
        items.classList.toggle('collapsed', isOpen);
        header.classList.toggle('collapsed', isOpen);
      });
    });
  }

  function defaultSharedPlanningState() {
    return {
      checklist_completed: [],
      checklist_removed: [],
      packing_checked: readJsonArrayStorage(LOCAL_SHARED_KEYS.packingChecked),
      notes: readStorage(LOCAL_SHARED_KEYS.notes) || '',
      updated_at: null,
      updated_by: null,
    };
  }

  function normalizeSharedPlanningState(data) {
    const fallback = defaultSharedPlanningState();
    if (!data || typeof data !== 'object') return fallback;
    return {
      checklist_completed: normalizeStringArray(data.checklist_completed, 300),
      checklist_removed: normalizeStringArray(data.checklist_removed, 300),
      packing_checked: normalizeStringArray(data.packing_checked, 1000),
      notes: typeof data.notes === 'string' ? data.notes : fallback.notes,
      updated_at: data.updated_at || null,
      updated_by: data.updated_by || null,
    };
  }

  async function fetchSharedPlanningState() {
    if (!Auth.isLoggedIn()) return null;
    try {
      const res = await Auth.authFetch('/api/planning');
      if (!res.ok) return null;
      const data = await res.json();
      return normalizeSharedPlanningState(data);
    } catch (e) {
      return null;
    }
  }

  function applySharedPlanningState(state, options) {
    const opts = options || {};
    if (!state) return;
    const next = normalizeSharedPlanningState(state);
    const previous = lastSharedPlanningState || defaultSharedPlanningState();
    lastSharedPlanningState = next;

    writeStorage(LOCAL_SHARED_KEYS.notes, next.notes || '');
    writeJsonArrayStorage(LOCAL_SHARED_KEYS.packingChecked, next.packing_checked || []);

    const notesEl = document.getElementById('notesArea');
    if (notesEl) {
      const shouldKeepLocalTyping = !opts.force &&
        document.activeElement === notesEl &&
        typeof notesEl.value === 'string' &&
        notesEl.value.trim().length > 0;
      if (!shouldKeepLocalTyping && notesEl.value !== (next.notes || '')) {
        notesEl.value = next.notes || '';
      }
    }

    if (!arraysEqualAsSets(previous.packing_checked, next.packing_checked)) {
      renderPersonalPackingList();
    }
  }

  function queueSharedPlanningPatch(patch) {
    pendingSharedPlanningPatch = Object.assign({}, pendingSharedPlanningPatch, patch || {});
    clearTimeout(sharedPlanningSaveTimer);
    sharedPlanningSaveTimer = setTimeout(flushSharedPlanningPatch, 700);
  }

  async function flushSharedPlanningPatch() {
    if (!Auth.isLoggedIn()) return;
    const patch = pendingSharedPlanningPatch;
    pendingSharedPlanningPatch = {};
    if (!patch || !Object.keys(patch).length) return;

    try {
      const res = await Auth.authFetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) return;
      const data = await res.json();
      applySharedPlanningState(data, { force: false });
    } catch (e) {
      // keep local state; next save/poll will retry
    }
  }

  function stopSharedPlanningPolling() {
    clearInterval(sharedPlanningPollTimer);
    sharedPlanningPollTimer = null;
    clearTimeout(sharedPlanningSaveTimer);
    sharedPlanningSaveTimer = null;
    if (Auth.isLoggedIn() && pendingSharedPlanningPatch && Object.keys(pendingSharedPlanningPatch).length) {
      const patch = pendingSharedPlanningPatch;
      pendingSharedPlanningPatch = {};
      Auth.authFetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      }).catch(() => {});
    }
  }

  function startSharedPlanningPolling() {
    stopSharedPlanningPolling();
    if (!Auth.isLoggedIn()) return;

    sharedPlanningPollTimer = setInterval(async () => {
      const data = await fetchSharedPlanningState();
      if (!data) return;
      applySharedPlanningState(data, { force: false });
    }, 15000);
  }

  async function hydrateSharedPlanningState(forceUiApply) {
    if (!Auth.isLoggedIn()) {
      applySharedPlanningState(defaultSharedPlanningState(), { force: true });
      return;
    }
    const data = await fetchSharedPlanningState();
    if (data) applySharedPlanningState(data, { force: !!forceUiApply });
  }

  function packingItemKey(categoryId, index) {
    return categoryId + ':' + index;
  }

  function renderPersonalPackingList() {
    const container = document.getElementById('personalPackingContainer');
    if (!container) return;

    const packingData = window.PREP_CONTENT && window.PREP_CONTENT.packingList;
    const categories = packingData && Array.isArray(packingData.categories) ? packingData.categories : [];
    if (!categories.length) {
      container.innerHTML = '';
      return;
    }

    const checked = new Set(
      normalizeStringArray(
        (lastSharedPlanningState && lastSharedPlanningState.packing_checked) ||
        readJsonArrayStorage(LOCAL_SHARED_KEYS.packingChecked),
        1000
      )
    );

    const total = categories.reduce((sum, cat) => sum + (Array.isArray(cat.items) ? cat.items.length : 0), 0);
    let done = 0;

    const html = categories.map(cat => {
      const items = Array.isArray(cat.items) ? cat.items : [];
      let catDone = 0;
      const itemsHtml = items.map((item, idx) => {
        const key = packingItemKey(cat.id || 'cat', idx);
        const isChecked = checked.has(key);
        if (isChecked) {
          catDone++;
          done++;
        }
        return `
          <label class="pp-item ${isChecked ? 'checked' : ''}">
            <input type="checkbox" data-pack-key="${key}" ${isChecked ? 'checked' : ''} />
            <span class="pp-item-text">${escapeHtml(P(item.text) || '')}</span>
          </label>
        `;
      }).join('');

      return `
        <div class="pp-category">
          <div class="pp-cat-header" data-pack-toggle="${cat.id}">
            <span>${cat.icon || '•'} ${escapeHtml(P(cat.name) || '')}</span>
            <span class="pp-cat-progress">${catDone}/${items.length}</span>
          </div>
          <div class="pp-cat-items" id="pp-cat-${cat.id}">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;

    const progressEl = document.getElementById('packingProgress');
    if (progressEl) {
      progressEl.textContent = `${done}/${total}`;
    }

    container.querySelectorAll('[data-pack-toggle]').forEach(header => {
      header.addEventListener('click', () => {
        const items = document.getElementById('pp-cat-' + header.dataset.packToggle);
        if (!items) return;
        items.classList.toggle('collapsed');
      });
    });

    container.querySelectorAll('input[data-pack-key]').forEach(input => {
      input.addEventListener('change', () => {
        const nextChecked = new Set(
          normalizeStringArray(
            (lastSharedPlanningState && lastSharedPlanningState.packing_checked) ||
            readJsonArrayStorage(LOCAL_SHARED_KEYS.packingChecked),
            1000
          )
        );
        const key = input.dataset.packKey;
        if (input.checked) nextChecked.add(key);
        else nextChecked.delete(key);

        const packed = Array.from(nextChecked);
        writeJsonArrayStorage(LOCAL_SHARED_KEYS.packingChecked, packed);
        if (!lastSharedPlanningState) lastSharedPlanningState = defaultSharedPlanningState();
        lastSharedPlanningState.packing_checked = packed;
        renderPersonalPackingList();
        queueSharedPlanningPatch({ packing_checked: packed });
      });
    });
  }

  function initNotes() {
    const textarea = document.getElementById('notesArea');
    if (!textarea) return;

    const localNote = readStorage(LOCAL_SHARED_KEYS.notes) || '';
    textarea.value = localNote;

    textarea.addEventListener('input', () => {
      clearTimeout(notesSaveTimeout);
      notesSaveTimeout = setTimeout(() => {
        writeStorage(LOCAL_SHARED_KEYS.notes, textarea.value);
        if (!lastSharedPlanningState) lastSharedPlanningState = defaultSharedPlanningState();
        lastSharedPlanningState.notes = textarea.value;

        const saved = document.getElementById('notesSaved');
        if (saved) {
          saved.classList.remove('hidden');
          setTimeout(() => saved.classList.add('hidden'), 1800);
        }

        queueSharedPlanningPatch({ notes: textarea.value });
      }, 700);
    });
  }

  function renderPersonalArea(containerId) {
    const el = document.getElementById(containerId);
    el.classList.remove('hidden');
    const tripStart = new Date('2026-04-18');
    const today = new Date(); today.setHours(0,0,0,0);
    const daysLeft = Math.max(0, Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24)));
    if (Auth.isLoggedIn()) renderPersonalDashboard(el, daysLeft);
    else renderAuthForm(el, daysLeft);
  }

  function renderAuthForm(el, daysLeft) {
    stopSharedPlanningPolling();
    let isRegister = false;
    function render() {
      el.innerHTML = `
        <button class="prep-back">&larr; ${t('prep.back')}</button>
        <div class="personal-hero">
          <div class="personal-countdown-big">${daysLeft}</div>
          <div class="personal-countdown-label">${t('cal.daysLeft')}</div>
        </div>
        <div class="auth-form-wrap">
          <h3 class="auth-title">${isRegister ? t('auth.register') : t('auth.login')}</h3>
          <p class="auth-subtitle">${t('auth.subtitle')}</p>
          <form id="authForm" class="auth-form">
            ${isRegister ? `<input type="text" id="authName" class="auth-input" placeholder="${t('auth.name')}" required />` : ''}
            ${isRegister ? `
              <div class="role-picker-label">${t('auth.role.label')}</div>
              <div class="role-picker">
                <label class="role-option">
                  <input type="radio" name="authRole" value="passenger" checked />
                  <span class="role-btn">${t('auth.role.passenger')}</span>
                </label>
                <label class="role-option">
                  <input type="radio" name="authRole" value="skipper" />
                  <span class="role-btn">${t('auth.role.skipper')}</span>
                </label>
              </div>
            ` : ''}
            <input type="email" id="authEmail" class="auth-input" placeholder="${t('auth.email')}" required />
            <input type="password" id="authPassword" class="auth-input" placeholder="${t('auth.password')}" required />
            <div class="auth-error hidden" id="authError"></div>
            <button type="submit" class="auth-submit">${isRegister ? t('auth.submit.register') : t('auth.submit.login')}</button>
          </form>
          <button class="auth-toggle" id="authToggle">
            ${isRegister ? t('auth.hasAccount') : t('auth.noAccount')}
          </button>
        </div>
      `;
      el.querySelector('.prep-back').addEventListener('click', showPrepLanding);
      el.querySelector('#authToggle').addEventListener('click', () => { isRegister = !isRegister; render(); });
      el.querySelector('#authForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorEl = el.querySelector('#authError');
        const submitBtn = el.querySelector('.auth-submit');
        const email = el.querySelector('#authEmail').value.trim();
        const password = el.querySelector('#authPassword').value;
        const name = isRegister ? (el.querySelector('#authName')?.value.trim() || '') : '';
        errorEl.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.textContent = t('auth.waiting');
        try {
          if (isRegister) {
            await Auth.signUp(email, password, name);
            // Save selected role
            const roleEl = el.querySelector('input[name="authRole"]:checked');
            const role = roleEl ? roleEl.value : 'passenger';
            Auth.authFetch('/api/profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ role }),
            }).catch(() => {}); // Non-fatal
          } else {
            await Auth.signIn(email, password);
          }
          updateUserButton();
          updateEntryForLoggedIn();
          renderPersonalDashboard(el, daysLeft);
        } catch (err) {
          errorEl.textContent = err.message;
          errorEl.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.textContent = isRegister ? t('auth.submit.register') : t('auth.submit.login');
        }
      });
    }
    render();
  }

  // ============================================
  // PERSONAL DASHBOARD — KPI grid + cards
  // ============================================
  async function renderPersonalDashboard(el, daysLeft) {
    const user = Auth.getUser();
    const name = user?.name || user?.email?.split('@')[0] || t('sailor');

    // Fetch user role
    let userRole = 'passenger';
    try {
      const profileRes = await Auth.authFetch('/api/profile');
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        userRole = profileData.role || 'passenger';
      }
    } catch (e) { /* default passenger */ }

    el.innerHTML = `
      <button class="prep-back">&larr; ${t('prep.back')}</button>

      <div class="dashboard-header">
        <h1>${t('personal.greeting')} ${escapeHtml(name)}!</h1>
        <p>${t('personal.dashboardSub') || 'Her er status på forberedelsene dine.'}</p>
      </div>

      <div class="dashboard-kpi">
        <div class="kpi-card kpi-countdown">
          <div class="kpi-value">${daysLeft}</div>
          <div class="kpi-label">${t('cal.daysLeft')}</div>
        </div>
        <div class="kpi-card kpi-progress">
          <div class="kpi-value" id="dashProgress">0%</div>
          <div class="kpi-label">${t('cal.preparations') || 'Forberedelser'}</div>
        </div>
        <div class="kpi-card kpi-next" id="dashNextDeadline">
          <div class="kpi-value">—</div>
          <div class="kpi-label">${t('personal.nextTask') || 'Neste oppgave'}</div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="dash-card personal-card-calendar"><div id="calendarContainer"></div></div>
        <div class="dash-card" id="taskPanelCard" style="display:none"><div id="taskPanel"></div></div>
        <div class="dash-card">
          <div class="personal-card-header">
            <h3>${t('personal.settings')}</h3>
          </div>
          <div class="role-picker-label">${t('personal.myRole')}</div>
          <div class="role-picker" id="settingsRolePicker">
            <label class="role-option">
              <input type="radio" name="settingsRole" value="passenger" ${userRole === 'passenger' ? 'checked' : ''} />
              <span class="role-btn">${t('auth.role.passenger')}</span>
            </label>
            <label class="role-option">
              <input type="radio" name="settingsRole" value="skipper" ${userRole === 'skipper' ? 'checked' : ''} />
              <span class="role-btn">${t('auth.role.skipper')}</span>
            </label>
          </div>
          <p class="role-change-note" id="roleChangeNote"></p>
        </div>
        <div class="dash-card">
          <div class="personal-card-header">
            <h3>${t('cal.preparations')}</h3>
            <span class="prep-progress-label" id="prepProgress"></span>
          </div>
          <div id="checklistContainer"></div>
        </div>
        <div class="dash-card">
          <div class="personal-card-header">
            <h3>${t('personal.sharedPacking')}</h3>
            <span class="prep-progress-label" id="packingProgress"></span>
          </div>
          <p class="personal-card-sub">${t('personal.sharedSync')}</p>
          <div id="personalPackingContainer"></div>
        </div>
        <div class="dash-card" id="quickAddCard" style="display:none">
          <div class="personal-card-header">
            <h3>${t('cal.removedTasks')}</h3>
            <p class="personal-card-sub">${t('cal.removedSub')}</p>
          </div>
          <div id="quickAddContainer"></div>
        </div>
        <div class="dash-card">
          <div class="personal-card-header">
            <h3>${t('personal.groupNotes')}</h3>
            <span class="notes-saved hidden" id="notesSaved">${t('personal.notesSaved')}</span>
          </div>
          <p class="personal-card-sub">${t('personal.sharedSync')}</p>
          <textarea class="notes-textarea" id="notesArea" placeholder="${t('personal.notesPlaceholder')}"></textarea>
        </div>
      </div>
      <button class="auth-logout" id="logoutBtn">${t('auth.logout')}</button>
    `;
    el.querySelector('.prep-back').addEventListener('click', showPrepLanding);
    el.querySelector('#logoutBtn').addEventListener('click', async () => {
      stopSharedPlanningPolling();
      await Auth.signOut();
      updateUserButton();
      updateEntryForLoggedIn();
      renderAuthForm(el, daysLeft);
    });

    // Settings role picker — live save
    el.querySelectorAll('input[name="settingsRole"]').forEach(radio => {
      radio.addEventListener('change', async () => {
        const newRole = radio.value;
        const note = el.querySelector('#roleChangeNote');
        try {
          await Auth.authFetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: newRole }),
          });
          note.textContent = t('personal.roleSaved');
          userRole = newRole;
          initCalendar(daysLeft, newRole);
          setTimeout(() => { note.textContent = ''; }, 3000);
        } catch (e) {
          note.textContent = t('personal.roleError');
        }
      });
    });

    initCalendar(daysLeft, userRole);
    initNotes();
    renderPersonalPackingList();
    hydrateSharedPlanningState(true).then(() => {
      renderPersonalPackingList();
    });
    startSharedPlanningPolling();
  }

  // ============================================
  // MOBILE MAP — data-map-state (no DOM moving)
  // ============================================
  function setMapState(state) {
    document.body.setAttribute('data-map-state', state); // hidden | peek | full
    requestAnimationFrame(() => { if (map) map.invalidateSize(); });
  }

  function showMobileMap() {
    setMapState('full');
    document.body.style.overflow = 'hidden';
    pushAppState({ section: currentSection, subTab: currentSubTab, mapFull: true });
    setTimeout(() => {
      if (map) map.invalidateSize();
      if (activeRouteId && routeLayers[activeRouteId]) {
        map.fitBounds(routeLayers[activeRouteId].polyline.getBounds(), { padding: [50, 50], maxZoom: 10, animate: true, duration: 0.4 });
      }
    }, 50);
  }

  function hideMobileMap() {
    setMapState('hidden');
    document.body.style.overflow = '';
    if (!pushingState) {
      history.back();
    }
  }

  function initMobileMap() {
    const fab = document.getElementById('mapFab');
    const closeBtn = document.getElementById('mapOverlayClose');
    if (!fab) return;

    setMapState('hidden');

    fab.addEventListener('click', () => showMobileMap());

    if (closeBtn) {
      closeBtn.addEventListener('click', () => hideMobileMap());
    }
  }

})();
