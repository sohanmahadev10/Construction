import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { assetPath } from "../data";

const Scene = lazy(() => import("./Scene"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

function Fallback({ label }) {
  return (
    <div className="villa-fallback" role="img" aria-label={label}>
      <img src={assetPath("assets/project-exterior.png")} alt="" />
      <span />
    </div>
  );
}

/**
 * Mounts the WebGL villa only when it is worth doing: real WebGL support,
 * motion allowed, and the section actually on screen. Otherwise a static
 * render of a completed project stands in.
 */
export default function VillaStage({
  progress,
  label = "3D model of a modern villa assembling itself",
  className = "",
  ...sceneProps
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "300px 0px 300px 0px" });
  const reduce = useReducedMotion();
  const [capable, setCapable] = useState(null);
  const [quality, setQuality] = useState("high");

  useEffect(() => {
    setCapable(supportsWebGL());
    const lowPower =
      window.matchMedia("(max-width: 767px)").matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    setQuality(lowPower ? "low" : "high");
  }, []);

  const show = capable && !reduce && inView;

  return (
    <div ref={ref} className={`villa-stage ${className}`} aria-label={label} role="group">
      {show ? (
        <Suspense fallback={<Fallback label={label} />}>
          <Scene progress={progress} quality={quality} {...sceneProps} />
        </Suspense>
      ) : (
        <Fallback label={label} />
      )}
    </div>
  );
}
