const baseConfig = require('@agritask/frontend-configs/postcss.config.js');

module.exports = {
  plugins: [/*require('tailwindcss'), */ ...baseConfig.plugins],
};
