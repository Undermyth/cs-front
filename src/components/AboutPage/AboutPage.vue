<template>
    <div class="about-wrapper">
        <div class="mobilebar"><MobileNav :width="50" :height="50"></MobileNav></div>
        <div class="navbar"><HorizonNav></HorizonNav></div>
        <div class="content">
            <div class="read-board">
                <div class="text-content" v-html="htmlContent"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import { onBeforeUnmount, onMounted, ref } from 'vue';
import HorizonNav from '../CoverPage/HorizonNav.vue';
import MobileNav from '../CoverPage/MobileNav.vue';
import mdContent from './about.md';

const htmlContent = ref(null);

onMounted(() => {
    const marked = new Marked(
        {
            breaks: true,
            gfm: true,
        },
        markedHighlight({
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                console.log(hljs.highlight(code, { language }).value);
                return hljs.highlight(code, { language }).value;
            }
        })
    );
    htmlContent.value = marked.parse(mdContent);
    getMobileVh();
    window.addEventListener('resize', getMobileVh);
})

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
.about-wrapper {
    display: flex;
    flex-flow: column;
    /* justify-content: center; */
    align-items: center;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    background-color: transparent;
    overflow-y: hidden;
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
    background-color: transparent;
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
    padding-top: 1%;
    padding-bottom: 3%;
}
.read-board {
    width: 70%;
    height: 100%;
    background-color: rgba(245, 245, 245, 0.9);
    backdrop-filter: blur(5px);
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
    overflow-y: scroll;
    border-radius: 10px;
    color: var(--ctp-latte-text);
    scroll-behavior: smooth;
}

.text-content {
    line-height: 0.8cm;
    font-family: "LXGW WenKai", sans-serif;
}

::v-deep .text-content h1 {
    display: none;
}

::v-deep .text-content h2 {
    margin-top: 0.5cm;
    margin-bottom: 0.5cm;
    color: var(--ctp-latte-lavender);
}

::v-deep .text-content h3 {
    margin-top: 0.3cm;
    margin-bottom: 0.3cm;
    color: var(--ctp-latte-lavender);
}

::v-deep .text-content blockquote {
    color: var(--ctp-latte-rosewater);
    margin-top: 0.5cm;
    margin-bottom: 0.5cm;
    border-left: 2px solid var(--ctp-latte-lavender);
    padding-left: 10px;
}

::v-deep .text-content a {
    color: var(--ctp-latte-rosewater);
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
}

::v-deep .text-content a::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: var(--ctp-latte-pink);
    transition: width 0.3s ease, left 0.3s ease;
}

::v-deep .text-content a:hover {
    color: var(--ctp-latte-pink);
}

::v-deep .text-content a:hover::after {
    width: 100%;
    left: 0;
}

::v-deep .text-content pre {
    margin-top: 0.5cm;
    margin-bottom: 0.5cm;
    padding: 2%;
    background-color: var(--ctp-latte-mantle);
    line-height: 0.5cm;
    border-radius: 20px;
}

::v-deep .text-content code {
    background-color: var(--ctp-latte-mantle);
}

::v-deep .text-content strong {
    font-weight: 1200;
    text-decoration: underline;
    text-decoration-color: var(--ctp-latte-text);
}

::v-deep ul, ol {
    list-style-position: inside;
    padding-left: 0;
}

::v-deep ul ul  {
    padding-left: 1.5em;
}

::v-deep ul ul ul {
    padding-left: 1.5em;
}

::v-deep ul ul ul ul {
    padding-left: 1.5em;
}

::v-deep li {
    padding-left: 1.5em; /* 或者你喜欢的任何其他值 */
}

@media screen and (max-width: 768px) {
    .read-board {
        width: 80%;
    }
}

@media screen and (max-width: 425px) {
    .mobilebar {
        display: block;
    }
    .navbar {
        display: none;
    }
    .read-board {
        width: 95%;
        height: 90%;
    }
}
</style>