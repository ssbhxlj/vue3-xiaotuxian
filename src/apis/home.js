import httpInstance from "@/utils/http"

//获取banner接口

export function getBannerAPI(params={}){
  //广告（banner）区域展示位置，1为首页，2为分类页，默认为1
  const { distributionSite = '1' } = params
  return httpInstance({
    url:'/home/banner',
    params:{
      distributionSite
    }
    //这个method是copilot自动补全的，不知为何，有时加了会报错
    // method:'get'
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url:'/home/new'
  })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () =>{
  return httpInstance({
    url:'/home/hot'
  })
}
// export const getHotAPI = () => {
//   return  httpInstance('home/hot', 'get', {})
// }

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}


// export{getBannerAPI}
