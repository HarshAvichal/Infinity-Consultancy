/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",              // Ensure Tailwind scans your index.html in public
    "./src/**/*.{js,jsx,ts,tsx}" // Scan all React files in the src directory
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-mobile": "marquee 80s linear infinite",
        marquee2: "marquee2 40s linear infinite",
        blob: 'blob 3s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        blob: {
          '50%': { top: '54%', left: '56%' },
        }
      },
      fontFamily: {
        mullish: ["Inter", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        deepBlue: "#070c1b",
        lightBlue: "#c9a45c",
        lightBlue300: "#d8b873",
        lightBlue500: "#b08a3e",
        greenLight: "#ecd9a8",
        goldDeep: "#8f6d28",
        ivory: "#faf8f4",
        sand: "#f3eee4",
        grayText: "#666b7a",
        lightGray: "#e6e1d6",
        grayBlue: "#2a3552",
        deepBlueHead: "#0e1730",
        gray2: "#4a5068",
        grayish: "#ece8df",
      },
    },
  },
  plugins: [],
};

