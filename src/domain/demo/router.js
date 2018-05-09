import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: () => import('./views/index.vue'),
    meta: {
      title: 'index'
    }
  }]
})

router.beforeEach((to, from, next) => {
  /* add pageview trace */
  Vue.prototype.$trace.pageview(`/demo/#${to.path}`, from.path === '/' ? '' : `/demo/#${from.path}`)

  next()
})

export default router
