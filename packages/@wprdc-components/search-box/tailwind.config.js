const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.slate,
        secondary: colors.sky,
        background: colors.white,
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['visited'],
      margin: ['first'],
      borderWidth: ['first'],
    },
  },
  plugins: [],
};
