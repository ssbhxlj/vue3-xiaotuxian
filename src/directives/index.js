import { useIntersectionObserver } from '@vueuse/core'


//定义懒加载插件
export const lazyPlugin = {
  install(app){
    //懒加载指令逻辑
    app.directive('img-lazy', {
      //el:指令绑定的元素，这里是img
      //binding:指令对象，.value是指令v-img-lazy=后面表达式的值，这里是图片url
      mounted(el, binding) {
        console.log(el, binding.value);
        //useIntersectionObserver用于监听元素是否在视口内，第一个参数是监听的元素，第二个参数是回调函数
        const {stop} = useIntersectionObserver(
          el,
          ([{isIntersecting}]) => {
            console.log(isIntersecting);
            if(isIntersecting){
              //进入视口区域，就设置图片的src属性为binding.value
              el.src = binding.value
              //停止监听
              stop()
            }
          },
        )
      }
    })
  }
}
