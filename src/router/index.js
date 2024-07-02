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
            path: '/single-col-test',
            name: 'single-col-test',
            component: defineAsyncComponent(() => import('../components/SingleColumn/SingleColumnPage.vue'))
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
        }
    ]
})

export default router