import Config from '../Config'
import { api } from '@/pages'

/**
 * 获取 api 信息
 */
export const GetInfo = apiName => {
  const cutApiName = apiName.split('.')
  // api modular 信息
  const modularInfo = api[cutApiName[0]]['modularInfo']
  // 单个 api 信息
  const apiInfo = api[cutApiName[0]][cutApiName[1]]
  return {
    modularInfo,
    apiInfo
  }
}

/**
 * 获取集成 header
 */
export const GetHeader = ({ modularInfo, apiInfo } = {}, header = {}) => {
  const Header = name => {
    const _Header = name.header || {}
    if (typeof _Header === 'object') {
      return _Header
    } else if (typeof _Header === 'function') {
      return _Header()
    }
  }

  return {
    ...Header(Config),
    ...Header(modularInfo),
    ...Header(apiInfo),
    ...header
  }
}

/**
 * 获取 apiUrl
 */
export const GetApiUrl = ({ modularInfo, apiInfo } = {}, options = {}) => {
  const GetVal = key => {
    return (
      options[key] ||
      apiInfo[key] ||
      modularInfo[key] ||
      (key === 'host' ? Config[key][Config.env] : Config[key]) ||
      ''
    )
  }

  let url = []
  // 根据 apiUrl 格式拼接获取 apiUrl
  const _format = Config.apiFormat.split('/')
  for (const i of _format) {
    const val = GetVal(i)
    val && url.push(val)
  }

  return url.join('/')
}

/**
 * 获取 api 信息
 */
export const GetTimeout = ({ modularInfo, apiInfo } = {}, timeout) => {
  return (
    timeout || apiInfo.timeout || modularInfo.timeout || Config.timeout || 0
  )
}
