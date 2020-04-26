<template>
  <div>
    {{msg}}{{name}} ~
    <div style="padding:30px">页面路径：{{$route.path}}</div>
    <div @click="toPage_1">
      <el-link
        :underline="false"
        type="primary"
      >点击跳转到 Page_1</el-link>
    </div>
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
