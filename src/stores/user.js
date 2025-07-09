// 管理用户数据
import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({});
  // 2. 定义获取用户数据的action
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password });
  };
  // 3. 以对象的形式返回state和action
  return { userInfo, getUserInfo };
});
