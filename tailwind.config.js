/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "var(--mantine-color-dark-text)"
      },
      fontFamily: {
        primary: "Open Sans",
        secondary: "Poppins",
        tertiary: "Langar",
        roboto: "Roboto",
      },
    },
  },
  plugins: ["postcss-preset-mantine"],
};
