import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)

// tạo pinia
const pinia = createPinia()

// gắn pinia vào app
app.use(pinia)

app.mount('#app')
