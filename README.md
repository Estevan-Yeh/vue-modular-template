# vue-modular-template

> 封装 vue-router, vuex, axios, element 模块化模板
> 
> 项目模块划分：使目录结构更清晰，方便项目管理修改，模块出入口唯一，保证了各模块代码编写规范，同时各模块代码互不干扰，有利于多人协作开发。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# 模板使用说明目录：
> **[模块说明](#%e6%a8%a1%e5%9d%97%e8%af%b4%e6%98%8e '模块')**  
> **[Router 使用](#router-%e4%bd%bf%e7%94%a8 'Router')**  
> **[Vuex 使用](#vuex-%e4%bd%bf%e7%94%a8 'Vuex')**  
> **[Element 使用](#element-%e4%bd%bf%e7%94%a8 'Element')**  
> **[Axios 使用](#axios-%e4%bd%bf%e7%94%a8 'Axios')**  
> **[Storage 使用](#storage-%e4%bd%bf%e7%94%a8 'Storage')**  
> **[Images 使用](#images-%e4%bd%bf%e7%94%a8 'Images')**  
> **[模块内新增模块](#%e6%a8%a1%e5%9d%97%e5%86%85%e6%96%b0%e5%a2%9e%e6%a8%a1%e5%9d%97 '子模块')**  

# 模块说明
```java
src/pages
|-- Common
|   |-- api
|   |   `-- index.js  // 模块内 api
|   |-- page  // 模块内页面
|   |-- router
|   |   `-- index.js  // 模块内 router
|   `-- store
|       |-- actions.js
|       |-- getters.js
|       |-- index.js  // 模块内 store 集合
|       |-- mutations.js
|       `-- state.js
`-- index.js  // 各模块出入口
```
> ### 新建模块
>> 新增模块添加于 **`/src/pages`** 下，文件夹名为模块名，模块内**至少包含**上述 `Common` 模块出现的内容(其他 文件/文件夹 可根据需要添加)。模块新增后需要在**出入口文件(`/src/pages/index`)里声明**。  
> ```javascript
> // 模块声明
> const ModularList = ['Common']
> ```
> ### 模块内页面
>> 模块内页面存放路径确保 `@/pages/${modularName}/page/${pageName}` 可访问即可。

# Router 使用
> 在模块内 `router/index` 文件里配置 route。  
> > 参数使用参考 [Vue Router 文档](https://router.vuejs.org/zh/installation.html)
```java
export default {
  // pageName 为页面名，需要与对应页面文件名统一
  pageName: {
    // 无说明的参数作用与 vue-router 一致
    // 以下参数都为可选配置，不可配置 name
    // name 最后会封装为 `${modularName}.${pageName}`

    // path 默认值为 `@/pages/${modularName}/page/${pageName}`，可设置动态路由
    path: '',
    // component 默认值为 () => import(`@/pages/${modularName}/page/${pageName}`)
    component: () => import(''),

    // query/params 为路由跳转到该页面时的默认 query/params
    // 假如 Nav() 也传了 query/params，则会在此基础上拼接默认值，不会覆盖
    query: {}
    params: {}

    // 子路由无 query/params，且 path/component/name 无默认值，需要设置 path/component/name
    children: []

    meta: {},
    alias: '',
    redirect: '',
    beforeEnter (to, from, next) {},
    beforeRouteUpdate (to, from, next) {},
    beforeRouteLeave (to, from, next) {},
    scrollBehavior (to, from, savedPosition) {}
  }
}
```
> ### Nav 路由跳转说明
```javascript
Vue.prototype.$nav = Nav

// 使用 back/forward/go 跳转
Nav('back') // 即 Router.back()
Nav('forward') // 即 Router.forward()
Nav('go', arguments1) // 即 Router.go(Number(arguments1))，arguments1 默认为 0

/**
 * 使用 name 跳转
 * @param {String} name - 图片名
 * @param {Object} query - 可选
 * @param {String} openType - 可选 push/replace, 默认为 replace
 */
Nav(name, query, openType)

/**
 * 使用对象跳转(在这里可以使用 path/name 跳转)
 * @param {Object} options - 与 Router({}) 里的对象一致
 * @param {String} openType - 可选 push/replace, 默认为 replace
 */
Nav(options, openType)
```

# Vuex 使用
> 在模块内 `store` 目录下对应文件配置 store。  
> Vuex 使用 `modules` 和 `namespaced`，命名为模块名。  
> 
> 页面使用参考 [Vuex 文档](https://vuex.vuejs.org/zh/installation.html)

# Element 使用
> 按需引入，统一在 `/element/index` 下引入全局组件。  
> 
> 同时在 `/element/Interactions` 目录下封装了 `element-ui` 的 Notice 部分内容(未引入全局)：全屏 loading (**`ShowLoading/CloseLoading`**)，消息提示/弹窗/悬浮页面角落的消息提示(**`ShowMessage/ShowConfirm/ShowNotification`**)。方法参数使用可在对应文件查看。  
> 
> 可通过 **`import {} from '/element/Interactions'`** 引入使用。  
> 
> 更多使用参考 [ElementUi 文档](https://element.eleme.cn/#/zh-CN/component/installation)

# Axios 使用
```java
// 封装方法(使用方法在后面)
Vue.prototype.$get = Get
Vue.prototype.$post = Post
Vue.prototype.$uploadFile = UploadFile

// 无封装方法
Vue.prototype.$qs = qs
Vue.prototype.$axios = Axios
```
> ### 封装说明
> > 集成 apiUrl，统一 url 格式；  
> > 集成 header；  
> > 集成返回码 (successCode/ignoreCode)；  
> > 集成接口超时时间；  
> > 封装防止重复请求；  
> > 接口回调处理及后台返回数据格式说明 查看 `/utils/Request/Config`  
> ### 封装的全局配置
>> Axios 全局配置 `/utils/Request/Config`  
>> 其中 `apiFormat`(url 格式) 设置需要以 `'host/'` 开头(参数连接符号为 `/`) ，即 `host/ + any`
>
> ### api 模块及单个 api 配置
> > 配置文件 `/src/pages/module/api`  
> > 模块信息配置于 `ModularInfo`  
> > 单个 api 信息配置于 `default`
> >   
> > 可配置参数：`header`, `successCode`, `ignoreCode`, `timeout`, `host`(String类型), (`controlName`, `modularName`, `actionName`)(`Config.apiFormat` 切割出来的参数)
> > 
> > #### 配置参数优先级：页面调用设置 > 单个 api 配置 > api 模块配置 > 全局配置
> ### Request 使用
> 源码见 `/utils/Request/index` 可根据需要多写几个方法。  
> Get 示例见 `Common.Home` 页面  
> 更多使用参考 [Axios 文档](http://www.axios-js.com/zh-cn/docs/)
> ```javascript
> Get(apiName, data, options).then().catch()
> Post(apiName, data, options).then().catch()
> // file 为上传的文件
> UploadFile(apiName, file, options).then().catch()
> ```
> 参数说明
> >  `apiName` 为 `modularName.apiName`，注意：
> > `modularName` 即 `/src/pages/module` 模块名；`apiName` 即 `/src/pages/module/api` 中 `default` 的单个 api 对象名  
> >
> > `data` 为需要提交的数据 data  
> >
> > `options` 为一个 `Object`
```java
/**
 * get请求说明(post/uploadFile 使用可参考 get)
 * @param {String} apiName - 格式为`${modularName}.${apiName}`
 * @param {Object} data - 数据
 * @param {Object} param2
 * @param {Object} param2.cancel - vue 页面用于接收 cancelToken() 的对象
 * @param {Boolean} param2.loading - 是否开启 loading
 * @param {Object} param2.urlOptions - apiUrl 参数
 * @param {Number} param2.timeout - 超时时间
 */
 Get(apiName, data, {
    cancel = null,
    loading = true,
    header = {},
    forceReturn = false,
    successCode = [],
    ignoreCode = [],
    urlOptions = {},
    timeout = null
  }
)
```
> > **当参数传入 cancel 时，该 api 将允许重复请求**  

# Storage 使用
```javascript
Vue.prototype.$setStorage = SetStorage
Vue.prototype.$getStorage = GetStorage
Vue.prototype.$getStorageList = GetStorageList
Vue.prototype.$removeStorage = RemoveStorage
Vue.prototype.$clearStorage = ClearStorage

// 设置 Storage，返回 Promise
SetStorage(key, value, type)
// 获取单个 Storage，返回 val
GetStorage(key, type)
// 获取 Storage 列表，返回 val[]
GetStorageList(type)
// 移除单个 Storage，返回 Promise
RemoveStorage(key, type)
// 移除所有 Storage，返回 Promise
ClearStorage(type)
```
> **Storage 参数说明**  
> 
|    key     |  value   |                  type                  |
| :--------: | :------: | :------------------------------------: |
| Storage 键 | 设置键值 | `'session'/'local'`，默认为`'session'` |

# Images 使用
> 封装返回图片 url，统一图片管理。  
> 
> 返回 url 格式：`imgUrl?width=*&height=*`
>
> 在 `/utils/Images` 里配置图片 url (绝对路径，若是本地图片需要放在 `/static/` 下)  
> 示例见 `Common.Page_1` 页面
```javascript
/**
 * 封装图片 url
 * Images(imgList, bundleNames)
 * @param {Array} imgList - 图片名
 * @param {Array} bundleNames - 绑定图片别名
 * 使用 vue 计算属性调用图片
 * ...Images(['Logo', 'Logo_10x20', 'Logo_20x10'], ['logo_1', 'logo_2'])
 * @return {Object}
    {
      logo_1 () {
        return 'url'
      },
      logo_2 () {
        return 'url?width=10&height=20'
      },
      Logo_20x10 () {
        return 'url?width=20&height=10'
      }
    }
 */
```

# 模块内新增模块
> 思路：在 `/pages/module/page/` 下新建子模块目录，类比最外层模块封装，将子模块内容集成到 `/pages/module/` 下对应文件(api/router/store)即可。