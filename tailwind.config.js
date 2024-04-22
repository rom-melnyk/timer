// const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.vue",
    "./src/**/*.css",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: {
        "light": "#006879",
        "dark": "#54d7f3",
      },
      secondary: {
        "light": "#415aa9",
        "dark": "#b5c4ff",
      },
      tertiary: {
        "light": "#8d4f00",
        "dark": "#ffb877",
      },
      error: {
        "light": "#ba1a1a",
        "dark": "#ffb4ab",
      },
      surface: {
        "light": "#f8fdff",
        "dark": "#001f25",
      },
      on: {
        primary: {
          "light": "#ffffff",
          "dark": "#003640",
        },
        secondary: {
          "light": "#ffffff",
          "dark": "#052978",
        },
        tertiary: {
          "light": "#ffffff",
          "dark": "#4b2700",
        },
        error: {
          "light": "#ffffff",
          "dark": "#690005",
        },
        surface: {
          "light": "#001f25",
          "dark": "#a6eeff",
        },
      },
    },
    fontFamily: {
      "sans-serif": "'Fira Sans', sans-serif",
    },
    extend: {},
  },
  plugins: [],
}
