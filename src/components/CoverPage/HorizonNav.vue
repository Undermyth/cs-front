<template>
    <div class="nav-wrapper">
        <nav>
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
    name: "HorizonNav"
}
</script>

<style scoped>
.nav-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
h1 {
    margin: 0%;
    padding-bottom: 10px;
}
nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.nav-item {
    display: flex;
    width: 100px;
    height: 50px;
    align-items: center;
    font-size: 14pt;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.5s;
}
.nav-item:hover {
    background-color: rgba(255, 255, 255, 0.25);
}
.blank {
    width: 10px;
}
</style>