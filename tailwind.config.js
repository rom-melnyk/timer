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
        "container-light": "#a9edff",
        "container-dark": "#004e5b",
      },
      secondary: {
        "light": "#415aa9",
        "dark": "#b5c4ff",
        "container-light": "#dce1ff",
        "container-dark": "#264190",
      },
      tertiary: {
        "light": "#8d4f00",
        "dark": "#ffb877",
        "container-light": "#ffdcc0",
        "container-dark": "#6b3b00",
      },
      error: {
        "light": "#ba1a1a",
        "dark": "#ffb4ab",
        "container-light": "#ffdad6",
        "container-dark": "#93000a",
      },
      surface: {
        "light": "#f8fdff",
        "dark": "#001f25",
        "variant-light": "#dbe4e7",
        "variant-dark": "#3f484b",
      },
      on: {
        primary: {
          "light": "#ffffff",
          "dark": "#003640",
          "container-light": "#001f26",
          "container-dark": "#a9edff",
        },
        secondary: {
          "light": "#ffffff",
          "dark": "#052978",
          "container-light": "#00164e",
          "container-dark": "#dce1ff",
        },
        tertiary: {
          "light": "#ffffff",
          "dark": "#4b2700",
          "container-light": "#2d1600",
          "container-dark": "#ffdcc0",
        },
        error: {
          "light": "#ffffff",
          "dark": "#690005",
          "container-light": "#410002",
          "container-dark": "#ffdad6",
        },
        surface: {
          "light": "#001f25",
          "dark": "#a6eeff",
          "variant-light": "#3f484b",
          "variant-dark": "#bfc8cb",
        },
      },
    },
    fontFamily: {
      serif: "Bitter, serif",
      "sans-serif": "'Fira Sans', sans-serif",
    },
    extend: {},
  },
  plugins: [],
}
