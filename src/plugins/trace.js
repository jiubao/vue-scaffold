import trace, {pageview, debug, config} from '@/services/trace'

export default {
  install (vue, opts) {
    window.location.href.indexOf('h5.yingheying.com') !== -1 || debug()
    config(opts)
    vue.prototype.$trace = trace
    vue.prototype.$trace.debug = debug
    vue.prototype.$trace.pageview = pageview
  }
}
