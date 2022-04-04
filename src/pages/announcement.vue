<template>
  <div id="announcement">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-5 text-center">{{announcement.title}}</h1>
          <h4 class="text-center"><span class="badge bg-warning text-light">公告</span></h4>
          <p class="lead text-center">{{getLocaleDate(announcement.time)}}</p>
        </div>
      </div>

      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-card>
            <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                        v-for="i in Array(42).keys()" :key="i"></b-skeleton>
          </b-card>
        </template>

        <b-card title="详情">
          <b-card-text>
            <pre>{{announcement.content}}</pre>
          </b-card-text>
        </b-card>
      </b-skeleton-wrapper>
    </div>
  </div>
</template>

<script>
import date2Text from "@/util/date";

export default {
  name: "announcement",
  data: function () {
    return {
      loading: true,
      announcement: {}
    }
  },
  mounted() {
    this.$http.get(`${window.backendOrigin}/api/announcement/id/${this.$route.params.announcementId}`).then(res => {
      this.announcement = res.data
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
