import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Interiors, { WhyUs } from "./components/Interiors";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Splash from "./components/Splash";
import Testimonials from "./components/Testimonials";
import { AuroraCursor, ScrollProgress } from "./components/ui";
import { phoneHref, whatsappHref } from "./data";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const locked = showSplash || servicesOpen;
    document.body.classList.toggle("is-locked", locked);
    return () => document.body.classList.remove("is-locked");
  }, [showSplash, servicesOpen]);

  return (
    <div className="app-shell">
      <AnimatePresence>{showSplash && <Splash />}</AnimatePresence>

      <ScrollProgress />
      <AuroraCursor />
      <Header />

      <main>
        <Hero ready={!showSplash} />
        <About />
        <Services open={servicesOpen} setOpen={setServicesOpen} />
        <Projects />
        <WhyUs />
        <Process />
        <Interiors />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="float-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <span className="float-ring" />
        <MessageCircle size={24} />
      </a>
      <a href={phoneHref} className="float-call md:hidden" aria-label="Call ISHTA">
        <Phone size={22} />
      </a>
    </div>
  );
}
