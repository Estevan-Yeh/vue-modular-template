<template>
  <div>
    {{msg}}
    <div>页面路径：{{$route.path}}</div>
    <div @click="toBack">点击回退</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello, Yeh ~'
    }
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
