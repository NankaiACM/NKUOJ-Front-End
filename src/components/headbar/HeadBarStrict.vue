<template>
  <nav class="navbar navbar-expand p-4">
    <div class="container">
      <a href="/">
        <img class="head-bar-slogan" src="../../assets/nkuoj-slogan.svg" alt="Nankai University Online Judge">
      </a>
      <div class="navbar-nav me-auto mb-2 mb-lg-0 d-none d-sm-block h-100">
        <div class="d-inline-flex align-items-center">
          <span class="text-purple" style="font-size: x-large;">考试模式</span>
        </div>
      </div>
      <div class="nav-item dropdown d-none d-sm-block">
        <a class="nav-link dropdown-toggle text-purple" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ userDataStore.nickname }}
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="/profile">用户中心</a></li>
          <li><a class="dropdown-item" href="/home" @click="disableClientStrictModeAndRedirect()" v-if="userDataStore.isAdministrator || !strictModeStore.serverStrictMode">退出考试</a></li>
          <li><a class="dropdown-item" href="/admin" v-if="userDataStore.isAdministrator">管理面板</a></li>
          <li><a class="dropdown-item" href="#" @click="confirmLogout()">退出登录</a></li>
        </ul>
      </div>
      <div class="nav-item dropstart d-block d-sm-none">
        <a class="nav-link dropdown-toggle text-purple" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          菜单
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="/profile">用户中心</a></li>
          <li><a class="dropdown-item" href="/home" @click="disableClientStrictModeAndRedirect()" v-if="userDataStore.isAdministrator || !strictModeStore.serverStrictMode">退出考试</a></li>
          <li><a class="dropdown-item" href="/admin" v-if="userDataStore.isAdministrator">管理面板</a></li>
          <li><a class="dropdown-item" href="#" @click="confirmLogout()">退出登录</a></li>
        </ul>
      </div>
    </div>
    <ModalConfirmBox ref="confirm_logout"/>
    <ModalMsgBox ref="quit_strict_msg_modal"/>
  </nav>
</template>

<script>

import {useStrictModeStore} from "@/stores/strict-mode";
import {useUserDataStore} from "@/stores/user-data";
import router from "@/router";
import ModalConfirmBox from "@/components/modal/ModalConfirmBox.vue";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";

export default {
  name: 'HeadBarStrict',
  components: {ModalMsgBox, ModalConfirmBox},
  setup() {
    const strictModeStore = useStrictModeStore();
    const userDataStore = useUserDataStore();
    return {
      userDataStore, strictModeStore
    }
  },
  methods: {
    confirmLogout: function () {
      this.$refs.confirm_logout.show('提示', '真的要退出登录吗？', () => {router.push('/logout');});
    },
    disableClientStrictModeAndRedirect: function () {
      if (this.userDataStore.isAdministrator || !this.strictModeStore.serverStrictMode) {
        this.strictModeStore.setClientStrictMode(false);
        router.push('/home');
      } else {
        this.$refs.quit_strict_msg_modal.show('操作失败', '没有权限');
      }
    },
    navigateTo: function (path) {
      router.push(path);
    }
  }
}
</script>

<style>
.head-bar-slogan {
  height: 50px;
  margin: 10px;
}
</style>
