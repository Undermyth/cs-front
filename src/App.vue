<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style scoped>
.app {
  background-image: url('./assets/atri.png');
  background-size: 100%;
  filter: brightness(0.85) contrast(0.9);
}
</style>
