<template>
    <div class="head-wrapper">
        <div class="title"><center><p>{{ props.title }}</p></center></div>
        <div class="line"></div>
        <div class="addition-info">
            <p>
                <i class='bx bx-pause-circle' style='color:rgba(0,0,0,0.5)' ></i>
                最近更新时间：{{ props.endtime }}
            </p>
            <p>
                <i class='bx bx-book-open' style='color:rgba(0,0,0,0.5)' ></i>
                记录数量：{{ props.length }}
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
    endtime: {
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
    height: 200px;
    display: flex;
    flex-flow: column;
    /* background-color: aliceblue; */
    align-items: center;
}
.title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60%;
    width: 80%;
    font-size: 35px;
    font-weight: 600;
    font-family: "LXGW WenKai", sans-serif;
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