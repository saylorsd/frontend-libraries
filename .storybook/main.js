const path = require('path');

module.exports = {
  stories: [
    '../packages/**/*.stories.@(ts|tsx|js|jsx)',
    '../stories/**/*.stories.@(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    // check: true, // type-check stories during Storybook build
    reactDocgen: 'react-docgen',
  },
  webpackFinal: async (config) => {
    // remove default css loading stuff
    config.module.rules = config.module.rules.filter(
      (r) => r.test && r.test.toString() !== '/\\.css$/',
    );

    // add the real business
    config.module.rules.push({
      test: /\.css$/,
      exclude: [/\.module\.css$/, /@storybook/],
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { importLoaders: 1, sourceMap: false },
        },
        'postcss-loader',
      ],
    });

    config.module.rules.push({
      test: /\.module\.css$/,
      exclude: [/@storybook/],
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { importLoaders: 1, sourceMap: false, modules: true },
        },
        'postcss-loader',
      ],
    });
    // Return the altered config

    return config;
  },
};
