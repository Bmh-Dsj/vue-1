import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
import { VueJsonp } from 'vue-jsonp'    // 网上很多博客引用不加{}，会报错

Vue.use(VueJsonp)

//ECharts 图表
import VCharts from 'v-charts'
Vue.use(VCharts)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// import VePie from 'v-charts/lib/pie.common'
//
// Vue.component(VePie.name, VePie)
// import echarts from 'echarts'
//
// Vue.prototype.$echarts = echarts
// import VeLine from 'v-charts/lib/line.common'
//
// Vue.component(VeLine.name, VeLine)

Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'user') {
    // 创建一个StorageEvent事件
    let newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, newVal);
  }
}

//禁止左键选择
//document.onselectstart = function () { return false; }

// // 引入提示框和title组件，图例
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/legendScroll')//图例翻译滚动
//
// Vue.prototype.$echarts = echarts
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
