import { createApp } from 'vue'
import App from './App.vue'

import 'vue-fullpage.js/dist/style.css'
import VueFullPage from 'vue-fullpage.js'

import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

createApp(App)
    .use(VueFullPage)
    .use(VueAmazingUI)
    .mount('#app')
