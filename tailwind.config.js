/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        68: "17rem",
      },
      width: {
        144: "36rem",
        192: "48rem",
      },
      scale: {
        30: "0.3",
      },
    },
  },
  plugins: [],
};
