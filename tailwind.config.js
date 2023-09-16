const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lilac-700": "hsl(248deg, 25%, 18%)",
        "lilac-900": "hsl(249, 22%, 12%)",
      },
      fontFamily: {
        mono: ["var(--font-noto-sans-mono)", ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};
