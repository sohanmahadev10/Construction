import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { aboutPillars, assetPath } from "../data";
import { Marquee, Reveal, SectionEyebrow, WordReveal } from "./ui";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="about"
      style={{ "--about-poster": `url(${assetPath("assets/project-exterior.png")})` }}
    >
      <motion.div style={{ y: mediaY }} className="about-media">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={assetPath("assets/project-exterior.png")}
          aria-hidden="true"
        >
          <source src={assetPath("assets/Mansion.mp4")} type="video/mp4" />
        </video>
      </motion.div>
      <div className="about-veil" />
      <div className="grain" />

      <div className="shell relative grid gap-12 py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-36">
        <div>
          <Reveal>
            <SectionEyebrow tone="sand">About ISHTA</SectionEyebrow>
          </Reveal>
          <WordReveal
            text="Built for clients who care about finish, clarity, and trust."
            className="display-title text-white"
          />
          <Reveal delay={0.12}>
            <p className="lede text-white/70">
              ISHTA Construction and Interior brings civil construction, interior execution, and
              renovation under one focused team. We serve Mandya, Mysore, and Bangalore with a
              premium yet practical approach: strong structure, clean planning, better materials,
              and details that feel considered.
            </p>
          </Reveal>

          <div className="mt-9 flex flex-wrap gap-3">
            {aboutPillars.map(([Icon, label], index) => (
              <Reveal key={label} delay={0.18 + index * 0.08}>
                <span className="pillar">
                  <Icon size={18} className="text-sand" />
                  {label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="about-panel">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-sand">
            Mandya · Mysore · Bangalore
          </p>
          <h3 className="mt-4 font-display text-3xl font-black leading-tight text-white">
            Premium construction and interiors under one roof.
          </h3>
          <p className="mt-4 leading-7 text-white/60">
            From the first site walk to the final styling pass, one team stays accountable for the
            structure, the services, and the finish.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            {[
              ["Structure", "Load-tested, code-aware civil work"],
              ["Interiors", "Material-led, storage-first planning"],
              ["Timeline", "Stage gates with weekly site updates"],
              ["Handover", "Snag-closed, tested, documented"],
            ].map(([term, detail]) => (
              <div key={term} className="about-fact">
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Marquee
        className="about-marquee"
        items={[
          "Residential",
          "Villas",
          "Commercial",
          "Interiors",
          "Renovation",
          "Turnkey",
          "Modular Kitchen",
          "Flooring",
        ]}
      />
    </section>
  );
}
