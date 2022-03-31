const MiniCssExtractPlugin  =require('mini-css-extract-plugin');

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
  return (prodMode) => {
    config.module
      .rule('css')
      .test(/\.(css|scss|sass)$/)
      .when(
        !prodMode,
        (config) => config.use('style-loader').loader('style-loader').end(),
        (config) => config.use('mini-css').loader(MiniCssExtractPlugin.loader).options({ publicPath: '../' }).end()
      )

    config.module
    .rule('css')
    .test(/\.(css|scss|sass)$/)
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
}

module.exports.imageRules = ({ config }) => {
  config.module
    .rule('image')
    .test(/\.(png|jpg|svg|gif)$/)
    .type('asset/resource')
    .set('generator', { filename: 'assets/[hash:8].[name][ext]' })
}

module.exports.vueRules = ({ config }) => {
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .use('vue-loader')
      .loader('vue-loader')
      .end()
}
