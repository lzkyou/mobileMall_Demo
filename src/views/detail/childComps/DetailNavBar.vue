<template>
  <div>
    <nav-bar>
      <div slot="left" class="icon-back" @click="backClick">
        <img src="~assets/imgs/common/back.svg" />
      </div>
      <div slot="center" class="detail-title">
        <div
          class="d-title-item"
          :class="{ active: index === currentIndex }"
          v-for="(item, index) in titles"
          :key="index"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.detail-title {
  display: flex;
}
.d-title-item {
  flex: 1;
  font-size: 13;
}
.active {
  color: var(--color-high-text);
}
.icon-back img {
  margin-top: 13px;
}
</style>