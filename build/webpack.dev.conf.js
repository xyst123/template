var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, isDev: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      // WK_G_STRING: JSON.stringify("5fa3b9"),
      // WK_G_BOOL: true,
      // WK_G_EXPRESS: "1+1",
      WK_G_STATIC_DOMAIN: JSON.stringify(process.env.static_domain)
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

for(var key in config.pages){
  var page = config.pages[key]
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: page.filename,
      template: page.template,
      chunks: page.chunks,
      inject: page.inject,
      env: 'dev',
      myvar2:process.env.static_domain || ''
    })
  )
}

module.exports = webpackConfig
