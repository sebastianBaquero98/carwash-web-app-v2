import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: "#383840",
        gray: "#F0F0F0",
        "rolex-green": "#016341",
        "f1-red": "#ED0100",
        "dark-blue": "#14141C",
        "navy-blue": "#023047",
        "light-blue": "#219EBC",
        "ferrari-red": "#F70D1A",
        "mclaren-orange": "#FF8000",
        "renualt-yellow": "#FFF500",
        "sauber-green": "#52E252",
        "rb-blue": "#6692FF",
        "bone-white": "#EAE9EC",
        orange: "#FB8500",
      },
      fontFamily: {
        sans: ["var(--font-f1)"],
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
export default config;
