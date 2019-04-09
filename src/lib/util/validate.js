// 校验数据
export default {
  isType(data, options) {
    const { type } = options
    const _type = Object.prototype.toString.call(data)
    return { pass: _type.toLowerCase() === (`[object ${type}]`).toLowerCase() }
  },
  compare(data, options) {
    const { target, type } = options
    const rs = {
      pass: true
    }
    const _data = Number(data)
    if (type === 'more') {
      rs.pass = _data > target
    } else if (type === 'less') {
      rs.pass = _data < target
    } else {
      rs.pass = _data === target
    }
    return rs
  },
  isInteger(data) {
    return { pass: Number(data) === parseInt(data) }
  },
  isChinese(data) {
    const rs = /^[\u4E00-\u9FA5]+$/.test(data)
    return { pass: rs }
  },
  isPhone(data) {
    const _data = String(data)
    const rs = /^1\d{10}$/.test(_data) || /^\d{3,4}-?\d{7,8}$/.test(_data)
    return { pass: rs }
  },
  isNotNaN(data) {
    return { pass: !Number.isNaN(data) }
  },
  isExist(data) {
    return { pass: Boolean(data) }
  },
  userDefine(data, options) {
    const { fn } = options
    if (fn && typeof fn === 'function') {
      return { pass: fn(data) }
    }
  },
  check(validates = []) {
    const rs = {
      pass: true,
      errors: {},
      firstError: {}
    }
    validates.forEach((validate, index) => {
      const { value } = validate
      for (let rule of validate.rules) {
        const _rule = (rule.rule || '').replace(/\s/g, '')
        let testPass
        let hasValidFn = false
        const fn = this[_rule]
        if (!fn || typeof fn !== 'function') {
          console.error('校验数据——校验函数无效')
          continue
        } else {
          hasValidFn = true
          const testResult = fn(value, rule.options || {})
          testPass = testResult && testResult.pass
        }
        if (!testPass && hasValidFn) {
          const errorInfo = {
            value: validate.value,
            backData: rule.backData || {}
          }
          if (rs.pass) {
            rs.firstError = errorInfo
          }
          rs.pass = false
          const key = validate.id || index
          const { errors } = rs
          if (Array.isArray(errors[key])) {
            errors[key].push(errorInfo)
          } else {
            errors[key] = [errorInfo]
          }
        }
      }
    })
    return rs
  }
}

