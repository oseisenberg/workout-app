(() => {
  const $ = (id) => document.getElementById(id);

  // Each icon is drawn as a silhouette of the machine itself, not a person.
  // Structural lines use currentColor; the moving/loaded part uses --accent.
  //
  // `levels` go from easier to harder. Upgrading moves to the next level and
  // is meant to feel like a milestone — bigger jump than just adding a couple
  // of pounds. The middle level is the default starting point.
  //
  // Each level has `sets`, a target minimum `reps` (no upper bound — more is
  // always fine), and a `weight` range [min, max] in pounds.
  const EXERCISES = [
    {
      id: "leg-press",
      name: "Leg Press",
      muscles: "Quads · Glutes",
      levels: [
        { sets: 2, reps: 8,  weight: [90, 135] },
        { sets: 3, reps: 10, weight: [135, 180] },
        { sets: 4, reps: 12, weight: [180, 230] },
        { sets: 5, reps: 15, weight: [230, 290] },
      ],
      icon: `
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
             stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <line x1="6" y1="56" x2="58" y2="56" />
          <polyline points="10,56 10,44 24,44" />
          <line x1="24" y1="44" x2="50" y2="18" />
          <line x1="44" y1="10" x2="56" y2="22"
                stroke="var(--accent)" stroke-width="4.5" />
        </svg>`,
    },
    {
      id: "lat-pulldown",
      name: "Lat Pulldown",
      muscles: "Lats · Biceps",
      levels: [
        { sets: 2, reps: 8,  weight: [60, 80] },
        { sets: 3, reps: 10, weight: [80, 100] },
        { sets: 4, reps: 12, weight: [100, 125] },
      ],
      icon: `
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
    },
    {
      id: "chest-press",
      name: "Chest Press",
      muscles: "Chest · Triceps",
      levels: [
        { sets: 2, reps: 8,  weight: [50, 70] },
        { sets: 3, reps: 10, weight: [70, 90] },
        { sets: 4, reps: 12, weight: [90, 115] },
        { sets: 5, reps: 15, weight: [115, 140] },
      ],
      icon: `
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
    },
    {
      id: "seated-row",
      name: "Seated Row",
      muscles: "Back · Biceps",
      levels: [
        { sets: 2, reps: 8,  weight: [60, 80] },
        { sets: 3, reps: 10, weight: [80, 100] },
        { sets: 4, reps: 12, weight: [100, 125] },
      ],
      icon: `
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
    },
    {
      id: "leg-extension",
      name: "Leg Extension",
      muscles: "Quads",
      levels: [
        { sets: 2, reps: 10, weight: [50, 70] },
        { sets: 3, reps: 12, weight: [70, 90] },
        { sets: 4, reps: 15, weight: [90, 115] },
      ],
      icon: `
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
    },
    {
      id: "leg-curl",
      name: "Leg Curl",
      muscles: "Hamstrings",
      levels: [
        { sets: 2, reps: 10, weight: [40, 60] },
        { sets: 3, reps: 12, weight: [60, 80] },
        { sets: 4, reps: 15, weight: [80, 100] },
      ],
      icon: `
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
    },
    {
      id: "cable-crossover",
      name: "Cable Crossover",
      muscles: "Chest · Shoulders",
      levels: [
        { sets: 2, reps: 10, weight: [20, 30] },
        { sets: 3, reps: 12, weight: [30, 40] },
        { sets: 4, reps: 15, weight: [40, 55] },
      ],
      icon: `
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
    },
    {
      id: "pec-deck",
      name: "Pec Deck",
      muscles: "Chest",
      levels: [
        { sets: 2, reps: 10, weight: [50, 70] },
        { sets: 3, reps: 12, weight: [70, 90] },
        { sets: 4, reps: 15, weight: [90, 115] },
      ],
      icon: `
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
    },
  ];

  const STORAGE_KEY = "workout-app:state:v2";
  const todayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${
      String(d.getDate()).padStart(2, "0")
    }`;
  };

  // Default to the middle level so there's always room to upgrade or
  // downgrade right out of the gate.
  const defaultLevel = (ex) => Math.floor((ex.levels.length - 1) / 2);

  const blankState = () => ({
    levels: Object.fromEntries(EXERCISES.map((ex) => [ex.id, defaultLevel(ex)])),
    completed: {}, // { [date]: { [exId]: { sets, reps, level } } }
  });

  let state;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    state = raw ? { ...blankState(), ...JSON.parse(raw) } : blankState();
    // Backfill any new exercises added after first load.
    for (const ex of EXERCISES) {
      if (state.levels[ex.id] == null) state.levels[ex.id] = defaultLevel(ex);
    }
  } catch {
    state = blankState();
  }

  const saveState = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Quota or private mode — fail quietly.
    }
  };

  const exerciseById = (id) => EXERCISES.find((ex) => ex.id === id);
  const currentLevel = (ex) => ex.levels[state.levels[ex.id]];
  const todaysCompletion = (exId) => (state.completed[todayKey()] || {})[exId];
  const fmtWeight = (w) => `${w[0]}–${w[1]}`;

  const markComplete = (exId) => {
    const day = todayKey();
    if (!state.completed[day]) state.completed[day] = {};
    // Completion is binary; we only record the level the user was on so the
    // history reflects what range they hit.
    state.completed[day][exId] = { level: state.levels[exId] };
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
    const next = state.levels[exId] + delta;
    if (next < 0 || next >= ex.levels.length) return;
    state.levels[exId] = next;
    // If today is already marked done, anchor it to the new level so
    // history matches what the user actually trained at.
    const today = state.completed[todayKey()];
    if (today && today[exId]) today[exId].level = next;
    saveState();
    renderExercises();
    if (delta > 0) flashUpgrade(exId);
  };

  // Brief celebration when leveling up — small but noticeable.
  const flashUpgrade = (exId) => {
    const row = document.querySelector(`.exercise-row[data-id="${exId}"]`);
    if (!row) return;
    row.classList.remove("exercise-row--upgraded");
    // Force reflow so the animation restarts on repeat upgrades.
    void row.offsetWidth;
    row.classList.add("exercise-row--upgraded");
  };

  const closeAllMenus = (except) => {
    document.querySelectorAll(".exercise-row.is-open").forEach((row) => {
      if (row !== except) row.classList.remove("is-open");
    });
  };

  const renderExercises = () => {
    const grid = $("exercise-grid");
    if (!grid) return;
    grid.innerHTML = EXERCISES.map((ex) => {
      const lvl = currentLevel(ex);
      const lvlIdx = state.levels[ex.id];
      const done = todaysCompletion(ex.id);
      const canDown = lvlIdx > 0;
      const canUp = lvlIdx < ex.levels.length - 1;
      return `
      <div class="exercise-row${done ? " is-done" : ""}" data-id="${ex.id}">
        <button type="button" class="exercise-row__main"
                data-action="open-details">
          <span class="exercise-row__icon">${ex.icon}</span>
          <span class="exercise-row__title">
            <span class="exercise-row__name">${ex.name}</span>
            <span class="exercise-row__meta">
              <span class="lvl-pill">Lvl ${lvlIdx + 1}</span>
              <span class="exercise-row__target">${lvl.sets} × ${lvl.reps}+</span>
            </span>
          </span>
          <span class="exercise-row__weight">
            <span class="exercise-row__weight-value">${fmtWeight(lvl.weight)}</span>
            <span class="exercise-row__weight-unit">lb</span>
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
                  aria-label="Change level for ${ex.name}"
                  aria-expanded="false">
            <svg viewBox="0 0 12 8" aria-hidden="true">
              <path d="M1 1.5 L6 6.5 L11 1.5" fill="none"
                    stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div class="exercise-row__menu" role="region"
             aria-label="Change level for ${ex.name}">
          <div class="menu-level">
            <span class="menu-level__caption">Current level</span>
            <span class="menu-level__summary">
              Lvl ${lvlIdx + 1} of ${ex.levels.length} · ${lvl.sets}×${lvl.reps}+ · ${fmtWeight(lvl.weight)} lb
            </span>
          </div>
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
    }).join("");
  };

  renderExercises();

  // Single delegated handler for all row interactions.
  $("exercise-grid").addEventListener("click", (event) => {
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
    if (action === "upgrade") {
      changeLevel(exId, +1);
      return;
    }
    if (action === "downgrade") {
      changeLevel(exId, -1);
      return;
    }
    if (action === "open-details") {
      // Details page is a future addition; ignore for now.
      return;
    }
  });

  // Tap outside any open menu to close it.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".exercise-row")) closeAllMenus(null);
  });

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
  setNet();
  window.addEventListener("online", setNet);
  window.addEventListener("offline", setNet);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
})();
