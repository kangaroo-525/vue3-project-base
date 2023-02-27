import { createApp } from 'vue'
import { setupStore } from './stores'
import { setupRouter } from './router'
import i18n from '@/language'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import App from './App'
const app = createApp(App)
setupStore(app)
setupRouter(app)
app.use(Antd)
app.use(i18n)
app.mount('#app')
