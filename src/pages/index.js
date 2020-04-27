// 模块声明
const ModularList = ['Common']

// 集成 router
let _routerList = {}
// 集成 vuex
let _store = {}
// 集成 api
let _api = {}

ModularList.map(modularName => {
  // 收集模块 router 对象
  const routerItem = require(`./${modularName}/router`).default

  _routerList[modularName] = {}
  for (const pageName in routerItem) {
    _routerList[modularName][pageName] = routerItem[pageName]
  }

  // 收集模块 vuex 对象
  _store[modularName] = require(`./${modularName}/store`).default

  // 收集模块 api 对象
  const api = require(`./${modularName}/api`)
  const apiItem = api.default
  _api[modularName] = {}
  // api modular 信息
  _api[modularName]['modularInfo'] = api.ModularInfo
  for (const apiName in apiItem) {
    // 单个 api 信息
    _api[modularName][apiName] = apiItem[apiName]
  }
})

export const routerList = _routerList

export const store = _store

export const api = _api
