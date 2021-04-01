import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Storage from 'vue-ls'
import store from './store'
import Antd from 'ant-design-vue'
import config from '@/defaultSetting'
import 'ant-design-vue/dist/antd.css'
import '@/permission'

Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.use(Antd)
Vue.use(Storage, config.storageOptions)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
