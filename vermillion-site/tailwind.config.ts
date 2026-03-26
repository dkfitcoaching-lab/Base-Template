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
          DEFAULT: "#B42B2B",
          light: "#D44040",
          glow: "rgba(180, 43, 43, 0.15)",
          dark: "#7A1C1C",
          muted: "#963333",
        },
        neon: {
          DEFAULT: "#FF1744",
          glow: "rgba(255, 23, 68, 0.15)",
          soft: "rgba(255, 23, 68, 0.06)",
          muted: "rgba(255, 23, 68, 0.03)",
        },
        depth: {
          DEFAULT: "#0D0A1A",
          glow: "rgba(13, 10, 26, 0.6)",
          accent: "rgba(30, 20, 60, 0.1)",
          violet: "rgba(75, 20, 120, 0.08)",
        },
        border: "#333345",
        text: {
          primary: "#EDEDF4",
          body: "#B8B8C8",
          secondary: "#8E8EA0",
          caption: "#606072",
        },
      },
      fontSize: {
        overline: ["0.6875rem", { letterSpacing: "0.2em", lineHeight: "1.2" }],
        "display-lg": ["5.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["7rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      lineHeight: {
        body: "1.75",
        heading: "1.15",
      },
      spacing: {
        "section-y": "8rem",
        "section-y-lg": "10rem",
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "Cinzel", "serif"],
        body: ["var(--font-source-sans)", "Source Sans 3", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        display: ["var(--font-cinzel-decorative)", "Cinzel Decorative", "serif"],
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
        "glow-sm": "0 0 15px rgba(180, 43, 43, 0.15), 0 0 5px rgba(180, 43, 43, 0.1)",
        "glow-md": "0 0 30px rgba(180, 43, 43, 0.2), 0 0 10px rgba(180, 43, 43, 0.15)",
        "glow-lg": "0 0 60px rgba(180, 43, 43, 0.25), 0 0 20px rgba(180, 43, 43, 0.2)",
        "neon-sm": "0 0 10px rgba(255, 23, 68, 0.2), 0 0 4px rgba(255, 23, 68, 0.15)",
        "neon-md": "0 0 25px rgba(255, 23, 68, 0.25), 0 0 8px rgba(255, 23, 68, 0.2)",
        "neon-lg": "0 0 50px rgba(255, 23, 68, 0.3), 0 0 15px rgba(255, 23, 68, 0.25)",
        "neon-border": "0 0 15px rgba(255, 23, 68, 0.1), inset 0 0 15px rgba(255, 23, 68, 0.05)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
        "card-hover": "0 20px 40px rgba(0, 0, 0, 0.35), 0 0 30px rgba(255, 23, 68, 0.08)",
        "card-idle": "0 4px 20px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "scan-line": "scan-line 4s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        "neon-flicker": "neon-flicker 0.15s ease-in-out forwards",
        "pulse-ambient": "pulse-ambient 6s ease-in-out infinite",
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
        "neon-pulse": {
          "0%, 100%": { opacity: "0.6", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.2)" },
        },
        "neon-flicker": {
          "0%": { opacity: "0.4" },
          "20%": { opacity: "1" },
          "40%": { opacity: "0.7" },
          "60%": { opacity: "1" },
          "80%": { opacity: "0.85" },
          "100%": { opacity: "1" },
        },
        "pulse-ambient": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
