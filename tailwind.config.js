/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        68: "17rem",
      },
      width: {
        192: "48rem",
      },
    },
  },
  plugins: [],
};
