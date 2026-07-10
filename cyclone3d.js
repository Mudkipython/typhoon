import * as THREE from 'three';

const QUALITY_COUNTS = {
  high: 7600,
  balanced: 3600,
  eco: 1300,
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function autoQuality() {
  const memory = Number(navigator.deviceMemory || 4);
  const cores = Number(navigator.hardwareConcurrency || 4);
  const mobile = window.matchMedia('(max-width: 760px)').matches;
  if (prefersReducedMotion.matches || memory <= 2 || cores <= 2) return 'eco';
  if (mobile || memory <= 4 || cores <= 4) return 'balanced';
  return 'high';
}

function intensityColor(windMs = 0) {
  if (windMs < 17) return 0x38bdf8;
  if (windMs < 25) return 0xfacc15;
  if (windMs < 33) return 0xfb923c;
  if (windMs < 42) return 0xf43f5e;
  if (windMs < 51) return 0xec4899;
  return 0xa855f7;
}

function lonLatToMeters(point, origin) {
  const latitudeScale = 110_540;
  const longitudeScale = 111_320 * Math.cos((origin.lat || 0) * Math.PI / 180);
  let deltaLon = Number(point.lon) - Number(origin.lon);
  if (deltaLon > 180) deltaLon -= 360;
  if (deltaLon < -180) deltaLon += 360;
  return new THREE.Vector3(
    deltaLon * longitudeScale,
    (Number(point.lat) - Number(origin.lat)) * latitudeScale,
    Number(point.altitude || 0),
  );
}

class CycloneVisualLayer {
  constructor() {
    this.id = 'tv-cyclone-3d';
    this.type = 'custom';
    this.renderingMode = '3d';
    this.enabled = false;
    this.quality = 'auto';
    this.options = { particles: true, eyewall: true, trail: true };
    this.storm = null;
    this.map = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.root = null;
    this.particles = null;
    this.particleMaterial = null;
    this.eyeWall = null;
    this.eyeRing = null;
    this.outerHalo = null;
    this.pressureFunnel = null;
    this.observedTrail = null;
    this.forecastTrail = null;
    this.beacon = null;
    this.lastFrame = 0;
    this.elapsed = 0;
  }

  onAdd(map, gl) {
    this.map = map;
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.root = new THREE.Group();
    this.scene.add(this.root);

    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
      alpha: true,
    });
    this.renderer.autoClear = false;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.createCoreMeshes();
    this.rebuildParticles();
    this.createTrails();
    this.applyVisibility();
  }

  createCoreMeshes() {
    const additiveMaterial = (color, opacity) => new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.outerHalo = new THREE.Mesh(
      new THREE.RingGeometry(0.52, 1.08, 128),
      additiveMaterial(0x22d3ee, 0.18),
    );
    this.outerHalo.position.z = 1_000;
    this.root.add(this.outerHalo);

    this.eyeWall = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.20, 20, 128),
      additiveMaterial(0xffffff, 0.34),
    );
    this.eyeWall.position.z = 9_000;
    this.root.add(this.eyeWall);

    this.eyeRing = new THREE.Mesh(
      new THREE.RingGeometry(0.42, 0.58, 96),
      new THREE.MeshBasicMaterial({
        color: 0x07121e,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    this.eyeRing.position.z = 8_500;
    this.root.add(this.eyeRing);

    this.pressureFunnel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.72, 1, 64, 1, true),
      additiveMaterial(0x60a5fa, 0.16),
    );
    this.pressureFunnel.rotation.x = Math.PI / 2;
    this.pressureFunnel.position.z = 11_000;
    this.root.add(this.pressureFunnel);

    const beaconGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 1_000),
      new THREE.Vector3(0, 0, 72_000),
    ]);
    this.beacon = new THREE.Line(
      beaconGeometry,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    this.root.add(this.beacon);
  }

  createParticles(count) {
    const geometry = new THREE.BufferGeometry();
    const zeros = new Float32Array(count * 3);
    const radius = new Float32Array(count);
    const angle = new Float32Array(count);
    const lift = new Float32Array(count);
    const seed = new Float32Array(count);
    const arm = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const random = Math.random();
      radius[index] = Math.pow(random, 0.72);
      angle[index] = Math.random() * Math.PI * 2;
      lift[index] = 0.2 + Math.random() * 0.8;
      seed[index] = Math.random();
      arm[index] = Math.floor(Math.random() * 5);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(zeros, 3));
    geometry.setAttribute('aRadius', new THREE.BufferAttribute(radius, 1));
    geometry.setAttribute('aAngle', new THREE.BufferAttribute(angle, 1));
    geometry.setAttribute('aLift', new THREE.BufferAttribute(lift, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geometry.setAttribute('aArm', new THREE.BufferAttribute(arm, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uRadius: { value: 340_000 },
        uIntensity: { value: 0.65 },
        uHemisphere: { value: 1 },
        uColorA: { value: new THREE.Color(0x22d3ee) },
        uColorB: { value: new THREE.Color(0xffffff) },
        uOpacity: { value: 0.78 },
      },
      vertexShader: `
        attribute float aRadius;
        attribute float aAngle;
        attribute float aLift;
        attribute float aSeed;
        attribute float aArm;
        uniform float uTime;
        uniform float uRadius;
        uniform float uIntensity;
        uniform float uHemisphere;
        varying float vAlpha;
        varying float vMix;

        void main() {
          float drift = fract(aSeed + uTime * (0.014 + 0.018 * uIntensity));
          float radial = fract(aRadius - drift * 0.11);
          float radiusMeters = mix(24000.0, uRadius, pow(radial, 0.76));
          float angularSpeed = (0.36 + 1.05 * uIntensity) * (1.25 - radial * 0.52);
          float theta = aAngle + uHemisphere * (uTime * angularSpeed + radial * 11.5 + aArm * 1.31);
          float spiralWave = 1.0 + sin(radial * 31.0 + aSeed * 6.2831) * 0.075;
          float x = cos(theta) * radiusMeters * spiralWave;
          float y = sin(theta) * radiusMeters * 0.86 * spiralWave;
          float cloudDeck = (1.0 - radial) * (18000.0 + 34000.0 * uIntensity) * aLift;
          float turbulence = sin(theta * 3.0 + aSeed * 13.0 + uTime * 1.8) * 4200.0 * (1.0 - radial);
          vec3 localPosition = vec3(x, y, max(900.0, cloudDeck + turbulence));

          gl_Position = projectionMatrix * modelViewMatrix * vec4(localPosition, 1.0);
          gl_PointSize = mix(1.5, 4.8, uIntensity) * (0.65 + (1.0 - radial) * 1.15);
          vAlpha = smoothstep(1.0, 0.70, radial) * (0.28 + (1.0 - radial) * 0.72);
          vMix = clamp((1.0 - radial) * 1.18, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uOpacity;
        varying float vAlpha;
        varying float vMix;

        void main() {
          vec2 centered = gl_PointCoord - vec2(0.5);
          float distanceFromCenter = length(centered);
          float softCircle = smoothstep(0.5, 0.05, distanceFromCenter);
          vec3 color = mix(uColorA, uColorB, vMix);
          gl_FragColor = vec4(color, softCircle * vAlpha * uOpacity);
        }
      `,
    });

    this.particleMaterial = material;
    this.particles = new THREE.Points(geometry, material);
    this.particles.frustumCulled = false;
    this.root.add(this.particles);
  }

  rebuildParticles() {
    if (!this.root) return;
    if (this.particles) {
      this.root.remove(this.particles);
      this.particles.geometry.dispose();
      this.particles.material.dispose();
      this.particles = null;
    }
    const resolved = this.quality === 'auto' ? autoQuality() : this.quality;
    this.createParticles(QUALITY_COUNTS[resolved] || QUALITY_COUNTS.balanced);
    this.applyVisibility();
  }

  createTrails() {
    const observedMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.86,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const forecastMaterial = new THREE.LineDashedMaterial({
      color: 0xfb923c,
      transparent: true,
      opacity: 0.82,
      dashSize: 32_000,
      gapSize: 20_000,
      depthWrite: false,
    });
    this.observedTrail = new THREE.Line(new THREE.BufferGeometry(), observedMaterial);
    this.forecastTrail = new THREE.Line(new THREE.BufferGeometry(), forecastMaterial);
    this.root.add(this.observedTrail, this.forecastTrail);
  }

  updateTrails() {
    if (!this.storm || !this.observedTrail || !this.forecastTrail) return;
    const origin = this.storm;
    const observed = Array.isArray(this.storm.observed) ? this.storm.observed : [];
    const forecast = Array.isArray(this.storm.forecast) ? this.storm.forecast : [];

    const setLine = (line, points, startHeight, heightStep) => {
      const positions = points.map((point, index) => {
        const local = lonLatToMeters(point, origin);
        local.z = startHeight + index * heightStep;
        return local;
      });
      line.geometry.dispose();
      line.geometry = new THREE.BufferGeometry().setFromPoints(positions.length >= 2 ? positions : [new THREE.Vector3(), new THREE.Vector3()]);
      if (line.computeLineDistances) line.computeLineDistances();
      line.userData.hasData = positions.length >= 2;
      line.visible = this.enabled && this.options.trail && line.userData.hasData;
    };

    setLine(this.observedTrail, observed, 2_500, 850);
    const current = observed.at(-1);
    setLine(this.forecastTrail, current ? [current, ...forecast] : forecast, 5_000, 1_550);
  }

  setStorm(storm) {
    this.storm = storm ? { ...storm } : null;
    if (!this.storm || !this.root) return;

    const wind = Number(this.storm.windMs || 25);
    const radiusKm = Number(this.storm.radiusKm || Math.max(220, Math.min(620, 160 + wind * 7)));
    const intensity = Math.max(0.28, Math.min(1, (wind - 10) / 45));
    const radiusMeters = radiusKm * 1_000;
    const wallRadius = Math.max(36_000, Math.min(92_000, 27_000 + wind * 1_350));
    const pressure = Number(this.storm.pressureHpa || 990);
    const pressureStrength = Math.max(0.25, Math.min(1, (1010 - pressure) / 70));
    const color = new THREE.Color(intensityColor(wind));

    if (this.particleMaterial) {
      this.particleMaterial.uniforms.uRadius.value = radiusMeters;
      this.particleMaterial.uniforms.uIntensity.value = intensity;
      this.particleMaterial.uniforms.uHemisphere.value = Number(this.storm.lat) < 0 ? -1 : 1;
      this.particleMaterial.uniforms.uColorA.value.copy(color).lerp(new THREE.Color(0x38bdf8), 0.35);
      this.particleMaterial.uniforms.uColorB.value.set(0xffffff);
    }

    this.eyeWall.material.color.copy(color);
    this.eyeWall.material.opacity = 0.20 + intensity * 0.26;
    this.eyeWall.scale.setScalar(wallRadius);
    this.eyeRing.scale.setScalar(wallRadius * 0.72);
    this.outerHalo.material.color.copy(color).lerp(new THREE.Color(0x22d3ee), 0.55);
    this.outerHalo.scale.setScalar(radiusMeters * 0.46);
    this.outerHalo.userData.lastPulse = 1;
    this.pressureFunnel.material.color.copy(color).lerp(new THREE.Color(0x60a5fa), 0.5);
    this.pressureFunnel.scale.set(wallRadius * 0.7, 22_000 + pressureStrength * 35_000, wallRadius * 0.7);
    this.beacon.material.color.copy(color);

    this.updateTrails();
    this.applyVisibility();
    this.map?.triggerRepaint();
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (this.root) this.root.visible = this.enabled;
    this.map?.triggerRepaint();
  }

  setQuality(quality) {
    if (!quality || quality === this.quality) return;
    this.quality = quality;
    this.rebuildParticles();
    this.map?.triggerRepaint();
  }

  setOptions(options = {}) {
    this.options = { ...this.options, ...options };
    this.applyVisibility();
    this.map?.triggerRepaint();
  }

  applyVisibility() {
    if (this.particles) this.particles.visible = this.enabled && this.options.particles;
    if (this.eyeWall) this.eyeWall.visible = this.enabled && this.options.eyewall;
    if (this.eyeRing) this.eyeRing.visible = this.enabled && this.options.eyewall;
    if (this.outerHalo) this.outerHalo.visible = this.enabled && this.options.eyewall;
    if (this.pressureFunnel) this.pressureFunnel.visible = this.enabled && this.options.eyewall;
    if (this.beacon) this.beacon.visible = this.enabled && this.options.eyewall;
    if (this.observedTrail) this.observedTrail.visible = this.enabled && this.options.trail && Boolean(this.observedTrail.userData.hasData);
    if (this.forecastTrail) this.forecastTrail.visible = this.enabled && this.options.trail && Boolean(this.forecastTrail.userData.hasData);
  }

  render(gl, args) {
    if (!this.enabled || !this.storm || !this.renderer || !this.scene) return;

    const now = performance.now();
    const delta = this.lastFrame ? Math.min(0.05, (now - this.lastFrame) / 1_000) : 0.016;
    this.lastFrame = now;
    if (!prefersReducedMotion.matches) this.elapsed += delta;

    if (this.particleMaterial) this.particleMaterial.uniforms.uTime.value = this.elapsed;
    const hemisphere = Number(this.storm.lat) < 0 ? -1 : 1;
    if (this.eyeWall) this.eyeWall.rotation.z = this.elapsed * 0.24 * hemisphere;
    if (this.outerHalo) {
      this.outerHalo.rotation.z = -this.elapsed * 0.08 * hemisphere;
      const pulse = 1 + Math.sin(this.elapsed * 1.6) * 0.025;
      this.outerHalo.scale.multiplyScalar(pulse / (this.outerHalo.userData.lastPulse || 1));
      this.outerHalo.userData.lastPulse = pulse;
    }

    const coordinate = window.maplibregl.MercatorCoordinate.fromLngLat(
      [Number(this.storm.lon), Number(this.storm.lat)],
      0,
    );
    const scale = coordinate.meterInMercatorCoordinateUnits();
    const matrixArray = args?.defaultProjectionData?.mainMatrix || args;
    if (!matrixArray || typeof matrixArray.length !== 'number') return;

    const mapMatrix = new THREE.Matrix4().fromArray(matrixArray);
    const localMatrix = new THREE.Matrix4()
      .makeTranslation(coordinate.x, coordinate.y, coordinate.z)
      .scale(new THREE.Vector3(scale, -scale, scale));

    this.camera.projectionMatrix = mapMatrix.multiply(localMatrix);
    this.renderer.resetState();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  }

  onRemove() {
    this.scene?.traverse((object) => {
      if (object.geometry) object.geometry.dispose?.();
      if (object.material) {
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
        else object.material.dispose?.();
      }
    });
    this.renderer?.dispose();
    this.map = null;
  }
}

class CycloneFXManager {
  constructor() {
    this.map = null;
    this.layer = new CycloneVisualLayer();
    this.styleListener = null;
  }

  attach(map) {
    if (!map) return false;
    if (this.map === map) {
      this.ensure();
      return true;
    }
    this.map = map;
    this.styleListener = () => this.ensure();
    map.on('style.load', this.styleListener);
    this.ensure();
    return true;
  }

  ensure() {
    if (!this.map || !this.map.isStyleLoaded?.()) return;
    if (!this.map.getLayer(this.layer.id)) {
      const symbolLayer = this.map.getStyle()?.layers?.find((layer) => layer.type === 'symbol')?.id;
      this.map.addLayer(this.layer, symbolLayer);
    }
  }

  setEnabled(value) {
    this.layer.setEnabled(value);
  }

  setQuality(value) {
    this.layer.setQuality(value);
  }

  setOptions(value) {
    this.layer.setOptions(value);
  }

  setStorm(value) {
    this.layer.setStorm(value);
  }

  isAvailable() {
    return Boolean(window.WebGLRenderingContext && window.maplibregl);
  }
}

window.CycloneFX = new CycloneFXManager();
window.dispatchEvent(new CustomEvent('cyclonefxready'));
