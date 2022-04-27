<template>
  <b-card no-body>
    <template #header>
      <h6 class="m-1"><b-icon icon="bell" class="mr-2"></b-icon>全站公告</h6>
    </template>

      <b-list-group flush>
        <b-list-group-item button @click="$router.push('/announcement/' + announcement.id)" class="d-flex justify-content-between align-items-center"
                           v-for="announcement in announcements" v-bind:key="announcement.id">
          {{announcement.title}}
        </b-list-group-item>

        <b-list-group-item button @click="$router.push('/announcements')" v-if="announcements.length > 0">
          查看全部...
        </b-list-group-item>
      </b-list-group>


    <b-card-body v-if="loading">
      <b-skeleton width="85%"></b-skeleton>
      <b-skeleton width="55%"></b-skeleton>
      <b-skeleton width="64%"></b-skeleton>
      <b-skeleton width="90%"></b-skeleton>
      <b-skeleton width="40%"></b-skeleton>
      <b-skeleton width="100%"></b-skeleton>
      <b-skeleton width="72%"></b-skeleton>
      <b-skeleton width="80%"></b-skeleton>
    </b-card-body>
      <b-card-body v-else-if="statusCode !== 200">
        [{{statusCode}}] 网络请求出错，内容获取失败。
      </b-card-body>
      <b-card-body v-else-if="announcements.length === 0">
        没有全站公告。
      </b-card-body>
  </b-card>

</template>

<script>
export default {
  name: "announcements-panel",
  data: function () {
    return {
      announcements: [],
      loading: true,
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
