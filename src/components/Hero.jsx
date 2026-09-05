import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, animate } from "framer-motion";
import { ArrowRight, Building2, MousePointerClick, Sparkles } from "lucide-react";
import { assetPath, heroStats } from "../data";
import VillaStage from "../three/VillaStage";
import { Counter, EASE, Magnetic, WordReveal, useIsCoarsePointer } from "./ui";

export default function Hero({ ready }) {
  const ref = useRef(null);
  const coarse = useIsCoarsePointer();
  const build = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const videoScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.18]), {
    stiffness: 90,
    damping: 30,
  });

  useEffect(() => {
    if (!ready) return undefined;
    const controls = animate(build, 1, { duration: 3.4, ease: [0.32, 0.8, 0.3, 1], delay: 0.35 });
    return () => controls.stop();
  }, [build, ready]);

  return (
    <section id="hero" ref={ref} className="hero">
      <motion.div style={{ scale: videoScale }} className="hero-media">
        <img src={assetPath("assets/hero-construction.png")} alt="" aria-hidden="true" />
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={assetPath("assets/hero-construction.png")}
          aria-hidden="true"
        >
          <source src={assetPath("assets/hero-construction-journey.mp4")} type="video/mp4" />
        </video>
      </motion.div>

      <div className="hero-veil" />
      <div className="hero-grid" />
      <div className="grain" />

      <div className="hero-inner">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="hero-copy">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            className="chip"
          >
            <Sparkles size={14} />
            From land to luxury handover
          </motion.span>

          <WordReveal
            as="h1"
            text="We build spaces worth living in."
            className="hero-title"
            delay={0.25}
          />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
            className="hero-sub"
          >
            <strong className="text-white">ISHTA Construction and Interior</strong> — your vision, our
            mission. Refined homes, practical interiors, and premium spaces delivered with
            disciplined execution across Mandya, Mysore, and Bangalore.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <a className="btn-primary" href="#contact">
                Start your project
                <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn-ghost" href="#projects">
                View projects
                <Building2 size={18} />
              </a>
            </Magnetic>
          </motion.div>

          <div className="hero-stats">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 26 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.05 + index * 0.12, duration: 0.8, ease: EASE }}
                className="stat-card"
              >
                <span className="stat-value">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="hero-stage-wrap">
          <VillaStage
            progress={build}
            className="hero-stage"
            label="Interactive 3D model of an ISHTA villa assembling itself"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
            className="stage-hint"
          >
            <MousePointerClick size={15} />
            {coarse ? "Live 3D villa preview" : "Move your cursor to orbit the model"}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="scroll-cue"
        aria-label="Scroll to about section"
      >
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
        Scroll
      </motion.a>
    </section>
  );
}
