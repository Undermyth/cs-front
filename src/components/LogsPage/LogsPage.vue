<template>
    <div class="column-page-wrapper">
        <div class="content">
            <div class="side">
                <div class="intro">
                    <h2>日志</h2>
                    <div class="line"></div>
                    <p>此处包含所有的实验记录，以及一个总日志。总日志中记录了所有的学术相关/不务正业的学习进展和思考感想</p>
                </div>
                <div class="searchbar">
                    <input type="text" placeholder="搜索日志..." v-model="filter_word">
                    <button @click="filter_logs">
                        <i class='bx bxs-search-alt-2' style='color:#ffffff'  ></i>
                        <p>搜索</p>
                    </button>
                </div>
                <NavBar></NavBar>
            </div>
            <div class="columns-list">
                <div class="column" v-for="(column, index) in articles" :key="index">
                    <LogCard class="column-card"
                        :id="column.id"
                        :title="column.title" 
                        :start_date="column.start_date"
                        :update_date="column.update_date"
                        :length="column.length"
                        :abstract="column.abstract">
                    </LogCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import NavBar from '../HomePage/NavBar.vue';
import LogCard from './LogCard.vue';

const articles = ref(null)
const filter_word = ref(null)

const filter_logs = async () => {
    const response = await axios.get('/get_logs', {
        params: {
            filter: filter_word.value,
        }   
    });
    console.log(response.data);
    articles.value = response.data;
}

onMounted(async () => {
    const response = await axios.get('/get_logs');
    articles.value = response.data;
})

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
/* .column { */
    /* box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3); */
/* } */
.column:hover {
    cursor: pointer;
}
.column:hover > h2 {
    color: rgba(26, 109, 243, 0.632);
}
</style>
