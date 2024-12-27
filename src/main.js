import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { clickOutside } from '@/directives/click-outside'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('click-outside', clickOutside)

app.mount('#app')
