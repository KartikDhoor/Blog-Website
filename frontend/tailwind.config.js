/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // keyframes: {
      //   slideLeftIn: {
      //     '0%': { transform: 'translateX(-50%)', opacity: '0' }, // Move left (if needed)
      //     '100%': { transform: 'translateX(0)', opacity: '1' },
      //   },
      //   slideRightIn: {
      //     '0%': { transform: 'translateX(50%)', opacity: '0' }, // Move left (if needed)
      //     '100%': { transform: 'translateX(0)', opacity: '1' },
      //   },
      //   slideBottomIn: {
      //     '0%': { transform: 'translatey(50%)', opacity: '0' }, // Move left (if needed)
      //     '100%': { transform: 'translateX(0)', opacity: '1' },
      //   },

      // },
      // animation: {
      //   slideLeftIn: 'slideLeftIn 1s ease-out forwards',
      //   slideRightIn:'slideRightIn 1s ease-out forwards',
      //   slideBottomIn:'slideBottomIn 1s ease-out forwards',
      // },
      keyframes: {
        slideLeftIn: {
          '0%': { transform: 'translateX(-50%) scale(0.7)', opacity: '0' }, // Starts smaller & shifted left
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        slideRightIn: {
          '0%': { transform: 'translateX(50%) scale(0.5)', opacity: '0' }, // Starts smaller & shifted right
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        slideBottomIn: {
          '0%': { transform: 'translateY(50%) scale(0.5)', opacity: '0' }, // Starts smaller & shifted down
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'scale(1)', opacity: '1' }, // Normal size
          '100%': { transform: 'scale(0.5) translateX(-50%)', opacity: '0' }, // Shrinks & moves away
        }
      },
      
      animation: {
        slideLeftIn: 'slideLeftIn 0.8s ease-out forwards',
        slideRightIn: 'slideRightIn 0.8s ease-out forwards',
        slideBottomIn: 'slideBottomIn 0.8s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-in forwards', // Faster exit
      },
      
      colors: {
        pureblack: "#000000",
        dark1: "#1E201E",
        dark2: "#3C3D37",
        gray1: "#4C585B",
        cream: "#ECDFCC",
        customGreen: "#10b981",
        customGradientStart: "#ff7f50",
        customGradientEnd: "#ff4500",
      },
      screens: {
        sm: '480px',
        belowSm: { max: '480px' }, // Target screens below 480px
      },
    },
  },
  plugins: [],
};
