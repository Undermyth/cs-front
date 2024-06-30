import { createApp } from 'vue'
import App from './App.vue'

import 'vue-fullpage.js/dist/style.css'
import VueFullPage from 'vue-fullpage.js'

import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

import router from './router'

createApp(App)
    .use(VueFullPage)
    .use(VueAmazingUI)
    .use(router)
    .mount('#app')
