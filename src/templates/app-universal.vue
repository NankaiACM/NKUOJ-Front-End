<template>
<div id="app">
  <div class="custom-header">
    <head-bar @toHome="switchTo('home')"
              @toProblem="switchTo('problems')" @toStatus="switchTo('status')"
              @toContest="switchTo('contest')" @toDiscuss="switchTo('discuss')"
              @toCourse="switchTo('courses')">
    </head-bar>
  </div>
  <div>
    <div class="subview-container">
      <router-view></router-view>
    </div>
    <foot></foot>
  </div>
</div>
</template>

<script>
import headBar from '../components/headbar/head-bar-universal'
import foot from '../components/footer.vue'

export default {
  components: {headBar, foot},
  name: 'app-universal',
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
        }, e => {
          if (e.body.code === 401) {
            this.$store.commit('clearUserData')
            this.$router.push('/login')
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
