/* Explanation card: plain-English reading beside the SHAP bars */
(() => { const st = document.createElement("style"); st.textContent = `
.xgrid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:28px;align-items:start;margin-top:6px}
.xgrid.solo{grid-template-columns:1fr}
.xgrid .why{padding:16px 18px;border-radius:14px;background:color-mix(in srgb,var(--acc) 7%,transparent);border-left:3px solid var(--acc)}
.xgrid .why-k{display:block;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.6;margin-bottom:10px}
.xgrid .why p{margin:0;line-height:1.65;font-size:14.5px}
.xgrid .why p+p{margin-top:10px;padding-top:10px;border-top:1px dashed color-mix(in srgb,currentColor 18%,transparent)}
.xbars{min-width:0}
@media (max-width:820px){.xgrid{grid-template-columns:1fr;gap:18px}}
`; document.head.appendChild(st); })();

"use strict";
const $ = (s, e = document) => e.querySelector(s);
const ICON = {
  sprout: "M7 20h10M12 20v-9M12 11c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6zM12 13c0-3 2.2-5 5.5-5 0 3-2.2 5-5.5 5z",
  flask: "M9 3h6M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3M7.5 14h9",
  trend: "M3 17l6-6 4 4 8-8M15 7h6v6",
  bookmark: "M6 3h12v18l-6-4-6 4z",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  shuffle: "M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
  check: "M4 12.5l5 5L20 6.5",
  alert: "M12 3l10 18H2zM12 10v4.5M12 17.6v.01",
  reset: "M3 12a9 9 0 1 0 3-6.7M3 4v5h5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
};
const ic = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICON[n]}"/></svg>`;
const NAMES = { kidneybeans: "Kidney beans", pigeonpeas: "Pigeon peas", mothbeans: "Moth beans", mungbean: "Mung bean", blackgram: "Black gram" };
const nm = s => NAMES[s] || s.charAt(0).toUpperCase() + s.slice(1);
const pct = v => (v * 100).toFixed(1) + "%";
const dp = s => (s < 0.1 ? 2 : s < 1 ? 1 : 0);
const CATLABEL = { Soil: "Soil type", Crop: "Crop", Crop_Type: "Crop", Soil_Type: "Soil type", Month: "Month of season" };
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Each module: which config block it reads, how inputs are grouped, and its accent colour.
const MOD = {
  crop: { cfg: "crop", name: "Crop recommendation", icon: "sprout", acc: "--crop", target: "label", lead: "Recommended crop",
    groups: [["Soil nutrients", ["N", "P", "K"]], ["Soil chemistry", ["ph"]], ["Climate", ["temperature", "humidity", "rainfall"]]] },
  fert: { cfg: "fertilizer", name: "Fertilizer advice", icon: "flask", acc: "--fert", target: "Fertilizer", lead: "Recommended fertilizer",
    groups: [["Selection", ["Crop", "Soil"]], ["Soil nutrients", ["Nitrogen", "Phosphorous", "Potassium", "Carbon"]], ["Soil condition", ["PH", "Moisture"]], ["Climate", ["Temperature", "Rainfall"]]] },
  yield: { cfg: "yield", name: "Yield forecast", icon: "trend", acc: "--yield", target: "Crop_Yield", lead: "Forecast yield",
    groups: [["Selection", ["Crop_Type", "Soil_Type", "Month"]], ["Soil", ["N", "P", "K", "Soil_pH"]], ["Weather", ["Temperature", "Humidity", "Wind_Speed"]]] },};
const PRESET = { Crop: "rice", Soil: "Loamy", Crop_Type: "Corn", Soil_Type: "Loamy" };
const state = { view: "crop", V: {}, truth: {}, last: {}, seq: 0, timer: 0, hist: [] };
try { state.hist = JSON.parse(localStorage.getItem("fo-hist") || "[]"); } catch (e) {}

const spec = m => CONFIG[MOD[m].cfg];
const fieldsOf = m => Object.fromEntries(spec(m).fields.map(f => [f.key, f]));
function defaults(m) {
  const v = {};
  spec(m).fields.forEach(f => (v[f.key] = f.default));
  Object.entries(spec(m).categories).forEach(([k, o]) => (v[k] = o.includes(PRESET[k]) ? PRESET[k] : o[0]));
  return v;
}
/* ---------- inputs shared between pages ---------- */
const SHARE = {
  N:     { crop: "N", fert: "Nitrogen", yield: "N" },
  P:     { crop: "P", fert: "Phosphorous", yield: "P" },
  K:     { crop: "K", fert: "Potassium", yield: "K" },
  ph:    { crop: "ph", fert: "PH", yield: "Soil_pH" },
  temp:  { crop: "temperature", fert: "Temperature", yield: "Temperature" },
  rain:  { crop: "rainfall", fert: "Rainfall" },
  humid: { crop: "humidity", yield: "Humidity" },
  crop:  { fert: "Crop", yield: "Crop_Type" },
  soil:  { fert: "Soil", yield: "Soil_Type" },
};
const START = { N: 65, P: 54, K: 42, ph: 6.5, temp: 23, rain: 96, humid: 77, crop: "maize", soil: "Loamy" };
state.shared = { ...START };
const slug = s => String(s).toLowerCase().replace(/[^a-z]/g, "").replace(/^corn$/, "maize");
function share(m, k, v) { for (const c in SHARE) if (SHARE[c][m] === k) state.shared[c] = v; }
function pull(m) {
  const V = state.V[m], f = fieldsOf(m), cats = spec(m).categories;
  for (const c in state.shared) {
    const k = SHARE[c][m]; if (!k) continue;
    const v = state.shared[c];
    if (cats[k]) { const o = cats[k].find(x => slug(x) === slug(v)); if (o) V[k] = o; }
    else if (f[k]) V[k] = Math.min(f[k].max, Math.max(f[k].min, +v));
  }
}

/* ---------- shell ---------- */
function buildNav() {
  const item = (id, icon, label, extra = "") => `<a href="#${id}" data-v="${id}">${ic(icon)}<span>${label}</span>${extra}</a>`;
  $("#nav").innerHTML = `<div class="sec">Models</div>${Object.entries(MOD).map(([k, m]) => item(k, m.icon, m.name)).join("")}
    <div class="sec">Workspace</div>${item("saved", "bookmark", "Saved predictions", `<span class="cnt" id="cnt"></span>`)}`;
  $("#status").className = "status" + (API.mock ? "" : " live");
  $("#status").innerHTML = API.mock ? `<i></i><span>Demo mode. Placeholder values until models are connected.</span>` : `<i></i><span>Connected to your models.</span>`;
  setTheme(document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"), false);
  $("#theme").onclick = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  count();
}
function setTheme(t, store = true) {
  document.documentElement.dataset.theme = t;
  $("#theme").innerHTML = `${ic(t === "dark" ? "sun" : "moon")}<span>${t === "dark" ? "Light theme" : "Dark theme"}</span>`;
  if (store) try { localStorage.setItem("fo-theme", t); } catch (e) {}
}
const count = () => ($("#cnt").textContent = state.hist.length || "");

function route() {
  const v = location.hash.slice(1);
  state.view = MOD[v] || v === "saved" ? v : "crop";
  document.querySelectorAll("#nav a").forEach(a => (a.dataset.v === state.view ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
  state.prev = {}; state.cu = {}; state.enter = true;
  const root = document.documentElement.style;
  if (state.view === "saved") { renderSaved(); return; }
  root.setProperty("--acc", `var(${MOD[state.view].acc})`);
  state.view === "yield" ? root.setProperty("--you", "var(--fert)") : root.removeProperty("--you");
  renderModule(state.view);
}

/* ---------- module page ---------- */
function renderModule(m) {
  const M = MOD[m], f = fieldsOf(m), cats = spec(m).categories;
  state.V[m] ||= defaults(m);
  pull(m);
  $("#crumb").textContent = "Models";
  $("#title").textContent = M.name;
  $("#actions").innerHTML = `<button class="btn" id="reset">${ic("reset")}Reset</button><button class="btn pri" id="sample">${ic("shuffle")}Load a real record</button>`;
  const setters = {};
  const groups = M.groups.map(([title, keys]) => `<fieldset class="grp"><legend>${title}</legend>${keys.map(k => cats[k] ? catField(m, k, cats[k]) : numField(m, f[k])).join("")}</fieldset>`).join("");
  $("#view").innerHTML = `<div class="layout"><form class="card form" onsubmit="return false">${groups}</form><div class="stack" id="out"></div></div>`;
  $("#view").querySelectorAll("[data-k]").forEach(el => {
    const k = el.dataset.k, vals = state.V[m];
    const set = v => {
      if (cats[k]) { vals[k] = v; el.value = v; return; }
      const d = f[k]; v = Math.min(d.max, Math.max(d.min, Number(v)));
      if (Number.isNaN(v)) return;
      vals[k] = v;
      el.closest(".fld").querySelectorAll("input").forEach(i => { i.value = i.type === "number" ? v.toFixed(dp(d.step)) : v; });
      el.closest(".fld").querySelector("input[type=range]").style.setProperty("--p", ((v - d.min) / (d.max - d.min)) * 100 + "%");
    };
    setters[k] = set; set(vals[k]);
        el.addEventListener(cats[k] ? "change" : el.type === "range" ? "input" : "change", () => { set(el.value); share(m, k, vals[k]); state.truth[m] = undefined; schedule(); });
  });
  $("#sample").onclick = () => {
    const s = spec(m).samples[Math.floor(Math.random() * spec(m).samples.length)];
        Object.keys(setters).forEach(k => { if (k in s) { setters[k](s[k]); share(m, k, state.V[m][k]); } });
    state.truth[m] = s[M.target]; schedule(0);
  };
    $("#reset").onclick = () => { Object.assign(state.shared, START); Object.assign(state.V[m], defaults(m)); pull(m); Object.keys(setters).forEach(k => setters[k](state.V[m][k])); state.truth[m] = undefined; schedule(0); };
  schedule(0);
}
const catField = (m, k, opts) => `<div class="fld"><div class="lr"><label for="${m}-${k}">${CATLABEL[k] || k}</label></div>
  <select id="${m}-${k}" data-k="${k}">${opts.map(o => `<option value="${o}">${nm(o)}</option>`).join("")}</select></div>`;
const numField = (m, d) => `<div class="fld"><div class="lr"><label for="${m}-${d.key}">${d.label}</label>
  <span class="num"><input id="${m}-${d.key}" data-k="${d.key}" type="number" min="${d.min}" max="${d.max}" step="${d.step}"><span>${d.unit}</span></span></div>
  <input type="range" data-k="${d.key}" aria-label="${d.label}" min="${d.min}" max="${d.max}" step="${d.step}"><div class="rng"><span>${(+d.min).toFixed(dp(d.step))}</span><span>${(+d.max).toFixed(dp(d.step))}</span></div></div>`;

function schedule(delay = 110) { clearTimeout(state.timer); state.timer = setTimeout(run, delay); }
function payload(m) {
  const v = { ...state.V[m] };
  if (m === "yield") {
    const i = MONTHS.indexOf(v.Month);   // "Auto (today)" is not in MONTHS, so nothing is sent
    if (i >= 0) v.month = i + 1;
    delete v.Month;
  }
  return v;
}
async function run() {
  const m = state.view, seq = ++state.seq;
  if (!MOD[m]) return;
  const out = $("#out"); out.classList.add("busy");
  try {
    const r = await API.predict(MOD[m].cfg, payload(m));
    if (seq !== state.seq) return;
    state.last[m] = r;
    out.classList.toggle("enter", state.enter); state.enter = false;
    out.innerHTML = m === "yield" ? yieldView(r) : classView(m, r);
    settle(out);
    out.classList.remove("busy");
    const b = $("#save"); if (b) b.onclick = () => save(m, r);
    const go = $("#tofert"); if (go) go.onclick = () => { state.shared.crop = go.dataset.c; location.hash = "fert"; };
  } catch (e) {
    out.classList.remove("busy");
    out.innerHTML = `<div class="card"><p class="err">${e.message}</p></div>`;
  }
}

/* ---------- result building blocks ---------- */
const kpi = (k, v, s) => `<div class="card kpi"><div class="k">${k}</div><div class="v">${v}</div><div class="s">${s}</div></div>`;

function truthPill(m, r) {
  const t = state.truth[m]; if (t === undefined) return "";
  if (m === "yield") { const d = Math.abs(r.value - t); return `<span class="pill ${d < 6 ? "ok" : "no"}">${ic(d < 6 ? "check" : "alert")}Dataset record: ${t.toFixed(1)}</span>`; }
  const ok = r.top === t;
  return `<span class="pill ${ok ? "ok" : "no"}">${ic(ok ? "check" : "alert")}Dataset record: ${m === "crop" ? nm(t) : t}${ok ? " (agrees)" : ""}</span>`;
}

const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
Object.assign(state, { prev: {}, cur: {}, cu: {}, enter: true });
/* Animated values: elements start at their previous position (or zero) and ease to the new one. */
function tw(key, props) { const p = state.prev[key]; state.cur[key] = props; return `style="${Object.keys(props).map(k => `${k}:${p ? p[k] : 0}%`).join(";")}" data-tw='${JSON.stringify(props)}'`; }
function settle(root) {
  void root.offsetWidth;
  root.querySelectorAll("[data-tw]").forEach(el => { const t = JSON.parse(el.dataset.tw); for (const k in t) el.style[k] = t[k] + "%"; });
  state.prev = state.cur; state.cur = {};
  root.querySelectorAll("[data-cu]").forEach(el => {
    const to = +el.dataset.cu, d = +el.dataset.d, k = el.dataset.k, from = state.cu[k] ?? 0; state.cu[k] = to;
    if (reduce || from === to) return;
    const t0 = performance.now();
    (function f(t) { const u = Math.min(1, (t - t0) / 520); el.textContent = (from + (to - from) * (1 - (1 - u) ** 3)).toFixed(d); if (u < 1) requestAnimationFrame(f); })(t0);
  });
}
const ART = `<svg class="art" viewBox="0 0 320 160" aria-hidden="true" preserveAspectRatio="xMaxYMax slice"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M-10 ${150 - i * 22} C 70 ${120 - i * 22}, 140 ${170 - i * 22}, 330 ${100 - i * 22}"/>`).join("")}</g></svg>`;

/* One input as a strip: shaded band = usual range, line = average, dot = your value. */
function fitRow(f, v, band, mean) {
  if (band) band = [Math.max(f.min, band[0]), Math.min(f.max, band[1])]; // raw data holds a few impossible negatives
  const P = x => Math.min(100, Math.max(0, ((x - f.min) / (f.max - f.min)) * 100)), d = dp(f.step), inside = band ? v >= band[0] && v <= band[1] : null, bad = inside === false;
  const status = !band ? `Typical ${(+mean).toFixed(d)} ${f.unit}` : inside ? "Inside the usual range" : `${v > band[1] ? "Above" : "Below"} the usual ${band[0].toFixed(d)} to ${band[1].toFixed(d)}`;
  return `<div class="ft"><div class="fl"><span class="fn">${f.label}</span><span class="fv ${bad ? "no" : ""}">${(+v).toFixed(d)} ${f.unit}</span></div>
    <div class="tk">${band ? `<i class="bd" ${tw("bd" + f.key, { left: P(band[0]), width: Math.max(1.5, P(band[1]) - P(band[0])) })}></i>` : ""}<i class="mn" style="left:${P(mean)}%"></i><i class="mk ${bad ? "out" : ""}" ${tw("mk" + f.key, { left: P(v) })}></i></div>
    <div class="fs ${bad ? "no" : ""}">${status}</div></div>`;
}
/* Plain-English reading of the explanation (template-based, no extra model). */
function whyText(m, r) { try { return whyTextRaw(m, r); } catch (e) { console.warn("whyText failed:", e); return ""; } }
function whyTextRaw(m, r) {
  const src = r.explanation && r.explanation.length ? r.explanation
    : m === "yield" && r.effects && r.effects.length ? r.effects.map(e => ({ feature: e.label, shap: e.delta })) : null;
  if (!src) return "";
  const F = fieldsOf(m), cats = spec(m).categories, vals = state.V[m], isY = m === "yield";
  const find = k => F[k] || Object.values(F).find(f => f.label === k);
  const lc = s => s.replace(/^([A-Z])([a-z])/, (_, a, b) => a.toLowerCase() + b);
  const tn = isY ? "" : (m === "crop" ? nm(r.top) : r.top);
  const month = MONTHS.includes(vals.Month) ? vals.Month : MONTHS[new Date().getMonth()];
  const describe = row => {
    const k = row.feature, f = find(k);
    if (k === "Season") return { name: "the time of year", val: month, tag: "" };
    if (cats[k]) return { name: "the " + (CATLABEL[k] || k).toLowerCase(), val: nm(vals[k]), tag: "" };
    if (!f) return { name: k.replace(/_/g, " ").toLowerCase(), val: "", tag: "" };
    const v = +vals[f.key], u = f.unit ? (f.unit === "%" || f.unit === "°C" ? "" : " ") + f.unit : "";
    let tag;
    if (!isY && r.profile && r.profile[f.key]) {
      const [lo, , hi] = r.profile[f.key];
      tag = (v < lo ? "low" : v > hi ? "high" : "typical") + " for " + tn.toLowerCase();
    } else {
      const d = (v - f.default) / (f.max - f.min);
      tag = d > 0.1 ? "high" : d < -0.1 ? "low" : "near typical";
    }
    return { name: lc(f.label), val: v.toFixed(dp(f.step)) + u, tag };
  };
  const item = (row, amt) => {
    const d = describe(row), who = d.name.startsWith("the ") ? d.name : "your " + d.name, inner = [d.val, d.tag].filter(Boolean).join(", ");
    return `${who}${inner ? ` (${inner})` : ""}${amt ? ` ${row.shap >= 0 ? "+" : "−"}${Math.abs(row.shap).toFixed(1)}` : ""}`;
  };
  const list = a => (a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]);
  const rows = [...src].sort((a, b) => Math.abs(b.shap) - Math.abs(a.shap)), mx = Math.abs(rows[0].shap) || 1e-9;
  const up = rows.filter(x => x.shap > 0 && x.shap >= 0.1 * mx).slice(0, 2);
  const down = rows.filter(x => x.shap < 0 && -x.shap >= 0.1 * mx).slice(0, 2);
  let a, b;
  if (!isY) {
    const alt = r.ranking[1];
    a = `The model picked <b>${tn}</b>${up.length ? ` mainly because of ${list(up.map(x => item(x)))}` : ""}.`;
    b = `${down.length ? `Pulling the other way: ${list(down.map(x => item(x)))}. ` : "Nothing in your inputs argues strongly against it. "}The closest alternative is ${m === "crop" ? nm(alt.name) : alt.name} at ${pct(alt.p)}.`;
  } else {
    const base = CONFIG.yield.baseline, pc = (r.value / base - 1) * 100;
    a = `The forecast of <b>${r.value.toFixed(1)}</b> is ${Math.abs(pc).toFixed(0)}% ${pc >= 0 ? "above" : "below"} the dataset average (${base.toFixed(1)})${up.length ? `, lifted most by ${list(up.map(x => item(x, true)))}` : ""}.`;
    b = down.length ? `Holding it back: ${list(down.map(x => item(x, true)))}.` : "No input is pulling it down noticeably.";
  }
  return `<div class="why"><span class="why-k">In plain English</span><p>${a}</p><p>${b}</p></div>`;
}
function explCard(m, r, title, lead) {
  const ex = r.explanation; if (!ex || !ex.length) return "";
  const F = fieldsOf(m), rows = [...ex].sort((a, b) => Math.abs(b.shap) - Math.abs(a.shap)).slice(0, 7), mx = Math.max(...rows.map(x => Math.abs(x.shap)), 1e-9);
  const why = whyText(m, r);
  return `<section class="card xcard"><h2>${title}</h2><p class="hint">${lead}</p><div class="xgrid ${why ? "" : "solo"}">${why}<div class="xbars">${rows.map(x => { const pos = x.shap >= 0, f = F[x.feature];
    return `<div class="dv"><span>${f ? f.label : x.feature.replace(/_/g, " ")}</span><span class="c"><i style="${pos ? "left:50%" : "right:50%"};width:${(Math.abs(x.shap) / mx) * 50}%;background:${pos ? "var(--acc)" : "var(--bad)"}"></i></span><span class="p ${pos ? "" : "no"}">${pos ? "+" : "-"}${Math.abs(x.shap).toFixed(m === "yield" ? 1 : 2)}</span></div>`; }).join("")}</div></div></section>`;
}

/* Radar ("web") plus a compact strip version beside it. Hover either one for exact values. */
const norm = (f, x) => Math.min(100, Math.max(0, ((x - f.min) / (f.max - f.min)) * 100));
function web(rows) {
  const W = 440, H = 380, cx = W / 2, cy = 190, R = 126, n = rows.length;
  const pt = (i, k) => { const a = -Math.PI / 2 + (2 * Math.PI * i) / n; return [cx + R * k * Math.cos(a), cy + R * k * Math.sin(a)]; };
  const xy = (i, k) => pt(i, k).map(c => c.toFixed(1)).join(",");
  const rings = [0.25, 0.5, 0.75, 1].map(k => `<polygon class="ring" points="${rows.map((_, i) => xy(i, k)).join(" ")}"/>`).join("");
  const spokes = rows.map((_, i) => { const [x, y] = pt(i, 1); return `<line class="spoke" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join("");
  const shape = (k, col, fo) => `<polygon points="${rows.map((x, i) => xy(i, norm(x.f, x[k]) / 100)).join(" ")}" fill="${col}" fill-opacity="${fo}" stroke="${col}" stroke-width="2.2" stroke-linejoin="round"/>`;
  const axes = rows.map((x, i) => { const [lx, ly] = pt(i, 1.15), anc = lx < cx - 6 ? "end" : lx > cx + 6 ? "start" : "middle", [tx, ty] = pt(i, norm(x.f, x.mean) / 100), [ux, uy] = pt(i, norm(x.f, x.v) / 100);
    return `<g class="ax" data-i="${i}" data-tip="${x.tip}"><circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="3.6" fill="var(--acc)"/><circle cx="${ux.toFixed(1)}" cy="${uy.toFixed(1)}" r="4.4" fill="var(--you)"/><circle class="hit" cx="${ux.toFixed(1)}" cy="${uy.toFixed(1)}" r="16"/><circle class="hit" cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="16"/><text x="${lx.toFixed(1)}" y="${(ly + (ly < cy - R * 0.9 ? -2 : ly > cy + R * 0.9 ? 11 : 4)).toFixed(1)}" text-anchor="${anc}">${x.f.label.replace("Relative humidity", "Humidity")}</text></g>`; }).join("");
  return `<svg class="rd" viewBox="0 0 ${W} ${H}" role="img" aria-label="Radar chart of your values against a typical profile">${rings}${spokes}${shape("mean", "var(--acc)", 0.16)}${shape("v", "var(--you)", 0.12)}${axes}</svg>`;
}
function miniRow(x, i) {
  const f = x.f, P = v => norm(f, v), bad = x.lo != null && (x.v < x.lo || x.v > x.hi), d = dp(f.step);
  return `<div class="mi" data-i="${i}" data-tip="${x.tip}"><span class="ml">${f.label.replace("Relative humidity", "Humidity")}</span><span class="tk">${x.lo != null ? `<i class="bd" ${tw("mb" + f.key, { left: P(x.lo), width: Math.max(1.5, P(x.hi) - P(x.lo)) })}></i>` : ""}<i class="mn" style="left:${P(x.mean)}%"></i><i class="mk ${bad ? "out" : ""}" ${tw("mm" + f.key, { left: P(x.v) })}></i></span><span class="mv ${bad ? "no" : ""}">${(+x.v).toFixed(d)}</span></div>`;
}
function webCard(title, hint, rows, typical) {
  return `<section class="card"><h2>${title}</h2><p class="hint">${hint}</p><div class="webrow"><div>${web(rows)}<div class="lg"><span><i style="background:var(--acc)"></i>${typical}</span><span><i style="background:var(--you)"></i>Your values</span></div></div>
    <div class="mini">${rows.map(miniRow).join("")}<p class="note">Hover a row or a point for exact values. Shaded band: usual range. Line: average.</p></div></div></section>`;
}
const tipOf = (f, v, mean, lo, hi, who) => { const d = dp(f.step), u = f.unit ? " " + f.unit : "", fx = x => (+x).toFixed(d) + u;
  return [f.label, `You: ${fx(v)}`, lo != null ? `Usual range: ${fx(Math.max(f.min, lo))} to ${fx(Math.min(f.max, hi))}` : "", `${who}: ${fx(mean)}`, lo != null ? (v < lo ? "Below the usual range" : v > hi ? "Above the usual range" : "Inside the usual range") : ""].filter(Boolean).join("|"); };

function classView(m, r) {
  const fields = spec(m).fields, vals = state.V[m], R = r.ranking, [a, b, c] = R, name = m === "crop" ? nm : s => s, short = s => name(s).replace(" Fertilizer", ""), tn = name(a.name);
  const rows = fields.map(f => { const [lo, mean, hi] = r.profile[f.key], v = vals[f.key]; return { f, lo, mean, hi, v, inside: v >= lo && v <= hi }; });
  const within = rows.filter(x => x.inside).length, margin = a.p - b.p, rest = Math.max(0, 1 - a.p - b.p - c.p);
  const vd = a.p >= 0.6 && margin >= 0.25 ? ["Clear match", "ok"] : a.p >= 0.35 ? ["Likely, with alternatives", "mid"] : ["Close call", "low"];
  const seg = (k, w, cl) => `<i class="${cl}" ${tw("sg" + k, { width: w * 100 })}></i>`;
  const detail = r.remark || (m === "fert" ? CONFIG.fertilizer.remarks[a.name] : "") || `Best match among ${R.length} candidates for the conditions entered.`;
  const link = m === "crop" && CONFIG.fertilizer.categories.Crop.includes(a.name) ? `<button class="btn" id="tofert" data-c="${a.name}">Fertilizer advice for ${nm(a.name)}${ic("arrow")}</button>` : "";
  const trees = r.trees ? `<span class="pill">${Math.round(a.p * r.trees)} of ${r.trees} trees agree</span>` : "";
  const rank = R.slice(0, 6).map((x, i) => `<div class="rk ${i ? "" : "top"}"><span class="n" title="${name(x.name)}">${short(x.name)}</span><span class="t"><i ${tw("rk" + x.name, { width: x.p * 100 })}></i></span><span class="p">${(x.p * 100).toFixed(0)}%</span></div>`).join("");
  const all = R.map(x => `<tr><td>${name(x.name)}</td><td>${pct(x.p)}</td></tr>`).join("");
  const rankCard = `<section class="card"><h2>Ranking</h2><p class="hint">Probability the model gives each candidate.</p>${rank}<details><summary>All ${R.length} scores</summary><table><thead><tr><th>${m === "crop" ? "Crop" : "Fertilizer"}</th><th>Probability</th></tr></thead><tbody>${all}</tbody></table></details></section>`;
  const ex = explCard(m, r, "What the model relied on", API.mock ? "Illustrative placeholder, not SHAP. Real SHAP values replace it once the model is connected." : `SHAP values for ${tn}. Bars to the right push toward it, bars to the left away from it. Correlated inputs share credit.`);
  return `<section class="card hero">${ART}<div class="hl"><div class="lead">${MOD[m].lead}</div><div class="big">${tn}</div><p class="d">${detail}</p>
      <div class="pills"><span class="pill">+${(margin * 100).toFixed(0)} pts over ${short(b.name)}</span><span class="pill">${within} of ${rows.length} inputs in the usual range</span>${trees}${truthPill(m, r)}</div></div>
    <div class="hr"><div class="conf"><b data-cu="${a.p * 100}" data-d="0" data-k="conf">${Math.round(a.p * 100)}</b><span>%<small>model confidence</small></span></div><span class="verdict ${vd[1]}"><i></i>${vd[0]}</span>
      <div class="sb">${seg("a", a.p, "s1")}${seg("b", b.p, "s2")}${seg("c", c.p, "s3")}${seg("r", rest, "s4")}</div>
      <div class="sl"><span><i class="s1"></i>${short(a.name)}</span><span><i class="s2"></i>${short(b.name)}</span><span><i class="s3"></i>${short(c.name)}</span><span><i class="s4"></i>${R.length - 3} others</span></div></div>
    <div class="heroact"><button class="btn pri" id="save">${ic("bookmark")}Save prediction</button>${link}</div></section>
       ${webCard(m === "crop" ? `Your field vs typical ${tn.toLowerCase()} conditions` : `Your field vs conditions where ${tn.toLowerCase()} is used`, m === "crop" ? "How each input compares with the conditions where this crop is usually grown in your data." : "How each input compares with the conditions where this fertilizer is usually recommended in your data.", rows.map(x => ({ ...x, tip: tipOf(x.f, x.v, x.mean, x.lo, x.hi, "Average") })), `Typical for ${tn.toLowerCase()}`)}
    ${ex}${rankCard}${modelCard(m)}`;
}

function yieldView(r) {
  const vals = state.V.yield, base = CONFIG.yield.baseline, T = vals.Crop_Type, nf = spec("yield").fields, best = r.by_crop[0];
  const vs = (r.value / base - 1) * 100, maxV = Math.ceil(Math.max(r.high * 1.25, base * 1.5) / 10) * 10, P = x => Math.min(100, Math.max(0, (x / maxV) * 100)), cmax = best.value * 1.1 || 1;
  const crops = r.by_crop.map(c => `<div class="dp ${c.name === T ? "sel" : ""}"><span class="n">${c.name}</span><span class="tk"><i class="stem" ${tw("st" + c.name, { width: (c.value / cmax) * 100 })}></i><i class="mk" ${tw("cd" + c.name, { left: (c.value / cmax) * 100 })}></i></span><span class="p">${c.value.toFixed(1)}</span></div>`).join("");
  const mx = Math.max(...r.effects.map(e => Math.abs(e.delta)), 0.01);
  const effCard = `<section class="card xcard"><h2>What moves the forecast</h2><p class="hint">Effect of each input compared with a mid-range value.</p><div class="xgrid ${whyText("yield", r) ? "" : "solo"}">${whyText("yield", r)}<div class="xbars">${r.effects.slice(0, 7).map(e => { const w = (Math.abs(e.delta) / mx) * 50, pos = e.delta >= 0;
    return `<div class="dv"><span>${e.label}</span><span class="c"><i style="${pos ? "left:50%" : "right:50%"};width:${w}%;background:${pos ? "var(--acc)" : "var(--bad)"}"></i></span><span class="p ${pos ? "" : "no"}">${pos ? "+" : "-"}${Math.abs(e.delta).toFixed(1)}</span></div>`; }).join("")}</div></div></section>`;
  const ex = explCard("yield", r, "What moves the forecast", API.mock ? "Illustrative placeholder, not SHAP. Real SHAP values replace it once the model is connected." : "SHAP values in yield units: how much each input raised or lowered this estimate. Correlated inputs share credit.");
  const wc = webCard("Your season vs a typical season", "How each condition compares with the typical value in your data.", nf.map(f => ({ f, v: vals[f.key], mean: f.default, lo: null, hi: null, tip: tipOf(f, vals[f.key], f.default, null, null, "Typical") })), "Typical season");
  return `<section class="card hero">${ART}<div class="hl"><div class="lead">${MOD.yield.lead} · ${T.toLowerCase()} on ${vals.Soil_Type.toLowerCase()} soil · ${MONTHS.includes(vals.Month) ? vals.Month : "current month"}</div><div class="big"><span data-cu="${r.value}" data-d="1" data-k="yv">${r.value.toFixed(1)}</span></div>
      <p class="d">Likely range ${r.low.toFixed(1)} to ${r.high.toFixed(1)}.${API.mock ? " Demo band of ±8%; the model will return a 10 to 90% quantile range." : ""} Units follow your yield CSV.</p>
      <div class="pills"><span class="pill" title="The dataset average includes zero-yield days">${vs >= 0 ? "+" : ""}${vs.toFixed(0)}% vs dataset average (${base.toFixed(1)})</span><span class="pill">Best crop here: ${best.name}</span>${truthPill("yield", r)}</div></div>
    <div class="hr"><div class="rb"><div class="tk"><i class="bd" ${tw("rb", { left: P(r.low), width: Math.max(1.5, P(r.high) - P(r.low)) })}></i><i class="mn" style="left:${P(base)}%"><b>avg ${base.toFixed(0)}</b></i><i class="mk" ${tw("rbv", { left: P(r.value) })}></i></div><div class="rax"><span>0</span><span>${maxV}</span></div></div></div>
    <div class="heroact"><button class="btn pri" id="save">${ic("bookmark")}Save prediction</button></div></section>
    ${wc}
    <div class="two"><section class="card"><h2>Crop comparison</h2><p class="hint">Same soil and weather, every crop, from zero.</p>${crops}</section>
      <section class="card"><h2>Temperature response</h2><p class="hint">Forecast as temperature changes, other inputs held as entered.</p>${sweep(r.sweep, vals.Temperature, r.value)}<p class="note">In the data, 30% of days recorded zero yield, mostly June to August. Those days averaged 29.2 °C against 21.5 °C for the rest.</p></section></div>
    ${ex || effCard}
${modelCard("yield")}`;
}

function sweep(pts, xNow, yNow) {
  const W = 440, H = 260, L = 36, B = 28, T = 16, R = 14;
  const xs = pts.map(p => p.x), x0 = Math.min(...xs), x1 = Math.max(...xs), y1 = Math.ceil(Math.max(...pts.map(p => p.y), yNow) / 10) * 10 || 10;
  const X = x => L + ((x - x0) / (x1 - x0)) * (W - L - R), Y = y => T + (1 - y / y1) * (H - T - B);
  const line = pts.map(p => `${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`).join(" ");
  const grid = [0, 0.5, 1].map(t => `<line class="gl" x1="${L}" x2="${W - R}" y1="${Y(t * y1)}" y2="${Y(t * y1)}"/><text x="${L - 8}" y="${Y(t * y1) + 4}" text-anchor="end">${Math.round(t * y1)}</text>`).join("");
  const ticks = [0, 1, 2, 3].map(t => { const x = x0 + (t / 3) * (x1 - x0); return `<text x="${X(x)}" y="${H - 8}" text-anchor="middle">${Math.round(x)}°C</text>`; }).join("");
  const cx = X(Math.min(x1, Math.max(x0, xNow)));
  return `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Forecast against temperature"><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--acc)" stop-opacity=".22"/><stop offset="1" stop-color="var(--acc)" stop-opacity="0"/></linearGradient></defs>
    ${grid}${ticks}<polygon points="${X(x0)},${Y(0)} ${line} ${X(x1)},${Y(0)}" fill="url(#ag)"/><polyline class="ln" points="${line}"/>
    <line class="gl" x1="${cx}" x2="${cx}" y1="${T}" y2="${Y(0)}"/><circle class="dot" cx="${cx}" cy="${Y(yNow)}" r="6"/><text class="vl" x="${Math.min(W - 46, cx + 10)}" y="${Math.max(T + 10, Y(yNow) - 12)}">${yNow.toFixed(1)}</text></svg>`;
}

function modelCard(m) {
  const s = spec(m), mt = s.metrics, im = s.importance;
  if (!mt && !im) return "";
  const stats = !mt ? "" : m === "yield"
    ? `${kpi("Variance explained", (mt.r2 * 100).toFixed(1) + "%", "R² on held-out records")}${kpi("Average error", "±" + mt.mae.toFixed(1), "Mean absolute error")}`
    : `${kpi("Accuracy", pct(mt.accuracy), "Held-out records")}${mt.top3 != null ? kpi("Top-3 accuracy", pct(mt.top3), "Right answer in top three") : ""}`;
  const imp = im ? Object.entries(im).slice(0, 6) : [], max = imp[0] ? imp[0][1] : 1;
  return `<section class="card"><h2>Model performance</h2><p class="hint">Scored on records the model did not train on.</p>${stats ? `<div class="kpis" style="margin-bottom:12px">${stats}</div>` : ""}
    ${imp.map(([k, v]) => `<div class="rk top"><span class="n">${k.replace(/_/g, " ")}</span><span class="t"><i style="width:${(v / max) * 100}%"></i></span><span class="p">${(v * 100).toFixed(0)}%</span></div>`).join("")}</section>`;
}

/* ---------- saved predictions ---------- */
function save(m, r) {
  const res = m === "yield" ? r.value.toFixed(1) : (m === "crop" ? nm(r.top) : r.top);
  const inp = spec(m).fields.slice(0, 4).map(f => `${f.label.split(" ")[0]} ${(+state.V[m][f.key]).toFixed(dp(f.step))}`).join(", ");
  state.hist.unshift({ model: MOD[m].name, result: res, inputs: inp, time: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) });
  state.hist = state.hist.slice(0, 100);
  try { localStorage.setItem("fo-hist", JSON.stringify(state.hist)); } catch (e) {}
  count(); const b = $("#save"); b.innerHTML = `${ic("check")}Saved`;
}
function renderSaved() {
  $("#crumb").textContent = "Workspace"; $("#title").textContent = "Saved predictions";
  document.documentElement.style.setProperty("--acc", "var(--crop)");
  $("#actions").innerHTML = state.hist.length ? `<button class="btn" id="csv">${ic("download")}Export CSV</button><button class="btn" id="clear">${ic("trash")}Clear all</button>` : "";
  $("#view").innerHTML = state.hist.length
    ? `<section class="card" style="padding:8px 8px 4px"><table><thead><tr><th>Model</th><th>Result</th><th>Inputs</th><th>Saved</th></tr></thead><tbody>${state.hist.map(h => `<tr><td>${h.model}</td><td><b>${h.result}</b></td><td>${h.inputs}</td><td>${h.time}</td></tr>`).join("")}</tbody></table></section>`
    : `<section class="card empty">${ic("bookmark")}<p><b>Nothing saved yet</b></p><p>Run a prediction and choose “Save prediction” to keep it here.</p></section>`;
  const c = $("#csv"); if (c) c.onclick = () => {
    const q = s => `"${String(s).replace(/"/g, '""')}"`, rows = [["Model", "Result", "Inputs", "Saved"], ...state.hist.map(h => [h.model, h.result, h.inputs, h.time])];
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([rows.map(r => r.map(q).join(",")).join("\n")], { type: "text/csv" })); a.download = "saved-predictions.csv"; a.click();
  };
  const x = $("#clear"); if (x) x.onclick = () => { state.hist = []; try { localStorage.removeItem("fo-hist"); } catch (e) {} count(); renderSaved(); };
}

/* ---------- hover tooltip, linked between the web and the strips ---------- */
const tipEl = document.body.appendChild(Object.assign(document.createElement("div"), { className: "tip", hidden: true })); let hot = null;
const mark = (i, on) => document.querySelectorAll(`#out [data-i="${i}"]`).forEach(e => e.classList.toggle("hl", on));
document.addEventListener("mouseover", e => {
  const t = e.target.closest && e.target.closest("[data-i]");
  if (hot !== null && (!t || t.dataset.i !== hot)) { mark(hot, false); hot = null; tipEl.hidden = true; }
  if (!t || !t.dataset.tip || t.dataset.i === hot) return;
  hot = t.dataset.i; mark(hot, true);
  tipEl.innerHTML = t.dataset.tip.split("|").map((x, j) => (j ? `<span>${x}</span>` : `<b>${x}</b>`)).join(""); tipEl.hidden = false;
});
document.addEventListener("mousemove", e => { if (tipEl.hidden) return; const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
  tipEl.style.left = Math.min(innerWidth - w - 8, e.clientX + 14) + "px"; tipEl.style.top = Math.min(innerHeight - h - 8, e.clientY + 16) + "px"; });

/* ---------- start ---------- */
try { const t = localStorage.getItem("fo-theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
if (API.mock) $("#demo").textContent = "Demo mode: placeholder values, not model predictions."; else $("#demo").remove();
buildNav();
addEventListener("hashchange", route);
route();
