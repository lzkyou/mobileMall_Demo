<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners='banners'/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import {getHomeMultidata} from 'network/home'


export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper
  },
  data(){
    return{
      banners:[],
      recommends: []
    }
  },
  created(){
    //1、请求数据
    getHomeMultidata().then(success=>{
      this.banners=success.data.banner.list;
      this.recommends=success.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
</style>