const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

function copyWebpack({ config, resolve }) {
  return () => {
    const options = {
      patterns: [{
        from: resolve("../public"),
        to: './',
        globOptions: {
          dot: true,
          gitignore: true,
          ignore: ["**/index.html*"],
        }
      }]
    };

    config
      .plugin('copy-webpack')
        .use(CopyWebpackPlugin, [options])
        .end()
  }
}

function miniCssExtract({ config, resolve }) {
  return () => {
    const options = {
      filename: './css/[name].[contenthash].css',
      chunkFilename: './css/[id].[contenthash].css',
    };

    config
      .plugin('mini-css-extract')
        .use(MiniCssExtractPlugin, [options])
        .end()
  }
}

function minimizer({ config, resolve }) {
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
      .minimizer('mini-js')
        .use(TerserPlugin, [options])
        .end()
  }
}