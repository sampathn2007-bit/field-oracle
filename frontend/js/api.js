/* The only file you need to change to connect real models.
 *
 * Set `mock: false`, point `base` at your server, and make each endpoint return JSON in the
 * shapes below. Everything the dashboard shows is drawn from these responses.
 *
 * POST crop / fertilizer  ->  {
 *     ranking: [{ name: "rice", p: 0.94 }, ...],      // every class, highest first, p sums to 1
 *     top: "rice",
 *     profile: { N: [lo, mean, hi], ... },            // usual range of the top class, per input
 *     remark: "text",                                 // fertilizer only, optional
 *     trees: 150,                                     // optional: shows "X of N trees agree"
 *   }
 * POST yield  ->  {
 *     value: 54.2, low: 50.1, high: 58.3,             // forecast and likely range
 *     by_crop: [{ name: "Corn", value: 54.2 }, ...],  // same season, every crop, best first
 *     sweep:   [{ x: -5, y: 3.1 }, ...],              // forecast across temperatures
 *     effects: [{ label: "Temperature", delta: 4.1 }] // input effect versus a typical value
 *   }
 *
 * Request bodies are flat JSON keyed by the field names in config.js, plus the categorical
 * choices (Soil, Crop, Crop_Type, Soil_Type). Return HTTP 4xx with {"error": "..."} on bad input.
 */
const API = {
  mock: false,
  base: "http://localhost:8000",
  endpoints: { crop: "/api/crop", fertilizer: "/api/fertilizer", yield: "/api/yield" },
  async predict(mod, values) {
    if (this.mock) return MOCK.predict(mod, values);
    const r = await fetch(this.base + this.endpoints[mod], {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.statusText);
    return j;
  },
};
