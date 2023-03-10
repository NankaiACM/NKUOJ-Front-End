<template>
  <div class="oj-pattern-background">
    <HeadBarAdmin class="w-100">
    </HeadBarAdmin>
    <div>
      <RouterView/>
    </div>
  </div>
</template>

<script>
import {useStrictModeStore} from "@/stores/strict-mode";
import {useUserDataStore} from "@/stores/user-data";
import axios from "axios";
import router from "@/router";
import HeadBarAdmin from "@/components/headbar/HeadBarAdmin.vue";

export default {
  components: {HeadBarAdmin},
  name: 'AppAdmin',
  data: function () {
    return {
    }
  },
  setup() {
    const strictModeStore = useStrictModeStore();
    const userDataStore = useUserDataStore();
    return {
      userDataStore, strictModeStore
    }
  },
  methods: {
    switchTo: function (path) {
      if (this.$route.path === `/${path}`)
        return
      window.location.replace('/' + path)
    },
    updateSiteData: async function () {
      if (this.userDataStore.valid) {
        await axios.get(`/api/user`).then(res => {
          this.userDataStore.setUID(res.data.uid);
          this.userDataStore.setUsername(res.data.username);
          this.userDataStore.setNickname(res.data.nickname);
          this.userDataStore.setPermission(res.data.permission);
          this.userDataStore.setValid();
        }, error => {
          if (error.response.status === 401) {
            this.userDataStore.clear();
            window.location.replace('/login');
          }
        });
      }
      // check strict mode enabled
      await axios.get(`/api/version/strict-mode`).then(res => {
        const strictModeBefore = this.strictModeStore.serverStrictMode;
        const strictModeAfter = res.data.enable;
        if (strictModeBefore !== strictModeAfter) {
          this.strictModeStore.setServerStrictMode(strictModeAfter)
        }
        if (strictModeAfter && !this.userDataStore.isAdministrator && !this.strictModeStore.clientStrictMode) {
          this.strictModeStore.setClientStrictMode(strictModeAfter);
          window.location.replace('/strict');
        }
      });
    }
  },
  mounted () {
    this.updateSiteData();
  }
}
</script>

<style>
</style>
