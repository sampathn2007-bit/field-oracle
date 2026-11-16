/* Placeholder predictions so the dashboard works before your models exist.
 * These are NOT machine learning. Crop and fertilizer pick the class whose average profile
 * (from config.js) is nearest to the inputs. Yield is a hand-made curve. Delete this file
 * and set `mock: false` in api.js when your models are ready. */
const MOCK = (() => {
  const fieldOf = (mod, key) => CONFIG[mod].fields.find(f => f.key === key);
  function classify(mod, v) {
    const C = CONFIG[mod], scores = Object.entries(C.profiles).map(([name, prof]) => {
      let d = 0;
      C.fields.forEach(f => { const [lo, mean, hi] = prof[f.key], w = Math.max((hi - lo) / 2.56, (f.max - f.min) / 60); d += ((v[f.key] - mean) / w) ** 2; });
      return { name, s: -d / 2 };
    });
    const mx = Math.max(...scores.map(x => x.s)), e = scores.map(x => Math.exp((x.s - mx) / 4)), sum = e.reduce((a, b) => a + b);
    const ranking = scores.map((x, i) => ({ name: x.name, p: e[i] / sum })).sort((a, b) => b.p - a.p);
    const top = ranking[0].name, out = { ranking, top, profile: C.profiles[top] };
    if (mod === "fertilizer") out.remark = C.remarks[top] || "";
    return out;
  }
  const hash = s => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 1000, 7) / 1000;
  const bell = (x, mid, w) => Math.exp(-(((x - mid) / w) ** 2));
  function yieldAt(v) {
    const crop = 0.8 + 0.4 * hash(v.Crop_Type), soil = 0.9 + 0.2 * hash(v.Soil_Type);
    const nutri = 0.6 + 0.4 * ((v.N - 45) / 46 + (v.P - 36) / 36 + (v.K - 27) / 33) / 3;
    return 70 * crop * soil * nutri * (0.15 + 0.85 * bell(v.Temperature, 24, 15)) * (0.7 + 0.3 * bell(v.Humidity, 70, 25)) * (0.8 + 0.2 * bell(v.Soil_pH, 6.6, 1.2));
  }
  function forecast(v) {
    const C = CONFIG.yield, value = yieldAt(v), T = fieldOf("yield", "Temperature");
    const by_crop = C.categories.Crop_Type.map(c => ({ name: c, value: yieldAt({ ...v, Crop_Type: c }) })).sort((a, b) => b.value - a.value);
    const sweep = Array.from({ length: 24 }, (_, i) => { const x = T.min + (T.max - T.min) * i / 23; return { x, y: yieldAt({ ...v, Temperature: x }) }; });
    const effects = C.fields.map(f => ({ label: f.label, delta: value - yieldAt({ ...v, [f.key]: (f.min + f.max) / 2 }) })).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
    return { value, low: value * 0.92, high: value * 1.08, by_crop, sweep, effects };
  }
  return { predict: async (mod, v) => (mod === "yield" ? forecast(v) : classify(mod, v)) };
})();
