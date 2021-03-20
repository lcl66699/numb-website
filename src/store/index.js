import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicUser: null,
    musicUid: null,
    musicCookie: null,
  },
  mutations: {
    // 保存用户信息
    addUser(state, obj) {
      state.musicUser = obj;
      state.musicUid = state.musicUser.profile.userId;
      state.musicUser = obj.cookie;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {

    getCookie(state) {
      if (localStorage.getItem('musicCookie')) {
        state.musicCookie = localStorage.getItem('musicCookie');
      }
      return state.musicCookie;
    },

    /**获取用户id */
    getUserId(state) {
      if (localStorage.getItem('musicUid')) {
        state.musicUid = localStorage.getItem('musicUid');
      }
      return state.musicUid
    },
  },
})
