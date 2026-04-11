import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        primary: {
          50: "#FEF3F3",
          100: "#FDD8D8",
          200: "#FBA2A2",
          300: "#F96D6D",
          400: "#F23737",
          500: "#D62D2D",
          600: "#B72626",
          700: "#931F1F",
          800: "#6E1818",
          900: "#4A1010",
        },
        secondary: {
          50: "#E8ECFB",
          100: "#C1D0F7",
          200: "#9AB3F3",
          300: "#7397EF",
          400: "#4D7AEB",
          500: "#0D2A7A",
          600: "#0A1F5C",
          700: "#081545",
          800: "#050A2D",
          900: "#020315",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
          400: "#CBD5E1",
          500: "#D9D9D9",
          600: "#94A3B8",
          700: "#64748B",
          800: "#334155",
          900: "#1E293B",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
