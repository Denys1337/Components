const fs = require('fs');
const path = require('path');

const hash = require('hash-sum');

module.exports = async ({ config }) => {
  const xxx = {
    loader: require.resolve('string-replace-loader'),
    options: {
      search: '../fonts',
      replace: '../src/style/fonts/',
      flags: 'g',
    },
  };

  config.devtool = 'eval-source-map';

  config.module.rules.push(
    {
      test: /\.ts$/,
      use: [
        {
          loader: require.resolve('cache-loader'),
          options: {
            cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/ts'),
            cacheIdentifier: hash(
              require('typescript').version +
                fs.readFileSync(path.resolve(__dirname, '../tsconfig.json'), {
                  encoding: 'utf8',
                }) +
                require('@babel/core').version +
                fs.readFileSync(path.resolve(__dirname, '../babel.config.js'), {
                  encoding: 'utf8',
                })
            ),
          },
        },
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
            happyPackMode: true,
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', xxx, 'sass-loader'],
    }
  );

  const vueRule = config.module.rules.find((rule) => rule.test.toString() === '/\\.vue$/');

  vueRule.use = [
    {
      loader: require.resolve('cache-loader'),
      options: {
        cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/vue'),
        cacheIdentifier: hash(require('vue').version),
      },
    },
    { loader: require.resolve('vue-loader'), options: vueRule.options },
  ];
  delete vueRule.loader;
  delete vueRule.options;

  const rule = config.module.rules.find((rule) => rule.test.toString() === '/\\.css$/');
  const index = rule.use.findIndex((item) => /postcss/.test(item.loader));
  const postcss = rule.use[index];
  const use = rule.use.slice();

  use[index] = {
    ...postcss,
    options: {
      plugins() {
        const plugins = Array.isArray(postcss.options.plugins)
          ? postcss.options.plugins
          : typeof postcss.options.plugins === 'function'
          ? postcss.options.plugins()
          : [];

        plugins.unshift(require('tailwindcss')(path.resolve(__dirname, '../tailwind.config.js')));

        return plugins;
      },
    },
  };

  config.module.rules.push({
    ...rule,
    use,
    test: /\.(?:post|p)css$/,
  });

  config.resolve.extensions.push('.ts');
  config.resolve.alias['@'] = path.resolve(__dirname, '../src/js');
  config.resolve.alias['@style'] = path.resolve(__dirname, '../src/style');
  config.resolve.alias['@stories'] = path.resolve(__dirname);

  // console.log(require('util').inspect(config, false, 4));

  config.stats = {
    ...config.stats,
    logging: 'warn',
    children: false,
  };

  return config;
};
