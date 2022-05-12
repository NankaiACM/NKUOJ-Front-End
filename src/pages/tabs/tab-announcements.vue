<template>
  <div id="tab-announcements">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4"><b-icon icon="bell" class="mr-1"></b-icon>全站公告</h1>
          <p class="lead">查看和浏览全站公告。</p>
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

          <b-card  v-for="announcement in announcements"
                  :key="announcement.id" class="mb-3">
            <h4><b-badge v-if="announcement.top" class="mr-2">置顶</b-badge>{{announcement.title}}</h4>
            <h6 class="text-muted">{{`${getLocaleDate(announcement.time)}`}}</h6>
            <b-card-text>
              <pre>{{announcement.content}}</pre>
            </b-card-text>

            <b-link @click="$router.push(`/announcement/${announcement.id}`)" class="text-decoration-none text-muted">查看详情</b-link>
          </b-card>

        </b-skeleton-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import date2Text from "@/util/date-to-str";

export default {
  name: "tab-announcements",
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
pre {
  white-space: pre-wrap;
  word-break: keep-all;
}
</style>
