process.env.NODE_ENV = 'development';

const Path = require('path');

//const { dist } = require('../paths');
const { getBaseConfig, dist } = require('../webpack.config.base');

const outDir = Path.resolve(__dirname, 'build');
const config = getBaseConfig('style', false);

config.output.path(outDir);
config.plugin('copy-fonts').tap(([options]) => {
  options.forEach((option) => {
    option.to = option.to.replace(dist(), outDir);
  });

  return [options];
});
config.plugins.delete('ts-checker');
config.plugins.delete('optimize-css');
config.plugins.delete('manifest');

// config.module
//   .rule('css')
//   .use('string-replace-loader')
//   .loader(require.resolve('string-replace-loader'))
//   .options({
//     search: '../fonts',
//     replace: '../fonts',
//     flags: 'g',
//   })
//   .before('css-loader');

config.module
  .rule('scss')
  .use('string-replace-loader')
  .loader(require.resolve('string-replace-loader'))
  .options({
    search: '../fonts',
    replace: '../src/style/fonts/',
    flags: 'g',
  })
  .before('css-loader');

module.exports = config.toConfig();
