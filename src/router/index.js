import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: defineAsyncComponent(() => import('../components/HomeWrapper.vue'))
        }
    ]
})

export default router