/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#00e6f6',
          900: '#1f6cab',
        },
        'bg-black': '#082a3a',
      },
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      screens: {
        xsm: '480px',
      },
    },
  },
  plugins: [],
};
