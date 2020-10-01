<template>
  <div class="goods">
    <good-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import GoodListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  components:{
    GoodListItem
  },
  props:{
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  padding: 0 3px;
}
</style>