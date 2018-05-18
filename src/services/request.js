import axios from 'axios'
import { API_ROOT } from '@/constants'
import { Toast } from 'vant'
import { encryptRequestParam } from '@/utils/common'
import {isArray} from '@/utils'
import { forceLogin } from '@/services/native'
import toggleLoading from '@/components/loading/loading2'
import apiCodes from '@/constants/api-codes'
import bizCodes from '@/constants/biz-codes'

/**
 *  error structure:
 *  {
 *    content: []
 *    stat: {
 *      code: -100,
 *      stateList: [{
 *        code: 1003010,
 *        length: 2,
 *        msg: "UNKNOWN_ERROR:-107"
 *      }]
 *    }
 *  }
 *
 *  errorCodes: error codes in this list will pop toast
*/
const authFailCodes = [-360, -300, -160]

var instance = axios.create({
  baseURL: `${API_ROOT}/web.api`,
  withCredentials: true,
  timeout: 30000
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const showToast = msg => {
  Toast({
    type: 'fail',
    duration: 4000,
    forbidClick: false,
    message: msg
  })
}

const toastByApiCode = code => showToast(apiCodes[String(code)] || `${code}: 网络请求失败，请重试`)
const toastByBizCode = code => showToast(bizCodes[String(code)] || `${code}: 网络请求失败，请重试`)

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    if (!config.noLoading) {
      toggleLoading(true, config.loadingDelay || (config.method === 'post' ? 1 : 800))
    }

    return config
  },
  function (error) {
    toggleLoading(false)
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    if (!response.config.noLoading) {
      toggleLoading(false)
    }
    if (response.status === 200 && response.data) {
      var stat = response.data.stat
      var list = stat ? stat.stateList : []
      if (stat.code !== 0) {
        if (authFailCodes.indexOf(stat.code) > -1) {
          forceLogin()
        } else {
          toastByApiCode(stat.code)
        }
        // -360 == e.data.stat.code || -300 == e.data.stat.code || -160 == e.data.stat.code
      } else if (isArray(list) && list.length > 0 && list[0].code !== 0) {
        toastByBizCode(list[0].code)
      }
      return response.data
    } else {
      // handled error
      !response.config.disableToast &&
        Toast({
          message: response.data.message,
          position: 'top',
          duration: 5000
        })
      return response
    }
  },
  function (error) {
    // unexpected error
    toggleLoading(false)
    // TODO: 网络异常处理
    !error.config.disableToast &&
      Toast({
        message: '网络异常，请稍后重试',
        position: 'top',
        duration: 5000
      })
    return Promise.reject(error)
  }
)

export function post (name, data, config) {
  return instance({
    ...config,
    method: 'post',
    data: encryptRequestParam({
      ...data,
      _mt: name
    })
  })
}

export function get (name, data, config) {
  return instance({
    ...config,
    method: 'get',
    params: encryptRequestParam({
      ...data,
      _mt: name
    }, 'get')
  })
}

export function ensure (promise, fn) {
  return promise.then(res => {
    if (res && res.content && res.content.length) return res.content[0]
    fn && fn(res)
    // Promise.reject(res)
  }).catch(_ => {
    // TODO: handle error
  })
}

export function possible (promise) {
  return promise.then(res => {
    if (res && res.content) return res.content[0]
  }).catch(_ => {
    // TODO: handle error
  })
}

// export const content0 = {
//   get: (name, data, config) => get(name, data, config).then(res => {
//     if (res && res.content && res.content.length) return res.content[0]
//     Promise.reject(res)
//   }).catch(err => {}),
//   post: (name, data, config) => post(name, data, config).then(res => {
//     if (res && res.content && res.content.length) return res.content[0]
//     Promise.reject(res)
//   })
// }
