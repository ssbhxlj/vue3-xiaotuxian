// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import './styles/common.scss'

import { useIntersectionObserver } from '@vueuse/core'


// // //测试接口函数
// import { getCategory } from './apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//定义全局指令
app.directive('img-lazy', {
  //el:指令绑定的元素，这里是img
  //binding:指令对象，.value是指令v-img-lazy=后面表达式的值，这里是图片url
  mounted(el, binding) {
    console.log(el, binding.value);
    //useIntersectionObserver用于监听元素是否在视口内，第一个参数是监听的元素，第二个参数是回调函数
    useIntersectionObserver(
      el,
      ([{isIntersecting}]) => {
        console.log(isIntersecting);
        if(isIntersecting){
          //进入视口区域，就设置图片的src属性为binding.value
          el.src = binding.value
        }
      },
    )
  }
})
