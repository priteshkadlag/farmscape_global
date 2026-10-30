"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

const INK = "#25282b";
const STEEL = "#b5bab8";
const LIME = "#c8f169";
const COPPER = "#b5643c";

// Portal-frame shed: frames along x, span along z.
const BAYS = 7;
const BAY = 6;
const HALF_SPAN = 10;
const EAVE = 8;
const RIDGE = 11.5;

type Member = { a: THREE.Vector3; b: THREE.Vector3; t0: number; t1: number; size: number; footing?: boolean };

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const xs = Array.from({ length: BAYS + 1 }, (_, i) => (i - BAYS / 2) * BAY);

/** Erection sequence: footings → columns → rafters → purlins → bracing, each sweeping along the building. */
function buildMembers(): Member[] {
  const members: Member[] = [];
  const stagger = (i: number, from: number, to: number, len: number) => {
    const t0 = from + ((to - from - len) * i) / BAYS;
    return { t0, t1: t0 + len };
  };

  xs.forEach((x, i) => {
    for (const z of [-HALF_SPAN, HALF_SPAN]) {
      members.push({ a: v(x, 0, z), b: v(x, 0.6, z), ...stagger(i, 0.03, 0.14, 0.04), size: 1.5, footing: true });
      members.push({ a: v(x, 0.6, z), b: v(x, EAVE, z), ...stagger(i, 0.12, 0.38, 0.08), size: 0.38 });
      members.push({ a: v(x, EAVE, z), b: v(x, RIDGE, 0), ...stagger(i, 0.26, 0.54, 0.1), size: 0.32 });
    }
  });

  // Purlins and eave girts run the length of the building.
  const purlinLines: [number, number][] = [];
  for (const side of [-1, 1]) {
    for (let k = 0; k <= 4; k++) {
      const t = k / 4;
      purlinLines.push([side * HALF_SPAN * (1 - t), EAVE + (RIDGE - EAVE) * t]);
    }
    purlinLines.push([side * HALF_SPAN, EAVE * 0.5]);
  }
  purlinLines.forEach(([z, y], i) => {
    const t0 = 0.5 + (0.2 * i) / purlinLines.length;
    members.push({ a: v(xs[0], y, z), b: v(xs[BAYS], y, z), t0, t1: t0 + 0.08, size: 0.14 });
  });

  // Cross bracing in the end bays, walls and roof.
  for (const [xa, xb] of [
    [xs[0], xs[1]],
    [xs[BAYS - 1], xs[BAYS]],
  ]) {
    for (const z of [-HALF_SPAN, HALF_SPAN]) {
      members.push({ a: v(xa, 0.6, z), b: v(xb, EAVE, z), t0: 0.66, t1: 0.74, size: 0.07 });
      members.push({ a: v(xb, 0.6, z), b: v(xa, EAVE, z), t0: 0.68, t1: 0.76, size: 0.07 });
      members.push({ a: v(xa, EAVE, z), b: v(xb, RIDGE, 0), t0: 0.7, t1: 0.78, size: 0.07 });
      members.push({ a: v(xb, EAVE, z), b: v(xa, RIDGE, 0), t0: 0.72, t1: 0.8, size: 0.07 });
    }
  }
  return members;
}

const UP = v(0, 1, 0);
// The scroll opens on the plan, so erection is compressed into 0.16–0.80 of it.
const members = buildMembers().map((m) => {
  const dir = m.b.clone().sub(m.a);
  return {
    ...m,
    t0: 0.16 + m.t0 * 0.8,
    t1: 0.16 + m.t1 * 0.8,
    centerX: (m.a.x + m.b.x) / 2,
    length: dir.length(),
    quaternion: new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize()),
  };
});

/**
 * The blueprint: setting-out grid, then every member's centreline in erection
 * order, so drawing it progressively reads as the drawing being made.
 */
const blueprint = (() => {
  const pts: number[] = [];
  const seg = (a: THREE.Vector3, b: THREE.Vector3) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
  const y = 0.02;
  xs.forEach((x) => seg(v(x, y, -HALF_SPAN - 5), v(x, y, HALF_SPAN + 5)));
  for (const z of [-HALF_SPAN, 0, HALF_SPAN]) seg(v(xs[0] - 5, y, z), v(xs[BAYS] + 5, y, z));
  [...members].sort((a, b) => a.t0 - b.t0).forEach((m) => seg(m.a, m.b));
  return new Float32Array(pts);
})();

// Plan view overhead → down to the first footing → along the frames → wide hero view.
const cameraPath = new THREE.CatmullRomCurve3([
  v(2, 76, 12),
  v(-22, 32, 48),
  v(-27, 1.6, 19),
  v(-34, 6, 30),
  v(-12, 16, 44),
  v(18, 19, 42),
  v(38, 13, 30),
  v(34, 24, 54),
]);
const targetPath = new THREE.CatmullRomCurve3([
  v(0, 0, 0),
  v(-8, 2, 0),
  v(-21, 1.5, 10),
  v(-12, 4, 4),
  v(-2, 6, 0),
  v(2, 6, 0),
  v(0, 6, 0),
  v(0, 5, 0),
]);

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function Structure({ progress, opening }: { progress: RefObject<number>; opening: RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const eased = useRef(0);
  const lookAt = useMemo(() => new THREE.Vector3(), []);

  const { geometry, steel, glow, footing, ink } = useMemo(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
    return {
      geometry,
      steel: new THREE.MeshStandardMaterial({ color: STEEL, metalness: 0.55, roughness: 0.38 }),
      glow: new THREE.MeshBasicMaterial({ color: LIME }),
      footing: new THREE.MeshStandardMaterial({ color: "#8a918f", roughness: 0.95 }),
      ink: new THREE.LineBasicMaterial({ color: LIME, transparent: true, opacity: 0.85, depthWrite: false }),
    };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      steel.dispose();
      glow.dispose();
      footing.dispose();
      ink.dispose();
    },
    [geometry, steel, glow, footing, ink],
  );

  useFrame((state, delta) => {
    // Damped follow so scrubbing feels like a camera move, not a slider.
    eased.current = THREE.MathUtils.damp(eased.current, progress.current, 4, delta);
    const p = eased.current;
    const open = opening.current;
    const onPlan = 1 - smooth(clamp01(p / 0.14));

    // The blueprint draws itself during the opening, then stays as a faint ghost under the steel.
    const vertices = blueprint.length / 3;
    const blueprintLines = lines.current;
    if (blueprintLines) {
      blueprintLines.geometry.setDrawRange(0, Math.floor((vertices * open) / 2) * 2);
      (blueprintLines.material as THREE.LineBasicMaterial).opacity = THREE.MathUtils.lerp(0.9, 0.2, smooth(clamp01((p - 0.14) / 0.4)));
    }

    // Load test: a lime pulse runs the length of the finished frame.
    const wave = p > 0.86 ? -26 + ((p - 0.86) / 0.12) * 52 : -999;

    members.forEach((m, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      const grow = smooth(clamp01((p - m.t0) / (m.t1 - m.t0)));
      mesh.visible = grow > 0.001;
      mesh.scale.set(m.size, Math.max(m.length * grow, 0.001), m.size);
      if (!m.footing) mesh.material = grow < 1 || Math.abs(m.centerX - wave) < 2.6 ? glow : steel;
    });

    if (group.current) {
      // Spins in as the opening plays, then breathes gently while on the plan.
      group.current.rotation.y = (1 - open) * -0.8 * onPlan + Math.sin(state.clock.elapsedTime * 0.25) * 0.05 * onPlan;
    }

    const t = clamp01(p / 0.97);
    const { camera } = state;
    camera.position.copy(cameraPath.getPoint(t));
    camera.position.y += (1 - open) * 46 * onPlan;
    camera.lookAt(targetPath.getPoint(t, lookAt));
  });

  return (
    <group ref={group}>
      <lineSegments ref={lines} material={ink} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[blueprint, 3]} />
        </bufferGeometry>
      </lineSegments>
      {members.map((m, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          geometry={geometry}
          material={m.footing ? footing : steel}
          position={m.a}
          quaternion={m.quaternion}
          visible={false}
        />
      ))}
    </group>
  );
}

// Seeded so the dust field is identical on every mount.
const dustPositions = (() => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const arr = new Float32Array(500 * 3);
  for (let i = 0; i < 500; i++) {
    arr[i * 3] = (rand() - 0.5) * 90;
    arr[i * 3 + 1] = rand() * 26;
    arr[i * 3 + 2] = (rand() - 0.5) * 70;
  }
  return arr;
})();

/** Slow-drifting site dust catches the light and gives the scene depth. */
function Dust() {
  const points = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f1ede4" size={0.09} transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

/**
 * Scroll-driven 3D erection of a steel portal-frame structure. `opening` (0–1,
 * time-driven) draws the blueprint; `progress` (0–1, scroll-driven) moves the
 * camera and erects the steel. Both are read every frame.
 */
export default function StructureScene({
  progress,
  opening,
  active,
  onReady,
}: {
  progress: RefObject<number>;
  opening: RefObject<number>;
  active: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 38, near: 0.1, far: 260, position: [2, 120, 12] }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 40, 150]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[30, 40, 20]} intensity={2.2} color="#fff3e2" />
      <pointLight position={[-30, 12, -20]} intensity={700} color={COPPER} />
      <gridHelper args={[160, 80, "#43484a", "#2e3235"]} />
      <Structure progress={progress} opening={opening} />
      <Dust />
    </Canvas>
  );
}
