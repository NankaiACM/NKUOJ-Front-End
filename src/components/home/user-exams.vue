<template>
  <b-card no-body>
    <template #header>
      <h6 class="m-1">
        <b-icon icon="card-checklist" class="mr-2"></b-icon>
        我的考试
      </h6>
    </template>

    <b-list-group flush>
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
    submit: function () {

    }
  },
  mounted() {
    this.$http.get(`${window.backendOrigin}/api/user/exams`).then(res => {
      this.exams = res.data
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
