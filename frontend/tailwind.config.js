/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060f1f",
          900: "#0A1526",
          850: "#0d1a2e",
          800: "#122139",
          700: "#16263f",
          600: "#1d2c47",
          500: "#2b3d5d",
        },
        ink: {
          50: "#f3f5f9",
          100: "#dde3ee",
          200: "#b5bfd0",
          300: "#7a8499",
          400: "#525c73",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
        serif: ["Montserrat", "system-ui", "sans-serif"],
        mono: ["Montserrat", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "10px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};
