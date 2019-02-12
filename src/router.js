import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue')
    },
    {
      path: '/cardlist',
      name: 'cardlist',
      component: () => import(/* webpackChunkName: "about" */ './views/CardList.vue')
    },
    {
      path: '/mycard/:id',
      name: 'mycard',
      component: () => import(/* webpackChunkName: "about" */ './views/Mycard.vue')
    }
  ]
})
