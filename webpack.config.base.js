/* eslint-disable no-console */
const fs = require('fs');

const chalk = require('chalk');
const hash = require('hash-sum');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const rimraf = require('rimraf');
const WebpackChain = require('webpack-chain');
const nodeExternals = require('webpack-node-externals');

const npmPck = require('./package.json');
const { src, dist, libDist, demoSrc, root, isDemoBuild } = require('./paths');

process.env.NODE_ENV = 'development';

module.exports = {
  createCacheConfig,
  getBaseConfig,
  isExternalURL,
};

function createCacheConfig(name, options = {}) {
  return {
    cacheDirectory: root('node_modules', '.cache', name),
    cacheIdentifier: hash(options),
  };
}

/**
 * Check if asset is served by backend.
 * @param {string} url
 */
function isExternalURL(url) {
  if (url.startsWith('../../../../../images/')) return false;
  if (url.startsWith('../../../../../fonts/')) return false;
  if (url.startsWith('../fonts/')) return false;

  return true;
}

function getBaseConfig(target = 'default', immutable = null) {
  const mode = process.env.NODE_ENV || 'production';

  console.log('webpack build mode:', mode);

  const config = new WebpackChain();
  const isProd = mode === 'production';
  const isDemo = isDemoBuild();

  const publicPath = isDemo ? '' : '/';
  const useThreads = false;

  console.log(chalk('Generating build config with %o'), {
    mode,
    target,
    immutable,
    isProd,
    publicPath,
    useThreads,
  });

  cleanup(target);
  copyAgritaskFont(config);

  config.mode('development');
  config.devtool(isProd ? 'hidden-source-map' : 'eval-source-map');

  if (!isDemo) {
    config.externals([nodeExternals()]);
  }

  config.module.noParse([/^(vue|vue-router|vuex)$/]);

  config.module
    .rule('js')
    .test(/\.js$/)
    .exclude.add(/node_modules/)
    .end()
    .use('cache-loader')
    .loader(require.resolve('cache-loader'))
    .options(createCacheConfig('js'))
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .end();

  if (useThreads) {
    config.module
      .rule('js')
      .use('thread-loader')
      .loader(require.resolve('thread-loader'))
      .after('cache-loader');
  }

  config.module
    .rule('ts')
    .test(/\.ts$/)
    .use('cache-loader')
    .loader(require.resolve('cache-loader'))
    .options(createCacheConfig('ts'))
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .end()
    .use('ts-loader')
    .loader(require.resolve('ts-loader'))
    .options({
      transpileOnly: true,
      happyPackMode: useThreads,
      appendTsSuffixTo: [/\.vue$/],
    });

  config.stats({
    warningsFilter: /export .* was not found in/,
  });

  if (useThreads) {
    config.module
      .rule('ts')
      .use('thread-loader')
      .loader(require.resolve('thread-loader'))
      .after('cache-loader');
  }

  config.module
    .rule('vue')
    .test(/\.vue$/)
    .use('cache-loader')
    .loader(require.resolve('cache-loader'))
    .options(createCacheConfig('vue'))
    .end()
    .use('vue-loader')
    .loader(require.resolve('vue-loader'))
    .options({ whitespace: 'condense' })
    .end();

  config.module
    .rule('css')
    .test(/\.css$/)
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({ url: isExternalURL })
    .end()
    .use('postcss-loader')
    .loader(require.resolve('postcss-loader'))
    .end();

  config.module
    .rule('css')
    .use('extract-css-loader')
    .loader(miniCssExtractPlugin.loader)
    .options({ publicPath })
    .before('css-loader');

  config.module
    .rule('scss')
    .test(/\.scss$/)
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({ url: isExternalURL })
    .end()
    .use('postcss-loader')
    .loader(require.resolve('postcss-loader'))
    .end()
    .use('sass-loader')
    .loader(require.resolve('sass-loader'))
    .options({
      implementation: require('sass'),
    })
    .end();

  config.module
    .rule('scss')
    .use('extract-css-loader')
    .loader(miniCssExtractPlugin.loader)
    .options({ publicPath })
    .before('css-loader');

  config.module
    .rule('icon')
    .test(/\.svg$/)
    .exclude.add(/(open-sans|Heebo|agritask-font)/) // ignore fonts.
    .end()
    .use('svg-url-loader')
    .loader(require.resolve('svg-url-loader'))
    .options({ iesafe: true })
    .end()
    .pre()
    .use('image-webpack-loader')
    .loader(require.resolve('image-webpack-loader'))
    .end();

  config.module
    .rule('images')
    .test(/\.(png|jpg|gif)$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options({
      limit: 4 * 1024,
      name: 'images/[name].[contenthash:8].[ext]',
      publicPath,
      postTransformPublicPath: (p) => `tms_context_path.replace(/\\/?$/, '') + ${p}`,
      esModule: false,
    })
    .end()
    .pre()
    .use('image-webpack-loader')
    .loader(require.resolve('image-webpack-loader'));

  config.resolve.extensions.add('.mjs').add('.js').add('.ts').add('.vue').add('.json');

  config.resolve.alias
    .set('vue$', 'vue/dist/vue.esm-bundler.js')
    .set('@', src('js'))
    .set('@style', src('style'));

  if (isDemo) {
    config
      .plugin('clean')
      .use(require('clean-webpack-plugin').CleanWebpackPlugin, [
        { cleanStaleWebpackAssets: true, verbose: true },
      ]);
  }

  config.plugin('vue').use(require('vue-loader').VueLoaderPlugin);

  config.plugin('define').use(require('webpack').DefinePlugin, [
    {
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
      },
      DEBUG: JSON.stringify(false),
    },
  ]);

  config.plugin('css-only').use(require('webpack-fix-style-only-entries'), [{ silent: true }]);

  // optimizations
  if (isProd) {
    config.plugin('manifest').use(require('webpack-manifest-plugin'), [
      {
        publicPath,
        filter(fd) {
          return /\.(js|css)$/.test(fd.path);
        },
      },
    ]);

    config.stats({
      ...config.get('stats'),
      logging: 'warn',
      children: false,
    });

    if (target === 'default') {
      config.optimization.runtimeChunk('single');
    }

    config.plugin('ts-checker').use(require('fork-ts-checker-webpack-plugin'), [
      {
        vue: true,
        async: false,
        formatter: 'codeframe',
        checkSyntacticErrors: true,
        reportFiles: ['src/js/**/*.{ts,vue}', '!**/*.{spec}.ts'],
      },
      {
        async: false,
        formatter: 'codeframe',
        checkSyntacticErrors: true,
        configFile: 'tsconfig.test.json',
        reportFiles: ['**/*.{spec}.ts'],
      },
    ]);

    config.plugin('optimize-css').use(require('@intervolga/optimize-cssnano-plugin'), [
      {
        sourceMap: false,
        cssnanoOptions: {
          preset: [
            'default',
            {
              mergeLonghand: false,
              cssDeclarationSorter: false,
            },
          ],
        },
      },
    ]);

    config.plugin('hashed-module-ids').use(require('webpack').HashedModuleIdsPlugin, [
      {
        hashDigest: 'hex',
      },
    ]);
  }

  config.plugin('extract-css').use(require('mini-css-extract-plugin'), [
    {
      filename: immutable ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      chunkFilename: immutable ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      ignoreOrder: true,
    },
  ]);

  if (isDemo) {
    // DEMO
    config.output
      .path(dist())
      .publicPath(publicPath)
      .filename(immutable ? 'js/[name].[chunkhash:8].js' : 'js/[name].js')
      .chunkFilename(immutable ? 'js/[name].[chunkhash:8].js' : 'js/[name].js');
  } else {
    // PROD
    config.output.path(dist()).publicPath(publicPath).filename('[name].js');
  }

  if (isDemo) {
    config.plugin('HtmlWebpackPlugin').use(
      new HtmlWebpackPlugin({
        template: demoSrc('demoTemplate.html'),
        templateParameters: {
          npmVersion: npmPck.version,
        },
        minify: false,
        inject: 'body',
        npmPck,
      })
    );

    config.entry('demoApp').add(demoSrc('demo.ts')).end();
  } else {
    config.entry('index').add(src('index.ts')).end();
  }

  if (/^(default|style)$/.test(target)) {
    // module specific styles
    config.entry('root').add(src('style/scss/_root.scss'));
    config.entry('agritask-font').add(dist('fonts/icon-font.css'));
  }

  if (process.argv.includes('--analyze')) {
    config.plugin('bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
      {
        defaultSizes: 'gzip',
        openAnalyzer: true,
        analyzerMode: 'static',
        generateStatsFile: false,
      },
    ]);
  }

  return config;
}

function cleanup(target) {
  // remove manifest before each run
  rimraf.sync(dist('manifest.json'));

  // remove build/js and build/images before the "default" target
  if (/^(default)$/.test(target)) {
    rimraf.sync(dist('js'));
    rimraf.sync(dist('images'));
  }
}

function copyAgritaskFont(config) {
  const icon_font_dir = libDist('fonts/icon-font');

  console.log('icon_font_dir', icon_font_dir);

  if (!fs.existsSync(icon_font_dir)) {
    console.error(chalk.redBright('Error:'), chalk.red(`Agritask font is missing`));
    console.log(chalk.yellow('Run "build:font" script (yarn build:font) and try again'));
    process.exit(1);
  }

  config.plugin('copy-fonts').use(require('copy-webpack-plugin'), [
    [
      { from: src('style/fonts'), to: dist('fonts'), toType: 'dir' },
      { from: icon_font_dir, to: dist('fonts'), toType: 'dir' },
    ],
  ]);
}
