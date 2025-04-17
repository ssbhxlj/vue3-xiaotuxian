// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import './styles/common.scss'

// // //测试接口函数
// import { getCategory } from './apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })
//引入懒加载插件
import { lazyPlugin } from './directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
//使用懒加载插件
app.use(lazyPlugin)
//引入全局化注册的组件
import { componentPlugin } from './components'
app.use(componentPlugin)

app.mount('#app')


