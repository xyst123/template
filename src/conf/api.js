import env from './env';

/*
 * API_1 配置
 */
const API_1_CONF = {
  dev: '/onlinePay/wxcommonpay/payplatform', // dev
  test: 'https://tjzt75.djtest.cn/onlinePay/wxcommonpay/payplatform', // 测试环境
  production: 'https://jzt.daojia.com/onlinePay/wxcommonpay/payplatform' // 线上环境
};

export const API_1 = API_1_CONF[env];
console.log('env:%s,API_1:%s', env, API_1);

export const Global = {
  // conf1
  conf1: '/agreement/aptitude/list',
  // conf2
  conf2: '/personal/searchIdentityInfo'
};
