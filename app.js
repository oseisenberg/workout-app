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
  // between tiers. Upgrading bumps the weight by `weightStep`, which is
  // hard-coded per exercise (e.g. 10 lb for a leg curl stack, 45 lb for a
  // plate-loaded leg press). A Starter (Lvl 0) entry is prepended for
  // everyone with sets/reps of 0 (sentinel for "no prescription") and the
  // baseline weight as a reference. Completion at Starter is binary.
  const buildLevels = (t) => {
    const tierCount = t.tiers || 0;
    const out = [{ sets: 0, reps: 0, weight: t.weightStart }];
    for (let i = 0; i < tierCount; i++) {
      out.push({
        sets: t.sets,
        reps: t.reps,
        weight: t.weightStart + i * t.weightStep,
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
  });

  let CATALOG = [];

  // === State =============================================================
  const STORAGE_KEY = "workout-app:state:v6";
  const todayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${
      String(d.getDate()).padStart(2, "0")
    }`;
  };

  const blankState = () => ({
    addedIds: [],
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
  const availableExercises = () =>
    CATALOG.filter((ex) => !state.addedIds.includes(ex.id));

  // Tier names map onto level indices. They make progression feel like a
  // milestone (Beginner -> Novice) rather than an arbitrary number that
  // pretends to be comparable across exercises.
  const TIERS = [
    "Starter",
    "Beginner",
    "Novice",
    "Intermediate",
    "Advanced",
    "Expert",
    "Elite",
  ];
  const tierName = (idx) =>
    TIERS[idx] || `Elite +${idx - (TIERS.length - 1)}`;

  // Default to the middle level so there's room to upgrade or downgrade
  // right out of the gate.
  const defaultLevel = (ex) => Math.floor((ex.levels.length - 1) / 2);
  const currentLevel = (ex) => ex.levels[state.levels[ex.id]];
  const isLevelZero = (lvl) => lvl.sets === 0;
  const todaysCompletion = (exId) => (state.completed[todayKey()] || {})[exId];

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
    if (state.levels[id] == null) state.levels[id] = defaultLevel(ex);
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
    const next = state.levels[exId] + delta;
    if (next < 0 || next >= ex.levels.length) return;
    state.levels[exId] = next;
    const today = state.completed[todayKey()];
    if (today && today[exId]) today[exId].level = next;
    saveState();
    renderExercises();
    if (delta > 0) flashUpgrade(exId);
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
      const setsText = lvlZero
        ? "—"
        : done
          ? `${setsDone}/${lvl.sets}`
          : `${lvl.sets}`;
      const volumeText = lvlZero ? "—" : `${setsText}×${lvl.reps}+`;
      const tier = tierName(lvlIdx);
      const nextTier = canUp ? tierName(lvlIdx + 1) : null;
      const weightText = `${lvl.weight}`;

      const setChipsHtml = `<div class="menu-row menu-row--chips">
             <span class="menu-row__label">Sets done</span>
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
             You're at <strong>Starter</strong> — just mark complete when
             you've done what you can. Upgrade to <strong>${nextTier}</strong>
             when you can hit the full prescription.
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
              }">${tier}</span>
            </span>
          </span>
          <span class="exercise-row__volume${
            isPartial ? " exercise-row__volume--partial" : ""
          }">${volumeText}</span>
          <span class="exercise-row__stat">
            <span class="exercise-row__stat-value">${weightText}</span>
            <span class="exercise-row__stat-label">lb</span>
          </span>
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
      return;
    }
    if (emptyState) emptyState.hidden = true;

    const available = [];
    const snoozed = [];
    for (const ex of all) {
      (todaysCompletion(ex.id) ? snoozed : available).push(ex);
    }

    availableGrid.innerHTML = available.map(exerciseRowHtml).join("");
    snoozedGrid.innerHTML = snoozed.map(exerciseRowHtml).join("");

    if (snoozedCard) snoozedCard.hidden = snoozed.length === 0;
    if (allDoneState) {
      allDoneState.hidden = !(available.length === 0 && snoozed.length > 0);
    }
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
    list.innerHTML = items.map((ex) => `
      <button type="button" class="picker-item" data-id="${ex.id}">
        <span class="picker-item__icon">${ex.icon}</span>
        <span class="picker-item__name">${ex.name}</span>
        <span class="picker-item__add" aria-label="Add ${ex.name}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5 V19 M5 12 H19" fill="none" stroke="currentColor"
                  stroke-width="2.4" stroke-linecap="round" />
          </svg>
        </span>
      </button>`).join("");
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
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !$("picker").hidden) closePicker();
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
