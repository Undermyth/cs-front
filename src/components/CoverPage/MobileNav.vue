<template>
    <button :style="{
            width: props.width + 'px',
            height: props.height + 'px',
            opacity: 1 - opened,
        }"
        @click="openDrawer">
        <i class='bx bx-menu' style='color:#ffffff'></i>
    </button>
    <Drawer v-model:open="opened" 
        title="导航"
        :placement="'left'"
        :header-style="{
            color: 'white',

        }">
        <template #extra>
            <button :style="{ width: props.width + 'px', height: props.height + 'px'}"
            @click="closeDrawer">
            <i class='bx bx-arrow-back' style='color:#ffffff'  ></i>
        </button>
        </template>
        <div class="nav-item">
            <div class="blank"></div>
            <i class='bx bxs-home-alt-2' style='color:#ffffff'  ></i>
            <div class="blank"></div>
            <router-link to="/">主页</router-link>
        </div>
        <div class="nav-item">
            <div class="blank"></div>
            <i class='bx bx-pencil' style='color:#ffffff' ></i>
            <div class="blank"></div>
            <router-link to="/blogs">博客</router-link>
        </div>
        <div class="nav-item">
            <div class="blank"></div>
            <i class='bx bxs-book-content' style='color:#ffffff'  ></i>
            <div class="blank"></div>
            <router-link to="/columns">专栏</router-link>
        </div>
        <div class="nav-item">
            <div class="blank"></div>
            <i class='bx bxs-ruler' style='color:#ffffff' ></i>
            <div class="blank"></div>
            <router-link to="/logs">日志</router-link>
        </div>
        <div class="nav-item">
            <div class="blank"></div>
            <i class='bx bx-question-mark' style='color:#ffffff' ></i>
            <div class="blank"></div>
            <router-link to="/about">关于</router-link>
        </div>
    </Drawer>
</template>
<script setup>
import { defineProps, ref } from 'vue';

const opened = ref(false)

const props = defineProps({
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    }
})

const openDrawer = () => {
    opened.value = true;
}
const closeDrawer = () => {
    opened.value = false;
}
</script>
<style scoped>
button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    transition: opacity 0.3 ease;
}

::v-deep .u-title {
    color: white !important;
    font-size: 24px !important;
}
::v-deep .m-drawer-mask {
    background-color: transparent !important;
}
::v-deep .m-drawer-content {
    background-color: rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(5px) !important;
}
::v-deep svg {
    display: none !important;
}
::v-deep .m-drawer-wrapper.drawer-left {
    width: 100% !important;
}
.nav-item {
    display: flex;
    width: 80%;
    height: 50px;
    align-items: center;
    font-size: 14pt;
    border-radius: 10px;
    transition: all 0.5s;
}
.nav-item:hover {
    background-color: rgba(255, 255, 255, 0.25);
}
.blank {
    width: 10px;
}
a {
    text-decoration: none;
    color: #fff;
}
.router-link-active {
    text-decoration: none;
}
</style>