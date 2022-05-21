<template>
  <div id="app">
    <div class="custom-header">
      <head-bar @toHome="switchTo('strict/home')">
      </head-bar>
    </div>
    <div>
      <div class="subview-container">
        <router-view></router-view>
      </div>
      <strict-footer></strict-footer>
    </div>
  </div>
</template>

<script>
import headBar from '../components/headbar/head-bar-strict'
import strictFooter from '../components/footer/strict-footer.vue'

export default {
  components: {headBar, strictFooter},
  name: 'app-strict',
  data: function () {
    return {
    }
  },
  methods: {
    switchTo: function (path) {
      if (this.$route.path === `/${path}`)
        return
      this.$router.push({
        path: '/' + path
      })
    },
    updateSiteData: async function () {
      // check user cookies validity
      if (this.$store.getters.isUserLogin) {
        await this.$http.get(`${window.backendOrigin}/api/user`).then(res => {
          this.$store.commit('setUserData', {
            isUserLogin: true,
            uid: res.data.uid,
            username: res.data.username,
            nickname: res.data.nickname,
            permission: res.data.permission,
            contest: res.data.contest
          })
        }, error => {
          if (error.status === 401) {
            this.$store.commit('clearUserData')
            this.$router.replace('/login')
          }
        })
      }
      // check strict mode enabled
      await this.$http.get(`${window.backendOrigin}/api/version/strict-mode`).then(res => {
        const strictModeBefore = this.$store.getters.isStrictMode
        const strictModeAfter = res.data.enable
        if (strictModeBefore !== strictModeAfter) {
          this.$store.commit('setVersion', {
            serverStrictMode: strictModeAfter
          })
        }
      })
    }
  },
  mounted () {
    this.updateSiteData()
  }
}
</script>

<style lang="less">
.subview-container {
  margin-top: 100px;
}

.custom-header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 233;
}
</style>
