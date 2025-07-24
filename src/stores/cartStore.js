// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { addCartAPI, delCartAPI, getCartListAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);

    // 1. 定义state - cartList
    const cartList = ref([]);

    const updateCartList = async () => {
      const res = await getCartListAPI();
      cartList.value = res.result || []; //这是接口购物车直接覆盖
    };

    // 2. 定义action addCart
    const addCart = async (item) => {
      console.log(isLogin.value, item);

      if (isLogin.value) {
        const { skuId, count } = item;
        await addCartAPI({ skuId, count });
        updateCartList(); // 更新购物车列表
      } else {
        // 检查商品是否已存在
        const existingItem = cartList.value.find((cartItem) => cartItem.skuId === item.skuId);
        if (existingItem) {
          // 如果存在，增加数量，这里可能有点问题，但淘宝也这样
          existingItem.count += item.count;
        } else {
          // 如果不存在，添加新商品
          cartList.value.push(item);
        }
      }
    };

    // 删除购物车内商品
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId]);
        updateCartList(); // 更新购物车列表
      } else {
        // 方法1： splice
        const index = cartList.value.findIndex((item) => item.skuId === skuId);
        if (index !== -1) {
          cartList.value.splice(index, 1);
        }
        // 方法2： filter
        // cartList.value = cartList.value.filter(item => item.id !== skuId);
      }
    };

    // 清除购物车
    const clearCart = () => {
      cartList.value = []; // 清空购物车列表
      // 如果需要清除服务器端的购物车，可以调用相应的API
      if (isLogin.value) {
        // 调用清除购物车的API
        // clearCartAPI();
      }
    }

    // 计算属性
    // 1. 总数
    const totalCount = computed(() =>
      cartList.value.reduce((total, item) => total + item.count, 0)
    );
    // 2. 总价
    const totalPrice = computed(() =>
      cartList.value.reduce((total, item) => total + item.count * item.price, 0)
    );

    // 单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((cartItem) => cartItem.skuId === skuId);
      if (item) {
        item.selected = selected; // 更新选中状态
      }
    };

    // 全选
    const isAllSelected = computed(() => {
      return cartList.value.length > 0 && cartList.value.every((item) => item.selected);
    });
    const toggleAllSelection = (selected) => {
      cartList.value.forEach((item) => {
        item.selected = selected; // 更新每个商品的选中状态
      });
    };

    // 计算属性
    // 1. 已选中商品数量
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((total, item) => total + item.count, 0)
    );
    // 2. 已选中商品总价
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.count * item.price, 0)
    );

    return {
      cartList,
      addCart,
      delCart,
      clearCart,
      updateCartList,
      totalCount,
      totalPrice,
      singleCheck,
      isAllSelected,
      toggleAllSelection,
      selectedCount,
      selectedPrice,
    };
  },
  {
    persist: true, // 持久化存储
  }
);
