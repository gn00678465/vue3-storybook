const path = require('path');
const webpack = require('webpack');
const Config = require('webpack-chain');
const config = new Config();

//
const resolve = (file) => path.resolve(__dirname, file);
const envMode = process.env.envMode;

function environment({ config }) {
  return (envMode) => {
    require('dotenv').config({ path: `.env.${envMode}`});
    // regexp VUE_APP_
    const prefixRE = /^VUE_APP_/;
    let env = {};

    for(const key in process.env) {
      if(key === 'NODE_ENV' || key === 'BASE_URL' || prefixRE.test(key)) {
        env[key] = JSON.stringify(process.env[key]);
      }
    }

    config
      .plugin('env')
      .use(webpack.DefinePlugin, [{ ...env }])
  }
}

// entry
config
  .entry('index')
    .add(resolve('../src/main.js'))
    .end()
  .output
    .path(resolve('../dist'))
    .filename('[name].bundle.js')

environment({ config })(envMode);

module.exports = config.toConfig();