import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // router 폴더 안에 index.js를 만들었다면 이렇게 import

createApp(App)
    .use(router)   // 라우터를 앱에 등록
    .mount('#app')
