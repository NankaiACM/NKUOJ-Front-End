<template>
  <b-card no-body>
    <template #header>
      <h6 class="m-1">
        <b-icon icon="card-checklist" class="mr-2"></b-icon>
        我的考试
      </h6>
    </template>

    <b-list-group flush v-if="exams && exams.length > 0">
      <b-list-group-item button @click="$router.push('/exam/' + exam.id)" v-for="exam in exams" v-bind:key="exam.id">
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
      没有正在进行中的考试，请前往考试页面查看所有考试。
    </b-card-body>
  </b-card>
</template>

<script>
import date2Text from "@/util/date";

export default {
  name: 'user-exams-panel',
  data: function () {
    return {
      exams: [],
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
    this.$http.get(`${window.backendOrigin}/api/exam/open`).then(res => {
      this.exams = res.data
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
