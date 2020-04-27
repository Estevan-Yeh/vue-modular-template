<template>
  <div>
    {{msg}}{{name}} ~
    <div style="padding:30px">页面路径：{{$route.path}}</div>
    <div style="padding-bottom:15px">
      <el-link
        @click="toPage_1"
        :underline="false"
        type="primary"
      >点击跳转到 Page_1</el-link>
    </div>
    <el-link
      @click="testRequest"
      :underline="false"
      type="primary"
    >测试请求</el-link>
  </div>
</template>

<script>
import Config from '@/utils/Request/Config'
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
    },
    testRequest () {
      var that1 = {}
      var that3 = {}
      var that4 = {}
      this.$get('Common.api_1', { that1: 2 }, {
        cancel: that1
      })
        .then(res => {
          console.log('res1', res)
        })
        .catch(err => {
          console.log('err1.4', err)
        })
      that1.cancelToken(Config.cancelMessage)

      this.$get('Common.api_1').catch(err => {
        console.log('err1.0', err)
      })

      this.$get('Common.api_1').catch(err => {
        console.log('err1.1', err)
      })

      this.$get('Common.api_1').catch(err => {
        console.log('err1.2', err)
      })

      this.$get('Common.api_1').catch(err => {
        console.log('err1.3', err)
      })

      this.$get('Common.api_2', {}, {
        urlOptions: {
          host: 'http://127.0.0.1:8080'
        }
      })
        .then(res => {
          console.log('res2', res)
        })
        .catch(err => {
          console.log('err2', err)
        })

      this.$get('Common.api_3', { that1: 2 }, {
        cancel: that3,
        urlOptions: {
          host: 'http://localhost:8080'
        }
      })
        .then(res => {
          console.log('res3', res)
        })
        .catch(err => {
          console.log('err3', err)
        })

      this.$get('Common.api_4', {}, {
        cancel: that4
      })
        .then(res => {
          console.log('res4', res)
        })
        .catch(err => {
          console.log('err4', err)
        })
    }
  }
}
</script>

<style scoped>
</style>
