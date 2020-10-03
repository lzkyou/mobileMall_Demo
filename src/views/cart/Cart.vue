<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar"

import { mapGetters } from "vuex";

export default {
  name: 'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //数组语法
    ...mapGetters([
      'cartLength',
      'cartList'
    ])
    // ...mapGetters({
    //   length: 'cartLength', //key: ref value 对象语法
    //   list: 'cartList'
    // })
  }
}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-size: 19px;
    position: relative;
    z-index: 9;
  }  
</style>