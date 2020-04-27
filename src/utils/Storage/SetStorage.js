/**
 * 设置 Storage
 * @param {String} key - Storage Key
 * @param {String} val - Storage 键值
 * @param {String} type - Storage 类型，'session'/'local'
 */
export default (key, value, type = 'session') => {
  return new Promise((resolve, reject) => {
    let val = JSON.stringify(value)
    if (type === 'session') {
      try {
        sessionStorage.setItem(key, val)
        resolve()
      } catch (e) {
        reject(e)
      }
    } else if (type === 'local') {
      try {
        localStorage.setItem(key, val)
        resolve()
      } catch (e) {
        reject(e)
      }
    }
  })
}
