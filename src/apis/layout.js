import httpInstance from "@/utils/http";

export function getCategoryAPI(){
  return httpInstance({
    // 这个url需要和后端对接
    url: 'home/category/head',
  })
}
