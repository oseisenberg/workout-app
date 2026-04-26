(() => {
  const $ = (id) => document.getElementById(id);

  // === Icon registry =====================================================
  // Each icon is drawn as a silhouette of the equipment, not a person.
  // Structural lines use currentColor; the loaded part uses --accent.
  // Templates in exercises.json reference these by name.
  const ICONS = {
    "leg-press": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <polyline points="10,56 10,44 24,44" />
        <line x1="24" y1="44" x2="50" y2="18" />
        <line x1="44" y1="10" x2="56" y2="22"
              stroke="var(--accent)" stroke-width="4.5" />
      </svg>`,
    "lat-pulldown": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="52" y1="8" x2="52" y2="56" />
        <line x1="52" y1="10" x2="20" y2="10" />
        <line x1="20" y1="10" x2="20" y2="22" />
        <line x1="8" y1="24" x2="32" y2="24"
              stroke="var(--accent)" stroke-width="4.5" />
        <line x1="8" y1="20" x2="8" y2="28"
              stroke="var(--accent)" stroke-width="4" />
        <line x1="32" y1="20" x2="32" y2="28"
              stroke="var(--accent)" stroke-width="4" />
        <polyline points="14,50 14,42 30,42" />
      </svg>`,
    "chest-press": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="14" y1="56" x2="14" y2="16" />
        <line x1="14" y1="42" x2="28" y2="42" />
        <line x1="14" y1="24" x2="48" y2="24"
              stroke="var(--accent)" stroke-width="3.5" />
        <line x1="48" y1="20" x2="48" y2="28"
              stroke="var(--accent)" stroke-width="4" />
        <line x1="14" y1="34" x2="48" y2="34"
              stroke="var(--accent)" stroke-width="3.5" />
        <line x1="48" y1="30" x2="48" y2="38"
              stroke="var(--accent)" stroke-width="4" />
      </svg>`,
    "seated-row": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <polyline points="10,42 10,32 22,32 22,42" />
        <line x1="10" y1="42" x2="22" y2="42" />
        <line x1="48" y1="50" x2="56" y2="42" />
        <line x1="52" y1="46" x2="34" y2="38"
              stroke="var(--accent)" stroke-width="3" />
        <polyline points="28,34 34,38 28,42"
                  stroke="var(--accent)" stroke-width="4" />
      </svg>`,
    "leg-extension": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="10" y1="56" x2="10" y2="18" />
        <line x1="10" y1="38" x2="28" y2="38" />
        <circle cx="28" cy="38" r="2.5" fill="currentColor" stroke="none" />
        <path d="M28 50 A12 12 0 0 1 40 38"
              stroke="currentColor" stroke-width="1.5"
              stroke-dasharray="2 3" />
        <line x1="28" y1="38" x2="50" y2="22"
              stroke="var(--accent)" stroke-width="3.5" />
        <circle cx="51" cy="21" r="4"
                stroke="var(--accent)" stroke-width="3.5" />
      </svg>`,
    "leg-curl": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="8" y1="36" x2="42" y2="36" />
        <line x1="14" y1="36" x2="14" y2="48" />
        <line x1="36" y1="36" x2="36" y2="48" />
        <circle cx="42" cy="36" r="2.5" fill="currentColor" stroke="none" />
        <path d="M58 36 A16 16 0 0 0 50 18"
              stroke="currentColor" stroke-width="1.5"
              stroke-dasharray="2 3" />
        <line x1="42" y1="36" x2="50" y2="18"
              stroke="var(--accent)" stroke-width="3.5" />
        <circle cx="50" cy="17" r="4"
                stroke="var(--accent)" stroke-width="3.5" />
      </svg>`,
    "cable-crossover": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="12" y1="56" x2="12" y2="10" />
        <line x1="52" y1="56" x2="52" y2="10" />
        <line x1="12" y1="10" x2="52" y2="10" />
        <circle cx="12" cy="14" r="2.5" />
        <circle cx="52" cy="14" r="2.5" />
        <line x1="12" y1="16" x2="44" y2="42"
              stroke="var(--accent)" stroke-width="2.5" />
        <line x1="52" y1="16" x2="20" y2="42"
              stroke="var(--accent)" stroke-width="2.5" />
        <circle cx="44" cy="42" r="2.5"
                fill="var(--accent)" stroke="none" />
        <circle cx="20" cy="42" r="2.5"
                fill="var(--accent)" stroke="none" />
      </svg>`,
    "pec-deck": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="32" y1="56" x2="32" y2="14" />
        <line x1="22" y1="44" x2="42" y2="44" />
        <circle cx="32" cy="18" r="2.5" fill="currentColor" stroke="none" />
        <line x1="32" y1="18" x2="14" y2="34"
              stroke="var(--accent)" stroke-width="3" />
        <line x1="32" y1="18" x2="50" y2="34"
              stroke="var(--accent)" stroke-width="3" />
        <line x1="11" y1="30" x2="17" y2="38"
              stroke="var(--accent)" stroke-width="4.5" />
        <line x1="47" y1="30" x2="53" y2="38"
              stroke="var(--accent)" stroke-width="4.5" />
      </svg>`,
    "barbell": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="32" x2="58" y2="32" />
        <rect x="10" y="22" width="6" height="20" rx="1.5"
              stroke="var(--accent)" stroke-width="3" />
        <rect x="20" y="25" width="4" height="14" rx="1"
              stroke="var(--accent)" stroke-width="3" />
        <rect x="40" y="25" width="4" height="14" rx="1"
              stroke="var(--accent)" stroke-width="3" />
        <rect x="48" y="22" width="6" height="20" rx="1.5"
              stroke="var(--accent)" stroke-width="3" />
      </svg>`,
    "dumbbell": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="20" y1="32" x2="44" y2="32" />
        <rect x="12" y="22" width="8" height="20" rx="1.5"
              stroke="var(--accent)" stroke-width="3" />
        <rect x="44" y="22" width="8" height="20" rx="1.5"
              stroke="var(--accent)" stroke-width="3" />
        <line x1="8" y1="24" x2="8" y2="40"
              stroke="var(--accent)" stroke-width="4" />
        <line x1="56" y1="24" x2="56" y2="40"
              stroke="var(--accent)" stroke-width="4" />
      </svg>`,
  };

  // === Catalog ===========================================================
  // Sets and reps are constant across an exercise — only the weight changes
  // between tiers. Each upgrade fills one pip; once all pips for a level are
  // full, the next upgrade rolls over into the next level. So with
  // pipsPerLevel = 2, going from Lvl 1 (●●○) to Lvl 2 (○○○) takes 3 upgrades.
  // A Starter (Lvl 0) entry is prepended for everyone with sets/reps of 0
  // (sentinel for "no prescription"). Completion at Starter is binary.
  const buildLevels = (t) => {
    const pipsPerLevel = t.pipsPerLevel || 2;
    const tiersPerLevel = pipsPerLevel + 1;
    const levelCount = t.levels || 0;
    const totalPrescriptive = levelCount * tiersPerLevel;
    const out = [{
      sets: 0,
      reps: 0,
      weight: [t.weightStart, t.weightStart],
      level: 0,
      pip: 0,
      pipsPerLevel: 0,
    }];
    for (let i = 0; i < totalPrescriptive; i++) {
      const lo = t.weightStart + i * t.weightStep;
      out.push({
        sets: t.sets,
        reps: t.reps,
        weight: [lo, lo + t.weightStep],
        level: Math.floor(i / tiersPerLevel) + 1,
        pip: i % tiersPerLevel,
        pipsPerLevel,
      });
    }
    return out;
  };

  const templateToExercise = (t) => ({
    id: t.id,
    name: t.name,
    muscles: t.muscles,
    icon: ICONS[t.icon] || ICONS.barbell,
    levels: buildLevels(t),
    snoozeDays: t.snoozeDays != null ? t.snoozeDays : 1,
  });

  let CATALOG = [];

  // === State =============================================================
  const STORAGE_KEY = "workout-app:state:v7";
  const todayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${
      String(d.getDate()).padStart(2, "0")
    }`;
  };

  const blankState = () => ({
    addedIds: [],
    archivedIds: [],
    levels: {},
    completed: {},
  });

  let state = blankState();

  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) state = { ...blankState(), ...JSON.parse(raw) };
    } catch {
      state = blankState();
    }
  };

  const saveState = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Quota or private mode — fail quietly.
    }
  };

  // === Helpers ===========================================================
  const exerciseById = (id) => CATALOG.find((ex) => ex.id === id);
  const addedExercises = () =>
    state.addedIds.map(exerciseById).filter(Boolean);
  // Picker shows everything not currently active. Archived templates are
  // included so they can be restored from the same place; they're flagged
  // visually so the user can tell them apart from never-added templates.
  const availableExercises = () =>
    CATALOG.filter((ex) => !state.addedIds.includes(ex.id));
  const isArchived = (exId) => state.archivedIds.includes(exId);

  // Tier label is just the level number — pips are rendered separately so the
  // pill stays clean even when no pips apply (Lvl 0).
  const tierName = (lvl) => (lvl ? `Lvl ${lvl.level}` : "Lvl ?");
  const renderPips = (lvl) => {
    const total = lvl && lvl.pipsPerLevel ? lvl.pipsPerLevel : 0;
    if (total === 0) return "";
    let html = '<span class="lvl-pill__pips" aria-hidden="true">';
    for (let i = 0; i < total; i++) {
      html += `<span class="lvl-pill__pip${
        i < lvl.pip ? " lvl-pill__pip--on" : ""
      }"></span>`;
    }
    return html + "</span>";
  };

  // Default to the middle level so there's room to upgrade or downgrade
  // right out of the gate.
  const defaultLevel = (ex) => Math.floor((ex.levels.length - 1) / 2);
  const currentLevel = (ex) => ex.levels[state.levels[ex.id]];
  const isLevelZero = (lvl) => lvl.sets === 0;
  const todaysCompletion = (exId) => (state.completed[todayKey()] || {})[exId];
  const fmtWeight = (w) => (w[0] === w[1] ? `${w[0]}` : `${w[0]}–${w[1]}`);

  const lastCompletionDate = (exId) => {
    let max = null;
    for (const date of Object.keys(state.completed)) {
      if (state.completed[date] && state.completed[date][exId]) {
        if (!max || date > max) max = date;
      }
    }
    return max;
  };

  const daysBetweenTodayAnd = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const that = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((today - that) / 86400000);
  };

  // An exercise is snoozed if its most recent completion was less than
  // `snoozeDays` days ago (inclusive of the completion day). Default is 1,
  // i.e. a same-day completion snoozes only for the rest of today.
  const isSnoozed = (ex) => {
    const last = lastCompletionDate(ex.id);
    if (!last) return false;
    const days = ex.snoozeDays != null ? ex.snoozeDays : 1;
    return daysBetweenTodayAnd(last) < days;
  };

  // Sorted descending by date (newest first).
  const exerciseHistory = (exId) =>
    Object.entries(state.completed)
      .filter(([, day]) => day && day[exId])
      .map(([date, day]) => ({ date, ...day[exId] }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const friendlyDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const that = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((today - that) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff} days ago`;
    return `${MONTHS[m - 1]} ${d}`;
  };

  const setChoices = (ex) => {
    const target = currentLevel(ex).sets;
    const out = [];
    for (let i = 1; i <= target + 2; i++) out.push(i);
    return out;
  };

  // === Mutations =========================================================
  const addExercise = (id) => {
    if (state.addedIds.includes(id)) return;
    const ex = exerciseById(id);
    if (!ex) return;
    state.addedIds.push(id);
    state.archivedIds = state.archivedIds.filter((x) => x !== id);
    if (state.levels[id] == null) state.levels[id] = defaultLevel(ex);
    saveState();
    renderExercises();
    renderPicker();
  };

  const archiveExercise = (id) => {
    if (!state.addedIds.includes(id)) return;
    state.addedIds = state.addedIds.filter((x) => x !== id);
    if (!state.archivedIds.includes(id)) state.archivedIds.push(id);
    saveState();
    renderExercises();
    renderPicker();
  };

  const unarchiveExercise = (id) => {
    if (!state.archivedIds.includes(id)) return;
    state.archivedIds = state.archivedIds.filter((x) => x !== id);
    if (!state.addedIds.includes(id)) state.addedIds.push(id);
    saveState();
    renderExercises();
    renderPicker();
  };

  const markComplete = (exId, setsDone) => {
    const ex = exerciseById(exId);
    if (!ex) return;
    const lvl = currentLevel(ex);
    const day = todayKey();
    if (!state.completed[day]) state.completed[day] = {};
    // At Lvl 0 completion is binary; ignore any setsDone value.
    if (isLevelZero(lvl)) {
      state.completed[day][exId] = { level: state.levels[exId], sets: 1 };
      saveState();
      renderExercises();
      return;
    }
    const sets = setsDone == null ? lvl.sets : setsDone;
    if (sets <= 0) {
      clearComplete(exId);
      return;
    }
    state.completed[day][exId] = { level: state.levels[exId], sets };
    saveState();
    renderExercises();
  };

  const clearComplete = (exId) => {
    const day = todayKey();
    if (state.completed[day]) {
      delete state.completed[day][exId];
      saveState();
      renderExercises();
    }
  };

  const changeLevel = (exId, delta) => {
    const ex = exerciseById(exId);
    if (!ex) return;
    const oldIdx = state.levels[exId];
    const next = oldIdx + delta;
    if (next < 0 || next >= ex.levels.length) return;
    const oldLvl = ex.levels[oldIdx];
    const newLvl = ex.levels[next];
    state.levels[exId] = next;
    const today = state.completed[todayKey()];
    if (today && today[exId]) today[exId].level = next;
    saveState();
    renderExercises();
    // Flash only when the level number actually changes — not for pip-fills.
    if (delta > 0 && newLvl.level > oldLvl.level) flashUpgrade(exId);
  };

  // Brief celebration when leveling up.
  const flashUpgrade = (exId) => {
    const row = document.querySelector(`.exercise-row[data-id="${exId}"]`);
    if (!row) return;
    row.classList.remove("exercise-row--upgraded");
    void row.offsetWidth;
    row.classList.add("exercise-row--upgraded");
  };

  const closeAllMenus = (except) => {
    document.querySelectorAll(".exercise-row.is-open").forEach((row) => {
      if (row !== except) row.classList.remove("is-open");
    });
  };

  // === Rendering =========================================================
  const exerciseRowHtml = (ex) => {
      const lvl = currentLevel(ex);
      const lvlIdx = state.levels[ex.id];
      const lvlZero = isLevelZero(lvl);
      const done = todaysCompletion(ex.id);
      const canDown = lvlIdx > 0;
      const canUp = lvlIdx < ex.levels.length - 1;
      const setsDone = done ? done.sets : 0;
      const isPartial = done && !lvlZero && setsDone < lvl.sets;
      const tier = tierName(lvl);
      const pipsHtml = renderPips(lvl);
      const nextTier = canUp ? tierName(ex.levels[lvlIdx + 1]) : null;
      const weightText = fmtWeight(lvl.weight);
      const weightStatHtml = lvlZero
        ? `<span class="exercise-row__try" aria-label="No fixed weight">Try it</span>`
        : `<span class="exercise-row__stat">
             <span class="exercise-row__stat-value">${weightText}</span>
             <span class="exercise-row__stat-label">lb</span>
           </span>`;

      const setChipsHtml = `<div class="menu-row menu-row--chips">
             <span class="menu-row__label">
               Sets done <span class="menu-row__hint">target ${lvl.sets}×${lvl.reps}+</span>
             </span>
             <div class="menu-row__chips">${setChoices(ex)
               .map((n) => {
                 const sel = setsDone === n;
                 return `<button type="button" class="chip${
                   sel ? " chip--on" : ""
                 }" data-action="set-sets" data-value="${n}">${n}</button>`;
               })
               .join("")}</div>
           </div>`;
      const menuBody = lvlZero
        ? `<p class="menu-zero">
             <strong>Lvl 0</strong> is binary — no target sets or reps.
             Just tap done when you've done what you can. Upgrade to
             <strong>${nextTier}</strong> once you're ready to start
             counting sets.
           </p>`
        : setChipsHtml;

      return `
      <div class="exercise-row${done ? " is-done" : ""}${
        isPartial ? " is-partial" : ""
      }${lvlZero ? " is-zero" : ""}" data-id="${ex.id}">
        <button type="button" class="exercise-row__main"
                data-action="open-details">
          <span class="exercise-row__icon">${ex.icon}</span>
          <span class="exercise-row__title">
            <span class="exercise-row__name">${ex.name}</span>
            <span class="exercise-row__meta">
              <span class="lvl-pill${
                lvlZero ? " lvl-pill--zero" : ""
              }">${tier}${pipsHtml}</span>
            </span>
          </span>
          ${weightStatHtml}
        </button>
        <div class="exercise-row__action" role="group"
             aria-label="Complete ${ex.name}">
          <button type="button" class="done-btn"
                  data-action="toggle-done"
                  aria-pressed="${done ? "true" : "false"}"
                  aria-label="${done ? "Mark incomplete" : "Mark complete"}">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 8.5 L6.8 11.8 L12.8 4.8" fill="none"
                    stroke="currentColor" stroke-width="2.2"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button type="button" class="caret-btn"
                  data-action="toggle-menu"
                  aria-label="Adjust ${ex.name}"
                  aria-expanded="false">
            <svg viewBox="0 0 12 8" aria-hidden="true">
              <path d="M1 1.5 L6 6.5 L11 1.5" fill="none"
                    stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div class="exercise-row__menu" role="region"
             aria-label="Adjust ${ex.name}">
          ${menuBody}
          <div class="menu-row menu-row--level">
            <button type="button" class="level-btn"
                    data-action="downgrade"
                    ${canDown ? "" : "disabled"}>
              <span aria-hidden="true">▼</span> Downgrade
            </button>
            <button type="button" class="level-btn level-btn--up"
                    data-action="upgrade"
                    ${canUp ? "" : "disabled"}>
              Upgrade <span aria-hidden="true">▲</span>
            </button>
          </div>
        </div>
      </div>`;
  };

  const renderExercises = () => {
    const availableGrid = $("available-grid");
    const snoozedGrid = $("snoozed-grid");
    const snoozedCard = $("snoozed-card");
    const emptyState = $("empty-state");
    const allDoneState = $("all-done-state");
    if (!availableGrid || !snoozedGrid) return;

    const all = addedExercises();
    if (all.length === 0) {
      availableGrid.innerHTML = "";
      snoozedGrid.innerHTML = "";
      if (snoozedCard) snoozedCard.hidden = true;
      if (allDoneState) allDoneState.hidden = true;
      if (emptyState) emptyState.hidden = false;
      if (openDetailsId != null) renderDetails();
      return;
    }
    if (emptyState) emptyState.hidden = true;

    const available = [];
    const snoozed = [];
    for (const ex of all) {
      (isSnoozed(ex) ? snoozed : available).push(ex);
    }

    availableGrid.innerHTML = available.map(exerciseRowHtml).join("");
    snoozedGrid.innerHTML = snoozed.map(exerciseRowHtml).join("");

    if (snoozedCard) snoozedCard.hidden = snoozed.length === 0;
    if (allDoneState) {
      allDoneState.hidden = !(available.length === 0 && snoozed.length > 0);
    }
    if (openDetailsId != null) renderDetails();
    if (activeTab === "analysis") renderAnalysis();
  };

  // === Analysis tab =====================================================
  const sessionsCount = (exId) => {
    let count = 0;
    for (const date in state.completed) {
      if (state.completed[date] && state.completed[date][exId]) count++;
    }
    return count;
  };

  const computeActivity = () => {
    const dates = Object.keys(state.completed).filter(
      (d) =>
        state.completed[d] && Object.keys(state.completed[d]).length > 0
    );
    let totalSets = 0;
    for (const d of dates) {
      for (const exId in state.completed[d]) {
        totalSets += state.completed[d][exId].sets || 0;
      }
    }
    // Streak: walk back from today (or yesterday if today empty) until a gap.
    const dateSet = new Set(dates);
    const cur = new Date();
    cur.setHours(0, 0, 0, 0);
    const fmt = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${
        String(d.getDate()).padStart(2, "0")
      }`;
    let streak = 0;
    if (!dateSet.has(fmt(cur))) cur.setDate(cur.getDate() - 1);
    while (dateSet.has(fmt(cur))) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    }
    return { workouts: dates.length, totalSets, streak };
  };

  const computeMuscleStats = () => {
    const counts = {};
    for (const date in state.completed) {
      const day = state.completed[date];
      if (!day) continue;
      for (const exId in day) {
        const ex = exerciseById(exId);
        if (!ex || !ex.muscles) continue;
        for (const m of ex.muscles.split("·").map((s) => s.trim())) {
          if (!m) continue;
          counts[m] = (counts[m] || 0) + 1;
        }
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const renderAnalysis = () => {
    const view = $("analysis-view");
    if (!view) return;
    const activity = computeActivity();
    const muscles = computeMuscleStats();
    const exercises = state.addedIds.map(exerciseById).filter(Boolean);
    const maxMuscleCount = muscles.length ? muscles[0][1] : 1;

    const activityCard = `
      <section class="card">
        <h2>Activity</h2>
        <div class="stat-grid">
          <div class="stat">
            <span class="stat__value">${activity.workouts}</span>
            <span class="stat__label">Workout days</span>
          </div>
          <div class="stat">
            <span class="stat__value">${activity.streak}</span>
            <span class="stat__label">Day streak</span>
          </div>
          <div class="stat">
            <span class="stat__value">${activity.totalSets}</span>
            <span class="stat__label">Total sets</span>
          </div>
        </div>
      </section>`;

    const musclesCard = muscles.length === 0 ? "" : `
      <section class="card">
        <h2>Muscles worked</h2>
        <ul class="muscle-list">
          ${muscles.map(([name, count]) => `
            <li class="muscle-list__item">
              <span class="muscle-list__name">${name}</span>
              <span class="muscle-list__bar">
                <span class="muscle-list__bar-fill"
                      style="width: ${(count / maxMuscleCount) * 100}%">
                </span>
              </span>
              <span class="muscle-list__count">${count}</span>
            </li>`).join("")}
        </ul>
      </section>`;

    const progressCard = exercises.length === 0 ? "" : `
      <section class="card">
        <h2>Progress</h2>
        <ul class="progress-list">
          ${exercises.map((ex) => {
            const lvlIdx = state.levels[ex.id];
            const lvl = ex.levels[lvlIdx];
            const sessions = sessionsCount(ex.id);
            const lvlZero = isLevelZero(lvl);
            return `
              <li>
                <button type="button" class="progress-row" data-id="${ex.id}">
                  <span class="progress-row__icon">${ex.icon}</span>
                  <span class="progress-row__name">${ex.name}</span>
                  <span class="lvl-pill${lvlZero ? " lvl-pill--zero" : ""}">${
                    tierName(lvl)
                  }${renderPips(lvl)}</span>
                  <span class="progress-row__sessions">${sessions}×</span>
                </button>
              </li>`;
          }).join("")}
        </ul>
      </section>`;

    const empty = activity.workouts === 0 && exercises.length === 0
      ? `<p class="empty-state">
           No data yet — add an exercise from the Home tab and complete it
           to start seeing stats here.
         </p>`
      : "";

    view.innerHTML = activityCard + musclesCard + progressCard + empty;
  };

  // === Tab switching =====================================================
  let activeTab = "home";
  const switchTab = (tab) => {
    activeTab = tab;
    $("home-view").hidden = tab !== "home";
    $("analysis-view").hidden = tab !== "analysis";
    $("add-exercise-btn").hidden = tab !== "home";
    for (const btn of document.querySelectorAll(".tab")) {
      const on = btn.dataset.tab === tab;
      btn.classList.toggle("tab--active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    }
    if (tab === "analysis") renderAnalysis();
  };

  const renderPicker = () => {
    const list = $("picker-list");
    const empty = $("picker-empty");
    if (!list) return;
    const items = availableExercises();
    if (items.length === 0) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    list.innerHTML = items.map((ex) => {
      const archived = isArchived(ex.id);
      const label = archived ? "Restore" : "Add";
      return `
      <button type="button"
              class="picker-item${archived ? " picker-item--archived" : ""}"
              data-id="${ex.id}">
        <span class="picker-item__icon">${ex.icon}</span>
        <span class="picker-item__name">
          ${ex.name}${archived
            ? ' <span class="picker-item__badge">Archived</span>'
            : ""}
        </span>
        <span class="picker-item__add" aria-label="${label} ${ex.name}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5 V19 M5 12 H19" fill="none" stroke="currentColor"
                  stroke-width="2.4" stroke-linecap="round" />
          </svg>
        </span>
      </button>`;
    }).join("");
  };

  const openPicker = () => {
    renderPicker();
    $("picker").hidden = false;
    document.body.classList.add("modal-open");
  };
  const closePicker = () => {
    $("picker").hidden = true;
    document.body.classList.remove("modal-open");
  };

  const parseDateStr = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  };

  // Simple inline SVG line chart of weight over time. Returns "" when there
  // aren't enough data points to draw a line.
  const renderProgressChart = (ex, history) => {
    const points = history
      .filter((h) => {
        const l = ex.levels[h.level];
        return l && !isLevelZero(l);
      })
      .map((h) => ({
        ts: parseDateStr(h.date),
        weight: ex.levels[h.level].weight[0],
      }))
      .sort((a, b) => a.ts - b.ts);
    if (points.length < 2) return "";
    const W = 320, H = 140, padX = 12, padY = 16;
    const xs = points.map((p) => p.ts);
    const ys = points.map((p) => p.weight);
    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(...ys);
    const yMax = Math.max(...ys);
    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;
    const x = (t) => padX + ((t - xMin) / xRange) * (W - 2 * padX);
    const y = (v) => H - padY - ((v - yMin) / yRange) * (H - 2 * padY);
    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.ts).toFixed(1)} ${y(p.weight).toFixed(1)}`)
      .join(" ");
    const areaPath = linePath +
      ` L ${x(xMax).toFixed(1)} ${(H - padY).toFixed(1)}` +
      ` L ${x(xMin).toFixed(1)} ${(H - padY).toFixed(1)} Z`;
    const dots = points
      .map((p) =>
        `<circle cx="${x(p.ts).toFixed(1)}" cy="${y(p.weight).toFixed(1)}"
                 r="3.5" fill="var(--accent)" stroke="var(--surface-2)"
                 stroke-width="1.5" />`)
      .join("");
    return `
      <svg class="details__chart" viewBox="0 0 ${W} ${H}" role="img"
           aria-label="Weight progress over time">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.35" />
            <stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
          </linearGradient>
        </defs>
        <line x1="${padX}" y1="${H - padY}" x2="${W - padX}" y2="${H - padY}"
              stroke="var(--border)" stroke-width="1" />
        <path d="${areaPath}" fill="url(#chart-fill)" stroke="none" />
        <path d="${linePath}" fill="none" stroke="var(--accent)" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
        ${dots}
        <text x="${padX}" y="11" font-size="10" fill="var(--muted)">${yMax} lb</text>
        <text x="${padX}" y="${H - 4}" font-size="10" fill="var(--muted)">${yMin} lb</text>
      </svg>`;
  };

  let openDetailsId = null;
  const renderDetails = () => {
    if (openDetailsId == null) return;
    const ex = exerciseById(openDetailsId);
    if (!ex) return;
    const lvlIdx = state.levels[ex.id];
    const lvl = ex.levels[lvlIdx];
    const lvlZero = isLevelZero(lvl);
    const tier = tierName(lvl);
    $("details-title").textContent = ex.name;

    const history = exerciseHistory(ex.id);
    const chartHtml = renderProgressChart(ex, history);
    const historyHtml = history.length === 0
      ? `<p class="details__empty">No history yet — complete this exercise
           to start tracking.</p>`
      : `<ul class="details__history">${history.map((entry) => {
          const entryLvl = ex.levels[entry.level];
          const entryTier = tierName(entryLvl);
          const entryZero = entryLvl ? isLevelZero(entryLvl) : false;
          const setsLabel = entryZero
            ? "completed"
            : entryLvl
              ? `${entry.sets}/${entryLvl.sets} sets`
              : `${entry.sets} sets`;
          const partial = entryLvl && !entryZero && entry.sets < entryLvl.sets;
          const weight = entryLvl && !entryZero
            ? fmtWeight(entryLvl.weight)
            : "";
          return `
            <li class="details__entry${partial ? " is-partial" : ""}">
              <span class="details__date">${friendlyDate(entry.date)}</span>
              <span class="details__entry-tier">${entryTier}</span>
              <span class="details__entry-meta">
                ${setsLabel}${weight ? ` · ${weight} lb` : ""}
              </span>
            </li>`;
        }).join("")}</ul>`;

    const summary = lvlZero
      ? `${tier} · just trying it out`
      : `${tier} · ${fmtWeight(lvl.weight)} lb · ${lvl.sets}×${lvl.reps}+`;

    const archived = isArchived(ex.id);
    const archiveBtnHtml = `
      <button type="button" class="details__archive"
              data-action="${archived ? "unarchive" : "archive"}">
        ${archived ? "Unarchive" : "Archive"}
      </button>`;

    $("details-body").innerHTML = `
      <div class="details__hero">
        <span class="details__icon">${ex.icon}</span>
        <span class="details__hero-text">
          <span class="details__hero-summary">${summary}</span>
          <span class="details__hero-muscles">${ex.muscles}</span>
        </span>
      </div>
      ${chartHtml ? `<h3 class="details__section">Progress</h3>${chartHtml}` : ""}
      <h3 class="details__section">History</h3>
      ${historyHtml}
      ${archiveBtnHtml}
    `;
  };

  const openDetails = (exId) => {
    openDetailsId = exId;
    renderDetails();
    $("details").hidden = false;
    document.body.classList.add("modal-open");
  };
  const closeDetails = () => {
    openDetailsId = null;
    $("details").hidden = true;
    if ($("picker").hidden) document.body.classList.remove("modal-open");
  };

  // === Wiring ============================================================
  const setupListeners = () => {
    document.querySelector(".content").addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target) return;
      const row = target.closest(".exercise-row");
      if (!row) return;
      const exId = row.dataset.id;
      const action = target.dataset.action;

      if (action === "toggle-done") {
        if (todaysCompletion(exId)) clearComplete(exId);
        else markComplete(exId);
        return;
      }
      if (action === "toggle-menu") {
        const open = row.classList.toggle("is-open");
        closeAllMenus(open ? row : null);
        target.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      if (action === "set-sets") {
        markComplete(exId, Number(target.dataset.value));
        return;
      }
      if (action === "upgrade") return changeLevel(exId, +1);
      if (action === "downgrade") return changeLevel(exId, -1);
      if (action === "open-details") return openDetails(exId);
    });

    $("details-body").addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target || openDetailsId == null) return;
      const action = target.dataset.action;
      if (action === "archive") {
        archiveExercise(openDetailsId);
        closeDetails();
      } else if (action === "unarchive") {
        unarchiveExercise(openDetailsId);
        closeDetails();
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".exercise-row")) closeAllMenus(null);
    });

    $("add-exercise-btn").addEventListener("click", openPicker);
    $("picker-close").addEventListener("click", closePicker);
    $("picker-backdrop").addEventListener("click", closePicker);
    $("picker-list").addEventListener("click", (event) => {
      const item = event.target.closest(".picker-item");
      if (!item) return;
      addExercise(item.dataset.id);
    });
    $("details-close").addEventListener("click", closeDetails);
    $("details-backdrop").addEventListener("click", closeDetails);
    $("analysis-view").addEventListener("click", (event) => {
      const btn = event.target.closest(".progress-row");
      if (!btn) return;
      openDetails(btn.dataset.id);
    });
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!$("details").hidden) closeDetails();
      else if (!$("picker").hidden) closePicker();
    });
  };

  // === Network status ====================================================
  const setNet = () => {
    const el = $("net-status");
    if (!el) return;
    if (navigator.onLine) {
      el.textContent = "online";
      el.classList.add("online");
      el.classList.remove("offline");
    } else {
      el.textContent = "offline";
      el.classList.add("offline");
      el.classList.remove("online");
    }
  };

  // === Init ==============================================================
  const init = async () => {
    const res = await fetch("./exercises.json");
    if (!res.ok) throw new Error("failed to load exercises.json");
    const data = await res.json();
    CATALOG = data.templates.map(templateToExercise);

    loadState();
    // Drop any addedIds whose template was removed from the catalog.
    state.addedIds = state.addedIds.filter((id) => exerciseById(id));
    // Backfill levels for added exercises that don't have one yet.
    for (const id of state.addedIds) {
      if (state.levels[id] == null) {
        state.levels[id] = defaultLevel(exerciseById(id));
      }
    }

    renderExercises();
    setupListeners();
    setNet();
    window.addEventListener("online", setNet);
    window.addEventListener("offline", setNet);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    }
  };
  init().catch((err) => {
    const grid = $("available-grid");
    if (grid) {
      grid.innerHTML = `<p class="load-error">Couldn't load exercise catalog: ${
        err.message
      }</p>`;
    }
  });
})();
