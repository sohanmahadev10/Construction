import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { process } from "../data";
import VillaStage from "../three/VillaStage";
import { SectionEyebrow, WordReveal } from "./ui";

/**
 * Sticky, scroll-driven build sequence: the 3D villa assembles as the four
 * process steps advance.
 */
export default function Process() {
  const track = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const build = useTransform(smooth, [0.02, 0.92], [0, 1], { clamp: true });
  const lineScale = useTransform(smooth, [0.02, 0.92], [0, 1], { clamp: true });

  useMotionValueEvent(smooth, "change", (value) => {
    const index = Math.min(process.length - 1, Math.floor(value * process.length * 1.04));
    setActiveStep(index < 0 ? 0 : index);
  });

  return (
    <section id="process" className="process">
      <div className="glow-orb glow-orb-left" />
      <div className="grain" />

      <div ref={track} className="process-track">
        <div className="process-sticky">
          <div className="shell grid h-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="process-stage-wrap">
              <VillaStage
                progress={build}
                className="process-stage"
                cameraPosition={[12.5, 7.2, 13]}
                fov={28}
                spin={0.045}
                label="3D villa model assembling in step with the construction process"
              />
              <div className="process-stage-caption">
                <span className="live-dot" />
                Live build preview — step {activeStep + 1} of {process.length}
              </div>
            </div>

            <div className="process-copy">
              <SectionEyebrow>Process</SectionEyebrow>
              <WordReveal
                text="From first meeting to final handover."
                className="display-title text-white"
              />

              <div className="process-list">
                <span className="process-rail">
                  <motion.span style={{ scaleY: lineScale }} className="process-rail-fill" />
                </span>

                {process.map((item, index) => (
                  <div
                    key={item.step}
                    className={`process-item ${index === activeStep ? "is-active" : ""} ${
                      index < activeStep ? "is-done" : ""
                    }`}
                  >
                    <span className="process-num">{item.step}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <motion.p
                        initial={false}
                        animate={{
                          height: index === activeStep ? "auto" : 0,
                          opacity: index === activeStep ? 1 : 0,
                        }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="process-detail"
                      >
                        <span>{item.detail}</span>
                      </motion.p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
