import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Controller',
      component: require('@/components/Controller').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
