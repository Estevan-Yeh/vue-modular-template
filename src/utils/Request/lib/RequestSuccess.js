import Config from '../Config'
import { api } from '@/pages'
import { CloseLoading, ShowMessage } from '@/element/Interactions'

/**
 * 检查回调中 code 是否成功码
 */
const CheckSuccessCode = (apiName, res, successCode) => {
  const apiCode = api[apiName].successCode || []
  const configCode = Config.successCode
  const _successCode = [...successCode, ...apiCode, ...configCode]
  return _successCode.indexOf(Number(res.code)) >= 0
}

/**
 * 处理忽略提示
 */
const CheckIgnoreCode = (apiName, res, ignoreCode = []) => {
  const apiIgnore = api[apiName].ignoreCode || []
  const configIgnore = Config.ignoreCode || []
  const _ignoreCode = [...ignoreCode, ...configIgnore, ...apiIgnore]
  _ignoreCode.indexOf(Number(res.code)) === -1 && ShowMessage(res.msg)
}

export default (
  res,
  resolve,
  { loading, apiName, successCode, ignoreCode, forceReturn }
) => {
  loading && CloseLoading(apiName)
  if (res.status === 200) {
    res = res.data
    if (CheckSuccessCode(apiName, res, successCode)) {
      // code 为成功码
      resolve(res.result)
    } else {
      // code 不是正确码，检测是否在忽略提示码内或是否强制返回
      CheckIgnoreCode(apiName, res, ignoreCode)
      // 返回 401，重新登录
      if (res.code === 401) {
        ShowMessage(res.msg, 'error')
        setTimeout(() => {
          // 跳转登录
        }, 1500)
      }

      // 强制返回
      forceReturn && resolve(res)
    }
  }
}
