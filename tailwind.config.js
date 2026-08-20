/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gemini: {
          dark: "#060814",
          surface: "#0B1026",
          card: "#101736",
          cardBorder: "#1E2A5E",
          blue: "#1A73E8",
          cyan: "#4E87F8",
          purple: "#9B51E0",
          pink: "#E84393",
          amber: "#F59E0B",
          emerald: "#10B981"
        }
      },
      backgroundImage: {
        'gemini-gradient': 'linear-gradient(135deg, #1A73E8 0%, #9B51E0 50%, #E84393 100%)',
        'gemini-glow': 'radial-gradient(circle at 50% 50%, rgba(78, 135, 248, 0.15), transparent 70%)',
        'gemini-glow-purple': 'radial-gradient(circle at 50% 50%, rgba(155, 81, 224, 0.15), transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-spin': 'glowSpin 12s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
