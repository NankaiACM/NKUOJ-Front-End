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

  }
}
</script>

<style scoped>

</style>
