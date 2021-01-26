import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: require('@/pages/LoginPage').default
    },
    {
      path: '/main',
      name: 'main-page',
      component: require('@/pages/MainPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
