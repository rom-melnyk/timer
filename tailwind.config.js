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
        "light": "hsl(195, 80%, 55%)",
        "dark": "hsl(195, 80%, 55%)",
        high: {
          "light": "hsl(195, 80%, 35%)",
          "dark": "hsl(195, 60%, 75%)",
        },
      },
      surface: {
        "light": "hsl(195, 3%, 95%)",
        "dark": "hsl(195, 65%, 10%)",
        high: {
          "light": "hsl(195, 50%, 90%)",
          "dark": "hsl(195, 65%, 15%)",
        },
      },
      on: {
        accent: {
          "light": "hsl(195, 85%, 10%)",
          "dark": "hsl(195, 3%, 95%)",
          high: {
            "light": "hsl(195, 3%, 95%)",
            "dark": "hsl(195, 40%, 25%)",
          },
        },
        surface: {
          "light": "hsl(195, 65%, 7%)",
          "dark": "hsl(195, 3%, 95%)",
          high: {
            "light": "hsl(195, 85%, 10%)",
            "dark": "hsl(195, 50%, 90%)",
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
