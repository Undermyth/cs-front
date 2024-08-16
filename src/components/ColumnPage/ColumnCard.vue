<template>
    <div class="column-card-container" @click="handleClick">
        <h2>{{ title }}</h2>
        <div class="addition-info">
            <p>
                <i class='bx bx-time-five' style='color:rgba(0,0,0,0.5)'  ></i>
                最近更新：{{ date }}
            </p>
            <p>
                <i class='bx bx-book-open' style='color:rgba(0,0,0,0.5)' ></i>
                内容篇数：{{ length }}
            </p>
        </div>
        <div class="line"></div>
        <div class="abstract">{{ abstract }}</div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    length: {
        type: String,
        required: true,
    },
    abstract: {
        type: String,
        required: true,
    }
})

const router = useRouter()

const handleClick = () => {
    const url = '/column/' + props.id;
    router.push(url);
}
</script>
<style scoped>
.column-card-container {
    padding-top: 30px;
    padding-left: 30px;
    display: flex;
    flex-flow: column;
    flex: 1;
    flex-shrink: 0;
    width: 100%;
    height: 180px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}
.column-card-container:hover {
    transform: translateY(-10px);
    cursor: pointer;
}
h2 {
    color: black;
    transition: all 0.3s ease;
}
h2:hover {
    color: var(--ctp-latte-pink);
}
.addition-info {
    display: flex;
    flex-flow: row;
    gap: 20px;
    width: 100%;
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.5);
    font-family: "LXGW WenKai", sans-serif;
}

.line {
    width: 95%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.5);
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>