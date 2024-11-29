/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        galaxy: {
          50: '#F3E8FF',
          100: '#E4D0FF',
          200: '#C9A1FF',
          300: '#AD72FF',
          400: '#9243FF',
          500: '#7714FF',
          600: '#5F0FCC',
          700: '#470B99',
          800: '#2F0766',
          900: '#180333',
          950: '#0C011A'
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.galaxy.300), 0 0 20px theme(colors.galaxy.500)',
        'neon-lg': '0 0 10px theme(colors.galaxy.300), 0 0 40px theme(colors.galaxy.500)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};