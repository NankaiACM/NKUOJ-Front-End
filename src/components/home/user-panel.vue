<template>
<div id="home-user-panel">
  <b-card no-body>
    <div class="d-flex align-items-center m-3">
      <b-avatar class="mr-3"></b-avatar>
      <span class="mr-auto">{{$store.getters.getUserData.nickname}}</span>
      <span class="text-secondary">@{{$store.getters.getUserData.username}}</span>
    </div>
    <b-list-group flush>
      <b-list-group-item href="/profile" class="text-center">用户中心</b-list-group-item>
      <b-list-group-item href="/admin/home" v-if="$store.getters.isAdministrator" class="text-center">管理面板</b-list-group-item>
      <b-list-group-item href="/logout" class="text-center text-danger">退出</b-list-group-item>
    </b-list-group>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'user-panel',
  methods: {

  }
}
</script>

<style scoped>

</style>
