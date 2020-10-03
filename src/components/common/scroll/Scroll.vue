<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import bscroll from "better-scroll";
export default {
  name: 'Scroll',
  props:{
    probetype:{
      type: Number,
      default: 0
    },
    pullUpload:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll: null
    }
  },
  mounted(){
    this.scroll=new bscroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probetype,
      pullUpLoad: this.pullUpload
    })
    //监听滚动位置
    this.scroll.on('scroll',(position)=>{
      this.$emit("scroll",position);
    })
    //监听上拉事件
    this.scroll.on('pullingUp',()=>{
      this.$emit("pullingUp");
    })
  },
  methods:{
    scrollTo(x,y,time=600){
      this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    refresh(){
      // console.log('refresh');
      this.scroll && this.scroll.refresh();
    }
  }
}
</script>

<style scoped>

</style>