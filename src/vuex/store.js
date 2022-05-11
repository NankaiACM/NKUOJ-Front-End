import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) =>
          ls.set(key, value),
        removeItem: (key) => ls.remove(key),
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
    },
    preferences: {
      statusFilterUID: null,
      statusFilterPID: null,
      statusFilterNickname: null,
    },
    version: {
      strictMode: false
    }
  },
  getters: {
    isUserLogin: function (state) {
      return state.userData.isUserLogin
    },
    isAdministrator: function (state) {
      return state.userData.permission >= 1
    },
    isStrictMode: function (state) {
      return state.version.strictMode
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
    },
    clearUserData (state) {
      state.userData.isUserLogin = false
      state.userData.uid = ''
      state.userData.permission = 0
      state.userData.username = ''
      state.userData.nickname = ''
      sessionStorage.clear()
    },
    setVersion (state, payload) {
      state.version.strictMode = payload.strictMode
    },
    setPreferences (state, payload) {
      state.preferences = payload
    },
    setPreferencesItem (state, payload) {
      for (const [key, val] of Object.entries(payload)) {
        state.preferences[key] = val
      }
    }
  }
})
