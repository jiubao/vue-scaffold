import Vue from 'vue'
import loadingView from './loading.vue'
import {on, off, addClass, removeClass} from '@/utils/dom'

let queueLoading = []

const defaultOptions = {
  show: true
}

let currentOptions = { ...defaultOptions }

function createLoading () {
  if (!queueLoading.length) {
    const loading = new (Vue.extend(loadingView))({
      el: document.createElement('div')
    })
    document.body.appendChild(loading.$el)
    queueLoading.push(loading)
  }
  return queueLoading[queueLoading.length - 1]
}
function prevent (e) {
  e.preventDefault()
}
function Loading (options = {}) {
  const loading = createLoading(loadingView, queueLoading)
  addClass(document.body, 'overflowHidden')
  on(document.body, 'touchmove', prevent)
  options = {
    ...currentOptions,
    clear () {
      loading.show = false
      removeClass(document.body, 'overflowHidden')
      off(document.body, 'touchmove', prevent)
    }
  }

  Object.assign(loading, options)

  return loading
}

Loading.clear = all => {
  if (queueLoading.length) {
    queueLoading.forEach(loading => {
      loading.clear()
    })
  }
}

export default Loading
