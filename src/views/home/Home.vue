<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"
        class="tabcontrol"
      />
    <scroll
      class="content"
      ref="scroll"
      :probetype="3"
      @scroll="contentScroll"
      :pullUpload="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <home-recommend-view :recommends="recommends" />
      <home-future-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/common/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFutureView from "./childComps/HomeFutureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils"
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommendView,
    HomeFutureView,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      //goods对象存放三种状态下的数据和状态
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    //1、请求数据
    this.getHomeMultidata(); //抽离到下方methods中
    //2.请求goods数据
    this.getHomeGoods("pop"); //传入类型type
    this.getHomeGoods("new"); //传入类型type
    this.getHomeGoods("sell"); //传入类型type
  },
  mounted(){
    //3、监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,200);
    this.$bus.$on('imgLoad', ()=>{
      refresh();
    })
  },
  activated(){
    //二次返回时回到离开时位置
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();
  },
  deactivated(){
    //保存离开时的位置
    this.saveY = this.$refs.scroll.scroll.y;
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    
    contentScroll(position) {
      //判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop-45;
    },
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.$refs.tabControl2.$el.offsetTop);
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    loadMore(){//上拉加载更多
      this.getHomeGoods(this.currentType);
    },
    //网络请求相关函数
    getHomeMultidata() {
      getHomeMultidata().then((success) => {
        this.banners = success.data.banner.list;
        this.recommends = success.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; //[type]=pop/new/sell
      getHomeGoods(type, page).then((success) => {
        this.goods[type].list.push(...success.data.list); //新拿到的数据push到原数组中
        this.goods[type].page += 1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* viewport-height 视口高度 */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
.tabcontrol{
  position: absolute;
  right: 0;
  left: 0;
  z-index: 99;
}
</style>