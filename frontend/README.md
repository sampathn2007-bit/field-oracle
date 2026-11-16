# Agronomy Dashboard

Front-end only. Three pages: crop recommendation, fertilizer advice, yield forecast.
No server, build step or install: open `index.html` in a browser. Charts are drawn in plain SVG, so it works offline. Only the fonts (Manrope, Inter) load from Google Fonts; without internet it falls back to system fonts.

It currently runs in **demo mode** with placeholder values (a banner says so). They are not
model predictions.

## Connect your models

Everything goes through `js/api.js`.

1. Set `mock: false` and `base` to your server address, for example `http://localhost:8000`.
2. Make three endpoints return the JSON shapes documented at the top of `js/api.js`.
3. If the server is on another origin, enable CORS on it.
4. Delete `js/mock.js` and its `<script>` tag in `index.html`.

## What the pages show

- **Crop and fertilizer:** result with a verdict (clear match, likely, close call), a stacked probability bar for the top three, a "how your field fits" strip chart (usual range band, average line, your dot), the ranking, and the model-performance card when `metrics` and `importance` exist.
- **Yield:** forecast with its range on a 0-to-max bar, crop comparison from zero, temperature response, what moves the forecast, and strip charts of your season against the typical one.
- **Explanations:** if a response includes `explanation` (the SHAP shape in the project README, section 9), the "what the model relied on" and "what moves the forecast" panels draw from it; otherwise yield falls back to `effects`. In demo mode these panels are labelled as placeholders.
- **Motion:** cards fade in on page change, bars and dots glide between values, the headline number counts up. All of it is switched off when the system asks for reduced motion.

Optional: add `metrics` and `importance` for a model in `js/config.js` to show its accuracy line and
a "what the model relies on" table. They are hidden while absent.

## Files

```
index.html       page shell
css/style.css    all styling, light and dark themes
js/app.js        interface: forms, SVG charts, explanations, saved predictions (export to CSV)
js/api.js        the one place that talks to your models
js/mock.js       placeholder predictions (delete later)
js/config.js     input ranges, option lists, class profiles, sample records
```

## Inputs

| Page | Inputs |
|---|---|
| Crop | N, P, K, temperature, humidity, pH, rainfall |
| Fertilizer | soil type, crop, temperature, moisture, rainfall, pH, N, P, K, carbon |
| Yield | crop, soil type, pH, temperature, humidity, wind speed, N, P, K |

Ranges, defaults and class profiles in `config.js` were computed from the three CSVs you uploaded.
"Fill from a real record" uses the sample rows in the same file.
