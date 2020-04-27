/**
 * 获取单个 Storage
 * @param {String} key - Storage Key
 * @param {String} type - Storage 类型，'session'/'local'
 */
export const GetStorage = (key, type = 'session') => {
  let val = null

  if (type === 'session') {
    if (sessionStorage.getItem(key)) {
      val = JSON.parse(sessionStorage.getItem(key))
    }
  } else if (type === 'local') {
    if (localStorage.getItem(key)) {
      val = JSON.parse(localStorage.getItem(key))
    }
  }

  return val
}

/**
 * 获取 Storage 列表
 * @param {String} type - Storage 类型，'session'/'local'
 */
export const GetStorageList = (type = 'session') => {
  let val = []

  if (type === 'session') {
    for (let i = 0; i < sessionStorage.length; i++) {
      val.push(GetStorage(sessionStorage.key(i), type))
    }
  } else if (type === 'local') {
    for (let i = 0; i < localStorage.length; i++) {
      val.push(GetStorage(localStorage.key(i), type))
    }
  }

  return val
}
