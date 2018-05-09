import trace, {pageview, debug} from '@/services/trace'

export default {
  install (vue) {
    window.location.href.indexOf('h5.yingheying.com') !== -1 || debug()
    vue.prototype.$trace = trace
    vue.prototype.$trace.debug = debug
    vue.prototype.$trace.pageview = pageview
  }
}
