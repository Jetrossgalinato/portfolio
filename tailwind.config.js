/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  darkMode: "class", // enables dark mode
  theme: {
    extend: {
      fontFamily: {
        mono: ["Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
