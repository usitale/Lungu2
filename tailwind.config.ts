import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Safari-inspired premium palette
        safari: {
          brown: "#6B4226",
          "brown-dark": "#4A2E1A",
          "brown-light": "#8B5E3C",
          sand: "#D4A853",
          "sand-light": "#F5E6C8",
          "sand-pale": "#FBF5E9",
          green: "#2D5016",
          "green-dark": "#1A3009",
          "green-light": "#4A7A28",
          gold: "#C9992C",
          "gold-light": "#E8B84B",
          cream: "#F8F3E8",
          "dark-overlay": "rgba(0,0,0,0.55)",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.65) 100%)",
        "section-gradient":
          "linear-gradient(135deg, #FBF5E9 0%, #F5E6C8 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-down": "slideDown 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(107, 66, 38, 0.12)",
        "card-hover": "0 8px 40px rgba(107, 66, 38, 0.22)",
        premium: "0 2px 16px rgba(201, 153, 44, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
