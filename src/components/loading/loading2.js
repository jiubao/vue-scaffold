import Vue from 'vue'
import loadingView from './loading.vue'
import {on, off, addClass, removeClass} from '@/utils/dom'

// TODO: refactored, need test
function Loading () {
  var loading = new (Vue.extend(loadingView))({
    el: document.createElement('div')
  })
  document.body.appendChild(loading.$el)
  // queueLoading.push(loading)
  loading.show = false

  var hidden = true

  loading.show = function () {
    loading.show = true
    if (!hidden) return
    addClass(document.body, 'overflowHidden')
    on(document.body, 'touchmove', e => e.preventDefault())
    hidden = false
  }

  loading.hide = function () {
    loading.show = false
    if (hidden) return
    removeClass(document.body, 'overflowHidden')
    off(document.body, 'touchmove', e => e.preventDefault())
    hidden = true
  }

  return loading
}

const loadingQueue = []
function toggle (visible) {
  if (!loadingQueue.length) loadingQueue.push(Loading())
  var loading = loadingQueue[0]
  if (visible || visible === '') loading.show()
  else loading.hide()
}

const ticks = []
function delay (visible, ms = 0) {
  if (visible) {
    ticks.push(setTimeout(() => toggle(), ms))
  } else {
    clearTimeout(ticks.splice(0, 1))
    ticks.length || toggle(false)
  }
}

export default delay
