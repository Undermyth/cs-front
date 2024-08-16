<template>
    <div class="column-page-wrapper">
        <div class="content">
            <div class="side">
                <div class="intro">
                    <h2>{{ title }}</h2>
                    <div class="addition-info">
                        <p>
                            <i class='bx bx-time-five' style='color:#ffffff'  ></i>
                            更新时间：{{ date }}
                        </p>
                        <p>
                            <i class='bx bx-book-open' style='color:#ffffff' ></i>
                            文章数量：{{ length }}
                        </p>
                    </div>
                    <div class="line"></div>
                    <p>{{ abstract }}</p>
                </div>
                <div class="searchbar">
                    <input type="text" placeholder="专栏内搜索..." v-model="filter_word">
                    <button @click="handleClick">
                        <i class='bx bxs-search-alt-2' style='color:#ffffff'  ></i>
                        <p>搜索</p>
                    </button>
                </div>
                <NavBar></NavBar>
            </div>
            <div class="columns-list">
                <div class="column" v-for="(column, index) in articles" :key="index">
                    <ArticleCard class="column-card"
                        :id="column.id"
                        :title="column.title" 
                        :date="column.date"
                        :length="column.length"
                        :abstract="column.abstract">
                    </ArticleCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, defineProps, onMounted } from 'vue';
import NavBar from '../HomePage/NavBar.vue';
import ArticleCard from './ArticleCard.vue';

const props = defineProps({
    column_id: {
        type: Number,
        required: true,
    }
})

const title = ref(null)
const date = ref(null)
const length = ref(null)
const abstract = ref(null)
const articles = ref(null)
const filter_word = ref(null)

onMounted(async () => {
    const response = await axios.get('/get_articles_in_column', {
        params: {
            column_id: props.column_id,
        }
    });
    const metadata = response.data.metadata;
    const article_list = response.data.articles;
    articles.value = article_list;
    title.value = metadata.title;
    date.value = metadata.date;
    length.value = metadata.length;
    abstract.value = metadata.abstract;
})

const handleClick = async () => {
    const response = await axios.get('/get_articles_in_column', {
        params: {
            column_id: props.column_id,
            filter: filter_word.value,
        }
    });
    const metadata = response.data.metadata;
    const article_list = response.data.articles;
    articles.value = article_list;
    title.value = metadata.title;
    date.value = metadata.date;
    length.value = metadata.length;
    abstract.value = metadata.abstract;
}
</script>
<style scoped>
.column-page-wrapper {
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
    gap: 50px;
    width: 60%;
    height: 80%;
    background-color: transparent;
}
.side {
    display: flex;
    flex-flow: column;
    gap: 10px;
    width: 25%;
    height: 100%;
    background-color: transparent;
}
.intro {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-flow: column;
    height: 40%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    color: white;
}
h2 {
    margin-bottom: 10px;
}
p {
    font-family: "LXGW WenKai", sans-serif;
}
.line {
    width: 95%;
    height: 1px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
}
.searchbar {
    padding-top: 5px;
    padding-bottom: 5px;
    gap: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 10%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    color: white;
}
input::placeholder {
    font-size: 16px;
    font-family: "LXGW WenKai", sans-serif;
    color: white;
}
input {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    outline: 0px;
    color: white;
    width: 60%;
    height: 80%;
    transition: all 0.5s;
    padding-left: 10px;
    font-family: "LXGW WenKai", sans-serif;
    font-size: 16px;
}
input:hover {
    border: 1px solid white;
}
button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 5px;
    width: 25%;
    height: 80%;
    color: white;
    gap: 5px;
    font-size: 16px;
    transition: all 0.5s;
}
button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
}
.columns-list {
    display: flex;
    flex-flow: column;
    gap: 20px;
    width: 70%;
    overflow-y: scroll;
    scrollbar-width: none;
}
</style>