<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" @load='imgLoad'>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GoodsListItem',
  props:{
    goodsItem:{
      type: Object,
      default(){
        return[]
      }
    }
  },
  methods:{
    imgLoad(){
      this.$bus.$emit('imgLoad');//利用事件总线【Vue.prototype.$bus=new Vue()】发送图片加载完成事件imgLoad到Home.vue中，从而调用scroll.refresh()
    },
    itemClick(){
      this.$router.push('/detail/'+ this.goodsItem.iid);
    }
  }
}
</script>

<style scoped>
.goods-item{
  width: 48%;
}
.goods-item img{
  width: 100%;
  border-radius: 6px;
}
.goods-info{
  font-size: 12px;
  text-align: center;
}
.goods-info p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods-info span{
  line-height: 20px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
  position: relative;
  z-index: -1;
}
.goods-info .collect::before{
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/imgs/common/collect.svg") 0 0/14px 14px;
}
</style>