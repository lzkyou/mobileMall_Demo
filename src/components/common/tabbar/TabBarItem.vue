<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else ><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{//props获取传入的值
    path: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },
  data(){
    return{
      // isActive: true
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    }
  },
  computed:{
    isActive(){
      // /home -> item1(/home) == true == isActive
      // /home -> item1(/category) == false
      // /home -> item1(/cart) == false
      // /home -> item1(/profile) == false
      return this.$route.path.indexOf(this.path)!=-1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 3px 0;
  vertical-align: middle;
}
</style>