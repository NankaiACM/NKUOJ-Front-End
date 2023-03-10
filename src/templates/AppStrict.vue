<template>
  <div>
    <HeadBarStrict class="w-100">
    </HeadBarStrict>
    <div>
      <RouterView/>
    </div>
  </div>
</template>

<script>
import HeadBarStrict from "@/components/headbar/HeadBarStrict.vue";
import {useStrictModeStore} from "@/stores/strict-mode";
import {useUserDataStore} from "@/stores/user-data";
import axios from "axios";
import router from "@/router";

export default {
  components: {HeadBarStrict},
  name: 'AppStrict',
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
      // check user cookies validity
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
            router.replace('/login');
          }
        });
      }
      // check strict mode enabled
      await axios.get(`/api/version/strict-mode`).then(res => {
        const strictModeBefore = this.strictModeStore.serverStrictMode;
        const strictModeAfter = res.data.enable;
        if (strictModeBefore !== strictModeAfter) {
          this.strictModeStore.setServerStrictMode(strictModeAfter);
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
