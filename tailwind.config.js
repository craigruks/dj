/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'helvetica': ['Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
      height: {
        'screen-20': '20vh',
        'screen-80': '80vh',
      },
    },
  },
  plugins: [],
} 