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
        // Bảng màu Premium Catholic Editorial Design
        catholic: {
          wine: "#762F3A",       // Đỏ rượu vang
          wineDark: "#5E252E",   // Đỏ rượu đậm
          wineLight: "#8F3A47",  // Đỏ rượu sáng
          gold: "#B39A70",       // Vàng đồng cổ
          goldLight: "#C9B592",  // Vàng đồng sáng
          goldDark: "#947C54",   // Vàng đồng trầm
          ivory: "#F7F4EE",      // Kem ngà
          charcoal: "#403A34",   // Nâu than
          stoneWarm: "#E7E0D5",  // Đá ấm
        },
        parchment: {
          50: "#FAF8F5",
          100: "#F7F4EE",
          200: "#EFEAE0",
          300: "#E7E0D5",
          400: "#D3C8B7",
          500: "#B39A70",
        },
        burgundy: {
          900: "#451B22",
          800: "#5E252E",
          700: "#762F3A",
          600: "#8F3A47",
          500: "#A94454",
          100: "#F5E9EB",
          50: "#FAF3F4",
        },
        gold: {
          900: "#4D3F28",
          800: "#6E5B3B",
          700: "#947C54",
          600: "#B39A70",
          500: "#C9B592",
          400: "#D8C7A9",
          300: "#E6D9C3",
          200: "#F0E8D9",
          100: "#F8F5EE",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam-pro)", "Be Vietnam Pro", "Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-lora)", "Lora", "Cormorant Garamond", "Merriweather", "serif"],
      },
      boxShadow: {
        'sacred': '0 4px 20px -2px rgba(64, 58, 52, 0.08), 0 2px 6px -1px rgba(64, 58, 52, 0.04)',
        'sacred-lg': '0 10px 30px -4px rgba(64, 58, 52, 0.12), 0 4px 10px -2px rgba(64, 58, 52, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
