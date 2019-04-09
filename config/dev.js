var path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"dev"' //输出的环境变量名
  },
  port: 8080, //dev-server监听的端口
  autoOpenBrowser: true, //启动dev-server之后是否自动打开浏览器
  assetsSubDirectory: 'static', //webpack编译输出的二级文件夹
  assetsPublicPath: '/', // webpack编译输出的发布路径
  cssSourceMap: false, //是否开启 cssSourceMap
  imgname: 'img/[name].[ext]', // [src/assets/**/*] 中图片在文件中引入的名字
  fontname: 'fonts/[name].[ext]', // [src/assets/**/*] 字体文件在文件中引入的名字
  proxyTable: { // 需要代理的接口（可跨域）
    // '/api/**': {  // 需要代理的路径
    //   target: 'https://api.interaction.sohu.com/', // 代理地址
    //   changeOrigin: true
    // }
  }
}
