<template>
  <div>
    <div class="container-fluid bg-light shadow-sm">
      <div class="container">
        <b-navbar class="navbar-expand-lg" toggleable="lg" type="light" variant="light">
          <a href="/">
            <img class="slogan" src="../../assets/nkuoj-slogan.svg" alt="Nankai University Online Judge">
          </a>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item>算法导论考试</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <em>{{$store.getters.getUserData.nickname}}</em>
                </template>
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
  name: 'head-bar-contest'
}
</script>

<style scoped>
.slogan {
  height: 50px;
  margin: 10px;
}
</style>
