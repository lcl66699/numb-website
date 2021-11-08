/*
 * @Author: lcl
 * @Description: 封装请求模块
 */

import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'



axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service = axios.create({
  baseURL: '', // url = base url + request url
  timeout: 1000 * 20, // 响应时间
  // transformRequest: [function (data) {
  //   return qs.stringify(data)
  // }]
})
service.interceptors.request.use((config) => {
  config.url = config.baseURL + config.url
  if (sessionStorage.getItem('token')) {
    config.headers["Authorization"] = sessionStorage.getItem('token');
  }
  return config
},
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { status, config, data } = response
    // 返回所有响应字段
    if (config.noFilter) {
      return response
    }

    // 无需验证。直接返回data字段
    if (config.noValidate) {
      return data
    }

    if (status !== 200) { // 200
      Message({
        type: 'error',
        message: data.statusText || '请求异常',
        duration: 2 * 1000
      })
      return Promise.reject(new Error(data.status || 'Error'))
    } else {
      return data
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权或帐号密码错误，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    console.warn(error.message)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
