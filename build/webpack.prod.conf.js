const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

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