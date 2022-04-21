<template>
  <b-card no-body>
    <template #header>
      <h6 class="m-1">
        <b-icon icon="card-checklist" class="mr-2"></b-icon>
        我的考试
      </h6>
    </template>

    <b-list-group flush>
      <b-list-group-item v-bind:href="'/exam/' + exam.id" v-for="exam in exams" v-bind:key="exam.id">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{exam.name}}</h5>
          <small>{{getLocaleDate(exam.end)}} 截止</small>
        </div>
        <p class="mb-1">{{exam.courseName ? exam.courseName : '无所属课程'}}</p>
      </b-list-group-item>
    </b-list-group>

    <b-card-body v-if="loading">
      <b-skeleton width="85%"></b-skeleton>
      <b-skeleton width="55%"></b-skeleton>
    </b-card-body>
    <b-card-body v-else-if="statusCode !== 200">
      [{{ statusCode }}] 网络请求出错，内容获取失败。
    </b-card-body>
    <b-card-body v-else-if="exams.length === 0">
      您没有报名的考试。
    </b-card-body>
  </b-card>
</template>

<script>
import date2Text from "@/util/date";

export default {
  name: 'user-exams',
  data: function () {
    return {
      exams: [],
      loading: false,
      statusCode: 200
    }
  },
  methods: {
    onItemClicked: function (contest) {
      if (contest.status === 0) {
        this.$router.push(`/contest/${this.$route.params.contestId}/authorize`)
      } else {
        this.$bvModal.msgBoxOk(`${contest.name} 未开始，请开始后再进入。`, {title: '提示', okTitle: '返回'})
      }
    },
    getLocaleDate: function (string) {
      return date2Text(string)
    }
  },
  mounted() {
    this.$http.get(`${window.backendOrigin}/api/exam/open`).then(res => {
      this.exams = res.data
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
