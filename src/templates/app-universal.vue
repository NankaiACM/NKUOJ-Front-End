<template>
<div id="app">
  <div class="custom-header">
    <head-bar @toHome="switchTo('home')"
              @toProblem="switchTo('problems')" @toStatus="switchTo('status')"
              @toContest="switchTo('contest')" @toDiscuss="switchTo('discuss')"
              @toAnnouncements="switchTo('announcements')" @toCourses="switchTo('courses')"
              @toAssignments="switchTo('assignments')" @toExams="switchTo('exams')"
              @toContests="switchTo('contests')">
    </head-bar>
  </div>
  <div>
    <div class="subview-container">
      <router-view></router-view>
    </div>
    <oj-footer></oj-footer>
  </div>
</div>
</template>

<script>
import headBar from '../components/headbar/head-bar-universal'
import ojFooter from '../components/footer/oj-footer.vue'

export default {
  components: {headBar, ojFooter},
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
        const strictModeBefore = this.$store.getters.isServerStrictMode
        const strictModeAfter = res.data.enable
        if (strictModeBefore !== strictModeAfter) {
          this.$store.commit('setVersion', {
            serverStrictMode: strictModeAfter
          })
        }
        if (strictModeAfter && !this.$store.getters.isAdministrator && !this.$store.getters.isClientStrictMode) {
          this.$store.commit('setVersion', {
            clientStrictMode: strictModeAfter
          })
          this.$router.replace('/strict')
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
