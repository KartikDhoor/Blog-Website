/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pureblack: "#000000", // Single custom color
        dark1: "#1E201E",
        dark2: "#3C3D37",
        gray1: "#4C585B",
        cream: "#ECDFCC",
        customGreen: "#10b981", // Another custom color
        customGradientStart: "#ff7f50", // For gradient start
        customGradientEnd: "#ff4500",   // For gradient end
      },
      screens: {
        belowSm: { max: '479px' }, // Target screens below 480px
      },
    },
  },
  plugins: [],
}