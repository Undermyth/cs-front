import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: defineAsyncComponent(() => import('../components/HomeWrapper.vue'))
        },
        {
            path: '/columns',
            name: 'columns',
            component: defineAsyncComponent(() => import('../components/ColumnPage/ColumnPage.vue'))
        },
        {
            path: '/column/:column_id',
            name: 'column',
            component: defineAsyncComponent(() => import('../components/SingleColumn/SingleColumnPage.vue')),
            props: true,
        },
        {
            path: '/blogs',
            name: 'blogs',
            component: defineAsyncComponent(() => import('../components/BlogsPage/BlogsPage.vue'))
        },
        {
            path: '/logs',
            name: 'logs',
            component: defineAsyncComponent(() => import('../components/LogsPage/LogsPage.vue'))
        },
        {
            path: '/article/:article_id',
            name: 'article',
            component: defineAsyncComponent(() => import('../components/ReadPage/ReadPage.vue')),
            props: true,
        },
        {
            path: '/log/:log_id',
            name: 'log',
            component: defineAsyncComponent(() => import('../components/ReadPage/ReadLogPage.vue')),
            props: true,
        },
        {
            path: '/about',
            name: 'about',
            component: defineAsyncComponent(() => import('../components/AboutPage/AboutPage.vue'))
        }
    ]
})

export default router
