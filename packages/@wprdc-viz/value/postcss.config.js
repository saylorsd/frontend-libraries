// double check https://tailwindcss.com/docs/using-with-preprocessors
// if adding new plugins.

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
