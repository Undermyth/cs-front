<template>
    <div class="recent-wrapper">
        <h2>最近更新</h2>
        <div class="line"></div>
        <div class="blog-list">
            <div v-for="(article, index) in articles" :key="index">
                <ShortCard
                    :id="article.id"
                    :title="article.title" 
                    :date="article.date"
                    :length="article.length"
                    :abstract="article.abstract">
                </ShortCard >
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ShortCard from './ShortCard.vue';

const articles = ref(null)

onMounted(async () => {
    const response = await axios.get('/get_articles');
    articles.value = sortByDateDescending(response.data);
})

const sortByDateDescending = (array) => {
    return array.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // 降序排列
    });
}

</script>
<style scoped>
h2 {
    margin: 0;
}
.recent-wrapper {
    padding-left: 20px;
    padding-top: 20px;
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 35px;
    color: white;
}
.line {
    width: 95%;
    height: 1px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
}

.blog-list {
    display: flex;
    gap: 10px;
    overflow-x: scroll;
    scrollbar-width: none;
}

p {
    font-family: "LXGW WenKai", sans-serif;
}
</style>