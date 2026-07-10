# Typhoon Vision

Typhoon Vision is a multilingual, map-first tropical-cyclone intelligence prototype designed for deployment on Netlify. It brings together cyclone tracks, forecast uncertainty, wind-impact areas, global cities, satellite imagery, radar replay, personal-location estimates, scenario-based preparedness guidance, historical analogues, and an optional cinematic cyclone view.

The project is intended for public communication, education, product prototyping, and geospatial interface research. It does **not** issue official warnings and must not replace alerts, evacuation orders, closures, or emergency instructions from national and local authorities.

## Live deployment

Default production URL:

```text
https://typhoon-vision.netlify.app
```

Expected serverless endpoints after a complete Git-based or Netlify CLI deployment:

```text
https://typhoon-vision.netlify.app/api/cyclones
https://typhoon-vision.netlify.app/api/weather-layers
```

## Product principles

### Map first

The cyclone map is the primary workspace. On desktop, the storm list may be collapsed and the impact panel opens as an on-demand drawer. On mobile, details are presented through a bottom sheet so the map remains visible.

### Public explanation before technical parameters

Public view answers practical questions:

- Where is the cyclone moving?
- When may it come closest to a selected location?
- Which hazards are most relevant?
- What should a commuter, driver, outdoor user, office worker, family caregiver, or coastal resident do?
- Which agency is responsible for the basin?

Professional view exposes the underlying coordinates, wind, pressure, track points, source status, and responsible authority.

### Source transparency

The responsible regional or national meteorological authority is treated as the primary source. Supporting sources are used for cross-checking position, update time, movement, and impact context. Values based on incompatible wind standards or warning systems are not silently averaged.

### Explicit uncertainty

The application distinguishes:

- Observed track
- Official forecast track
- Non-official directional trend reference
- Forecast uncertainty corridor
- Official or estimated wind-impact radius
- Historical analogue track

A forecast cone is not presented as the complete boundary of wind, rain, flooding, or storm-surge impacts.

## Main features

### Global cyclone list

The interface recognises the principal tropical-cyclone basins:

- Western North Pacific
- Atlantic
- Eastern and Central Pacific
- North Indian Ocean
- Southwest Indian Ocean
- Australian region
- South Pacific

The same broad phenomenon may be called a typhoon, hurricane, or tropical cyclone depending on the basin.

### Professional track map

The default MapLibre map includes:

- Cyan solid observed track
- Orange dashed official forecast
- Violet dotted non-official trend reference
- Translucent forecast uncertainty corridor
- Wind or estimated impact area
- Intensity-coloured track nodes
- Track-node popups with time, coordinates, wind, and pressure
- User location and nearest-track relationship
- Major cities screened by distance to the track

### Cinematic cyclone view

The optional **3D Cyclone** mode uses a screen-space Canvas effect anchored to MapLibre geographic coordinates. It provides:

- Perspective spiral wind particles
- Hemisphere-aware rotation
- Luminous eyewall and dark eye
- Layered pressure-core rings
- Elevated observed and forecast trails
- Cinematic map pitch and bearing
- A compact meteorological HUD
- Automatic desktop/mobile performance profiles

The particles, eyewall, vertical lift, and glow are visual encodings. They are not a reconstruction of the real three-dimensional cloud field or a numerical wind model.

### Satellite imagery

The weather-layer Function exposes NASA GIBS imagery using the public EPSG:3857 WMTS service. The default layer is:

```text
MODIS_Terra_CorrectedReflectance_TrueColor
```

The request uses GIBS' `default` time value so the service returns its latest available image instead of failing on a date with incomplete acquisition.

### Radar replay

RainViewer's public weather-maps feed supplies recent radar-frame metadata. Radar tiles are created from the API-provided `host` and `path` fields and follow the documented XYZ format.

The interface provides:

- Recent radar-frame replay
- Play, pause, and scrubbing
- Optional radar-coverage mask
- Load-state feedback
- Direct links to external official or provider viewers

A transparent radar layer may mean no significant echo, incomplete coverage, or unavailable data. It must not be interpreted as a guarantee of no precipitation.

### Personal impact mode

Users may:

- Authorise browser geolocation
- Pick a point on the map
- Clear the saved point

The browser calculates:

- Nearest distance to the track
- Estimated closest-approach time
- Broad possible impact window
- Estimate confidence
- Nearby affected cities

The selected location is stored locally in the browser and is not sent to the Netlify Functions or weather providers.

### Scenario-based preparedness guidance

Advice can be tailored for:

- Commuting
- Outdoor activity
- Office work
- Driving
- Family and dependent care
- Coastal residence

Guidance is divided into:

- Actions to take now
- Actions before possible impact
- Actions during the impact period

Official local instructions always take precedence.

### Historical analogue context

The public detail drawer includes selected historical cyclone cases. Cases are ranked by a simplified comparison of:

- Track direction
- Intensity range
- Basin
- Possible impact region
- Proximity to a user-selected location

Each case explains:

- Why it was selected
- Its principal historical impact type
- A useful preparedness lesson
- How it differs from the current event

A historical track can be overlaid as a grey dashed line. Analogue similarity is contextual and is not used to predict losses or claim that history will repeat.

### Geographic labelling

The application uses neutral geographic wording for disputed areas and avoids presenting application-specific labels as sovereignty determinations. It attempts to filter conflicting country-level labels from the external base style and adds a neutral application overlay. Because the external map style may change, this behaviour should be reviewed after style-provider updates.

## Data architecture

### `/api/cyclones`

The cyclone Function normalises information from or checks availability of sources such as:

- JMA / RSMC Tokyo
- NOAA / National Hurricane Center
- PAGASA
- Hong Kong Observatory
- GDACS
- Additional regional connectors reserved for authorised integrations

The normalised frontend model includes fields such as:

```json
{
  "id": "storm-id",
  "name": "BAVI",
  "basin": "Western North Pacific",
  "classification": "Typhoon",
  "lat": 23.9,
  "lon": 125.2,
  "windMs": 42,
  "pressureHpa": 955,
  "track": []
}
```

### `/api/weather-layers`

The weather-layer Function returns:

- NASA GIBS satellite tile template
- RainViewer radar frames
- Radar tile templates
- Radar coverage template
- Data generation timestamps and status

No client-side API secret is required for the currently configured public sources.

## Interface layout

### Desktop

- Collapsible cyclone rail
- Full map workspace
- Compact map summary
- On-demand impact drawer
- Floating layer controls
- Bottom playback timeline
- Automatic side-panel collapse in cinematic mode

### Mobile

- Map-first screen
- Slide-in cyclone list
- Compact controls
- Collapsed, half-height, and full-height detail sheet
- Reduced particle count and simplified cinematic HUD

## Internationalisation and appearance

The interface includes:

- Simplified Chinese
- English
- Japanese
- Korean
- Spanish
- French

The most complete copy is currently available in Chinese and English. Other languages use partial overrides with English fallback for untranslated strings.

Appearance options:

- Light
- Dark
- Follow system

## Project structure

```text
.
├── index.html
├── app.js
├── cyclone3d.js
├── styles.css
├── README.md
├── VERSION.txt
├── netlify.toml
├── data/
└── netlify/
    └── functions/
        ├── cyclone-data.mts
        └── weather-layers.mts
```

## Deployment to Netlify

### Recommended: Git-connected deployment

Upload the **contents** of the project folder to the repository root. The repository root must directly contain `index.html`, `netlify.toml`, and the `netlify/` directory.

Netlify reads:

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

A successful deployment should report two deployed Functions.

### Netlify CLI

```bash
npx netlify-cli login
npx netlify-cli link
npx netlify-cli dev
npx netlify-cli deploy
npx netlify-cli deploy --prod
```

Uploading only a ZIP through a static drop publishes the frontend but normally does not deploy the Functions.

## Verification checklist

After deployment, verify:

1. The header displays `Public v14`.
2. `/api/cyclones` returns JSON.
3. `/api/weather-layers` returns JSON.
4. The cyclone list populates.
5. Selecting a cyclone focuses the full track.
6. The details drawer opens without permanently reducing map width.
7. 3D Cyclone mode hides obstructive panels and displays the Canvas cyclone effect.
8. NASA satellite imagery produces a visible raster layer.
9. Radar replay exposes frame time and load status.
10. Historical analogue cards appear and a grey dashed path can be overlaid.
11. Mobile detail sheet supports collapsed, half, and full states.

## Accessibility and privacy

- Keyboard focus indicators are provided.
- Reduced-motion preferences lower animation intensity.
- Geolocation requires explicit browser permission.
- The selected location remains in browser storage.
- Microphone and camera access are disabled by Netlify response headers.

## Known limitations

- External tile services may be rate-limited or temporarily unavailable.
- Radar coverage is not uniform worldwide.
- Satellite imagery is not necessarily minute-by-minute.
- Some official feeds expose only the current centre rather than a complete forecast track.
- A violet trend line may be generated when an official forecast cannot be parsed; it is explicitly non-official.
- Historical analogues are a small curated demonstration catalogue rather than a full IBTrACS search engine.
- Base-map label behaviour may change when OpenFreeMap updates its external style.
- The personal-impact estimate is distance-based and does not replace local wind, rainfall, surge, terrain, or hydrological forecasts.

## Disclaimer

Typhoon Vision is a prototype for information integration and visualisation. Always follow the responsible meteorological agency and the relevant local emergency-management authority.
