<template>
  <div class="container">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="jumbotron text-center">
        <h1 class="display-4">{{assignmentData.name}}</h1>
        <p class="lead">{{assignmentData.courseName}}</p>
        <hr class="my-4">
        <p>{{assignmentData.during}} 截止</p>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="container">
            <h5 class="card-title mt-4">作业详情</h5>
            <p class="card-text">{{assignmentData.description}}</p>
          </div>
          <div class="container">
            <h5 class="card-title mt-4">完成题目</h5>
            <b-list-group>
              <b-list-group-item :href="'/assignment/' + assignmentId + '/problem/' + problem.id" class="flex-column align-items-start" v-for="problem in assignmentData.problems" v-bind:key="problem.id">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{problem.name}}</h5>
                  <small class="text-muted">分数：{{problem.score}}</small>
                </div>

                <small class="text-muted" v-if="problem.status === 0">未提交</small>
                <small class="text-warning" v-if="problem.status === 1">未通过</small>
                <small class="text-success" v-if="problem.status === 2">已通过</small>
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
      isLoading: true,
      answerText: ''
    }
  },
  methods: {
    loadAssignmentData: function () {
      this.$http.get(`${window.backendOrigin}/api/assignment/id/${this.assignmentId}`).then(res => {
        this.assignmentData = res.data
        this.assignmentData.during = this.assignmentData.during.substr(24, 19)
        this.isLoading = false
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
