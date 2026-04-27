(() => {
  const $ = (id) => document.getElementById(id);

  // === Icon registry =====================================================
  // Each icon is drawn as a silhouette of the equipment, not a person.
  // Structural lines use currentColor; the loaded part uses --accent.
  // Templates in exercises.json reference these by name.
  // All icons share: 64x64 viewBox, fill: none, stroke: currentColor for
  // structure, stroke: var(--accent) for the loaded / moving part the
  // exercise targets. Stroke widths are 3 for everything to keep the line
  // weight consistent across icons.
  const ICONS = {
    "leg-press": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <polyline points="10,56 10,42 24,42" />
        <line x1="24" y1="42" x2="46" y2="20" />
        <line x1="40" y1="14" x2="54" y2="28"
              stroke="var(--accent)" />
      </svg>`,
    "lat-pulldown": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="50" y1="56" x2="50" y2="12" />
        <line x1="50" y1="14" x2="22" y2="14" />
        <line x1="22" y1="14" x2="22" y2="22" />
        <line x1="10" y1="22" x2="34" y2="22"
              stroke="var(--accent)" />
        <polyline points="14,50 14,40 30,40" />
      </svg>`,
    "chest-press": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="14" y1="56" x2="14" y2="20" />
        <line x1="14" y1="46" x2="26" y2="46" />
        <line x1="14" y1="30" x2="46" y2="30"
              stroke="var(--accent)" />
        <line x1="46" y1="24" x2="46" y2="36"
              stroke="var(--accent)" />
      </svg>`,
    "seated-row": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <polyline points="10,46 10,32 22,32 22,46" />
        <line x1="56" y1="40" x2="36" y2="34"
              stroke="var(--accent)" />
        <line x1="32" y1="30" x2="36" y2="38"
              stroke="var(--accent)" />
      </svg>`,
    "leg-extension": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="10" y1="56" x2="10" y2="22" />
        <line x1="10" y1="38" x2="28" y2="38" />
        <line x1="28" y1="38" x2="50" y2="22"
              stroke="var(--accent)" />
        <circle cx="50" cy="22" r="4"
                stroke="var(--accent)" />
      </svg>`,
    "leg-curl": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="8" y1="38" x2="42" y2="38" />
        <line x1="14" y1="38" x2="14" y2="50" />
        <line x1="36" y1="38" x2="36" y2="50" />
        <line x1="42" y1="38" x2="50" y2="20"
              stroke="var(--accent)" />
        <circle cx="50" cy="20" r="4"
                stroke="var(--accent)" />
      </svg>`,
    "cable-crossover": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="12" y1="56" x2="12" y2="14" />
        <line x1="52" y1="56" x2="52" y2="14" />
        <line x1="12" y1="14" x2="52" y2="14" />
        <line x1="14" y1="18" x2="42" y2="42"
              stroke="var(--accent)" />
        <line x1="50" y1="18" x2="22" y2="42"
              stroke="var(--accent)" />
      </svg>`,
    "pec-deck": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="32" y1="56" x2="32" y2="20" />
        <line x1="22" y1="44" x2="42" y2="44" />
        <line x1="32" y1="20" x2="14" y2="36"
              stroke="var(--accent)" />
        <line x1="32" y1="20" x2="50" y2="36"
              stroke="var(--accent)" />
      </svg>`,
    "barbell": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="32" x2="58" y2="32" />
        <rect x="10" y="22" width="6" height="20" rx="1.5"
              stroke="var(--accent)" />
        <rect x="20" y="26" width="4" height="12" rx="1"
              stroke="var(--accent)" />
        <rect x="40" y="26" width="4" height="12" rx="1"
              stroke="var(--accent)" />
        <rect x="48" y="22" width="6" height="20" rx="1.5"
              stroke="var(--accent)" />
      </svg>`,
    "cable": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <line x1="32" y1="10" x2="32" y2="32" />
        <circle cx="32" cy="10" r="3" />
        <line x1="32" y1="32" x2="32" y2="40"
              stroke="var(--accent)" />
        <line x1="22" y1="40" x2="42" y2="40"
              stroke="var(--accent)" />
      </svg>`,
    "dumbbell": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="22" y1="32" x2="42" y2="32" />
        <rect x="14" y="22" width="8" height="20" rx="1.5"
              stroke="var(--accent)" />
        <rect x="42" y="22" width="8" height="20" rx="1.5"
              stroke="var(--accent)" />
      </svg>`,
    "pushup": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="58" x2="58" y2="58" />
        <line x1="16" y1="36" x2="52" y2="36" />
        <circle cx="13" cy="36" r="4" />
        <polyline points="20,36 24,50 32,50"
                  stroke="var(--accent)" />
        <polyline points="44,36 48,50 56,50"
                  stroke="var(--accent)" />
      </svg>`,
    "pullup": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="14" x2="58" y2="14" />
        <line x1="10" y1="6" x2="10" y2="14" />
        <line x1="54" y1="6" x2="54" y2="14" />
        <line x1="22" y1="14" x2="22" y2="28"
              stroke="var(--accent)" />
        <line x1="42" y1="14" x2="42" y2="28"
              stroke="var(--accent)" />
        <circle cx="32" cy="26" r="4" />
        <line x1="32" y1="30" x2="32" y2="46" />
        <line x1="32" y1="46" x2="26" y2="56" />
        <line x1="32" y1="46" x2="38" y2="56" />
      </svg>`,
    "situp": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <polyline points="12,56 24,38 38,38" />
        <line x1="38" y1="38" x2="44" y2="26"
              stroke="var(--accent)" />
        <circle cx="46" cy="22" r="4"
                stroke="var(--accent)" />
      </svg>`,
    "lunge": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="58" x2="58" y2="58" />
        <circle cx="32" cy="14" r="4" />
        <line x1="32" y1="18" x2="32" y2="36" />
        <polyline points="32,36 44,48 44,58"
                  stroke="var(--accent)" />
        <line x1="32" y1="36" x2="16" y2="58"
              stroke="var(--accent)" />
      </svg>`,
    "running": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="58" x2="58" y2="58" />
        <circle cx="40" cy="14" r="4" />
        <polyline points="40,18 32,28 38,38 30,52" />
        <line x1="32" y1="28" x2="22" y2="32"
              stroke="var(--accent)" />
        <line x1="38" y1="38" x2="50" y2="34"
              stroke="var(--accent)" />
        <line x1="30" y1="52" x2="22" y2="58"
              stroke="var(--accent)" />
      </svg>`,
    "cycling": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <circle cx="16" cy="46" r="10" stroke="var(--accent)" />
        <circle cx="48" cy="46" r="10" stroke="var(--accent)" />
        <polyline points="16,46 28,28 40,28 48,46" />
        <line x1="28" y1="28" x2="36" y2="14" />
        <circle cx="38" cy="12" r="3" />
      </svg>`,
    "rowing": `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <line x1="6" y1="56" x2="58" y2="56" />
        <circle cx="40" cy="20" r="4" />
        <polyline points="40,24 32,34 18,40" />
        <line x1="32" y1="34" x2="48" y2="44"
              stroke="var(--accent)" />
        <line x1="10" y1="38" x2="50" y2="46"
              stroke="var(--accent)" />
      </svg>`,
  };

  // Purpose icons sit beside the level pill on a row when an exercise's
  // primary adaptation isn't muscle hypertrophy — a small visual cue to
  // remember "don't grind for max weight here". Default purpose "muscle"
  // renders no icon at all.
  const PURPOSE_ICONS = {
    tendon: `<svg class="purpose-icon" viewBox="0 0 16 16"
                  role="img" aria-label="Tendon focus">
      <title>Tendon / connective tissue — slow and controlled</title>
      <circle cx="5.5" cy="8" r="3" fill="none"
              stroke="currentColor" stroke-width="1.6" />
      <circle cx="10.5" cy="8" r="3" fill="none"
              stroke="currentColor" stroke-width="1.6" />
    </svg>`,
    mobility: `<svg class="purpose-icon" viewBox="0 0 16 16"
                    role="img" aria-label="Mobility focus">
      <title>Mobility / range of motion</title>
      <path d="M 3 10 Q 8 2 13 10" fill="none" stroke="currentColor"
            stroke-width="1.6" stroke-linecap="round" />
      <path d="M 11 8 L 13 10 L 11 12" fill="none" stroke="currentColor"
            stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
    cardio: `<svg class="purpose-icon" viewBox="0 0 16 16"
                  role="img" aria-label="Cardio focus">
      <title>Cardio — duration and intensity, not load</title>
      <path d="M 8 13 C 2 9 2.5 4 5 4 C 6.5 4 7.5 5 8 6 C 8.5 5 9.5 4 11 4
               C 13.5 4 14 9 8 13 Z"
            fill="none" stroke="currentColor" stroke-width="1.4"
            stroke-linejoin="round" />
    </svg>`,
    skill: `<svg class="purpose-icon" viewBox="0 0 16 16"
                 role="img" aria-label="Skill focus">
      <title>Skill / technique — form first, load second</title>
      <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor"
              stroke-width="1.4" />
      <circle cx="8" cy="8" r="1.8" fill="currentColor" />
    </svg>`,
    balance: `<svg class="purpose-icon" viewBox="0 0 16 16"
                   role="img" aria-label="Balance focus">
      <title>Balance / proprioception</title>
      <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor"
            stroke-width="1.4" stroke-linecap="round" />
      <line x1="3" y1="6" x2="13" y2="6" stroke="currentColor"
            stroke-width="1.4" stroke-linecap="round" />
      <circle cx="8" cy="3" r="1.4" fill="currentColor" />
    </svg>`,
  };

  // === Catalog ===========================================================
  // Each exercise belongs to a category, which determines the **default**
  // tracked metric. The user can override the tracked metric per exercise
  // (via Customize) so long as the new metric is in the category's allowed
  // list and the template carries the corresponding *Start/*Step fields.
  // Switching metric on an exercise re-derives its tier ladder; history
  // entries carry their own `metric` so old entries don't get re-painted
  // against a different ruler — they simply hide from the chart until you
  // switch back to that metric.
  const CATEGORY_INFO = {
    strength:   { default: "weight",   allowed: ["weight"] },
    bodyweight: { default: "reps",     allowed: ["reps"] },
    cardio:     { default: "distance", allowed: ["distance", "duration"] },
  };
  const METRIC_INFO = {
    weight:   { unit: "lb",  start: "weightStart",   step: "weightStep" },
    reps:     { unit: "reps", start: "repsStart",     step: "repsStep" },
    distance: { unit: "km",   start: "distanceStart", step: "distanceStep" },
    duration: { unit: "min",  start: "durationStart", step: "durationStep" },
  };
  // Category default; falls back to legacy "bodyweight" flag for templates
  // that haven't been retrofitted with a category field.
  const templateCategory = (t) =>
    t.category || (t.bodyweight ? "bodyweight" : "strength");
  const templateMetric = (t) => {
    const cat = templateCategory(t);
    const info = CATEGORY_INFO[cat];
    const want = t.metric || info.default;
    if (info.allowed.includes(want) && t[METRIC_INFO[want].start] != null) {
      return want;
    }
    return info.default;
  };

  // Builds the full tier ladder for a template under a chosen metric. Each
  // upgrade fills one pip; once all pips for a level are full, the next
  // upgrade rolls into the next level. Lvl 0 is a binary "I tried it but
  // couldn't do the full thing" sentinel — no prescription, completion is
  // just a checkmark.
  const buildLevels = (t, metric) => {
    const cat = templateCategory(t);
    const pipsPerLevel = t.pipsPerLevel || 2;
    const tiersPerLevel = pipsPerLevel + 1;
    const totalPrescriptive = (t.levels || 0) * tiersPerLevel;
    const info = METRIC_INFO[metric];
    const startVal = t[info.start];
    const stepVal = t[info.step];
    const unit = info.unit;
    const isBw = cat === "bodyweight";
    // Reps suggestion only applies when the tracked metric isn't reps and
    // the template carries one (strength exercises do, cardio doesn't).
    const suggestReps = metric !== "reps" && t.reps;
    const suggestSets = metric !== "duration" && t.sets;
    const out = [{
      metric, unit,
      value: null,
      sets: 0, reps: 0,
      bodyweight: isBw,
      category: cat,
      level: 0, pip: 0, pipsPerLevel: 0,
    }];
    for (let i = 0; i < totalPrescriptive; i++) {
      const lo = i === 0 ? 0 : startVal + (i - 1) * stepVal;
      const hi = i === 0 ? startVal : startVal + i * stepVal;
      out.push({
        metric, unit,
        value: [lo, hi],
        sets: suggestSets ? t.sets : null,
        reps: suggestReps ? t.reps : null,
        bodyweight: isBw,
        category: cat,
        level: Math.floor(i / tiersPerLevel) + 1,
        pip: i % tiersPerLevel,
        pipsPerLevel,
      });
    }
    return out;
  };

  const templateToExercise = (t) => {
    const cat = templateCategory(t);
    const metric = templateMetric(t);
    return {
      id: t.id,
      name: t.name,
      muscles: t.muscles,
      icon: ICONS[t.icon] || ICONS.barbell,
      levels: buildLevels(t, metric),
      category: cat,
      metric,
      allowedMetrics: CATEGORY_INFO[cat].allowed.filter(
        (m) => t[METRIC_INFO[m].start] != null),
      snoozeDays: t.snoozeDays != null ? t.snoozeDays : 1,
      common: !!t.common,
      description: t.description || "",
      mistakes: Array.isArray(t.mistakes) ? t.mistakes : [],
      // "muscle" (default, no icon shown) | "tendon" | "mobility"
      // | "cardio" | "skill" | "balance"
      purpose: t.purpose || "muscle",
    };
  };

  // Raw exercises.json templates and the in-memory catalog derived from
  // them. Customizations stored on state get merged into the templates
  // before templateToExercise runs, so every consumer of CATALOG (render,
  // analysis, etc.) sees the user's tweaked values.
  let TEMPLATES = [];
  let CATALOG = [];

  // Fields the user is allowed to override per exercise. pipsPerLevel and
  // levels are deliberately NOT here — letting the user touch them would
  // re-shape the leveling system, which we want kept stable. `metric`
  // selects which tracked metric the tier ladder is built from (within
  // the category's allowed list).
  const CUSTOMIZABLE_FIELDS = [
    "weightStart", "weightStep", "repsStart", "repsStep",
    "distanceStart", "distanceStep", "durationStart", "durationStep",
    "sets", "reps", "snoozeDays", "metric",
  ];

  const mergeCustomization = (t) => {
    const overrides = (state.customizations && state.customizations[t.id]) || {};
    const out = { ...t };
    for (const f of CUSTOMIZABLE_FIELDS) {
      if (overrides[f] != null) out[f] = overrides[f];
    }
    return out;
  };

  const rebuildCatalog = () => {
    CATALOG = TEMPLATES.map((t) => templateToExercise(mergeCustomization(t)));
  };

  const rebuildExercise = (exId) => {
    const t = TEMPLATES.find((x) => x.id === exId);
    const idx = CATALOG.findIndex((e) => e.id === exId);
    if (!t || idx < 0) return;
    CATALOG[idx] = templateToExercise(mergeCustomization(t));
  };

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
    customizations: {},
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
  const isLevelZero = (lvl) => lvl.level === 0;
  const todaysCompletion = (exId) => (state.completed[todayKey()] || {})[exId];
  // Tier ranges (weight, distance, duration) are stored as [lo, hi] arrays.
  // Suggested-rep targets on weighted exercises are a single number that's
  // treated as a minimum target (rendered with a "+" suffix).
  const fmtRange = (r) =>
    r[0] === r[1] ? `${r[0]}` : `${r[0]}–${r[1]}`;
  const fmtReps = (r) =>
    Array.isArray(r) ? fmtRange(r) : `${r}+`;
  const fmtTierValue = (lvl) =>
    lvl.value == null ? null : fmtRange(lvl.value);
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

  // Range-clamp values so the user can't break the level system with junk
  // input — e.g., a 0 or negative weightStep would collapse the whole
  // ladder. Returns null if the value should be ignored.
  const sanitizeCustomization = (field, raw) => {
    if (field === "metric") {
      const v = String(raw || "");
      return Object.prototype.hasOwnProperty.call(METRIC_INFO, v) ? v : null;
    }
    const n = Number(raw);
    if (!Number.isFinite(n)) return null;
    if (field === "weightStart") return Math.max(0, Math.round(n));
    if (field === "repsStart") return Math.max(0, Math.round(n));
    if (field === "distanceStart") return Math.max(0, Math.round(n));
    if (field === "durationStart") return Math.max(0, Math.round(n));
    if (field === "weightStep") return Math.max(1, Math.round(n));
    if (field === "repsStep") return Math.max(1, Math.round(n));
    if (field === "distanceStep") return Math.max(1, Math.round(n));
    if (field === "durationStep") return Math.max(1, Math.round(n));
    if (field === "sets") return Math.max(1, Math.min(10, Math.round(n)));
    if (field === "reps") return Math.max(1, Math.min(50, Math.round(n)));
    if (field === "snoozeDays") return Math.max(0, Math.min(14, Math.round(n)));
    return null;
  };

  const setCustomization = (exId, field, raw) => {
    if (!CUSTOMIZABLE_FIELDS.includes(field)) return;
    const v = sanitizeCustomization(field, raw);
    if (v == null) return;
    if (!state.customizations) state.customizations = {};
    if (!state.customizations[exId]) state.customizations[exId] = {};
    state.customizations[exId][field] = v;
    rebuildExercise(exId);
    saveState();
    renderExercises();
  };

  const resetCustomization = (exId) => {
    if (state.customizations && state.customizations[exId]) {
      delete state.customizations[exId];
    }
    rebuildExercise(exId);
    saveState();
    renderExercises();
  };

  const deleteExerciseHistory = (exId) => {
    for (const date of Object.keys(state.completed)) {
      const day = state.completed[date];
      if (!day || !day[exId]) continue;
      delete day[exId];
      if (Object.keys(day).length === 0) delete state.completed[date];
    }
    saveState();
    renderExercises();
  };

  const unarchiveExercise = (id) => {
    if (!state.archivedIds.includes(id)) return;
    state.archivedIds = state.archivedIds.filter((x) => x !== id);
    if (!state.addedIds.includes(id)) state.addedIds.push(id);
    saveState();
    renderExercises();
    renderPicker();
  };

  // kind is one of "full" (default), "partial", or "skipped". Skipped means
  // "I'm marking today done so it stops bugging me, but I didn't actually
  // do it" — the entry still counts for snooze logic but is excluded from
  // streaks, muscle activity, and the progression chart.
  const markComplete = (exId, kind) => {
    const ex = exerciseById(exId);
    if (!ex) return;
    const lvl = currentLevel(ex);
    const day = todayKey();
    if (!state.completed[day]) state.completed[day] = {};
    // At Lvl 0 there's no partial — it's just done or not.
    const finalKind = isLevelZero(lvl) && kind === "partial"
      ? "full"
      : kind || "full";
    state.completed[day][exId] = {
      level: state.levels[exId],
      kind: finalKind,
      metric: ex.metric,
    };
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
  const animateThenComplete = (exId, kind) => {
    const wasDone = !!todaysCompletion(exId);
    const apply = () => {
      markComplete(exId, kind);
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

  // Reorder mode for the Available card. When on, action buttons swap for
  // up/down arrows; reordering happens in state.addedIds and skips
  // snoozed items so the user only swaps adjacent visible rows.
  let editingOrder = false;

  const setEditingOrder = (on) => {
    editingOrder = !!on;
    const btn = $("edit-order-btn");
    if (btn) {
      btn.textContent = editingOrder ? "Done" : "Edit";
      btn.classList.toggle("card-action--active", editingOrder);
    }
    renderExercises();
  };

  const moveExerciseInAvailable = (exId, delta) => {
    const visible = state.addedIds.filter((id) => {
      const ex = exerciseById(id);
      return ex && !isSnoozed(ex);
    });
    const i = visible.indexOf(exId);
    if (i < 0) return;
    const j = i + delta;
    if (j < 0 || j >= visible.length) return;
    const a = state.addedIds.indexOf(visible[i]);
    const b = state.addedIds.indexOf(visible[j]);
    [state.addedIds[a], state.addedIds[b]] = [state.addedIds[b], state.addedIds[a]];
    saveState();
    renderExercises();
  };

  const closeAllMenus = (except) => {
    document.querySelectorAll(".exercise-row.is-open").forEach((row) => {
      if (row !== except) row.classList.remove("is-open");
    });
  };

  // === Rendering =========================================================
  const exerciseRowHtml = (ex, opts) => {
    const editing = opts && opts.editing;
      const lvl = currentLevel(ex);
      const lvlIdx = state.levels[ex.id];
      const lvlZero = isLevelZero(lvl);
      const done = todaysCompletion(ex.id);
      const canDown = lvlIdx > 0;
      const canUp = lvlIdx < ex.levels.length - 1;
      const doneKind = done ? (done.kind || "full") : null;
      const isPartial = doneKind === "partial";
      const isSkipped = doneKind === "skipped";
      const tier = tierName(lvl);
      const pipsHtml = renderPips(lvl);
      const nextTier = canUp ? tierName(ex.levels[lvlIdx + 1]) : null;
      const weightStatHtml = lvlZero
        ? `<span class="exercise-row__try" aria-label="No fixed prescription">Try it</span>`
        : `<span class="exercise-row__stat">
             <span class="exercise-row__stat-value">${fmtTierValue(lvl)}</span>
             <span class="exercise-row__stat-label">${lvl.unit}</span>
           </span>`;

      // Two completion alternates to the green check: "partial" credits the
      // day without claiming a full session, "skipped" snoozes the row
      // without counting it as work. At Lvl 0 only skip applies (Lvl 0 is
      // binary by design).
      const partialBtnHtml = lvlZero
        ? ""
        : `<button type="button" class="menu-action${
             isPartial ? " menu-action--on" : ""
           }" data-action="mark-partial">
             <span class="menu-action__icon" aria-hidden="true">
               <svg viewBox="0 0 16 16">
                 <circle cx="8" cy="8" r="6" fill="none"
                         stroke="currentColor" stroke-width="1.6" />
                 <path d="M 8 2 A 6 6 0 0 1 8 14 Z" fill="currentColor" />
               </svg>
             </span>
             <span class="menu-action__title">Partial</span>
           </button>`;
      const skipBtnHtml = `<button type="button" class="menu-action${
        isSkipped ? " menu-action--on" : ""
      }" data-action="mark-skipped">
             <span class="menu-action__icon" aria-hidden="true">
               <svg viewBox="0 0 16 16">
                 <path d="M3 8 L13 8 M9 4 L13 8 L9 12" fill="none"
                       stroke="currentColor" stroke-width="1.8"
                       stroke-linecap="round" stroke-linejoin="round" />
               </svg>
             </span>
             <span class="menu-action__title">Snooze</span>
           </button>`;
      const menuBody = lvlZero
        ? `<p class="menu-zero">
             <strong>Lvl 0</strong> is binary — just tap done when
             you've done what you can.
           </p>
           <div class="menu-row menu-row--actions">${skipBtnHtml}</div>`
        : `<div class="menu-row menu-row--actions">
             ${partialBtnHtml}${skipBtnHtml}
           </div>`;

      return `
      <div class="exercise-row${done ? " is-done" : ""}${
        isPartial ? " is-partial" : ""
      }${isSkipped ? " is-skipped" : ""}${lvlZero ? " is-zero" : ""}" data-id="${ex.id}">
        <button type="button" class="exercise-row__main"
                data-action="open-details">
          <span class="exercise-row__icon">${ex.icon}</span>
          <span class="exercise-row__title">
            <span class="exercise-row__name">${ex.name}</span>
            <span class="exercise-row__meta">
              <span class="lvl-pill${
                lvlZero ? " lvl-pill--zero" : ""
              }">${tier}${pipsHtml}</span>
              ${PURPOSE_ICONS[ex.purpose] || ""}
            </span>
          </span>
          ${weightStatHtml}
        </button>
        <div class="exercise-row__action" role="group"
             aria-label="${editing ? `Reorder ${ex.name}` : `Complete ${ex.name}`}">
          ${editing
            ? `<button type="button" class="reorder-btn"
                       data-action="move-up" aria-label="Move ${ex.name} up">
                 <svg viewBox="0 0 16 16" aria-hidden="true">
                   <path d="M4 10 L8 5 L12 10" fill="none"
                         stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round" />
                 </svg>
               </button>
               <button type="button" class="reorder-btn"
                       data-action="move-down" aria-label="Move ${ex.name} down">
                 <svg viewBox="0 0 16 16" aria-hidden="true">
                   <path d="M4 6 L8 11 L12 6" fill="none"
                         stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round" />
                 </svg>
               </button>`
            : `<button type="button" class="done-btn"
                       data-action="toggle-done"
                       aria-pressed="${done ? "true" : "false"}"
                       aria-label="${done ? "Undo completion" : "Mark complete"}">
                 <svg viewBox="0 0 16 16" aria-hidden="true">
                   ${done
                     ? `<path d="M5 3 L2 6 L5 9" fill="none" stroke="currentColor"
                                stroke-width="2.2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        <path d="M2 6 H10 A4 4 0 0 1 10 14" fill="none"
                              stroke="currentColor" stroke-width="2.2"
                              stroke-linecap="round" stroke-linejoin="round" />`
                     : `<path d="M3.5 8.5 L6.8 11.8 L12.8 4.8" fill="none"
                                stroke="currentColor" stroke-width="2.2"
                                stroke-linecap="round" stroke-linejoin="round" />`}
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
               </button>`}
        </div>
        <div class="exercise-row__menu" role="region"
             aria-label="Adjust ${ex.name}">
          ${menuBody}
          <div class="menu-row menu-row--level">
            <button type="button" class="level-btn"
                    data-action="downgrade"
                    aria-label="Downgrade ${ex.name}"
                    ${canDown ? "" : "disabled"}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 6 L8 11 L12 6" fill="none"
                      stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button type="button" class="level-btn level-btn--up"
                    data-action="upgrade"
                    aria-label="Upgrade ${ex.name}"
                    ${canUp ? "" : "disabled"}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 10 L8 5 L12 10" fill="none"
                      stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round" />
              </svg>
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

    availableGrid.innerHTML = available
      .map((ex) => exerciseRowHtml(ex, { editing: editingOrder }))
      .join("");
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
  const isCounted = (entry) =>
    entry && (entry.kind || "full") !== "skipped";

  const computeActivity = () => {
    // Skipped-only days don't count — they represent "I marked this
    // snoozed so it stops bugging me", not real work.
    const dates = Object.keys(state.completed).filter((d) => {
      const day = state.completed[d];
      if (!day) return false;
      return Object.values(day).some(isCounted);
    });
    let totalDone = 0;
    for (const d of dates) {
      for (const exId in state.completed[d]) {
        if (isCounted(state.completed[d][exId])) totalDone++;
      }
    }
    // Cumulative tier progression: for each added exercise, the
    // difference between the current tier and the earliest tier ever
    // recorded in history. Each pip fill and level-up counts equally,
    // so the number reflects how far the user has actually climbed
    // across the whole catalog. No daily-pressure streak — climbs
    // don't decay if you skip a day.
    let tiersClimbed = 0;
    for (const id of state.addedIds) {
      const hist = exerciseHistory(id);
      if (hist.length === 0) continue;
      const oldest = hist[hist.length - 1];
      const cur = state.levels[id];
      if (cur > oldest.level) tiersClimbed += cur - oldest.level;
    }
    return { workouts: dates.length, totalDone, tiersClimbed };
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
        if (!isCounted(day[exId])) continue;
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

  // Two stylized body diagrams (front + back) with muscle regions painted
  // as anatomically-shaped paths over a simple silhouette. Each path's
  // fill changes with `counts`; the border stays grey across all states
  // (see .muscle CSS). Each region carries a data-region attribute so
  // the parent click handler can surface a detail panel for it.
  const renderBodyDiagram = (counts, selected) => {
    const cls = (k) => {
      const base = muscleClass(counts[k] || 0);
      return selected === k ? `${base} muscle--selected` : base;
    };
    const c = (k) => `class="${cls(k)}" data-region="${k}"`;
    const silhouette = `
      <g class="body-outline">
        <circle cx="60" cy="22" r="14" />
        <rect x="38" y="42" width="44" height="82" rx="14" />
        <rect x="20" y="46" width="14" height="72" rx="7" />
        <rect x="86" y="46" width="14" height="72" rx="7" />
        <rect x="40" y="124" width="18" height="100" rx="8" />
        <rect x="62" y="124" width="18" height="100" rx="8" />
      </g>`;

    // Reusable per-side muscle paths. Coordinates are tuned to sit inside
    // the silhouette rectangles above.
    const front = `
      <div class="body-figure">
        <span class="body-figure__label">Front</span>
        <svg class="body" viewBox="0 0 120 232" aria-label="Front body"
             role="img">
          ${silhouette}
          <path ${c("shoulders")}
                d="M 22 48 Q 28 42 36 46 L 38 60 Q 30 62 22 58 Z" />
          <path ${c("shoulders")}
                d="M 98 48 Q 92 42 84 46 L 82 60 Q 90 62 98 58 Z" />
          <path ${c("chest")}
                d="M 41 48 Q 56 46 58 50 L 58 68 Q 50 72 42 68 Q 38 60 41 48 Z" />
          <path ${c("chest")}
                d="M 79 48 Q 64 46 62 50 L 62 68 Q 70 72 78 68 Q 82 60 79 48 Z" />
          <rect ${c("biceps")} x="22" y="62" width="11" height="22" rx="5" />
          <rect ${c("biceps")} x="87" y="62" width="11" height="22" rx="5" />
          <path ${c("core")}
                d="M 50 78 Q 60 76 70 78 L 70 116 Q 60 120 50 116 Z" />
          <path ${c("quads")}
                d="M 42 128 L 58 128 L 56 178 Q 49 184 42 178 Z" />
          <path ${c("quads")}
                d="M 78 128 L 62 128 L 64 178 Q 71 184 78 178 Z" />
          <rect ${c("calves")} x="44" y="190" width="10" height="22" rx="4" />
          <rect ${c("calves")} x="66" y="190" width="10" height="22" rx="4" />
        </svg>
      </div>`;

    const back = `
      <div class="body-figure">
        <span class="body-figure__label">Back</span>
        <svg class="body" viewBox="0 0 120 232" aria-label="Back body"
             role="img">
          ${silhouette}
          <path ${c("shoulders")}
                d="M 22 48 Q 28 42 36 46 L 38 60 Q 30 62 22 58 Z" />
          <path ${c("shoulders")}
                d="M 98 48 Q 92 42 84 46 L 82 60 Q 90 62 98 58 Z" />
          <path ${c("back")}
                d="M 50 46 Q 60 44 70 46 L 76 80 Q 60 84 44 80 Z" />
          <path ${c("lats")}
                d="M 38 64 L 56 90 L 50 104 L 38 88 Z" />
          <path ${c("lats")}
                d="M 82 64 L 64 90 L 70 104 L 82 88 Z" />
          <rect ${c("triceps")} x="22" y="62" width="11" height="22" rx="5" />
          <rect ${c("triceps")} x="87" y="62" width="11" height="22" rx="5" />
          <path ${c("glutes")}
                d="M 42 126 Q 50 124 58 128 L 58 142 Q 50 148 42 142 Z" />
          <path ${c("glutes")}
                d="M 78 126 Q 70 124 62 128 L 62 142 Q 70 148 78 142 Z" />
          <path ${c("hamstrings")}
                d="M 42 152 L 58 152 L 56 196 Q 49 200 42 196 Z" />
          <path ${c("hamstrings")}
                d="M 78 152 L 62 152 L 64 196 Q 71 200 78 196 Z" />
          <rect ${c("calves")} x="44" y="200" width="10" height="22" rx="4" />
          <rect ${c("calves")} x="66" y="200" width="10" height="22" rx="4" />
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
        if (!isCounted(day[exId])) continue;
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

  // Friendly title-case names for the region keys used in the body diagram.
  const REGION_LABELS = {
    quads: "Quads", glutes: "Glutes", hamstrings: "Hamstrings",
    lats: "Lats", biceps: "Biceps", triceps: "Triceps",
    chest: "Chest", shoulders: "Shoulders", back: "Back",
    core: "Core", calves: "Calves",
  };

  // Per-exercise tally for everything that maps to a single region within
  // a date window. Used by the muscle-detail panel below.
  const exercisesForRegionSince = (region, sinceDate) => {
    const counts = {};
    for (const date in state.completed) {
      if (sinceDate && date < sinceDate) continue;
      const day = state.completed[date];
      if (!day) continue;
      for (const exId in day) {
        if (!isCounted(day[exId])) continue;
        const ex = exerciseById(exId);
        if (!ex || !ex.muscles) continue;
        const regions = new Set();
        for (const m of ex.muscles.split("·").map((s) => s.trim())) {
          for (const r of muscleRegions(m)) regions.add(r);
        }
        if (regions.has(region)) counts[exId] = (counts[exId] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .map(([id, count]) => {
        const ex = exerciseById(id);
        return { id, name: ex ? ex.name : id, count };
      })
      .sort((a, b) => b.count - a.count);
  };

  // All-time tally for a region: most-recent date the region was worked
  // and total counted sessions ever. Powers the contextual stats above
  // the per-range exercise list in the muscle-detail panel.
  const regionLifetimeStats = (region) => {
    let lastDate = null;
    let allTime = 0;
    for (const date in state.completed) {
      const day = state.completed[date];
      if (!day) continue;
      for (const exId in day) {
        if (!isCounted(day[exId])) continue;
        const ex = exerciseById(exId);
        if (!ex || !ex.muscles) continue;
        const regions = new Set();
        for (const m of ex.muscles.split("·").map((s) => s.trim())) {
          for (const r of muscleRegions(m)) regions.add(r);
        }
        if (regions.has(region)) {
          allTime++;
          if (!lastDate || date > lastDate) lastDate = date;
        }
      }
    }
    return { lastDate, allTime };
  };

  const RANGE_OPTIONS = [
    { key: "today", label: "Today",        days: 0  },
    { key: "month", label: "Last 30 days", days: 30 },
    { key: "quarter", label: "Last 3 months", days: 90 },
  ];
  const rangeSinceDate = (key) =>
    key === "today" ? todayKey() : dateNDaysAgo(
      RANGE_OPTIONS.find((o) => o.key === key).days);
  const rangeShortLabel = (key) =>
    key === "today" ? "today" :
    key === "month" ? "the last 30 days" :
    "the last 3 months";

  let muscleRange = "today";
  let muscleSelected = null;
  const renderAnalysis = () => {
    const view = $("analysis-view");
    if (!view) return;
    const activity = computeActivity();
    const exercises = state.addedIds.map(exerciseById).filter(Boolean);
    const counts = regionCountsSince(rangeSinceDate(muscleRange));
    const hasData = Object.values(counts).some((v) => v > 0);

    const activityCard = `
      <section class="card">
        <h2>Activity</h2>
        <div class="stat-grid">
          <div class="stat">
            <span class="stat__value">${activity.workouts}</span>
            <span class="stat__label">Workout days</span>
          </div>
          <div class="stat">
            <span class="stat__value">${activity.totalDone}</span>
            <span class="stat__label">Exercises done</span>
          </div>
          <div class="stat">
            <span class="stat__value">${activity.tiersClimbed}</span>
            <span class="stat__label">Tiers climbed</span>
          </div>
        </div>
      </section>`;

    const toggleHtml = RANGE_OPTIONS.map((o) => `
      <button type="button" role="tab"
              class="muscle-toggle__btn${
                muscleRange === o.key ? " muscle-toggle__btn--active" : ""
              }"
              data-range="${o.key}">${o.label}</button>`).join("");
    const emptyMsg = muscleRange === "today"
      ? "No exercises completed today yet."
      : `Nothing in ${rangeShortLabel(muscleRange)} yet.`;
    const musclesCard = `
      <section class="card">
        <h2>Muscles worked</h2>
        <div class="muscle-toggle" role="tablist">${toggleHtml}</div>
        ${hasData
          ? renderBodyDiagram(counts, muscleSelected)
          : `<p class="empty-state">${emptyMsg}</p>`}
      </section>`;

    const empty = activity.workouts === 0 && exercises.length === 0
      ? `<p class="empty-state">
           No data yet — add an exercise from the Home tab and complete it
           to start seeing stats here.
         </p>`
      : "";

    view.innerHTML = activityCard + musclesCard + empty;
  };

  // Floating per-muscle popover. Lives in its own modal so opening it
  // doesn't push the analysis card around. Content updates whenever
  // the range toggle changes while the popover is open.
  const renderMusclePopover = () => {
    if (!muscleSelected) return;
    const label = REGION_LABELS[muscleSelected] || muscleSelected;
    const rangeLbl = rangeShortLabel(muscleRange);
    const exs = exercisesForRegionSince(
      muscleSelected, rangeSinceDate(muscleRange));
    const lifetime = regionLifetimeStats(muscleSelected);
    const rangeSessions = exs.reduce((s, e) => s + e.count, 0);
    const lastDays = lifetime.lastDate
      ? daysBetweenTodayAnd(lifetime.lastDate)
      : null;
    const lastLine = lastDays == null
      ? "Never worked yet."
      : lastDays === 0
        ? "Last worked today."
        : lastDays === 1
          ? "Last worked yesterday."
          : `Last worked ${lastDays} days ago.`;
    $("muscle-popover-title").textContent = label;
    $("muscle-popover-body").innerHTML = `
      <div class="muscle-popover__stat">
        <span class="muscle-popover__value">${rangeSessions}</span>
        <span class="muscle-popover__label">session${
          rangeSessions === 1 ? "" : "s"} in ${rangeLbl}</span>
      </div>
      <p class="muscle-popover__last">${lastLine}</p>
      ${exs.length === 0 ? "" : `
        <ul class="muscle-popover__list">
          ${exs.map((e) => `
            <li>
              <span class="muscle-popover__name">${e.name}</span>
              <span class="muscle-popover__hits">${e.count}×</span>
            </li>`).join("")}
        </ul>`}`;
  };
  const openMusclePopover = () => {
    renderMusclePopover();
    $("muscle-popover").hidden = false;
    document.body.classList.add("modal-open");
    adjustModalsForViewport();
  };
  const closeMusclePopover = () => {
    muscleSelected = null;
    $("muscle-popover").hidden = true;
    if ($("picker").hidden && $("details").hidden && $("settings").hidden) {
      document.body.classList.remove("modal-open");
    }
    renderAnalysis();
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

  // High-level muscle groups for the picker filter chips. Each maps to a
  // list of catalog muscle keywords; an exercise belongs to the group if
  // any of its parsed muscle names contains any keyword. Order here is
  // also the chip display order.
  const MUSCLE_GROUPS = [
    { key: "legs",      label: "Legs",      keys: ["quads", "glutes", "hamstrings", "calves", "posterior"] },
    { key: "chest",     label: "Chest",     keys: ["chest"] },
    { key: "back",      label: "Back",      keys: ["lats", "back", "posterior"] },
    { key: "shoulders", label: "Shoulders", keys: ["shoulders", "traps"] },
    { key: "arms",      label: "Arms",      keys: ["biceps", "triceps"] },
    { key: "core",      label: "Core",      keys: ["core"] },
    { key: "cardio",    label: "Cardio",    category: "cardio" },
  ];
  const exerciseMatchesGroup = (ex, groupKey) => {
    const group = MUSCLE_GROUPS.find((g) => g.key === groupKey);
    if (!group) return true;
    if (group.category) return ex.category === group.category;
    const muscles = (ex.muscles || "").toLowerCase();
    return group.keys.some((k) => muscles.includes(k));
  };

  let pickerQuery = "";
  let pickerShowAll = false;
  let pickerGroup = null;
  const renderPicker = () => {
    const list = $("picker-list");
    const empty = $("picker-empty");
    const filterRow = $("picker-filters");
    if (!list) return;

    // Render the filter chip row each time so the active state stays in sync.
    if (filterRow) {
      filterRow.innerHTML = `
        <button type="button" class="picker-chip${
          pickerGroup === null ? " picker-chip--active" : ""
        }" data-group="">All</button>
        ${MUSCLE_GROUPS.map((g) => `
          <button type="button" class="picker-chip${
            pickerGroup === g.key ? " picker-chip--active" : ""
          }" data-group="${g.key}">${g.label}</button>`).join("")}
      `;
    }

    const q = pickerQuery.trim().toLowerCase();
    const all = availableExercises();
    // Filters compose: search (text) + group (chip) + common-only (default).
    // Once any explicit filter is on, the common-only restriction is lifted
    // so the user actually sees what they're filtering for.
    const filtered = all.filter((ex) => {
      if (q) {
        const matchesQ = ex.name.toLowerCase().includes(q) ||
                         (ex.muscles || "").toLowerCase().includes(q);
        if (!matchesQ) return false;
      }
      if (pickerGroup && !exerciseMatchesGroup(ex, pickerGroup)) return false;
      const explicit = !!q || !!pickerGroup || pickerShowAll;
      if (!explicit && !ex.common) return false;
      return true;
    });
    const items = filtered;
    const hiddenCount = !q && !pickerGroup && !pickerShowAll
      ? all.filter((ex) => !ex.common).length
      : 0;
    if (items.length === 0 && hiddenCount === 0) {
      list.innerHTML = "";
      if (empty) {
        empty.textContent = q
          ? `No exercises match "${pickerQuery.trim()}".`
          : pickerGroup
            ? "Nothing left in this group."
            : "You've added every exercise in the catalog.";
        empty.hidden = false;
      }
      return;
    }
    if (empty) empty.hidden = true;
    const itemHtml = items.map((ex) => `
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
    const moreHtml = hiddenCount > 0
      ? `<button type="button" class="picker__more" data-action="show-more">
           Show all (${hiddenCount} more)
         </button>`
      : "";
    list.innerHTML = itemHtml + moreHtml;
  };

  const openPicker = () => {
    pickerQuery = "";
    pickerShowAll = false;
    pickerGroup = null;
    const search = $("picker-search");
    if (search) search.value = "";
    renderPicker();
    $("picker").hidden = false;
    document.body.classList.add("modal-open");
    adjustModalsForViewport();
  };
  const closePicker = () => {
    $("picker").hidden = true;
    adjustModalsForViewport();
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
      <button type="button" class="settings__option" data-action="import-data">
        <span class="settings__option-title">Import data</span>
        <span class="settings__option-desc">
          Load a previously exported JSON file. Replaces your current
          exercises, levels, and (if included) history.
        </span>
      </button>
      ${hasBackup
        ? `<button type="button" class="settings__option settings__option--danger"
                   data-action="undo-test-data">
             <span class="settings__option-title">Undo test data</span>
             <span class="settings__option-desc">
               Restore the history you had before loading test data.
             </span>
           </button>`
        : `<button type="button" class="settings__option"
                   data-action="load-test-data">
             <span class="settings__option-title">Load test data</span>
             <span class="settings__option-desc">
               Add ~60 days of fake past-day history for every added or
               archived exercise. Today's completions and your current
               levels are left alone.
             </span>
           </button>`}
    `;
  };

  // When the on-screen keyboard appears, the visual viewport shrinks but
  // position:fixed elements still cover the original viewport — so the
  // modals end up partially behind the keyboard. Mirror the visual
  // viewport's geometry onto every open modal so they resize with it.
  const adjustModalsForViewport = () => {
    const vv = window.visualViewport;
    if (!vv) return;
    for (const id of ["picker", "details", "settings"]) {
      const el = $(id);
      if (!el) continue;
      if (el.hidden) {
        el.style.height = "";
        el.style.top = "";
        el.style.left = "";
        el.style.width = "";
      } else {
        el.style.height = `${vv.height}px`;
        el.style.top = `${vv.offsetTop}px`;
        el.style.left = `${vv.offsetLeft}px`;
        el.style.width = `${vv.width}px`;
      }
    }
  };
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", adjustModalsForViewport);
    window.visualViewport.addEventListener("scroll", adjustModalsForViewport);
  }

  const openSettings = () => {
    renderSettings();
    $("settings").hidden = false;
    document.body.classList.add("modal-open");
    adjustModalsForViewport();
  };
  const closeSettings = () => {
    $("settings").hidden = true;
    adjustModalsForViewport();
    if ($("picker").hidden && $("details").hidden) {
      document.body.classList.remove("modal-open");
    }
  };

  // Adds ~60 days of plausible past-day completion history for every
  // active and archived exercise. Doesn't touch state.levels or today's
  // completions, so the user's current setup stays untouched and nothing
  // gets marked done. The previous state is stashed under TEST_BACKUP_KEY
  // so undoTestData restores it exactly.
  const generateTestData = () => {
    const targetIds = [...state.addedIds, ...state.archivedIds];
    if (targetIds.length === 0) return;
    localStorage.setItem(TEST_BACKUP_KEY, JSON.stringify(state));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fmt = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${
        String(d.getDate()).padStart(2, "0")
      }`;
    const completed = { ...state.completed };

    for (const exId of targetIds) {
      const ex = exerciseById(exId);
      if (!ex) continue;
      const totalTiers = ex.levels.length;
      const snoozeDays = ex.snoozeDays || 1;
      let curTier = 1;
      let lastTs = null;
      // i = 60..1 only, never i = 0, so today's completions are untouched.
      for (let i = 60; i >= 1; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        if (lastTs && (d - lastTs) / 86400000 < snoozeDays) continue;
        if (Math.random() > 0.65) continue;
        if (Math.random() < 0.12 && curTier < totalTiers - 1) curTier++;
        const lvl = ex.levels[curTier];
        const r = Math.random();
        const kind = isLevelZero(lvl)
          ? "full"
          : r < 0.08
            ? "skipped"
            : r < 0.2
              ? "partial"
              : "full";
        const dateKey = fmt(d);
        if (!completed[dateKey]) completed[dateKey] = {};
        completed[dateKey][exId] = { level: curTier, kind, metric: ex.metric };
        lastTs = d;
      }
    }

    state.completed = completed;
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

  // Replace state.{addedIds, archivedIds, levels, completed} with the
  // contents of an export payload. Migration flags (levelsResetV8, etc.)
  // and any future state fields are preserved. Unknown exercise ids are
  // dropped so a stale export can't re-add removed catalog entries.
  const importData = (raw) => {
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      alert("That file isn't valid JSON.");
      return;
    }
    if (!payload || typeof payload !== "object") {
      alert("That file doesn't look like a workout export.");
      return;
    }
    if (!confirm(
      "Replace your current exercises, levels, and history with the " +
      "contents of this file?",
    )) return;
    state.addedIds = Array.isArray(payload.addedIds)
      ? payload.addedIds.filter((id) => exerciseById(id))
      : [];
    state.archivedIds = Array.isArray(payload.archivedIds)
      ? payload.archivedIds.filter((id) => exerciseById(id))
      : [];
    state.levels = (payload.levels && typeof payload.levels === "object")
      ? { ...payload.levels }
      : {};
    if (payload.completed && typeof payload.completed === "object") {
      state.completed = JSON.parse(JSON.stringify(payload.completed));
    }
    saveState();
    renderExercises();
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

  // Round a day count to a friendlier duration label so the chart's start
  // axis reads as "6 months" rather than a precise date that nobody cares
  // about. Snaps to days, weeks, months, then years.
  const roundedDuration = (days) => {
    if (days <= 0) return "today";
    if (days === 1) return "1 day";
    if (days <= 6) return `${days} days`;
    if (days < 60) {
      const weeks = Math.round(days / 7);
      return weeks === 1 ? "1 week" : `${weeks} weeks`;
    }
    if (days < 720) {
      const months = Math.round(days / 30);
      return months === 1 ? "1 month" : `${months} months`;
    }
    const years = Math.round(days / 365);
    return years === 1 ? "1 year" : `${years} years`;
  };

  // Snapshot of the currently rendered chart's geometry so the press-and-
  // hold scrubber (wired in setupListeners) can hit-test pointer events
  // against it without re-deriving the layout. Reset to null when no
  // chart is on screen.
  let chartCtx = null;

  const renderProgressChart = (ex, history) => {
    const points = history
      .filter((h) => h.level > 0 && (h.kind || "full") !== "skipped"
        && (h.metric || ex.metric) === ex.metric)
      .map((h) => ({ ts: parseDateStr(h.date), tier: h.level }))
      .sort((a, b) => a.ts - b.ts);
    if (points.length === 0) { chartCtx = null; return ""; }
    const W = 320, H = 140, padX = 12, padY = 22;
    const xs = points.map((p) => p.ts);
    const ys = points.map((p) => p.tier);
    // With a single completion the axis runs from that day to today so the
    // dot sits at the left and the right label still reads "today". The
    // y-range is padded by a level on each side so the level mark and dot
    // both have room to breathe.
    const single = points.length === 1;
    const today = Date.now();
    const xMin = Math.min(...xs);
    const xMax = single ? Math.max(xMin, today) : Math.max(...xs);
    const rawYMin = Math.min(...ys);
    const rawYMax = Math.max(...ys);
    // Always include the user's current tier in the y-range so the
    // "now" marker is on-chart even if they upgraded past every
    // logged completion.
    const curTier = state.levels[ex.id];
    const showCur = curTier > 0;
    const yMinBase = showCur ? Math.min(rawYMin, curTier) : rawYMin;
    const yMaxBase = showCur ? Math.max(rawYMax, curTier) : rawYMax;
    const yMin = single ? Math.max(0, yMinBase - 1) : yMinBase;
    const yMax = single ? yMaxBase + 1 : yMaxBase;
    const xRange = xMax - xMin || 86400000;
    const yRange = yMax - yMin || 1;
    const x = (t) => padX + ((t - xMin) / xRange) * (W - 2 * padX);
    const y = (v) => H - padY - ((v - yMin) / yRange) * (H - 2 * padY);
    const linePath = points
      .map((p, i) =>
        `${i === 0 ? "M" : "L"} ${x(p.ts).toFixed(1)} ${y(p.tier).toFixed(1)}`)
      .join(" ");
    const areaPath = single
      ? ""
      : linePath +
        ` L ${x(xMax).toFixed(1)} ${(H - padY).toFixed(1)}` +
        ` L ${x(xMin).toFixed(1)} ${(H - padY).toFixed(1)} Z`;
    const dotsHtml = single
      ? `<circle cx="${x(points[0].ts).toFixed(1)}"
                 cy="${y(points[0].tier).toFixed(1)}"
                 r="3.5" fill="var(--accent)" />`
      : "";
    // The y-axis only marks full level boundaries (pips are reflected in
    // the line plot, not labeled on the axis). At each visible level, draw
    // a short tick crossing the left edge plus a tiny "Lvl N" label inside
    // the chart so the y-axis stays uncluttered but readable.
    const levelMarks = ex.levels
      .map((lvl, idx) => ({ idx, lvl }))
      .filter(({ idx, lvl }) =>
        lvl.pip === 0 && lvl.level > 0 && idx >= yMin && idx <= yMax)
      .map(({ idx, lvl }) => {
        const yPos = y(idx).toFixed(1);
        return `
          <line x1="${(padX - 4).toFixed(1)}" y1="${yPos}"
                x2="${(padX + 4).toFixed(1)}" y2="${yPos}"
                stroke="var(--muted)" stroke-width="1.2" />
          <text x="${(padX + 6).toFixed(1)}" y="${yPos}"
                font-size="9" fill="var(--muted)"
                dominant-baseline="middle">Lvl ${lvl.level}</text>`;
      })
      .join("");
    chartCtx = {
      points: points.slice(),
      ex, padX, padY, W, H, xMin, xMax, yMin, yMax, xRange, yRange,
    };
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
        ${showCur ? `
          <line x1="${padX}" y1="${y(curTier).toFixed(1)}"
                x2="${W - padX}" y2="${y(curTier).toFixed(1)}"
                stroke="var(--accent)" stroke-opacity="0.35"
                stroke-width="1" stroke-dasharray="3 3" />
          <text x="${W - padX - 2}" y="${(y(curTier) - 4).toFixed(1)}"
                font-size="9" fill="var(--accent)" fill-opacity="0.75"
                text-anchor="end">Now</text>` : ""}
        ${single ? "" : `
          <path d="${areaPath}" fill="url(#chart-fill)" stroke="none" />
          <path d="${linePath}" fill="none" stroke="var(--accent)" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />`}
        ${dotsHtml}
        ${levelMarks}
        <text x="${padX}" y="${H - 6}" font-size="10" fill="var(--muted)">${
          roundedDuration(Math.round((Date.now() - xMin) / 86400000))
        }</text>
        <text x="${W - padX}" y="${H - 6}" font-size="10" fill="var(--muted)" text-anchor="end">${dateBadge(xMax)}</text>
        <g class="chart-hover" hidden>
          <line class="chart-hover__line" x1="0" x2="0"
                y1="${padY}" y2="${H - padY}"
                stroke="var(--accent)" stroke-opacity="0.55"
                stroke-width="1" stroke-dasharray="2 2" />
          <circle class="chart-hover__dot" r="3" fill="var(--accent)" />
          <g class="chart-hover__tip">
            <rect class="chart-hover__bg" x="-50" y="2" width="100" height="20"
                  rx="4" fill="var(--surface)"
                  stroke="var(--border-strong)" stroke-width="0.8" />
            <text class="chart-hover__text" x="0" y="13"
                  font-size="9" fill="var(--text)" text-anchor="middle"></text>
          </g>
        </g>
      </svg>`;
  };

  // Compresses progression to two numbers that aren't "current weight" or
  // "streak": tier change in the last 30 days (recent momentum) and tier
  // change since the very first completion (cumulative climb). Each tier-
  // index step counts as one — pip fills and level-ups weigh equally so
  // the number stays meaningful as the user moves up.
  const computeProgressSummary = (ex, history) => {
    const cur = state.levels[ex.id];
    const filtered = (history || []).filter(
      (h) => (h.metric || ex.metric) === ex.metric);
    if (filtered.length === 0) return null;
    // history is sorted newest-first.
    const oldest = filtered[filtered.length - 1];
    const cutoff = dateNDaysAgo(30);
    let baseline30 = null;
    for (const h of filtered) {
      if (h.date <= cutoff) { baseline30 = h; break; }
    }
    const daysSinceStart = Math.max(1, Math.round(
      (Date.now() - parseDateStr(oldest.date)) / 86400000));
    return {
      delta30: baseline30 ? cur - baseline30.level : null,
      deltaLife: cur - oldest.level,
      daysSinceStart,
      isFirstMonth: !baseline30,
    };
  };

  // Persists across re-renders for the same open exercise so the chart
  // doesn't snap closed when the user touches a tier control.
  let chartExpanded = false;

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
    const summary = computeProgressSummary(ex, history);
    const chartHtml = renderProgressChart(ex, history);
    const fmtDelta = (d) =>
      d > 0 ? `↑ +${d}` : d < 0 ? `↓ ${d}` : "—";
    const progressSummaryHtml = summary
      ? `<div class="progress-summary">
           <div class="progress-summary__stat">
             <span class="progress-summary__value progress-summary__value--${
               summary.delta30 == null ? "muted"
                 : summary.delta30 > 0 ? "up"
                 : summary.delta30 < 0 ? "down" : "flat"
             }">${
               summary.isFirstMonth ? "—" : fmtDelta(summary.delta30)
             }</span>
             <span class="progress-summary__label">${
               summary.isFirstMonth ? "First month" : "Last 30 days"
             }</span>
           </div>
           <div class="progress-summary__stat">
             <span class="progress-summary__value progress-summary__value--${
               summary.deltaLife > 0 ? "up"
                 : summary.deltaLife < 0 ? "down" : "flat"
             }">${fmtDelta(summary.deltaLife)}</span>
             <span class="progress-summary__label">Since start · ${
               roundedDuration(summary.daysSinceStart)
             }</span>
           </div>
         </div>`
      : "";
    const progressHeadHtml = `
      <div class="details__section-head">
        <h3 class="details__section">Progress</h3>
        ${chartHtml ? `
          <button type="button" class="details__chart-toggle"
                  data-action="toggle-chart"
                  aria-expanded="${chartExpanded ? "true" : "false"}">
            ${chartExpanded ? "Hide chart" : "Show chart"}
            <svg viewBox="0 0 12 8" aria-hidden="true">
              <path d="M1 1.5 L6 6.5 L11 1.5" fill="none"
                    stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>` : ""}
      </div>`;
    const progressHtml = chartHtml
      ? `${progressSummaryHtml}
         <div class="details__chart-wrap"${chartExpanded ? "" : " hidden"}>
           ${chartHtml}
         </div>`
      : `<p class="details__empty">No completions yet — your progression chart will start filling in as you log this exercise.</p>`;

    // Each exercise has one tracked metric (the one progression is built
    // from). Surface the tracked value plus any suggested-only auxiliary
    // values (sets/reps for weighted, sets for bodyweight, nothing for
    // cardio — its tier is already the prescription).
    const trackedMetric = lvlZero
      ? null
      : `${fmtTierValue(lvl)} ${lvl.unit}`;
    const suggestedParts = lvlZero
      ? []
      : [
          lvl.sets ? `${lvl.sets} sets` : null,
          lvl.reps ? `${fmtReps(lvl.reps)} reps` : null,
        ].filter(Boolean);
    const suggested = suggestedParts.length ? suggestedParts.join(" · ") : null;
    const summaryHtml = lvlZero
      ? `<span class="details__hero-summary">${tier} · just trying it out</span>`
      : `<span class="details__hero-summary">${tier} · ${trackedMetric}</span>
         ${suggested
           ? `<span class="details__hero-suggested">Suggested: ${suggested}</span>`
           : ""}`;

    const archived = isArchived(ex.id);
    const archiveBtnHtml = `
      <div class="details__actions">
        <button type="button" class="details__archive"
                data-action="${archived ? "unarchive" : "archive"}">
          ${archived ? "Unarchive" : "Archive"}
        </button>
        <div class="details__more-wrap">
          <button type="button" class="details__more-btn"
                  data-action="toggle-more" aria-label="More options">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="6" r="1.6" fill="currentColor" />
              <circle cx="12" cy="12" r="1.6" fill="currentColor" />
              <circle cx="12" cy="18" r="1.6" fill="currentColor" />
            </svg>
          </button>
          <div class="details__more-menu" hidden>
            <button type="button" class="details__more-item"
                    data-action="delete-history">
              Delete all history
            </button>
          </div>
        </div>
      </div>`;

    const descriptionHtml = ex.description
      ? `<h3 class="details__section">About</h3>
         <p class="details__about">${ex.description}</p>`
      : "";

    const mistakesHtml = ex.mistakes && ex.mistakes.length
      ? `<h3 class="details__section">Watch out for</h3>
         <ul class="details__mistakes">
           ${ex.mistakes.map((m) => `<li>${m}</li>`).join("")}
         </ul>`
      : "";

    // Customization fields exposed in the details modal. The leveling
    // structure (pipsPerLevel, levels) is intentionally NOT here — only
    // values that re-shape ranges or recovery cadence within a fixed level
    // ladder.
    const t = TEMPLATES.find((x) => x.id === ex.id) || {};
    const overrides = (state.customizations && state.customizations[ex.id]) || {};
    const isCustomized = Object.keys(overrides).length > 0;
    const customField = (label, field, unit, attrs = "") => {
      const value = overrides[field] != null ? overrides[field] : t[field];
      if (value == null) return "";
      return `
        <label class="details__edit-row">
          <span class="details__edit-label">${label}</span>
          <span class="details__edit-input">
            <input type="number" inputmode="numeric" data-edit="${field}"
                   value="${value}" ${attrs} />
            ${unit ? `<span class="details__edit-unit">${unit}</span>` : ""}
          </span>
        </label>`;
    };
    // Per-metric ladder editor — only the fields for the active metric are
    // shown, since switching metric is itself an option above. Each metric
    // has its own start/step pair stored on the template, so flipping the
    // metric chooser swaps which two inputs are visible.
    const ladderFields = (m) => {
      if (m === "weight") return (
        customField("Weight per tier", "weightStep", "lb",
          `min="1" max="100" step="1"`) +
        customField("Starting weight", "weightStart", "lb",
          `min="0" max="500" step="1"`));
      if (m === "reps") return (
        customField("Reps per tier", "repsStep", "reps",
          `min="1" max="20" step="1"`) +
        customField("Starting reps", "repsStart", "reps",
          `min="0" max="50" step="1"`));
      if (m === "distance") return (
        customField("Distance per tier", "distanceStep", "km",
          `min="1" max="20" step="1"`) +
        customField("Starting distance", "distanceStart", "km",
          `min="0" max="50" step="1"`));
      if (m === "duration") return (
        customField("Minutes per tier", "durationStep", "min",
          `min="1" max="30" step="1"`) +
        customField("Starting minutes", "durationStart", "min",
          `min="0" max="120" step="1"`));
      return "";
    };
    const metricChooserHtml = ex.allowedMetrics.length > 1 ? `
      <div class="details__edit-row details__edit-row--metric">
        <span class="details__edit-label">Tracked metric</span>
        <div class="metric-chooser" role="radiogroup" aria-label="Tracked metric">
          ${ex.allowedMetrics.map((m) => `
            <button type="button" role="radio"
                    class="metric-chooser__btn${
                      ex.metric === m ? " metric-chooser__btn--active" : ""
                    }"
                    aria-checked="${ex.metric === m ? "true" : "false"}"
                    data-action="set-metric" data-metric="${m}">
              ${m[0].toUpperCase() + m.slice(1)}
            </button>`).join("")}
        </div>
      </div>` : "";
    const customizeHtml = `
      <h3 class="details__section">Customize</h3>
      <div class="details__edit">
        ${metricChooserHtml}
        ${ladderFields(ex.metric)}
        ${ex.metric !== "duration" && t.sets != null
          ? customField("Suggested sets", "sets", "",
              `min="1" max="10" step="1"`) : ""}
        ${ex.metric === "weight"
          ? customField("Suggested reps", "reps", "",
              `min="1" max="50" step="1"`) : ""}
        ${customField("Snooze for", "snoozeDays", "days",
          `min="0" max="14" step="1"`)}
        ${isCustomized
          ? `<button type="button" class="details__edit-reset"
                     data-action="reset-customization">
               Reset to defaults
             </button>`
          : ""}
      </div>`;

    $("details-body").innerHTML = `
      <div class="details__hero">
        <span class="details__icon">${ex.icon}</span>
        <span class="details__hero-text">
          ${summaryHtml}
          <span class="details__hero-muscles">${ex.muscles}</span>
        </span>
      </div>
      ${descriptionHtml}
      ${mistakesHtml}
      ${progressHeadHtml}
      ${progressHtml}
      ${customizeHtml}
      ${archiveBtnHtml}
    `;
  };

  const openDetails = (exId) => {
    openDetailsId = exId;
    chartExpanded = false;
    renderDetails();
    $("details").hidden = false;
    document.body.classList.add("modal-open");
    adjustModalsForViewport();
  };
  const closeDetails = () => {
    openDetailsId = null;
    $("details").hidden = true;
    adjustModalsForViewport();
    if ($("picker").hidden) document.body.classList.remove("modal-open");
  };

  // Treat a quick downward flick anywhere inside a modal as a close
  // gesture. The threshold is intentionally tight (>=80px in <350ms) so
  // ordinary scrolling — which moves the finger upward, or downward
  // slowly with frequent direction changes — won't trip it. Touches that
  // start in a scroll container already past the top defer to native
  // scrolling instead.
  const attachSwipeDownClose = (modalEl, closeFn) => {
    let startY = null;
    let startT = 0;
    const onStart = (e) => {
      if (!e.touches || e.touches.length !== 1) { startY = null; return; }
      const scrollable = e.target.closest(
        ".picker__list, .details__body, .settings__body"
      );
      if (scrollable && scrollable.scrollTop > 0) { startY = null; return; }
      startY = e.touches[0].clientY;
      startT = Date.now();
    };
    const onEnd = (e) => {
      if (startY == null) return;
      const t = e.changedTouches && e.changedTouches[0];
      const dy = t ? t.clientY - startY : 0;
      const dt = Date.now() - startT;
      startY = null;
      if (dy > 80 && dt < 350) closeFn();
    };
    modalEl.addEventListener("touchstart", onStart, { passive: true });
    modalEl.addEventListener("touchend", onEnd, { passive: true });
    modalEl.addEventListener("touchcancel", () => { startY = null; },
      { passive: true });
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
      if (action === "mark-partial" || action === "mark-skipped") {
        const kind = action === "mark-partial" ? "partial" : "skipped";
        const cur = todaysCompletion(exId);
        // Tapping the active alternate again clears it back to "not done".
        if (cur && (cur.kind || "full") === kind) clearComplete(exId);
        else animateThenComplete(exId, kind);
        return;
      }
      if (action === "upgrade") return changeLevel(exId, +1);
      if (action === "downgrade") return changeLevel(exId, -1);
      if (action === "open-details") return openDetails(exId);
      if (action === "move-up") return moveExerciseInAvailable(exId, -1);
      if (action === "move-down") return moveExerciseInAvailable(exId, +1);
    });

    $("edit-order-btn").addEventListener("click", () =>
      setEditingOrder(!editingOrder));

    $("details-body").addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target || openDetailsId == null) {
        // Close any open kebab menu when clicking outside it.
        const open = $("details-body").querySelector(
          ".details__more-menu:not([hidden])",
        );
        if (open) open.hidden = true;
        return;
      }
      const action = target.dataset.action;
      if (action === "archive") {
        archiveExercise(openDetailsId);
        closeDetails();
      } else if (action === "unarchive") {
        unarchiveExercise(openDetailsId);
        closeDetails();
      } else if (action === "toggle-more") {
        const wrap = target.parentElement;
        const menu = wrap && wrap.querySelector(".details__more-menu");
        if (menu) menu.hidden = !menu.hidden;
      } else if (action === "delete-history") {
        const ex = exerciseById(openDetailsId);
        const name = ex ? ex.name : "this exercise";
        if (confirm(
          `Delete all history for ${name}? This can't be undone.`,
        )) {
          deleteExerciseHistory(openDetailsId);
        }
      } else if (action === "reset-customization") {
        resetCustomization(openDetailsId);
      } else if (action === "toggle-chart") {
        chartExpanded = !chartExpanded;
        renderDetails();
      } else if (action === "set-metric") {
        setCustomization(openDetailsId, "metric", target.dataset.metric);
        renderDetails();
      }
    });

    $("details-body").addEventListener("change", (event) => {
      const input = event.target.closest("input[data-edit]");
      if (!input || openDetailsId == null) return;
      setCustomization(openDetailsId, input.dataset.edit, input.value);
    });

    // Press-and-hold scrubber on the progress chart. Touching the chart
    // pins a vertical line + tooltip to the nearest data point; dragging
    // moves the marker; release hides everything. The chart sets
    // touch-action: none so vertical drags don't fight the body scroll.
    const updateChartHover = (svg, clientX) => {
      if (!chartCtx) return;
      const ctx = chartCtx;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return;
      const vbX = ((clientX - rect.left) / rect.width) * ctx.W;
      const xOf = (t) => ctx.padX +
        ((t - ctx.xMin) / ctx.xRange) * (ctx.W - 2 * ctx.padX);
      const yOf = (v) => ctx.H - ctx.padY -
        ((v - ctx.yMin) / ctx.yRange) * (ctx.H - 2 * ctx.padY);
      let nearest = ctx.points[0];
      let minD = Infinity;
      for (const p of ctx.points) {
        const d = Math.abs(xOf(p.ts) - vbX);
        if (d < minD) { minD = d; nearest = p; }
      }
      const px = xOf(nearest.ts);
      const py = yOf(nearest.tier);
      const lvl = ctx.ex.levels[nearest.tier];
      const value = lvl && lvl.value != null
        ? `${fmtTierValue(lvl)} ${lvl.unit}`
        : "";
      const label = `${dateBadge(nearest.ts)} · Lvl ${lvl ? lvl.level : "?"}${
        value ? ` · ${value}` : ""}`;
      const hover = svg.querySelector(".chart-hover");
      if (!hover) return;
      hover.removeAttribute("hidden");
      const line = hover.querySelector(".chart-hover__line");
      line.setAttribute("x1", px);
      line.setAttribute("x2", px);
      const dot = hover.querySelector(".chart-hover__dot");
      dot.setAttribute("cx", px);
      dot.setAttribute("cy", py);
      const text = hover.querySelector(".chart-hover__text");
      text.textContent = label;
      const bg = hover.querySelector(".chart-hover__bg");
      const tip = hover.querySelector(".chart-hover__tip");
      // Size the tooltip background to text width with 6px padding;
      // clamp horizontally so the box stays inside the chart area.
      const textW = text.getComputedTextLength
        ? text.getComputedTextLength()
        : label.length * 5;
      const tipW = Math.max(60, Math.ceil(textW) + 12);
      bg.setAttribute("x", -tipW / 2);
      bg.setAttribute("width", tipW);
      const half = tipW / 2;
      const tipX = Math.max(ctx.padX + half + 2,
        Math.min(ctx.W - ctx.padX - half - 2, px));
      tip.setAttribute("transform", `translate(${tipX},0)`);
    };
    const hideChartHover = () => {
      const hover = document.querySelector(".details__chart .chart-hover");
      if (hover) hover.setAttribute("hidden", "");
    };
    let chartHoverActive = false;
    const onChartMove = (e) => {
      if (!chartHoverActive) return;
      const svg = document.querySelector(".details__chart");
      if (svg) updateChartHover(svg, e.clientX);
    };
    const onChartEnd = () => {
      if (!chartHoverActive) return;
      chartHoverActive = false;
      hideChartHover();
      document.removeEventListener("pointermove", onChartMove);
      document.removeEventListener("pointerup", onChartEnd);
      document.removeEventListener("pointercancel", onChartEnd);
    };
    $("details-body").addEventListener("pointerdown", (event) => {
      const svg = event.target.closest(".details__chart");
      if (!svg) return;
      chartHoverActive = true;
      updateChartHover(svg, event.clientX);
      document.addEventListener("pointermove", onChartMove);
      document.addEventListener("pointerup", onChartEnd);
      document.addEventListener("pointercancel", onChartEnd);
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".exercise-row")) closeAllMenus(null);
    });

    $("add-exercise-btn").addEventListener("click", openPicker);
    $("picker-close").addEventListener("click", closePicker);
    $("picker-backdrop").addEventListener("click", closePicker);
    $("picker-list").addEventListener("click", (event) => {
      const more = event.target.closest(".picker__more");
      if (more) {
        pickerShowAll = true;
        renderPicker();
        return;
      }
      const item = event.target.closest(".picker-item");
      if (!item) return;
      addExercise(item.dataset.id);
      closePicker();
    });
    $("picker-search").addEventListener("input", (event) => {
      pickerQuery = event.target.value;
      renderPicker();
    });
    $("picker-filters").addEventListener("click", (event) => {
      const chip = event.target.closest(".picker-chip");
      if (!chip) return;
      const next = chip.dataset.group || null;
      pickerGroup = pickerGroup === next ? null : next;
      pickerShowAll = false;
      renderPicker();
    });
    $("details-close").addEventListener("click", closeDetails);
    $("details-backdrop").addEventListener("click", closeDetails);
    $("settings-btn").addEventListener("click", openSettings);
    $("settings-close").addEventListener("click", closeSettings);
    $("settings-backdrop").addEventListener("click", closeSettings);
    attachSwipeDownClose($("picker"), closePicker);
    attachSwipeDownClose($("details"), closeDetails);
    attachSwipeDownClose($("settings"), closeSettings);
    $("settings").addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target) return;
      const action = target.dataset.action;
      if (action === "export-all") exportData(true);
      else if (action === "export-no-history") exportData(false);
      else if (action === "import-data") {
        $("import-input").click();
      } else if (action === "load-test-data") {
        generateTestData();
        closeSettings();
      } else if (action === "undo-test-data") {
        undoTestData();
        closeSettings();
      }
    });
    $("import-input").addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        importData(reader.result);
        closeSettings();
      };
      reader.onerror = () => alert("Couldn't read the file.");
      reader.readAsText(file);
      // Reset the input so picking the same file again still triggers change.
      event.target.value = "";
    });
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });
    $("analysis-view").addEventListener("click", (event) => {
      const btn = event.target.closest(".muscle-toggle__btn");
      if (btn && btn.dataset.range) {
        muscleRange = btn.dataset.range;
        renderAnalysis();
        if (muscleSelected) renderMusclePopover();
        return;
      }
      const region = event.target.closest("[data-region]");
      if (region) {
        muscleSelected = region.dataset.region;
        openMusclePopover();
      }
    });
    $("muscle-popover-close").addEventListener("click", closeMusclePopover);
    $("muscle-popover-backdrop").addEventListener("click", closeMusclePopover);
    attachSwipeDownClose($("muscle-popover"), closeMusclePopover);
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
    TEMPLATES = data.templates;
    // Initial catalog uses defaults; rebuilt below once state is loaded so
    // customizations get applied.
    CATALOG = TEMPLATES.map(templateToExercise);

    loadState();
    rebuildCatalog();
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
    // One-time migration: completion entries used to carry a `sets` count;
    // they now carry a `kind` of "full" / "partial" / "skipped". Translate
    // legacy entries by treating sets-below-target as partial, everything
    // else as full. Skipped is a new state with no legacy equivalent.
    if (!state.completionKindV9) {
      for (const date in state.completed) {
        const day = state.completed[date];
        if (!day) continue;
        for (const exId in day) {
          const entry = day[exId];
          if (!entry || entry.kind) continue;
          const ex = exerciseById(exId);
          const lvl = ex && ex.levels[entry.level];
          const target = lvl ? (lvl.sets || 0) : 0;
          entry.kind = !lvl || isLevelZero(lvl) || (entry.sets || 0) >= target
            ? "full"
            : "partial";
          delete entry.sets;
        }
      }
      state.completionKindV9 = true;
      saveState();
    }
    // One-time migration: completion entries gain a `metric` field so
    // metric switches don't repaint old data against the new ruler.
    // Existing entries are tagged with the exercise's currently-active
    // metric, since that's what they were originally recorded against.
    if (!state.completionMetricV10) {
      for (const date in state.completed) {
        const day = state.completed[date];
        if (!day) continue;
        for (const exId in day) {
          const entry = day[exId];
          if (!entry || entry.metric) continue;
          const ex = exerciseById(exId);
          entry.metric = ex ? ex.metric : "weight";
        }
      }
      state.completionMetricV10 = true;
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
