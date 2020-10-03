<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/imgs/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props:{
    isChecked:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 20px;
    border: 1px solid #aaa;
  }
  .check{
    border-color: lightpink;
    background-color: lightpink;
  }
</style>