(() => {
  const $ = (id) => document.getElementById(id);

  const EXERCISES = [
    {
      id: "bench-press",
      name: "Bench Press",
      muscle: "Chest",
      equipment: "Barbell",
      sets: "4 x 6",
      notes: "Flat bench. Pause briefly at the chest, drive through the heels.",
    },
    {
      id: "overhead-press",
      name: "Overhead Press",
      muscle: "Shoulders",
      equipment: "Barbell",
      sets: "3 x 8",
      notes: "Standing. Keep core tight, bar travels in a straight line.",
    },
    {
      id: "deadlift",
      name: "Deadlift",
      muscle: "Posterior chain",
      equipment: "Barbell",
      sets: "3 x 5",
      notes: "Neutral spine, brace before each rep.",
    },
    {
      id: "pull-up",
      name: "Pull-up",
      muscle: "Back",
      equipment: "Bodyweight",
      sets: "4 x AMRAP",
      notes: "Full hang at the bottom, chin over the bar.",
    },
    {
      id: "back-squat",
      name: "Back Squat",
      muscle: "Quads, Glutes",
      equipment: "Barbell",
      sets: "4 x 6",
      notes: "High-bar. Knees track over toes, depth at or below parallel.",
    },
    {
      id: "romanian-deadlift",
      name: "Romanian Deadlift",
      muscle: "Hamstrings, Glutes",
      equipment: "Barbell",
      sets: "3 x 8",
      notes: "Soft knees, hinge at the hips, feel the stretch.",
    },
    {
      id: "row",
      name: "Barbell Row",
      muscle: "Back",
      equipment: "Barbell",
      sets: "3 x 8",
      notes: "Torso ~45°. Pull to the lower ribcage.",
    },
    {
      id: "plank",
      name: "Plank",
      muscle: "Core",
      equipment: "Bodyweight",
      sets: "3 x 60s",
      notes: "Straight line from head to heels, glutes engaged.",
    },
  ];

  const findExercise = (id) => EXERCISES.find((e) => e.id === id);

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

  const renderList = () => {
    const rows = EXERCISES.map(
      (e) => `
        <a class="row" href="#/exercise/${escape(e.id)}">
          <div class="row-main">
            <p class="row-title">${escape(e.name)}</p>
            <p class="row-sub">${escape(e.muscle)} &middot; ${escape(e.sets)}</p>
          </div>
          <span class="row-chev" aria-hidden="true">&rsaquo;</span>
        </a>`
    ).join("");

    return `
      <p class="section-label">Exercises</p>
      <div class="list">${rows}</div>
    `;
  };

  const renderDetail = (id) => {
    const e = findExercise(id);
    if (!e) {
      return `<div class="empty">Exercise not found.</div>`;
    }
    return `
      <section class="detail-card">
        <h2 class="detail-title">${escape(e.name)}</h2>
        <p class="detail-meta">${escape(e.muscle)}</p>
        <dl class="dl">
          <dt>Equipment</dt><dd>${escape(e.equipment)}</dd>
          <dt>Default sets</dt><dd>${escape(e.sets)}</dd>
        </dl>
      </section>

      <section class="detail-card">
        <p class="section-label" style="margin:0 0 8px">Notes</p>
        <p style="margin:0; line-height:1.5; color:var(--text);">${escape(e.notes)}</p>
      </section>

      <div class="actions">
        <button class="btn btn-accent" data-action="log">Log a Set</button>
        <button class="btn" data-action="edit">Edit</button>
        <button class="btn" data-action="history">View History</button>
        <button class="btn btn-danger" data-action="delete">Delete</button>
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
      const e = findExercise(detailMatch[1]);
      title.textContent = e ? e.name : "Exercise";
      back.hidden = false;
      view.innerHTML = renderDetail(detailMatch[1]);
      bindDetailActions(e);
      return;
    }

    title.textContent = "Exercises";
    back.hidden = true;
    view.innerHTML = renderList();
  };

  const bindDetailActions = (e) => {
    if (!e) return;
    $("view").querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        alert(`${action}: ${e.name} (not implemented)`);
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
