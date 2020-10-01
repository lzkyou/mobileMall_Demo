<template>
  <div class="back-top">
    <img src="~assets/imgs/common/top.png">
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    z-index: 99;
    right: 8px;
    bottom: 55px;
  }
  .back-top img{
    width: 40px;
    height: 40px;
  }
</style>