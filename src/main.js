import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import Antd from 'ant-design-vue'
import * as antIcons from '@ant-design/icons-vue'
import '@/styles/antd.less'
import '@/styles/index.less'

import App from './App.vue'
import router from './router'
import store from './store'

import * as permission from './permission' //路由权限

import _ from 'lodash'

const app = createApp(App)
app.config.productionTip = false

//antdv icon
Object.keys(antIcons).forEach((key) => {
	app.component(key, antIcons[key])
})

app.directive('permission', permission)

app.use(Antd)
app.use(router)
app.use(store)

app.mount('#app')