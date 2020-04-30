import Axios from 'axios'
import Config from '../Config'

// 新建 Axios 实例
const Request = Axios.create()

// 给 Request 添加请求列表属性
Request.reqList = []

/**
 * 全局拦截器
 */
Request.interceptors.request.use(
  conf => {
    let reqList = Request.reqList
    let cancel

    const url = conf.url
    // 防止重复请求
    const hasUrl = reqList.indexOf(url)
    // 如果该请求的 url 在 reqList 中则取消本次请求，不在则将该 url 添加到 reqList 中
    if (hasUrl < 0) {
      reqList.push(url)
    } else {
      // 设置 cancelToken 对象
      if (conf.cancelToken) {
        // 如果已经设置 cancelToken，则允许重复请求
        reqList.push(url)
      } else {
        conf.cancelToken = new Axios.CancelToken(c => {
          cancel = c
        })
        cancel(Config.cancelMessage)
      }
    }

    return conf
  },
  err => {
    return Promise.reject(err)
  }
)

Request.interceptors.response.use(
  response => {
    // 防止短时间内重复请求
    // 每次请求完成一定时间后再将 url 从 reqList 中移除
    const _timeout = setTimeout(() => {
      const hasUrl = Request.reqList.indexOf(response.config.url)
      hasUrl >= 0 && Request.reqList.splice(hasUrl, 1)
      clearTimeout(_timeout)
    }, Config.repeatTime)

    return response
  },
  error => {
    if (error.message !== Config.cancelMessage) {
      const _timeout = setTimeout(() => {
        const hasUrl = Request.reqList.indexOf(error.config.url)
        hasUrl >= 0 && Request.reqList.splice(hasUrl, 1)
        clearTimeout(_timeout)
      }, Config.repeatTime)
    }
    return Promise.reject(error)
  }
)

export default Request
