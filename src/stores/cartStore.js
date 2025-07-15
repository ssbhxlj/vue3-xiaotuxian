// 封装购物车模块
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', ()=>{
  // 1. 定义state - cartList
  const cartList = ref([]);
  // 2. 定义action addCart
  const addCart = (item) => {
    // 检查商品是否已存在
    const existingItem = cartList.value.find(cartItem => cartItem.skuId === item.skuId);
    if (existingItem) {
      // 如果存在，增加数量，这里可能有点问题，但淘宝也这样
      existingItem.count += item.count;
    } else {
      // 如果不存在，添加新商品
      cartList.value.push(item);
    }
  };

  // 删除购物车内商品
  const delCart = (skuId) => {
    // 方法1： splice
    const index = cartList.value.findIndex(item => item.skuId === skuId);
    if (index !== -1) {
      cartList.value.splice(index, 1);
    }
    // 方法2： filter
    // cartList.value = cartList.value.filter(item => item.id !== skuId);
  }

  return {
    cartList,
    addCart,
    delCart
  }
}, {
  persist: true // 持久化存储
})
