import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1a1a1a",
          50: "#f5f5f5",
          100: "#e8e8e8",
          200: "#c8c8c8",
          300: "#a0a0a0",
          400: "#707070",
          500: "#505050",
          600: "#383838",
          700: "#2a2a2a",
          800: "#1a1a1a",
          900: "#0d0d0d",
        },
        ivory: {
          DEFAULT: "#f5f0e8",
          50: "#fdfcfa",
          100: "#f9f6f0",
          200: "#f5f0e8",
          300: "#ede4d4",
          400: "#dfd0b8",
          500: "#c8b090",
        },
        gold: {
          DEFAULT: "#c9a96e",
          light: "#e0c896",
          dark: "#a07840",
          muted: "#9a8060",
        },
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        dm: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        "fade-in": "fadeIn 1.5s ease forwards",
        "slide-up": "slideUp 0.8s ease forwards",
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 1%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-3%, 2%)" },
          "60%": { transform: "translate(1%, -4%)" },
          "70%": { transform: "translate(3%, 3%)" },
          "80%": { transform: "translate(-2%, 1%)" },
          "90%": { transform: "translate(2%, -1%)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        kenBurns: {
          from: { transform: "scale(1) translate(0, 0)" },
          to: { transform: "scale(1.08) translate(-1%, -1%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
