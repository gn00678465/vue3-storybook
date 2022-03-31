const CopyWebpackPlugin = require('copy-webpack-plugin');

function copyWebpackPlugin({ config, resolve }) {
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