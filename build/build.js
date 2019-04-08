require('./check-versions')()
var buildEnv = process.env.NODE_ENV || 'test'
// console.log("process.env.NODE_ENV:%s", process.env.NODE_ENV)
// console.log("process.env.static_domain:%s",process.env.static_domain)

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.build.conf')

var spinner = ora('building for ' + chalk.green(buildEnv) + ' env...')
spinner.start()

rm(path.join(config[buildEnv]['assetsRoot'], config[buildEnv]['assetsSubDirectory']), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
