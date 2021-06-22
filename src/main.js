import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//es6的promise兼容
import promise from 'es6-promise'
promise.polyfill()
//引入mvi
import mvi from "mvi-web"
Vue.use(mvi)
//引入ruax和api接口
import ruax from "./ruax"
import api from "./ruax/api"
Vue.prototype.$ruax = ruax
Vue.prototype.$api = api
//config全局
import config from "./assets/js/config"
Vue.prototype.$config = config

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
