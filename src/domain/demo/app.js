import Vue from 'vue'
import router from './router'
import App from './app.vue'
import trace from '@/plugins/trace'
import vconsole from '@/plugins/vconsole'

/* add trace plugin */
Vue.use(trace)

/* add vconsole plugin */
Vue.use(vconsole)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
