import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value),
        removeItem: (key) => Cookies.remove(key),
      },
    })
  ],
  state: {
    userData: {
      isUserLogin: false,
      uid: '',
      permission: 0,
      username: '',
      nickname: '',
    }
  },
  getters: {
    isUserLogin: function (state) {
      return state.userData.isUserLogin
    },
    isAdministrator: function (state) {
      return state.userData.permission >= 1
    },
    getUserData: function (state) {
      return state.userData
    }
  },
  mutations: {
    setUserData (state, payload) {
      state.userData.isUserLogin = true
      state.userData.uid = payload.uid
      state.userData.permission = payload.permission
      state.userData.username = payload.username
      state.userData.nickname = payload.nickname
    },
    clearUserData (state) {
      state.userData.isUserLogin = false
      state.userData.uid = ''
      state.userData.permission = -1
      state.userData.username = ''
      state.userData.nickname = ''
      sessionStorage.clear()
    }
  }
})
