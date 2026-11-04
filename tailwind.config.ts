import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#fdfcf9",
          100: "#fbf8f0",
          200: "#f5edd8",
          300: "#ebdcb9",
          400: "#dec695",
          500: "#cdaf70",
        },
        mahogany: {
          900: "#22130b",
          800: "#361f12",
          700: "#4b2d1c",
          600: "#653f28",
          500: "#805236",
          400: "#a27253",
          300: "#c79e83",
        },
        burgundy: {
          900: "#480916",
          800: "#701124",
          700: "#8f172e",
          600: "#aa1b37",
          500: "#c42442",
          400: "#db4864",
          100: "#fbebee",
          50: "#fdf5f6",
        },
        gold: {
          900: "#4a350a",
          800: "#6f5010",
          700: "#946a16",
          600: "#b5841d",
          500: "#c59b27",
          400: "#d9b343",
          300: "#e7cb74",
          200: "#f2e1a9",
          100: "#faf4dd",
          50: "#fdfbf3",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam-pro)", "Be Vietnam Pro", "Inter", "Roboto", "-apple-system", "sans-serif"],
        serif: ["var(--font-lora)", "Lora", "Merriweather", "serif"],
      },
      boxShadow: {
        'sacred': '0 4px 20px -2px rgba(75, 45, 28, 0.08), 0 2px 6px -1px rgba(75, 45, 28, 0.04)',
        'sacred-lg': '0 10px 30px -4px rgba(75, 45, 28, 0.12), 0 4px 10px -2px rgba(75, 45, 28, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
