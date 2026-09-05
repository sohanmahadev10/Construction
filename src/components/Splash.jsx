import { motion } from "framer-motion";
import { assetPath } from "../data";
import { EASE } from "./ui";

export default function Splash() {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(14px)" }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-hidden="true"
    >
      <video
        className="splash-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={assetPath("assets/hero-construction.png")}
      >
        <source src={assetPath("assets/hero-construction-journey.mp4")} type="video/mp4" />
      </video>
      <div className="splash-veil" />
      <div className="splash-grid" />

      <div className="relative grid justify-items-center gap-7 px-6 text-center">
        <motion.span
          className="splash-mark"
          initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <span className="splash-mark-ring" />
          <span className="splash-mark-ring splash-mark-ring-delay" />
          <img src={assetPath("assets/logo.png")} alt="" />
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-sand">Welcome to</p>
          <h1 className="mt-3 font-display text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-7xl">
            Ishta
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
            Construction &amp; Interior
          </p>
        </motion.div>

        <motion.div
          className="splash-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.9, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
