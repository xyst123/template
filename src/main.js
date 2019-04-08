import './style/global.scss'

// 引入promise垫片
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h('App'),
  components: { App }
})
