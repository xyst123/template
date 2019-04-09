require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var fs = require('fs')
var opn = require('opn')
var path = require('path')
var net = require('net')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// mock
if (Object.keys(proxyTable).length === 0) {
  var mock = require('./dev-mock')
  var mockDir = path.resolve(__dirname, '../mock')
  var serve = mock(app)
  var search_mock = function (mockDir) {
    fs.readdirSync(mockDir).forEach(function (file) {
      if (file.indexOf('.') === 0) return;
      var mockFile = path.resolve(mockDir, file);
      if (fs.lstatSync(mockFile).isDirectory()) {
        search_mock(mockFile);
      } else {
        if (path.extname(mockFile) !== '.js') return;
        var obj = {}
        var mockObj = require(mockFile)
        obj[mockObj.api] = mockObj.response
        fs.watch(mockFile, (eventType, filename) => {
          var filePath = path.resolve(mockDir, filename)
          console.info('file changed %s', filePath)
          delete require.cache[filePath]
          try {
            var changedFile = require(filePath)
            obj[changedFile.api] = changedFile.response
            console.log(changedFile.response)
            hotMiddleware.publish({ action: 'reload' })
          } catch (error) {
            // mock�ļ������ڻ�ɾ��ʱ��ֹ����
          }
        })
        serve(obj || {})
      }
    })
  }
  search_mock(mockDir)
}

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  if (autoOpenBrowser) {
    opn(uri)
  }
  _resolve()
})

function bindPoint(portNum) {
  var testServer = net.createServer().listen(portNum)
  testServer.on('listening', function () {
    testServer.close()
    var server = app.listen(portNum)
    uri = 'http://localhost:' + portNum
  })

  testServer.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      if (portNum < port + 20) {
        console.log(`�˿�${portNum}��ռ�ã�����${portNum + 1}`)
        bindPoint(++portNum)
      }
      else console.log(`�˿�${port}~${port + 20}����ռ�ã�`)
    }
  })
}
bindPoint(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
