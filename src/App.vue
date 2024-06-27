<template>
  <div class="app">
    <full-page :options="options">
      <div class="section"><CoverPage></CoverPage></div>
      <div class="section"><HomePage></HomePage></div>
    </full-page>
  </div>
</template>

<script>
import CoverPage from './components/CoverPage/CoverPage.vue';
import HomePage from './components/HomePage/HomePage.vue';

export default {
  name: 'App',
  components: {
    CoverPage,
    HomePage,
  },
  setup() {
    let options = {
      scrollBar: false,
      scrollingSpeed: 1200,
    }

    return {options}
  }
}
</script>

<style scoped>
.app {
  background-image: url('./assets/atri.png');
  background-size: 100%;
  filter: brightness(0.85) contrast(0.9);
}
</style>
