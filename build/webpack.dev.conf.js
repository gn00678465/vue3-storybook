// base
const { baseConfig, resolve } = require('./webpack.base.conf');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = baseConfig(false);

function bundleAnalyzer({ config, resolve }) {
  return () => {
    const options = {
      analyzerPort: 8889
    };

    config
      .plugin('bundle-analyzer')
        .use(BundleAnalyzerPlugin, [options])
        .end()
  }
};

// config
config.mode('development')
  .devtool('eval-cheap-module-source-map');

// server
config.devServer
  .open(false)
  .host('127.0.0.1')
  .port(8008)
  .https(false)
  .hot(true)
  .historyApiFallback(true);

bundleAnalyzer({ config, resolve })();

module.exports = config.toConfig();