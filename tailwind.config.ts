import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E31E24",
          "red-dark": "#B8151A",
          "red-light": "#FF3B42",
          black: "#0A0A0A",
          gray: "#F5F5F5",
          "gray-dark": "#333333",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
