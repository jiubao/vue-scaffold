const trackingInstance = _ => window.yhytracking
const trackingBuffer = _ => window.yhy_tracing_buffer

export function pageview (url, referer) {
  if (trackingInstance()) trackingInstance().page({ url, referer })
  else trackingBuffer().push({page: {url, referer}})
}

export default (action, project = '俱乐部') => {
  if (trackingInstance()) trackingInstance().event({project, action})
  else trackingBuffer().push({'event': {project, action}})
}

export function debug () {
  var count = 0
  var trackingTick = setInterval(() => {
    if (window.yhytracking) window.yhytracking.debug()
    if (window.yhytracking || count++ >= 5) clearInterval(trackingTick)
    // console.log('tracking count: ', count)
  }, 3000)
}
