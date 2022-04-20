<template>
  <div class="container-fluid bg-light shadow-sm">
    <div class="container">
      <b-navbar class="navbar-expand-lg" toggleable="lg" type="light" variant="light">
        <a href="/">
          <img class="slogan" src="../../assets/nkuoj-slogan.svg" alt="Nankai University Online Judge">
        </a>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="$emit('toHome')">主页</b-nav-item>
            <b-nav-item @click="$emit('toProblem')">题目</b-nav-item>
            <b-nav-item @click="$emit('toStatus')">记录</b-nav-item>
            <b-nav-item @click="$emit('toAnnouncements')">公告</b-nav-item>
            <b-nav-item @click="$emit('toCourses')">课程</b-nav-item>
            <b-nav-item @click="$emit('toAssignments')">作业</b-nav-item>
            <b-nav-item @click="$emit('toExams')">考试</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{$store.getters.getUserData.nickname}}</em>
              </template>
              <b-dropdown-item href="/profile">用户中心</b-dropdown-item>
              <b-dropdown-item @click="showDrawStick">每日签到</b-dropdown-item>
              <b-dropdown-item href="/admin/home" v-if="$store.getters.isAdministrator">管理面板</b-dropdown-item>
              <b-dropdown-item href="/logout">退出</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <draw-stick ref="draw-stick-modal"></draw-stick>
  </div>
</template>

<script>
import DrawStick from "@/components/others/draw-stick";
export default {
  name: 'head-bar-universal',
  components: {DrawStick},
  methods: {
    showDrawStick: function () {
      this.$refs['draw-stick-modal'].show()
    }
  }
}
</script>

<style lang="less">
.slogan {
  height: 50px;
  margin: 10px;
}
</style>
