<template>
  <b-card no-body header="我的作业">
    <b-overlay :show="loading" rounded="sm">
      <b-list-group flush>
        <b-list-group-item v-bind:href="'/assignment/' + assignment.id" v-for="assignment in assignments" v-bind:key="assignment.id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{assignment.name}}</h5>
            <small>{{assignment.deadline}}</small>
          </div>
          <p class="mb-1">{{assignment.courseName}}</p>
        </b-list-group-item>
      </b-list-group>

      <b-card-body v-if="loading">
        正在加载
      </b-card-body>
      <b-card-body v-else-if="statusCode !== 200">
        [{{statusCode}}] 网络请求出错，内容获取失败。
      </b-card-body>
      <b-card-body v-else-if="assignments.length === 0">
        暂无作业。
      </b-card-body>
    </b-overlay>
  </b-card>
</template>

<script>
export default {
  name: 'user-assignments',
  data: function () {
    return {
      assignments: [],
      loading: false,
      statusCode: 200
    }
  },
  mounted () {
    this.$http.get(`${window.backendOrigin}/api/assignments`).then(res => {
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
