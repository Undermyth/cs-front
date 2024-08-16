<template>
    <div class="read-page-wrapper">
        <div class="content">
            <div class="read-board" ref="readBoard">
                <PageHead 
                    :title="title" 
                    :time="time"
                    :length="length">
                </PageHead>
                <div class="text-content" v-html="blog_content"></div>
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
import NavBar from '../HomePage/NavBar.vue';
import PageHead from './PageHead.vue';

const blog_content = ref(null)
const readBoard = ref(null)
const tableOfContent = ref(null)
const total_scroll = ref(0)
const out_scroll = ref(0)
const title = ref(0)
const time = ref(0)
const length = ref(0)

const props = defineProps({
    article_id: {
        type: String,
        required: true,
    }
})

onMounted(async () => {
    const response = await axios.get('/get_article', {
        params: {
            article_id: props.article_id,
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
    time.value = response.data.time;
    length.value = response.data.length;
    
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
    
    window.addEventListener('wheel', handleScroll);
})

onBeforeUnmount(() => {
    window.removeEventListener('wheel', handleScroll);
})


const handleScroll = (event) => {
    const readBoardEl = readBoard.value;
    const maxOffset = 10; // 最大的 Y 偏移量 (vh)
    const minHeight = 90; // 最小的高度 (vh)
    const maxOutScroll = 50; // 最大的尾部偏移 (px)

    total_scroll.value += event.deltaY;

    // reach top. DO NOT use readBoardEl.scrollTop == 0 because the scrollbar will reach top
    // before the animation should be played.
    if (total_scroll.value < 0) {
        total_scroll.value = 0;
    }
    // prevent sudden scroll and reach bottom
    if (total_scroll.value > readBoardEl.scrollTop) {
        total_scroll.value = readBoardEl.scrollTop;
    }
    
    if (Math.abs(readBoardEl.scrollTop + readBoardEl.clientHeight - readBoardEl.scrollHeight) < 10) {
        out_scroll.value += event.deltaY;
    }
    if (out_scroll.value > 0 && event.deltaY < 0) {
        out_scroll.value += event.deltaY;
    }
    if (out_scroll.value < 0) {
        out_scroll.value = 0;
    }
    if (out_scroll.value > maxOutScroll) {
        out_scroll.value = maxOutScroll;
    }
    
    if (readBoardEl) {

        // 根据滚动距离计算新的偏移量和高度
        const newOffset = Math.max(0, maxOffset - (total_scroll.value / 10));
        const newHeight = Math.min(100, minHeight + (total_scroll.value / 10));
        const newRadius = newOffset * 2;

        // 更新 readBoard 的 transform 和高度
        readBoardEl.style.transform = `translateY(${newOffset}vh)`;
        readBoardEl.style.height = `${newHeight}vh`;
        readBoardEl.style.borderTopLeftRadius = `${newRadius}px`;        
        readBoardEl.style.borderTopRightRadius = `${newRadius}px`;

        if (out_scroll.value > 0) {
            const negOffset = -(out_scroll.value) / 10;
            const negHeight = 100 + negOffset;
            const negRadius = -negOffset * 4;
            readBoardEl.style.transform = `translateY(${negOffset}vh)`;
            readBoardEl.style.height = `${negHeight}vh`;
            readBoardEl.style.borderBottomLeftRadius = `${negRadius}px`;
            readBoardEl.style.borderBottomRightRadius = `${negRadius}px`;
        }
    }

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
</script>


<style scoped>
.read-page-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: transparent;
}

.content {
    display: flex;
    width: 80%;
    height: 100%;
    justify-content: center;
    gap: 20px;
}

.read-board {
    width: 70%;
    background-color: rgba(245, 245, 245, 0.9);
    backdrop-filter: blur(5px);
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    transform: translateY(10vh);
    transition: transform 0.3s ease, height 0.3s ease;
    overflow-y: scroll;
    border-radius: 20px 20px 0px 0px;
    color: var(--ctp-latte-text);
    scroll-behavior: smooth;
}

/* Webkit滚动条样式 */
.read-board::-webkit-scrollbar {
    width: 10px;
}
.read-board::-webkit-scrollbar-track {
    background: transparent;
}
.read-board::-webkit-scrollbar-thumb {
    background-color: var(--ctp-latte-rosewater);
    border-radius: 20px;
    border: 3px solid transparent;
    background-clip: content-box;
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

.side {
    display: flex;
    flex-flow: column;
    gap: 10px;
    width: 20%;
    margin-top: 10vh;
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
    scrollbar-width: none;
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

</style>
