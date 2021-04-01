import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GeneralConfig',
    component: Layout,
    children: [
      {
        path: '/',
        meta: {
          title: '通用配置'
        },
        component: () => import('@/views/generalConfig/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '用户登录'
    },
    component: () => import('@/views/login/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
