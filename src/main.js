import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'


import router from './router/index'
import store from './store'
import './router/Interceptor'
import Alframe from './components/packages/index'
// import Alechart from'./components/echarts/index'
import './styles/common/index.min.css'
import './styles/global/index.min.css'


import { mockXHR } from '../mock'

// MockJs将用于开发环境，请在上网前将其删除！
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}
// console.log('process.env.NODE_ENV',process.env.NODE_ENV);

Vue.use(Element);
Vue.use(Alframe);
// Vue.use(Alechart);

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
