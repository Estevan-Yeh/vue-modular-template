import Vue from 'vue'
import Router from 'vue-router'
import { routerList } from '@/pages'

Vue.use(Router)

let _routes = []

// 各模块页面路由配置
for (const modularName in routerList) {
  for (const pageName in routerList[modularName]) {
    const route = { ...routerList[modularName][pageName] }
    route.query && delete route.query
    route.params && delete route.params
    route.openType && delete route.openType
    route.name && delete route.name
    _routes.push({
      path: `/${modularName}/${pageName}`,
      name: `${modularName}.${pageName}`,
      component: () => import(`@/pages/${modularName}/page/${pageName}`),
      ...route
    })
  }
}

const routerRegister = new Router({
  routes: _routes
})

routerRegister.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default routerRegister
