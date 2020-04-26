import Vue from 'vue'
import Router from 'vue-router'
import { routerList } from '@/pages'

Vue.use(Router)

let _routes = []

// 各模块页面路由配置
for (const modularName in routerList) {
  for (const pageName in routerList[modularName]) {
    _routes.push({
      path: `/${modularName}/${pageName}`,
      component: () => import(`@/pages/${modularName}/page/${pageName}`),
      ...routerList[modularName][pageName]
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
