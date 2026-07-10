# Typhoon Vision

Typhoon Vision is a responsive global tropical-cyclone map and public decision-support interface. It is designed to preserve a clear, weather-service style presentation while making track uncertainty, wind exposure, nearby-city screening, personal location and source limitations understandable to non-specialists.

> **Safety notice:** This project is an information-integration and visualization prototype. It does not replace official warnings, evacuation orders, closures or emergency instructions issued by the responsible meteorological and civil-protection authorities.

## Product principles

1. **The map is primary.** The interface first shows where the cyclone has been, where an official agency expects it may go and how uncertainty and wind exposure differ.
2. **Official and non-official information must remain distinct.** A generated trend reference is never presented as an official forecast.
3. **Hazards extend beyond the centre line.** Track uncertainty, wind radii and city-distance screening use separate visual encodings.
4. **The public view remains readable.** Professional parameters, source records and methodology are available through progressive disclosure.
5. **Failure must degrade safely.** If MapLibre or live APIs fail, the original v11 Canvas map and demonstration data remain available instead of leaving a blank screen.

## Stable v11 baseline

Public v11.2 is built directly from the stable Public v11 interface. It retains the v11 layout, public/professional views, path timeline, mobile bottom sheet, personal impact estimates, historical analogues and source cross-checking. Later experimental v12–v17 branches are not used as a code base.

## Formal map engine

The primary map uses **MapLibre GL JS**, packaged locally in the repository so the interface does not depend on a JavaScript CDN.

The base geography is rendered from the included `data/world-land.json` dataset. No external country-label layer is used. This avoids inheriting political-label classifications from third-party map styles. The application adds only selected major-city labels and weather-related overlays.

If WebGL or MapLibre initialization fails, the original v11 Canvas renderer remains visible and interactive.

## Tropical-cyclone map semantics

The map consistently uses the following visual grammar:

| Visual encoding | Meaning |
|---|---|
| Cyan solid line | Observed track |
| Orange dashed line | Official forecast track |
| Purple dotted line | Non-official trend reference |
| Orange translucent area | Official centre-track uncertainty area |
| Purple translucent area | Non-official directional uncertainty reference |
| Yellow/orange/red translucent areas | Wind radii or clearly marked estimated exposure areas |
| Coloured track nodes | Intensity at each time |
| Red / amber / green city points | City-to-track distance screening |
| White point with cyan outline | User-selected or browser location |
| Cyan dashed link | User location to nearest available track point |

### Intensity node colours

- blue: tropical depression;
- yellow: tropical storm;
- orange: severe tropical storm;
- red: typhoon/hurricane strength;
- pink: severe typhoon;
- purple: very intense or super-typhoon range.

### Official forecast fallback rule

A purple trend reference is generated only when:

1. fewer than two official forecast points are available; and
2. at least two observed positions are available.

The trend is based on recent motion and is labelled throughout the interface as non-official. If only one centre fix exists, no artificial track is generated.

## Global basin support

The interface recognizes and filters systems in:

- Western North Pacific;
- Atlantic;
- Eastern and Central Pacific;
- North Indian Ocean;
- Southwest Indian Ocean;
- Australian region;
- South Pacific.

The responsible authority varies by basin:

| Basin | Principal operational authority/reference |
|---|---|
| Western North Pacific | JMA / RSMC Tokyo |
| Atlantic and Eastern Pacific | NOAA / NHC |
| Central Pacific | NOAA / CPHC |
| North Indian Ocean | IMD / RSMC New Delhi |
| Southwest Indian Ocean | Météo-France / RSMC La Réunion |
| Australian region | Australian Bureau of Meteorology and regional TCWCs |
| South Pacific | RSMC Nadi and TCWC Wellington |

The current Netlify Function directly reads JMA, NHC, PAGASA, HKO and GDACS products. GDACS supplies global impact-context records for basins where a dedicated machine-readable operational connector is not yet implemented. Links to the responsible official centres remain available; the interface does not claim that GDACS replaces those authorities.

## Major-city impact screening

A curated set of major coastal and cyclone-exposed cities is screened against the available path.

- **Red:** nearest available track point is under approximately 250 km.
- **Amber:** approximately 250–550 km.
- **Green:** approximately 550–1,000 km.

This is a first-pass geographic screening, not a city warning. Actual risk depends on cyclone size, terrain, rainfall distribution, storm surge, local infrastructure and official warning zones.

## Personal location mode

Users may grant browser geolocation or click a location on the map. Location is processed in the browser and stored only in local browser storage.

The interface estimates:

- nearest available track distance;
- closest available track time;
- a possible impact window;
- confidence based on track completeness;
- scenario-specific suggestions for commuting, outdoor activity, office work, driving, family care and coastal residence.

## Data-source and merge rules

The Netlify Function is available at:

```text
/api/cyclones
```

It currently checks or parses:

- JMA/RSMC Tokyo XML bulletins;
- NOAA/NHC active-storm feed;
- PAGASA severe-weather bulletin;
- Hong Kong Observatory warning summary;
- GDACS current tropical-cyclone impact records.

Core rules:

- the responsible basin authority remains primary;
- supporting sources are used for position, freshness and impact cross-checks;
- incompatible wind-averaging periods and classification systems are not silently averaged;
- missing forecasts and parser limitations are shown to the user;
- GDACS basin assignment is normalized from cyclone coordinates rather than country text.

## Responsive interface

### Desktop

- persistent region and storm rail;
- large MapLibre map workspace;
- optional risk-inspector drawer;
- track playback and forecast-horizon controls;
- layer panel and professional source links.

### Mobile

- map-first initial screen;
- sidebar opened from the mobile menu;
- three-position detail sheet: collapsed, half and full;
- reduced city-label density;
- large touch targets and compact path controls.

## Project structure

```text
.
├── index.html
├── app.js
├── formal-map.js
├── styles.css
├── README.md
├── VERSION.txt
├── netlify.toml
├── data/
│   └── world-land.json
├── vendor/
│   ├── maplibre-gl.js
│   └── maplibre-gl.css
└── netlify/
    └── functions/
        └── cyclone-data.mts
```

## Netlify deployment

The repository root must directly contain `index.html`, `netlify.toml`, `vendor/` and `netlify/`.

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

Deploy through the connected GitHub repository or Netlify CLI. A simple static ZIP drop does not reliably deploy the serverless Function.

After deployment, verify:

```text
https://YOUR-SITE.netlify.app/
https://YOUR-SITE.netlify.app/api/cyclones
```

## Validation performed for v11.2

The release package was checked with:

- JavaScript syntax validation for `app.js` and `formal-map.js`;
- esbuild bundling of the Netlify Function;
- HTML ID uniqueness and local-file reference checks;
- browser execution with a simulated MapLibre API;
- desktop layout and interaction checks;
- mobile menu, basin filter and sheet checks;
- successful live-API response simulation;
- failed-API simulation confirming demonstration data remains visible;
- failed-WebGL simulation confirming the v11 Canvas map remains visible instead of a blank screen;
- layer-panel open/close checks;
- global basin filtering checks;
- city-label and trend-reference checks.

The test container cannot create a real WebGL context, so MapLibre GPU rendering was validated structurally and through a MapLibre-compatible browser stub, while the real WebGL-failure path was tested with the production Canvas fallback. The package intentionally keeps both renderers for this reason.

## Known limitations

- Full official forecast tracks depend on each source and parser output.
- Dedicated machine-readable connectors for IMD, Météo-France La Réunion, BoM and RSMC Nadi are not yet implemented.
- Estimated wind areas are not official warning polygons.
- City screening is distance-based and does not model terrain, rainfall or storm surge.
- Satellite and radar remain official external-tool links in this stable release; they are not allowed to destabilize the core map.

## License and attribution

Map rendering uses MapLibre GL JS. Geographic outlines are included locally. Operational meteorological data remain subject to the terms and attribution requirements of their respective providers.
