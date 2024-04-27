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
      accent: {
        "light": "hsl(195, 80%, 75%)",
        "dark": "#54d7f3",
        high: {
          "light": "hsl(195, 90%, 65%)",
          "dark": "#001f25",
        },
      },
      surface: {
        "light": "hsl(195, 3%, 100%)",
        "dark": "#001f25",
        high: {
          "light": "hsl(195, 30%, 95%)",
          "dark": "#001f25",
        },
      },
      on: {
        accent: {
          "light": "hsl(195, 85%, 10%)",
          "dark": "#003640",
          high: {
            "light": "hsl(195, 90%, 15%)",
            "dark": "#001f25",
          },
        },
        surface: {
          "light": "hsl(195, 65%, 7%)",
          "dark": "#a6eeff",
          high: {
            "light": "hsl(195, 85%, 10%)",
            "dark": "#001f25",
          },
        },
      },
    },
    fontFamily: {
      "sans-serif": "'Fira Sans', Ubuntu, sans-serif",
    },
    extend: {},
  },
  plugins: [],
}
