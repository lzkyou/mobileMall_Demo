<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners='banners'/>
    <home-recommend-view :recommends='recommends'/>
    <home-future-view/>
    <tab-control class="tab-control" :titles='["流行","新款","精选"]'/>
    <goods-list/>
    <ul>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
    </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/common/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFutureView from './childComps/HomeFutureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'


export default {
  name: 'Home',
  components:{
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommendView,
    HomeFutureView
  },
  data(){
    return{
      banners:[],
      recommends: [],
      //goods对象存放三种状态下的数据和状态
      goods:{
        'pop': { page: 0,list:[] },
        'new': { page: 0,list:[] },
        'sell': { page: 0,list:[] },
      }
    }
  },
  created(){
    //1、请求数据
    this.getHomeMultidata();
    //2.请求goods数据
    this.getHomeGoods('pop');//传入类型type
    this.getHomeGoods('new');//传入类型type
    this.getHomeGoods('sell');//传入类型type
  },
  methods:{
    getHomeMultidata(){
      getHomeMultidata().then(success=>{
      this.banners=success.data.banner.list;
      this.recommends=success.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1;//[type]=pop/new/sell
      getHomeGoods(type,page).then(success=>{
        this.goods[type].list.push(...success.data.list);//新拿到的数据push到原数组中
        this.goods[type].page+=1;
    })
    }
  }

}
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .tab-control{
    position: sticky;
    top: 44px;
  }
</style>