# Typhoon Vision

Typhoon Vision is a multilingual, map-first tropical-cyclone information and personal-impact prototype designed for deployment on Netlify.

It combines cyclone tracks, forecast uncertainty, wind radii, satellite imagery, radar replay, major-city screening, browser geolocation, scenario-based preparedness guidance, historical analogue context, and a professional data view in one responsive interface.

> This project is an information-integration and visualisation prototype. It does not issue official warnings and must not replace alerts, closures, evacuation orders, or emergency instructions from national and local authorities.

## Live site

```text
https://typhoon-vision.netlify.app
```

Expected Netlify Function endpoints:

```text
https://typhoon-vision.netlify.app/api/cyclones
https://typhoon-vision.netlify.app/api/weather-layers
```

## Product goals

Typhoon Vision is designed around four questions ordinary users actually ask:

1. Where is the cyclone and where is it moving?
2. When may it come closest to me?
3. What hazards could affect my location?
4. What should I do for commuting, driving, outdoor activity, office work, family care, or coastal living?

A separate professional view exposes the underlying coordinates, wind, pressure, track points, source status, responsible authority, and uncertainty layers.

## Public v16 design principles

### 1. Meteorological structure instead of decorative “3D clouds”

The previous cinematic spiral effect has been replaced with a restrained meteorological overlay that is tied to cyclone data:

- Northern Hemisphere circulation is counter-clockwise.
- Southern Hemisphere circulation is clockwise.
- Tangential vector arrows represent the circulation pattern.
- 34 kt, 50 kt, and 64 kt wind radii are drawn as separate rings.
- Quadrant radii are used when an agency supplies northeast, southeast, southwest, and northwest values.
- Missing official radii are rendered as dashed estimates and labelled accordingly.
- Centre pressure and maximum wind are shown next to the cyclone centre.
- The active centre moves along the time-controlled track.
- Observed, official forecast, and non-official trend references retain distinct colours and line styles.

This overlay is an explanatory visual encoding, not a numerical weather-prediction model or a reconstruction of three-dimensional cloud volume.

### 2. Neutral geographic labelling

The base map uses an Esri no-label canvas layer. Political and country labels are not inherited from an external labelled style.

Typhoon Vision adds its own small set of geographic labels. Disputed areas use neutral geographic wording, for example:

```text
台湾地区
Taiwan area
```

These labels are intended only for weather-map orientation and do not express a sovereignty determination.

### 3. Map-first layout

Desktop:

- Full-size map workspace
- Collapsible cyclone list
- Collapsible personal-impact drawer
- Compact summary card
- Floating layer controls
- Bottom playback timeline

Mobile:

- Map remains the primary view
- Cyclone list slides in from the left
- Details use a three-state bottom sheet
- The bottom sheet can be collapsed, half opened, or fully opened
- Weather and track controls remain reachable with one hand

### 4. Source transparency

The responsible basin authority is treated as the primary source. Supporting sources are used only to cross-check location, update time, movement, and impact context.

Different wind-averaging standards and warning systems are not silently averaged.

## Main map layers

### Cyclone track

- Cyan solid line: observed track
- Orange dashed line: official forecast track
- Violet dotted line: non-official directional trend reference
- Node colour: intensity at that time
- Grey dashed line: optional historical analogue track

The full track remains visible while the moving centre and animated trail follow the playback timeline.

### Forecast uncertainty

The orange translucent corridor represents possible centre-track uncertainty. It is not the full boundary of wind, rain, flooding, or storm-surge impacts.

### Wind radii

The map distinguishes:

- 34 kt tropical-storm-force wind radius
- 50 kt strong-wind radius
- 64 kt hurricane/typhoon-force radius

Official quadrant radii are preferred. If unavailable, the interface clearly marks estimated symmetric radii.

### Cities and personal location

The application can display:

- Major cities near the track
- Distance from each city to the track
- A user-selected location
- A line from the selected location to the nearest track point
- Estimated closest-approach time and broad impact window

The location is stored only in the browser and is not sent to the weather providers or Netlify Functions.

## Satellite imagery

Satellite imagery uses NASA Global Imagery Browse Services (GIBS).

Configured layer:

```text
MODIS_Terra_CorrectedReflectance_TrueColor
```

Access method:

```text
NASA GIBS WMTS, EPSG:3857, GoogleMapsCompatible_Level9
```

The application requests a date two UTC days before the current date because daily true-colour composites can be incomplete on the current day.

NASA GIBS is a public service and does not require an account or API key for this use.

Documentation:

```text
https://nasa-gibs.github.io/gibs-api-docs/access-basics/
```

## Radar replay

Radar metadata and tiles use the RainViewer public Weather Maps API.

The Function reads:

```text
https://api.rainviewer.com/public/weather-maps.json
```

The documented radar-tile pattern is:

```text
{host}{path}/256/{z}/{x}/{y}/{color}/{smooth}_{snow}.png
```

The current implementation uses colour scheme `2` and smoothed rain display.

RainViewer’s public endpoint does not require a user login or API key. A transparent map can still mean:

- no significant radar echo,
- no ground-radar coverage,
- a temporary tile-network failure, or
- a region outside the useful zoom/coverage range.

The interface also exposes a radar-coverage mask to help distinguish no echo from no coverage.

Documentation:

```text
https://www.rainviewer.com/api/weather-maps-api.html
```

## Global tropical-cyclone basins

The interface recognises:

- Western North Pacific
- Atlantic
- Eastern and Central Pacific
- North Indian Ocean
- Southwest Indian Ocean
- Australian region
- South Pacific

The same broad phenomenon may be called a typhoon, hurricane, or tropical cyclone depending on the basin.

## Data sources

The cyclone Function normalises or checks data from sources such as:

- JMA / RSMC Tokyo
- NOAA / National Hurricane Center
- PAGASA
- Hong Kong Observatory
- GDACS
- Additional regional connectors reserved for later authorised integrations

Example normalised object:

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
  "windRadii": {
    "radiusKm": 420
  },
  "track": []
}
```

## Personal impact mode

Users can:

- authorise browser geolocation,
- select a point on the map,
- clear the saved location.

The browser estimates:

- nearest distance to the track,
- closest-approach time,
- a broad possible impact window,
- estimate confidence,
- nearby cities and hazards.

These are screening estimates, not local official forecasts.

## Scenario-based preparedness guidance

Advice profiles include:

- Commuting
- Outdoor activity
- Office work
- Driving
- Family and dependent care
- Coastal residence

Each profile separates:

- actions to take now,
- actions before possible impact,
- actions during the impact period.

## Historical analogue context

Selected historical cases are ranked using a simplified comparison of:

- track direction,
- intensity range,
- basin,
- possible impact region,
- proximity to a user-selected location.

Each case explains why it was selected, the historical impact type, a preparedness lesson, and why the current event may differ.

Historical similarity is contextual. It is not used to predict casualties, damage, landfall, or losses.

## Internationalisation

The interface includes:

- Simplified Chinese
- English
- Japanese
- Korean
- Spanish
- French

Chinese and English contain the full interface copy. Other languages use translated core navigation with English fallback for specialist text.

## File structure

```text
index.html
app.js
cyclone3d.js
styles.css
README.md
VERSION.txt
netlify.toml
netlify/
  functions/
    cyclone-data.mts
    weather-layers.mts
```

## Netlify deployment

### Recommended: GitHub continuous deployment

1. Extract the ZIP.
2. Upload the contents directly to the GitHub repository root.
3. Do not upload the outer `typhoon-vision-public-v16` folder as another nested directory.
4. Confirm the repository root directly contains `index.html` and `netlify.toml`.
5. Netlify will build and publish automatically.

Expected `netlify.toml` settings:

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

### Manual CLI deployment

```bash
npx netlify-cli login
npx netlify-cli link
npx netlify-cli deploy
npx netlify-cli deploy --prod
```

A simple ZIP drag-and-drop deploy publishes static files but may not deploy Netlify Functions.

## Deployment verification

After deployment, verify:

1. The header shows `Public v16`.
2. The map loads without inherited country labels.
3. `台湾地区` or `Taiwan area` appears as the neutral application label.
4. Observed and forecast tracks are visible immediately.
5. The cyclone structure layer shows wind vectors, wind radii, pressure, and wind.
6. Both side panels can be opened and closed.
7. The following endpoints return JSON:

```text
/api/cyclones
/api/weather-layers
```

8. NASA satellite imagery can be enabled.
9. RainViewer radar frames can be enabled and replayed.
10. Mobile details can be collapsed, half opened, and fully opened.

## Known limitations

- Global radar coverage is uneven.
- Satellite true-colour imagery is daily, not minute-by-minute cloud analysis.
- Some agencies publish only a current centre point in easily parsed feeds.
- Wind radii may be estimated when official quadrant data are unavailable.
- The trend-reference path is not an official forecast.
- Historical analogue scoring is explanatory, not predictive.
- Public third-party tile services do not provide a production SLA.

## Privacy

- Browser location is stored locally.
- No location is sent to Netlify Functions.
- No advertising or user-tracking SDK is included.
- Weather API keys are not exposed in client-side code.

## Disclaimer

Typhoon Vision does not replace any national meteorological agency, emergency-management authority, evacuation order, closure notice, or local warning. Always follow the responsible official authority for the affected location.
