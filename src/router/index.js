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
    path: '/specialConfig',
    name: 'SpecialConfig',
    component: Layout,
    children: [
      {
        path: '/specialConfig',
        meta: {
          title: '特例配置'
        },
        component: () => import('@/views/specialConfig/index')
      }
    ]
  },
  {
    path: '/exchangeRateConfig',
    name: 'ExchangeRateConfig',
    component: Layout,
    children: [
      {
        path: '/exchangeRateConfig',
        meta: {
          title: '汇率深度'
        },
        component: () => import('@/views/exchangeRateConfig/index')
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
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})

export default router
