<template>
  <div id="assignments">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4">我的作业</h1>
          <p class="lead">查看和浏览可完成的作业。</p>
        </div>
      </div>
      <div class="container">
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                        v-for="i in Array(42).keys()" :key="i"></b-skeleton>
          </template>

          <b-list-group>
            <b-list-group-item v-bind:href="'/assignment/' + assignment.id" v-for="assignment in assignments" v-bind:key="assignment.id">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{assignment.name}}</h5>
                <small>{{getLocaleDate(assignment.end)}} 截止</small>
              </div>
              <p class="mb-1">{{assignment.courseName ? assignment.courseName : '无所属课程'}}</p>
            </b-list-group-item>
          </b-list-group>
          <h5 v-if="loading" class="m-5 text-center">
            正在加载
          </h5>
          <h5 v-else-if="statusCode !== 200" class="m-5 text-center">
            [{{statusCode}}] 网络请求出错，内容获取失败。
          </h5>
          <h5 v-else-if="assignments.length === 0" class="m-5 text-center">
            暂无作业。
          </h5>

        </b-skeleton-wrapper>
      </div>
    </div>
  </div>

</template>

<script>
import date2Text from "@/util/date";

export default {
  name: "assignments",
  data: function () {
    return {
      assignments: [],
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
    this.$http.get(`${window.backendOrigin}/api/assignment/open`).then(res => {
      this.assignments = res.data
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
