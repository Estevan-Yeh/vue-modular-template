import Router from './index'
import { routerList } from '@/pages'

const Nav = (arguments0, arguments1 = '', arguments2 = '') => {
  let page = {}
  if (typeof arguments0 === 'object' && arguments0) {
    page = arguments0
  } else if (typeof arguments0 === 'string') {
    // 如果参数不是 go/back/forward 则为 name
    switch (arguments0) {
      case 'go':
        Number(arguments1) ? Router.go(Number(arguments1)) : Router.go(0)
        return false
      case 'back':
        Router.back()
        return false
      case 'forward':
        Router.forward()
        return false
      default:
        // 默认使用 name 跳转
        page.name = arguments0
        if (typeof arguments1 === 'object') {
          page.query = arguments1
          arguments1 = arguments2
        }
    }
  } else {
    return false
  }

  const routerItemName = page.name.split('.')[1]
  const routerItem = routerList[routerItemName]
    ? routerList[routerItemName]
    : {}
  page.query = { ...routerItem.query, ...page.query }
  page.params = { ...routerItem.params, ...page.params }

  const _openType = arguments1 || routerItem.openType || 'push'

  switch (_openType) {
    case 'push':
      Router.push({
        ...page
      })
      break
    case 'replace':
      Router.replace({
        ...page
      })
      break
  }
}

export default {
  install: Vue => {
    Vue.prototype.$nav = Nav
  }
}
