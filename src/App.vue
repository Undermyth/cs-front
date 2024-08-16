<template>
  <div class="app">
    <div class="background"></div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('./assets/atri.png'), url('./assets/atri.jpg');
  background-size: cover;
  filter: brightness(0.95) contrast(0.9);
  z-index: -1;
}
/* .fade-leave-to {
  opacity: 0;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease-in-out;
} */
</style>
