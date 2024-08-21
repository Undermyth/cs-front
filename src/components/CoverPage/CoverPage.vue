<template>
    <div class="cover-wrapper">
        <div class="mobilebar"><MobileNav :width="50" :height="50"></MobileNav></div>
        <div class="navbar"><HorizonNav></HorizonNav></div>
        <div class="content">
            <center>
                <p id="typing"></p>
            </center>
            <div class="line" :class="{ animate: animateLine }"></div>
            <div class="bottom">
                <div class="contact" :class="{ visible: git_visible }">
                    <i class='bx bxl-github' style='color:#ffffff'></i>
                    <a href="https://github.com/undermyth">GitHub</a>
                </div>
                <div class="contact" :class="{ visible: zhihu_visible }">
                    <i class="ti ti-brand-zhihu" style='color:#ffffff'></i>
                    <a href="https://www.zhihu.com/people/activator-85">Zhihu</a>
                </div>
                <div class="contact" :class="{ visible: email_visible }">
                    <i class='bx bx-envelope' style='color:#ffffff'></i>
                    <a href="mailto:chensy.aira@foxmail.com">Email</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TypeIt from "typeit";
import { onBeforeUnmount, onMounted, ref } from "vue";
import HorizonNav from "./HorizonNav.vue";
import MobileNav from "./MobileNav.vue";
const sentences = ref([
    "あの光はなに？",
    "もっと知りたい",
    "勿相忘 镌于心 直到有朝一日 我们再度相逢",
    "\"人和代码，有一个能跑就行\"",
    "迷子でもいい、迷子でも進め",
    "\"我的传说 从此开始\""
]);

const selectSentence = () => {
    return sentences.value[Math.floor(Math.random() * sentences.value.length)];
}

const animateLine = ref(false);
const git_visible = ref(false);
const zhihu_visible = ref(false);
const email_visible = ref(false);

onMounted(() => {
    new (TypeIt)("#typing", {
        strings: selectSentence(),
        speed: 100,
        waitUntilVisible: true,
    }).go();

    setTimeout(() => {
        animateLine.value = true;
    }, 3000);
    setTimeout(() => {
        git_visible.value = true;
    }, 4000);
    setTimeout(() => {
        zhihu_visible.value = true;
    }, 5000);
    setTimeout(() => {
        email_visible.value = true;
    }, 6000);

    getMobileVh();
    window.addEventListener('resize', getMobileVh);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', getMobileVh);
})

const getMobileVh = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
</script>

<style scoped>
.cover-wrapper {
    display: flex;
    flex-flow: column;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    background-color: transparent;
}
h1 {
    margin: 0%;
}
p {
    font-family: "LXGW WenKai", sans-serif;
}
.mobilebar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color: transparent;
    display: none;
    /* background-color: rgba(0, 0, 0, 0.1) !important; */
    /* backdrop-filter: blur(5px) !important; */
}
.navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 8%;
    padding-left: 20px;
    background-color: transparent
}
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    gap: 10px;
    width: 100%;
    height: 92%;
    background-color: transparent;
}
#typing {
    /* background-color: rgba(0, 0, 0, 0.3); */
    border-radius: 10px;
    padding: 10px;
    font-size: 25px;
    color: white;
    font-weight: 300;
}
.line {
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 1.5s ease-in-out;
}

.line.animate {
    width: 30%;
}

.bottom {
    display: flex;
    justify-content: center;
    gap: 10px;
    height: 40px;
    width: 25%;
    margin-top: 10px;
}

.contact {
    height: 100%;
    width: 30%;
    /* background-color: rgba(0, 0, 0, 0.1); */
    backdrop-filter: blur(5px);
    border-radius: 30px;
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 20px;
    color: white;
    font-family: "LXGW WenKai", sans-serif;
    transition: all 0.3s ease;
    opacity: 0;
}

.contact.visible {
    opacity: 1;
}

i {
    font-size: 24px;
}

.contact a {
    color: white;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
}

.contact a::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: var(--ctp-latte-rosewater);
    transition: width 0.3s ease, left 0.3s ease;
}

.contact:hover {
    border: 2px solid var(--ctp-latte-rosewater);
}

.contact:hover > a {
    color: var(--ctp-latte-rosewater);
}

.contact:hover > a::after {
    width: 100%;
    left: 0;
}

@media screen and (max-width: 1024px) {
    .line.animate {
        width: 80%;
    }
    .bottom {
        width: 40%;
    }
}

@media screen and (max-width: 768px) {
    .bottom {
        width: 60%;
    }
}

@media screen and (max-width: 425px) {
    .bottom {
        width: 80%;
        flex-flow: column;
        height: 150px;
        align-items: center;
    }
    .contact {
        width: 60%;
    }
    .navbar {
        display: none;
    }
    .mobilebar {
        display: block;
    }
}

</style>
