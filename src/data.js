import {
  Bath,
  ChefHat,
  ClipboardCheck,
  DraftingCompass,
  Hammer,
  HardHat,
  Home,
  KeyRound,
  Landmark,
  Layers,
  PaintRoller,
  PanelsTopLeft,
  PlugZap,
  Sofa,
  Star,
  Warehouse,
} from "lucide-react";

export const phone = "+91 8277023241";
export const phoneHref = "tel:+918277023241";
export const whatsappHref =
  "https://wa.me/918277023241?text=Hi%20ISHTA%20Construction%20and%20Interior%2C%20I%20want%20to%20discuss%20a%20project.";
export const email = "Ishatconstructionandinterior@gmail.com";

export const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export const navItems = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Process", "#process"],
  ["Interiors", "#interiors"],
  ["Contact", "#contact"],
];

export const services = [
  {
    icon: Home,
    title: "Residential House Construction",
    text: "Custom homes planned around your family, site conditions, budget, and long-term comfort across Mandya, Mysore, and Bangalore.",
    image: assetPath("assets/services/residential-house-construction.png"),
  },
  {
    icon: Landmark,
    title: "Villa Construction",
    text: "Premium villa builds with strong structure, elegant elevations, refined finishes, and carefully managed site execution.",
    image: assetPath("assets/services/villa-construction.png"),
  },
  {
    icon: Warehouse,
    title: "Commercial Building Construction",
    text: "Practical, durable commercial spaces designed for daily operations, customer movement, compliance, and future expansion.",
    image: assetPath("assets/services/commercial-building-construction.png"),
  },
  {
    icon: Sofa,
    title: "Interior Design",
    text: "Complete interior concepts for homes, apartments, offices, and retail spaces with premium materials and balanced layouts.",
    image: assetPath("assets/services/interior-design.png"),
  },
  {
    icon: ChefHat,
    title: "Modular Kitchen",
    text: "Functional kitchens with smart storage, durable shutters, quality hardware, appliance planning, and clean installation.",
    image: assetPath("assets/services/modular-kitchen.png"),
  },
  {
    icon: PanelsTopLeft,
    title: "False Ceiling",
    text: "Modern ceiling designs with lighting integration, concealed services, clean edges, and elegant room-by-room styling.",
    image: assetPath("assets/services/false-ceiling.png"),
  },
  {
    icon: PaintRoller,
    title: "Painting",
    text: "Interior and exterior painting with surface preparation, color guidance, texture options, and neat finishing standards.",
    image: assetPath("assets/services/painting.png"),
  },
  {
    icon: Hammer,
    title: "Renovation",
    text: "Smart upgrades for older homes, flats, shops, and offices with practical phasing and minimum day-to-day disruption.",
    image: assetPath("assets/services/renovation.png"),
  },
  {
    icon: Layers,
    title: "Flooring",
    text: "Tile, granite, marble, wooden, and vitrified flooring solutions selected for durability, budget, and visual finish.",
    image: assetPath("assets/services/flooring.png"),
  },
  {
    icon: PlugZap,
    title: "Electrical and Plumbing",
    text: "Reliable wiring, fixtures, water lines, drainage, and service coordination for new builds and renovation projects.",
    image: assetPath("assets/services/electrical-plumbing.png"),
  },
  {
    icon: DraftingCompass,
    title: "Architectural Planning",
    text: "Thoughtful plans, elevations, working drawings, and space layouts shaped around site potential and client needs.",
    image: assetPath("assets/services/architectural-planning.png"),
  },
  {
    icon: KeyRound,
    title: "Turnkey Construction",
    text: "One-point responsibility from planning and construction to interiors, finishes, supervision, and final handover.",
    image: assetPath("assets/services/turnkey-construction.png"),
  },
];

export const featuredServices = services.slice(0, 3);

export const projects = [
  {
    title: "Premium Villa Build",
    type: "Construction",
    location: "Mysore",
    image: assetPath("assets/project-exterior.png"),
  },
  {
    title: "Luxury Living Interior",
    type: "Interior Design",
    location: "Bangalore",
    image: assetPath("assets/project-interior.png"),
  },
  {
    title: "Structural Site Execution",
    type: "Civil Works",
    location: "Mandya",
    image: assetPath("assets/process-site.png"),
  },
];

export const process = [
  {
    step: "01",
    title: "Consultation",
    text: "We understand your site, budget, timeline, lifestyle, and desired finish level.",
    detail: "Site visit, feasibility, and a clear starting brief.",
  },
  {
    step: "02",
    title: "Design & Estimate",
    text: "Concept, material direction, working scope, and transparent cost planning.",
    detail: "Plans, elevations, material board, and line-item costing.",
  },
  {
    step: "03",
    title: "Build & Monitor",
    text: "Skilled execution with site updates, quality checks, and schedule control.",
    detail: "Structure, services, finishing — supervised stage by stage.",
  },
  {
    step: "04",
    title: "Handover",
    text: "Finishing, inspection, final corrections, and a clean handover experience.",
    detail: "Snag list closed, systems tested, keys in your hand.",
  },
];

export const reasons = [
  {
    title: "One accountable team",
    text: "Single point coordination from concept to completion, so nothing falls between vendors.",
  },
  {
    title: "Material clarity",
    text: "Premium material guidance without unnecessary overspend or hidden substitutions.",
  },
  {
    title: "Local site strength",
    text: "Site-focused execution across Mandya, Mysore, and Bangalore with crews who know the ground.",
  },
  {
    title: "Finish that lasts",
    text: "Detailed finishing for both construction and interiors, checked before handover.",
  },
];

export const testimonials = [
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

export const heroStats = [
  { value: 3, suffix: "", label: "Cities served" },
  { value: 12, suffix: "+", label: "Specialist services" },
  { value: 360, suffix: "°", label: "Turnkey execution" },
];

export const interiorHighlights = [
  [Bath, "Kitchen & Bath"],
  [Sofa, "Living Spaces"],
  [Hammer, "Custom Furniture"],
  [Star, "Lighting & Finishes"],
];

export const aboutPillars = [
  [HardHat, "Civil Construction"],
  [Home, "Home Interiors"],
  [ClipboardCheck, "Project Management"],
];
