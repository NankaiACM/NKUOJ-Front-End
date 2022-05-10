<template>
  <div class="container-fluid bg-light shadow-sm">
    <div class="container">
      <b-navbar class="navbar-expand-lg" toggleable="lg" type="light" variant="light">
        <b-link href="/">
          <img class="head-bar-slogan" src="../../assets/nkuoj-slogan.svg" alt="Nankai University Online Judge">
        </b-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="$emit('toHome')"><b-icon icon="house" class="mr-1"></b-icon>主页</b-nav-item>
            <b-nav-item @click="$emit('toProblem')"><b-icon icon="collection" class="mr-1"></b-icon>题库</b-nav-item>
            <b-nav-item @click="$emit('toStatus')"><b-icon icon="bar-chart" class="mr-1"></b-icon>记录</b-nav-item>
            <b-nav-item @click="$emit('toAnnouncements')"><b-icon icon="bell" class="mr-1"></b-icon>公告</b-nav-item>
            <b-nav-item @click="$emit('toCourses')"><b-icon icon="journals" class="mr-1"></b-icon>课程</b-nav-item>
            <b-nav-item @click="$emit('toAssignments')"><b-icon icon="vector-pen" class="mr-1"></b-icon>作业</b-nav-item>
            <b-nav-item @click="$emit('toExams')"><b-icon icon="card-checklist" class="mr-1"></b-icon>考试</b-nav-item>
            <b-nav-item @click="$emit('toContests')"><b-icon icon="trophy" class="mr-1"></b-icon>竞赛</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{$store.getters.getUserData.nickname}}</em>
              </template>
              <b-dropdown-item @click="$router.push('/profile')"><b-icon icon="person" class="mr-1"></b-icon>用户中心</b-dropdown-item>
              <b-dropdown-item @click="showDrawStick"><b-icon icon="dice5" class="mr-1"></b-icon>每日签到</b-dropdown-item>
              <b-dropdown-item @click="$router.push('/strict/home')" v-if="$store.getters.isAdministrator"><b-icon icon="signpost2" class="mr-1"></b-icon>进入考试</b-dropdown-item>
              <b-dropdown-item @click="$router.push('/admin/home')" v-if="$store.getters.isAdministrator"><b-icon icon="gear" class="mr-1"></b-icon>管理面板</b-dropdown-item>
              <b-dropdown-item @click="confirmLogout"><b-icon icon="person-x" class="mr-1"></b-icon>退出登录</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <fortune-stick-modal ref="draw-stick-modal"></fortune-stick-modal>
  </div>
</template>

<script>
import FortuneStickModal from "@/components/others/fortune-stick-modal";
export default {
  name: 'head-bar-universal',
  components: {FortuneStickModal},
  methods: {
    showDrawStick: function () {
      this.$refs['draw-stick-modal'].show()
    },
    confirmLogout: function () {
      this.$bvModal.msgBoxConfirm("真的要退出登录吗？", {title: '提示', centered: true, okTitle: '退出登录', cancelTitle: '取消'}).then(value => {
        if (value) {
          this.$router.push('/logout')
        }
      })
    }
  }
}
</script>

<style lang="less">
.head-bar-slogan {
  height: 50px;
  margin: 10px;
}
</style>
