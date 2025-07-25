// //axios基础封装
// import axios from 'axios'

// // 创建axios实例，基地址和超时时间
// const httpInstance = axios.create({
//   baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
//   timeout: 5000
// })

// //以下内容来自axios官方文档，不是笔记
// // 添加请求拦截器
// httpInstance.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// httpInstance.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });


// export default httpInstance

//直接从笔记中复制过来
import axios from 'axios'

import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router';
import router from '@/router';

// 创建axios实例
//弹幕说文档是错的
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia中获取token
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  // 2. 如果有token，则携带token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({
    type: 'error',
    message: e.response?.data?.message || e.message || '请求失败'
  })
  // 401token失效处理，目前后端只在详情页检查token，进了详情页才会触发
  if (e.response.status === 401) {
    const userStore = useUserStore()
    userStore.logout() // 清除用户信息
    // 跳转到登录页面
    // useRouter()只支持在setup函数中使用，这里直接用router实例
    // const router = useRouter()
    // router.push('/login')
    router.push('/login')
  }
  return Promise.reject(e)
})


export default httpInstance
