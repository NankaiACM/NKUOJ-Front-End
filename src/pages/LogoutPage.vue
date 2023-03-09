<template>
  <div class="container oj-pattern-background h-100 w-100">
    <div class="d-flex flex-column h-100 justify-content-center align-items-center">
      <div class="d-flex justify-content-center align-items-center">
        <img class="slogan-logout" src="../assets/nkuoj-slogan.svg" alt="Nankai University Online Judge">
        <div class="vertical-separator-logout ms-3"></div>
        <span class="text-purple text-logout ms-3">登出</span>
      </div>
      <h4 class="text-center text-purple mt-4">您已经成功登出。</h4>
      <div>
        <a class="btn btn-outline-purple mt-3" href="/login" type="button">返回登录页</a>
      </div>
    </div>
  </div>
</template>

<script>
import {useUserDataStore} from "@/stores/user-data";
import axios from "axios";

export default {
  name: "LogoutPage",
  setup() {
    const userDataStore = useUserDataStore();
    return {
      userDataStore
    }
  },
  mounted() {
    axios.get('/api/logout');
    this.userDataStore.clear();
  }
}
</script>

<style scoped>
.slogan-logout {
  height: 100px;
}
.text-logout {
  font-size: xxx-large;
}
.vertical-separator-logout {
  height: 100px;
  width: 2px;
  background-color: #923262;
}
</style>
