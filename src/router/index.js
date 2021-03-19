import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决编程式导航再次点击控制台报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 按顺序引入
import Home from '../views/Home.vue'
import Music from '@/views/Music/Music.vue'
import Foods from '@/views/Foods/Foods.vue'
import Photos from '@/views/Photos/Photos.vue'
import Chat from '@/views/Chat/Chat.vue'
import QQ from '../views/Chat/QQ.vue'
import Lemon from '@/views/Lemon/Lemon.vue'
import Others from '@/views/Others/Others.vue'
import SingerDetail from "@/views/Music/SingerDetail.vue";
import MusicListTable from '@/views/Music/MusicListTable.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/virus',
    name: 'virus',
    component: () => import('../views/FightVirus/FightVirus.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: Music,
    children: [
    ]
  },
  {
    path: '/music/songlist/:id',
    name: 'SingerDetail',
    component: SingerDetail,
    //歌单详情中的子组件歌曲列表,评论
    children: [//隐式传参声明的name
      { name: 'musicPage', path: '/musicPage', component: MusicListTable },
      //评论模块子组件
      { path: '/comment/:id', component: () => import('../views/Music/CommentPage') }
    ]
  },
  //跳转mv视频模块
  {
    path: '/video/:id',
    name: 'VideoPage',
    component: () => import('../views/Music/Video/VideoPage')
  },
  //视频播放页
  {
    path: '/videoPlay/:id',
    name: 'videoPlay',
    component: () => import('../views/Music/Video/VideoPlayPage')
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods
  },
  {
    path: '/photos',
    name: 'Photos',
    component: Photos
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    children: [

      {
        path: 'qq',
        name: 'QQ',
        component: QQ
      }
    ]
  },
  {
    path: '/lemon',
    name: 'Lemon',
    component: Lemon
  },
  {
    path: '/others',
    name: 'Others',
    component: Others,
    children: [
      {
        path: 'aboutme',
        name: 'Aboutme',
        component: () => import('../views/Others/Aboutme.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'page404',
    component: () => import('../components/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router