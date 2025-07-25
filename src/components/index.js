// 把components中的所有组件进行全局化注册
// 通过插件的方式进行全局化注册
import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'
export const componentPlugin = {
  install(app) {
    //app.component('组件名', 组件配置对象)
    app.component('ImageView', ImageView)
    app.component('XtxSku', XtxSku)
  }
}
