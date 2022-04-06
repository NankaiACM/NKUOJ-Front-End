<template>
  <div id="announcements">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4">全站公告</h1>
        </div>
      </div>
      <div class="container">
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-card>
              <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                          v-for="i in Array(42).keys()" :key="i"></b-skeleton>
            </b-card>
          </template>

          <b-card :title="announcement.title" :sub-title="`${getLocaleDate(announcement.time)}`" v-for="announcement in announcements"
                  :key="announcement.id" class="mb-3">
            <b-card-text>
              <pre class="text-wrap">{{announcement.content}}</pre>
            </b-card-text>

            <b-link :href="`/announcement/${announcement.id}`" class="text-decoration-none text-muted">查看详情</b-link>
          </b-card>

        </b-skeleton-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import date2Text from "@/util/date";

export default {
  name: "announcements",
  data: function () {
    return {
      announcements: {},
      loading: true
    }
  },
  mounted() {
    this.$http.get(`${window.backendOrigin}/api/announcement/global`).then(res => {
      this.announcements = res.data
      this.loading = false
    }, e => {
      console.log(e)
    })
  },
  methods: {
    getLocaleDate: function (string) {
      return date2Text(string)
    }
  }
}
</script>

<style scoped>

</style>
