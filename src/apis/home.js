import httpInstance from "@/utils/http"

//获取banner接口

export function getBannerAPI(){
  return httpInstance({
    url:'/home/banner',
    //这个method是copilot自动补全的
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

// export{getBannerAPI}
