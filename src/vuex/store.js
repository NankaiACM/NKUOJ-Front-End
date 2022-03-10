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
      lastPulledStick: 0
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
    },
    getUID: function (state) {
      return state.userData.uid
    }
  },
  mutations: {
    setUserData (state, payload) {
      state.userData.isUserLogin = true
      state.userData.uid = ('uid' in payload ? payload.uid : state.userData.uid)
      state.userData.permission = ('permission' in payload ? payload.permission : state.userData.permission)
      state.userData.username = ('username' in payload ? payload.username : state.userData.username)
      state.userData.nickname = ('nickname' in payload ? payload.nickname : state.userData.nickname)
      state.userData.lastPulledStick = ('lastPulledStick' in payload ? payload.lastPulledStick : state.userData.lastPulledStick)
    },
    clearUserData (state) {
      state.userData.isUserLogin = false
      state.userData.uid = ''
      state.userData.permission = 0
      state.userData.username = ''
      state.userData.nickname = ''
      state.userData.lastPulledStick = 0
      sessionStorage.clear()
    }
  }
})
