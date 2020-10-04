<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pullUpload="true">
      <!-- <div>{{goods}}</div> -->
      <detail-swiper :topImgs="topImgs"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImgLoad="detailImgLoad"/>
      <detail-param-info ref="param" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"
import Toast from 'components/common/toast/Toast'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
import { backTopMixin } from "common/mixin"
import { debounce } from "common/utils"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      currentIndex: 0,
      message:'156165',
      show: false
    };
  },
  methods:{
    detailImgLoad(){
      const refresh = debounce(this.$refs.scroll.refresh,200);
      refresh();
      this.themeTopY=[];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.param.$el.offsetTop-44);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopY.push(this.$refs.recommends.$el.offsetTop-44);
      this.themeTopY.push(Number.MAX_VALUE);
      console.log(this.themeTopY);
      // console.log('refresh');
    },
    titleClick(index){
      // console.log('111');
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100);
    },
    contentScroll(position){
      const contentY=-position.y;
      let length= this.themeTopY.length
      for(let i=0; i<length-1; i++){
        if(this.currentIndex != i && (contentY >= this.themeTopY[i] && contentY < this.themeTopY[i+1])){
          this.currentIndex=i;
          this.$refs.nav.currentIndex=this.currentIndex;
        }
        // if(this.currentIndex !== i && ((i<length-1 && contentY >= this.themeTopY[i] && contentY < this.themeTopY[i+1]) || (i === length-1 && contentY >= this.themeTopY[i]))){
        //   this.currentIndex=i;
        //   this.$refs.nav.currentIndex=this.currentIndex;
        // }
        this.isShowBackTop = contentY > 1000;//是否显示回到顶部
      }
    },
    addToCart(){
      //1.获取购物车需要的信息
      const product ={}
      product.iid=this.iid;
      product.img=this.topImgs[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;

      this.$store.dispatch('addCart',product).then(res=>{
        // this.show=true;
        // this.message=res;
        // setTimeout(() => {
        //   this.show=false;
        //   this.message='';
        // }, 1500);

        this.$toast.show(res,5000);
        console.log(this.$toast);
      })
    }
  },
  created() {
    this.iid = this.$route.params.iid;
    //根据iid请求轮播图片
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImgs = data.itemInfo.topImages;
      
      //面向对象，再由对象返回值传递给子组件
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      
      //店铺信息
      this.shop = new Shop(data.shopInfo);
      
      //商品详情信息
      this.detailInfo = data.detailInfo;

      //商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend(this.iid).then((res)=>{
      this.recommends=res.data.list
    })
    //给offsetTop赋值
    // this.getThemeTopY=debounce(()=>{

    // })
    
  }
};
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 120px);
  }
</style>