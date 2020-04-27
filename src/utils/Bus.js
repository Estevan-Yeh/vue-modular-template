import Vue from 'vue'

export const Bus = new Vue()

export const EmitType = {}

export default {
  install: Vue => {
    Vue.prototype.$emitType = EmitType
    Vue.prototype.$bus = Bus
  }
}
