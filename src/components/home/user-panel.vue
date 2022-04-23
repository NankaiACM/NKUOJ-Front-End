<template>
<div id="home-user-panel">
  <b-card no-body>
    <div class="d-flex align-items-center m-3">
      <b-avatar class="mr-3"></b-avatar>
      <span class="mr-auto">{{$store.getters.getUserData.nickname}}</span>
      <span class="text-secondary">#{{uidToStr($store.getters.getUID)}}</span>
    </div>
    <b-list-group flush>
      <b-list-group-item button @click="$router.push('/profile')" class="text-center">用户中心</b-list-group-item>
      <b-list-group-item button @click="$router.push('/admin/home')" v-if="$store.getters.isAdministrator" class="text-center">管理面板</b-list-group-item>
      <b-list-group-item button @click="$router.push('/logout')" class="text-center text-danger">退出</b-list-group-item>
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
    }
  }
}
</script>

<style scoped>

</style>
