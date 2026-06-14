import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bath,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ChefHat,
  Hammer,
  HardHat,
  Home,
  Droplets,
  DraftingCompass,
  KeyRound,
  Landmark,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Paintbrush,
  PaintRoller,
  PanelsTopLeft,
  Phone,
  PlugZap,
  Quote,
  Ruler,
  ShieldCheck,
  Sofa,
  Sparkles,
  Star,
  Warehouse,
  X,
} from "lucide-react";

const phone = "+91 8277023241";
const phoneHref = "tel:+918277023241";
const whatsappHref =
  "https://wa.me/918277023241?text=Hi%20ISHTA%20Construction%20and%20Interior%2C%20I%20want%20to%20discuss%20a%20project.";
const email = "Ishatconstructionandinterior@gmail.com";

const navItems = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Process", "#process"],
  ["Interiors", "#interiors"],
  ["Contact", "#contact"],
];

const services = [
  {
    icon: Home,
    title: "Residential House Construction",
    text: "Custom homes planned around your family, site conditions, budget, and long-term comfort across Mandya, Mysore, and Bangalore.",
  },
  {
    icon: Landmark,
    title: "Villa Construction",
    text: "Premium villa builds with strong structure, elegant elevations, refined finishes, and carefully managed site execution.",
  },
  {
    icon: Warehouse,
    title: "Commercial Building Construction",
    text: "Practical, durable commercial spaces designed for daily operations, customer movement, compliance, and future expansion.",
  },
  {
    icon: Sofa,
    title: "Interior Design",
    text: "Complete interior concepts for homes, apartments, offices, and retail spaces with premium materials and balanced layouts.",
  },
  {
    icon: ChefHat,
    title: "Modular Kitchen",
    text: "Functional kitchens with smart storage, durable shutters, quality hardware, appliance planning, and clean installation.",
  },
  {
    icon: PanelsTopLeft,
    title: "False Ceiling",
    text: "Modern ceiling designs with lighting integration, concealed services, clean edges, and elegant room-by-room styling.",
  },
  {
    icon: PaintRoller,
    title: "Painting",
    text: "Interior and exterior painting with surface preparation, color guidance, texture options, and neat finishing standards.",
  },
  {
    icon: Hammer,
    title: "Renovation",
    text: "Smart upgrades for older homes, flats, shops, and offices with practical phasing and minimum day-to-day disruption.",
  },
  {
    icon: Layers,
    title: "Flooring",
    text: "Tile, granite, marble, wooden, and vitrified flooring solutions selected for durability, budget, and visual finish.",
  },
  {
    icon: PlugZap,
    title: "Electrical and Plumbing",
    text: "Reliable wiring, fixtures, water lines, drainage, and service coordination for new builds and renovation projects.",
  },
  {
    icon: DraftingCompass,
    title: "Architectural Planning",
    text: "Thoughtful plans, elevations, working drawings, and space layouts shaped around site potential and client needs.",
  },
  {
    icon: KeyRound,
    title: "Turnkey Construction",
    text: "One-point responsibility from planning and construction to interiors, finishes, supervision, and final handover.",
  },
];

const projects = [
  {
    title: "Premium Villa Build",
    type: "Construction",
    location: "Mysore",
    image: "/assets/project-exterior.png",
  },
  {
    title: "Luxury Living Interior",
    type: "Interior Design",
    location: "Bangalore",
    image: "/assets/project-interior.png",
  },
  {
    title: "Structural Site Execution",
    type: "Civil Works",
    location: "Mandya",
    image: "/assets/process-site.png",
  },
];

const process = [
  ["01", "Consultation", "We understand your site, budget, timeline, lifestyle, and desired finish level."],
  ["02", "Design & Estimate", "Concept, material direction, working scope, and transparent cost planning."],
  ["03", "Build & Monitor", "Skilled execution with site updates, quality checks, and schedule control."],
  ["04", "Handover", "Finishing, inspection, final corrections, and a clean handover experience."],
];

const reasons = [
  "Single point coordination from concept to completion",
  "Premium material guidance without unnecessary overspend",
  "Site-focused execution for Mandya, Mysore, and Bangalore",
  "Detailed finishing for both construction and interiors",
];

const testimonials = [
  {
    name: "Raghavendra M.",
    place: "Mandya",
    text: "ISHTA handled our house construction with clear communication and careful site supervision. The finish came out better than we expected.",
  },
  {
    name: "Priya S.",
    place: "Mysore",
    text: "Their interior team understood our taste quickly and gave our apartment a premium, practical look without wasting space.",
  },
  {
    name: "Naveen K.",
    place: "Bangalore",
    text: "Professional planning, neat execution, and responsive updates. It felt like the team cared about the home as much as we did.",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Logo() {
  const [failed, setFailed] = useState(false);

  return (
    <a href="#hero" className="flex items-center gap-3" aria-label="ISHTA home">
      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-sm border border-white/20 bg-white shadow-lg">
        {!failed ? (
          <img
            src="/assets/logo.png"
            alt="ISHTA Construction and Interior logo"
            className="h-full w-full object-contain p-1"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-lg font-black text-ember">I</span>
        )}
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-black uppercase tracking-wide text-coal sm:text-base">
          ISHTA
        </span>
        <span className="block text-[10px] font-semibold uppercase text-coal/60 sm:text-xs">
          Construction & Interior
        </span>
      </span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const submitContact = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nLocation: ${data.get(
        "location"
      )}\nService: ${data.get("service")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-smoke font-display text-coal">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-coal/10 bg-white/95 shadow-[0_18px_50px_-35px_rgba(17,17,17,.7)] backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-black uppercase text-coal transition hover:text-ember"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <a className="icon-pill" href={`mailto:${email}`} aria-label="Email ISHTA">
              <Mail size={18} />
            </a>
            <a className="btn-dark" href={phoneHref}>
              <Phone size={18} />
              {phone}
            </a>
          </div>
          <button
            className="grid h-11 w-11 place-items-center rounded-sm border border-coal/10 bg-white lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-coal/10 bg-white px-4 py-5 shadow-premium lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-sm px-3 py-3 text-sm font-extrabold uppercase text-coal hover:bg-linen"
                >
                  {label}
                  <ChevronRight size={17} />
                </a>
              ))}
              <a className="btn-red mt-3 justify-center" href={phoneHref}>
                <Phone size={18} />
                Call {phone}
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        <section id="hero" className="relative min-h-[92svh] overflow-hidden pt-20 text-white">
          <img
            src="/assets/hero-construction.png"
            alt="Premium construction and interior project"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,.92),rgba(17,17,17,.58),rgba(17,17,17,.18))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(185,28,28,.32),transparent_34%)]" />
          <div className="relative mx-auto grid min-h-[calc(92svh-5rem)] max-w-7xl content-center px-4 pb-10 pt-16 sm:px-6 lg:px-8">
            <Reveal className="max-w-4xl">
              <span className="inline-flex items-center gap-2 border-l-4 border-ember bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] backdrop-blur">
                <Sparkles size={16} />
                Mandya . Mysore . Bangalore
              </span>
              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.96] text-white sm:text-6xl lg:text-7xl">
                ISHTA Construction and Interior
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-semibold text-white/90 sm:text-2xl">
                Your Vision, Our Mission. We build refined homes, practical interiors, and premium spaces with disciplined execution.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a className="btn-red" href="#contact">
                  Start Your Project
                  <ArrowRight size={19} />
                </a>
                <a className="btn-glass" href="#projects">
                  View Projects
                  <Building2 size={19} />
                </a>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:max-w-4xl">
              {[
                ["3", "Cities served"],
                ["360", "Degree execution"],
                ["100%", "Construction + interiors"],
              ].map(([value, label], index) => (
                <Reveal key={label} delay={index * 0.08} className="glass-panel px-5 py-4">
                  <span className="block text-3xl font-black text-white">{value}</span>
                  <span className="text-sm font-semibold text-white/70">{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <Reveal>
              <p className="eyebrow">About ISHTA</p>
              <h2 className="section-title">Built for clients who care about finish, clarity, and trust.</h2>
            </Reveal>
            <Reveal delay={0.1} className="grid gap-6">
              <p className="text-lg leading-8 text-coal/70">
                ISHTA Construction and Interior brings civil construction, interior execution, and renovation services under one focused team. We serve Mandya, Mysore, and Bangalore with a premium yet practical approach: strong structure, clean planning, better materials, and details that feel considered.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [HardHat, "Civil Construction"],
                  [Home, "Home Interiors"],
                  [ClipboardCheck, "Project Management"],
                ].map(([Icon, label]) => (
                  <div key={label} className="mini-card">
                    <Icon className="text-ember" size={26} />
                    <span className="font-extrabold">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="services" className="section bg-linen bg-fine-grid bg-[length:32px_32px]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Services</p>
              <h2 className="section-title">Construction strength with interior-grade attention.</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 0.035} className="service-card group">
                  <span className="service-icon transition duration-300 group-hover:bg-ember group-hover:shadow-[0_18px_40px_-22px_rgba(185,28,28,.9)]">
                    <Icon size={28} />
                  </span>
                  <h3 className="mt-7 text-xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-coal/70">{text}</p>
                  <p className="mt-6 flex items-center gap-2 border-t border-coal/10 pt-5 text-xs font-black uppercase tracking-[0.16em] text-ember">
                    <MapPin size={15} />
                    Mandya . Mysore . Bangalore
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section bg-coal text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <Reveal>
                <p className="eyebrow text-sand">Projects</p>
                <h2 className="section-title text-white">A portfolio feel for homes that need to be lived in, not just photographed.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-2xl text-lg leading-8 text-white/70">
                  From foundation to final lighting, the gallery shows the kind of premium residential and interior outcomes ISHTA is designed to deliver.
                </p>
              </Reveal>
            </div>
            <div className="mt-11 grid gap-5 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.title} delay={index * 0.08} className="project-card group">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-flex bg-ember px-3 py-1 text-xs font-black uppercase">{project.type}</span>
                    <h3 className="mt-3 text-2xl font-black">{project.title}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white/75">
                      <MapPin size={16} />
                      {project.location}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="section bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <Reveal>
              <p className="eyebrow">Why Choose Us</p>
              <h2 className="section-title">Premium does not mean complicated. It means well managed.</h2>
              <p className="mt-6 text-lg leading-8 text-coal/70">
                ISHTA keeps the building journey clear: accountable work, careful details, and decisions made with your budget and long-term comfort in mind.
              </p>
            </Reveal>
            <div className="grid gap-4">
              {reasons.map((reason, index) => (
                <Reveal key={reason} delay={index * 0.07} className="reason-row">
                  <CheckCircle2 className="shrink-0 text-ember" size={24} />
                  <span>{reason}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section bg-linen">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <Reveal className="relative overflow-hidden rounded-sm shadow-premium">
              <img src="/assets/process-site.png" alt="ISHTA construction process site" className="h-[460px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-coal/78 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-black uppercase text-sand">Construction Process</p>
                <h2 className="mt-2 text-3xl font-black">From first meeting to final handover.</h2>
              </div>
            </Reveal>
            <div className="grid content-center gap-4">
              {process.map(([step, title, text], index) => (
                <Reveal key={step} delay={index * 0.07} className="process-row">
                  <span className="process-number">{step}</span>
                  <span>
                    <span className="block text-xl font-black">{title}</span>
                    <span className="mt-1 block leading-7 text-coal/70">{text}</span>
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="interiors" className="section bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8">
            <Reveal>
              <p className="eyebrow">Interiors</p>
              <h2 className="section-title">Spaces with warmth, storage, lighting, and a finished rhythm.</h2>
              <p className="mt-6 text-lg leading-8 text-coal/70">
                We design interiors that feel premium without becoming fragile. Every room is planned for daily living: lighting mood, storage behavior, material durability, and a calm visual flow.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [Bath, "Kitchen & Bath"],
                  [Sofa, "Living Spaces"],
                  [Hammer, "Custom Furniture"],
                  [Star, "Lighting & Finishes"],
                ].map(([Icon, label]) => (
                  <div key={label} className="mini-card">
                    <Icon className="text-ember" size={25} />
                    <span className="font-extrabold">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <img src="/assets/project-interior.png" alt="Premium ISHTA interior project" className="h-[540px] w-full rounded-sm object-cover shadow-premium" />
              <div className="absolute -bottom-5 left-4 right-4 glass-panel border-white/50 bg-white/75 p-5 text-coal shadow-glass sm:left-8 sm:right-auto sm:w-72">
                <Award className="text-ember" size={28} />
                <p className="mt-3 text-lg font-black">Designed for comfort. Detailed for longevity.</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section bg-coal text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-sand">Testimonials</p>
              <h2 className="section-title text-white">Clients choose ISHTA when trust matters as much as design.</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <Reveal key={item.name} delay={index * 0.08} className="testimonial-card">
                  <Quote className="text-ember" size={34} />
                  <p className="mt-5 leading-8 text-white/75">{item.text}</p>
                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="font-black">{item.name}</p>
                    <p className="text-sm font-semibold text-sand">{item.place}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section bg-linen">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h2 className="section-title">Tell us what you want to build.</h2>
              <p className="mt-6 text-lg leading-8 text-coal/70">
                Share your location, project type, and timeline. ISHTA will help you shape the next step clearly.
              </p>
              <div className="mt-8 grid gap-4">
                <a className="contact-row" href={phoneHref}>
                  <Phone className="text-ember" size={22} />
                  <span>{phone}</span>
                </a>
                <a className="contact-row" href={`mailto:${email}`}>
                  <Mail className="text-ember" size={22} />
                  <span>{email}</span>
                </a>
                <div className="contact-row">
                  <MapPin className="text-ember" size={22} />
                  <span>Mandya, Mysore, Bangalore</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <form onSubmit={submitContact} className="contact-form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span>Name</span>
                    <input name="name" required placeholder="Your name" />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input name="phone" required placeholder="+91 ..." />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span>Location</span>
                    <select name="location" defaultValue="Mandya">
                      <option>Mandya</option>
                      <option>Mysore</option>
                      <option>Bangalore</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    <span>Service</span>
                    <select name="service" defaultValue="Construction">
                      <option>Construction</option>
                      <option>Interior Design</option>
                      <option>Renovation</option>
                      <option>Consultation</option>
                    </select>
                  </label>
                </div>
                <label>
                  <span>Project Details</span>
                  <textarea name="message" rows="5" required placeholder="Tell us about the site, size, timeline, and vision." />
                </label>
                <button className="btn-red justify-center" type="submit">
                  Send Enquiry
                  <ArrowRight size={19} />
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-coal px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-black">ISHTA Construction and Interior</p>
            <p className="mt-1 text-sm font-semibold text-white/60">We Build Your Vision across Mandya, Mysore, and Bangalore.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="footer-link" href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              WhatsApp
            </a>
            <a className="footer-link" href={phoneHref}>
              <Phone size={17} />
              Call
            </a>
            <a className="footer-link" href={`mailto:${email}`}>
              <Mail size={17} />
              Email
            </a>
          </div>
        </div>
      </footer>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_-16px_rgba(37,211,102,.9)] transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      <a
        href={phoneHref}
        className="fixed bottom-5 left-5 z-40 flex h-14 items-center gap-2 rounded-full bg-ember px-5 text-sm font-black uppercase text-white shadow-[0_18px_45px_-18px_rgba(185,28,28,.9)] md:hidden"
      >
        <Phone size={20} />
        Call
      </a>
    </div>
  );
}

export default App;
