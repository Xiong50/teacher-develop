import axios from 'axios'
import { ElNotification } from 'element-plus'
import router from '@/router/index.js'

// 创建一个axios实例
const request = axios.create({
  // 根据不同的环境设置baseURL，最终发送请求时的URL为: baseURL + 发送请求时写的URL
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // 允许携带cookie
  timeout: 20000 // 请求超时, 20秒
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // console.log('config', config)
    // 在发送请求之前做些什么，未登录、登录失效等处理
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // console.log(response)
    const res = response.data
    // 200是自定义的状态码，根据实际情况定义
    if (res.code !== 200) {
      if (res.code === -1) {
        ElNotification({
          message: '登录超时，请重新登录！',
          type: 'error',
          duration: 5 * 1000
        })
        // 跳转到登录页面
        router.push({ path: '/login' })
      } else {
        ElNotification({
          message: res.detail || res.msg || '系统无法使用，请联系管理员！',
          type: 'error',
          duration: 5 * 1000
        })
      }
      // 此处还可以写一些其他的逻辑处理
      return Promise.reject(new Error(res.detail || res.msg))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    ElNotification({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
