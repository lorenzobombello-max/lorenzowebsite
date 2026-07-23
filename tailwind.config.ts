import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14213D',
        cream: '#FFF8EF',
        blush: '#F8D7DA',
        mint: '#D7F2E3',
        skysoft: '#DCEBFF',
        lilac: '#E7D9FF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(92, 96, 255, 0.18)',
        soft: '0 20px 60px rgba(20, 33, 61, 0.10)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 1px 1px, rgba(20,33,61,.12) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
} satisfies Config;
