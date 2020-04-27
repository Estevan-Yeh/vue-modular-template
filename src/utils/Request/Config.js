/**
 * 成功回调处理 ./lib/requestSuccess
 * 失败回调处理 ./lib/requestFail
 *
 * 后台成功回调数据格式为 {code:状态码, msg: 错误回调信息, result: 返回结果}
 * 可在成功回调处理中做修改或在 ./lib/Axios 中拦截做修改
 */

export default {
  // 环境
  env: 'dev',
  // 环境域名端口
  host: {
    dev: 'http://127.0.0.1:8082',
    pro: '',
    mock: ''
  },
  // 端名
  controlName: '',
  // 模块名
  modularName: '',
  // apiUrl 格式
  apiFormat: 'host/controlName/modularName/actionName',
  // 全局 header
  header: {},
  // 成功返回码
  successCode: [200],
  // 忽略提示返回码
  ignoreCode: [401],
  // 请求默认超时时间
  timeout: 10000,
  // 防止在 repeatTime 时间内重复请求
  repeatTime: 1000,
  // 请求超时回调信息
  timeoutMessage: '请求超时',
  // 取消请求回调信息
  cancelMessage: '请求取消'
}
