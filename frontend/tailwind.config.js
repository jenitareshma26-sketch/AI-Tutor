/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8E7",
        maroon: "#800000",
        gold: "#E6CBA8",
        ink: "#2E2E2E",
        sand: "#F4E7CD",
        rosewood: "#5E0E14",
      },
      boxShadow: {
        soft: "0 20px 50px rgba(94, 14, 20, 0.12)",
        glow: "0 18px 45px rgba(128, 0, 0, 0.16)",
      },
      borderRadius: {
        xl2: "1.35rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(-14px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        pulseDot: {
          "0%, 80%, 100%": { transform: "scale(0.65)", opacity: 0.45 },
          "40%": { transform: "scale(1)", opacity: 1 },
        },
        micPulse: {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(128,0,0,0.25)" },
          "70%": { transform: "scale(1.04)", boxShadow: "0 0 0 14px rgba(128,0,0,0)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(128,0,0,0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease forwards",
        slideInLeft: "slideInLeft 0.35s ease forwards",
        pulseDot: "pulseDot 1.2s infinite ease-in-out",
        micPulse: "micPulse 1.5s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
