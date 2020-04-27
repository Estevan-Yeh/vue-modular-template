import Axios from 'axios'
import qs from 'qs'
import {
  Request,
  GetInfo,
  GetApiUrl,
  GetHeader,
  GetTimeout,
  RequestSuccess,
  RequestFail
} from './lib'
import { ShowLoading } from '@/element/Interactions'

/**
 * get请求
 * @param {String} apiName - 格式为`${modularName}.${apiName}`
 * @param {Object} data - 数据
 * @param {Object} param2
 * @param {Object} param2.cancel - vue 页面用于接收 cancelToken() 的对象
 * @param {Boolean} param2.loading - 是否开启 loading
 * @param {Object} param2.urlOptions - apiUrl 参数
 * @param {Number} param2.timeout - 超时时间
 */
export const Get = (
  apiName,
  data = {},
  {
    cancel = null,
    loading = true,
    header = {},
    forceReturn = false,
    successCode = [],
    ignoreCode = [],
    urlOptions = {},
    timeout = null
  } = {}
) => {
  return new Promise((resolve, reject) => {
    loading && ShowLoading(apiName)
    const _apiName = GetInfo(apiName)
    const headers = GetHeader(_apiName, header)
    const apiUrl = GetApiUrl(_apiName, urlOptions)
    timeout = GetTimeout(_apiName, timeout)

    /**
     * 设置取消请求方法，在页面中调用 cancel.cancelToken(Config.cancelMessage) 取消本次请求
     */
    let cancelToken = null
    if (cancel !== null && typeof cancel === 'object') {
      cancelToken = new Axios.CancelToken(c => {
        cancel.cancelToken = c
      })
    }

    Request.get(apiUrl, {
      params: data,
      headers,
      cancelToken,
      timeout
    })
      .then(res => {
        RequestSuccess(res, resolve, {
          loading,
          apiName,
          successCode,
          ignoreCode,
          forceReturn
        })
      })
      .catch(err => {
        RequestFail(err, reject, apiName, loading)
        // reject(err)
      })
  })
}

/**
 * post请求
 */
export const Post = (
  apiName,
  data = {},
  {
    cancel = null,
    loading = true,
    header = {},
    forceReturn = false,
    successCode = [],
    ignoreCode = [],
    urlOptions = {},
    timeout = null
  } = {}
) => {
  return new Promise((resolve, reject) => {
    loading && ShowLoading(apiName)
    const _apiName = GetInfo(apiName)
    const headers = GetHeader(_apiName, header)
    const apiUrl = GetApiUrl(_apiName, urlOptions)
    timeout = GetTimeout(_apiName, timeout)

    /**
     * 设置取消请求方法，在页面中调用 cancel.cancelToken(Config.cancelMessage) 取消本次请求
     */
    let cancelToken = null
    if (cancel) {
      cancelToken = new Axios.CancelToken(c => {
        cancel.cancelToken = c
      })
    }

    Request.post(apiUrl, qs.stringify(data), {
      headers,
      cancelToken,
      timeout
    })
      .then(res => {
        RequestSuccess(res, resolve, {
          loading,
          apiName,
          successCode,
          ignoreCode,
          forceReturn
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 上传文件
 */
export const UploadFile = (
  apiName,
  file,
  {
    cancel = null,
    loading = true,
    header = {},
    forceReturn = false,
    successCode = [],
    ignoreCode = [],
    urlOptions = {},
    timeout = null
  }
) => {
  return new Promise((resolve, reject) => {
    loading && ShowLoading(apiName)
    const _apiName = GetInfo(apiName)
    const headers = GetHeader(_apiName, header)
    timeout = GetTimeout(_apiName, timeout)

    if (headers) {
      const apiUrl = GetApiUrl(_apiName, urlOptions)
      let cancelToken = null
      if (cancel) {
        cancelToken = new Axios.CancelToken(c => {
          cancel.cancelToken = c
        })
      }

      let formData = new FormData()
      formData.append('file', file)
      Request.post(apiUrl, formData, {
        'Content-Type': 'multipart/form-data',
        headers,
        cancelToken,
        timeout
      })
        .then(res => {
          RequestSuccess(res, resolve, {
            loading,
            apiName,
            successCode,
            ignoreCode,
            forceReturn
          })
        })
        .catch(err => {
          reject(err)
        })
    } else {
      reject(new Error('no headers'))
    }
  })
}

export default {
  install: Vue => {
    Vue.prototype.$get = Get
    Vue.prototype.$post = Post
    Vue.prototype.$getApiUrl = GetApiUrl
    Vue.prototype.$request = Request
    Vue.prototype.$qs = qs
    Vue.prototype.$axios = Axios
  }
}
