// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Nav from './router/nav'
import store from './store'
import Element from './element'
import Request from '@/utils/Request'
import Storage from '@/utils/Storage'
import Bus from '@/utils/Bus'

Vue.config.productionTip = false

Vue.use(Nav)
Vue.use(Element)
Vue.use(Request)
Vue.use(Storage)
Vue.use(Bus)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
