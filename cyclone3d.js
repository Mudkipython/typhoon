(() => {
  'use strict';

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const DEG = Math.PI / 180;
  const mobile = () => matchMedia('(max-width: 760px)').matches;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  function destination(point, bearing, km) {
    const R = 6371;
    const d = km / R;
    const t = bearing * DEG;
    const p1 = point.lat * DEG;
    const l1 = point.lon * DEG;
    const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(t));
    const l2 = l1 + Math.atan2(
      Math.sin(t) * Math.sin(d) * Math.cos(p1),
      Math.cos(d) - Math.sin(p1) * Math.sin(p2),
    );
    return { lat: p2 / DEG, lon: ((l2 / DEG + 540) % 360) - 180 };
  }

  function interpolate(points, progress) {
    if (!points?.length) return null;
    if (points.length === 1) return { ...points[0] };
    const value = clamp(progress, 0, 1) * (points.length - 1);
    const index = Math.min(points.length - 2, Math.floor(value));
    const t = value - index;
    const a = points[index];
    const b = points[index + 1];
    const lerp = (x, y) => Number(x) + (Number(y) - Number(x)) * t;
    return {
      ...(t < 0.5 ? a : b),
      lat: lerp(a.lat, b.lat),
      lon: lerp(a.lon, b.lon),
      windMs: Number.isFinite(+a.windMs) && Number.isFinite(+b.windMs)
        ? lerp(a.windMs, b.windMs)
        : (+a.windMs || +b.windMs || 0),
      pressureHpa: Number.isFinite(+a.pressureHpa) && Number.isFinite(+b.pressureHpa)
        ? lerp(a.pressureHpa, b.pressureHpa)
        : (+a.pressureHpa || +b.pressureHpa || null),
      forecast: Boolean(a.forecast || b.forecast),
      trend: Boolean(a.trend || b.trend),
    };
  }

  function windColor(speed) {
    const s = Number(speed) || 0;
    if (s < 17) return '#3b82f6';
    if (s < 25) return '#eab308';
    if (s < 33) return '#f97316';
    if (s < 42) return '#ef4444';
    if (s < 51) return '#db2777';
    return '#7c3aed';
  }

  function normalizeQuadrants(value, fallback) {
    if (Number.isFinite(+value)) return { ne: +value, se: +value, sw: +value, nw: +value };
    if (!value || typeof value !== 'object') return { ne: fallback, se: fallback, sw: fallback, nw: fallback };
    const read = (...keys) => {
      for (const key of keys) if (Number.isFinite(+value[key])) return +value[key];
      return fallback;
    };
    return {
      ne: read('ne', 'NE', 'northeast'),
      se: read('se', 'SE', 'southeast'),
      sw: read('sw', 'SW', 'southwest'),
      nw: read('nw', 'NW', 'northwest'),
    };
  }

  function extractRadii(storm) {
    const raw = storm?.windRadii || {};
    const base = clamp(Number(storm?.radiusKm || raw.radiusKm || 260), 120, 700);
    const r34 = normalizeQuadrants(raw.r34 || raw.kt34 || raw.tropicalStorm || raw.radius34Km, base);
    const r50 = normalizeQuadrants(raw.r50 || raw.kt50 || raw.strong || raw.radius50Km, base * 0.60);
    const r64 = normalizeQuadrants(raw.r64 || raw.kt64 || raw.hurricane || raw.radius64Km, base * 0.34);
    const official = Boolean(raw.r34 || raw.kt34 || raw.tropicalStorm || raw.radius34Km || raw.quadrants);
    return { r34, r50, r64, official };
  }

  class MeteorologicalCycloneOverlay {
    constructor() {
      this.map = null;
      this.canvas = null;
      this.ctx = null;
      this.enabled = true;
      this.quality = 'auto';
      this.options = { particles: true, eyewall: true, trail: true };
      this.storm = null;
      this.raf = 0;
      this.startedAt = performance.now();
      this.resize = this.resize.bind(this);
      this.draw = this.draw.bind(this);
    }

    attach(map) {
      if (!map) return false;
      if (this.map === map) return true;
      this.map = map;
      const container = map.getContainer();
      let canvas = container.querySelector('#cycloneFxCanvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'cycloneFxCanvas';
        canvas.className = 'cyclone-fx-canvas meteorological-overlay';
        container.appendChild(canvas);
      }
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: true });
      map.on('resize', this.resize);
      ['move', 'zoom', 'rotate', 'pitch'].forEach(name => map.on(name, () => this.request()));
      this.resize();
      this.request();
      return true;
    }

    setEnabled(value) {
      this.enabled = Boolean(value);
      if (this.canvas) this.canvas.hidden = !this.enabled;
      this.request();
    }

    setQuality(value) {
      this.quality = value || 'auto';
      this.request();
    }

    setOptions(options) {
      this.options = { ...this.options, ...options };
      this.request();
    }

    setStorm(storm) {
      this.storm = storm ? { ...storm } : null;
      this.request();
    }

    resize() {
      if (!this.canvas || !this.map) return;
      const rect = this.map.getContainer().getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      this.canvas.width = Math.max(1, Math.round(rect.width * dpr));
      this.canvas.height = Math.max(1, Math.round(rect.height * dpr));
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;
      this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.request();
    }

    request() {
      if (!this.raf) this.raf = requestAnimationFrame(this.draw);
    }

    screenRadius(center, radiusKm) {
      if (!this.map) return 120;
      const a = this.map.project([center.lon, center.lat]);
      const b = this.map.project([destination(center, 90, radiusKm).lon, destination(center, 90, radiusKm).lat]);
      return clamp(Math.abs(b.x - a.x), mobile() ? 52 : 76, mobile() ? 180 : 290);
    }

    projectedQuadrantPoint(center, bearing, km) {
      const p = destination(center, bearing, km);
      return this.map.project([p.lon, p.lat]);
    }

    drawTrack(ctx, track, progress) {
      if (!this.options.trail || !track?.length || track.length < 2) return;
      const upto = clamp(progress, 0, 1);
      const count = Math.max(2, Math.floor((track.length - 1) * upto) + 2);
      const points = track.slice(0, Math.min(track.length, count));
      const tail = interpolate(track, upto);
      if (tail && points.at(-1) !== tail) points.push(tail);

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < points.length; i++) {
        const a = this.map.project([points[i - 1].lon, points[i - 1].lat]);
        const b = this.map.project([points[i].lon, points[i].lat]);
        const point = points[i];
        ctx.strokeStyle = point.trend ? '#8b5cf6' : point.forecast ? '#f97316' : '#0ea5e9';
        ctx.globalAlpha = 0.78;
        ctx.lineWidth = mobile() ? 2.5 : 3.2;
        ctx.setLineDash(point.trend ? [2, 8] : point.forecast ? [8, 7] : []);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawQuadrantRing(ctx, centerGeo, radii, color, label, dashed) {
      const bearings = [0, 90, 180, 270, 360];
      const values = [radii.ne, radii.se, radii.sw, radii.nw, radii.ne];
      const segments = 20;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = dashed ? 0.78 : 0.92;
      ctx.lineWidth = dashed ? 1.4 : 1.8;
      ctx.setLineDash(dashed ? [7, 6] : []);
      ctx.beginPath();
      for (let q = 0; q < 4; q++) {
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const bearing = bearings[q] + 90 * t;
          const radius = values[q] + (values[q + 1] - values[q]) * t;
          const p = this.projectedQuadrantPoint(centerGeo, bearing, radius);
          if (q === 0 && i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.closePath();
      ctx.stroke();

      const labelPoint = this.projectedQuadrantPoint(centerGeo, 42, radii.ne);
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.92;
      ctx.font = `${mobile() ? 10 : 11}px ui-sans-serif, system-ui`;
      const width = ctx.measureText(label).width + 10;
      ctx.fillStyle = 'rgba(255,255,255,.90)';
      ctx.strokeStyle = 'rgba(24,60,76,.20)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(labelPoint.x - width / 2, labelPoint.y - 10, width, 19, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, labelPoint.x, labelPoint.y - 0.5);
      ctx.restore();
    }

    drawWindVectors(ctx, center, radius, wind, latitude) {
      if (!this.options.particles) return;
      const quality = this.quality === 'auto' ? (mobile() ? 'eco' : 'balanced') : this.quality;
      const count = quality === 'high' ? 88 : quality === 'eco' ? 34 : 58;
      const elapsed = (performance.now() - this.startedAt) / 1000;
      const direction = latitude < 0 ? 1 : -1;
      const phase = reduced() ? 0 : elapsed * clamp(wind / 40, 0.35, 1.2) * direction * 0.32;

      ctx.save();
      ctx.lineWidth = mobile() ? 1.0 : 1.25;
      ctx.lineCap = 'round';
      for (let i = 0; i < count; i++) {
        const band = i % 5;
        const radial = 0.24 + (band / 4) * 0.63 + ((i * 17) % 11) / 180;
        const angle = (i / count) * Math.PI * 2 + phase * (1.35 - radial * 0.55);
        const ellipseY = 0.86;
        const x = center.x + Math.cos(angle) * radius * radial;
        const y = center.y + Math.sin(angle) * radius * radial * ellipseY;
        const tangent = angle + direction * Math.PI / 2;
        const inward = 0.18 * (1 - radial);
        const vectorAngle = tangent + direction * inward;
        const length = (mobile() ? 8 : 11) + (1 - radial) * 8;
        const x2 = x + Math.cos(vectorAngle) * length;
        const y2 = y + Math.sin(vectorAngle) * length * ellipseY;
        const localWind = wind * (0.35 + (1 - radial) * 0.75);
        const color = windColor(localWind);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.28 + (1 - radial) * 0.46;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        const head = mobile() ? 2.3 : 3.0;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - Math.cos(vectorAngle - 0.55) * head, y2 - Math.sin(vectorAngle - 0.55) * head);
        ctx.lineTo(x2 - Math.cos(vectorAngle + 0.55) * head, y2 - Math.sin(vectorAngle + 0.55) * head);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    drawCenter(ctx, center, storm, estimated) {
      const wind = Number(storm.windMs) || 0;
      const pressure = Number(storm.pressureHpa);
      const color = windColor(wind);
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.fillStyle = 'rgba(255,255,255,.96)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, mobile() ? 12 : 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 0, mobile() ? 4 : 5, 0, Math.PI * 2);
      ctx.fill();

      if (this.options.eyewall) {
        ctx.font = `700 ${mobile() ? 11 : 12}px ui-sans-serif, system-ui`;
        const line1 = Number.isFinite(pressure) ? `${Math.round(pressure)} hPa` : '中心';
        const line2 = Number.isFinite(wind) ? `${Math.round(wind)} m/s${estimated ? ' · 估算风圈' : ''}` : '';
        const width = Math.max(ctx.measureText(line1).width, ctx.measureText(line2).width) + 20;
        const x = 21;
        const y = -22;
        ctx.fillStyle = 'rgba(255,255,255,.94)';
        ctx.strokeStyle = 'rgba(24,60,76,.18)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x, y, width, 42, 9);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#173845';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(line1, x + 10, y + 13);
        ctx.font = `${mobile() ? 9 : 10}px ui-sans-serif, system-ui`;
        ctx.fillStyle = '#607985';
        ctx.fillText(line2, x + 10, y + 30);
      }
      ctx.restore();
    }

    draw() {
      this.raf = 0;
      if (!this.ctx || !this.canvas || !this.map) return;
      const rect = this.map.getContainer().getBoundingClientRect();
      this.ctx.clearRect(0, 0, rect.width, rect.height);
      if (!this.enabled || !this.storm || !Number.isFinite(+this.storm.lat) || !Number.isFinite(+this.storm.lon)) return;

      const storm = this.storm;
      const centerGeo = { lat: +storm.lat, lon: +storm.lon };
      const center = this.map.project([centerGeo.lon, centerGeo.lat]);
      const wind = Number(storm.windMs) || 25;
      const radii = extractRadii(storm);
      const maxRadius = Math.max(radii.r34.ne, radii.r34.se, radii.r34.sw, radii.r34.nw);
      const radiusPx = this.screenRadius(centerGeo, maxRadius);

      this.drawTrack(this.ctx, storm.track, storm.progress || 0);
      this.drawQuadrantRing(this.ctx, centerGeo, radii.r34, '#eab308', '34 kt', !radii.official);
      if (wind >= 25) this.drawQuadrantRing(this.ctx, centerGeo, radii.r50, '#f97316', '50 kt', !radii.official);
      if (wind >= 33) this.drawQuadrantRing(this.ctx, centerGeo, radii.r64, '#ef4444', '64 kt', !radii.official);
      this.drawWindVectors(this.ctx, center, radiusPx, wind, centerGeo.lat);
      this.drawCenter(this.ctx, center, storm, !radii.official);

      if (!reduced() && this.options.particles) this.request();
    }
  }

  const overlay = new MeteorologicalCycloneOverlay();
  window.CycloneFX = {
    isAvailable: () => Boolean(document.createElement('canvas').getContext),
    attach: map => overlay.attach(map),
    setEnabled: value => overlay.setEnabled(value),
    setQuality: value => overlay.setQuality(value),
    setOptions: value => overlay.setOptions(value),
    setStorm: value => overlay.setStorm(value),
    request: () => overlay.request(),
  };
  window.dispatchEvent(new Event('cyclonefxready'));
})();
