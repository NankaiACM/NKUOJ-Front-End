<template>
  <div class="container">
    <div class="jumbotron text-center">
      <h1 class="display-4">{{ examData.name }}</h1>
      <h4><span class="badge bg-danger text-light">考试</span></h4>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="container">
          <h5 class="card-title mt-4">考试详情</h5>
          <b-skeleton-wrapper :loading="isDetailsLoading">
            <template #loading>
              <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                          v-for="i in Array(5).keys()" :key="i"></b-skeleton>
            </template>

            <p>
              <span class="h6" v-if="examData.courseName">课程：</span>
              {{ examData.courseName }}
            </p>
            <p>
              <span class="h6">介绍：</span>
              {{ examData.description }}
            </p>
            <p>
              <span class="h6">时间：</span>
              {{ getLocaleDate(examData.begin) }} 开始，至 {{ getLocaleDate(examData.end) }} 截止
            </p>
            <p>
              <span class="h6">状态：</span>
              <span v-if="examData.open" class="text-success">可提交</span>
              <span v-else class="text-danger">无法提交</span>
            </p>
          </b-skeleton-wrapper>
        </div>
        <div class="container">
          <h5 class="card-title mt-4">完成题目</h5>
          <b-skeleton-wrapper :loading="isProblemsLoading">
            <template #loading>
              <b-card>
                <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                            v-for="i in Array(10).keys()" :key="i"></b-skeleton>
              </b-card>
            </template>

            <b-list-group>
              <b-list-group-item :href="'/problem/' + problem.pid" class="flex-column align-items-start"
                                 v-for="problem in problemsData" v-bind:key="problem.pid">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ problem.name }}</h5>
                </div>

                <small class="text-muted" v-if="problem.status === 0">未提交</small>
                <small class="text-warning" v-else-if="problem.status === 1">未通过</small>
                <small class="text-success" v-else>已通过</small>
              </b-list-group-item>
              <b-list-group-item v-if="problemsData.length === 0" class="pt-4 pb-4">
                本次考试暂无题目。
              </b-list-group-item>
            </b-list-group>
          </b-skeleton-wrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import date2Text from "@/util/date";

export default {
  name: 'exam',
  data: function () {
    return {
      examId: '',
      examData: {},
      problemsData: [],
      isDetailsLoading: true,
      isProblemsLoading: true
    }
  },
  methods: {
    loadAssignmentData: function () {
      this.$http.get(`${window.backendOrigin}/api/exam/id/${this.examId}`).then(res => {
        this.examData = res.data
        this.isDetailsLoading = false
      })
      this.$http.get(`${window.backendOrigin}/api/problem/problemset/${this.examId}`).then(res => {
        this.problemsData = res.data
        this.isProblemsLoading = false
      })
    },
    getLocaleDate: function (string) {
      return date2Text(string)
    }
  },
  mounted() {
    this.examId = this.$route.params.examId
    this.loadAssignmentData()
  }
}
</script>

<style scoped>

</style>
