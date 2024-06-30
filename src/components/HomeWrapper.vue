<template>
    <div class="home-wrapper">
        <full-page :options="options">
            <div class="section"><CoverPage></CoverPage></div>
            <div class="section"><HomePage></HomePage></div>
        </full-page>
    </div>
</template>
<script>
import CoverPage from './CoverPage/CoverPage.vue';
import HomePage from './HomePage/HomePage.vue';
export default {
    name: 'HomeWrapper',
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
.home-wrapper {
  background-color: transparent;
}
</style>