// 请求响应相关
import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'
import {notification} from 'ant-design-vue'
import { ACCESS_TOKEN } from "@/store/mutation-types"

// 创建 axios 实例
const service = axios.create({
  //baseURL: '/local', // 本地
  baseURL: 'https://18.167.144.15', // 线上
  timeout: 9000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    let data = error.response.data
    switch (error.response.status) {
      case 401:
        notification.error({ message: '系统提示', description: '拒绝访问',duration: 4})
        break
      case 400:
        notification.error({ message: '系统提示', description: '参数错误',duration: 4})
        break
      case 403:
          notification.error({ message: '系统提示', description:'当前登录已失效，请重新登录',duration: 4})
          Vue.ls.remove(ACCESS_TOKEN)
          window.location.reload()
        break
      case 404:
          notification.error({ message: '系统提示', description:'很抱歉，资源未找到!',duration: 4})
        break
      case 500:
        notification.error({ message: '系统提示', description:'系统错误',duration: 4})
        break
      default:
        notification.error({
          message: '系统提示',
          description: data.msg,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers[ 'X-Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  config.headers[ 'Access-Control-Allow-Origin' ] = 'https://18.167.144.15'
  config.headers[ 'Access-Control-Allow-Credentials' ] = 'true'
  config.headers[ 'Access-Control-Max-Age' ] = '1800'
  config.headers[ 'Access-Control-Allow-Methods' ] = 'GET,POST,PUT,DETELE'
  config.headers[ 'Access-Control-Allow-Headers' ] = 'x-requested-with,content-type'
 
  if(config.method=='get'){
    if(config.url.indexOf("sys/dict/getDictItems")<0){
      config.params = {
        _t: Date.parse(new Date())/1000,
        ...config.params
      }
    }
  }
  return config
},(error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
    return response.data
  }, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}