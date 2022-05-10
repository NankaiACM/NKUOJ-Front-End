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
            <b-nav-item @click="$emit('toAdministrator')"><b-icon icon="gear" class="mr-1"></b-icon>管理中心</b-nav-item>
            <b-nav-item @click="$emit('toHome')"><b-icon icon="house" class="mr-1"></b-icon>主站</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{$store.getters.getUserData.nickname}}</em>
              </template>
              <b-dropdown-item @click="$router.push('/profile')"><b-icon icon="person" class="mr-1"></b-icon>用户中心</b-dropdown-item>
              <b-dropdown-item @click="$router.push('/admin/home')" v-if="$store.getters.isAdministrator"><b-icon icon="gear" class="mr-1"></b-icon>管理面板</b-dropdown-item>
              <b-dropdown-item @click="confirmLogout"><b-icon icon="person-x" class="mr-1"></b-icon>退出登录</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'head-bar-administrator',
  methods: {
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

<style scoped>
.head-bar-slogan {
  height: 50px;
  margin: 10px;
}
</style>
