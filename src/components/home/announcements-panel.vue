<template>
  <b-card no-body>
    <template #header>
      <h6 class="m-1"><b-icon icon="patch-exclamation" class="mr-2"></b-icon>全站公告</h6>
    </template>

    <b-overlay :show="loading" rounded="sm">
      <b-list-group flush>
        <b-list-group-item v-bind:href="'/announcement/' + announcement.id" class="d-flex justify-content-between align-items-center"
                           v-for="announcement in announcements" v-bind:key="announcement.id">
          {{announcement.title}}
        </b-list-group-item>

        <b-list-group-item>
          <b-link class="text-dark text-decoration-none" href="/announcements">查看全部...</b-link>
        </b-list-group-item>
      </b-list-group>


      <b-card-body v-if="loading" class="m-4">
        正在加载
      </b-card-body>
      <b-card-body v-else-if="statusCode !== 200">
        [{{statusCode}}] 网络请求出错，内容获取失败。
      </b-card-body>
      <b-card-body v-else-if="announcements.length === 0">
        没有全站公告。
      </b-card-body>
    </b-overlay>
  </b-card>

</template>

<script>
export default {
  name: "announcements-panel",
  data: function () {
    return {
      announcements: [],
      loading: false,
      statusCode: 200,
      hasMoreAnnouncements: false,
      announcementsLimit: 4
    }
  },
  mounted () {
    this.$http.get(`${window.backendOrigin}/api/announcement/global?limit=${this.announcementsLimit}`).then(res => {
      this.announcements = res.data
      this.loading = false
    }, e => {
      console.log(e)
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
