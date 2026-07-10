# Typhoon Vision

Typhoon Vision is a map-first global tropical-cyclone visualization prototype designed for both the public and technically oriented users. It combines animated cyclone motion, official and supporting data feeds, satellite imagery, radar replay, city-impact screening, personal-location guidance, historical analogues, and an optional professional view.

Typhoon Vision 是一个以地图为中心的全球热带气旋可视化原型，面向普通公众和需要查看技术信息的用户。项目整合动态气旋、路径时间轴、卫星云图、雷达回放、城市影响筛选、个人定位建议、历史相似气旋与可选专业视图。

## Live site

https://typhoon-vision.netlify.app

## Product principles

1. **Map first** — the cyclone, its movement and affected areas remain visible before explanatory text.
2. **Public conclusions first** — explain timing, likely impacts and practical actions before technical parameters.
3. **Professional evidence on demand** — preserve track points, pressure, wind, source and uncertainty information without forcing it on every user.
4. **Authoritative-source priority** — the responsible basin agency is primary; other sources are used for cross-checking.
5. **No false precision** — visual trend tracks, estimated wind areas and cinematic effects are explicitly distinguished from official forecasts.

## Main features

### Animated cyclone layer

The animated cyclone is placed directly over the geographic map rather than being isolated in a decorative panel. It includes:

- spiral wind particles;
- an eye and eyewall visualization;
- intensity-dependent colour and rotation speed;
- fading historical positions;
- moving particles along the time path;
- time-slider and play/pause controls;
- automatic quality reduction on smaller or lower-power devices.

The particle field and eyewall are visual encodings. They are not three-dimensional atmospheric observations.

### Track handling

When a source provides full track points, Typhoon Vision displays them directly. If a feed exposes only the latest centre fix, the interface creates a clearly marked **visual history** and **directional trend reference** so users can understand motion while avoiding the claim that those points are official observations or forecasts.

### Weather layers

- NASA GIBS satellite imagery;
- RainViewer radar frames and radar-coverage layer;
- direct browser fallback when the Netlify weather-layer function is temporarily unavailable;
- opacity control and playback timeline;
- links to the original external products for verification.

Radar coverage is regional. A transparent area can mean no echo, no available radar coverage, or an unavailable frame.

### Global basin support

The internal data model supports:

- Western North Pacific — JMA / RSMC Tokyo;
- Atlantic and eastern Pacific — NOAA / NHC;
- central Pacific — CPHC;
- north Indian Ocean — IMD;
- southwest Indian Ocean — Météo-France La Réunion;
- Australian region — BoM and regional TCWCs;
- south Pacific — RSMC Nadi and regional agencies.

### Public and professional views

The public view prioritizes:

- where the cyclone is heading;
- likely closest approach;
- impact window;
- wind, rain and coastal risks;
- location-aware practical advice.

The professional view retains:

- coordinates;
- maximum wind;
- central pressure;
- track-point type and time;
- agency and update time;
- source comparison;
- official forecast and non-official trend distinctions.

### Personal impact mode

Location is processed in the browser. The site estimates distance to the displayed track, closest time and a broad possible impact window. Advice can be tailored to commuting, outdoor activity, office work, driving, family care and coastal living.

Location is not sent to the cyclone-data function or third-party meteorological services.

### Historical analogues

Historical cases are used to explain possible risk mechanisms rather than predict losses. Each card states why a case is similar, what differed and why the current official forecast remains more important.

### Neutral geographic labels

The main base map uses a no-label raster style. Typhoon Vision adds its own selected city and regional labels so politically disputed areas can be presented with neutral geographic wording rather than an implicit sovereignty classification.

## Architecture

```text
Browser
├── MapLibre GL map
├── CARTO no-label raster base map
├── Animated Canvas cyclone layer
├── GeoJSON tracks, cities, wind areas and analogues
├── NASA GIBS satellite tiles
└── RainViewer radar tiles

Netlify
├── static frontend
├── /api/cyclones
└── /api/weather-layers
```

## Project structure

```text
index.html
app.js
cyclone3d.js
styles.css
README.md
VERSION.txt
netlify.toml
netlify/
└── functions/
    ├── cyclone-data.mts
    └── weather-layers.mts
```

## Deployment

Upload the extracted files to the **root** of the connected GitHub repository. Do not upload the outer version folder as an additional directory.

Netlify should use:

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

After deployment, verify:

```text
https://typhoon-vision.netlify.app/api/cyclones
https://typhoon-vision.netlify.app/api/weather-layers
```

Both endpoints should return JSON, and the deploy summary should report deployed functions.

## Limitations

- Some public agency feeds expose only the current centre fix.
- RainViewer radar does not provide uniform global ground-radar coverage.
- Satellite imagery can be delayed or partially missing for the most recent time.
- Wind areas may be estimates when official quadrant radii are unavailable.
- Cinematic particles and eyewall geometry are explanatory visualizations.
- This site does not issue warnings and must not replace local official alerts or evacuation instructions.

## Disclaimer

Typhoon Vision is an informational and educational prototype. Follow warnings and emergency instructions issued by the responsible national and local authorities.
