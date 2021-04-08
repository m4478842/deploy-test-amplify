import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Storage from 'vue-ls'
import store from './store'
import Antd from 'ant-design-vue'
import config from '@/defaultSetting'
import 'ant-design-vue/dist/antd.css'
import '@/permission'
import VueCookies from 'vue-cookies'
require('./mock');

Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$cookies = VueCookies

Vue.use(Antd)
Vue.use(Storage, config.storageOptions)
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
