<template>
  <b-card no-body header="我的作业">
    <b-overlay :show="loading" rounded="sm">
      <b-list-group flush>
        <b-list-group-item v-bind:href="'/assignment/' + assignment.id" v-for="assignment in assignments" v-bind:key="assignment.id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{assignment.name}}</h5>
            <small>{{getLocaleDate(assignment.end)}} 截止</small>
          </div>
          <p class="mb-1">{{assignment.courseName ? assignment.courseName : '无所属课程'}}</p>
        </b-list-group-item>
      </b-list-group>

      <b-card-body v-if="loading" class="m-4">
        正在加载
      </b-card-body>
      <b-card-body v-else-if="statusCode !== 200" class="m-3">
        [{{statusCode}}] 网络请求出错，内容获取失败。
      </b-card-body>
      <b-card-body v-else-if="assignments.length === 0" class="m-3">
        暂无作业。
      </b-card-body>
    </b-overlay>
  </b-card>
</template>

<script>
import date2Text from "@/util/date";

export default {
  name: 'user-assignments',
  data: function () {
    return {
      assignments: [],
      loading: false,
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
      console.log(e)
      this.success = false
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
