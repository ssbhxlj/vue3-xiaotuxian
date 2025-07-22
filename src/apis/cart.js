import httpInstance from "@/utils/http"

// 购物车相关接口

// 加入购物车
export const addCartAPI = ({skuId, count})=>{
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data:{
      skuId,
      count
    }
  })
}

// 获取购物车列表
export const getCartListAPI = ()=>{
  return httpInstance({
    url: '/member/cart',
    method: 'GET', // 默认的，这里路径一样区分一下
  })
}
