<template>
    <div class="column-page-wrapper">
        <div class="mobilebar"><MobileNav :width="50" :height="50"></MobileNav></div>
        <div class="content">
            <div class="side">
                <div class="intro">
                    <h2>博客</h2>
                    <div class="line"></div>
                    <p>此处包括有记录的所有文章，包括专栏和日志，以及一些未分类的文章</p>
                </div>
                <div class="searchbar">
                    <input type="text" placeholder="搜索文章..." v-model="filter_word">
                    <button @click="filter_articles">
                        <i class='bx bxs-search-alt-2' style='color:#ffffff'  ></i>
                        <p>搜索</p>
                    </button>
                </div>
                <div class="navbar">
                    <NavBar></NavBar>
                </div>
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import MobileNav from '../CoverPage/MobileNav.vue';
import NavBar from '../HomePage/NavBar.vue';
import ArticleCard from '../SingleColumn/ArticleCard.vue';

const articles = ref(null)
const filter_word = ref(null)

const filter_articles = async () => {
    console.log(filter_word.value);
    const response = await axios.get('/get_articles', {
        params: {
            filter: filter_word.value,
        }
    });
    console.log(response.data);
    articles.value = response.data;
}


onMounted(async () => {
    const response = await axios.get('/get_articles');
    articles.value = response.data;
    getMobileVh();
    window.addEventListener('resize', getMobileVh);
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', getMobileVh);
})

const getMobileVh = () => {

    if (window.innerWidth <= 768) {
        articles.value.map(article => {
            article.abstract = article.abstract.substring(0, 50) + '...';
        })
    }

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
</script>
<style scoped>
.column-page-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    background-color: transparent;
}
.mobilebar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color: transparent;
    display: none;
    /* background-color: rgba(0, 0, 0, 0.1) !important; */
    /* backdrop-filter: blur(5px) !important; */
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
    height: 30%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    color: white;
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
    height: 55px;
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

@media screen and (max-width: 1440px) {
    .content {
        width: 80%;
    }
}
@media screen and (max-width: 1024px) {
    .content {
        width: 90%;
    }
}
@media screen and (max-width: 768px) {
    p, input::placeholder, button {
        font-size: 14px;
    }
    button p {
        display: none;
    }
    .searchbar {
        border-radius: 10px;
    }
    ::v-deep .columns-list p {
        font-size: 14px;
    }
}

@media screen and (max-width: 425px) {
    p, input::placeholder, button {
        font-size: 16px;
    }
    ::v-deep .columns-list p {
        font-size: 16px;
    }
    .content {
        flex-flow: column;
        overflow-y: scroll;
        align-items: center;
    }
    .navbar {
        display: none;
    }
    .side {
        width: 80%;
        height: auto;
        align-items: center;
    }
    .intro {
        height: auto;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .line {
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .searchbar {
        width: 100%;
        height: 50px;
    }
    .columns-list {
        margin-top: 10px;
        height: auto;
        width: 100%;
    }
    ::v-deep .addition-info {
        display: none;
    }
    .mobilebar {
        display: block;
    }
    .column-page-wrapper {
        justify-content: flex-start;
    }
    .content {
        gap: 20px;
        height: 90%;
    }
}
</style>
