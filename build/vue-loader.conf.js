var utils = require('./utils')
var config = require('../config')
var isDev = process.env.NODE_ENV === 'dev'
var buildEnv = process.env.NODE_ENV || 'dev'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isDev
      ? config.dev.cssSourceMap
      : config[buildEnv].productionSourceMap,
    extract: !isDev,
    isDev: isDev
  })
}
