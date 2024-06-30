<template>
    <div class="cover-wrapper">
        <div class="navbar"><HorizonNav></HorizonNav></div>
        <div class="content">
            <p id="typing"></p>
        </div>
    </div>
</template>

<script>
import TypeIt from "typeit";
import { onMounted, ref } from "vue";
import HorizonNav from "./HorizonNav.vue";
export default {
    name: "CoverPage",
    components: {HorizonNav},
    setup() {
        const sentences = ref([
            "人生天地间，忽如远行客。",
            "迷子でもいい、迷子でも進め。"
        ]);

        const selectSentence = () => {
            return sentences.value[Math.floor(Math.random() * sentences.value.length)];
        }

        onMounted(() => {
            new (TypeIt)("#typing", {
                strings: selectSentence(),
                speed: 100,
                waitUntilVisible: true,
            }).go();
        });
        return {sentences}
    }
}
</script>

<style scoped>
.cover-wrapper {
    display: flex;
    flex-flow: column;
    height: 100vh;
    width: 100%;
    background-color: transparent;
}
h1 {
    margin: 0%;
}
.navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 8%;
    padding-left: 20px;
    background-color: transparent
}
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
    background-color: transparent;
}
#typing {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 10px;
    font-size: 25px;
    color: white;
    font-weight: 300;
}
</style>