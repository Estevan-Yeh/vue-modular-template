import { Loading } from 'element-ui'

// 用于存储全屏 Loading 标志，保证全屏 Loading 的唯一
let loadingList = []

/**
 * 全屏 Loading 打开
 * 每次调用将 name 存入 loadingList，只有 loadingList 为空才打开 Loading
 * @param {String} name - loading 标志
 */
export const ShowLoading = name => {
  if (loadingList.length === 0) {
    Loading.service({ lock: true })
  }

  loadingList.push(name)
}

/**
 * 全屏 Loading 关闭
 * 每次调用将 name 从 loadingList 中移除，只有 loadingList 为空才关闭 Loading
 * @param {String} name - Loading 标志
 */
export const CloseLoading = name => {
  const start = loadingList.indexOf(name)
  loadingList.splice(start, 1)

  if (loadingList.length === 0) {
    Loading.service().close()
  }
}
