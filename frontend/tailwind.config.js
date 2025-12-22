/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ✅ Perfect - Header toggle works!
  theme: {
    extend: {
      // ✅ YOUR ANIMATIONS (kept exactly)
      keyframes: {
        slideLeftIn: {
          '0%': { transform: 'translateX(-50%) scale(0.7)', opacity: '0' },
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        slideRightIn: {
          '0%': { transform: 'translateX(50%) scale(0.5)', opacity: '0' },
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        slideBottomIn: {
          '0%': { transform: 'translateY(50%) scale(0.5)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.5) translateX(-50%)', opacity: '0' },
        },
        // ✅ Float & Glow (fixed duplicate)
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 127, 80, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 69, 0, 0.6)' },
        },
      },
      animation: {
        slideLeftIn: 'slideLeftIn 0.8s ease-out forwards',
        slideRightIn: 'slideRightIn 0.8s ease-out forwards',
        slideBottomIn: 'slideBottomIn 0.8s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-in forwards',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },

      // ✅ FIXED COLORS - Use Tailwind defaults + custom
      colors: {
        // Your originals (kept)
        pureblack: "#000000",
        dark1: "#1E201E", 
        dark2: "#3C3D37",
        gray1: "#4C585B",
        
        // ✅ SIMPLIFIED - Use Tailwind's dark: variants instead
        // These are now accessed as: bg-dark-bg-primary, text-light-text-primary
        'dark': {
          'bg': {
            'primary': '#0a0a0a',
            'secondary': '#1a1a1a', 
            'card': '#1e1e1e',
            'glass': 'rgba(255,255,255,0.05)',
          },
          'text': {
            'primary': '#ffffff',
            'secondary': '#b0b3b8',
          },
          'accent': {
            400: '#f59e0b',
            500: '#ff7f50',
            600: '#ff6b35',
            700: '#ff4500',
          },
        },
        'light': {
          'bg': {
            'primary': '#fdf8f0',
            'secondary': '#f8f9fa',
            'card': '#ffffff',
            'glass': 'rgba(0,0,0,0.03)',
          },
          'text': {
            'primary': '#1a1a1a',
            'secondary': '#6b7280',
          },
          'accent': {
            400: '#f59e0b',
            500: '#ff7f50',
            600: '#ff6b35', 
            700: '#ff4500',
          },
        },
      },

      // ✅ Screens (perfect)
      screens: {
        'belowSm': '480px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      // ✅ Shadows (production-ready)
      boxShadow: {
        'dark-card': '0 10px 30px rgba(0,0,0,0.5), 0 4px 12px rgba(255,127,80,0.1)',
        'light-card': '0 10px 30px rgba(0,0,0,0.1), 0 4px 12px rgba(255,127,80,0.15)',
        'glow-orange': '0 0 30px rgba(255,127,80,0.4)',
        'glow-orange-strong': '0 0 40px rgba(255,69,0,0.6)',
      },

      // ✅ Border radius & blur
      borderRadius: {
        'glass': '24px',
        'modern': '20px',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
