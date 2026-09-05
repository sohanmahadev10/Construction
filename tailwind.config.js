/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080b",
        coal: "#0f1115",
        graphite: "#161a21",
        ember: "#b91c1c",
        flame: "#ef4444",
        brick: "#7f1d1d",
        linen: "#f6efe4",
        sand: "#ddc7a3",
        gold: "#e8cda0",
        smoke: "#f7f6f3",
      },
      fontFamily: {
        display: ["Outfit", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        premium: "0 40px 90px -45px rgba(7, 8, 11, 0.75)",
        glass: "0 30px 80px -40px rgba(7, 8, 11, 0.65)",
        glow: "0 30px 70px -30px rgba(185, 28, 28, 0.65)",
        lift: "0 50px 120px -50px rgba(7, 8, 11, 0.85)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%,-6%,0) scale(1.12)" },
          "66%": { transform: "translate3d(-5%,4%,0) scale(0.94)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 68s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        aurora: "aurora 22s ease-in-out infinite",
        shimmer: "shimmer 3.4s linear infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
