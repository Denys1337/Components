/* eslint-disable no-console */
const { getBaseConfig } = require('./webpack.config.base');

const config = getBaseConfig(process.env.TARGET || 'default');

if (process.argv.includes('--inspect')) {
  const { highlight } = require('cli-highlight');
  console.log(highlight(config.toString(), { language: 'js' }));
  process.exit(0);
}

module.exports = config.toConfig();
