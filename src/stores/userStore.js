// 管理用户数据
import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "./cartStore";
export const useUserStore = defineStore(
  "user",
  () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({});
    // 2. 定义获取用户数据的action
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    // 定义退出登录的action
    const logout = () => {
      userInfo.value = {}; // 清空用户信息
      // pinia的持久化插件会自动清除存储的用户信息。如果不用插件
      // localStorage.removeItem('user'); // 清除pinia的持久化存储
      // 执行清除购物车的action
      const cartStore = useCartStore();
      cartStore.clearCart(); // 清除购物车
    };

    // 3. 以对象的形式返回state和action
    return { userInfo, getUserInfo, logout };
  },
  {
    persist: true, // 使用pinia-plugin-persistedstate插件进行持久化存储
  },
  // 如果需要使用Cookies进行持久化存储，可以使用以下配置
  // 注意：需要安装js-cookie库
  // {
  //   persist: {
  //     storage: {
  //       getItem: (key) => {
  //         return Cookies.get(key);
  //       },
  //       setItem: (key, value) => {
  //         Cookies.set(key, value, { expires: 7 }); // 设置过期时间为7天
  //       },
  //       removeItem: (key) => {
  //         Cookies.remove(key);
  //       }
  //     },
  //     serializer: {
  //       serialize: JSON.stringify,
  //       deserialize: JSON.parse
  //     }
  //   }
  // },
  // 存sessionStorage
  // {
  //   persist: {
  //     storage: sessionStorage, // 使用 sessionStorage 而不是 localStorage
  //   }
  // }
);
