/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#ecfdf7',
          100: '#d1faec',
          200: '#a7f3da',
          300: '#6ee7bf',
          400: '#00d4a0',
          500: '#00b98c',
          600: '#009672',
          700: '#04785d',
          800: '#065f4b',
          900: '#064e3f',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        blue: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        green: {
          400: '#34D399',
          600: '#10B981',
          700: '#059669',
        },
        gray: {
          850: '#18202f',
          950: '#0a0f1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 14s ease-in-out infinite',
        'blob-slow': 'blob 18s ease-in-out infinite reverse',
        'float': 'float 5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out both',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.15)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-accent': '0 0 40px -8px rgb(0 212 160 / 0.35)',
        'glow-accent-sm': '0 0 24px -6px rgb(0 212 160 / 0.30)',
      },
    },
  },
  plugins: [],
}
