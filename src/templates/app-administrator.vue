<template>
  <div id="app">
    <div class="custom-header">
      <head-bar @toAdministrator="switchTo('/admin/home')"
                @toHome="switchTo('/home')">
      </head-bar>
    </div>
    <div>
      <div class="subview-container">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
const headBar = () => import( '../components/headbar/head-bar-administrator')

export default {
  components: {headBar},
  name: 'app-administrator',
  data: function () {
    return {
    }
  },
  methods: {
    switchTo: function (path) {
      if (this.$route.path === `/${path}`)
        return
      this.$router.replace({path: path})
    },
    updateUserData: function () {
      if (this.$store.getters.isUserLogin) {
        this.$http.get(`${window.backendOrigin}/api/user`).then(res => {
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
    }
  },
  mounted () {
    this.updateUserData()
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
