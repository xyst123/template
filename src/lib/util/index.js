import axios from 'axios'
// import qs from 'qs'
import { getUrl } from '@/config/api'
import dataMap from '@/config/data-map'

// 处理请求结果
export function handleRes(res, message = {}) {
  if (res && res.code) {
    if (res.code === 100) {
      // 假定只有code为100情况请求成功
      if (message.success) {
        console.log(message.success)
      }
      return true
    } else {
      // 收到返回值但有异常
      alert(res.data || '网络错误')
      console.error(res)
      return false
    }
  } else {
    // 未收到返回值且有异常
    alert(message.fail || '系统错误')
    console.error(res)
    return false
  }
}

// 发出http请求
export function $request({ name = '', method = 'GET', download = false, data = {}, customConfig = {} }) {
  let options = {
    url: getUrl(name),
    withCredentials: true,
    method,
    ...customConfig // 其他必要的参数，参见axios文档
  }
  // GET发送的公共参数
  const commonParams = {}
  // 区分请求方式
  if (method === 'GET') {
    options = { ...options, params: Object.assign(commonParams, data) }
  } else {
    options = {
      ...options, params: commonParams, data
    }
  }
  if (download) {
    // 下载文件
    const arr = []
    for (let key in options.params) {
      arr.push(`${key}=${options.params[key]}`)
    }
    const str = arr.join('&')
    window.open(`${options.url}?${str}`)
  } else {
    // 普通请求
    return new Promise((resolve, reject) => {
      axios(options).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

// 已知src/config/data-map中的value，得到label
export function valueToLabel(type, value) {
  const valueString = String(value)
  const currentMap = dataMap[type]
  if (!Array.isArray(currentMap)) return undefined
  for (let item of currentMap) {
    if (String(item.value) === valueString) {
      return item.label
    }
  }
}

// 已知src/config/data-map中的label，得到value
export function labelToValue(type, label) {
  const labelString = String(label)
  const currentMap = dataMap[type]
  if (!Array.isArray(currentMap)) return undefined
  for (let item of currentMap) {
    if (String(item.label) === labelString) {
      return item.value
    }
  }
}

// 日期对象转换为字符串
export function dateToStr(dateObj, formatStr) {
  var str = formatStr
  var Week = ['日', '一', '二', '三', '四', '五', '六']
  str = str.replace(/yyyy|YYYY/, dateObj.getFullYear())
  str = str.replace(/yy|YY/, (dateObj.getYear() % 100) > 9 ? (dateObj.getYear() % 100).toString() : '0' + (dateObj.getYear() % 100))
  var month = dateObj.getMonth() + 1
  str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month)
  str = str.replace(/M/g, month)
  str = str.replace(/w|W/g, Week[dateObj.getDay()])
  str = str.replace(/dd|DD/, dateObj.getDate() > 9 ? dateObj.getDate().toString() : '0' + dateObj.getDate())
  str = str.replace(/d|D/g, dateObj.getDate())
  str = str.replace(/hh|HH/, dateObj.getHours() > 9 ? dateObj.getHours().toString() : '0' + dateObj.getHours())
  str = str.replace(/h|H/g, dateObj.getHours())
  str = str.replace(/mm/, dateObj.getMinutes() > 9 ? dateObj.getMinutes().toString() : '0' + dateObj.getMinutes())
  str = str.replace(/m/g, dateObj.getMinutes())
  str = str.replace(/ss|SS/, dateObj.getSeconds() > 9 ? dateObj.getSeconds().toString() : '0' + dateObj.getSeconds())
  str = str.replace(/s|S/g, dateObj.getSeconds())
  return str
}
