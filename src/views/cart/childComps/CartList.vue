<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :pullUpload="true">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";
import { debounce } from "common/utils"


export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated(){
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  height: calc(100% - 140px);
  overflow: hidden;
}
</style>