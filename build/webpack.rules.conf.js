module.exports.babelRules = ({ config }) => {
  config.module
    .rule('babel')
    .test(/\.js$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('babel-loader')
      .loader('babel-loader')
}