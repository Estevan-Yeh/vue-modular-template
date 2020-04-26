// 模块声明
const ModularList = ['Common']

// 集成 router
let _routerList = {}
// 集成 vuex
let _store = {}

ModularList.map(modularName => {
  // 收集模块 router 对象
  const routerItem = require(`./${modularName}/router`).default

  _routerList[modularName] = {}
  for (const pageName in routerItem) {
    _routerList[modularName][pageName] = routerItem[pageName]
  }

  // 收集模块 vuex 对象
  _store[modularName] = require(`./${modularName}/store`).default
})

export const routerList = _routerList

export const store = _store
