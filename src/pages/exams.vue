<template>
  <div id="exams">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4">我的考试</h1>
          <p class="lead">查看我报名的考试。</p>
        </div>
      </div>
      <div class="container">
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                        v-for="i in Array(42).keys()" :key="i"></b-skeleton>
          </template>

          <b-list-group v-if="exams && exams.length > 0">
            <b-list-group-item v-bind:href="'/exam/' + exam.id" v-for="exam in exams" v-bind:key="exam.id">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{exam.name}}</h5>
                <small>{{getLocaleDate(exam.end)}} 截止</small>
              </div>
              <p class="mb-1">{{exam.courseName ? exam.courseName : '无所属课程'}}</p>
            </b-list-group-item>
          </b-list-group>
          <h5 v-if="loading" class="m-5 text-center">
            正在加载
          </h5>
          <h5 v-else-if="statusCode !== 200" class="m-5 text-center">
            [{{statusCode}}] 网络请求出错，内容获取失败。
          </h5>
          <h5 v-else-if="exams.length === 0" class="m-5 text-center">
            暂无已报名的考试。
          </h5>

        </b-skeleton-wrapper>
      </div>
    </div>
  </div>

</template>

<script>
import date2Text from "@/util/date";

export default {
  name: "exams",
  data: function () {
    return {
      exams: [],
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
    this.$http.get(`${window.backendOrigin}/api/exam`).then(res => {
      this.exams = res.data
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
