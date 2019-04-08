import Vue from 'vue'
import Router from 'vue-router'
import Foo from '@/page/foo'

const Bar = () => import('../page/bar')
const Kar = () => import('../page/kar')

Vue.use(Router)

const routers = {
  routes: [
    {
      path: '/',
      name: 'Foo',
      component: Foo
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    },
    {
      path: '/kar',
      name: 'Kar',
      component: Kar
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
}

export default new Router(routers)
