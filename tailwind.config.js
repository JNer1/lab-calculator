const {fontFamily} = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lilac-700": "hsl(252.86, 15.91%, 15.5%)",
        "lilac-900": "hsl(252, 14.71%, 13.33%)",
      },
      fontFamily: {
       mono:["var(--font-noto-sans-mono)", ...fontFamily.mono]
      },
    },
  },
  plugins: [],
};
