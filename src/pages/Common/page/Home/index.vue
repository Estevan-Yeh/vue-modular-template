<template>
  <div>
    {{msg}}{{name}} ~
    <div>页面路径：{{$route.path}}</div>
    <div @click="toPage_1">点击跳转到 Page_1</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Common')

export default {
  data () {
    return {
      msg: 'Hello, '
    }
  },
  computed: {
    ...mapState(['name'])
  },
  methods: {
    toPage_1 () {
      this.$nav('Common.Page_1')
    }
  }
}
</script>

<style scoped>
</style>
