import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import naive from 'naive-ui'
import './assets/styles/main.css'

const app = createApp(App)

app.use(naive)
app.use(router)
app.use(createPinia())
app.mount('#app')
