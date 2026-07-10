# Typhoon Vision

Typhoon Vision is a responsive tropical-cyclone information and decision-support interface designed for both the public and advanced weather users. It combines an interactive track map, official-source cross-checking, personal location impact estimates, scenario-specific preparedness advice, and optional professional detail.

> **Safety notice:** Typhoon Vision is an information-visualization project. It does not replace warnings, evacuation orders, transport notices, or emergency instructions issued by national and local authorities.

## Product goals

Most cyclone websites are either highly technical or visually attractive but weak at explaining what a storm may mean for an individual. Typhoon Vision aims to connect both layers:

1. **Map first:** show where the storm has been, where the responsible agency forecasts it may go, how intensity changes, and what wind or uncertainty areas mean.
2. **Decision first:** explain when a selected location may be affected, what hazards matter, and what actions are appropriate for different daily-life scenarios.
3. **Source transparency:** identify the responsible meteorological authority, compare additional sources without averaging incompatible classifications, and expose update times and limitations.
4. **Progressive disclosure:** keep the public view readable while preserving professional data, timelines, source records, and official external tools.

## Professional products studied

The v11 information architecture and map controls were reviewed against several professional and public-facing cyclone products. These references are used for interaction and communication patterns only; Typhoon Vision does not copy their branding or claim equivalence with an operational forecast centre.

| Reference | Product patterns adopted |
|---|---|
| [NOAA National Hurricane Center GIS](https://www.nhc.noaa.gov/gis/) | Separate observed/forecast tracks, uncertainty cone, watches and warnings, wind fields/radii, wind-speed probability, and tropical-storm-force wind arrival-time products. |
| [Hong Kong Observatory tropical-cyclone services](https://www.hko.gov.hk/en/informtc/tcMain.htm) | Clear separation between public bulletins, track positions, probability forecasts, GIS maps, recent tracks, warnings, and preparedness material. |
| [PAGASA tropical-cyclone bulletin](https://www.pagasa.dost.gov.ph/tropical-cyclone/severe-weather-bulletin) | Hazard-first communication: severe wind, rainfall, coastal waters, storm surge, shipping and agriculture products; explicit reminders that damaging weather may occur outside the centre track or confidence cone. |
| [Windy hurricane tracker](https://www.windy.com/hurricanes) | Compact layer-first map navigation and smooth time-based weather exploration. |
| [天气网台风路径](https://tf.tianqi.com/) | Intensity-coloured path nodes, clickable point details, quick access to current/history views, satellite imagery and radar. |

These comparisons led to five v11 decisions:

1. keep the map as the primary workspace rather than permanently shrinking it with multiple text columns;
2. distinguish observed track, official forecast, uncertainty, wind/impact areas and non-official trend references by both colour and line style;
3. expose time playback and 72-hour/120-hour horizons directly on the map;
4. move detailed impacts, personal advice, sources and professional data into an optional decision drawer;
5. link to official satellite, radar, rainfall, warning and GIS products instead of pretending that unavailable layers are already integrated.

## Core interface

### Interactive cyclone map

The map supports:

- observed track shown as a solid line;
- official forecast shown as a dashed line when official forecast points are available;
- a clearly marked non-official trend reference only when an official forecast cannot be parsed;
- track nodes coloured by intensity;
- clickable node cards with time, coordinates, wind, pressure, intensity, and data type;
- forecast probability area when sufficient official points exist;
- wind/possible-impact rings with explicit estimated labels when official quadrant radii are unavailable;
- 72-hour and 120-hour forecast-horizon selection;
- playback, pause, scrubber, and playback speed controls;
- world map and optional 3D globe views;
- user-location and historical-analogue overlays.

### Public view

The default view avoids unexplained meteorological jargon. It prioritizes:

- where the cyclone is moving;
- when it may be closest to the user;
- approximate nearest-track distance;
- likely wind, rainfall, and coastal concerns;
- immediate actions;
- source agreement and uncertainty.

### Professional view

The optional professional view exposes:

- latitude and longitude;
- maximum sustained wind;
- central pressure;
- movement direction;
- observed/forecast timeline;
- source position spread;
- official versus synthetic points;
- source status and update times;
- direct links to JMA, HKO, CWA, and NHC professional products.

## Personal impact mode

Users may either grant browser geolocation or select a point manually on the map. Location processing remains in the browser and is stored only on that device.

The interface estimates:

- nearest distance to the available track;
- estimated closest-approach time;
- possible impact window;
- confidence based on track completeness and whether synthetic trend points are involved.

These are decision-support estimates, not official arrival forecasts.

### Activity profiles

Preparedness advice changes according to the selected profile:

- commuting;
- outdoor exercise;
- office work;
- driving;
- caring for children or older adults;
- living in a coastal area.

Advice is separated into actions to take now, before likely impacts, and during impacts.

## Historical analogues

Selected historical storms are used to explain hazard patterns such as prolonged rainfall, coastal surge, or inland flooding. They are ranked using selected track, intensity, regional, and user-location characteristics.

Historical similarity is not a forecast. Storm size, forward speed, tide, terrain, exposure, and preparedness can produce very different outcomes.

## Data-source architecture

The Netlify Function at `/api/cyclones` aggregates publicly available information from multiple organizations.

### JMA / RSMC Tokyo

Primary operational source for the western North Pacific. The parser reads the JMA XML feed, normalizes cyclone identity, extracts centre positions, attempts to distinguish analysis and forecast points, and merges successive bulletins.

### NOAA / National Hurricane Center

Official source for Atlantic, eastern North Pacific, and central North Pacific systems. The project currently reads the active-storm feed and is structured for future integration of NHC GIS track, cone, wind-radii, arrival-time, and probability products.

### PAGASA

Provides an additional western North Pacific/local Philippine cross-check. The function reads the active bulletin page for current centre position, motion, intensity, and hazard flags when available.

### Hong Kong Observatory

Provides Hong Kong tropical-cyclone warning-signal status and links to the HKO track, satellite, and radar products.

### GDACS

Adds global disaster-impact context. GDACS is treated as an impact source, not as the primary forecast authority.

### Taiwan Central Weather Administration

The interface links to CWA typhoon warning, rainfall, satellite, radar, and wind products. An authenticated open-data connector can be added through Netlify environment variables when a specific dataset is selected.

## Cross-validation principles

Typhoon Vision does not silently average agency values.

- The responsible RSMC or national meteorological service remains authoritative for its basin or jurisdiction.
- Other sources are used to compare centre position, motion, freshness, classification, and reported impacts.
- Different wind averaging periods and classification systems are retained rather than converted into false agreement.
- Source errors, unavailable feeds, missing forecast points, and synthetic trend references are visible in the interface.

## Forecast cone and impact areas

A forecast cone or potential-track area represents uncertainty in the future location of the cyclone centre. It is not the boundary of damaging wind, rainfall, flooding, waves, or storm surge. Those hazards may extend well outside the centre-track probability area.

Typhoon Vision visually separates:

- centre-track probability/uncertainty area;
- official or estimated wind radii;
- user-location distance;
- non-official trend reference.

## Responsive design

### Desktop

- persistent storm/region rail;
- large map-first workspace;
- optional risk inspector that overlays the map rather than permanently shrinking it;
- larger typography for storm cards, map controls, source records, and advice;
- compact node detail card and professional-layer shortcuts.

### Mobile

- map occupies most of the initial screen;
- horizontally scrollable hazard shortcuts;
- compact storm summary;
- weather-style playback control;
- three-position bottom sheet: collapsed, half, and full;
- large touch targets and reduced map-label density.

## Languages and themes

The interface currently supports:

- Simplified Chinese;
- English;
- Japanese;
- Korean;
- Spanish;
- French.

Users can select light, dark, or system appearance. Language, theme, view mode, layers, forecast horizon, profile, and location preference are stored locally.

## Project structure

```text
.
├── index.html
├── app.js
├── styles.css
├── README.md
├── VERSION.txt
├── netlify.toml
├── data/
│   └── world-land.json
└── netlify/
    └── functions/
        └── cyclone-data.mts
```

## Netlify deployment

Connect the GitHub repository to the existing Netlify project. The repository root must directly contain `index.html`, `netlify.toml`, and the `netlify/` directory.

`netlify.toml` configures:

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

After deployment, verify:

1. the deploy state is `ready`;
2. the generated page is `/index.html`, not a nested folder path;
3. the deploy summary reports a function;
4. `https://<site>.netlify.app/api/cyclones` returns JSON;
5. the page displays `Public v11`.

## Local development

With Netlify CLI installed:

```bash
netlify dev
```

Then open:

```text
http://localhost:8888
http://localhost:8888/api/cyclones
```

The static interface can also be previewed with any local HTTP server, but the API function requires Netlify Dev or a published deploy.

## Environment variables

Secrets and API keys must never be embedded in `app.js` or `index.html`. Store them as Netlify environment variables and read them inside Functions with `Netlify.env.get()`.

## Accessibility and privacy

- keyboard-visible focus states;
- reduced-motion support;
- semantic controls and labels;
- minimum touch-target sizing on mobile;
- geolocation requested only after user action;
- user location retained locally and removable at any time;
- no location is sent to the cyclone aggregation Function.

## Current limitations

- data formats vary across meteorological agencies and can change without notice;
- JMA XML forecast-point parsing remains defensive and may occasionally fall back to a labelled trend reference;
- official asymmetric wind-radius quadrants are not yet available for every basin;
- satellite, radar, rainfall, and surge products currently open the relevant official service instead of being composited into the canvas;
- personal impact calculations do not model terrain, drainage, building vulnerability, surge hydrodynamics, or numerical rainfall fields;
- historical analogues are curated examples rather than a full IBTrACS similarity engine.

## Planned work

- direct ingestion of NHC GIS track, cone, wind-radii, probability, and arrival-time products;
- official quadrant wind-radius support;
- basin-specific forecast-error cones;
- CWA authenticated dataset integration;
- official rainfall, radar, satellite, wave, and surge overlays;
- full IBTrACS analogue search;
- local-government warning polygons and evacuation-zone links;
- automated parser health tests and source-change alerts.

## Disclaimer

Typhoon Vision is an educational and experimental information interface. Forecasts and warnings can change rapidly. Always consult the responsible meteorological agency and local emergency authorities before making safety, travel, work, school, marine, or evacuation decisions.
