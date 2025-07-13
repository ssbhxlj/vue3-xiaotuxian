// 封装购物车模块
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', ()=>{
  // 1. 定义state - cartList
  const cartList = ref([]);
  // 2. 定义action addCart
  const addCart = (item) => {
    // 检查商品是否已存在
    const existingItem = cartList.value.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // 如果存在，增加数量，这里可能有点问题，但淘宝也这样
      existingItem.count += item.count;
    } else {
      // 如果不存在，添加新商品
      cartList.value.push(item);
    }
  };

  return {
    cartList,
    addCart
  }
}, {
  persist: true // 持久化存储
})
