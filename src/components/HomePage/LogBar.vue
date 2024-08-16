<template>
    <div class="log-wrapper">
        <h2>进程</h2>
        <div class="line"></div>
        <div id="progress">
            <Timeline :timeline-data="progress"></Timeline>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const progress = ref([
    {
        desc: '2024-08-14 后端基本完成',
        color: 'rgb(166, 227, 161)',
    },
    {
        desc: '2024-08-15 heatmap 完成',
        color: 'rgb(166, 227, 161)',
    },
    {
        desc: '...',
        color: 'rgb(166, 227, 161)'
    },
])
</script>
<style scoped>
h2 {
    margin: 0;
}
.log-wrapper {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 35px;
    color: white;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
#progress {
    overflow-y: scroll;
    font-family: "LXGW WenKai", sans-serif;
}

#progress::-webkit-scrollbar {
    display: none;
}
.line {
    width: 95%;
    height: 1px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>