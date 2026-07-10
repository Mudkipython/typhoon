# Typhoon Vision

Typhoon Vision is a map-first, multilingual web prototype for viewing tropical-cyclone tracks, wind structure, nearby cities, personal exposure and supporting weather fields.

Typhoon Vision 是一个面向普通用户与专业用户的全球热带气旋可视化原型，重点展示气旋路径、风圈、中心风速与气压、附近城市、个人位置影响及辅助天气场。

## Live deployment

```text
https://typhoon-vision.netlify.app
```

## Product principles

1. **The cyclone is always visible on the map.** There is no separate “map” versus “3D cyclone” mode.
2. **Meteorological meaning takes priority over decorative effects.** The animated structure is driven by wind speed, central pressure, hemisphere and wind-radius data.
3. **The basemap does not display country labels.** Typhoon Vision overlays only selected city names relevant to the active track.
4. **Only one drawer can be open at a time.** Systems, Details and Layers automatically close one another.
5. **Official forecasts remain authoritative.** Trend lines, estimated wind radii and historical analogues are explicitly marked as references.

## Main features

### Animated cyclone structure

The map directly displays:

- the cyclone eye and pressure core;
- clockwise circulation in the Southern Hemisphere and counter-clockwise circulation in the Northern Hemisphere;
- 34 kt, 50 kt and 64 kt wind-radius rings;
- estimated dashed wind radii when official radii are unavailable;
- maximum wind and central pressure labels;
- animated flow arrows;
- a cyclone centre that moves with the track playback timeline.

The visualization is a meteorological encoding. It is not a three-dimensional observation of real clouds.

### Track and timeline

- blue solid line: observed track;
- orange dashed line: official forecast;
- purple dotted line: non-official directional trend when official forecast points are unavailable;
- intensity-coloured track points;
- play, pause, scrub and playback-speed controls;
- click a point to view time, wind and pressure.

### City-only basemap labels

The underlying raster basemap uses a no-label style. Typhoon Vision adds its own city layer near the selected cyclone track. It therefore avoids country-classification labels while retaining useful place references.

A bundled `data/world-land.json` file provides a land-outline fallback if external raster tiles are slow or unavailable.

### Cloud and precipitation fields

V17 replaces the previous NASA/RainViewer tile workflow with a Netlify Function backed by the Open-Meteo Forecast API:

```text
/api/weather-grid?lat=23.9&lon=125.2&span=12
```

The Function samples a 7 × 7 grid around the selected cyclone and returns:

- total cloud cover;
- precipitation;
- 10 m wind speed;
- 10 m wind direction.

These are **numerical weather-model fields**, not ground-radar reflectivity. The interface therefore labels the layers as “Cloud cover” and “Precipitation”, rather than presenting them as a global radar product.

For real regional radar and official satellite products, the Details drawer provides links appropriate to the selected basin, such as JMA, NOAA/NHC and national meteorological agencies.

### Personal impact

After the user grants browser location access or clicks a point on the map, the browser calculates:

- nearest distance to the track;
- estimated closest-approach time;
- possible impact window;
- estimate confidence;
- broad wind, rain and coastal-risk guidance.

The selected location is stored only in browser `localStorage` and is not sent to the cyclone data providers.

### Historical analogues

The Details drawer includes selected historical cyclone analogues. Matching considers track direction, intensity and basin. Historical tracks can be overlaid as a grey dashed line.

Historical similarity is explanatory context, not a prediction of identical impacts.

## Responsive interaction

### Desktop

- full-screen map;
- compact controls around the map edges;
- mutually exclusive floating drawers;
- readable 15–16 px supporting text;
- fixed playback timeline at the bottom.

### Mobile

- map remains the primary surface;
- drawers become bottom sheets;
- Systems, Details and Layers never stack on top of one another;
- compact storm chip and timeline controls;
- large touch targets.

## Languages and themes

Supported interface languages:

- 简体中文
- English
- 日本語
- 한국어
- Español
- Français

Themes:

- system
- light
- dark

## Architecture

```text
Browser
├── MapLibre GL JS (bundled locally)
├── no-label CARTO raster basemap
├── bundled world-land GeoJSON fallback
├── GeoJSON track, wind-radius, city and personal-location layers
├── Canvas cyclone-structure overlay
├── /api/cyclones
└── /api/weather-grid

Netlify Functions
├── cyclone-data.mts
└── weather-grid.mts
    └── Open-Meteo Forecast API
```

MapLibre is bundled in `vendor/` so the application does not depend on a third-party JavaScript CDN during startup.

## Project structure

```text
index.html
app.js
cyclone-viz.js
styles.css
README.md
VERSION.txt
netlify.toml
vendor/
├── maplibre-gl.js
└── maplibre-gl.css
data/
└── world-land.json
netlify/
└── functions/
    ├── cyclone-data.mts
    └── weather-grid.mts
```

## Netlify deployment

The repository root must directly contain `index.html` and `netlify.toml`.

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

Recommended deployment:

1. Extract the ZIP.
2. Upload the extracted contents to the GitHub repository root.
3. Commit the changes.
4. Let Netlify deploy from the connected repository.
5. Confirm the site header shows `Public v17`.
6. Test:

```text
https://typhoon-vision.netlify.app/api/cyclones
https://typhoon-vision.netlify.app/api/weather-grid?lat=23.9&lon=125.2
```

A drag-and-drop static deployment does not package Netlify Functions.

## Validation performed

- `app.js` JavaScript syntax check;
- `cyclone-viz.js` JavaScript syntax check;
- both Netlify Functions bundled with esbuild;
- weather-grid Function tested with a mocked 49-cell Open-Meteo response;
- HTML duplicate-ID check;
- local MapLibre assets verified;
- jsdom startup test confirmed four demo systems render when the API is unavailable;
- drawer mutual-exclusion test;
- Japanese interface switch test.

A real browser WebGL screenshot could not be produced in the execution container because its Chromium GPU process is restricted. The JavaScript and interaction boot sequence were tested with a browser DOM simulation instead.

## Limitations

- Open-Meteo cloud and precipitation fields are model output, not satellite pixels or radar observations.
- A single globally consistent and free ground-radar mosaic is not available at equal quality everywhere.
- Official agencies use different averaging periods and intensity scales.
- Estimated wind radii are not official warning boundaries.
- Historical analogues cannot predict damage from the current event.

## Safety notice

Typhoon Vision is an information-integration and visualization prototype. It does not replace warnings, evacuation orders, closures or emergency instructions issued by national and local authorities.
