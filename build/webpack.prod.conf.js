// base
const { baseConfig, resolve } = require('./webpack.base.conf');
// copy
const CopyWebpackPlugin = require('copy-webpack-plugin');
// compress css
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
// compress js
const TerserPlugin = require('terser-webpack-plugin');

function setCache({ config, resolve }) {
  return () => {
    const options = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    };

    config.cache(options);
  };
}

function copyWebpack({ config, resolve }) {
  return () => {
    const options = {
      patterns: [{
        from: resolve('../public'),
        to: './',
        globOptions: {
          dot: true,
          gitignore: true,
          ignore: ['**/index.html'],
        }
      }]
    };

    config
      .plugin('copy-webpack')
      .use(CopyWebpackPlugin, [options])
      .end();
  };
}

function miniCssExtract({ config }) {
  return () => {
    const options = {
      filename: './css/[name].[contenthash].css',
      chunkFilename: './css/[id].[contenthash].css',
    };

    config
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin, [options])
      .end();
  };
}

function minimizer({ config }) {
  return () => {
    const options = {
      parallel: true,
      extractComments: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    };

    config.optimization
      .minimize(true)
      .minimizer('mini-js')
      .use(TerserPlugin, [options])
      .end();
  };
}

function setSplitChucks({ config }) {
  return () => {
    const options = {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    };

    config.optimization
      .splitChunks(options);
  };
}

const config = baseConfig(true);

// config
config.mode('production');
config.output
  .publicPath('./')
  .set('clean', true);

setCache({ config, resolve })();
copyWebpack({ config, resolve })();
miniCssExtract({ config })();
minimizer({ config })();
setSplitChucks({ config })();

module.exports = config.toConfig();
