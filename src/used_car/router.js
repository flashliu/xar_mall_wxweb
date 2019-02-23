import Vue from 'vue'
import Router from 'vue-router'
import Home from './view/Home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        keepAlive: true
      },
      component: Home
    },
    {
      path: '/carbrand',
      name: 'carbrand',
      component: () => import('./view/CarBrand')
    },
    {
      path: '/orderhistory/:isEmployee',
      name: 'orderhistory',
      component: () => import('./view/OrderHistory')
    },
    {
      path: '/assess',
      name: 'assess',
      component: () => import('./view/Assess')
    },
    {
      path: '/assessinfo/:id',
      name: 'assessinfo',
      meta: {
        keepAlive: true
      },
      component: () => import('./view/AssessInfo')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('./view/Detail')
    },
  ]
})
