<template>
    <div class="head-wrapper">
        <div class="title"><center><p>{{ props.title }}</p></center></div>
        <div class="line"></div>
        <div class="addition-info">
            <p>
                <i class='bx bx-pause-circle' style='color:rgba(0,0,0,0.5)' ></i>
                最近更新时间：{{ props.time }}
            </p>
            <p>
                <i class='bx bx-book-open' style='color:rgba(0,0,0,0.5)' ></i>
                长度：{{ props.length }} 词
            </p>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    length: {
        type: String,
        required: true,
    }
})
</script>
<style scoped>
.head-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-flow: column;
    /* background-color: aliceblue; */
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
}
.title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 80%;
    font-size: 35px;
    font-weight: 600;
    font-family: "LXGW WenKai", sans-serif;
    margin-top: 20px;
    margin-bottom: 20px;
}

.line {
    width: 90%;
    height: 1px;
    background-color: black;
    margin-bottom: 10px;
}

.addition-info {
    display: flex;
    flex-flow: row;
    justify-content: center;
    gap: 20px;
    width: 100%;
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.5);
    font-family: "LXGW WenKai", sans-serif;
}
</style>