<template>
  <div id="app">
    <div class="custom-header">
      <head-bar>
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
import headBar from '../components/headbar/head-bar-contest'

export default {
  components: {headBar},
  name: 'app-universal',
  data: function () {
    return {
    }
  },
  methods: {
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
          // eslint-disable-next-line no-unused-vars
        }, _ => {
          this.$store.commit('clearUserData')
          this.$router.push('/login')
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
