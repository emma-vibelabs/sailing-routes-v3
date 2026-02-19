/* ============================================
   Seilruter Hellas 2026 — v3
   Main application logic
   ============================================ */

(function () {
  'use strict';

  // ---- State ----
  let voterName = '';
  let selectedRoute = null;
  let map = null;
  let routeLayers = {};      // { routeId: { polyline, markers[] } }
  let activeRouteId = null;
  let currentTab = 'routes';
  let currentPrepView = 'landing'; // 'landing' | 'boat-life' | 'seasickness' | 'packing' | 'personal'
  let currentStopFilter = 'alle';
  let voteSelection = null;

  // ---- Mobile state ----
  let isMobile = window.innerWidth <= 768;
  let mapOverlayOpen = false;

  window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    if (wasMobile !== isMobile && map) {
      setTimeout(() => map.invalidateSize(), 100);
    }
  });

  // ---- Elements ----
  const screens = {
    entry: document.getElementById('entry'),
    app: document.getElementById('app'),
  };

  const nameInput = document.getElementById('nameInput');
  const enterBtn = document.getElementById('enterBtn');

  // ---- Helpers ----
  function unsplash(id, w, h) {
    // First check if id is a destination name in IMAGE_URLS
    const urls = window.IMAGE_URLS || {};
    const baseUrl = urls[id] || urls['greek-island'];
    if (baseUrl) return baseUrl + '?w=' + (w||400) + '&h=' + (h||300) + '&fit=crop&auto=format';
    // Fallback for long-format IDs (contain hyphen and digits)
    if (id && id.includes('-') && /\d/.test(id)) {
      return 'https://images.unsplash.com/photo-' + id + '?w=' + (w||400) + '&h=' + (h||300) + '&fit=crop&auto=format';
    }
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=' + (w||400) + '&h=' + (h||300) + '&fit=crop&auto=format';
  }

  // Robust slug: strip " — …", " (…)", "(retur)", "(hviledag)" etc, then slugify
  function slugify(name) {
    const base = name
      .replace(/\s*\(.*?\)/g, '')   // remove (Tzia), (retur), (hviledag), etc
      .replace(/\s*—\s*.*/g, '')    // remove " — Adamas", " — Batsi", etc
      .trim()
      .toLowerCase()
      .replace(/[^a-zæøå0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');       // trim leading/trailing dashes
    return base;
  }

  // Look up island from ISLANDS_DATA with fallback
  function findIsland(name) {
    const islands = window.ISLANDS_DATA || {};
    const slug = slugify(name);
    if (islands[slug]) return { island: islands[slug], slug };
    // Fuzzy: try matching island names
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
    showScreen('app');
    renderRoutesList();
    renderStopsPanel();
    fetchTally();
    initPrepSection();

    // Check for existing auth session
    Auth.getSession().catch(() => {});

    // Wire mobile FAB
    if (isMobile) {
      initMobileMap();
    }
  });

  // Prep shortcut from entry screen (skip name requirement for public content)
  document.getElementById('prepShortcut').addEventListener('click', (e) => {
    e.preventDefault();
    voterName = nameInput.value.trim() || 'Gjest';
    localStorage.setItem('seilruter-name', voterName);
    document.getElementById('voterLabel').textContent = voterName;
    showScreen('app');
    renderRoutesList();
    renderStopsPanel();
    fetchTally();
    initPrepSection();
    Auth.getSession().catch(() => {});
    if (isMobile) initMobileMap();
    // Go directly to Min side
    document.querySelector('[data-tab="minside"]').click();
  });

  // ---- Tabs (Ruter / Stopp / Min side) ----
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      currentTab = tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));

      const exploreEl = document.getElementById('exploreSection');
      const prepEl = document.getElementById('prepSection');
      const fab = document.getElementById('mapFab');

      if (tab === 'minside') {
        // Show Min side (prep section), hide explore + map
        exploreEl.classList.add('hidden');
        prepEl.classList.remove('hidden');
        if (fab) fab.style.display = 'none';
        if (!prepInitialized) initPrepSection();
        showPrepLanding();
      } else {
        // Show explore (routes/stops + map), hide prep
        exploreEl.classList.remove('hidden');
        prepEl.classList.add('hidden');
        if (fab) fab.style.display = '';
        document.querySelectorAll('.tab-panel').forEach(p =>
          p.classList.toggle('active', p.id === 'panel-' + tab)
        );

        // Reset sub-views
        if (tab === 'routes') {
          document.getElementById('routeDetail').style.display = 'none';
          document.getElementById('routesList').style.display = '';
        }
        if (tab === 'stops') {
          document.getElementById('stopDetail').style.display = 'none';
          document.getElementById('stopsGrid').style.display = '';
          document.querySelector('.stops-header').style.display = '';
        }
      }
    });
  });

  // ============================================
  // MAP
  // ============================================
  function initMap() {
    map = L.map('map', {
      center: [37.5, 25.0],
      zoom: 7,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    const routes = window.ROUTES_DATA || [];
    routes.forEach(route => {
      drawRoute(route);
    });

    renderLegend();
  }

  function drawRoute(route) {
    const coords = [];
    route.stops.forEach(s => {
      // Insert intermediate waypoints (routing around land) before this stop
      if (s.waypoints) s.waypoints.forEach(wp => coords.push(wp));
      coords.push([s.lat, s.lng]);
    });
    const polyline = L.polyline(coords, {
      color: route.color,
      weight: 3,
      opacity: 0.7,
      dashArray: null,
    }).addTo(map);

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
      marker.bindPopup(`
        <strong>${stop.name}</strong><br>
        Dag ${stop.day}${stop.nm ? ' &middot; ' + stop.nm + ' NM' : ''}
        ${stop.highlight ? '<br><em>' + stop.highlight + '</em>' : ''}
      `);
      marker.on('click', () => selectRoute(route.id));
      return marker;
    });

    routeLayers[route.id] = { polyline, markers };
  }

  function selectRoute(routeId) {
    activeRouteId = routeId;
    const routes = window.ROUTES_DATA || [];

    // Dim inactive routes
    routes.forEach(r => {
      const layer = routeLayers[r.id];
      if (!layer) return;
      const isActive = r.id === routeId;
      layer.polyline.setStyle({
        opacity: isActive ? 0.9 : 0.15,
        weight: isActive ? 4 : 2,
      });
      layer.markers.forEach(m => {
        m.setOpacity(isActive ? 1 : 0.2);
      });
    });

    // Zoom to route
    const layer = routeLayers[routeId];
    if (layer) {
      map.fitBounds(layer.polyline.getBounds(), { padding: [50, 50], maxZoom: 10, animate: true, duration: 0.6 });
    }

    // Update header
    const route = routes.find(r => r.id === routeId);
    if (route) {
      document.getElementById('activeRouteName').textContent = route.name;
    }

    // Highlight card in list
    document.querySelectorAll('.route-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.routeId === routeId);
    });

    // On mobile: update FAB to show route name
    if (isMobile && !mapOverlayOpen) {
      const fab = document.getElementById('mapFab');
      if (fab && route) {
        fab.querySelector('span').textContent = route.name;
      }
    }
  }

  function resetMapView() {
    activeRouteId = null;
    const routes = window.ROUTES_DATA || [];
    routes.forEach(r => {
      const layer = routeLayers[r.id];
      if (!layer) return;
      layer.polyline.setStyle({ opacity: 0.7, weight: 3 });
      layer.markers.forEach(m => m.setOpacity(1));
    });
    map.setView([37.5, 25.0], 7, { animate: true, duration: 0.6 });
    document.getElementById('activeRouteName').textContent = '';

    if (isMobile) {
      const fab = document.getElementById('mapFab');
      if (fab) fab.querySelector('span').textContent = 'Kart';
    }
  }

  function renderLegend() {
    const legend = document.getElementById('mapLegend');
    const routes = window.ROUTES_DATA || [];
    legend.innerHTML = routes.map(r => `
      <div class="legend-item" data-route="${r.id}">
        <span class="legend-dot" style="background:${r.color}"></span>
        <span class="legend-name">${r.name}</span>
      </div>
    `).join('');

    legend.querySelectorAll('.legend-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.route;
        if (activeRouteId === id) {
          resetMapView();
        } else {
          selectRoute(id);
        }
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
            <div class="route-region">${r.region}</div>
            <div class="route-name">${r.name}</div>
          </div>
        </div>
        <div class="route-card-body">
          <div class="route-card-desc">${r.tagline}</div>
          <div class="route-card-stats">
            <span><span class="stat-icon">⛵</span> ~${r.distance} NM</span>
            <span><span class="stat-icon">📅</span> ${r.sailingDays}+${r.restDays}d</span>
            <span class="difficulty-badge" style="background:${difficultyColor(r.difficultyLevel)}20;color:${difficultyColor(r.difficultyLevel)}">${r.difficulty}</span>
          </div>
          <div class="route-card-actions">
            <button class="btn-detail" data-route="${r.id}">Detaljer</button>
            <button class="btn-vote" style="background:${r.color}" data-route="${r.id}">Stem</button>
          </div>
        </div>
      </div>
    `).join('');

    // Card click → select on map
    list.querySelectorAll('.route-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-detail') || e.target.closest('.btn-vote')) return;
        selectRoute(card.dataset.routeId);
      });
    });

    // Detail buttons
    list.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', () => showRouteDetail(btn.dataset.route));
    });

    // Vote buttons
    list.querySelectorAll('.btn-vote').forEach(btn => {
      btn.addEventListener('click', () => submitVote(btn.dataset.route));
    });
  }

  function showRouteDetail(routeId) {
    const routes = window.ROUTES_DATA || [];
    const r = routes.find(x => x.id === routeId);
    if (!r) return;

    selectRoute(routeId);

    const detail = document.getElementById('routeDetail');
    const islands = window.ISLANDS_DATA || {};

    detail.innerHTML = `
      <button class="detail-back">&larr; Alle ruter</button>
      <div class="detail-hero" style="background-image:url('${unsplash(r.heroImage, 700, 350)}')">
        <div class="detail-hero-text">
          <div class="detail-region">${r.region}</div>
          <h2>${r.name}</h2>
        </div>
      </div>
      <div class="detail-tagline">${r.tagline}</div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-value">~${r.distance}</div>
          <div class="stat-label">Nautiske mil</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${r.sailingDays}</div>
          <div class="stat-label">Seilingsdager</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${r.restDays}</div>
          <div class="stat-label">Hviledager</div>
        </div>
      </div>

      <div class="difficulty-meter">
        <div class="meter-label">Vanskelighetsgrad</div>
        <div class="meter-bar">
          <div class="meter-fill" style="width:${difficultyPercent(r.difficultyLevel)}%;background:${difficultyColor(r.difficultyLevel)}"></div>
        </div>
        <div class="meter-text" style="color:${difficultyColor(r.difficultyLevel)}">${r.difficulty}</div>
      </div>

      <p class="detail-desc">${r.description}</p>

      <div class="weather-cards">
        <div class="weather-card">
          <div class="wc-icon">☀️</div>
          <div class="wc-value">${r.weather.airDay}</div>
          <div class="wc-label">Luft (dag)</div>
        </div>
        <div class="weather-card">
          <div class="wc-icon">🌙</div>
          <div class="wc-value">${r.weather.airNight}</div>
          <div class="wc-label">Luft (natt)</div>
        </div>
        <div class="weather-card">
          <div class="wc-icon">🌊</div>
          <div class="wc-value">${r.weather.seaTemp}</div>
          <div class="wc-label">Sjøtemp</div>
        </div>
        <div class="weather-card">
          <div class="wc-icon">💨</div>
          <div class="wc-value">${r.weather.wind}</div>
          <div class="wc-label">Vind</div>
        </div>
      </div>

      <div class="itinerary-title">Dag for dag</div>
      <div class="itinerary-table">
        ${r.stops.map((s, i) => {
          const prevName = i > 0 ? r.stops[i-1].name : '';
          const routeText = i === 0 ? s.name : (s.isRest ? `${s.name} (hviledag)` : `${prevName} → ${s.name}`);
          const { island, slug } = findIsland(s.name);
          const thumbId = island ? island.image : (s.image || null);
          return `
            <div class="itinerary-row ${s.isRest ? 'rest' : ''}" data-stop-slug="${slug}">
              <span class="itin-day">Dag ${s.day}</span>
              <img class="itin-thumb" src="${unsplash(thumbId, 72, 72)}" alt="${s.name}" loading="lazy" />
              <div class="itin-info">
                <div class="itin-route-name">${routeText}</div>
                <div class="itin-highlight">${s.highlight || ''}</div>
              </div>
              <div class="itin-stats">
                ${s.isRest
                  ? '<span class="itin-rest-badge">Hvile</span>'
                  : (s.nm ? `<div class="itin-nm">⛵ ${s.nm} NM</div><div class="itin-hours">~${s.hours || Math.round(s.nm / 5.5)}t</div>` : '')
                }
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <button class="detail-vote-btn" style="background:${r.color}" data-route="${r.id}">Stem på ${r.name}</button>
    `;

    // Wire events
    detail.querySelector('.detail-back').addEventListener('click', () => {
      detail.style.display = 'none';
      document.getElementById('routesList').style.display = '';
      resetMapView();
    });

    detail.querySelector('.detail-vote-btn').addEventListener('click', () => {
      submitVote(r.id);
    });

    // Click itinerary row → zoom to stop on map
    detail.querySelectorAll('.itinerary-row').forEach(row => {
      row.addEventListener('click', () => {
        const stop = r.stops.find(s => slugify(s.name) === row.dataset.stopSlug);
        if (stop && map) {
          map.setView([stop.lat, stop.lng], 12, { animate: true, duration: 0.5 });
        }
      });
    });

    document.getElementById('routesList').style.display = 'none';
    detail.style.display = '';

    // Scroll to top of sidebar
    document.getElementById('sidebar').scrollTop = 0;
  }

  // ============================================
  // STOPS PANEL
  // ============================================
  function renderStopsPanel() {
    const islands = window.ISLANDS_DATA || {};
    const routes = window.ROUTES_DATA || [];

    // Collect unique regions
    const regions = new Set(['alle']);
    Object.values(islands).forEach(isl => {
      if (isl.region) regions.add(isl.region);
    });

    // Render filters
    const filtersEl = document.getElementById('regionFilters');
    const regionLabels = {
      'alle': 'Alle',
      'saroniske': 'Saroniske',
      'kykladene': 'Kykladene',
      'sma-kykladene': 'Små Kykladene',
      'nordlige-kykladene': 'Nordlige Kykl.',
      'dodekanesene': 'Dodekanesene',
      'sporadene': 'Sporadene',
      'attika': 'Attika',
      'peloponnese': 'Peloponnese',
      'evia': 'Evia',
    };

    filtersEl.innerHTML = Array.from(regions).map(r =>
      `<button class="region-pill ${r === 'alle' ? 'active' : ''}" data-region="${r}">${regionLabels[r] || r}</button>`
    ).join('');

    filtersEl.querySelectorAll('.region-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        currentStopFilter = pill.dataset.region;
        filtersEl.querySelectorAll('.region-pill').forEach(p => p.classList.toggle('active', p === pill));
        renderStopsGrid();
      });
    });

    // Search
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
        if (search && !isl.name.toLowerCase().includes(search) && !(isl.tagline || '').toLowerCase().includes(search)) return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    // Count routes per island
    function routesForIsland(slug) {
      const matchNames = [];
      routes.forEach(r => {
        const match = r.stops.some(s => {
          return slugify(s.name) === slug || s.name.toLowerCase().includes(slug.replace(/-/g, ' '));
        });
        if (match) matchNames.push(r);
      });
      return matchNames;
    }

    grid.innerHTML = entries.map(isl => {
      const rts = routesForIsland(isl.slug);
      return `
        <div class="stop-card" data-slug="${isl.slug}">
          <div class="stop-card-img" style="background-image:url('${unsplash(isl.image, 300, 200)}')">
            <span class="stop-card-region">${isl.region}</span>
          </div>
          <div class="stop-card-body">
            <div class="stop-card-name">${isl.name}</div>
            <div class="stop-card-desc">${isl.tagline || ''}</div>
            <div class="stop-card-routes">${rts.length} rute${rts.length !== 1 ? 'r' : ''}</div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.stop-card').forEach(card => {
      card.addEventListener('click', () => showStopDetail(card.dataset.slug));
    });
  }

  function showStopDetail(slug) {
    const islands = window.ISLANDS_DATA || {};
    const routes = window.ROUTES_DATA || [];
    const isl = islands[slug];
    if (!isl) return;

    // Zoom map to island
    if (map && isl.lat && isl.lng) {
      map.setView([isl.lat, isl.lng], 12, { animate: true, duration: 0.5 });
    }

    const detail = document.getElementById('stopDetail');

    // Find which routes pass through
    const throughRoutes = routes.filter(r =>
      r.stops.some(s => {
        return slugify(s.name) === slug || s.name.toLowerCase().includes(slug.replace(/-/g, ' '));
      })
    );

    detail.innerHTML = `
      <button class="detail-back">&larr; Alle stopp</button>
      <div class="stop-detail-img" style="background-image:url('${unsplash(isl.image, 700, 350)}')"></div>
      <h3>${isl.name}</h3>
      <span class="stop-region-tag">${isl.region}</span>
      <p class="stop-desc">${isl.description || ''}</p>

      ${isl.highlights ? `
        <div class="stop-section">
          <div class="stop-section-title">Highlights</div>
          <ul style="padding-left:1rem;font-size:0.82rem;color:var(--text-muted);line-height:1.6">
            ${isl.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${isl.anchorage ? `
        <div class="stop-section">
          <div class="stop-section-title">Ankerplass</div>
          <div class="anchorage-grid">
            <div class="anchorage-item"><strong>Beskyttelse:</strong> ${isl.anchorage.protection}</div>
            <div class="anchorage-item"><strong>Bunn:</strong> ${isl.anchorage.bottom}</div>
            <div class="anchorage-item"><strong>Dybde:</strong> ${isl.anchorage.depth}</div>
            <div class="anchorage-item"><strong>Fasiliteter:</strong> ${isl.anchorage.facilities || '—'}</div>
          </div>
        </div>
      ` : ''}

      ${isl.restaurants && isl.restaurants.length ? `
        <div class="stop-section">
          <div class="stop-section-title">Restauranter</div>
          ${isl.restaurants.map(r => `
            <div class="restaurant-item">
              <div class="restaurant-name">${r.name} <span style="color:var(--text-light)">${r.price || ''}</span></div>
              <div class="restaurant-info">${r.specialty}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${isl.mustDo ? `
        <div class="stop-section">
          <div class="stop-section-title">Ikke gå glipp av</div>
          <div class="must-do-box">${isl.mustDo}</div>
        </div>
      ` : ''}

      ${isl.localSpecialty ? `
        <div class="stop-section">
          <div class="stop-section-title">Lokal spesialitet</div>
          <p style="font-size:0.82rem;color:var(--text-muted)">${isl.localSpecialty}</p>
        </div>
      ` : ''}

      ${throughRoutes.length ? `
        <div class="stop-section">
          <div class="stop-section-title">Ruter gjennom ${isl.name}</div>
          <div class="stop-routes-list">
            ${throughRoutes.map(r => `<span class="stop-route-chip" style="background:${r.color}">${r.name}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    `;

    detail.querySelector('.detail-back').addEventListener('click', () => {
      detail.style.display = 'none';
      document.getElementById('stopsGrid').style.display = '';
      document.querySelector('.stops-header').style.display = '';
    });

    document.getElementById('stopsGrid').style.display = 'none';
    document.querySelector('.stops-header').style.display = 'none';
    detail.style.display = '';
    document.getElementById('sidebar').scrollTop = 0;
  }

  // ============================================
  // VOTING
  // ============================================
  function renderVotePanel() {
    const routes = window.ROUTES_DATA || [];
    const cards = document.getElementById('voteCards');

    cards.innerHTML = routes.map(r => `
      <div class="vote-card" data-route="${r.id}">
        <span class="vote-color-dot" style="background:${r.color}"></span>
        <div class="vote-card-info">
          <div class="vote-card-name">${r.name}</div>
          <div class="vote-card-tagline">${r.tagline}</div>
          <div class="vote-card-stats">~${r.distance} NM &middot; ${r.sailingDays}+${r.restDays}d &middot; ${r.difficulty}</div>
        </div>
      </div>
    `).join('') + `<button class="vote-submit-btn" id="voteSubmitBtn" disabled>Stem</button>`;

    cards.querySelectorAll('.vote-card').forEach(card => {
      card.addEventListener('click', () => {
        voteSelection = card.dataset.route;
        cards.querySelectorAll('.vote-card').forEach(c => c.classList.toggle('selected', c === card));
        document.getElementById('voteSubmitBtn').disabled = false;
        selectRoute(voteSelection);
      });
    });

    document.getElementById('voteSubmitBtn').addEventListener('click', () => {
      if (voteSelection) submitVote(voteSelection);
    });
  }

  async function submitVote(routeId) {
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: voterName, route: routeId }),
      });
      const data = await res.json();
      if (data.success) {
        // Inline feedback on vote buttons
        document.querySelectorAll('.btn-vote[data-route="' + routeId + '"]').forEach(btn => {
          btn.textContent = '✓ Stemt!';
          btn.style.opacity = '0.7';
          btn.style.pointerEvents = 'none';
        });
        const detailBtn = document.querySelector('.detail-vote-btn[data-route="' + routeId + '"]');
        if (detailBtn) {
          detailBtn.textContent = '✓ Stemt!';
          detailBtn.style.opacity = '0.7';
          detailBtn.style.pointerEvents = 'none';
        }
        renderVoteResults(data.tally, data.voters);
      }
    } catch (err) {
      console.error('Vote error:', err);
    }
  }

  async function fetchTally() {
    try {
      const res = await fetch('/api/results');
      const data = await res.json();
      if (data.tally) renderVoteResults(data.tally, data.voters);
    } catch (err) {
      console.error('Tally fetch error:', err);
    }
  }

  function renderVoteResults(tally, voters) {
    const resultsEl = document.getElementById('voteResults');
    const routes = window.ROUTES_DATA || [];
    const total = Object.values(tally).reduce((a, b) => a + b, 0) || 1;

    const sorted = routes
      .map(r => ({ ...r, count: tally[r.id] || 0, voterList: (voters && voters[r.id]) || [] }))
      .sort((a, b) => b.count - a.count);

    resultsEl.innerHTML = `
      <div class="results-title">Resultater</div>
      ${sorted.map(r => `
        <div class="result-bar">
          <div class="result-bar-header">
            <span class="result-bar-name" style="color:${r.color}">${r.name}</span>
            <span class="result-bar-count">${r.count}</span>
          </div>
          <div class="result-bar-track">
            <div class="result-bar-fill" style="width:${(r.count / total * 100).toFixed(1)}%;background:${r.color}"></div>
          </div>
          ${r.voterList.length ? `<div class="result-voters">${r.voterList.join(', ')}</div>` : ''}
        </div>
      `).join('')}
    `;
  }

  // ============================================
  // TAB SWITCHING HELPERS
  // ============================================
  function switchToMinside() {
    document.querySelector('[data-tab="minside"]').click();
  }

  // ============================================
  // FORBEREDELSER (PREPARATION)
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

    // Auth CTA at top
    let ctaHtml = '';
    if (!isLoggedIn) {
      ctaHtml = `
        <div class="prep-auth-cta">
          <div class="prep-cta-icon">⛵</div>
          <h3>Gjør turen personlig</h3>
          <ul class="prep-cta-features">
            <li>Stem på din favorittute</li>
            <li>Personlig pakkeliste med avkrysning</li>
            <li>Nedtellingskalender til avgang</li>
            <li>Private reisenotater</li>
          </ul>
          <div class="prep-cta-buttons">
            <button class="prep-cta-register" id="prepCtaRegister">Opprett konto</button>
            <button class="prep-cta-login" id="prepCtaLogin">Logg inn</button>
          </div>
        </div>
      `;
    } else {
      const user = Auth.getUser();
      const name = user?.name || user?.email?.split('@')[0] || 'Seiler';
      const tripStart = new Date('2026-04-18');
      const today = new Date(); today.setHours(0,0,0,0);
      const daysLeft = Math.max(0, Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24)));
      ctaHtml = `
        <div class="prep-user-card">
          <div class="prep-user-greeting">Hei, ${name}!</div>
          <div class="prep-user-countdown">${daysLeft} dager til avgang</div>
          <button class="prep-user-go" data-prep="personal">Min planlegging &rarr;</button>
        </div>
      `;
    }

    const cards = [
      { id: 'boat-life', icon: '⛵', title: 'Livet om bord', desc: 'Hva du kan forvente av to uker på seilbåt' },
      { id: 'seasickness', icon: '💊', title: 'Sjøsyke', desc: 'Medisiner, forebygging og tips fra erfarne seilere' },
      { id: 'packing', icon: '🎒', title: 'Pakkeliste', desc: 'Foreslått pakkeliste for Hellas i slutten av mai' },
      { id: 'personal', icon: '📋', title: 'Min planlegging', desc: 'Pakkeliste, notater, nedtelling og stemming' },
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

    // Wire card clicks
    container.querySelectorAll('.prep-card').forEach(card => {
      card.addEventListener('click', () => showPrepSub(card.dataset.prep));
    });

    // Wire CTA buttons
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
    renderPrepNavCards(); // Re-render to update auth CTA state
    document.getElementById('prepScroll').scrollTop = 0;
  }

  function showPrepSub(view) {
    currentPrepView = view;
    document.getElementById('prepLanding').classList.add('hidden');
    document.querySelectorAll('.prep-sub').forEach(s => s.classList.add('hidden'));

    const content = window.PREP_CONTENT || {};

    switch (view) {
      case 'boat-life': renderPrepArticle('prepBoatLife', content.boatLife); break;
      case 'seasickness': renderSeasickness('prepSeasickness', content.seasickness); break;
      case 'packing': renderPublicPacking('prepPacking', content.packingList); break;
      case 'personal': renderPersonalArea('prepPersonal'); break;
    }

    document.getElementById('prepScroll').scrollTop = 0;
  }

  function prepBackBtn() {
    return `<button class="prep-back">
      &larr; Tilbake
    </button>`;
  }

  function renderPrepArticle(containerId, data) {
    if (!data) return;
    const el = document.getElementById(containerId);
    el.classList.remove('hidden');
    el.innerHTML = `
      <button class="prep-back">&larr; Tilbake</button>
      <div class="prep-article-header">
        <span class="prep-article-icon">${data.icon || ''}</span>
        <h2 class="prep-article-title">${data.title}</h2>
        <p class="prep-article-subtitle">${data.subtitle}</p>
      </div>
      <div class="prep-article-body">
        ${data.sections.map((s, i) => `
          <div class="prep-article-section" style="animation-delay:${0.06 * i}s">
            <h3>${s.heading}</h3>
            <div class="prep-article-text">${s.body}</div>
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
      <button class="prep-back">&larr; Tilbake</button>
      <div class="prep-article-header">
        <span class="prep-article-icon">${data.icon || ''}</span>
        <h2 class="prep-article-title">${data.title}</h2>
        <p class="prep-article-subtitle">${data.subtitle}</p>
      </div>
      <div class="prep-article-body">
        ${data.sections.map((s, i) => `
          <div class="prep-article-section" style="animation-delay:${0.06 * i}s">
            <h3>${s.heading}</h3>
            <div class="prep-article-text">${s.body}</div>
            ${s.medications ? `
              <div class="med-cards">
                ${s.medications.map(m => `
                  <div class="med-card">
                    <div class="med-card-header">
                      <strong>${m.name}</strong>
                      <span class="med-rating">${m.rating}</span>
                    </div>
                    <div class="med-dosage">${m.dosage}</div>
                    <div class="med-notes">${m.notes}</div>
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
      <button class="prep-back">&larr; Tilbake</button>
      <div class="prep-article-header">
        <span class="prep-article-icon">${data.icon || ''}</span>
        <h2 class="prep-article-title">${data.title}</h2>
        <p class="prep-article-subtitle">${data.subtitle}</p>
      </div>

      <div class="packing-golden-rule">
        <div class="golden-rule-icon">💡</div>
        <div class="golden-rule-text">${data.goldenRule}</div>
      </div>

      <div class="packing-categories">
        ${data.categories.map((cat, ci) => `
          <div class="packing-category" style="animation-delay:${0.06 * ci}s">
            <div class="packing-cat-header" data-toggle="cat-${cat.id}">
              <span class="packing-cat-icon">${cat.icon}</span>
              <span class="packing-cat-name">${cat.name}</span>
              <span class="packing-cat-count">${cat.items.length}</span>
              <svg class="packing-cat-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="packing-cat-items" id="cat-${cat.id}">
              ${cat.items.map(item => `
                <label class="packing-item ${item.essential ? 'essential' : 'optional'}">
                  <input type="checkbox" disabled />
                  <span class="packing-item-text">${item.text}</span>
                  ${item.essential ? '<span class="packing-essential-badge">Essensielt</span>' : ''}
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="packing-not-bring">
        <h3>Ikke ta med</h3>
        <ul>
          ${data.notBring.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;

    el.querySelector('.prep-back').addEventListener('click', showPrepLanding);

    // Category collapse/expand
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

    // Calculate days until trip
    const tripStart = new Date('2026-04-18');
    const today = new Date();
    today.setHours(0,0,0,0);
    const daysLeft = Math.max(0, Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24)));

    if (Auth.isLoggedIn()) {
      renderPersonalDashboard(el, daysLeft);
    } else {
      renderAuthForm(el, daysLeft);
    }
  }

  function renderAuthForm(el, daysLeft) {
    let isRegister = false;

    function render() {
      el.innerHTML = `
        <button class="prep-back">&larr; Tilbake</button>
        <div class="personal-hero">
          <div class="personal-countdown-big">${daysLeft}</div>
          <div class="personal-countdown-label">dager til avgang</div>
        </div>

        <div class="auth-form-wrap">
          <h3 class="auth-title">${isRegister ? 'Opprett konto' : 'Logg inn'}</h3>
          <p class="auth-subtitle">For å bruke din personlige pakkeliste, notater og nedtelling</p>
          <form id="authForm" class="auth-form">
            ${isRegister ? '<input type="text" id="authName" class="auth-input" placeholder="Navn" required />' : ''}
            <input type="email" id="authEmail" class="auth-input" placeholder="E-post" required />
            <input type="password" id="authPassword" class="auth-input" placeholder="Passord (min 8 tegn)" required />
            <div class="auth-error hidden" id="authError"></div>
            <button type="submit" class="auth-submit">${isRegister ? 'Registrer deg' : 'Logg inn'}</button>
          </form>
          <button class="auth-toggle" id="authToggle">
            ${isRegister ? 'Har du allerede konto? Logg inn' : 'Har du ikke konto? Registrer deg'}
          </button>
        </div>
      `;

      el.querySelector('.prep-back').addEventListener('click', showPrepLanding);

      el.querySelector('#authToggle').addEventListener('click', () => {
        isRegister = !isRegister;
        render();
      });

      el.querySelector('#authForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorEl = el.querySelector('#authError');
        const submitBtn = el.querySelector('.auth-submit');
        const email = el.querySelector('#authEmail').value.trim();
        const password = el.querySelector('#authPassword').value;
        const name = isRegister ? (el.querySelector('#authName')?.value.trim() || '') : '';

        errorEl.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Venter...';

        try {
          if (isRegister) {
            await Auth.signUp(email, password, name);
          } else {
            await Auth.signIn(email, password);
          }
          // Success — render dashboard
          renderPersonalDashboard(el, daysLeft);
        } catch (err) {
          errorEl.textContent = err.message;
          errorEl.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.textContent = isRegister ? 'Registrer deg' : 'Logg inn';
        }
      });
    }

    render();
  }

  function renderPersonalDashboard(el, daysLeft) {
    const user = Auth.getUser();
    const name = user?.name || user?.email?.split('@')[0] || 'Seiler';

    el.innerHTML = `
      <button class="prep-back">&larr; Tilbake</button>
      <div class="personal-hero">
        <div class="personal-greeting">Hei, ${name}!</div>
        <div class="personal-countdown-big">${daysLeft}</div>
        <div class="personal-countdown-label">dager til avgang</div>
      </div>

      <div class="personal-sections">
        <!-- Countdown calendar -->
        <div class="personal-card">
          <div class="personal-card-header">
            <h3>📅 Nedtelling</h3>
          </div>
          <div class="countdown-grid" id="countdownGrid"></div>
        </div>

        <!-- Personal packing list -->
        <div class="personal-card">
          <div class="personal-card-header">
            <h3>🎒 Min pakkeliste</h3>
            <span class="packing-progress" id="packingProgress"></span>
          </div>
          <div id="personalPackingList"></div>
        </div>

        <!-- Notes -->
        <div class="personal-card">
          <div class="personal-card-header">
            <h3>📝 Mine notater</h3>
            <span class="notes-saved hidden" id="notesSaved">Lagret</span>
          </div>
          <textarea class="notes-textarea" id="notesArea" placeholder="Tanker, ønsker, ting å huske for turen..."></textarea>
        </div>
      </div>

      <button class="auth-logout" id="logoutBtn">Logg ut</button>
    `;

    el.querySelector('.prep-back').addEventListener('click', showPrepLanding);
    el.querySelector('#logoutBtn').addEventListener('click', async () => {
      await Auth.signOut();
      renderAuthForm(el, daysLeft);
    });

    initCountdownGrid(daysLeft);
    initPersonalPacking();
    initNotes();
  }

  // ---- Countdown Calendar ----
  function initCountdownGrid(daysLeft) {
    const grid = document.getElementById('countdownGrid');
    if (!grid) return;

    const tripStart = new Date('2026-04-18');
    const today = new Date();
    today.setHours(0,0,0,0);
    const tornDays = JSON.parse(localStorage.getItem('sr-torn-days') || '[]');

    // Show last 28 days before trip (or fewer if trip is closer)
    const showDays = Math.min(daysLeft, 42);
    let html = '';

    for (let i = showDays; i >= 1; i--) {
      const date = new Date(tripStart);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isTorn = tornDays.includes(dateStr) || isPast;

      html += `
        <div class="countdown-day ${isTorn ? 'torn' : ''} ${isToday ? 'today' : ''}"
             data-date="${dateStr}" ${isToday && !isTorn ? 'data-tearable="true"' : ''}>
          <div class="countdown-day-num">${date.getDate()}</div>
          <div class="countdown-day-left">${i}</div>
        </div>
      `;
    }

    grid.innerHTML = html;

    // Tear off today
    grid.querySelectorAll('[data-tearable="true"]').forEach(day => {
      day.addEventListener('click', () => {
        const dateStr = day.dataset.date;
        day.classList.add('tearing');
        setTimeout(() => {
          day.classList.remove('tearing');
          day.classList.add('torn');
          day.removeAttribute('data-tearable');
          const torn = JSON.parse(localStorage.getItem('sr-torn-days') || '[]');
          if (!torn.includes(dateStr)) {
            torn.push(dateStr);
            localStorage.setItem('sr-torn-days', JSON.stringify(torn));
          }
          // Also sync to server if authenticated
          if (Auth.isLoggedIn()) {
            Auth.authFetch('/api/countdown', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ day_date: dateStr }),
            }).catch(() => {});
          }
        }, 600);
      });
    });
  }

  // ---- Personal Packing List ----
  function initPersonalPacking() {
    const container = document.getElementById('personalPackingList');
    if (!container) return;

    // Load from localStorage or initialize from template
    let items = JSON.parse(localStorage.getItem('sr-packing-items') || 'null');
    if (!items) {
      // Initialize from PREP_CONTENT template
      const content = window.PREP_CONTENT || {};
      const packList = content.packingList || {};
      items = [];
      (packList.categories || []).forEach(cat => {
        cat.items.forEach((item, idx) => {
          items.push({
            id: cat.id + '-' + idx,
            text: item.text,
            category: cat.name,
            categoryIcon: cat.icon,
            checked: false,
            isCustom: false,
          });
        });
      });
      localStorage.setItem('sr-packing-items', JSON.stringify(items));
    }

    renderPersonalPackingList(container, items);
  }

  function renderPersonalPackingList(container, items) {
    // Group by category
    const groups = {};
    items.forEach(item => {
      const key = item.category || 'Annet';
      if (!groups[key]) groups[key] = { icon: item.categoryIcon || '📦', items: [] };
      groups[key].items.push(item);
    });

    const total = items.length;
    const checked = items.filter(i => i.checked).length;
    const progressEl = document.getElementById('packingProgress');
    if (progressEl) progressEl.textContent = checked + '/' + total + ' pakket';

    container.innerHTML = Object.entries(groups).map(([catName, group]) => {
      const catChecked = group.items.filter(i => i.checked).length;
      const catTotal = group.items.length;
      return `
        <div class="pp-category">
          <div class="pp-cat-header" data-pp-toggle="${catName}">
            <span>${group.icon} ${catName}</span>
            <span class="pp-cat-progress">${catChecked}/${catTotal}</span>
          </div>
          <div class="pp-cat-items" id="pp-${catName}">
            ${group.items.map(item => `
              <label class="pp-item ${item.checked ? 'checked' : ''}">
                <input type="checkbox" ${item.checked ? 'checked' : ''} data-item-id="${item.id}" />
                <span class="pp-item-text">${item.text}</span>
                ${item.isCustom ? '<button class="pp-item-delete" data-delete-id="' + item.id + '">✕</button>' : ''}
              </label>
            `).join('')}
            <div class="pp-add-row">
              <input type="text" class="pp-add-input" placeholder="Legg til..." data-cat="${catName}" data-cat-icon="${group.icon}" />
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Wire events
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.dataset.itemId;
        const item = items.find(i => i.id === id);
        if (item) {
          item.checked = cb.checked;
          cb.closest('.pp-item').classList.toggle('checked', cb.checked);
          savePackingItems(items);
          renderPersonalPackingList(container, items);
        }
      });
    });

    container.querySelectorAll('.pp-item-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        items = items.filter(i => i.id !== btn.dataset.deleteId);
        savePackingItems(items);
        renderPersonalPackingList(container, items);
      });
    });

    container.querySelectorAll('.pp-add-input').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          e.preventDefault();
          const newItem = {
            id: 'custom-' + Date.now(),
            text: input.value.trim(),
            category: input.dataset.cat,
            categoryIcon: input.dataset.catIcon,
            checked: false,
            isCustom: true,
          };
          items.push(newItem);
          savePackingItems(items);
          renderPersonalPackingList(container, items);
        }
      });
    });

    container.querySelectorAll('.pp-cat-header').forEach(header => {
      header.addEventListener('click', () => {
        const target = document.getElementById('pp-' + header.dataset.ppToggle);
        if (target) {
          target.classList.toggle('collapsed');
          header.classList.toggle('collapsed');
        }
      });
    });
  }

  function savePackingItems(items) {
    localStorage.setItem('sr-packing-items', JSON.stringify(items));
    // Sync to server if authenticated
    if (Auth.isLoggedIn()) {
      Auth.authFetch('/api/packing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      }).catch(() => {});
    }
  }

  // ---- Notes ----
  let notesSaveTimeout = null;

  function initNotes() {
    const textarea = document.getElementById('notesArea');
    if (!textarea) return;

    // Load from localStorage
    textarea.value = localStorage.getItem('sr-notes') || '';

    textarea.addEventListener('input', () => {
      clearTimeout(notesSaveTimeout);
      notesSaveTimeout = setTimeout(() => {
        localStorage.setItem('sr-notes', textarea.value);
        const saved = document.getElementById('notesSaved');
        if (saved) {
          saved.classList.remove('hidden');
          setTimeout(() => saved.classList.add('hidden'), 2000);
        }
        // Sync to server
        if (Auth.isLoggedIn()) {
          Auth.authFetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: textarea.value }),
          }).catch(() => {});
        }
      }, 2000);
    });
  }

  // ============================================
  // MOBILE MAP OVERLAY
  // ============================================
  function initMobileMap() {
    const fab = document.getElementById('mapFab');
    const overlay = document.getElementById('mapOverlay');
    const closeBtn = document.getElementById('mapOverlayClose');

    if (!fab || !overlay) return;

    // Move map-container into overlay
    const mapContainer = document.querySelector('.map-container');
    overlay.appendChild(mapContainer);
    mapContainer.style.display = 'block';

    fab.addEventListener('click', () => {
      overlay.classList.add('open');
      mapOverlayOpen = true;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (map) map.invalidateSize();
        // If a route is selected, zoom to it
        if (activeRouteId && routeLayers[activeRouteId]) {
          map.fitBounds(routeLayers[activeRouteId].polyline.getBounds(), {
            padding: [50, 50], maxZoom: 10, animate: true, duration: 0.4
          });
        }
      }, 50);
    });

    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('open');
      mapOverlayOpen = false;
      document.body.style.overflow = '';
    });
  }

})();
