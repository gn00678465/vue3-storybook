const path = require('path');
const webpack = require('webpack');
const Config = require('webpack-chain');
const config = new Config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { babelRules, cssRules } = require('./webpack.rules.conf');

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
        .end()
  }
}

function htmlWebpackPlugin({ config, resolve }) {
  return () => {
    const options = {
      template: resolve('../public/index.html'),
      filename: 'index.html',
      title: 'webpack5+vue3',
      minify: {
        html5: true, // 根據 HTML5 規範
        collapseWhitespace: true, // 摺疊空白
        preserveLineBreaks: false,
        minifyCSS: true, // 壓縮內部 CSS
        minifyJS: true, // 壓縮內部 js
        removeComments: false // 移除註解
      }
    }

    config
      .plugin('html-template')
        .use(HtmlWebpackPlugin, [options])
        .end()
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

// Config resolve alias
config.resolve.alias
  .set('@', resolve('../src'))
  .set('assets', resolve('../src/assets/'))
  .set('utils', resolve('../src/utils/'))

environment({ config })(envMode);
htmlWebpackPlugin({ config, resolve })();

babelRules({ config });
cssRules({ config });

// console.log(config.toConfig());

module.exports = config.toConfig();