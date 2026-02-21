/* ============================================
   Seilruter Hellas 2026 — v3
   Main application logic
   ============================================ */

(function () {
  'use strict';

  // ---- i18n shorthand ----
  var P = I18n.pick; // pick bilingual field

  // ---- State ----
  let voterName = '';
  let selectedRoute = null;
  let map = null;
  let routeLayers = {};      // { routeId: { polyline, markers[] } }
  let activeRouteId = null;
  let currentSection = 'explore';   // explore | vote | plan
  let currentSubTab = 'routes';     // routes | stops (within explore)
  let currentPrepView = 'landing';
  let currentStopFilter = 'alle';
  let voteSelection = null;
  let totalVoteCount = 0;

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

  const nameInput = document.getElementById('nameInput');
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
  const saved = localStorage.getItem('seilruter-name');
  if (saved) { nameInput.value = saved; enterBtn.disabled = false; }

  nameInput.addEventListener('input', () => {
    enterBtn.disabled = nameInput.value.trim().length < 1;
  });

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !enterBtn.disabled) enterBtn.click();
  });

  enterBtn.addEventListener('click', () => {
    voterName = nameInput.value.trim();
    if (!voterName) return;
    localStorage.setItem('seilruter-name', voterName);
    document.getElementById('voterLabel').textContent = voterName;
    if (entryImageInterval) { clearInterval(entryImageInterval); entryImageInterval = null; }
    showScreen('app');
    renderRoutesList();
    renderStopsPanel();
    renderVoteList();
    fetchTally();
    initPrepSection();
    if (isMobile) initMobileMap();
    // Set initial history state
    history.replaceState({ section: 'explore', subTab: 'routes' }, '', '#explore');
  });

  // Prep shortcut from entry screen
  document.getElementById('prepShortcut').addEventListener('click', (e) => {
    e.preventDefault();
    voterName = nameInput.value.trim() || t('guest');
    localStorage.setItem('seilruter-name', voterName);
    document.getElementById('voterLabel').textContent = voterName;
    if (entryImageInterval) { clearInterval(entryImageInterval); entryImageInterval = null; }
    showScreen('app');
    renderRoutesList();
    renderStopsPanel();
    renderVoteList();
    fetchTally();
    initPrepSection();
    if (isMobile) initMobileMap();
    switchSection('plan');
    history.replaceState({ section: 'plan', prepView: 'landing' }, '', '#plan');
  });

  // ============================================
  // SECTION & TAB SWITCHING
  // ============================================
  function switchSection(section) {
    currentSection = section;
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
  function initMap() {
    map = L.map('map', { center: [37.5, 25.0], zoom: 7, zoomControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19,
    }).addTo(map);
    (window.ROUTES_DATA || []).forEach(route => drawRoute(route));
    renderLegend();
  }

  function drawRoute(route) {
    const coords = [];
    route.stops.forEach(s => {
      if (s.waypoints) s.waypoints.forEach(wp => coords.push(wp));
      coords.push([s.lat, s.lng]);
    });
    const polyline = L.polyline(coords, { color: route.color, weight: 3, opacity: 0.7 }).addTo(map);
    polyline.on('click', () => selectRoute(route.id));

    const markers = route.stops.map((stop, i) => {
      const isStart = i === 0;
      const icon = L.divIcon({
        className: 'numbered-marker-wrapper',
        html: `<div class="numbered-marker ${isStart ? 'start-marker' : ''}" style="background:${route.color}">${i}</div>`,
        iconSize: isStart ? [30, 30] : [24, 24],
        iconAnchor: isStart ? [15, 15] : [12, 12],
      });
      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
      const { slug: stopSlug, island: stopIsland } = findIsland(stop.name);
      const nameHtml = stopIsland
        ? `<a href="#" class="popup-stop-link" data-slug="${stopSlug}" style="color:var(--accent);text-decoration:underline;font-weight:600;cursor:pointer">${escapeHtml(stop.name)}</a>`
        : `<strong>${escapeHtml(stop.name)}</strong>`;
      marker.bindPopup(`
        ${nameHtml}<br>
        ${t('detail.day')} ${stop.day}${stop.nm ? ' &middot; ' + stop.nm + ' NM' : ''}
        ${stop.highlight ? '<br><em>' + escapeHtml(P(stop.highlight)) + '</em>' : ''}
      `);
      marker.on('click', () => selectRoute(route.id));
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
      return marker;
    });
    routeLayers[route.id] = { polyline, markers };
  }

  function selectRoute(routeId) {
    activeRouteId = routeId;
    const routes = window.ROUTES_DATA || [];
    routes.forEach(r => {
      const layer = routeLayers[r.id];
      if (!layer) return;
      const isActive = r.id === routeId;
      layer.polyline.setStyle({ opacity: isActive ? 0.9 : 0.15, weight: isActive ? 4 : 2 });
      layer.markers.forEach(m => m.setOpacity(isActive ? 1 : 0.2));
    });
    const layer = routeLayers[routeId];
    if (layer) map.fitBounds(layer.polyline.getBounds(), { padding: [50, 50], maxZoom: 10, animate: true, duration: 0.6 });
    const route = routes.find(r => r.id === routeId);
    if (route) document.getElementById('activeRouteName').textContent = P(route.name);
    document.querySelectorAll('.route-card').forEach(card => card.classList.toggle('selected', card.dataset.routeId === routeId));
    if (isMobile) {
      const fab = document.getElementById('mapFab');
      if (fab && route) fab.querySelector('span').textContent = P(route.name);
    }
  }

  function resetMapView() {
    activeRouteId = null;
    (window.ROUTES_DATA || []).forEach(r => {
      const layer = routeLayers[r.id];
      if (!layer) return;
      layer.polyline.setStyle({ opacity: 0.7, weight: 3 });
      layer.markers.forEach(m => m.setOpacity(1));
    });
    map.setView([37.5, 25.0], 7, { animate: true, duration: 0.6 });
    document.getElementById('activeRouteName').textContent = '';
    if (isMobile) {
      const fab = document.getElementById('mapFab');
      if (fab) fab.querySelector('span').textContent = t('map.button');
    }
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
        if (activeRouteId === id) resetMapView(); else selectRoute(id);
      });
    });
  }

  // ============================================
  // ROUTES LIST
  // ============================================
  function renderRoutesList() {
    const list = document.getElementById('routesList');
    const routes = window.ROUTES_DATA || [];
    list.innerHTML = routes.map((r, i) => `
      <div class="route-card" data-route-id="${r.id}" style="animation-delay:${0.05 * i}s">
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
              <span class="itin-day">${t('detail.day')} ${s.day}</span>
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
      const userName = user?.name || user?.email?.split('@')[0] || '';
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

    const user = Auth.getUser();
    const voteName = user?.name || user?.email?.split('@')[0] || voterName;

    // Optimistic UI — immediately mark as voted
    const btn = document.querySelector(`.vote-row-btn[data-route="${routeId}"]`);
    if (btn) { btn.textContent = '…'; btn.disabled = true; }

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: voteName, route: routeId }),
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
    const user = Auth.getUser();
    const voteName = user?.name || user?.email?.split('@')[0] || voterName;

    try {
      const res = await fetch('/api/vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: voteName }),
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
          <ul class="prep-cta-features">
            <li>${t('prep.voteFeature')}</li>
            <li>${t('prep.packingFeature')}</li>
            <li>${t('prep.countdownFeature')}</li>
            <li>${t('prep.notesFeature')}</li>
          </ul>
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
    currentPrepView = 'landing';
    document.getElementById('prepLanding').classList.remove('hidden');
    document.querySelectorAll('.prep-sub').forEach(s => s.classList.add('hidden'));
    renderPrepNavCards();
    document.getElementById('prepScroll').scrollTop = 0;
    pushAppState({ section: 'plan', prepView: 'landing' });
  }

  function showPrepSub(view) {
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
          if (isRegister) await Auth.signUp(email, password, name); else await Auth.signIn(email, password);
          updateUserButton();
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
  function renderPersonalDashboard(el, daysLeft) {
    const user = Auth.getUser();
    const name = user?.name || user?.email?.split('@')[0] || t('sailor');
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
            <h3>${t('cal.preparations')}</h3>
            <span class="prep-progress-label" id="prepProgress"></span>
          </div>
          <div id="checklistContainer"></div>
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
            <h3>${t('personal.notes')}</h3>
            <span class="notes-saved hidden" id="notesSaved">${t('personal.notesSaved')}</span>
          </div>
          <textarea class="notes-textarea" id="notesArea" placeholder="${t('personal.notesPlaceholder')}"></textarea>
        </div>
      </div>
      <button class="auth-logout" id="logoutBtn">${t('auth.logout')}</button>
    `;
    el.querySelector('.prep-back').addEventListener('click', showPrepLanding);
    el.querySelector('#logoutBtn').addEventListener('click', async () => { await Auth.signOut(); updateUserButton(); renderAuthForm(el, daysLeft); });
    initCalendar(daysLeft);
    initNotes();
  }

  // ---- Notes ----
  let notesSaveTimeout = null;
  function initNotes() {
    const textarea = document.getElementById('notesArea');
    if (!textarea) return;
    textarea.value = localStorage.getItem('sr-notes') || '';
    textarea.addEventListener('input', () => {
      clearTimeout(notesSaveTimeout);
      notesSaveTimeout = setTimeout(() => {
        localStorage.setItem('sr-notes', textarea.value);
        const saved = document.getElementById('notesSaved');
        if (saved) { saved.classList.remove('hidden'); setTimeout(() => saved.classList.add('hidden'), 2000); }
        if (Auth.isLoggedIn()) {
          Auth.authFetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: textarea.value }) }).catch(() => {});
        }
      }, 2000);
    });
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
