<template>
    <div class="read-page-wrapper">
        <div class="mobilebar"><MobileNav :width="50" :height="50"></MobileNav></div>
        <div class="content">
            <div class="read" ref="readBoard" id="read">
                <div class="read-board">
                    <LogPageHead 
                        :title="title" 
                        :endtime="endtime"
                        :length="length">
                    </LogPageHead>
                    <div class="text-content" v-html="blog_content"></div>
                </div>
            </div>
            <div class="side">
                <div class="toc" id="toc" ref="tableOfContent"></div>
                <NavBar></NavBar>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import hljs from 'highlight.js';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import { defineProps, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import MobileNav from '../CoverPage/MobileNav.vue';
import NavBar from '../HomePage/NavBar.vue';
import LogPageHead from './LogPageHead.vue';

const blog_content = ref(null)
const readBoard = ref(null)
const tableOfContent = ref(null)
const total_scroll = ref(0)
const out_scroll = ref(0)
const title = ref(0)
const endtime = ref(0)
const length = ref(0)

const props = defineProps({
    log_id: {
        type: String,
        required: true,
    }
})

onMounted(async () => {
    const response = await axios.get('/get_log', {
        params: {
            log_id: props.log_id,
        }
    });
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
    blog_content.value = marked.parse(response.data.content);
    title.value = response.data.title;
    endtime.value = response.data.endtime;
    length.value = response.data.len;
    
    // 确保 DOM 已经更新后再操作
    await nextTick();
    const brTags = readBoard.value.querySelectorAll('.text-content br');
    brTags.forEach(br => {
        const span = document.createElement('span');
        span.style.display = 'block';
        span.style.height = '0.5cm';
        br.after(span);
    });
    const imgTags = readBoard.value.querySelectorAll('.text-content img');
    imgTags.forEach(img => {
        img.style.display = 'block';
        img.style.margin = 'auto';
        img.style.width = '100%';
    })

    renderTeXInDocument();

    const headings = readBoard.value.querySelectorAll('h1, h2, h3, h4');
    const toc = document.createElement('ul');

    headings.forEach((heading, index) => {
        // 生成唯一ID
        const id = `heading-${index}`;
        heading.id = id;

        // 创建跳转链接
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;

        // 根据标题层级生成嵌套的列表
        const listItem = document.createElement('li');
        listItem.appendChild(link);

        let parent = toc;
        if (heading.tagName === 'H2') {
            parent = findOrCreateSubList(parent);
        } else if (heading.tagName === 'H3') {
            const h2List = findOrCreateSubList(toc);
            parent = findOrCreateSubList(h2List);
        } else if (heading.tagName === 'H4') {
            const h2List = findOrCreateSubList(toc);
            const h3List = findOrCreateSubList(h2List);
            parent = findOrCreateSubList(h3List);
        }
        parent.appendChild(listItem);
    });

    document.getElementById('toc').appendChild(toc);
    
    getMobileVh();
    let div = document.getElementById("read");
    div.addEventListener('wheel', handleScroll);
    window.addEventListener('resize', getMobileVh);
})

onBeforeUnmount(() => {
    let div = document.getElementById("read");
    div.removeEventListener('wheel', handleScroll);
    window.removeEventListener('resize', getMobileVh);
})


const handleScroll = (event) => {
    const readBoardEl = readBoard.value;
    const tocEl = tableOfContent.value;
    const headings = readBoard.value.querySelectorAll('h1, h2, h3, h4');
    headings.forEach(head => {
        if (readBoardEl.scrollTop > head.offsetTop - 100) {
            let alinks = tocEl.querySelectorAll('a');
            alinks.forEach(alink => {
                alink.classList.remove('active');
            });
            let id = head.getAttribute('id');
            let selector = `a[href="#${id}"]`; // 注意这里的引号
            tocEl.querySelector(selector).classList.add('active');
            let scrolltop = head.offsetTop - 2 * readBoardEl.clientHeight;
            if (scrolltop < 0) scrolltop = 0;
            if (scrolltop + tocEl.clientHeight >= tocEl.scrollHeight) {
                scrolltop = tocEl.scrollHeight - tocEl.clientHeight;
            }
            tocEl.scrollTop = scrolltop;
        }
    });
}

const renderTeXInDocument = () => {
    // Select all <p> tags in the document
    const paragraphs = document.querySelectorAll('p');

    paragraphs.forEach(p => {
        let content = p.innerHTML;

        // Replace block TeX expressions (delimited by $$)
        content = content.replace(/\$\$(.*?)\$\$/g, (match, tex) => {
            try {
            return katex.renderToString(tex, { displayMode: true });
            } catch (error) {
            return `<span class="katex-error">${error.message}</span>`;
            }
        });

        // Replace inline TeX expressions (delimited by $)
        content = content.replace(/\$(.*?)\$/g, (match, tex) => {
            try {
            return katex.renderToString(tex, { displayMode: false });
            } catch (error) {
            return `<span class="katex-error">${error.message}</span>`;
            }
        });

        // Replace the inner HTML of the <p> tag with the rendered content
        p.innerHTML = content;
    });
} 

const findOrCreateSubList = (parent) => {
    let subList = parent.querySelector('ul:last-child');
    if (!subList) {
        subList = document.createElement('ul');
        parent.appendChild(subList);
    }
    return subList;
}

const getMobileVh = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(window.innerHeight, window.innerWidth);
}
</script>

<style scoped>
.read-page-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    background-color: transparent;
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

.content {
    display: flex;
    width: 80%;
    height: 100%;
    justify-content: center;
    gap: 20px;
}

.read {
    height: 100%;
    width: 70%;
    padding-top: 10%;
    padding-bottom: 10%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scrollbar-width: none;
}

.read-board {
    width: 100%;
    background-color: rgba(245, 245, 245, 0.9);
    backdrop-filter: blur(5px);
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    /* transform: translateY(10%); */
    transition: transform 0.3s ease, height 0.3s ease;
    /* overflow-y: scroll; */
    border-radius: 20px 20px 20px 20px;
    color: var(--ctp-latte-text);
    scroll-behavior: smooth;
    height: auto;
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

.side {
    display: flex;
    flex-flow: column;
    gap: 10px;
    width: 20%;
    margin-top: 10%;
    margin-bottom: 5%;
}

.toc {
    height: 100%;
    background-color: aliceblue;
    overflow-y: scroll;
    line-height: 1cm;
    font-family: "LXGW WenKai", sans-serif;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 35px;
    height: 100%;
    color: white;
    scroll-behavior: smooth;
}

.toc::-webkit-scrollbar {
    display: none;
}

::v-deep .toc ul li {
    list-style: none;
}

::v-deep .toc a {
    color: white;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
}

::v-deep .toc a::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: var(--ctp-latte-rosewater);
    transition: width 0.3s ease, left 0.3s ease;
}

::v-deep .toc a:hover {
    color: var(--ctp-latte-rosewater);
}

::v-deep .toc a:hover::after {
    width: 100%;
    left: 0;
}

::v-deep .toc a.active {
    font-size: 20px;
    color: var(--ctp-latte-rosewater);
}

@media screen and (max-width: 768px) {
    .content {
        width: 98%;
    }
}

@media screen and (max-width: 425px) {
    .side {
        display: none;
    }
    .content {
        height: 90%;
        width: 100%;
    }
    .read {
        width: 95%;
    }
    ::v-deep .addition-info {
        display: none;
    }
    ::v-deep .head-wrapper {
        font-size: 30px;
    }
    .mobilebar {
        display: block;
    }
    .read-page-wrapper {
        justify-content: flex-start;
    }
}
</style>
