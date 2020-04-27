<template>
  <div>
    <div><img :src="Logo" /></div>
    {{msg}}
    <div style="padding:30px">页面路径：{{$route.path}}</div>
    <div>
      <el-link
        @click="toBack"
        :underline="false"
        type="primary"
      >点击回退</el-link>
    </div>
  </div>
</template>

<script>
import Images from '@/utils/Images'
export default {
  data () {
    return {
      msg: 'Hello, Yeh ~'
    }
  },
  computed: {
    ...Images(['Logo'])
  },
  methods: {
    toBack () {
      this.$nav('back')
    }
  }
}
</script>

<style scoped>
</style>
