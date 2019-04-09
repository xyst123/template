// 响应式数据中确定不会被修改的对象可以用Object.freeze处理，以提升性能 {
export default Object.freeze({
  userStatus: [
    { value: 10, label: '非会员' },
    { value: 20, label: '黄金会员' },
    { value: 30, label: '钻石会员' }
  ]
})

