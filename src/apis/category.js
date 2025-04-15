// 老师说因为httpInstance是默认导出，可以换成其他名字
import httpInstance from "@/utils/http";
// import { id } from "element-plus/es/locale";

export function getCategoryAPI(id){
  return httpInstance({
    url: "/category",
    // method: "get", //默认get，可以不写
    params: {
      id
    }
  })
}

