// 封装购物车模块
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

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

  // 计算属性
  // 1. 总数
  const totalCount = computed(()=> cartList.value.reduce((total, item) => total + item.count, 0));
  // 2. 总价
  const totalPrice = computed(()=> cartList.value.reduce((total, item) => total + item.count * item.price, 0));

  // 单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find(cartItem => cartItem.skuId === skuId);
    if (item) {
      item.selected = selected; // 更新选中状态
    }
  };

  // 全选
  const isAllSelected = computed(() => {
    return cartList.value.length > 0 && cartList.value.every(item => item.selected);
  });
  const toggleAllSelection = (selected) => {
    cartList.value.forEach(item => {
      item.selected = selected; // 更新每个商品的选中状态
    });
  };

  return {
    cartList,
    addCart,
    delCart,
    totalCount,
    totalPrice,
    singleCheck,
    isAllSelected,
    toggleAllSelection
  }
}, {
  persist: true // 持久化存储
})
