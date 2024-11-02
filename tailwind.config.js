/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      colors:{
        primary: {
          light: "#e6f0ff",
          lightHover: "#d9e8ff",    // Hover color for light
          lightActive: "#b0d0ff",   // Active color for light
          dark: "#004dbf",
          darkHover: "#003d99",     // Hover color for dark
          darkActive: "#002e73",    // Active color for dark
          darker: "#002459",
          darkerHover: "#001b42",   // Hover color for darker
          darkerActive: "#00122e",  // Active color for darker
          DEFAULT: "#0066ff",
          hover: "#005ce6",         // Hover color for default
          active: "#0052cc",        // Active color for default
        },
      },
    },
  },
  plugins: [],
}

