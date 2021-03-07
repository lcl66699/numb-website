import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入全局的样式
import '@/assets/css/common.css'
// 点击之后的爱心
import './components/clickLove.js'
// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper' //导入两个组件
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.min.css' //使用样式
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; //导入模组
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]); //使用模组
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)//全局注册插件


Vue.config.productionTip = false





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
