import { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Preload } from "@react-three/drei";
import * as THREE from "three";
import Villa from "./Villa";

/** Sizes the model (and its contact shadow) to whatever canvas it lands in. */
function Rig({ progressRef, interactive, spin }) {
  const { viewport } = useThree();
  const scale = Math.min(0.92, viewport.width / 15.5);

  return (
    <>
      <Villa progressRef={progressRef} interactive={interactive} spin={spin} scale={scale} />
      <ContactShadows
        position={[0, -2.52 * scale, 0]}
        opacity={0.55}
        scale={26 * scale}
        blur={2.6}
        far={7 * scale}
        resolution={512}
        color="#000000"
      />
    </>
  );
}

/**
 * Villa canvas.
 *
 * `progress` is a framer-motion MotionValue (0 → 1) describing how much of the
 * building is assembled. It is mirrored into a plain ref so the r3f render loop
 * can read it without triggering React renders.
 */
export default function Scene({
  progress,
  className = "",
  cameraPosition = [11.5, 6.4, 12.5],
  fov = 30,
  interactive = true,
  spin = 0.07,
  quality = "high",
}) {
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = progress.get();
    return progress.on("change", (value) => {
      progressRef.current = value;
    });
  }, [progress]);

  const shadows = quality === "high";

  return (
    <Canvas
      className={className}
      shadows={shadows}
      dpr={quality === "high" ? [1, 1.85] : [1, 1.4]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: cameraPosition, fov }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.fog = new THREE.Fog("#07080b", 26, 46);
      }}
    >
      <Rig progressRef={progressRef} interactive={interactive} spin={spin} />

      <hemisphereLight args={["#cbd7e6", "#211a15", 0.9]} />
      <directionalLight
        position={[9, 12, 7]}
        intensity={2.4}
        color="#fff3e2"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0008}
      >
        <orthographicCamera attach="shadow-camera" args={[-14, 14, 14, -14, 0.1, 44]} />
      </directionalLight>
      <pointLight position={[-9, 4, -6]} intensity={38} distance={26} decay={2} color="#b91c1c" />
      <pointLight position={[7, 2.4, 8]} intensity={22} distance={22} decay={2} color="#e8cda0" />

      <Environment resolution={192} frames={1}>
        <Lightformer
          intensity={2.2}
          rotation-x={Math.PI / 2}
          position={[0, 9, -8]}
          scale={[14, 14, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.4}
          position={[-9, 3, 5]}
          scale={[8, 8, 1]}
          color="#e8cda0"
        />
        <Lightformer intensity={1.1} position={[9, 4, -5]} scale={[8, 8, 1]} color="#b91c1c" />
      </Environment>

      <Preload all />
    </Canvas>
  );
}
