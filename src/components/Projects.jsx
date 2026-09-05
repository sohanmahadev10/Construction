import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "../data";
import { EASE, ParallaxImage, Reveal, SectionEyebrow, TiltCard, TiltStage, WordReveal } from "./ui";

export default function Projects() {
  return (
    <section id="projects" className="section-light">
      <div className="mesh-light" />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Reveal>
              <SectionEyebrow>Projects</SectionEyebrow>
            </Reveal>
            <WordReveal
              text="Homes made to be lived in, not just photographed."
              className="display-title"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="lede text-coal/60">
              From foundation to final lighting, the gallery shows the kind of premium residential
              and interior outcomes ISHTA is designed to deliver.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <TiltStage key={project.title}>
              <motion.div
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
              >
                <TiltCard className="project-card" intensity={9}>
                  <ParallaxImage
                    src={project.image}
                    alt={project.title}
                    className="project-media"
                    range={40}
                  />
                  <span className="project-scrim" />
                  <div className="project-body">
                    <span className="project-tag">{project.type}</span>
                    <h3>{project.title}</h3>
                    <p>
                      <MapPin size={15} />
                      {project.location}
                    </p>
                  </div>
                  <span className="project-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </TiltCard>
              </motion.div>
            </TiltStage>
          ))}
        </div>
      </div>
    </section>
  );
}
