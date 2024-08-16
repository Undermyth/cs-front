<template>
    <div class="about-wrapper">
        <div class="navbar"><HorizonNav></HorizonNav></div>
        <div class="content">
            <div class="read-board">
                <div class="text-content" v-html="htmlContent"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import HorizonNav from '../CoverPage/HorizonNav.vue';
import mdContent from './about.md'
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

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
})

</script>

<style scoped>
.about-wrapper {
    display: flex;
    flex-flow: column;
    /* justify-content: center; */
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: transparent;
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

</style>