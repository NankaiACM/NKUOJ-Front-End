<template>
<div id="user-panel">
  <b-card no-body>
    <div class="d-flex align-items-center m-3">
      <b-avatar class="mr-3"></b-avatar>
      <span class="mr-auto">{{$store.getters.getUserData.nickname}}</span>
      <span class="text-secondary">#{{uidToStr($store.getters.getUID)}}</span>
    </div>
    <b-list-group flush>
      <b-list-group-item button @click="$router.push('/profile')" class="text-center"><b-icon icon="person"></b-icon>用户中心</b-list-group-item>
      <b-list-group-item button @click="$router.push('/admin/home')" v-if="$store.getters.isAdministrator" class="text-center"><b-icon icon="gear"></b-icon>管理面板</b-list-group-item>
      <b-list-group-item button @click="confirmLogout" class="text-center text-danger"><b-icon icon="person-x"></b-icon>退出登录</b-list-group-item>
    </b-list-group>
  </b-card>
</div>
</template>

<script>
import uid2Str from '@/util/uidToStr'

export default {
  name: 'user-panel',
  methods: {
    uidToStr: function (uid) {
      return uid2Str(uid)
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

<style scoped>

</style>
