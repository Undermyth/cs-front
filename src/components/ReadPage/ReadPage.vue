<template>
    <div class="read-page-wrapper">
        <div class="content">
            <div class="read-board">
                <div class="text-content" v-html="blog_content"></div>
            </div>
            <div class="side">
                <div class="toc"></div>
                <NavBar></NavBar>
            </div>
        </div>
    </div>
</template>
<script setup>

import { ref, onMounted, defineProps } from 'vue'
import NavBar from '../HomePage/NavBar.vue'
import axios from 'axios'
import { marked } from 'marked'

const blog_content = ref(null)

const props = defineProps({
    article_id: {
        type: String,
        required: true,
    }
})

onMounted(async () => {
    const response = await axios.get('/get_article', {
        params: {
            article_id: props.article_id,
        }
    });
    console.log(response.data.content);
    blog_content.value = marked.parse(response.data.content);
})

</script>
<style scoped>
.read-page-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: transparent;
}

.content {
    display: flex;
    width: 80%;
    height: 80%;
}

.read-board {
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
