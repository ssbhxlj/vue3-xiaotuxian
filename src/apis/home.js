import httpInstance from "@/utils/http"

//获取banner接口

function getBannerAPI(){
  return httpInstance({
    url:'/home/banner',
    //这个method是copilot自动补全的
    // method:'get'
  })
}

export{getBannerAPI}
