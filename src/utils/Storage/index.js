import SetStorage from './SetStorage'
import { GetStorage, GetStorageList } from './GetStorage'
import { RemoveStorage, ClearStorage } from './DeleteStorage'

export default {
  install: Vue => {
    Vue.prototype.$setStorage = SetStorage
    Vue.prototype.$getStorage = GetStorage
    Vue.prototype.$getStorageList = GetStorageList
    Vue.prototype.$removeStorage = RemoveStorage
    Vue.prototype.$clearStorage = ClearStorage
  }
}
