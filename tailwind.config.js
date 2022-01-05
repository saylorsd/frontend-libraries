const path = require('path');

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./packages/**/src/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.blueGray,
        secondary: colors.lightBlue,
        background: colors.white,
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  plugins: [],
};
