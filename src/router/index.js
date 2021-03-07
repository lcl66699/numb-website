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
import Lemon from '@/views/Lemon/Lemon.vue'
import Others from '@/views/Others/Others.vue'
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
    component: Music
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
    component: Chat
  },
  {
    path: '/lemon',
    name: 'Lemon',
    component: Lemon
  },
  {
    path: '/others',
    name: 'Others',
    component: Others
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
