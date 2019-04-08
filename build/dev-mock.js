let _ = require('lodash')
let chalk = require('chalk')
let express = require('express')

let server = null
let router = express.Router()

// 合法的http请求method
const REG_VALID_METHOD = /^(get|post)\s+/i
// 合法的路由pattern
const REG_VALID_PATTERN = /^(get|post)\s+\/([\w\d\/]*(\?\$[\w\d]+(\&\$[\w\d]+)*)*)*[\w\d\/]$/i
// 匹配url参数正则
const REG_URL_PARAMTERS = /\?\$[\w\d]+(\&\$[\w\d]+)*[\w\d]+$/i
// url query条目正则
const REG_URL_QUERY_ITEM = /\$[\w\d]+/g

module.exports = function (app) {
  server = app
  return function (options) {
    if (!options || !_.isPlainObject(options)) {
      console.log(chalk.red('Mock: invalid parameters'))
      process.exit()
    }
    resolve(options)
  }
}

let resolve = function (options) {
  /**
   * 通用请求
   * 每接到一个请求都遍历options对象
   */
  router.all('*', (req, res, next) => {
    let req_path = req.path
    let req_method = _.lowerCase(req.method)
    let flag = false
    for (let key in options) {
      if (REG_VALID_PATTERN.test(key)) {
        // 滤出请求方法类型
        let method = _.lowerCase(_.trim(REG_VALID_METHOD.exec(key)[0]))
        // 滤出url规则
        let urlPattern = _.trim(_.last(key.split(REG_VALID_METHOD)))
        if (req_method === method && req_path === urlPattern) {
          let response = options[key].ok || {
            code: 0,
            msg: '请求成功'
          }
          req.query.callback && res.jsonp(response) || res.json(response)
          flag = true
        }
      }
    }
    if (!flag) next()
  })
  server.use(router)
}
