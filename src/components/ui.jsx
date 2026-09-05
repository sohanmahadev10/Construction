import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Scroll + pointer helpers                                            */
/* ------------------------------------------------------------------ */

export function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setCoarse(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return coarse;
}

/** Progress bar pinned to the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-ember via-flame to-sand"
      aria-hidden="true"
    />
  );
}

/** Soft trailing cursor — desktop pointers only. */
export function AuroraCursor() {
  const coarse = useIsCoarsePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (coarse || reduce) return undefined;
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target;
      setActive(Boolean(target.closest?.("a, button, input, select, textarea, [data-cursor]")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [coarse, reduce, x, y]);

  if (coarse || reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
    >
      <motion.span
        animate={{ scale: active ? 2.4 : 1, opacity: active ? 0.28 : 0.16 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="block h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(232,205,160,.95),rgba(185,28,28,.55)_55%,transparent_72%)] blur-[2px]"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal primitives                                                   */
/* ------------------------------------------------------------------ */

export function Reveal({ children, className = "", delay = 0, y = 32, once = true }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Headline that animates in word by word. */
export function WordReveal({ text, className = "", delay = 0, as = "h2" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.h2;
  const words = text.split(" ");

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "108%", opacity: 0, rotate: 4 },
              show: { y: "0%", opacity: 1, rotate: 0 },
            }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Counts up to `value` once the element scrolls into view. */
export function Counter({ value, suffix = "", duration = 1.6, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const started = useRef(null);

  useAnimationFrame((time) => {
    if (!inView || reduce || display === value) return;
    if (started.current === null) started.current = time;
    const progress = Math.min((time - started.current) / (duration * 1000), 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setDisplay(Math.round(eased * value));
  });

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Interaction primitives                                              */
/* ------------------------------------------------------------------ */

/** Button/link wrapper that leans towards the pointer. */
export function Magnetic({ children, strength = 0.32, className = "" }) {
  const ref = useRef(null);
  const coarse = useIsCoarsePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMove = (event) => {
    if (coarse || reduce) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts in 3D toward the pointer, with a moving sheen. */
export function TiltCard({
  children,
  className = "",
  intensity = 12,
  glare = true,
  scale = 1.02,
}) {
  const ref = useRef(null);
  const coarse = useIsCoarsePointer();
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConfig = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), springConfig);
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);

  const handleMove = (event) => {
    if (coarse || reduce) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileHover={coarse || reduce ? undefined : { scale }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        rotateX: coarse || reduce ? 0 : rotateX,
        rotateY: coarse || reduce ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`tilt-card ${className}`}
    >
      {children}
      {glare && !coarse && !reduce && (
        <motion.span
          aria-hidden="true"
          style={{ "--gx": glareX, "--gy": glareY }}
          className="tilt-glare"
        />
      )}
    </motion.div>
  );
}

/** Wraps content in a perspective context so TiltCard reads as real depth. */
export function TiltStage({ children, className = "", perspective = 1200 }) {
  return (
    <div className={className} style={{ perspective: `${perspective}px` }}>
      {children}
    </div>
  );
}

/** Image that drifts vertically as the section scrolls past. */
export function ParallaxImage({ src, alt, className = "", imgClassName = "", range = 60 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={reduce ? undefined : { y }}
        className={`h-[118%] w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Decoration                                                          */
/* ------------------------------------------------------------------ */

export function SectionEyebrow({ children, tone = "ember" }) {
  return (
    <span className={`eyebrow eyebrow-${tone}`}>
      <span className="eyebrow-dot" />
      {children}
    </span>
  );
}

export function Marquee({ items, className = "", speed = "animate-marquee" }) {
  const reduce = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className={`marquee-track ${reduce ? "" : speed}`}>
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function AuroraField({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <span className="aurora-blob aurora-blob-1" />
      <span className="aurora-blob aurora-blob-2" />
      <span className="aurora-blob aurora-blob-3" />
    </div>
  );
}
