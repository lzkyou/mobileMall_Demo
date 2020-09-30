<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeRecommendView',
  props:{
    recommends:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    padding: 15px 0 20px;
    border-bottom: 8px solid #e9e9e9;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
  }
</style>