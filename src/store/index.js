import Vue from 'vue'
import Vuex from 'vuex'
import { store } from '@/pages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: store
})
