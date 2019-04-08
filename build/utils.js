var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var buildEnv = process.env.NODE_ENV
var userMySprite = config[ 'commonConfig' ][ 'userMySprite' ]

exports.assetsPath = function (_path) {
  var assetsSubDirectory = config[ buildEnv ].assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  var isDev = options.isDev === true;
  var addMySpriteLoader = userMySprite && !isDev;
  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV !== 'dev' ,
      sourceMap: options.sourceMap
    }
  };

  var msprite = {
    loader:'msprite-loader',
    options:{
      outputPath:'./src/assets/sprite_merge_img/',
      scale: 0.3333333333333
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [ cssLoader ]
    if (addMySpriteLoader) {
      loaders.push(msprite);
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders('postcss', { path:  '../.postcssrc.js' }),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
