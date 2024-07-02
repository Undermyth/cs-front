<template>
    <div class="column-page-wrapper">
        <div class="content">
            <div class="side">
                <div class="intro">
                    <h2>专栏</h2>
                    <div class="line"></div>
                    <p>包括一些比较具有专题性的论文阅读记录和读书记录。实际上大部分的东西都在这里</p>
                </div>
                <div class="searchbar">
                    <input type="text" placeholder="查找专栏...">
                    <button>
                        <i class='bx bxs-search-alt-2' style='color:#ffffff'  ></i>
                        <p>搜索</p>
                    </button>
                </div>
                <NavBar></NavBar>
            </div>
            <div class="columns-list">
                <div class="column" v-for="(column, index) in columns" :key="index">
                    <ColumnCard class="column-card"
                        :title="column.title" 
                        :date="column.date"
                        :length="column.length"
                        :abstract="column.abstract">
                    </ColumnCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import NavBar from '../HomePage/NavBar.vue';
import ColumnCard from './ColumnCard.vue';
export default {
    name: 'ColumnPage',
    components: { NavBar, ColumnCard },
    setup() {
        const columns = ref([
            {
                title: "专栏1",
                date: "2022-01-01",
                length: 3,
                abstract: "a column sentence"
            },
            {
                title: "专栏2",
                date: "2022-01-01",
                length: 10,
                abstract: "a column sentence that is very long"
            },
            {
                title: "专栏3",
                date: "2022-01-01",
                length: 10,
                abstract: "a column sentence that is very very long"
            },
            {
                title: "专栏4",
                date: "2022-03-01",
                length: 10,
                abstract: "a column sentence that is very very long http://zdbk.zju.edu.cn/jwglxt/xtgl/index_initMenu.html?jsdm=06&_t=1719875021984"
            },
            {
                title: "专栏5",
                date: "2022-01-01",
                length: 10,
                abstract: "a column sentence that is very very long"
            },
        ])

        return { columns }
    }
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
.column {
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3);
}
.column:hover {
    cursor: pointer;
}
.column:hover > h2 {
    color: rgba(26, 109, 243, 0.632);
}
</style>