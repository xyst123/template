var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var buildEnv = process.env.NODE_ENV
var env = config[buildEnv]['env']
var entry = {}
var htmlBundleConcat = ['vendor']
var CommonsChunkConfig = {
  name: 'vendor',
  minChunks: function (module, count) {
    // any required modules inside node_modules are extracted to vendor
    return (
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf(
        path.join(__dirname, '../node_modules')
      ) === 0
    )
  }
}

if (config[buildEnv].vendor && config[buildEnv].vendor.length > 0) {
  entry = {
    vendor: config[buildEnv].vendor
  }
  CommonsChunkConfig = {
    name: 'vendor',
    minChunks: Infinity
  }
}

var webpackConfig = merge(baseWebpackConfig, {
  entry: entry,
  module: {
    rules: utils.styleLoaders({
      sourceMap: config[buildEnv].productionSourceMap,
      extract: true
    })
  },
  devtool: config[buildEnv].productionSourceMap ? '#source-map' : false,
  output: {
    path: config[buildEnv].assetsRoot,
    filename: utils.assetsPath(config[buildEnv]['filename']),
    chunkFilename: utils.assetsPath(config[buildEnv]['chunkFilename'])
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // 插件文档https://doc.webpack-china.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': env,
      // WK_G_STRING: JSON.stringify("5fa3b9"),
      // WK_G_BOOL: true,
      // WK_G_EXPRESS: "1+1"
      // 把环境变量定义的参数传递到js中，根据不同的环境变量，控制js中的逻辑
      WK_G_STATIC_DOMAIN: JSON.stringify(process.env.static_domain)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // 生产环境压缩时移除调试信息
        drop_debugger: buildEnv === 'production' ,
        drop_console: buildEnv === 'production'
      },
      mangle: {
        safari10: true
      },
      sourceMap: config[ buildEnv ].productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath(config[buildEnv]['styleFilename'])
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
})

if (config[buildEnv].manifest) {
  htmlBundleConcat = ['vendor', 'manifest']
}
//多入口配置
for (var key in config.pages) {
  var page = config.pages[key]
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: page.filename,
      template: page.template,
      chunks: [].concat(page.chunks).concat(htmlBundleConcat),
      inject: page.inject,
      minify: typeof (config[buildEnv].htmlMinify) === 'object' ? Object.assign({}, config[buildEnv].htmlMinify) : {},
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      // 示例如何在html中根据环境参数动态控制页面的展示逻辑，结合index.html
      // htmlWebpackPlugin对象有两个属性，一个是files，一个是options。files和options的属性值都是对象。通过EJS语法，可以在HTML模板文件（template.html）中遍历这两个属性
      // https://github.com/jantimon/html-webpack-plugin#configuration
      // 示例 https://www.jianshu.com/p/2c849a445a91
      env: buildEnv,
      myvar2: process.env.static_domain || ''
    })
  )
}
//vendor配置
webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin(CommonsChunkConfig));

if (config[buildEnv].manifest) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  );
}

webpackConfig.plugins.push(
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config[buildEnv].assetsSubDirectory,
      ignore: ['.*']
    }
  ])
);

if (config[buildEnv].productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config[buildEnv].productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config[buildEnv].bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
