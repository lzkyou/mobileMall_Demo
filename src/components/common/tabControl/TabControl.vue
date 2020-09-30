<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles" :key="index"
      :class="{ active: index === currentIndex }"
      @click='itemclick(index)'
    >
      <!-- 通过从数组中获取的item 决定有多少项 -->
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods:{
    itemclick(index){
      this.currentIndex=index;
    }
  }
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 45px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span{
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>