/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "dark",
      "dracula",
      "luxury",
      "forest",
      "halloween",
      "coffee",
      "night",
    ],
  },
  plugins: [require("daisyui")],
};
