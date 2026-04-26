(() => {
  const view = document.getElementById("view");
  const titleEl = document.getElementById("app-title");
  const backBtn = document.getElementById("back");

  const byId = Object.fromEntries(window.EXERCISES.map((e) => [e.id, e]));

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));

  function renderList() {
    titleEl.textContent = "Workout";
    backBtn.hidden = true;

    const rows = window.EXERCISES.map((e) => `
      <a class="row" href="#/exercise/${encodeURIComponent(e.id)}">
        <div class="row-main">
          <div class="row-name">${esc(e.name)}</div>
          <div class="row-summary">${esc(e.summary)}</div>
        </div>
        <span class="row-chevron" aria-hidden="true">›</span>
      </a>
    `).join("");

    view.innerHTML = `<div class="list">${rows}</div>`;
    window.scrollTo(0, 0);
  }

  function renderDetail(id) {
    const ex = byId[id];
    if (!ex) {
      titleEl.textContent = "Not found";
      backBtn.hidden = false;
      view.innerHTML = `<div class="detail"><p class="muted">No exercise with id "${esc(id)}".</p></div>`;
      return;
    }
    titleEl.textContent = ex.name;
    backBtn.hidden = false;

    view.innerHTML = `
      <article class="detail">
        <p class="muted">${esc(ex.summary)}</p>
        <p class="detail-body">${esc(ex.description)}</p>
      </article>
    `;
    window.scrollTo(0, 0);
  }

  function route() {
    const m = location.hash.match(/^#\/exercise\/(.+)$/);
    if (m) renderDetail(decodeURIComponent(m[1]));
    else renderList();
  }

  backBtn.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else location.hash = "";
  });

  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
})();
