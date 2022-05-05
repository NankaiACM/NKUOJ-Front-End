<template>
  <b-card no-body>
    <template #header>
      <h6 class="m-1">
        <b-icon icon="trophy" class="mr-2"></b-icon>
        我的竞赛
      </h6>
    </template>

    <b-list-group flush v-if="contests && contests.length > 0">
      <b-list-group-item button @click="$router.push('/contest/' + contest.id)" v-for="contest in contests" v-bind:key="contest.id">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{contest.name}}</h5>
          <small>{{getLocaleDate(contest.end)}} 截止</small>
        </div>
        <p class="mb-1">{{contest.courseName ? contest.courseName : '无所属课程'}}</p>
      </b-list-group-item>
    </b-list-group>

    <b-card-body v-if="loading">
      <b-skeleton width="85%"></b-skeleton>
      <b-skeleton width="55%"></b-skeleton>
    </b-card-body>
    <b-card-body v-else-if="statusCode !== 200">
      [{{ statusCode }}] 网络请求出错，内容获取失败。
    </b-card-body>
    <b-card-body v-else-if="contests.length === 0">
      没有正在进行中的竞赛，请前往竞赛页面查看所有竞赛。
    </b-card-body>
  </b-card>
</template>

<script>
import date2Text from "@/util/date-to-str";

export default {
  name: 'user-contests-panel',
  data: function () {
    return {
      contests: [],
      loading: false,
      statusCode: 200
    }
  },
  methods: {
    getLocaleDate: function (string) {
      return date2Text(string)
    }
  },
  mounted() {
    this.$http.get(`${window.backendOrigin}/api/contest/open`).then(res => {
      this.contests = res.data
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
