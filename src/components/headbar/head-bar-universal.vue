<template>
<div>
  <div class="container-fluid bg-light shadow-sm">
    <div class="container">
      <b-navbar class="navbar-expand-lg" toggleable="lg" type="light" variant="light">
        <img class="slogan" src="../../assets/nkuoj-slogan.svg" v-on:click="$emit('toHome')" alt="Nankai University Online Judge">

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="$emit('toHome')">主页</b-nav-item>
            <b-nav-item @click="$emit('toProblem')">题目</b-nav-item>
            <b-nav-item @click="$emit('toStatus')">记录</b-nav-item>
<!--            <b-nav-item @click="$emit('toContest')">竞考</b-nav-item>-->
<!--            <b-nav-item @click="$emit('toDiscuss')">讨论</b-nav-item>-->
<!--            <b-nav-item @click="$emit('toVideos')">视频</b-nav-item>-->
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{$store.getters.getUserData.nickname}}</em>
              </template>
              <b-dropdown-item href="/profile">用户中心</b-dropdown-item>
              <b-dropdown-item href="/admin/home" v-if="$store.getters.isAdministrator">管理面板</b-dropdown-item>
              <b-dropdown-item href="/logout">退出</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'head-bar-universal'
}
</script>

<style lang="less">
.slogan {
  height: 50px;
  margin: 10px;
}
</style>
