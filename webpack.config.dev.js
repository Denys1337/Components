/* eslint-disable no-console */
const { demoDist } = require('./paths');
const { ColorFgGreen, ColorReset, getRandomFGs } = require('./scripts/comps/consoleColors');
const { getBaseConfig } = require('./webpack.config.base');

process.env.NODE_ENV = 'development'; // set it before creating the config obj

const config = getBaseConfig(process.env.TARGET || 'default', false);
config.plugins.delete('ts-checker');
config.plugins.delete('optimize-css');
config.plugins.delete('clean');

config.devServer.compress(true).port(8080).index('');

config.watchOptions({
  aggregateTimeout: 100,
  ignored: 'node_modules/**',
});

if (process.argv.includes('--inspect')) {
  const { highlight } = require('cli-highlight');

  console.log(highlight(config.toString(), { language: 'js' }));
  process.exit(0);
}

module.exports = config.toConfig();

if (module.exports.optimization) {
  module.exports.optimization.minimizer = [];
}

if (process.argv.includes('--serve-showcase')) {
  setTimeout(serveShowcase, 7500);
}

function serveShowcase() {
  const StaticServer = require('static-server');
  const server = new StaticServer({
    rootPath: demoDist(),
    port: 5021,
    followSymlink: true, // optional, defaults to a 404 error
  });

  server.start(() => {
    const url = `http://localhost:${server.port}`;

    const getBorder = (dashCount) => {
      return getRandomFGs(dashCount)
        .map((color) => `${color}-`)
        .join('');
    };

    console.log(getBorder(49), ColorReset);
    console.log('');
    console.log('   showcase available at:', `${ColorFgGreen}${url}${ColorReset}`);
    console.log('');
    console.log(getBorder(49), ColorReset);
    require('openurl').open(url);
  });
}
