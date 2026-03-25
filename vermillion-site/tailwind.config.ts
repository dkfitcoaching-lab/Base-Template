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
        bg: "#0A0A0E",
        surface: {
          1: "#12121A",
          2: "#1A1A24",
          3: "#222230",
        },
        vermillion: {
          DEFAULT: "#C03030",
          light: "#E04040",
          glow: "rgba(192, 48, 48, 0.15)",
          dark: "#8A2020",
        },
        border: "#2A2A38",
        text: {
          primary: "#E8E8F0",
          body: "#C0C0CC",
          secondary: "#808090",
          caption: "#505060",
        },
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        hero: "20px",
      },
      borderWidth: {
        thin: "0.5px",
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(192, 48, 48, 0.15), 0 0 5px rgba(192, 48, 48, 0.1)",
        "glow-md": "0 0 30px rgba(192, 48, 48, 0.2), 0 0 10px rgba(192, 48, 48, 0.15)",
        "glow-lg": "0 0 60px rgba(192, 48, 48, 0.25), 0 0 20px rgba(192, 48, 48, 0.2)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "scan-line": "scan-line 4s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scan-line": {
          "0%": { top: "-2px" },
          "100%": { top: "100%" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
