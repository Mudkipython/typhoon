(() => {
  'use strict';

  const emptyFC = () => ({ type: 'FeatureCollection', features: [] });
  const lineFeature = (points, properties = {}) => ({
    type: 'Feature',
    properties,
    geometry: { type: 'LineString', coordinates: points.map((p) => [Number(p.lon), Number(p.lat)]) }
  });
  const pointFeature = (point, properties = {}) => ({
    type: 'Feature',
    properties,
    geometry: { type: 'Point', coordinates: [Number(point.lon), Number(point.lat)] }
  });
  const polygonFeature = (coordinates, properties = {}) => ({
    type: 'Feature',
    properties,
    geometry: { type: 'Polygon', coordinates: [coordinates.map((p) => Array.isArray(p) ? p : [Number(p.lon), Number(p.lat)])] }
  });

  function graticule() {
    const features = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const coords = [];
      for (let lon = -180; lon <= 180; lon += 3) coords.push([lon, lat]);
      features.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } });
    }
    for (let lon = -150; lon <= 180; lon += 30) {
      const coords = [];
      for (let lat = -80; lat <= 80; lat += 3) coords.push([lon, lat]);
      features.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } });
    }
    return { type: 'FeatureCollection', features };
  }

  function safeSetData(map, id, data) {
    const source = map?.getSource?.(id);
    if (source?.setData) source.setData(data || emptyFC());
  }

  function setVisibility(map, ids, visible) {
    for (const id of ids) {
      if (map?.getLayer?.(id)) map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none');
    }
  }

  class FormalCycloneMap {
    constructor(options = {}) {
      this.container = options.container;
      this.landUrl = options.landUrl || './data/world-land.json';
      this.onPointClick = options.onPointClick || (() => {});
      this.onMapClick = options.onMapClick || (() => {});
      this.onReady = options.onReady || (() => {});
      this.onFailure = options.onFailure || (() => {});
      this.cityMarkers = [];
      this.userMarker = null;
      this.ready = false;
      this.payload = null;
      this.theme = options.theme || 'light';
      this.mode = options.mode || 'world';
      this._init();
    }

    _style() {
      const dark = this.theme === 'dark';
      return {
        version: 8,
        sources: {
          land: { type: 'geojson', data: this.landUrl },
          graticule: { type: 'geojson', data: graticule() }
        },
        layers: [
          { id: 'tv-background', type: 'background', paint: { 'background-color': dark ? '#071821' : '#eaf5f9' } },
          { id: 'tv-graticule', type: 'line', source: 'graticule', paint: { 'line-color': dark ? 'rgba(121,175,191,.16)' : 'rgba(64,129,148,.13)', 'line-width': 0.8 } },
          { id: 'tv-land-fill', type: 'fill', source: 'land', paint: { 'fill-color': dark ? '#0d2832' : '#dcebed', 'fill-opacity': 1 } },
          { id: 'tv-land-line', type: 'line', source: 'land', paint: { 'line-color': dark ? '#31515d' : '#9db9c1', 'line-width': 0.8 } }
        ]
      };
    }

    _init() {
      try {
        if (!this.container || !window.maplibregl) throw new Error('MapLibre is unavailable');
        this.map = new maplibregl.Map({
          container: this.container,
          style: this._style(),
          center: [128, 20],
          zoom: 2.4,
          minZoom: 0.8,
          maxZoom: 8,
          maxPitch: 65,
          attributionControl: true,
          renderWorldCopies: true,
          dragRotate: false,
          pitchWithRotate: false,
          cooperativeGestures: false
        });
        this.map.addControl(new maplibregl.NavigationControl({ showCompass: false, showZoom: true }), 'bottom-right');
        this.map.once('load', () => {
          this.ready = true;
          this._installDataLayers();
          this._bindEvents();
          this.setProjection(this.mode);
          if (this.payload) this.setData(this.payload);
          this.onReady(this);
        });
        this.map.on('error', (event) => {
          const message = event?.error?.message || String(event?.error || 'Map error');
          console.warn('Formal map error:', message);
        });
      } catch (error) {
        console.warn('Formal map unavailable:', error);
        this.onFailure(error);
      }
    }

    _addSource(id) {
      if (!this.map.getSource(id)) this.map.addSource(id, { type: 'geojson', data: emptyFC() });
    }

    _addLayer(layer, beforeId) {
      if (!this.map.getLayer(layer.id)) this.map.addLayer(layer, beforeId);
    }

    _installDataLayers() {
      const map = this.map;
      [
        'tv-cone', 'tv-wind', 'tv-observed-full', 'tv-forecast-full', 'tv-trend-full',
        'tv-observed-active', 'tv-forecast-active', 'tv-trend-active', 'tv-points',
        'tv-cities', 'tv-user', 'tv-user-link', 'tv-history'
      ].forEach((id) => this._addSource(id));

      this._addLayer({ id: 'tv-cone-fill', type: 'fill', source: 'tv-cone', paint: {
        'fill-color': ['case', ['==', ['get', 'kind'], 'trend'], '#8b5cf6', '#f97316'],
        'fill-opacity': ['case', ['==', ['get', 'kind'], 'trend'], 0.09, 0.16]
      }});
      this._addLayer({ id: 'tv-cone-outline', type: 'line', source: 'tv-cone', paint: {
        'line-color': ['case', ['==', ['get', 'kind'], 'trend'], '#8b5cf6', '#f97316'],
        'line-opacity': 0.72,
        'line-width': 1.4,
        'line-dasharray': [2, 2]
      }});

      this._addLayer({ id: 'tv-wind-fill', type: 'fill', source: 'tv-wind', paint: {
        'fill-color': ['coalesce', ['get', 'fill'], '#facc15'],
        'fill-opacity': ['coalesce', ['get', 'opacity'], 0.13]
      }});
      this._addLayer({ id: 'tv-wind-outline', type: 'line', source: 'tv-wind', paint: {
        'line-color': ['coalesce', ['get', 'stroke'], '#d99a16'],
        'line-width': 1.3,
        'line-opacity': 0.75,
        'line-dasharray': [3, 2]
      }});

      this._addLayer({ id: 'tv-history-line', type: 'line', source: 'tv-history', paint: {
        'line-color': '#64748b', 'line-width': 2, 'line-opacity': 0.58, 'line-dasharray': [2, 2]
      }});

      this._addLayer({ id: 'tv-observed-full-line', type: 'line', source: 'tv-observed-full', paint: {
        'line-color': '#09a7c4', 'line-width': 5.5, 'line-opacity': 0.20
      }});
      this._addLayer({ id: 'tv-forecast-full-line', type: 'line', source: 'tv-forecast-full', paint: {
        'line-color': '#f97316', 'line-width': 4.2, 'line-opacity': 0.22, 'line-dasharray': [2.5, 2]
      }});
      this._addLayer({ id: 'tv-trend-full-line', type: 'line', source: 'tv-trend-full', paint: {
        'line-color': '#8b5cf6', 'line-width': 4, 'line-opacity': 0.22, 'line-dasharray': [0.6, 1.8]
      }});
      this._addLayer({ id: 'tv-observed-active-line', type: 'line', source: 'tv-observed-active', paint: {
        'line-color': '#09a7c4', 'line-width': 3.8, 'line-opacity': 0.98
      }});
      this._addLayer({ id: 'tv-forecast-active-line', type: 'line', source: 'tv-forecast-active', paint: {
        'line-color': '#f97316', 'line-width': 3.2, 'line-opacity': 0.98, 'line-dasharray': [2.5, 2]
      }});
      this._addLayer({ id: 'tv-trend-active-line', type: 'line', source: 'tv-trend-active', paint: {
        'line-color': '#8b5cf6', 'line-width': 3.2, 'line-opacity': 0.98, 'line-dasharray': [0.55, 1.65]
      }});

      this._addLayer({ id: 'tv-user-link-line', type: 'line', source: 'tv-user-link', paint: {
        'line-color': '#0f6b83', 'line-width': 1.6, 'line-opacity': 0.7, 'line-dasharray': [2, 2]
      }});

      this._addLayer({ id: 'tv-city-circles', type: 'circle', source: 'tv-cities', paint: {
        'circle-radius': ['case', ['==', ['get', 'risk'], 'high'], 6, ['==', ['get', 'risk'], 'medium'], 5, 4],
        'circle-color': ['match', ['get', 'risk'], 'high', '#ef4444', 'medium', '#f59e0b', '#22a56a'],
        'circle-stroke-color': '#ffffff', 'circle-stroke-width': 1.8, 'circle-opacity': 0.96
      }});

      this._addLayer({ id: 'tv-track-points', type: 'circle', source: 'tv-points', paint: {
        'circle-radius': ['case', ['boolean', ['get', 'current'], false], 8.5, 5.4],
        'circle-color': ['get', 'color'],
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': ['case', ['boolean', ['get', 'current'], false], 2.6, 1.6],
        'circle-opacity': 1
      }});

      this._addLayer({ id: 'tv-user-halo', type: 'circle', source: 'tv-user', paint: {
        'circle-radius': 12, 'circle-color': '#0f6b83', 'circle-opacity': 0.18
      }});
      this._addLayer({ id: 'tv-user-point', type: 'circle', source: 'tv-user', paint: {
        'circle-radius': 6.5, 'circle-color': '#ffffff', 'circle-stroke-color': '#0f6b83', 'circle-stroke-width': 3
      }});
    }

    _bindEvents() {
      this.map.on('click', 'tv-track-points', (event) => {
        const feature = event.features?.[0];
        if (!feature) return;
        const index = Number(feature.properties?.index);
        if (Number.isFinite(index)) this.onPointClick(index, event.lngLat);
      });
      this.map.on('mouseenter', 'tv-track-points', () => { this.map.getCanvas().style.cursor = 'pointer'; });
      this.map.on('mouseleave', 'tv-track-points', () => { this.map.getCanvas().style.cursor = ''; });
      this.map.on('click', (event) => this.onMapClick({ lat: event.lngLat.lat, lon: event.lngLat.lng }));
    }

    setTheme(theme) {
      this.theme = theme === 'dark' ? 'dark' : 'light';
      if (!this.ready) return;
      const dark = this.theme === 'dark';
      this.map.setPaintProperty('tv-background', 'background-color', dark ? '#071821' : '#eaf5f9');
      this.map.setPaintProperty('tv-graticule', 'line-color', dark ? 'rgba(121,175,191,.16)' : 'rgba(64,129,148,.13)');
      this.map.setPaintProperty('tv-land-fill', 'fill-color', dark ? '#0d2832' : '#dcebed');
      this.map.setPaintProperty('tv-land-line', 'line-color', dark ? '#31515d' : '#9db9c1');
    }

    setProjection(mode) {
      this.mode = mode === 'globe' ? 'globe' : 'world';
      if (!this.ready || !this.map.setProjection) return;
      try {
        this.map.setProjection({ type: this.mode === 'globe' ? 'globe' : 'mercator' });
        this.map.easeTo({ pitch: 0, bearing: 0, duration: 300 });
      } catch (error) {
        console.warn('Projection switch failed:', error);
      }
    }

    setData(payload) {
      this.payload = payload;
      if (!this.ready) return;
      const p = payload || {};
      const observedFull = p.observed || [];
      const officialFull = p.officialForecast || [];
      const trendFull = p.trendForecast || [];
      const observedActive = p.observedActive || [];
      const officialActive = p.officialActive || [];
      const trendActive = p.trendActive || [];

      safeSetData(this.map, 'tv-observed-full', observedFull.length > 1 ? { type: 'FeatureCollection', features: [lineFeature(observedFull)] } : emptyFC());
      safeSetData(this.map, 'tv-forecast-full', officialFull.length ? { type: 'FeatureCollection', features: [lineFeature([observedFull.at(-1), ...officialFull].filter(Boolean))] } : emptyFC());
      safeSetData(this.map, 'tv-trend-full', trendFull.length ? { type: 'FeatureCollection', features: [lineFeature([observedFull.at(-1), ...trendFull].filter(Boolean))] } : emptyFC());
      safeSetData(this.map, 'tv-observed-active', observedActive.length > 1 ? { type: 'FeatureCollection', features: [lineFeature(observedActive)] } : emptyFC());
      safeSetData(this.map, 'tv-forecast-active', officialActive.length ? { type: 'FeatureCollection', features: [lineFeature([observedActive.at(-1) || observedFull.at(-1), ...officialActive].filter(Boolean))] } : emptyFC());
      safeSetData(this.map, 'tv-trend-active', trendActive.length ? { type: 'FeatureCollection', features: [lineFeature([observedActive.at(-1) || observedFull.at(-1), ...trendActive].filter(Boolean))] } : emptyFC());

      const pointFeatures = (p.points || []).map((point, index) => pointFeature(point, {
        index,
        color: point.color || '#64748b',
        kind: point.synthetic ? 'trend' : point.forecast ? 'forecast' : 'observed',
        current: index === p.activeIndex,
        wind: Number.isFinite(Number(point.windMs)) ? Number(point.windMs) : null,
        pressure: Number.isFinite(Number(point.pressureHpa)) ? Number(point.pressureHpa) : null,
        time: point.time || ''
      }));
      safeSetData(this.map, 'tv-points', { type: 'FeatureCollection', features: pointFeatures });

      const coneFeature = p.cone?.length >= 4 ? polygonFeature(p.cone, { kind: p.usingTrend ? 'trend' : 'official' }) : null;
      safeSetData(this.map, 'tv-cone', coneFeature ? { type: 'FeatureCollection', features: [coneFeature] } : emptyFC());

      const windFeatures = (p.windAreas || []).map((area) => polygonFeature(area.coordinates, {
        estimated: Boolean(area.estimated),
        fill: area.fill || '#facc15',
        stroke: area.stroke || '#d99a16',
        opacity: Number.isFinite(area.opacity) ? area.opacity : 0.13,
        radiusKm: area.radiusKm || null
      }));
      safeSetData(this.map, 'tv-wind', { type: 'FeatureCollection', features: windFeatures });

      const cityFeatures = (p.cities || []).map((city) => pointFeature(city, {
        id: city.id,
        name: city.name,
        risk: city.risk,
        distance: Math.round(city.distance || 0)
      }));
      safeSetData(this.map, 'tv-cities', { type: 'FeatureCollection', features: cityFeatures });

      const user = p.userLocation;
      safeSetData(this.map, 'tv-user', user ? { type: 'FeatureCollection', features: [pointFeature(user)] } : emptyFC());
      safeSetData(this.map, 'tv-user-link', user && p.userNearest ? { type: 'FeatureCollection', features: [lineFeature([user, p.userNearest])] } : emptyFC());
      safeSetData(this.map, 'tv-history', p.history?.length > 1 ? { type: 'FeatureCollection', features: [lineFeature(p.history)] } : emptyFC());

      const layers = p.layers || {};
      setVisibility(this.map, ['tv-observed-full-line', 'tv-forecast-full-line', 'tv-trend-full-line', 'tv-observed-active-line', 'tv-forecast-active-line', 'tv-trend-active-line', 'tv-track-points'], layers.track !== false);
      setVisibility(this.map, ['tv-cone-fill', 'tv-cone-outline'], layers.cone !== false);
      setVisibility(this.map, ['tv-wind-fill', 'tv-wind-outline'], layers.wind !== false);
      setVisibility(this.map, ['tv-city-circles'], layers.labels !== false);
      setVisibility(this.map, ['tv-user-link-line', 'tv-user-halo', 'tv-user-point'], true);
      setVisibility(this.map, ['tv-history-line'], Boolean(p.history?.length));
      this._renderCityMarkers(p.cities || [], layers.labels !== false);
    }

    _renderCityMarkers(cities, visible) {
      for (const marker of this.cityMarkers) marker.remove();
      this.cityMarkers = [];
      if (!visible) return;
      for (const city of cities.slice(0, 18)) {
        const el = document.createElement('div');
        el.className = `formal-city-label risk-${city.risk || 'low'}`;
        el.innerHTML = `<span></span><b>${String(city.name || '')}</b>`;
        el.title = `${city.name || ''} · ${Math.round(city.distance || 0)} km`;
        const marker = new maplibregl.Marker({ element: el, anchor: 'left', offset: [3, 0] })
          .setLngLat([Number(city.lon), Number(city.lat)])
          .addTo(this.map);
        this.cityMarkers.push(marker);
      }
    }

    fitWorld(animate = true) {
      if (!this.ready) return;
      this.map.easeTo({ center: [0, 8], zoom: 1.15, pitch: 0, bearing: 0, duration: animate ? 650 : 0 });
    }

    fitStorm(points, userLocation, animate = true) {
      if (!this.ready || !points?.length) return;
      try {
        const bounds = new maplibregl.LngLatBounds();
        points.forEach((point) => bounds.extend([Number(point.lon), Number(point.lat)]));
        if (userLocation) bounds.extend([Number(userLocation.lon), Number(userLocation.lat)]);
        const mobile = window.innerWidth <= 760;
        this.map.fitBounds(bounds, {
          padding: mobile ? { top: 105, bottom: 190, left: 38, right: 38 } : { top: 115, bottom: 125, left: 115, right: 115 },
          maxZoom: 5.6,
          duration: animate ? 700 : 0
        });
      } catch (error) {
        console.warn('Fit storm failed:', error);
      }
    }

    resize() { this.map?.resize?.(); }
  }

  window.FormalCycloneMap = FormalCycloneMap;
})();
