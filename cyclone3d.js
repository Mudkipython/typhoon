(() => {
  'use strict';

  const QUALITY = { high: 2600, balanced: 1400, eco: 620 };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const mobile = () => matchMedia('(max-width: 760px)').matches;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoQuality = () => reduced() ? 'eco' : mobile() ? 'eco' : ((navigator.deviceMemory || 4) >= 8 ? 'high' : 'balanced');
  const colorFor = (wind = 0) => wind < 17 ? '#38bdf8' : wind < 25 ? '#facc15' : wind < 33 ? '#fb923c' : wind < 42 ? '#f43f5e' : wind < 51 ? '#ec4899' : '#a855f7';

  function destination(point, bearing, km) {
    const R = 6371, d = km / R, t = bearing * Math.PI / 180;
    const p1 = point.lat * Math.PI / 180, l1 = point.lon * Math.PI / 180;
    const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(t));
    const l2 = l1 + Math.atan2(Math.sin(t) * Math.sin(d) * Math.cos(p1), Math.cos(d) - Math.sin(p1) * Math.sin(p2));
    return { lat: p2 * 180 / Math.PI, lon: ((l2 * 180 / Math.PI + 540) % 360) - 180 };
  }

  function interpolate(points, progress) {
    if (!points?.length) return null;
    if (points.length === 1) return points[0];
    const value = clamp(progress, 0, 1) * (points.length - 1);
    const index = Math.min(points.length - 2, Math.floor(value));
    const t = value - index, a = points[index], b = points[index + 1];
    return {
      ...a,
      lat: Number(a.lat) + (Number(b.lat) - Number(a.lat)) * t,
      lon: Number(a.lon) + (Number(b.lon) - Number(a.lon)) * t,
      windMs: Number(a.windMs || 0) + (Number(b.windMs || a.windMs || 0) - Number(a.windMs || 0)) * t,
      forecast: Boolean(a.forecast || b.forecast),
      trend: Boolean(a.trend || b.trend),
    };
  }

  class CycloneOverlay {
    constructor() {
      this.map = null;
      this.canvas = null;
      this.ctx = null;
      this.enabled = true;
      this.quality = 'auto';
      this.options = { particles: true, eyewall: true, trail: true };
      this.storm = null;
      this.particles = [];
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
        canvas.className = 'cyclone-fx-canvas';
        container.appendChild(canvas);
      }
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: true });
      map.on('resize', this.resize);
      ['move', 'zoom', 'rotate', 'pitch'].forEach(event => map.on(event, () => this.request()));
      this.resize();
      this.rebuild();
      this.request();
      return true;
    }

    resize() {
      if (!this.canvas || !this.map) return;
      const rect = this.map.getContainer().getBoundingClientRect();
      const dpr = Math.min(2, devicePixelRatio || 1);
      this.canvas.width = Math.max(1, Math.round(rect.width * dpr));
      this.canvas.height = Math.max(1, Math.round(rect.height * dpr));
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;
      this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.request();
    }

    rebuild() {
      const selected = this.quality === 'auto' ? autoQuality() : this.quality;
      const count = QUALITY[selected] || QUALITY.balanced;
      this.particles = Array.from({ length: count }, () => ({
        r: Math.pow(Math.random(), 0.62),
        a: Math.random() * Math.PI * 2,
        arm: Math.floor(Math.random() * 6),
        seed: Math.random(),
        lift: 0.2 + Math.random() * 0.8,
        width: 0.45 + Math.random() * 1.3,
      }));
    }

    setEnabled(value) {
      this.enabled = Boolean(value);
      if (this.canvas) this.canvas.hidden = !this.enabled;
      this.request();
    }

    setQuality(value) {
      if (value && value !== this.quality) {
        this.quality = value;
        this.rebuild();
      }
    }

    setOptions(options) {
      this.options = { ...this.options, ...options };
      this.request();
    }

    setStorm(storm) {
      this.storm = storm ? { ...storm } : null;
      this.request();
    }

    request() {
      if (!this.raf) this.raf = requestAnimationFrame(this.draw);
    }

    screenRadius(center, radiusKm) {
      if (!this.map) return 130;
      const a = this.map.project([center.lon, center.lat]);
      const edge = destination(center, 90, radiusKm);
      const b = this.map.project([edge.lon, edge.lat]);
      return clamp(Math.abs(b.x - a.x), mobile() ? 56 : 72, mobile() ? 155 : 245);
    }

    drawTrail(ctx, track, progress, observedCount) {
      if (!this.options.trail || !track?.length || track.length < 2 || !this.map) return;
      const head = clamp(progress, 0, 1);
      const samples = mobile() ? 62 : 96;
      const start = Math.max(0, head - 0.62);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < samples; i++) {
        const f = start + (head - start) * (i / Math.max(1, samples - 1));
        const p = interpolate(track, f);
        if (!p) continue;
        const q = this.map.project([p.lon, p.lat]);
        const age = i / Math.max(1, samples - 1);
        const color = p.trend ? '#a78bfa' : p.forecast ? '#fb923c' : '#22d3ee';
        const size = 1.3 + age * 4.2;
        ctx.globalAlpha = 0.06 + age * 0.76;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 5 + age * 15;
        ctx.beginPath();
        ctx.ellipse(q.x, q.y - age * 3, size * 1.8, size, -0.24, 0, Math.PI * 2);
        ctx.fill();
      }

      // Future positions are displayed as ghost vortices rather than a static line.
      const futureSamples = 17;
      for (let i = 1; i <= futureSamples; i++) {
        const f = head + (1 - head) * (i / futureSamples);
        const p = interpolate(track, f);
        if (!p) continue;
        const q = this.map.project([p.lon, p.lat]);
        const alpha = 0.38 * (1 - i / (futureSamples + 2));
        const color = p.trend ? '#a78bfa' : '#fb923c';
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        const radius = 2.7 + i * 0.16;
        ctx.beginPath();
        ctx.arc(q.x, q.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawWindEnvelope(ctx, center, radius, color) {
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 1; i <= 3; i++) {
        ctx.globalAlpha = 0.11 - i * 0.018;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.1;
        ctx.setLineDash([8 + i * 2, 12 + i * 3]);
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * (0.52 + i * 0.16), radius * (0.30 + i * 0.095), -0.16, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawVortex(ctx, center, radius, wind, color, latitude) {
      const elapsed = (performance.now() - this.startedAt) / 1000;
      const direction = latitude < 0 ? -1 : 1;
      const intensity = clamp((wind - 10) / 45, 0.2, 1);
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.globalCompositeOperation = 'lighter';

      if (this.options.particles) {
        for (const p of this.particles) {
          const drift = (p.seed + elapsed * (0.013 + 0.026 * intensity)) % 1;
          const radial = (p.r - drift * 0.08 + 1) % 1;
          const rr = (0.12 + Math.pow(radial, 0.73) * 0.9) * radius;
          const theta = p.a + direction * (elapsed * (0.42 + intensity * 0.8) * (1.24 - radial * 0.45) + radial * 12.5 + p.arm * 1.05);
          const height = (1 - radial) * radius * 0.31 * p.lift;
          const x = Math.cos(theta) * rr;
          const y = Math.sin(theta) * rr * 0.52 - height;
          const tail = 2.5 + intensity * 5 + (1 - radial) * 5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - Math.sin(theta) * tail * direction, y + Math.cos(theta) * tail * 0.52 * direction);
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.08 + (1 - radial) * 0.52;
          ctx.lineWidth = p.width + (1 - radial) * 1.15;
          ctx.stroke();
        }
      }

      if (this.options.eyewall) {
        const eye = clamp(radius * (0.105 - 0.026 * intensity), 10, 29);
        const wall = eye * 1.95;
        const gradient = ctx.createRadialGradient(0, -radius * 0.05, eye * 0.3, 0, 0, radius * 0.5);
        gradient.addColorStop(0, 'rgba(1,8,17,.98)');
        gradient.addColorStop(0.09, 'rgba(1,8,17,.96)');
        gradient.addColorStop(0.125, `${color}ee`);
        gradient.addColorStop(0.18, 'rgba(255,255,255,.80)');
        gradient.addColorStop(0.29, `${color}50`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 0.55, radius * 0.31, -0.12, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,255,255,.76)';
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.ellipse(0, -radius * 0.02, wall, wall * 0.54, -0.12, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(1,8,17,.96)';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.ellipse(0, -radius * 0.02, eye, eye * 0.56, -0.12, 0, Math.PI * 2);
        ctx.fill();

        // Stacked rings create a lightweight 3D pressure funnel.
        for (let i = 1; i <= 4; i++) {
          ctx.globalAlpha = 0.30 / i;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(0, -i * 8, wall * (1 + i * 0.15), wall * 0.54 * (1 + i * 0.08), -0.12, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    draw() {
      this.raf = 0;
      if (!this.enabled || !this.ctx || !this.canvas || !this.storm || !this.map) return;
      const ctx = this.ctx;
      const rect = this.map.getContainer().getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const track = this.storm.track || [];
      const progress = clamp(Number(this.storm.progress || 0), 0, 1);
      const current = interpolate(track, progress) || this.storm;
      if (!Number.isFinite(+current.lon) || !Number.isFinite(+current.lat)) return;
      const center = this.map.project([+current.lon, +current.lat]);
      if (center.x < -320 || center.y < -320 || center.x > rect.width + 320 || center.y > rect.height + 320) return;

      const wind = Number(current.windMs || this.storm.windMs || 25);
      const radiusKm = Number(this.storm.radiusKm || Math.max(200, 150 + wind * 7));
      const radius = this.screenRadius(current, radiusKm);
      const color = colorFor(wind);

      this.drawTrail(ctx, track, progress, this.storm.observedCount || 1);
      this.drawWindEnvelope(ctx, center, radius, color);
      this.drawVortex(ctx, center, radius, wind, color, +current.lat);

      if (!reduced()) this.request();
    }
  }

  const overlay = new CycloneOverlay();
  window.CycloneFX = {
    isAvailable: () => Boolean(document.createElement('canvas').getContext),
    attach: map => overlay.attach(map),
    setEnabled: value => overlay.setEnabled(value),
    setQuality: value => overlay.setQuality(value),
    setOptions: options => overlay.setOptions(options),
    setStorm: storm => overlay.setStorm(storm),
  };
  dispatchEvent(new Event('cyclonefxready'));
})();
