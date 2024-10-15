/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      colors: {
        perrywinkle: "#a077e6",
        lightTan: "#f8f3a6",
        lightMustard: "#f4e064",
        error:"#F03738",
        errorFade:"#FEECEC",
        success:"#036707",
        SuccessFade:"#E0F5E0",
        warning:"#FCB706",
        warningFade: "#FFF7AE",
        peach: "#ffa07a",
        grayish: "#424242",
        grayish2: "#4b4b4b",
        grayish3: "#5a5a5a",
        whiteGray: "#4b4b4b",
        landingPagePrimaryBg: "#fcb706",
        landingPagePrimary: "#480e81",
        primary: {
          light: "#470E810A",
          DEFAULT: "#470E81",
          bg: "#EFEFEF"
        },
      },
    },
  },
  plugins: [],
}

