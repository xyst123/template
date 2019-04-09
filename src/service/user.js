import { $request, handleRes, valueToLabel, labelToValue } from '@/lib/util/index'
import validate from '@/lib/util/validate'

// 获取用户信息
export async function getUserInfo() {
  try {
    const res = await $request({
      name: 'userInfo'
    })
    if (handleRes(res)) {
      const { data } = res
      data.statusName = valueToLabel('userStatus', data.status) // id转换为具体值
    }
    return handleRes(res) ? res.data : false
  } catch (error) {
    handleRes(error)
  }
}

// 提交用户信息
export async function submitUserInfo(userInfo) {
  const message = {
    success: '提交成功',
    fail: '提交失败'
  }
  try {
    // 避免副作用
    const _data = Object.assign({}, userInfo, {
      status: labelToValue('userStatus', userInfo.statusName) // 具体值转换为id
    })

    // 校验数据
    const rs = validate.check([
      {
        value: _data.name,
        rules: [
          {
            rule: 'isExist',
            backData: {
              message: '请填写姓名'
            }
          }
        ]
      },
      {
        value: _data.age,
        rules: [
          {
            rule: 'isInteger',
            backData: {
              message: '请填写正确的年龄'
            }
          },
          {
            rule: 'compare',
            backData: {
              message: '请填写正确的年龄'
            },
            options: {
              target: -1,
              type: 'more'
            }
          }
        ]
      },
      {
        value: _data.status,
        rules: [
          {
            rule: 'userDefine',
            backData: {
              message: '请选择会员类型'
            },
            options: {
              fn(data) {
                return Boolean(valueToLabel('userStatus', data))
              }
            }
          }
        ]
      }
    ])
    console.log('validate返回值', rs)
    if (rs.pass) {
      // 发起请求
      const res = await $request({
        name: 'userSubmit',
        method: 'POST',
        data: _data
      })
      return handleRes(res, message)
    } else {
      const { firstError } = rs
      message.fail = firstError.backData.message || ''
      handleRes(firstError, message)
    }
  } catch (error) {
    handleRes(error, message)
  }
}
