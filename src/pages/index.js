// 模块声明
const ModularList = ['Common']

// 集成 router
let _routerList = {}

ModularList.map(modularName => {
  // 收集模块 router 对象
  const routerItem = require(`./${modularName}/router`).default

  _routerList[modularName] = {}
  for (const pageName in routerItem) {
    const route = { ...routerItem[pageName] }
    route.query && delete route.query
    route.params && delete route.params
    _routerList[modularName][pageName] = route
  }
})

export const routerList = _routerList
