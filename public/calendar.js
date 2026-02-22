/* ============================================
   Forberedelseskalender — Seiltur Hellas 2026
   Månedlig kalender med auto-avkryssing,
   oppgaveprikker, og quick-add
   ============================================ */

// ---- Trip Task Data ----
const TRIP_TASKS = [
  // FEBRUAR
  { id: 'passport', text: { no: 'Sjekk at pass er gyldig (6 mnd etter retur)', en: 'Check passport validity (6 months after return)' }, category: { no: 'Dokumenter', en: 'Documents' }, deadline: '2026-02-28', important: true },
  { id: 'skipper', role: 'skipper', text: { no: 'Sjekk status på skipperbevis / ICC', en: 'Check skipper license / ICC status' }, category: { no: 'Dokumenter', en: 'Documents' }, deadline: '2026-02-28' },

  // MARS — early
  { id: 'flights', text: { no: 'Bestill fly til Athen', en: 'Book flights to Athens' }, category: { no: 'Logistikk', en: 'Logistics' }, deadline: '2026-03-07', important: true },
  { id: 'insurance', text: { no: 'Bestill reiseforsikring m/ sjøsport-dekning', en: 'Book travel insurance with watersports cover' }, category: { no: 'Dokumenter', en: 'Documents' }, deadline: '2026-03-07', important: true },
  { id: 'vhf', role: 'skipper', text: { no: 'VHF-radiosertifikat i orden?', en: 'VHF radio certificate in order?' }, category: { no: 'Dokumenter', en: 'Documents' }, deadline: '2026-03-14' },

  // MARS — mid
  { id: 'marinas', role: 'skipper', text: { no: 'Forhåndsbestill populære marinaer', en: 'Pre-book popular marinas' }, category: { no: 'Logistikk', en: 'Logistics' }, deadline: '2026-03-14' },
  { id: 'charter', role: 'skipper', text: { no: 'Gjennomgå charter-kontrakt & deposit', en: 'Review charter contract & deposit' }, category: { no: 'Dokumenter', en: 'Documents' }, deadline: '2026-03-21' },
  { id: 'splitwise', text: { no: 'Sett opp Splitwise-gruppe for fellesutgifter', en: 'Set up Splitwise group for shared expenses' }, category: { no: 'Logistikk', en: 'Logistics' }, deadline: '2026-03-21' },

  // MARS — late
  { id: 'offlinemaps', role: 'skipper', text: { no: 'Last ned Navionics offline-kart', en: 'Download Navionics offline charts' }, category: { no: 'Navigasjon', en: 'Navigation' }, deadline: '2026-03-28' },
  { id: 'weatherapp', text: { no: 'Last ned Windy & PredictWind', en: 'Download Windy & PredictWind' }, category: { no: 'Navigasjon', en: 'Navigation' }, deadline: '2026-03-28' },
  { id: 'transfer', text: { no: 'Bestill transfer flyplass \u2192 Alimos marina', en: 'Book airport transfer \u2192 Alimos marina' }, category: { no: 'Logistikk', en: 'Logistics' }, deadline: '2026-03-28' },

  // APRIL — early
  { id: 'deckshoes', text: { no: 'Dekkssko med lyse såler (må ikke merke teak)', en: 'Deck shoes with light soles (must not mark teak)' }, category: { no: 'Utstyr', en: 'Gear' }, deadline: '2026-04-04' },
  { id: 'windbreaker', text: { no: 'Vindjakke / regnlag for Meltemi-kvelder', en: 'Windbreaker / rain layer for Meltemi evenings' }, category: { no: 'Utstyr', en: 'Gear' }, deadline: '2026-04-04' },
  { id: 'seasick', text: { no: 'Sjøsykemedisin (Stugeron / Dramamine)', en: 'Seasickness medicine (Stugeron / Dramamine)' }, category: { no: 'Helse', en: 'Health' }, deadline: '2026-04-04' },
  { id: 'prescriptions', text: { no: 'Personlige medisiner for 2 uker + buffer', en: 'Personal medication for 2 weeks + buffer' }, category: { no: 'Helse', en: 'Health' }, deadline: '2026-04-04' },
  { id: 'drybag', text: { no: 'Vanntett bag for elektronikk', en: 'Dry bag for electronics' }, category: { no: 'Utstyr', en: 'Gear' }, deadline: '2026-04-04' },
  { id: 'photoalbum', text: { no: 'Opprett delt fotoalbum (iCloud / Google Photos)', en: 'Create shared photo album (iCloud / Google Photos)' }, category: { no: 'Logistikk', en: 'Logistics' }, deadline: '2026-04-04' },

  // APRIL — week before
  { id: 'sunscreen', text: { no: 'Kjøp solkrem SPF 50+ (dyrt i Hellas!)', en: 'Buy sunscreen SPF 50+ (expensive in Greece!)' }, category: { no: 'Helse', en: 'Health' }, deadline: '2026-04-11' },
  { id: 'quickdry', text: { no: 'Quick-dry klær: t-skjorter, shorts, badetøy', en: 'Quick-dry clothes: t-shirts, shorts, swimwear' }, category: { no: 'Utstyr', en: 'Gear' }, deadline: '2026-04-11' },
  { id: 'mealplan', text: { no: 'Lag meny for de 3 første dagene', en: 'Plan meals for the first 3 days' }, category: { no: 'Proviant', en: 'Provisions' }, deadline: '2026-04-11' },
  { id: 'firstaid', role: 'skipper', text: { no: 'Sjekk førstehjelp-sett', en: 'Check first aid kit' }, category: { no: 'Helse', en: 'Health' }, deadline: '2026-04-11' },

  // APRIL 17 — day before
  { id: 'softbag', text: { no: 'Pakk i myk bag \u2014 IKKE koffert!', en: 'Pack in soft bag \u2014 NOT suitcase!' }, category: { no: 'Siste dag', en: 'Last day' }, deadline: '2026-04-17', important: true },
  { id: 'staples', text: { no: 'Storhandling i Athen (pasta, ris, olivenolje, kaffe)', en: 'Grocery run in Athens (pasta, rice, olive oil, coffee)' }, category: { no: 'Proviant', en: 'Provisions' }, deadline: '2026-04-17', important: true },
  { id: 'drinks', text: { no: 'Drikke & alkohol fra supermarked i Athen', en: 'Drinks & alcohol from supermarket in Athens' }, category: { no: 'Proviant', en: 'Provisions' }, deadline: '2026-04-17' },
  { id: 'chargebanks', text: { no: 'Lad alle powerbanks & elektronikk', en: 'Charge all power banks & electronics' }, category: { no: 'Siste dag', en: 'Last day' }, deadline: '2026-04-17' },
  { id: 'emergency', role: 'skipper', text: { no: 'Print nødkontakter (kystvakt 108, charter nødnr)', en: 'Print emergency contacts (coast guard 108, charter emergency no.)' }, category: { no: 'Helse', en: 'Health' }, deadline: '2026-04-17', important: true },
  { id: 'checkweather', text: { no: 'Sjekk været for dag 1\u20133', en: 'Check weather for days 1\u20133' }, category: { no: 'Siste dag', en: 'Last day' }, deadline: '2026-04-17' },
];

// Use I18n if available, otherwise fallback
function MONTH_NAMES_FN() {
  return (typeof I18n !== 'undefined') ? I18n.getMonthNames() : ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
}
function DAY_NAMES_FN() {
  return (typeof I18n !== 'undefined') ? I18n.getDayNames() : ['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'];
}
function DAY_NAMES_FULL_FN() {
  return (typeof I18n !== 'undefined') ? I18n.getDayNamesFull() : ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
}

// ---- Calendar System ----
function initCalendar(daysLeft, userRole) {
  if (window.__srChecklistPollTimer) {
    clearInterval(window.__srChecklistPollTimer);
    window.__srChecklistPollTimer = null;
  }
  if (window.__srChecklistSyncTimer) {
    clearTimeout(window.__srChecklistSyncTimer);
    window.__srChecklistSyncTimer = null;
  }

  const container = document.getElementById('calendarContainer');
  const taskPanel = document.getElementById('taskPanel');
  const taskPanelCard = document.getElementById('taskPanelCard');
  const checklistEl = document.getElementById('checklistContainer');
  const progressEl = document.getElementById('prepProgress');
  const quickAddCard = document.getElementById('quickAddCard');
  const quickAddEl = document.getElementById('quickAddContainer');
  if (!container) return;

  const tripStart = new Date('2026-04-18');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // State
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectedDate = null;

  // Persisted state
  const STORAGE_KEYS = {
    completed: 'sr-completed-tasks',
    removed: 'sr-removed-tasks',
  };
  const allowedTaskIds = new Set(TRIP_TASKS.map(t => t.id));

  function parseStoredArray(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function normalizeTaskIds(arr) {
    if (!Array.isArray(arr)) return [];
    const seen = new Set();
    const out = [];
    for (const item of arr) {
      if (typeof item !== 'string') continue;
      const id = item.trim();
      if (!id || !allowedTaskIds.has(id) || seen.has(id)) continue;
      seen.add(id);
      out.push(id);
    }
    return out;
  }

  function sameStringSet(a, b) {
    const left = normalizeTaskIds(a).sort();
    const right = normalizeTaskIds(b).sort();
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i++) {
      if (left[i] !== right[i]) return false;
    }
    return true;
  }

  let completedTasks = normalizeTaskIds(parseStoredArray(STORAGE_KEYS.completed));
  let removedTasks = normalizeTaskIds(parseStoredArray(STORAGE_KEYS.removed));

  function saveState() {
    localStorage.setItem(STORAGE_KEYS.completed, JSON.stringify(normalizeTaskIds(completedTasks)));
    localStorage.setItem(STORAGE_KEYS.removed, JSON.stringify(normalizeTaskIds(removedTasks)));
  }

  const role = userRole || 'passenger';

  function activeTasks() {
    return TRIP_TASKS.filter(t => {
      if (removedTasks.includes(t.id)) return false;
      if (t.role === 'skipper' && role !== 'skipper') return false;
      return true;
    });
  }

  function tasksForDate(dateStr) {
    return activeTasks().filter(t => t.deadline === dateStr);
  }

  function hasTasksOnDate(dateStr) {
    return activeTasks().some(t => t.deadline === dateStr);
  }

  function hasImportantOnDate(dateStr) {
    return activeTasks().some(t => t.deadline === dateStr && t.important);
  }

  function allCompleteOnDate(dateStr) {
    const tasks = tasksForDate(dateStr);
    return tasks.length > 0 && tasks.every(t => completedTasks.includes(t.id));
  }

  function isOverdue(task) {
    const d = new Date(task.deadline);
    d.setHours(0, 0, 0, 0);
    return d < today && !completedTasks.includes(task.id);
  }

  function updateDashboardKpis() {
    const tasks = activeTasks();
    const done = tasks.filter(t => completedTasks.includes(t.id)).length;
    const total = tasks.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const progressKpi = document.getElementById('dashProgress');
    if (progressKpi) progressKpi.textContent = pct + '%';

    const nextKpi = document.querySelector('#dashNextDeadline .kpi-value');
    if (nextKpi) {
      const nextTask = tasks
        .filter(t => !completedTasks.includes(t.id))
        .sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
      if (nextTask) {
        const d = new Date(nextTask.deadline);
        const dateLabel = d.getDate() + '. ' + MONTH_NAMES_FN()[d.getMonth()].substring(0, 3).toLowerCase();
        nextKpi.textContent = dateLabel;
      } else {
        nextKpi.textContent = I18n.lang() === 'en' ? 'Done' : 'Ferdig';
      }
    }
  }

  // ---- Render Month Grid ----
  function renderMonth() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDow = (firstDay.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = lastDay.getDate();

    const canPrev = currentYear > today.getFullYear() ||
      (currentYear === today.getFullYear() && currentMonth > today.getMonth());
    const canNext = currentYear < tripStart.getFullYear() ||
      (currentYear === tripStart.getFullYear() && currentMonth <= tripStart.getMonth());

    let html = `
      <div class="cal-header">
        <button class="cal-nav ${!canPrev ? 'cal-nav-disabled' : ''}" id="calPrev">\u2190</button>
        <div class="cal-month-label">${MONTH_NAMES_FN()[currentMonth]} ${currentYear}</div>
        <button class="cal-nav ${!canNext ? 'cal-nav-disabled' : ''}" id="calNext">\u2192</button>
      </div>
      <div class="cal-weekdays">
        ${DAY_NAMES_FN().map(d => `<div class="cal-weekday">${d}</div>`).join('')}
      </div>
      <div class="cal-days">
    `;

    // Empty cells for alignment
    for (let i = 0; i < startDow; i++) {
      html += '<div class="cal-day cal-day-empty"></div>';
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      date.setHours(0, 0, 0, 0);
      const dateStr = date.toISOString().split('T')[0];
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isTripDay = date >= tripStart;
      const hasTasks = hasTasksOnDate(dateStr);
      const isImportant = hasImportantOnDate(dateStr);
      const isSelected = selectedDate === dateStr;
      const allDone = allCompleteOnDate(dateStr);
      const hasOverdue = tasksForDate(dateStr).some(t => isOverdue(t));

      let cls = ['cal-day'];
      if (isPast) cls.push('cal-day-past');
      if (isToday) cls.push('cal-day-today');
      if (isTripDay) cls.push('cal-day-trip');
      if (hasTasks) cls.push('cal-day-tasks');
      if (isImportant) cls.push('cal-day-important');
      if (isSelected) cls.push('cal-day-selected');
      if (allDone && hasTasks) cls.push('cal-day-done');
      if (hasOverdue) cls.push('cal-day-overdue');

      // Small random-ish rotation offset per day for natural hand-drawn look
      const rot = -4 + ((d * 7 + currentMonth * 3) % 8);
      const style = isPast ? `--marker-rot: ${rot}deg` : '';

      html += `
        <div class="${cls.join(' ')}" data-date="${dateStr}" ${style ? `style="${style}"` : ''}>
          <span class="cal-day-num">${d}</span>
          ${hasTasks && !allDone ? '<span class="cal-task-dot"></span>' : ''}
          ${allDone && hasTasks ? '<span class="cal-done-check">\u2713</span>' : ''}
        </div>
      `;
    }

    html += '</div>';

    // Month dots for navigation overview
    const months = [];
    let m = today.getMonth(), y = today.getFullYear();
    while (y < tripStart.getFullYear() || (y === tripStart.getFullYear() && m <= tripStart.getMonth())) {
      months.push({ m, y, active: m === currentMonth && y === currentYear });
      m++;
      if (m > 11) { m = 0; y++; }
    }
    html += `<div class="cal-month-dots">${months.map(mo =>
      `<span class="cal-month-dot ${mo.active ? 'cal-month-dot-active' : ''}"
        data-m="${mo.m}" data-y="${mo.y}">${MONTH_NAMES_FN()[mo.m].substring(0, 3)}</span>`
    ).join('')}</div>`;

    container.innerHTML = html;

    // Events
    const prevBtn = container.querySelector('#calPrev');
    const nextBtn = container.querySelector('#calNext');
    if (prevBtn && canPrev) prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      renderMonth();
    });
    if (nextBtn && canNext) nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      renderMonth();
    });

    // Month dot clicks
    container.querySelectorAll('.cal-month-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        currentMonth = parseInt(dot.dataset.m);
        currentYear = parseInt(dot.dataset.y);
        renderMonth();
      });
    });

    // Day clicks
    container.querySelectorAll('.cal-day:not(.cal-day-empty)').forEach(day => {
      day.addEventListener('click', () => {
        const date = day.dataset.date;
        if (selectedDate === date) {
          selectedDate = null; // toggle off
        } else {
          selectedDate = date;
        }
        renderMonth();
        renderTaskPanel();
      });
    });
  }

  // ---- Render Task Panel (selected day) ----
  function renderTaskPanel() {
    if (!taskPanel || !taskPanelCard) return;

    if (!selectedDate) {
      taskPanelCard.style.display = 'none';
      return;
    }

    const tasks = tasksForDate(selectedDate);
    const d = new Date(selectedDate);
    const dayName = DAY_NAMES_FULL_FN()[d.getDay()];
    const dateLabel = `${dayName} ${d.getDate()}. ${MONTH_NAMES_FN()[d.getMonth()].toLowerCase()}`;
    const isPast = d < today;

    if (tasks.length === 0) {
      if (d.getTime() === tripStart.getTime()) {
        taskPanel.innerHTML = `
          <div class="tp-header">${dateLabel}</div>
          <div class="tp-empty">${t('cal.departure')}</div>
        `;
      } else {
        taskPanel.innerHTML = `
          <div class="tp-header">${dateLabel}</div>
          <div class="tp-empty">${t('cal.noTasks')}</div>
        `;
      }
      taskPanelCard.style.display = 'block';
      return;
    }

    let html = `<div class="tp-header">${dateLabel}</div><div class="tp-tasks">`;
    tasks.forEach(task => {
      const done = completedTasks.includes(task.id);
      const overdue = isPast && !done;
      html += `
        <div class="tp-task ${done ? 'tp-task-done' : ''} ${overdue ? 'tp-task-overdue' : ''}">
          <label class="tp-check">
            <input type="checkbox" ${done ? 'checked' : ''} data-task-id="${task.id}" />
            <span class="tp-checkmark"></span>
          </label>
          <div class="tp-task-text">
            <span class="tp-task-name">${I18n.pick(task.text)}</span>
            <span class="tp-task-cat">${I18n.pick(task.category)}</span>
          </div>
          <button class="tp-remove" data-task-id="${task.id}" title="${t('cal.removeTitle')}">\u00d7</button>
        </div>
      `;
    });
    html += '</div>';

    taskPanel.innerHTML = html;
    taskPanelCard.style.display = 'block';

    // Checkbox handlers
    taskPanel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.dataset.taskId;
        if (cb.checked) {
          if (!completedTasks.includes(id)) completedTasks.push(id);
        } else {
          completedTasks = completedTasks.filter(t => t !== id);
        }
        saveState();
        renderMonth();
        renderTaskPanel();
        renderChecklist();
        syncToServer();
      });
    });

    // Remove handlers
    taskPanel.querySelectorAll('.tp-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.taskId;
        if (!removedTasks.includes(id)) removedTasks.push(id);
        saveState();
        renderMonth();
        renderTaskPanel();
        renderChecklist();
        renderQuickAdd();
        syncToServer();
      });
    });
  }

  // ---- Render Full Checklist (grouped by category) ----
  function renderChecklist() {
    if (!checklistEl || !progressEl) return;

    const tasks = activeTasks();
    const done = tasks.filter(t => completedTasks.includes(t.id)).length;
    const total = tasks.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    progressEl.innerHTML = `<span class="prep-pct">${pct}%</span> <span class="prep-fraction">(${done}/${total})</span>`;

    // Group by category (use picked language for display key)
    const groups = {};
    tasks.forEach(t => {
      const catKey = I18n.pick(t.category);
      if (!groups[catKey]) groups[catKey] = [];
      groups[catKey].push(t);
    });

    // Sort categories by earliest deadline
    const sortedCats = Object.keys(groups).sort((a, b) => {
      const aMin = groups[a].reduce((min, t) => t.deadline < min ? t.deadline : min, '9999');
      const bMin = groups[b].reduce((min, t) => t.deadline < min ? t.deadline : min, '9999');
      return aMin.localeCompare(bMin);
    });

    let html = `<div class="cl-progress-bar"><div class="cl-progress-fill" style="width: ${pct}%"></div></div>`;

    sortedCats.forEach(cat => {
      const catTasks = groups[cat];
      const catDone = catTasks.filter(t => completedTasks.includes(t.id)).length;
      const catAll = catDone === catTasks.length;

      html += `
        <div class="cl-group ${catAll ? 'cl-group-done' : ''}">
          <div class="cl-group-header">
            <span class="cl-group-name">${I18n.pick(cat)}</span>
            <span class="cl-group-count">${catDone}/${catTasks.length}</span>
          </div>
          <div class="cl-items">
      `;
      catTasks.forEach(task => {
        const done = completedTasks.includes(task.id);
        const overdue = isOverdue(task);
        const deadlineDate = new Date(task.deadline);
        const deadlineLabel = `${deadlineDate.getDate()}. ${MONTH_NAMES_FN()[deadlineDate.getMonth()].substring(0, 3).toLowerCase()}`;

        html += `
          <div class="cl-item ${done ? 'cl-item-done' : ''} ${overdue ? 'cl-item-overdue' : ''}">
            <label class="cl-check">
              <input type="checkbox" ${done ? 'checked' : ''} data-task-id="${task.id}" />
              <span class="cl-checkmark"></span>
            </label>
            <span class="cl-text">${I18n.pick(task.text)}</span>
            <span class="cl-deadline ${overdue ? 'cl-deadline-overdue' : ''}">${deadlineLabel}</span>
            <button class="cl-remove" data-task-id="${task.id}" title="Fjern">\u00d7</button>
          </div>
        `;
      });
      html += '</div></div>';
    });

    checklistEl.innerHTML = html;

    // Checkbox handlers
    checklistEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.dataset.taskId;
        if (cb.checked) {
          if (!completedTasks.includes(id)) completedTasks.push(id);
        } else {
          completedTasks = completedTasks.filter(t => t !== id);
        }
        saveState();
        renderMonth();
        renderTaskPanel();
        renderChecklist();
        syncToServer();
      });
    });

    // Remove handlers
    checklistEl.querySelectorAll('.cl-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.taskId;
        if (!removedTasks.includes(id)) removedTasks.push(id);
        saveState();
        renderMonth();
        renderTaskPanel();
        renderChecklist();
        renderQuickAdd();
        syncToServer();
      });
    });

    updateDashboardKpis();
  }

  // ---- Render Quick Add (removed tasks) ----
  function renderQuickAdd() {
    if (!quickAddCard || !quickAddEl) return;

    const removed = TRIP_TASKS.filter(t => removedTasks.includes(t.id));
    if (removed.length === 0) {
      quickAddCard.style.display = 'none';
      return;
    }

    quickAddCard.style.display = 'block';
    let html = '';
    removed.forEach(task => {
      html += `
        <div class="qa-item">
          <span class="qa-text">${I18n.pick(task.text)}</span>
          <button class="qa-restore" data-task-id="${task.id}">${t('cal.addBack')}</button>
        </div>
      `;
    });
    quickAddEl.innerHTML = html;

    quickAddEl.querySelectorAll('.qa-restore').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.taskId;
        removedTasks = removedTasks.filter(t => t !== id);
        saveState();
        renderMonth();
        renderChecklist();
        renderQuickAdd();
        syncToServer();
      });
    });
  }

  function isLoggedIn() {
    return typeof Auth !== 'undefined' && Auth.isLoggedIn && Auth.isLoggedIn();
  }

  // ---- Sync to shared planning state ----
  function syncToServer() {
    if (!isLoggedIn()) return;

    const completed = normalizeTaskIds(completedTasks);
    const removed = normalizeTaskIds(removedTasks);
    completedTasks = completed;
    removedTasks = removed;

    clearTimeout(window.__srChecklistSyncTimer);
    window.__srChecklistSyncTimer = setTimeout(() => {
      Auth.authFetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checklist_completed: completed,
          checklist_removed: removed,
        }),
      }).catch(() => {});
    }, 300);
  }

  async function refreshFromServer() {
    if (!isLoggedIn()) return;
    try {
      const res = await Auth.authFetch('/api/planning');
      if (!res.ok) return;
      const data = await res.json();
      const remoteCompleted = normalizeTaskIds(data.checklist_completed);
      const remoteRemoved = normalizeTaskIds(data.checklist_removed);
      const changed =
        !sameStringSet(remoteCompleted, completedTasks) ||
        !sameStringSet(remoteRemoved, removedTasks);

      if (!changed) return;

      completedTasks = remoteCompleted;
      removedTasks = remoteRemoved;
      saveState();
      renderMonth();
      renderTaskPanel();
      renderChecklist();
      renderQuickAdd();
    } catch (e) {
      // ignore transient sync errors
    }
  }

  // ---- Initial render ----
  // Jump to month with first upcoming task
  const upcomingTask = activeTasks()
    .filter(t => !completedTasks.includes(t.id))
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .find(t => new Date(t.deadline) >= today);
  if (upcomingTask) {
    const d = new Date(upcomingTask.deadline);
    currentMonth = d.getMonth();
    currentYear = d.getFullYear();
  }

  renderMonth();
  renderChecklist();
  renderQuickAdd();
  updateDashboardKpis();

  if (isLoggedIn()) {
    refreshFromServer();
    window.__srChecklistPollTimer = setInterval(refreshFromServer, 15000);
  }
}
