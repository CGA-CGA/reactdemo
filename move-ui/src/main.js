// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入重置样式
import './assets/css/reset.css'


// 引入vuex
import store from './store/index.js'

//全局引入element-ui
import ElementUI from 'element-ui'
//引入elementUIcss样式
import 'element-ui/lib/theme-chalk/index.css'
//调用插件
Vue.use(ElementUI)

//给vue原型挂载一个服务器地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
