/**
 * 移除单个 Storage
 * @param {String} key - Storage Key
 * @param {String} type - Storage 类型，'session'/'local'
 */
export const RemoveStorage = (key, type = 'session') => {
  return new Promise((resolve, reject) => {
    if (type === 'session') {
      try {
        sessionStorage.removeItem(key)
        resolve()
      } catch (e) {
        reject(e)
      }
    } else if (type === 'local') {
      try {
        localStorage.removeItem(key)
        resolve()
      } catch (e) {
        reject(e)
      }
    }
  })
}

/**
 * 移除所有 Storage
 * @param {String} type - Storage 类型，'session'/'local'
 */
export const ClearStorage = (type = 'session') => {
  return new Promise((resolve, reject) => {
    if (type === 'session') {
      try {
        sessionStorage.clear()
        resolve()
      } catch (e) {
        reject(e)
      }
    } else if (type === 'local') {
      try {
        localStorage.clear()
        resolve()
      } catch (e) {
        reject(e)
      }
    }
  })
}
