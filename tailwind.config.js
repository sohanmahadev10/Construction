/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#111111",
        ember: "#b91c1c",
        brick: "#7f1d1d",
        linen: "#f6efe4",
        sand: "#ddc7a3",
        smoke: "#f8f7f4",
      },
      boxShadow: {
        premium: "0 28px 80px -34px rgba(17, 17, 17, 0.55)",
        glass: "0 24px 70px -36px rgba(17, 17, 17, 0.45)",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
