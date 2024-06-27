<template>
    <div class="nav-wrapper">
        <nav>
            <h1>导航</h1>
            <div class="line"></div>
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
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavBar"
}
</script>

<style scoped>
.nav-wrapper {
    padding-top: 20px;
    padding-left: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 35px;
    height: 100%;
    color: white;
}
h1 {
    margin: 0%;
    padding-bottom: 10px;
}
.line {
    width: 90%;
    height: 1px;
    background-color: white;
    margin-bottom: 10px;
}
nav {
    display: flex;
    flex-flow: column;
}
.nav-item {
    display: flex;
    width: 90%;
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
</style>