//封装banner轮播图相关的业务代码
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home.js'

export function useBanner() {
  //获取banner，直接复制原先index.vue里面的代码
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2',
    })
    // console.log(res);
    bannerList.value = res.result

  }
  onMounted(() => {
    getBanner()
  })

  return {
    bannerList,
    getBanner
  }
}
