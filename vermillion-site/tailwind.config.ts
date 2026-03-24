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
    },
  },
  plugins: [],
};
export default config;
