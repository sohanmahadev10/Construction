import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { featuredServices, services } from "../data";
import { EASE, Magnetic, Reveal, SectionEyebrow, TiltCard, TiltStage, WordReveal } from "./ui";

function ServiceCard({ service, index = 0, compact = false }) {
  const Icon = service.icon;

  return (
    <TiltStage>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, delay: (index % 3) * 0.09, ease: EASE }}
      >
        <TiltCard className={`service-card ${compact ? "service-card-compact" : ""}`}>
          <img
            src={service.image}
            alt={`${service.title} by ISHTA Construction and Interior`}
            loading="lazy"
            className="service-image"
          />
          <span className="service-scrim" />
          <span className="service-ring" />

          <div className="service-body">
            <span className="service-icon">
              <Icon size={22} />
            </span>
            <div className="service-text">
              <span className="service-tag">Mandya · Mysore · Bangalore</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </TiltStage>
  );
}

function ServiceModal({ onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="service-modal"
      role="dialog"
      aria-modal="true"
      aria-label="All ISHTA services"
    >
      <div className="service-modal-head">
        <div className="shell flex items-center justify-between gap-4 py-5">
          <div>
            <SectionEyebrow tone="sand">Complete service studio</SectionEyebrow>
            <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-4xl">
              All 12 ISHTA services
            </h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close services">
            <X size={22} />
          </button>
        </div>
      </div>

      <div className="shell grid gap-6 pb-16 pt-8 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} compact />
        ))}
      </div>
    </motion.div>
  );
}

export default function Services({ open, setOpen }) {
  return (
    <section id="services" className="services">
      <div className="glow-orb glow-orb-left" />
      <div className="glow-orb glow-orb-right" />
      <div className="grain" />

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <Reveal>
              <SectionEyebrow>Services</SectionEyebrow>
            </Reveal>
            <WordReveal
              text="Core capabilities first. Every service one click away."
              className="display-title text-white"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="lede text-white/60">
              Start with the construction work that shapes the building, then open the full studio
              for interiors, renovation, planning, and turnkey execution — twelve services under one
              accountable team.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm font-medium uppercase tracking-[0.18em] text-white/40">
            12 professional services for homes, villas, commercial spaces, and interiors
          </p>
          <Magnetic>
            <button className="btn-primary" type="button" onClick={() => setOpen(true)}>
              View all services
              <ArrowUpRight size={18} />
            </button>
          </Magnetic>
        </Reveal>
      </div>

      <AnimatePresence>{open && <ServiceModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}
