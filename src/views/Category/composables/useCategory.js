// 封装分类数据业务相关代码
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getCategoryAPI } from '@/apis/category.js';
import { onBeforeRouteUpdate } from 'vue-router';

export function useCategory() {
  //直接复制原先index.vue里面的代码
  const categoryData = ref({});//后端传的就是对象

  const route = useRoute();

  //为了使getCategory(to.params.id)能够工作，需要传参id，默认为初始值route.params.id
  const getCategory = async (id = route.params.id) => {
    // const res = await getCategoryAPI(route.params.id);
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
    console.log(res.result);
  };

  onMounted(() => {
    getCategory();
  });

  //目标：路由参数变化的时候，可以吧分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // console.log('路由参数变化了');
    //to是新的路由对象,to.params.id是新的路由参数
    // console.log(to);
    getCategory(to.params.id);
  })

  return {
    categoryData,
    getCategory,
  };
}
