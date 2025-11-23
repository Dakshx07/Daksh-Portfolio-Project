/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'galactic-grey': '#0B0B0F',
        'ionized-gold': '#FFC800',
        'electric-indigo': '#6A0DAD',
        'clean-lumen': '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'neural-weave': 'radial-gradient(circle at 50% 50%, rgba(106, 13, 173, 0.15) 0%, rgba(11, 11, 15, 0) 70%)',
      },
    },
  },
  plugins: [],
}

