<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data(){
    return {
      message: '',
      isShow: false
    }
  },
  methods:{
    show(message,duration){
      this.isShow=true;
      this.message=message
      setTimeout(() => {
        this.isShow=false;
        this.message='';
      }, duration)
    }
  },
  props:{
    // message:{
    //   type: String,
    //   default: ''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 10px;
    background-color: rgba(0, 0, 0, .7);
    transform: translate(-50%,-50%);
    color: #fff;
    border-radius: 10px;
    z-index: 99;
  }
</style>