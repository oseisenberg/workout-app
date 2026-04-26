(() => {
  const $ = (id) => document.getElementById(id);

  // Each icon is drawn as a silhouette of the machine itself, not a person.
  // Structural lines use currentColor; the moving/loaded part uses --accent.
  const EXERCISES = [
    {
      id: "leg-press",
      name: "Leg Press",
      muscles: "Quads · Glutes",
      sets: "3–4",
      reps: "8–12",
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
      sets: "3",
      reps: "8–12",
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
      sets: "3–4",
      reps: "8–12",
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
      sets: "3",
      reps: "8–12",
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
      sets: "3",
      reps: "10–15",
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
      sets: "3",
      reps: "10–15",
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
      sets: "3",
      reps: "12–15",
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
      sets: "3",
      reps: "10–12",
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

  const renderExercises = () => {
    const grid = $("exercise-grid");
    if (!grid) return;
    grid.innerHTML = EXERCISES.map((ex) => `
      <button type="button" class="exercise-row" data-id="${ex.id}">
        <span class="exercise-row__icon">${ex.icon}</span>
        <span class="exercise-row__title">
          <span class="exercise-row__name">${ex.name}</span>
          <span class="exercise-row__muscles">${ex.muscles}</span>
        </span>
        <span class="exercise-row__stat">
          <span class="exercise-row__stat-label">Sets</span>
          <span class="exercise-row__stat-value">${ex.sets}</span>
        </span>
        <span class="exercise-row__stat">
          <span class="exercise-row__stat-label">Reps</span>
          <span class="exercise-row__stat-value">${ex.reps}</span>
        </span>
      </button>
    `).join("");
  };
  renderExercises();

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

  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  $("diag-standalone").textContent = standalone ? "yes" : "no (in browser)";

  $("diag-display").textContent =
    window.matchMedia("(display-mode: standalone)").matches
      ? "standalone"
      : window.matchMedia("(display-mode: fullscreen)").matches
        ? "fullscreen"
        : "browser";

  $("diag-viewport").textContent =
    `${window.innerWidth}×${window.innerHeight}`;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => { $("diag-sw").textContent = "registered"; })
      .catch((err) => {
        $("diag-sw").textContent = "failed: " + err.message;
      });
  } else {
    $("diag-sw").textContent = "unsupported";
  }
})();
