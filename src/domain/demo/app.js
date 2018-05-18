import Vue from 'vue'
import router from './router'
import App from './app.vue'
import trace from '@/plugins/trace'
import vconsole from '@/plugins/vconsole'

process.env.NODE_ENV === 'production' || console.log('Looks like we are in development mode!')

/* add trace plugin, specify project name */
Vue.use(trace, {project: 'yhy-owl-demo'})

/* add vconsole plugin */
Vue.use(vconsole)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
