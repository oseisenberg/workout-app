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
    "pushup": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="58" x2="58" y2="58" />
        <line x1="14" y1="36" x2="50" y2="36" />
        <circle cx="11" cy="36" r="4" fill="currentColor" stroke="none" />
        <path d="M18 36 L20 50 L28 50"
              stroke="var(--accent)" stroke-width="3.5" />
        <path d="M44 36 L46 50 L52 50"
              stroke="var(--accent)" stroke-width="3.5" />
      </svg>`,
    "pullup": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="14" x2="58" y2="14" />
        <line x1="10" y1="6" x2="10" y2="14" />
        <line x1="54" y1="6" x2="54" y2="14" />
        <line x1="22" y1="14" x2="22" y2="28"
              stroke="var(--accent)" stroke-width="3.5" />
        <line x1="42" y1="14" x2="42" y2="28"
              stroke="var(--accent)" stroke-width="3.5" />
        <circle cx="32" cy="24" r="4" />
        <line x1="32" y1="28" x2="32" y2="46" />
        <line x1="32" y1="46" x2="26" y2="56" />
        <line x1="32" y1="46" x2="38" y2="56" />
      </svg>`,
    "situp": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <path d="M10 56 L18 40 L30 40 L34 28"
              stroke="var(--accent)" stroke-width="3.5" />
        <circle cx="36" cy="22" r="4" />
        <line x1="30" y1="40" x2="40" y2="34" />
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
    const bw = !!t.bodyweight;
    // Lvl 0 is binary with no weight or rep prescription — represents "I
    // did the exercise but couldn't do the full sets at any weight". Lvl 1
    // pip 0 then owns the [0, weightStart] band as the first tier where
    // full sets are expected; subsequent pips step up by weightStep.
    const out = [{
      sets: 0,
      reps: 0,
      weight: null,
      bodyweight: bw,
      level: 0,
      pip: 0,
      pipsPerLevel: 0,
    }];
    for (let i = 0; i < totalPrescriptive; i++) {
      const wLo = i === 0 ? 0 : t.weightStart + (i - 1) * t.weightStep;
      const wHi = i === 0 ? t.weightStart : t.weightStart + i * t.weightStep;
      const rLo = i === 0 ? 0 : t.repsStart + (i - 1) * t.repsStep;
      const rHi = i === 0 ? t.repsStart : t.repsStart + i * t.repsStep;
      out.push({
        sets: t.sets,
        reps: bw ? [rLo, rHi] : t.reps,
        weight: bw ? null : [wLo, wHi],
        bodyweight: bw,
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
  // Newly added exercises start at Lvl 1 pip 0 — the lowest prescriptive
  // tier (the minimum weight). Users can downgrade to Lvl 0 (Starter) or
  // upgrade as they go.
  const defaultLevel = (ex) => (ex.levels.length > 1 ? 1 : 0);
  const currentLevel = (ex) => ex.levels[state.levels[ex.id]];
  const isLevelZero = (lvl) => lvl.sets === 0;
  const todaysCompletion = (exId) => (state.completed[todayKey()] || {})[exId];
  const fmtWeight = (w) => (w[0] === w[1] ? `${w[0]}` : `${w[0]}–${w[1]}`);
  // Bodyweight reps are a range; weighted exercises store a single rep
  // number that's treated as a minimum target (rendered with a "+" suffix).
  const fmtReps = (r) =>
    Array.isArray(r) ? `${r[0]}–${r[1]}` : `${r}+`;
  const repsLow = (r) => (Array.isArray(r) ? r[0] : r);

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

  // Animate the row at its current spot before letting it be re-rendered
  // into Snoozed (which may be collapsed and therefore invisible). After
  // the animation finishes, run the state mutation and pulse the Snoozed
  // header so the user can see where the exercise went.
  const animateThenComplete = (exId, setsValue) => {
    const wasDone = !!todaysCompletion(exId);
    const apply = () => {
      if (setsValue != null) markComplete(exId, setsValue);
      else markComplete(exId);
      flashSnoozedHeader();
    };
    if (wasDone) {
      apply();
      return;
    }
    const row = document.querySelector(`.exercise-row[data-id="${exId}"]`);
    if (!row) {
      apply();
      return;
    }
    row.classList.add("exercise-row--completing");
    setTimeout(apply, 320);
  };

  const flashSnoozedHeader = () => {
    const toggle = $("snoozed-toggle");
    if (!toggle) return;
    toggle.classList.remove("snoozed-toggle--flash");
    void toggle.offsetWidth;
    toggle.classList.add("snoozed-toggle--flash");
    setTimeout(() => toggle.classList.remove("snoozed-toggle--flash"), 700);
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
      const isBw = !!lvl.bodyweight;
      const weightStatHtml = lvlZero
        ? `<span class="exercise-row__try" aria-label="No fixed prescription">Try it</span>`
        : `<span class="exercise-row__stat">
             <span class="exercise-row__stat-value">${
               isBw ? fmtReps(lvl.reps) : fmtWeight(lvl.weight)
             }</span>
             <span class="exercise-row__stat-label">${isBw ? "reps" : "lb"}</span>
           </span>`;

      const setChipsHtml = `<div class="menu-row menu-row--chips">
             <span class="menu-row__label">
               Sets done <span class="menu-row__hint">target ${lvl.sets}×${fmtReps(lvl.reps)}</span>
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
    const snoozedCount = $("snoozed-count");
    if (snoozedCount) snoozedCount.textContent = String(snoozed.length);
    if (allDoneState) {
      allDoneState.hidden = !(available.length === 0 && snoozed.length > 0);
    }
    if (openDetailsId != null) renderDetails();
    if (activeTab === "analysis") renderAnalysis();
  };

  // === Analysis tab =====================================================
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

  // Map a muscle string from the catalog to one or more body-region keys.
  const MUSCLE_REGIONS = {
    "quads": ["quads"],
    "glutes": ["glutes"],
    "hamstrings": ["hamstrings"],
    "lats": ["lats"],
    "biceps": ["biceps"],
    "triceps": ["triceps"],
    "chest": ["chest"],
    "shoulders": ["shoulders"],
    "back": ["back"],
    "core": ["core"],
    "calves": ["calves"],
    "posterior chain": ["back", "glutes", "hamstrings"],
  };
  const muscleRegions = (name) => {
    const key = name.toLowerCase();
    return MUSCLE_REGIONS[key] || [];
  };

  const dateNDaysAgo = (n) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - n);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${
      String(d.getDate()).padStart(2, "0")
    }`;
  };

  // counts keyed by region for completions on or after `sinceDate` (inclusive).
  const regionCountsSince = (sinceDate) => {
    const counts = {};
    for (const date in state.completed) {
      if (sinceDate && date < sinceDate) continue;
      const day = state.completed[date];
      if (!day) continue;
      for (const exId in day) {
        const ex = exerciseById(exId);
        if (!ex || !ex.muscles) continue;
        for (const m of ex.muscles.split("·").map((s) => s.trim())) {
          if (!m) continue;
          for (const r of muscleRegions(m)) {
            counts[r] = (counts[r] || 0) + 1;
          }
        }
      }
    }
    return counts;
  };

  const muscleClass = (count) => {
    if (!count) return "muscle";
    if (count === 1) return "muscle muscle--lvl1";
    if (count <= 3) return "muscle muscle--lvl2";
    if (count <= 6) return "muscle muscle--lvl3";
    return "muscle muscle--lvl4";
  };

  // Two simple stylized body diagrams (front + back) with muscle regions
  // colored by `counts`. Each region is an ellipse layered over a rounded
  // body silhouette so the figure stays simple and readable on a phone.
  const renderBodyDiagram = (counts) => {
    const c = (k) => muscleClass(counts[k] || 0);
    const silhouette = `
      <g class="body-outline">
        <circle cx="60" cy="22" r="14" />
        <rect x="38" y="42" width="44" height="82" rx="14" />
        <rect x="20" y="46" width="14" height="72" rx="7" />
        <rect x="86" y="46" width="14" height="72" rx="7" />
        <rect x="40" y="124" width="18" height="100" rx="8" />
        <rect x="62" y="124" width="18" height="100" rx="8" />
      </g>`;
    const front = `
      <div class="body-figure">
        <span class="body-figure__label">Front</span>
      <svg class="body" viewBox="0 0 120 232" aria-label="Front body"
           role="img">
        ${silhouette}
        <ellipse class="${c("shoulders")}" cx="27" cy="50" rx="8" ry="6" />
        <ellipse class="${c("shoulders")}" cx="93" cy="50" rx="8" ry="6" />
        <ellipse class="${c("chest")}" cx="60" cy="58" rx="18" ry="8" />
        <ellipse class="${c("biceps")}" cx="27" cy="72" rx="5" ry="13" />
        <ellipse class="${c("biceps")}" cx="93" cy="72" rx="5" ry="13" />
        <ellipse class="${c("core")}" cx="60" cy="96" rx="14" ry="18" />
        <ellipse class="${c("quads")}" cx="49" cy="158" rx="8" ry="22" />
        <ellipse class="${c("quads")}" cx="71" cy="158" rx="8" ry="22" />
        <ellipse class="${c("calves")}" cx="49" cy="206" rx="6" ry="14" />
        <ellipse class="${c("calves")}" cx="71" cy="206" rx="6" ry="14" />
      </svg>
      </div>`;
    const back = `
      <div class="body-figure">
        <span class="body-figure__label">Back</span>
      <svg class="body" viewBox="0 0 120 232" aria-label="Back body"
           role="img">
        ${silhouette}
        <ellipse class="${c("shoulders")}" cx="27" cy="50" rx="8" ry="6" />
        <ellipse class="${c("shoulders")}" cx="93" cy="50" rx="8" ry="6" />
        <ellipse class="${c("back")}" cx="60" cy="62" rx="20" ry="14" />
        <ellipse class="${c("lats")}" cx="44" cy="80" rx="6" ry="12" />
        <ellipse class="${c("lats")}" cx="76" cy="80" rx="6" ry="12" />
        <ellipse class="${c("triceps")}" cx="27" cy="72" rx="5" ry="13" />
        <ellipse class="${c("triceps")}" cx="93" cy="72" rx="5" ry="13" />
        <ellipse class="${c("glutes")}" cx="49" cy="130" rx="8" ry="8" />
        <ellipse class="${c("glutes")}" cx="71" cy="130" rx="8" ry="8" />
        <ellipse class="${c("hamstrings")}" cx="49" cy="162" rx="8" ry="20" />
        <ellipse class="${c("hamstrings")}" cx="71" cy="162" rx="8" ry="20" />
        <ellipse class="${c("calves")}" cx="49" cy="206" rx="6" ry="14" />
        <ellipse class="${c("calves")}" cx="71" cy="206" rx="6" ry="14" />
      </svg>
      </div>`;
    return `<div class="bodies">${front}${back}</div>`;
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

  let muscleRange = "today";
  const renderAnalysis = () => {
    const view = $("analysis-view");
    if (!view) return;
    const activity = computeActivity();
    const exercises = state.addedIds.map(exerciseById).filter(Boolean);
    const todayCounts = regionCountsSince(todayKey());
    const monthCounts = regionCountsSince(dateNDaysAgo(30));
    const hasToday = Object.values(todayCounts).some((v) => v > 0);
    const hasMonth = Object.values(monthCounts).some((v) => v > 0);

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

    const counts = muscleRange === "today" ? todayCounts : monthCounts;
    const hasData = muscleRange === "today" ? hasToday : hasMonth;
    const musclesCard = `
      <section class="card">
        <h2>Muscles worked</h2>
        <div class="muscle-toggle" role="tablist">
          <button type="button" role="tab"
                  class="muscle-toggle__btn${
                    muscleRange === "today" ? " muscle-toggle__btn--active" : ""
                  }"
                  data-range="today">Today</button>
          <button type="button" role="tab"
                  class="muscle-toggle__btn${
                    muscleRange === "month" ? " muscle-toggle__btn--active" : ""
                  }"
                  data-range="month">Last 30 days</button>
        </div>
        ${hasData
          ? renderBodyDiagram(counts)
          : `<p class="empty-state">${
            muscleRange === "today"
              ? "No exercises completed today yet."
              : "Nothing in the past month yet."
          }</p>`}
      </section>`;

    const empty = activity.workouts === 0 && exercises.length === 0
      ? `<p class="empty-state">
           No data yet — add an exercise from the Home tab and complete it
           to start seeing stats here.
         </p>`
      : "";

    view.innerHTML = activityCard + musclesCard + empty;
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

  let pickerQuery = "";
  const renderPicker = () => {
    const list = $("picker-list");
    const empty = $("picker-empty");
    if (!list) return;
    const q = pickerQuery.trim().toLowerCase();
    const items = availableExercises().filter((ex) =>
      !q ||
      ex.name.toLowerCase().includes(q) ||
      (ex.muscles || "").toLowerCase().includes(q));
    if (items.length === 0) {
      list.innerHTML = "";
      if (empty) {
        empty.textContent = q
          ? `No exercises match "${pickerQuery.trim()}".`
          : "You've added every exercise in the catalog.";
        empty.hidden = false;
      }
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
    pickerQuery = "";
    const search = $("picker-search");
    if (search) search.value = "";
    renderPicker();
    $("picker").hidden = false;
    document.body.classList.add("modal-open");
  };
  const closePicker = () => {
    $("picker").hidden = true;
    if ($("details").hidden && $("settings").hidden) {
      document.body.classList.remove("modal-open");
    }
  };

  const TEST_BACKUP_KEY = "workout-app:test-backup:v7";

  const renderSettings = () => {
    const body = $("settings-body");
    if (!body) return;
    const hasBackup = !!localStorage.getItem(TEST_BACKUP_KEY);
    body.innerHTML = `
      <button type="button" class="settings__option" data-action="export-all">
        <span class="settings__option-title">Export all data</span>
        <span class="settings__option-desc">
          Includes every exercise, level, and completion history.
        </span>
      </button>
      <button type="button" class="settings__option"
              data-action="export-no-history">
        <span class="settings__option-title">Export without history</span>
        <span class="settings__option-desc">
          Just the active exercises and their current levels.
        </span>
      </button>
      ${hasBackup
        ? `<button type="button" class="settings__option settings__option--danger"
                   data-action="undo-test-data">
             <span class="settings__option-title">Undo test data</span>
             <span class="settings__option-desc">
               Restore the state you had before loading test data.
             </span>
           </button>`
        : `<button type="button" class="settings__option"
                   data-action="load-test-data">
             <span class="settings__option-title">Load test data</span>
             <span class="settings__option-desc">
               Generate ~60 days of fake completion history for every added
               exercise so the chart, streak, and muscle diagrams have
               something to show. Your real state is backed up locally.
             </span>
           </button>`}
    `;
  };

  const openSettings = () => {
    renderSettings();
    $("settings").hidden = false;
    document.body.classList.add("modal-open");
  };
  const closeSettings = () => {
    $("settings").hidden = true;
    if ($("picker").hidden && $("details").hidden) {
      document.body.classList.remove("modal-open");
    }
  };

  // Generate ~60 days of plausible completion history for every active
  // exercise, walking the tier index up over time so the chart and the
  // muscle diagrams have something to render. The current state is stashed
  // under TEST_BACKUP_KEY so it can be restored.
  const generateTestData = () => {
    if (state.addedIds.length === 0) return;
    localStorage.setItem(TEST_BACKUP_KEY, JSON.stringify(state));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fmt = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${
        String(d.getDate()).padStart(2, "0")
      }`;
    const completed = { ...state.completed };
    const levels = { ...state.levels };

    for (const exId of state.addedIds) {
      const ex = exerciseById(exId);
      if (!ex) continue;
      const totalTiers = ex.levels.length;
      const snoozeDays = ex.snoozeDays || 1;
      let curTier = 1;
      let lastTs = null;
      for (let i = 60; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        if (lastTs && (d - lastTs) / 86400000 < snoozeDays) continue;
        if (Math.random() > 0.65) continue;
        if (Math.random() < 0.12 && curTier < totalTiers - 1) curTier++;
        const lvl = ex.levels[curTier];
        const targetSets = lvl.sets || 1;
        const sets = isLevelZero(lvl)
          ? 1
          : Math.random() < 0.12
            ? Math.max(1, targetSets - 1)
            : targetSets;
        const dateKey = fmt(d);
        if (!completed[dateKey]) completed[dateKey] = {};
        completed[dateKey][exId] = { level: curTier, sets };
        lastTs = d;
      }
      levels[exId] = curTier;
    }

    state.completed = completed;
    state.levels = levels;
    saveState();
    renderExercises();
  };

  const undoTestData = () => {
    const raw = localStorage.getItem(TEST_BACKUP_KEY);
    if (!raw) return;
    try {
      state = { ...blankState(), ...JSON.parse(raw) };
    } catch {
      return;
    }
    localStorage.removeItem(TEST_BACKUP_KEY);
    saveState();
    renderExercises();
  };

  // Triggers a JSON file download with the given object.
  const downloadJson = (filename, data) => {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const exportData = (includeHistory) => {
    const stamp = todayKey();
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      includesHistory: !!includeHistory,
      addedIds: state.addedIds,
      archivedIds: state.archivedIds,
      levels: state.levels,
    };
    if (includeHistory) payload.completed = state.completed;
    const suffix = includeHistory ? "full" : "no-history";
    downloadJson(`workout-export-${stamp}-${suffix}.json`, payload);
  };

  const parseDateStr = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  };

  // Inline SVG line chart of tier index (pip granularity) over time. Each
  // upgrade is a step of +1; level boundaries become flat plateaus on the
  // line. Returns "" when there aren't enough data points to draw a line.
  const dateBadge = (ts) => {
    const d = new Date(ts);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((today - d) / 86400000);
    if (diff <= 0) return "today";
    if (diff === 1) return "yesterday";
    if (diff < 14) return `${diff}d ago`;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  };

  const renderProgressChart = (ex, history) => {
    const points = history
      .filter((h) => h.level > 0)
      .map((h) => ({ ts: parseDateStr(h.date), tier: h.level }))
      .sort((a, b) => a.ts - b.ts);
    if (points.length < 2) return "";
    const W = 320, H = 140, padX = 12, padY = 22;
    const xs = points.map((p) => p.ts);
    const ys = points.map((p) => p.tier);
    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(...ys);
    const yMax = Math.max(...ys);
    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;
    const x = (t) => padX + ((t - xMin) / xRange) * (W - 2 * padX);
    const y = (v) => H - padY - ((v - yMin) / yRange) * (H - 2 * padY);
    const linePath = points
      .map((p, i) =>
        `${i === 0 ? "M" : "L"} ${x(p.ts).toFixed(1)} ${y(p.tier).toFixed(1)}`)
      .join(" ");
    const areaPath = linePath +
      ` L ${x(xMax).toFixed(1)} ${(H - padY).toFixed(1)}` +
      ` L ${x(xMin).toFixed(1)} ${(H - padY).toFixed(1)} Z`;
    const maxLvl = ex.levels[yMax];
    const maxLabel = maxLvl ? tierName(maxLvl) : "";
    return `
      <svg class="details__chart" viewBox="0 0 ${W} ${H}" role="img"
           aria-label="Level progress over time">
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
        <text x="${padX}" y="12" font-size="10" fill="var(--muted)">${maxLabel}</text>
        <text x="${padX}" y="${H - 6}" font-size="10" fill="var(--muted)">${dateBadge(xMin)}</text>
        <text x="${W - padX}" y="${H - 6}" font-size="10" fill="var(--muted)" text-anchor="end">${dateBadge(xMax)}</text>
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
    const progressHtml = chartHtml
      ? chartHtml
      : `<p class="details__empty">
           Complete this exercise on a few different days to start seeing
           your progress here.
         </p>`;

    const summary = lvlZero
      ? `${tier} · just trying it out`
      : lvl.bodyweight
        ? `${tier} · ${lvl.sets}×${fmtReps(lvl.reps)} reps`
        : `${tier} · ${fmtWeight(lvl.weight)} lb · ${lvl.sets}×${fmtReps(lvl.reps)}`;

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
      <h3 class="details__section">Progress</h3>
      ${progressHtml}
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
        else animateThenComplete(exId);
        return;
      }
      if (action === "toggle-menu") {
        const open = row.classList.toggle("is-open");
        closeAllMenus(open ? row : null);
        target.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      if (action === "set-sets") {
        animateThenComplete(exId, Number(target.dataset.value));
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
      closePicker();
    });
    $("picker-search").addEventListener("input", (event) => {
      pickerQuery = event.target.value;
      renderPicker();
    });
    $("details-close").addEventListener("click", closeDetails);
    $("details-backdrop").addEventListener("click", closeDetails);
    $("settings-btn").addEventListener("click", openSettings);
    $("settings-close").addEventListener("click", closeSettings);
    $("settings-backdrop").addEventListener("click", closeSettings);
    $("settings").addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target) return;
      const action = target.dataset.action;
      if (action === "export-all") exportData(true);
      else if (action === "export-no-history") exportData(false);
      else if (action === "load-test-data") {
        generateTestData();
        closeSettings();
      } else if (action === "undo-test-data") {
        undoTestData();
        closeSettings();
      }
    });
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });
    $("analysis-view").addEventListener("click", (event) => {
      const btn = event.target.closest(".muscle-toggle__btn");
      if (!btn || !btn.dataset.range) return;
      muscleRange = btn.dataset.range;
      renderAnalysis();
    });
    $("snoozed-toggle").addEventListener("click", () => {
      const card = $("snoozed-card");
      const collapsed = card.classList.toggle("card--collapsed");
      $("snoozed-toggle").setAttribute(
        "aria-expanded", collapsed ? "false" : "true",
      );
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!$("settings").hidden) closeSettings();
      else if (!$("details").hidden) closeDetails();
      else if (!$("picker").hidden) closePicker();
    });
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
    // One-time migration: previously the default level was the middle of
    // the range, so existing state may have exercises sitting partway up.
    // Reset them to the new Lvl 1 default. Completion history is untouched.
    if (!state.levelsResetV8) {
      for (const id of state.addedIds) {
        const ex = exerciseById(id);
        if (ex) state.levels[id] = defaultLevel(ex);
      }
      state.levelsResetV8 = true;
      saveState();
    }

    renderExercises();
    setupListeners();

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
