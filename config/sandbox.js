var path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"sandbox"'
  },
  assetsRoot: path.resolve(__dirname, '../dist'),
  filename: 'js/[name].[chunkhash].js',
  chunkFilename: 'js/[name].[chunkhash].js',
  styleFilename: 'css/[name].[contenthash].css',
  imgname: 'img/[name].[hash:7].[ext]',
  fontname: 'fonts/[name].[hash:7].[ext]',
  htmlMinify: {
    removeComments: true
  },
  vendor: [],
  manifest: false,
  productionSourceMap: false,
  bundleAnalyzerReport: process.env.npm_config_report
}
