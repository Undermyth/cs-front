import { createApp } from 'vue'
import App from './App.vue'

import VueFullPage from 'vue-fullpage.js'
import 'vue-fullpage.js/dist/style.css'

import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

import router from './router'

import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = "http://121.40.91.43:5000"

app.config.globalProperties.$axios = axios

app
    .use(VueFullPage)
    .use(VueAmazingUI)
    .use(router)
    .mount('#app')
