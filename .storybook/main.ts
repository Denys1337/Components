module.exports = {
  //stories: ['../src/**/*.stories.@(js|ts)', './stories/**/*.stories.@(js|ts)'],
  stories: ['../src/**/*.stories.@(js|ts)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@pxblue/storybook-rtl-addon',
  ],
  core: {
    builder: 'webpack5',
  },
};
