// 登录登出相关
import { axios } from '@/utils/request'

/**
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/public/login',
    method: 'post',
    data: parameter
  })
}

export function logout(logoutToken) {
  return axios({
    url: '/sys/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Access-Token':  logoutToken
    }
  })
}