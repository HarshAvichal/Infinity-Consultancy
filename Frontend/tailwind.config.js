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
        'marquee-slow': "marquee 80s linear infinite",
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
        mullish: ["Mulish", "sans-serif"],
      },
      colors: {
        deepBlue: "#02042a",
        lightBlue: "#2b84ea",
        lightBlue300: "#4b94ed",
        lightBlue500: "#0b72e7",
        greenLight: "#61cea6",
        grayText: "#818597",
        lightGray: "#e2e2e2",
        grayBlue: "#344a6c",
        deepBlueHead: "#162f56",
        gray2: "#525a76",
        grayish: "#e7e7e7",
      },
    },
  },
  plugins: [],
};

