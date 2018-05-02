import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: 'home'
    }
  }, {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list.vue'),
    meta: {
      title: 'list'
    }
  }]
})

export default router
