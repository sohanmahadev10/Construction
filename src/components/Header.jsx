import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronRight, Menu, Phone, X } from "lucide-react";
import { assetPath, email, navItems, phone, phoneHref } from "../data";
import { EASE, Magnetic } from "./ui";

function Logo({ onClick }) {
  const [failed, setFailed] = useState(false);

  return (
    <a href="#hero" onClick={onClick} className="group flex items-center gap-3" aria-label="ISHTA home">
      <span className="logo-chip">
        {failed ? (
          <span className="font-display text-lg font-black text-ember">I</span>
        ) : (
          <img
            src={assetPath("assets/logo.png")}
            alt="ISHTA Construction and Interior logo"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-black uppercase tracking-[0.16em] text-white">
          Ishta
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
          Construction &amp; Interior
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 40));

  useEffect(() => {
    const sections = navItems
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
      className={`site-header ${scrolled ? "site-header-solid" : ""}`}
    >
      <nav className="site-nav">
        <Logo onClick={() => setMenuOpen(false)} />

        <div className="nav-pill">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="nav-link">
              {active === href && (
                <motion.span
                  layoutId="nav-active"
                  className="nav-active"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a className="nav-ghost" href={`mailto:${email}`}>
            Email
            <ArrowUpRight size={15} />
          </a>
          <Magnetic strength={0.24}>
            <a className="btn-primary btn-sm" href={phoneHref}>
              <Phone size={16} />
              {phone}
            </a>
          </Magnetic>
        </div>

        <button
          className="nav-toggle lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mobile-menu lg:hidden"
          >
            <div className="grid gap-1 px-4 pb-5 pt-2">
              {navItems.map(([label, href], index) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.045, ease: EASE }}
                  className="mobile-link"
                >
                  <span>{label}</span>
                  <ChevronRight size={16} />
                </motion.a>
              ))}
              <a className="btn-primary mt-3 w-full justify-center" href={phoneHref}>
                <Phone size={17} />
                Call {phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
