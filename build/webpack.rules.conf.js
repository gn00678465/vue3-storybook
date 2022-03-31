module.exports.babelRules = ({ config }) => {
  config.module
    .rule('babel')
    .test(/\.js$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('babel-loader')
      .loader('babel-loader')
      .end()
}

module.exports.cssRules = ({ config }) => {
  config.module
    .rule('css')
    .test(/\.(css|scss|sass)$/)
    .use('style-loader')
      .loader('style-loader')
      .end()
    .use('css-loader')
      .loader('css-loader')
      .end()
    .use('postcss-loader')
      .loader('postcss-loader')
      .end()
    .use('sass-loader')
      .loader('sass-loader')
      .end()
}

module.exports.imageRules = ({ config }) => {
  config.module
    .rule('image')
    .test(/\.(png|jpg|svg|gif)$/)
    .type('asset/resource')
    .set('generator', { filename: 'assets/[hash:8].[name][ext]' })
}