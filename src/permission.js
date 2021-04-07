import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style=
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import {notification} from 'ant-design-vue'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  NProgress.start() // start progress bar
  if (to.path!=='/login') {
    if (!Vue.ls.get(ACCESS_TOKEN)) {
      notification.warning({ message: '系统提示', description: '当前登录已失效，请重新登录',duration: 4})
      next({path: '/login'})
      NProgress.done()
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
