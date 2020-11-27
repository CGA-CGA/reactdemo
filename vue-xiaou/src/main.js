// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 全局引入reset.css和public.css
import './assets/css/reset.css'
import './assets/css/public.css'

// 全局引入remScale.js
import './assets/js/remScale.js'
// 引入swiper
import '../node_modules/swiper/css/swiper.min.css'
import '../node_modules/swiper/js/swiper.min'

// 引入全局组件
import comCommon from './common'
for (let key in comCommon) {
  Vue.component(key, comCommon[key])

}

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login'||to.path=='/register') {
    next();
    return;
  }
  if (sessionStorage.getItem('userInfo')) {
    next();
    return;
  }
  next('/login')
})
Vue.prototype.$imgUrl = 'http://localhost:3000/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
