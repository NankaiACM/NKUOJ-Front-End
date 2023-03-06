<template>
  <nav class="navbar navbar-expand p-4">
    <div class="container">
      <a href="/">
        <img class="head-bar-slogan" src="../../assets/nkuoj-slogan.svg" alt="Nankai University Online Judge">
      </a>
      <div class="navbar-nav me-auto mb-2 mb-lg-0 d-none d-sm-block">
        <button type="button" class="btn btn-rounded-purple ms-2" @click="navigateTo('/home')"><span
          class="d-flex align-items-center flex-shrink-0 overflow-hidden"><span><IconHouse/></span><span
          class="ms-2 text-truncate">主页</span></span></button>
        <button type="button" class="btn btn-rounded-purple ms-2" @click="navigateTo('/problem-list')"><span
          class="d-flex align-items-center flex-shrink-0 overflow-hidden"><span><IconJournalCode/></span><span
          class="ms-2 text-truncate">题库</span></span></button>
        <button type="button" class="btn btn-rounded-purple ms-2" @click="navigateTo('/submissions')"><span
          class="d-flex align-items-center flex-shrink-0 overflow-hidden"><span><IconClipboardCheck/></span><span
          class="ms-2 text-truncate">记录</span></span></button>
        <button type="button" class="btn btn-rounded-purple ms-2" @click="navigateTo('/bulletin')"><span
          class="d-flex align-items-center flex-shrink-0 overflow-hidden"><span><IconMegaphone/></span><span
          class="ms-2 text-truncate">公告</span></span></button>
      </div>
      <div class="nav-item dropdown d-none d-sm-block">
        <a class="nav-link dropdown-toggle text-purple" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ userDataStore.nickname }}
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">用户中心</a></li>
          <li><a class="dropdown-item" href="#">进入考试</a></li>
          <li><a class="dropdown-item" href="#">管理面板</a></li>
          <li><a class="dropdown-item" href="#">退出登录</a></li>
        </ul>
      </div>
      <div class="nav-item dropstart d-block d-sm-none">
        <a class="nav-link dropdown-toggle text-purple" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          菜单
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">主页</a></li>
          <li><a class="dropdown-item" href="#">题库</a></li>
          <li><a class="dropdown-item" href="#">记录</a></li>
          <li><a class="dropdown-item" href="#">公告</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#">用户中心</a></li>
          <li><a class="dropdown-item" href="#">进入考试</a></li>
          <li><a class="dropdown-item" href="#">管理面板</a></li>
          <li><a class="dropdown-item" href="#">退出登录</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

import {useStrictModeStore} from "@/stores/strict-mode";
import {useUserDataStore} from "@/stores/user-data";
import IconHouse from "@/components/icons/IconHouse.vue";
import IconJournalCode from "@/components/icons/IconJournalCode.vue";
import IconMegaphone from "@/components/icons/IconMegaphone.vue";
import IconClipboardCheck from "@/components/icons/IconClipboardCheck.vue";
import router from "@/router";

export default {
  name: 'HeadBarUniversal',
  components: {IconClipboardCheck, IconMegaphone, IconJournalCode, IconHouse},
  setup() {
    const strictModeStore = useStrictModeStore()
    const userDataStore = useUserDataStore()
    return {
      userDataStore, strictModeStore
    }
  },
  methods: {
    confirmLogout: function () {
      this.$bvModal.msgBoxConfirm("真的要退出登录吗？", {
        title: '提示',
        centered: true,
        okTitle: '退出登录',
        cancelTitle: '取消'
      }).then(value => {
        if (value) {
          window.location.push('/logout')
        }
      })
    },
    enableClientStrictModeAndRedirect: function () {
      this.strictModeStore.setClientStrictMode(true)
      window.location.push('/strict/home')
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
