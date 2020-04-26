// 模块声明
const ModularList = ['Common']

// 集成 router
let _routerList = {}

ModularList.map(modularName => {
  // 收集模块 router 对象
  const routerItem = require(`./${modularName}/router`).default

  _routerList[modularName] = {}
  for (const pageName in routerItem) {
    _routerList[modularName][pageName] = routerItem[pageName]
  }
})

export const routerList = _routerList
