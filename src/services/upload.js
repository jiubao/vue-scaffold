import axios from 'axios'
import { Toast } from 'vant'
import { UPLOAD_ROOT } from '@/constants'

function uploadFileAsync (file) {
  var formData = new FormData()
  formData.append('file', file, file.name)
  formData.append('encryptType', 100)

  return axios.post(UPLOAD_ROOT, formData, {
    withCredentials: false,
    onUploadProgress: function (progressEvent) {
      console.log('progressEvent', progressEvent)
    }
  }).then(res => {
    console.log('upload res', res)
    if (res.data.status === 200) {
      return res.data
    } else {
      Toast({
        message: res.data.message,
        position: 'top',
        duration: 5000
      })
    }
  })
}

function upload (file) {
  return window.lrz(file).then(function (rst) {
    // 处理成功会执行
    console.log(rst)
    return uploadFileAsync(rst.file)
  }).catch(function (err) {
    // 处理失败会执行
    console.error(err)
    Toast.fail('图片上传失败，请重试')
  })
}

export {
  upload
}
