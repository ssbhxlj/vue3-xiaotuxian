<script setup>
// import { getCategoryAPI } from '@/apis/category';
// import { getBannerAPI } from '@/apis/home';
// import { onMounted, ref } from 'vue';
// import { useRoute } from 'vue-router';
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
// import { onBeforeRouteUpdate } from 'vue-router';

import { useCategory } from './composables/useCategory';
import { useBanner } from './composables/useBanner';

//获取分类数据
// 已经封装到useCategory.js里面了
// const categoryData = ref({});//后端传的就是对象

// const route = useRoute();

// //为了使getCategory(to.params.id)能够工作，需要传参id，默认为初始值route.params.id
// const getCategory = async (id=route.params.id) => {
//   // const res = await getCategoryAPI(route.params.id);
//   const res = await getCategoryAPI(id);
//   categoryData.value = res.result;
//   console.log(res.result);
// };

// onMounted(() => {
//   getCategory();
// });

// //目标：路由参数变化的时候，可以吧分类数据接口重新发送
// onBeforeRouteUpdate((to)=>{
//   // console.log('路由参数变化了');
//   //to是新的路由对象,to.params.id是新的路由参数
//   console.log(to);
//   getCategory(to.params.id);
// })
const { categoryData } = useCategory();

//获取banner，直接复制HomeBanner.vue里面的代码
// 这段代码已经封装到了useBanner.js里面了
// const bannerList = ref([])
// const getBanner = async () => {
//   const res = await getBannerAPI({
//     distributionSite: '2',
//   })
//   console.log(res);
//   bannerList.value = res.result

// }
// onMounted(() => {
//   getBanner()
// })
const { bannerList } = useBanner();


</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图，直接复制HomeBanner.vue里面的代码 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 分类列表渲染 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <!-- <RouterLink to="/"> -->
            <RouterLink :to="`/category/sub/${i.id}`">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }


}

.home-banner {
  width: 1240px;
  height: 500px;
  //不注释掉绝对定位会有溢出
  // position: absolute;
  // left: 0;
  // top: 0;
  // z-index: 98;
  //让轮播图居中
  margin: 0 auto;


  img {
    width: 100%;
    height: 500px;
  }
}
</style>
