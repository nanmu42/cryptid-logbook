import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const naiveUIStyles = document.createElement('meta')
naiveUIStyles.name = 'naive-ui-style'
document.head.appendChild(naiveUIStyles)

const app = createApp(App)

app.use(router)

app.mount('#app')
