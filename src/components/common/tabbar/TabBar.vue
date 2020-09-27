<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f1f1f1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -1px 3px rgba(71, 71, 71, 0.2);
  }
</style>