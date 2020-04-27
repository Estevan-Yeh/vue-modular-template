import Config from '../Config'
import { CloseLoading } from '@/element/Interactions'

const ErrStatus = (err, message, reject) => {
  switch (err.status) {
    case 404:
      reject('页面不存在')
      break
    case 500:
      reject('服务器繁忙')
      break
    case 0:
      reject('网络出错')
      break
    default:
      reject(message)
  }
}

export default (err, reject, apiName, loading) => {
  loading && CloseLoading(apiName)
  if (err.message === Config.cancelMessage) {
    reject(err.message)
  } else if (err.message.search('timeout') !== -1) {
    reject(Config.timeoutMessage)
  } else if (err.request) {
    const message = err.request.statusText
      ? err.request.statusText
      : err.message
    ErrStatus(err.request, message, reject)
  } else if (err.response) {
    const message = err.request.statusText
      ? err.request.statusText
      : err.message
    ErrStatus(err.response, message, reject)
  }
}
