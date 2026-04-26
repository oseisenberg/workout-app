(() => {
  const $ = (id) => document.getElementById(id);

  const EXERCISES = [
    {
      id: "bench-press",
      name: "Bench Press",
      muscle: "Chest",
      equipment: "Barbell",
      repMin: 6, repMax: 10,
      weightMin: 135, weightMax: 185,
      unit: "lb", weightStep: 5,
      notes: "Flat bench. Pause briefly at the chest, drive through the heels.",
    },
    {
      id: "overhead-press",
      name: "Overhead Press",
      muscle: "Shoulders",
      equipment: "Barbell",
      repMin: 6, repMax: 10,
      weightMin: 75, weightMax: 115,
      unit: "lb", weightStep: 5,
      notes: "Standing. Keep core tight, bar travels in a straight line.",
    },
    {
      id: "deadlift",
      name: "Deadlift",
      muscle: "Posterior chain",
      equipment: "Barbell",
      repMin: 3, repMax: 6,
      weightMin: 225, weightMax: 315,
      unit: "lb", weightStep: 10,
      notes: "Neutral spine, brace before each rep.",
    },
    {
      id: "pull-up",
      name: "Pull-up",
      muscle: "Back",
      equipment: "Bodyweight + load",
      repMin: 5, repMax: 10,
      weightMin: 0, weightMax: 45,
      unit: "lb added", weightStep: 5,
      notes: "Full hang at the bottom, chin over the bar.",
    },
    {
      id: "back-squat",
      name: "Back Squat",
      muscle: "Quads, Glutes",
      equipment: "Barbell",
      repMin: 6, repMax: 10,
      weightMin: 185, weightMax: 245,
      unit: "lb", weightStep: 10,
      notes: "High-bar. Knees track over toes, depth at or below parallel.",
    },
    {
      id: "romanian-deadlift",
      name: "Romanian Deadlift",
      muscle: "Hamstrings, Glutes",
      equipment: "Barbell",
      repMin: 8, repMax: 12,
      weightMin: 135, weightMax: 185,
      unit: "lb", weightStep: 5,
      notes: "Soft knees, hinge at the hips, feel the stretch.",
    },
    {
      id: "barbell-row",
      name: "Barbell Row",
      muscle: "Back",
      equipment: "Barbell",
      repMin: 6, repMax: 10,
      weightMin: 115, weightMax: 155,
      unit: "lb", weightStep: 5,
      notes: "Torso ~45°. Pull to the lower ribcage.",
    },
    {
      id: "incline-db-press",
      name: "Incline DB Press",
      muscle: "Upper chest",
      equipment: "Dumbbell",
      repMin: 8, repMax: 12,
      weightMin: 40, weightMax: 60,
      unit: "lb each", weightStep: 5,
      notes: "30–45° incline. Press the dumbbells together at the top.",
    },
  ];

  const findExercise = (id) => EXERCISES.find((e) => e.id === id);

  const STORAGE_KEY = (id) => `workout-app:sets:${id}`;
  const RANGE_KEY = (id) => `workout-app:range:${id}`;

  const loadSets = (id) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY(id));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveSets = (id, sets) => {
    localStorage.setItem(STORAGE_KEY(id), JSON.stringify(sets));
  };

  const loadRangeOverride = (id) => {
    try {
      const raw = localStorage.getItem(RANGE_KEY(id));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const saveRangeOverride = (id, range) => {
    localStorage.setItem(RANGE_KEY(id), JSON.stringify(range));
  };

  const exerciseWithOverrides = (id) => {
    const base = findExercise(id);
    if (!base) return null;
    const override = loadRangeOverride(id);
    return override ? { ...base, ...override } : base;
  };

  const setNet = () => {
    const el = $("net-status");
    if (!el) return;
    const online = navigator.onLine;
    el.textContent = online ? "online" : "offline";
    el.classList.toggle("online", online);
    el.classList.toggle("offline", !online);
  };
  setNet();
  window.addEventListener("online", setNet);
  window.addEventListener("offline", setNet);

  const escape = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  const fmtTime = (ts) => {
    const d = new Date(ts);
    const today = new Date();
    const sameDay =
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate();
    const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (sameDay) return `Today ${time}`;
    return `${d.toLocaleDateString([], { month: "short", day: "numeric" })} ${time}`;
  };

  // "Ready to bump up" if the most recent set hit both ceilings AND the
  // previous one did too. Conservative on purpose.
  const readyToBump = (sets, e) => {
    if (sets.length < 2) return false;
    const recent = sets.slice(-2);
    return recent.every(
      (s) => s.reps >= e.repMax && s.weight >= e.weightMax
    );
  };

  const renderList = () => {
    const rows = EXERCISES.map((base) => {
      const e = exerciseWithOverrides(base.id);
      const range = `${e.repMin}–${e.repMax} reps @ ${e.weightMin}–${e.weightMax} ${e.unit}`;
      return `
        <a class="row" href="#/exercise/${escape(e.id)}">
          <div class="row-main">
            <p class="row-title">${escape(e.name)}</p>
            <p class="row-sub">${escape(e.muscle)} &middot; ${escape(range)}</p>
          </div>
          <span class="row-chev" aria-hidden="true">&rsaquo;</span>
        </a>`;
    }).join("");

    return `
      <p class="section-label">Exercises</p>
      <div class="list">${rows}</div>
    `;
  };

  const renderRecentSets = (sets, e) => {
    if (!sets.length) {
      return `<p class="muted-line">No sets logged yet.</p>`;
    }
    const items = sets
      .slice()
      .reverse()
      .slice(0, 8)
      .map((s) => {
        const repsTop = s.reps >= e.repMax;
        const weightTop = s.weight >= e.weightMax;
        const cls = repsTop && weightTop ? "set-line set-line--top" : "set-line";
        return `
          <li class="${cls}">
            <span class="set-line-main">${escape(s.reps)} reps &middot; ${escape(s.weight)} ${escape(e.unit)}</span>
            <span class="set-line-time">${escape(fmtTime(s.ts))}</span>
          </li>`;
      })
      .join("");
    return `<ul class="set-list">${items}</ul>`;
  };

  const renderDetail = (id) => {
    const e = exerciseWithOverrides(id);
    if (!e) {
      return `<div class="empty">Exercise not found.</div>`;
    }
    const sets = loadSets(id);
    const last = sets[sets.length - 1];
    const ready = readyToBump(sets, e);

    return `
      <section class="detail-card">
        <h2 class="detail-title">${escape(e.name)}</h2>
        <p class="detail-meta">${escape(e.muscle)} &middot; ${escape(e.equipment)}</p>
        <div class="ranges">
          <div class="range">
            <p class="range-label">Reps</p>
            <p class="range-value">${e.repMin}<span class="range-dash">–</span>${e.repMax}</p>
          </div>
          <div class="range">
            <p class="range-label">Weight</p>
            <p class="range-value">${e.weightMin}<span class="range-dash">–</span>${e.weightMax}<span class="range-unit"> ${escape(e.unit)}</span></p>
          </div>
        </div>
      </section>

      ${ready ? `
        <section class="detail-card hint-card">
          <p class="hint-title">Ready to bump up</p>
          <p class="hint-body">Recent sets are at the top of both ranges. Try
            <strong>${e.repMin + 1}–${e.repMax + 1}</strong> reps and
            <strong>${e.weightMin + e.weightStep}–${e.weightMax + e.weightStep} ${escape(e.unit)}</strong>.</p>
          <button class="btn btn-accent" data-action="bump">Upgrade Range</button>
        </section>` : ""}

      <section class="detail-card">
        <p class="section-label" style="margin:0 0 10px">Log a set</p>
        <form id="log-form" class="log-form" autocomplete="off">
          <label class="field">
            <span class="field-label">Reps</span>
            <input class="field-input" type="number" inputmode="numeric"
                   name="reps" min="0" step="1" required
                   placeholder="${e.repMin}–${e.repMax}"
                   value="${last ? escape(last.reps) : ""}" />
          </label>
          <label class="field">
            <span class="field-label">Weight (${escape(e.unit)})</span>
            <input class="field-input" type="number" inputmode="decimal"
                   name="weight" min="0" step="${e.weightStep}" required
                   placeholder="${e.weightMin}–${e.weightMax}"
                   value="${last ? escape(last.weight) : ""}" />
          </label>
          <button type="submit" class="btn btn-accent">Log Set</button>
        </form>
      </section>

      <section class="detail-card">
        <p class="section-label" style="margin:0 0 8px">Recent sets</p>
        ${renderRecentSets(sets, e)}
      </section>

      <section class="detail-card">
        <p class="section-label" style="margin:0 0 8px">Notes</p>
        <p style="margin:0; line-height:1.5; color:var(--text);">${escape(e.notes)}</p>
      </section>

      <div class="actions">
        <button class="btn" data-action="edit-range">Edit Range</button>
        <button class="btn btn-danger" data-action="clear">Clear History</button>
      </div>
    `;
  };

  const route = () => {
    const view = $("view");
    const title = $("page-title");
    const back = $("back-btn");
    const hash = location.hash || "#/";

    const detailMatch = hash.match(/^#\/exercise\/([^/]+)$/);
    if (detailMatch) {
      const id = detailMatch[1];
      const e = exerciseWithOverrides(id);
      title.textContent = e ? e.name : "Exercise";
      back.hidden = false;
      view.innerHTML = renderDetail(id);
      bindDetail(id);
      return;
    }

    title.textContent = "Exercises";
    back.hidden = true;
    view.innerHTML = renderList();
  };

  const bindDetail = (id) => {
    const e = exerciseWithOverrides(id);
    if (!e) return;

    const form = $("log-form");
    if (form) {
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const data = new FormData(form);
        const reps = Number(data.get("reps"));
        const weight = Number(data.get("weight"));
        if (!Number.isFinite(reps) || reps <= 0) return;
        if (!Number.isFinite(weight) || weight < 0) return;
        const sets = loadSets(id);
        sets.push({ ts: Date.now(), reps, weight });
        saveSets(id, sets);
        route();
      });
    }

    $("view").querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        if (action === "bump") {
          saveRangeOverride(id, {
            repMin: e.repMin + 1,
            repMax: e.repMax + 1,
            weightMin: e.weightMin + e.weightStep,
            weightMax: e.weightMax + e.weightStep,
          });
          route();
        } else if (action === "clear") {
          if (confirm(`Clear all logged sets for ${e.name}?`)) {
            localStorage.removeItem(STORAGE_KEY(id));
            route();
          }
        } else if (action === "edit-range") {
          const repMin = Number(prompt("Min reps", e.repMin));
          const repMax = Number(prompt("Max reps", e.repMax));
          const weightMin = Number(prompt(`Min weight (${e.unit})`, e.weightMin));
          const weightMax = Number(prompt(`Max weight (${e.unit})`, e.weightMax));
          if (
            [repMin, repMax, weightMin, weightMax].every(Number.isFinite) &&
            repMin > 0 && repMax >= repMin && weightMin >= 0 && weightMax >= weightMin
          ) {
            saveRangeOverride(id, { repMin, repMax, weightMin, weightMax });
            route();
          }
        }
      });
    });
  };

  $("back-btn").addEventListener("click", () => {
    if (history.length > 1) history.back();
    else location.hash = "#/";
  });

  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
})();
