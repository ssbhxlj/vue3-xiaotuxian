// 封装所有和用户相关的的接口函数
import httpInstance from '@/utils/http'

export const loginAPI= ({account, password})=>{
  return httpInstance({
    url: '/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}
