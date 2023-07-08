/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        card: "#191919",
        cardBefore: "#ffce00",
        addCloth: "#A6CDDE",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        "calc-30-minus-2": "calc(30% - 2px)",
        "calc-70-minus-40": "calc(70% - 40px)",
      },
      dropShadow: {
        shadowCard: "-11px 11px 1px rgba(0, 0, 0, 0.3)",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
