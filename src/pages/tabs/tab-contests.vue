<template>
  <div id="tab-contests">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4"><b-icon icon="trophy" class="mr-1"></b-icon>我的竞赛</h1>
          <p class="lead">查看我报名的竞赛。</p>
        </div>
      </div>
      <div class="container">
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                        v-for="i in Array(42).keys()" :key="i"></b-skeleton>
          </template>

          <b-list-group v-if="contests && contests.length > 0">
            <b-list-group-item button @click="$router.push('/contest/' + contest.id)" v-for="contest in contests" v-bind:key="contest.id">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{contest.name}}</h5>
                <small>{{getLocaleDate(contest.end)}} 截止</small>
              </div>
              <p class="mb-1">{{contest.courseName ? contest.courseName : '无所属课程'}}</p>
            </b-list-group-item>
          </b-list-group>
          <h5 v-if="loading" class="m-5 text-center">
            正在加载
          </h5>
          <h5 v-else-if="statusCode !== 200" class="m-5 text-center">
            [{{statusCode}}] 网络请求出错，内容获取失败。
          </h5>
          <h5 v-else-if="contests.length === 0" class="m-5 text-center">
            暂无已报名的竞赛。
          </h5>

        </b-skeleton-wrapper>
      </div>
    </div>
  </div>

</template>

<script>
import date2Text from "@/util/date-to-str";

export default {
  name: "tab-contests",
  data: function () {
    return {
      contests: [],
      loading: true,
      statusCode: 200
    }
  },
  methods: {
    getLocaleDate: function (string) {
      return date2Text(string)
    }
  },
  mounted () {
    this.$http.get(`${window.backendOrigin}/api/contest`).then(res => {
      this.contests = res.data
      this.loading = false
    }, e => {
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
