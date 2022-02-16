<template>
  <div class="container">
    <b-overlay :show="isDetailsLoading" rounded="sm">
      <div class="jumbotron text-center">
        <h1 class="display-4">{{assignmentData.name}}</h1>
        <p class="lead">{{assignmentData.courseName}}</p>
        <hr class="my-4">
        <p>{{assignmentData.begin}} 开始 {{assignmentData.end}} 截止</p>
        <p v-if="assignmentData.open" class="text-success">正在进行，可提交</p>
        <p v-else class="text-danger">未开始或已截至，无法提交</p>
      </div>
    </b-overlay>
    <b-overlay :show="isProblemsLoading" rounded="sm">
      <div class="card">
        <div class="card-body">
          <div class="container">
            <h5 class="card-title mt-4">作业详情</h5>
            <p class="card-text">{{assignmentData.description}}</p>
          </div>
          <div class="container">
            <h5 class="card-title mt-4">完成题目</h5>
            <b-list-group>
              <b-list-group-item :href="'/problem/' + problem.pid" class="flex-column align-items-start" v-for="problem in problemsData" v-bind:key="problem.pid">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{problem.name}}</h5>
                </div>

                <small class="text-muted" v-if="problem.status === 0">未提交</small>
                <small class="text-warning" v-else-if="problem.status === 1">未通过</small>
                <small class="text-success" v-else>已通过</small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: 'assignment',
  data: function () {
    return {
      assignmentId: '',
      assignmentData: {},
      problemsData: [],
      isDetailsLoading: true,
      isProblemsLoading: true
    }
  },
  methods: {
    loadAssignmentData: function () {
      this.$http.get(`${window.backendOrigin}/api/assignment/id/${this.assignmentId}`).then(res => {
        this.assignmentData = res.data
        this.isDetailsLoading = false
      })
      this.$http.get(`${window.backendOrigin}/api/problem/assignment/${this.assignmentId}`).then(res => {
        this.problemsData = res.data
        this.isProblemsLoading = false
      })
    }
  },
  mounted () {
    this.assignmentId = this.$route.params.assignmentId
    this.loadAssignmentData()
  }
}
</script>

<style scoped>

</style>
