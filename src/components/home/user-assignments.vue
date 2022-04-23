<template>
  <b-card no-body>
    <template #header>
      <h6 class="m-1"><b-icon icon="vector-pen" class="mr-2"></b-icon>我的作业</h6>
    </template>

    <b-list-group flush v-if="assignments && assignments.length > 0">
      <b-list-group-item button @click="$router.push('/assignment/' + assignment.id)" v-for="assignment in assignments" v-bind:key="assignment.id">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{assignment.name}}</h5>
          <small>{{getLocaleDate(assignment.end)}} 截止</small>
        </div>
        <p class="mb-1">{{assignment.courseName ? assignment.courseName : '无所属课程'}}</p>
      </b-list-group-item>
    </b-list-group>

    <b-card-body v-if="loading">
      <b-skeleton width="85%"></b-skeleton>
      <b-skeleton width="55%"></b-skeleton>
    </b-card-body>
    <b-card-body v-else-if="statusCode !== 200">
      [{{statusCode}}] 网络请求出错，内容获取失败。
    </b-card-body>
    <b-card-body v-else-if="assignments.length === 0">
      暂无作业。过往作业请前往课程页面查看。
    </b-card-body>
  </b-card>
</template>

<script>
import date2Text from "@/util/date";

export default {
  name: 'user-assignments',
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
      console.log(e)
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
