<template>
  <div class="app">
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
.app {
  background-image: url('./assets/atri.png');
  background-size: 100%;
  filter: brightness(0.85) contrast(0.9);
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
