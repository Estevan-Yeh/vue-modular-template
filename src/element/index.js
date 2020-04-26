import { Button, Link, Loading } from 'element-ui'

export default {
  install: Vue => {
    Vue.use(Button)
    Vue.use(Link)
    Vue.use(Loading)

    Vue.prototype.$loading = Loading
  }
}
