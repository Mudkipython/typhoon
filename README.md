# Typhoon Vision

**Typhoon Vision Public v13** is a multilingual, public-friendly tropical cyclone intelligence prototype designed for Netlify. It combines official and supporting cyclone feeds, global vector maps, satellite imagery, radar replay, personal impact estimates, professional track tools, and an optional 3D cyclone visualisation.

> Typhoon Vision is an information-integration and visualisation project. It is not an official warning service and must not replace alerts, evacuation orders, closures, or emergency instructions issued by national and local authorities.

## Live deployment

Default production URL:

```text
https://typhoon-vision.netlify.app
```

Expected API endpoints after a successful Git-based or Netlify CLI deployment:

```text
https://typhoon-vision.netlify.app/api/cyclones
https://typhoon-vision.netlify.app/api/weather-layers
```

## Product goals

The project is designed around two complementary audiences:

### Public view

Public view answers practical questions before showing technical parameters:

- Where is the cyclone moving?
- When may it come closest to the selected location?
- What are the likely wind, rain, and coastal hazards?
- What should commuters, drivers, outdoor users, office workers, families, and coastal residents do?
- Which meteorological authority is responsible for the basin?
- Do supporting sources broadly agree?

### Professional view

Professional view exposes the supporting meteorological detail:

- Centre coordinates
- Maximum sustained wind
- Central pressure
- Intensity classification
- Observed and forecast track nodes
- Forecast uncertainty corridor
- Wind or estimated impact radius
- Responsible regional authority
- Source status and update information

## Visual modes

### Standard map

The default map prioritises readability and operational use:

- Observed track: cyan solid line
- Official forecast: orange dashed line
- Non-official trend reference: violet dotted line
- Forecast uncertainty: translucent corridor
- Wind or estimated impact radius: translucent area
- Intensity-coloured track nodes
- Major cities screened by distance to the track
- User location and nearest-track relationship

### Globe

MapLibre's globe projection provides a global overview of active systems. It is intended for orientation rather than detailed local impact analysis.

### 3D cyclone

The optional **3D Cyclone** mode uses a Three.js custom layer rendered inside the same WebGL canvas as MapLibre. It adds:

- GPU-driven spiral wind particles
- Hemisphere-aware rotation direction
- A luminous eyewall and dark eye
- A pressure-core funnel
- An elevated observed and forecast trail
- A cinematic camera angle
- A compact live HUD for wind, pressure, wind radius, authority, and time
- Adjustable quality settings
- Optional camera following during timeline playback

The 3D particles, eyewall, and pressure funnel are visual encodings. They do not claim to reproduce the true three-dimensional cloud structure or exact wind vector field. Track positions and displayed meteorological values come from the selected cyclone data.

## Performance strategy

The 3D effect supports four quality profiles:

| Mode | Approximate particle count | Intended use |
|---|---:|---|
| Auto | Device-dependent | Recommended default |
| High | 7,600 | Desktops with stronger GPUs |
| Balanced | 3,600 | Typical laptops and modern phones |
| Battery saver | 1,300 | Low-power or older devices |

Automatic quality considers device memory, CPU concurrency, mobile viewport size, and the user's reduced-motion preference.

Users may independently disable:

- Wind particles
- Eyewall and pressure core
- Elevated 3D trail
- Camera follow

## Weather and map layers

### Basemap

- MapLibre GL JS
- OpenFreeMap vector styles
- OpenStreetMap-derived geography and labels

### Satellite imagery

NASA GIBS true-colour VIIRS imagery is exposed through `/api/weather-layers` and added as a raster layer. The interface uses a dated global layer because same-day global coverage may still be incomplete.

### Radar replay

RainViewer's public weather-maps endpoint supplies recent radar frames and coverage tiles. The user can switch the bottom timeline between cyclone-track playback and radar replay.

Radar coverage is not global or uniform. The optional coverage layer distinguishes areas with no detected echo from areas without radar coverage.

## Tropical cyclone data architecture

The Netlify Function at `netlify/functions/cyclone-data.mts` normalises multiple sources into one frontend model.

Current connectors include or inspect:

- **JMA / RSMC Tokyo** — western North Pacific and South China Sea
- **NOAA / NHC** — Atlantic and eastern Pacific active systems
- **PAGASA** — Philippine local bulletins and impact context
- **Hong Kong Observatory** — local warning summary
- **GDACS** — global disaster-impact context
- **Taiwan CWA** — connector position reserved for an authorised or API-key integration

The system follows a primary-authority rule:

1. Determine the basin.
2. Select the responsible WMO regional centre or national authority.
3. Use supporting sources to compare position, freshness, movement, and impact context.
4. Keep differences visible.
5. Do not average incompatible wind standards or warning levels.

## Global basin support

The interface recognises:

- Western North Pacific
- Atlantic
- Eastern and Central Pacific
- North Indian Ocean
- Southwest Indian Ocean
- Australian region
- South Pacific

The words *typhoon*, *hurricane*, and *tropical cyclone* describe the same broad class of storm in different basins. The interface uses basin-appropriate labels where possible.

## Personal impact mode

Users can:

- Authorise browser geolocation
- Pick a point directly on the map
- Clear the stored location

Calculations are performed in the browser and include:

- Nearest distance to the current track
- Estimated closest-approach time
- Broad possible impact window
- Estimate confidence
- Nearby major cities
- Scenario-based preparation advice

The selected location is stored only in the browser's local storage. It is not sent to the Netlify Functions or external weather providers.

## Activity profiles

Public advice can be tailored for:

- Commuting
- Outdoor activity
- Office work
- Driving
- Family and dependent care
- Coastal residence

Advice is organised into three phases:

- Now
- Before possible impact
- During the impact period

Official evacuation, closure, and emergency instructions always take precedence.

## Timeline and animation

The bottom timeline supports:

- Play and pause
- Manual scrubbing
- Observed and forecast node progression
- Radar-frame replay
- 1×, 1.5×, and 2× speed
- 3D cyclone centre movement
- Optional cinematic camera follow

The 3D layer uses the current timeline node as its centre, so the visual effect moves along the track rather than remaining fixed at the latest position.

## Internationalisation

The interface provides language options for:

- Simplified Chinese
- English
- Japanese
- Korean
- Spanish
- French

Chinese and English have the most complete text coverage. Additional translations cover the main navigation and public-facing controls; further translation review is recommended before production use.

## Themes and accessibility

- Light theme
- Dark theme
- System theme
- Keyboard focus indicators
- Reduced-motion support
- Touch-oriented mobile controls
- Responsive bottom sheet on phones
- Device-adaptive 3D quality

## Responsive layout

### Desktop

- Cyclone and basin rail on the left
- Large interactive map in the centre
- Public or professional insight panel on the right
- Optional cinematic HUD over the map

### Mobile

- Map-first layout
- Slide-in cyclone list
- Compact map toolbar
- Bottom timeline
- Three-state detail sheet: collapsed, half, full
- Reduced 3D particle count
- Condensed cinematic HUD

## Project structure

```text
index.html
styles.css
app.js
cyclone3d.js
README.md
VERSION.txt
netlify.toml
netlify/
└── functions/
    ├── cyclone-data.mts
    └── weather-layers.mts
```

## Deployment to Netlify

### Recommended: GitHub continuous deployment

Place all project files directly in the repository root. The root must contain `index.html`, not another wrapper folder.

The included `netlify.toml` specifies the static publish directory and Function directory. Connect the repository to the existing Netlify project, then push changes to the production branch.

A correct deployment summary should report deployed Functions rather than:

```text
No functions deployed
```

### Netlify CLI

```bash
npx netlify-cli login
npx netlify-cli link --id 542599d8-bfcd-4651-946c-5473c0c5bc7b
npx netlify-cli dev
npx netlify-cli deploy
npx netlify-cli deploy --prod
```

### ZIP drag-and-drop limitation

Dragging a ZIP or folder into Netlify Drop publishes static files only. It does not reliably package the Functions in `netlify/functions`. The page may load with demonstration data, while `/api/cyclones` and `/api/weather-layers` remain unavailable.

## Local development

No application build step is required.

With Netlify CLI:

```bash
npx netlify-cli dev
```

Then open:

```text
http://localhost:8888
```

Static-only inspection is also possible with a basic web server, but Function endpoints will not be available.

## External browser dependencies

The frontend currently loads:

- MapLibre GL JS from unpkg
- Three.js from jsDelivr
- OpenFreeMap styles and tiles

For a production-grade service, consider self-hosting pinned copies or adding a tested fallback CDN.

## Known limitations

- Some official public feeds provide only the latest centre position rather than a full machine-readable forecast track.
- A violet trend line may be generated when at least two observed points exist but official forecast nodes are unavailable. It is explicitly labelled non-official.
- Wind radii may be estimated when an official radius is not supplied.
- RainViewer is a third-party radar aggregation service and coverage varies by region.
- The 3D cyclone is an abstract visualisation, not a numerical weather model.
- Personal impact timing is an approximate distance-to-track calculation and does not model terrain, storm size, rainfall asymmetry, or storm surge.
- Translation completeness varies by language.

## Safety notice

Always verify information with the responsible meteorological authority and local emergency-management agency. Do not use this prototype as the sole basis for evacuation, marine navigation, aviation, school closure, work closure, or other safety-critical decisions.
