(() => {
  const $ = (id) => document.getElementById(id);

  const WORKOUTS = [
    {
      id: "push-a",
      name: "Push Day A",
      focus: "Chest, Shoulders, Triceps",
      duration: "45 min",
      exercises: [
        "Bench Press — 4 x 6",
        "Overhead Press — 3 x 8",
        "Incline DB Press — 3 x 10",
        "Triceps Pushdown — 3 x 12",
      ],
    },
    {
      id: "pull-a",
      name: "Pull Day A",
      focus: "Back, Biceps",
      duration: "50 min",
      exercises: [
        "Deadlift — 3 x 5",
        "Pull-ups — 4 x AMRAP",
        "Barbell Row — 3 x 8",
        "Hammer Curl — 3 x 12",
      ],
    },
    {
      id: "legs-a",
      name: "Leg Day A",
      focus: "Quads, Glutes, Hamstrings",
      duration: "55 min",
      exercises: [
        "Back Squat — 4 x 6",
        "Romanian Deadlift — 3 x 8",
        "Walking Lunges — 3 x 12",
        "Calf Raise — 4 x 15",
      ],
    },
    {
      id: "conditioning",
      name: "Conditioning",
      focus: "Cardio, Core",
      duration: "30 min",
      exercises: [
        "Row Erg — 5 x 500m",
        "Plank — 3 x 60s",
        "Hanging Leg Raise — 3 x 12",
      ],
    },
  ];

  const findWorkout = (id) => WORKOUTS.find((w) => w.id === id);

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
    const rows = WORKOUTS.map(
      (w) => `
        <a class="row" href="#/workout/${escape(w.id)}">
          <div class="row-main">
            <p class="row-title">${escape(w.name)}</p>
            <p class="row-sub">${escape(w.focus)} &middot; ${escape(w.duration)}</p>
          </div>
          <span class="row-chev" aria-hidden="true">&rsaquo;</span>
        </a>`
    ).join("");

    return `
      <p class="section-label">Routines</p>
      <div class="list">${rows}</div>
    `;
  };

  const renderDetail = (id) => {
    const w = findWorkout(id);
    if (!w) {
      return `<div class="empty">Workout not found.</div>`;
    }
    const items = w.exercises
      .map((e) => `<li>${escape(e)}</li>`)
      .join("");
    return `
      <section class="detail-card">
        <h2 class="detail-title">${escape(w.name)}</h2>
        <p class="detail-meta">${escape(w.focus)}</p>
        <dl class="dl">
          <dt>Duration</dt><dd>${escape(w.duration)}</dd>
          <dt>Exercises</dt><dd>${w.exercises.length}</dd>
        </dl>
      </section>

      <section class="detail-card">
        <p class="section-label" style="margin:0 0 8px">Exercises</p>
        <ul style="margin:0; padding-left:20px; line-height:1.6;">${items}</ul>
      </section>

      <div class="actions">
        <button class="btn btn-accent" data-action="start">Start Workout</button>
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

    const detailMatch = hash.match(/^#\/workout\/([^/]+)$/);
    if (detailMatch) {
      const w = findWorkout(detailMatch[1]);
      title.textContent = w ? w.name : "Workout";
      back.hidden = false;
      view.innerHTML = renderDetail(detailMatch[1]);
      bindDetailActions(w);
      return;
    }

    title.textContent = "Workouts";
    back.hidden = true;
    view.innerHTML = renderList();
  };

  const bindDetailActions = (w) => {
    if (!w) return;
    $("view").querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        alert(`${action}: ${w.name} (not implemented)`);
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
