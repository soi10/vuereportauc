module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      padding: ["responsive"],
      margin: ["responsive"],
      borderWidth: ["responsive"],
      display: ["responsive"],
    },
  },
  plugins: [],
};
