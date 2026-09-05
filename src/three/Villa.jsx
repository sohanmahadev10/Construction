import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Easing helpers -------------------------------------------------- */
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const backOut = (x) => {
  const c1 = 1.28;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

/**
 * One construction element. Reads the shared build progress ref every frame
 * so the whole villa can be driven by a spring (hero) or by scroll (process)
 * without re-rendering React.
 */
function Part({ progressRef, order = 0, total = 12, lift = 3.2, position = [0, 0, 0], children }) {
  const group = useRef();
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    const start = (order / total) * 0.82;
    const t = clamp01((progressRef.current - start) / 0.2);
    const eased = t <= 0 ? 0 : backOut(t);
    node.position.set(base.x, base.y + (1 - clamp01(t)) * lift, base.z);
    node.scale.setScalar(Math.max(0.0001, eased));
    node.visible = t > 0.002;
  });

  return <group ref={group}>{children}</group>;
}

/* Shared materials ------------------------------------------------ */
function useVillaMaterials() {
  return useMemo(() => {
    const concrete = new THREE.MeshStandardMaterial({
      color: "#e9e3d8",
      roughness: 0.78,
      metalness: 0.04,
    });
    const warmStone = new THREE.MeshStandardMaterial({
      color: "#c8b294",
      roughness: 0.85,
      metalness: 0.02,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: "#22262e",
      roughness: 0.55,
      metalness: 0.35,
    });
    const plinth = new THREE.MeshStandardMaterial({
      color: "#14171d",
      roughness: 0.62,
      metalness: 0.2,
    });
    const glass = new THREE.MeshStandardMaterial({
      color: "#0e2a38",
      roughness: 0.06,
      metalness: 0.95,
      transparent: true,
      opacity: 0.6,
      emissive: new THREE.Color("#ffab5e"),
      emissiveIntensity: 0.22,
    });
    const water = new THREE.MeshStandardMaterial({
      color: "#1d6f86",
      roughness: 0.05,
      metalness: 0.7,
      transparent: true,
      opacity: 0.88,
      emissive: new THREE.Color("#0e3d52"),
      emissiveIntensity: 0.35,
    });
    const lawn = new THREE.MeshStandardMaterial({
      color: "#38492f",
      roughness: 0.95,
      metalness: 0,
    });
    const foliage = new THREE.MeshStandardMaterial({
      color: "#4c6b3c",
      roughness: 0.9,
      flatShading: true,
    });
    const trunk = new THREE.MeshStandardMaterial({ color: "#4a3a2c", roughness: 0.9 });
    const accent = new THREE.MeshStandardMaterial({
      color: "#b91c1c",
      roughness: 0.4,
      metalness: 0.25,
      emissive: new THREE.Color("#b91c1c"),
      emissiveIntensity: 0.4,
    });

    return { concrete, warmStone, dark, plinth, glass, water, lawn, foliage, trunk, accent };
  }, []);
}

/* Low-poly tree --------------------------------------------------- */
function Tree({ position, scale = 1, materials }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.32, 0]} material={materials.trunk}>
        <cylinderGeometry args={[0.06, 0.09, 0.64, 6]} />
      </mesh>
      <mesh castShadow position={[0, 0.86, 0]} material={materials.foliage}>
        <icosahedronGeometry args={[0.42, 0]} />
      </mesh>
      <mesh castShadow position={[0.16, 1.18, -0.08]} material={materials.foliage}>
        <icosahedronGeometry args={[0.26, 0]} />
      </mesh>
    </group>
  );
}

/* Vertical sun-shading fins -------------------------------------- */
function Louvres({ count = 9, materials }) {
  return (
    <group>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          castShadow
          material={materials.warmStone}
          position={[-1.5 + i * 0.42, 0, 0]}
          rotation={[0, 0.35, 0]}
        >
          <boxGeometry args={[0.09, 1.55, 0.16]} />
        </mesh>
      ))}
    </group>
  );
}

/* Blueprint ghost that fades out as the real building lands ------- */
function BlueprintGhost({ progressRef }) {
  const ref = useRef();
  const geometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(8.4, 4.1, 5.9)),
    []
  );
  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#e8cda0"),
        transparent: true,
        opacity: 0,
      }),
    []
  );

  useFrame(({ clock }) => {
    const p = progressRef.current;
    const fade = clamp01(p * 4) * (1 - clamp01((p - 0.35) / 0.45));
    material.opacity = fade * 0.55;
    if (ref.current) {
      ref.current.position.y = 2.05 + Math.sin(clock.elapsedTime * 0.8) * 0.04;
    }
  });

  return <lineSegments ref={ref} geometry={geometry} material={material} position={[0, 2.05, 0]} />;
}

/* Drifting dust motes -------------------------------------------- */
function DustMotes({ count = 90 }) {
  const ref = useRef();
  const { positions, seeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sd = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sd[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, seeds: sd };
  }, [count]);

  useFrame(({ clock }) => {
    const geom = ref.current?.geometry;
    if (!geom) return;
    const array = geom.attributes.position.array;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i += 1) {
      array[i * 3 + 1] = ((positions[i * 3 + 1] + t * 0.16 + seeds[i]) % 7.2) + 0.2;
      array[i * 3] = positions[i * 3] + Math.sin(t * 0.4 + seeds[i]) * 0.35;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#e8cda0"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * The villa model. `progressRef` is a mutable ref in [0, 1] describing how
 * much of the building has been assembled.
 */
export function Villa({ progressRef, interactive = true, spin = 0.07, scale = 1 }) {
  const root = useRef();
  const materials = useVillaMaterials();
  const target = useRef({ x: 0, y: 0 });

  /* Keep the model optically centred at any scale: the villa occupies roughly
     y = -0.6 … 4.4 in local units, so drop it by ~1.9 * scale. */
  const lift = -1.9 * scale;

  useFrame(({ clock, pointer }, delta) => {
    const node = root.current;
    if (!node) return;

    if (interactive) {
      target.current.y = pointer.x * 0.42;
      target.current.x = -pointer.y * 0.16;
    }

    const idle = clock.elapsedTime * spin;
    node.rotation.y = THREE.MathUtils.damp(
      node.rotation.y,
      idle + target.current.y,
      3,
      delta
    );
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, target.current.x, 3, delta);
    node.position.y = lift + Math.sin(clock.elapsedTime * 0.65) * 0.09 * scale;
  });

  return (
    <group ref={root} scale={scale} position-y={lift}>
      <BlueprintGhost progressRef={progressRef} />

      {/* 0 — site plinth */}
      <Part progressRef={progressRef} order={0} lift={1.6} position={[0, -0.3, 0]}>
        <mesh receiveShadow castShadow material={materials.plinth}>
          <boxGeometry args={[12.2, 0.6, 8.4]} />
        </mesh>
        <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12.2, 8.4]} />
          <meshStandardMaterial color="#1b1f27" roughness={0.85} metalness={0.1} />
        </mesh>
      </Part>

      {/* 1 — lawn + landscaping deck */}
      <Part progressRef={progressRef} order={1} position={[2.4, 0.02, 1.1]}>
        <mesh receiveShadow material={materials.lawn}>
          <boxGeometry args={[5.4, 0.06, 5.2]} />
        </mesh>
      </Part>

      {/* 2 — foundation slab */}
      <Part progressRef={progressRef} order={2} position={[-1.1, 0.14, 0]}>
        <mesh castShadow receiveShadow material={materials.concrete}>
          <boxGeometry args={[7.8, 0.28, 5.6]} />
        </mesh>
      </Part>

      {/* 3 — ground floor solid mass */}
      <Part progressRef={progressRef} order={3} position={[-2.55, 1.15, -0.1]}>
        <mesh castShadow receiveShadow material={materials.concrete}>
          <boxGeometry args={[2.6, 1.75, 4.9]} />
        </mesh>
      </Part>

      {/* 4 — ground floor glazing + back wall */}
      <Part progressRef={progressRef} order={4} position={[0.4, 1.15, 0]}>
        <mesh castShadow receiveShadow position={[0, 0, -2.34]} material={materials.dark}>
          <boxGeometry args={[3.5, 1.75, 0.22]} />
        </mesh>
        <mesh position={[0, 0, 2.3]} material={materials.glass}>
          <boxGeometry args={[3.4, 1.6, 0.1]} />
        </mesh>
        <mesh position={[1.72, 0, 0]} material={materials.glass}>
          <boxGeometry args={[0.1, 1.6, 4.6]} />
        </mesh>
        <pointLight position={[0, 0.3, 0]} color="#ffb066" intensity={4} distance={6} decay={2} />
      </Part>

      {/* 5 — first floor slab with cantilever */}
      <Part progressRef={progressRef} order={5} position={[-0.9, 2.16, 0.1]}>
        <mesh castShadow receiveShadow material={materials.concrete}>
          <boxGeometry args={[8.6, 0.26, 6.1]} />
        </mesh>
      </Part>

      {/* 6 — stone service core */}
      <Part progressRef={progressRef} order={6} position={[1.85, 1.75, -1.5]}>
        <mesh castShadow receiveShadow material={materials.warmStone}>
          <boxGeometry args={[1.15, 4.0, 1.4]} />
        </mesh>
      </Part>

      {/* 7 — upper floor volume */}
      <Part progressRef={progressRef} order={7} position={[-1.7, 3.16, -0.1]}>
        <mesh castShadow receiveShadow material={materials.concrete}>
          <boxGeometry args={[5.0, 1.7, 4.6]} />
        </mesh>
        <mesh position={[0, 0.05, 2.32]} material={materials.glass}>
          <boxGeometry args={[4.6, 1.05, 0.1]} />
        </mesh>
        <mesh position={[-2.52, 0.05, 0]} material={materials.glass}>
          <boxGeometry args={[0.1, 1.05, 3.6]} />
        </mesh>
      </Part>

      {/* 8 — sun-shading fins */}
      <Part progressRef={progressRef} order={8} lift={2} position={[-1.6, 3.2, 2.5]}>
        <Louvres materials={materials} />
      </Part>

      {/* 9 — roof slab, parapet, and a slim accent blade on the front edge */}
      <Part progressRef={progressRef} order={9} lift={4} position={[-1.1, 4.14, 0.1]}>
        <mesh castShadow receiveShadow material={materials.concrete}>
          <boxGeometry args={[7.4, 0.3, 5.9]} />
        </mesh>
        <mesh castShadow position={[0, 0.22, 2.88]} material={materials.accent}>
          <boxGeometry args={[7.44, 0.14, 0.16]} />
        </mesh>
        <mesh castShadow position={[-3.66, 0.22, 0]} material={materials.accent}>
          <boxGeometry args={[0.16, 0.14, 5.9]} />
        </mesh>
      </Part>

      {/* 10 — pool + deck */}
      <Part progressRef={progressRef} order={10} position={[3.6, 0.1, 1.4]}>
        <mesh receiveShadow material={materials.warmStone}>
          <boxGeometry args={[3.6, 0.14, 2.9]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} material={materials.water}>
          <boxGeometry args={[3.1, 0.12, 2.4]} />
        </mesh>
      </Part>

      {/* 11 — landscaping */}
      <Part progressRef={progressRef} order={11} position={[0, 0.05, 0]}>
        <Tree position={[4.9, 0, -2.1]} scale={1.15} materials={materials} />
        <Tree position={[-5.2, 0, 2.3]} scale={0.92} materials={materials} />
        <Tree position={[1.5, 0, 3.3]} scale={0.78} materials={materials} />
        <mesh castShadow position={[-4.6, 0.25, -2.4]} material={materials.dark}>
          <boxGeometry args={[1.5, 0.5, 2.6]} />
        </mesh>
      </Part>

      <DustMotes />
    </group>
  );
}

export default Villa;
