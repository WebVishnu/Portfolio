/**
 * Gesture-driven particle system for Three.js.
 * Exposes attractTo, scatter, follow, idle and update(dt, { gesture, fingerX, fingerY, camera }).
 * OPEN_HAND: once per gesture, assigns random targets across full viewport (FOV, aspect, depth),
 * impulse toward them, then attraction + damping to settle. Other modes: attract, follow, idle, radial scatter.
 */

// --- Tunable constants ---
const ATTRACT_LERP = 2.5;
const ATTRACT_MAX_STEP = 0.12;
const FOLLOW_LERP = 0.06;
const FOLLOW_MAX_STEP = 0.08;
const SCATTER_SPEED = 1.2;
const SCATTER_DECAY = 0.97;
const DRIFT_NOISE = 0.02;
const V_MAX = 0.5;
const SMOOTH_TARGET = 0.15;
const IDLE_AMP = 0.15;
const IDLE_LERP_BACK = 0.03;
// OPEN_HAND: full viewport scatter — impulse, attraction, damping
const SCATTER_IMPULSE = 4.5;
const SCATTER_ATTRACTION = 2.2;
const SCATTER_DAMPING = 0.94;
const SCATTER_V_MAX = 2.0;
const POS_CLAMP = 10; // loose box [-POS_CLAMP, POS_CLAMP] for pos

/**
 * @param {typeof import('three')} THREE
 * @param {{ count?: number, spread?: number }} opts
 * @returns {{ geometry: THREE.BufferGeometry, update: (dt: number, opts: { gesture?: string, fingerX?: number | null, fingerY?: number | null }) => void, attractTo: (p: { x: number, y: number, z?: number }) => void, scatter: () => void, follow: (p: { x: number, y: number, z?: number }) => void, idle: () => void }}
 */
export function createParticleSystem(THREE, { count = 1200, spread = 4 } = {}) {
  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const scatterTargets = new Float32Array(count * 3); // per-particle targets for OPEN_HAND viewport scatter

  // Initial random layout
  for (let i = 0; i < count * 3; i += 3) {
    const x = (Math.random() - 0.5) * 2 * spread;
    const y = (Math.random() - 0.5) * 2 * spread;
    const z = (Math.random() - 0.5) * 2 * spread;
    positions[i] = x;
    positions[i + 1] = y;
    positions[i + 2] = z;
    basePositions[i] = x;
    basePositions[i + 1] = y;
    basePositions[i + 2] = z;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  let mode = "idle";
  let target = { x: 0, y: 0, z: 0 };
  let smoothTarget = { x: 0, y: 0, z: 0 };
  let lastGesture = "";
  let time = 0;

  /** Map normalized [0,1] (image space) to Three.js space. Y flipped. */
  function normTo3D(fingerX, fingerY) {
    const x = (fingerX - 0.5) * (spread * 2);
    const y = (0.5 - fingerY) * (spread * 2);
    return { x, y, z: 0 };
  }

  function zeroVelocities() {
    for (let i = 0; i < count * 3; i++) velocities[i] = 0;
  }

  /** Set mode to attract, target to point. Zero velocities when coming from scatter. */
  function attractTo(point) {
    const prev = mode;
    mode = "attract";
    target = { x: point.x, y: point.y, z: point.z != null ? point.z : 0 };
    if (prev === "scatter" || prev === "scatter_open") zeroVelocities();
  }

  /** One-shot: inject radial outward velocities from (0,0,0). Sets mode to scatter. */
  function scatter() {
    mode = "scatter";
    const cx = 0, cy = 0, cz = 0;
    for (let i = 0; i < count * 3; i += 3) {
      let dx = positions[i] - cx;
      let dy = positions[i + 1] - cy;
      let dz = positions[i + 2] - cz;
      const len = Math.hypot(dx, dy, dz) || 1e-6;
      dx /= len; dy /= len; dz /= len;
      velocities[i] = dx * SCATTER_SPEED;
      velocities[i + 1] = dy * SCATTER_SPEED;
      velocities[i + 2] = dz * SCATTER_SPEED;
    }
  }

  /** Set mode to follow, target to point. Zero velocities when coming from scatter. */
  function follow(point) {
    const prev = mode;
    mode = "follow";
    target = { x: point.x, y: point.y, z: point.z != null ? point.z : 0 };
    if (prev === "scatter" || prev === "scatter_open") zeroVelocities();
  }

  /** Set mode to idle. */
  function idle() {
    mode = "idle";
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  /**
   * @param {number} dt - Delta time in seconds.
   * @param {{ gesture?: string | null, fingerX?: number | null, fingerY?: number | null, camera?: { fov: number, aspect: number, position: { z: number } } | null }} opts
   */
  function update(dt, { gesture = "none", fingerX = null, fingerY = null, camera = null } = {}) {
    const g = gesture || "none";

    // Gesture-to-mode. "open" → once per gesture change: assign random targets across full viewport
    // (FOV, aspect, depth), set strong impulse toward them, mode=scatter_open; physics uses attraction + damping.
    if (g === "open") {
      if (lastGesture !== "open") {
        // One-shot: world-space viewport bounds from camera frustum at depth
        let halfW, halfH, zSpread;
        if (camera && typeof camera.fov === "number" && camera.aspect) {
          const depth = Math.abs(camera.position?.z) || 5;
          halfH = depth * Math.tan((camera.fov * Math.PI / 180) / 2);
          halfW = halfH * camera.aspect;
          zSpread = Math.min(halfH, halfW) * 0.5;
        } else {
          halfW = 6; halfH = 4; zSpread = 2;
        }
        const minX = -halfW, maxX = halfW, minY = -halfH, maxY = halfH, minZ = -zSpread, maxZ = zSpread;
        for (let i = 0; i < count * 3; i += 3) {
          const tx = minX + Math.random() * (maxX - minX);
          const ty = minY + Math.random() * (maxY - minY);
          const tz = minZ + Math.random() * (maxZ - minZ);
          scatterTargets[i] = tx; scatterTargets[i + 1] = ty; scatterTargets[i + 2] = tz;
          const dx = tx - positions[i], dy = ty - positions[i + 1], dz = tz - positions[i + 2];
          const imp = SCATTER_IMPULSE;
          velocities[i] = dx * imp; velocities[i + 1] = dy * imp; velocities[i + 2] = dz * imp;
        }
      }
      mode = "scatter_open";
      lastGesture = "open";
    } else if (g === "pinch" && fingerX != null && fingerY != null) {
      attractTo(normTo3D(fingerX, fingerY));
      lastGesture = g;
    } else if (g === "point" && fingerX != null && fingerY != null) {
      follow(normTo3D(fingerX, fingerY));
      lastGesture = g;
    } else if (g === "none" || (g !== "pinch" && g !== "point" && g !== "open")) {
      idle();
      lastGesture = g;
    } else {
      lastGesture = g;
    }

    // Smooth target (attract/follow) to reduce jitter
    if (mode === "attract" || mode === "follow") {
      smoothTarget.x += (target.x - smoothTarget.x) * SMOOTH_TARGET;
      smoothTarget.y += (target.y - smoothTarget.y) * SMOOTH_TARGET;
      smoothTarget.z += (target.z - smoothTarget.z) * SMOOTH_TARGET;
    }

    time += dt;
    const tx = smoothTarget.x, ty = smoothTarget.y, tz = smoothTarget.z;

    // --- Physics by mode ---
    if (mode === "idle") {
      // Ease back from scatter: lerp toward base + sin/cos wave. No snap.
      for (let i = 0; i < count * 3; i += 3) {
        const j = i / 3;
        const bx = basePositions[i];
        const by = basePositions[i + 1];
        const bz = basePositions[i + 2];
        const waveX = IDLE_AMP * Math.sin(time + j * 0.01) * Math.cos(time * 0.7 + j * 0.02);
        const waveY = IDLE_AMP * Math.cos(time * 0.8 + j * 0.015) * Math.sin(time + j * 0.02);
        const waveZ = IDLE_AMP * Math.sin(time * 0.6 + j * 0.01) * Math.cos(time + j * 0.015);
        const goalX = bx + waveX, goalY = by + waveY, goalZ = bz + waveZ;
        const t = Math.min(1, IDLE_LERP_BACK * dt * 60);
        positions[i] += (goalX - positions[i]) * t;
        positions[i + 1] += (goalY - positions[i + 1]) * t;
        positions[i + 2] += (goalZ - positions[i + 2]) * t;
      }
    } else if (mode === "scatter_open") {
      // Fly toward per-particle viewport targets: attraction + damping, settle naturally. Full screen.
      for (let i = 0; i < count * 3; i += 3) {
        const tx = scatterTargets[i], ty = scatterTargets[i + 1], tz = scatterTargets[i + 2];
        const ax = (tx - positions[i]) * SCATTER_ATTRACTION * dt;
        const ay = (ty - positions[i + 1]) * SCATTER_ATTRACTION * dt;
        const az = (tz - positions[i + 2]) * SCATTER_ATTRACTION * dt;
        velocities[i] += ax; velocities[i + 1] += ay; velocities[i + 2] += az;
        positions[i] += velocities[i] * dt;
        positions[i + 1] += velocities[i + 1] * dt;
        positions[i + 2] += velocities[i + 2] * dt;
        velocities[i] *= SCATTER_DAMPING; velocities[i + 1] *= SCATTER_DAMPING; velocities[i + 2] *= SCATTER_DAMPING;
        velocities[i] = clamp(velocities[i], -SCATTER_V_MAX, SCATTER_V_MAX);
        velocities[i + 1] = clamp(velocities[i + 1], -SCATTER_V_MAX, SCATTER_V_MAX);
        velocities[i + 2] = clamp(velocities[i + 2], -SCATTER_V_MAX, SCATTER_V_MAX);
      }
    } else if (mode === "attract") {
      for (let i = 0; i < count * 3; i += 3) {
        let dx = tx - positions[i];
        let dy = ty - positions[i + 1];
        let dz = tz - positions[i + 2];
        const d = Math.hypot(dx, dy, dz) || 1e-9;
        const easing = Math.min(1, d * 0.5);
        let step = Math.min(ATTRACT_LERP * dt, 1) * easing;
        dx *= step; dy *= step; dz *= step;
        const len = Math.hypot(dx, dy, dz);
        if (len > ATTRACT_MAX_STEP) {
          const s = ATTRACT_MAX_STEP / len;
          dx *= s; dy *= s; dz *= s;
        }
        positions[i] += dx;
        positions[i + 1] += dy;
        positions[i + 2] += dz;
      }
    } else if (mode === "scatter") {
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] += velocities[i] * dt;
        positions[i + 1] += velocities[i + 1] * dt;
        positions[i + 2] += velocities[i + 2] * dt;
        velocities[i] *= SCATTER_DECAY;
        velocities[i + 1] *= SCATTER_DECAY;
        velocities[i + 2] *= SCATTER_DECAY;
        velocities[i] += (Math.random() - 0.5) * DRIFT_NOISE;
        velocities[i + 1] += (Math.random() - 0.5) * DRIFT_NOISE;
        velocities[i + 2] += (Math.random() - 0.5) * DRIFT_NOISE;
        velocities[i] = clamp(velocities[i], -V_MAX, V_MAX);
        velocities[i + 1] = clamp(velocities[i + 1], -V_MAX, V_MAX);
        velocities[i + 2] = clamp(velocities[i + 2], -V_MAX, V_MAX);
        positions[i] = clamp(positions[i], -POS_CLAMP, POS_CLAMP);
        positions[i + 1] = clamp(positions[i + 1], -POS_CLAMP, POS_CLAMP);
        positions[i + 2] = clamp(positions[i + 2], -POS_CLAMP, POS_CLAMP);
      }
    } else if (mode === "follow") {
      for (let i = 0; i < count * 3; i += 3) {
        let dx = (tx - positions[i]) * FOLLOW_LERP * dt;
        let dy = (ty - positions[i + 1]) * FOLLOW_LERP * dt;
        let dz = (tz - positions[i + 2]) * FOLLOW_LERP * dt;
        const len = Math.hypot(dx, dy, dz);
        if (len > FOLLOW_MAX_STEP) {
          const s = FOLLOW_MAX_STEP / len;
          dx *= s; dy *= s; dz *= s;
        }
        positions[i] += dx;
        positions[i + 1] += dy;
        positions[i + 2] += dz;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  }

  return { geometry, update, attractTo, scatter, follow, idle };
}
