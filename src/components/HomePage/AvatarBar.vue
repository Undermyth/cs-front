<template>
    <div class="avatar-wrapper">
        <div class="pad"></div>
        <Avatar :size="128" src="https://s2.loli.net/2024/06/27/P9HVKweLqvRCJhb.jpg"></Avatar>
        <h1>chensy</h1>
        <div class="statistic">
            <StatisticalUtil title="文章数" :value="article_count"></StatisticalUtil>
            <StatisticalUtil title="专栏数" :value="column_count"></StatisticalUtil>
            <StatisticalUtil title="日志数" :value="log_count"></StatisticalUtil>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import StatisticalUtil from "./StatisticUtil.vue";

const article_count = ref(null)
const log_count = ref(null)
const column_count = ref(null)

onMounted(async () => {
    try {
        const article_respose = await axios.get('/get_num_of_articles');
        article_count.value = article_respose.data.article_counts;
    
        const log_response = await axios.get('/get_num_of_logs');
        log_count.value = log_response.data.log_counts;
    
        const column_response = await axios.get('/get_num_of_columns');
        column_count.value = column_response.data.column_counts;
    } 
    catch(error) {
        console.log("mounting error: ", error);
    }
})
</script>

<style scoped>
.avatar-wrapper {
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 35px;
    align-items: center;
    color: white;
    font-family: "LXGW WenKai", sans-serif;
}
.pad {
    height: 20px;
}
h1 {
    margin: 0;
    padding: 10px;
}
.statistic {
    display: flex;
    flex-flow: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>