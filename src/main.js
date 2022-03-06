import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入字体
import './assets/iconfont.js'
// 引入全局的样式
import '@/assets/css/common.css'
// 点击之后的爱心
import './components/clickLove.js'
//引入echart
import * as echarts from 'echarts';
// import 'echarts-liquidfill' //水波图
Vue.prototype.$echarts = echarts

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper' //导入两个组件
import 'swiper/swiper-bundle.min.css' //使用样式
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; //导入模组
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]); //使用模组
Vue.use(VueAwesomeSwiper)//全局注册插件

import htmlToPdf from '@/utils/htmlToPdf'
Vue.use(htmlToPdf)
//动画
import animated from 'animate.css'
Vue.use(animated)
// import 'animate.css'

import axios from 'axios'
//配置请求根路径 跨域在vue.config.js中



import { debounce, throttle, formatTime } from '@/utils/index' //引入全局的方法
Vue.prototype.throttle = throttle;//挂载原型
Vue.prototype.debounce = debounce;//挂载原型
Vue.prototype.formatTime = formatTime;//挂载原型


axios.defaults.baseURL = '/music-api';
Vue.config.productionTip = false
Vue.prototype.$http = axios

//全局vue过滤器(时间戳过滤器)
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d}`
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
