// base
const { baseConfig, resolve } = require('./webpack.base.conf');

const config = baseConfig(false);

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

  // console.log(config.toConfig());

module.exports = config.toConfig();