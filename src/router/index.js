import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/page/Demo'

Vue.use(Router)

const routers = {
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: Demo
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
}

export default new Router(routers)
