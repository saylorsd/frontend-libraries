const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          modules: true,
        },
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    // check: true, // type-check stories during Storybook build
    reactDocgen: 'react-docgen',
  },
  framework: '@storybook/react',
};
