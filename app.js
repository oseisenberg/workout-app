(() => {
  const $ = (id) => document.getElementById(id);

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
