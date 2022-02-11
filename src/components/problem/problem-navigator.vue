<template>
  <b-overlay :show="loading || problemsListLoading" rounded="sm">
    <b-card class="container-fluid">
      <small class="display-6 d-flex justify-content-center text-muted">题目列表</small>

      <div class="container-fluid d-flex justify-content-center pt-4">
        <b-button-group>
          <b-button :variant="['outline-secondary', 'outline-warning', 'outline-success'][problem.status]"
                    v-b-popover.hover.top="['未提交', '未通过', '已通过'][problem.status]"
                    :title="problem.name" v-for="problem in problems" :key="problem.pid" :pressed="problem.pid === pid"
                    @click="switchToProblem(problem.pid)">{{problem.name[0]}}</b-button>
        </b-button-group>
      </div>
    </b-card>
  </b-overlay>
</template>

<script>
export default {
  name: "problem-navigator",
  data: function () {
    return {
      problems: [],
      problemsListLoading: true
    }
  },
  props: {
    psid: Number,
    pid: Number,
    loading: Boolean
  },
  methods: {
    switchToProblem: function (pid) {
      window.location.href = (`/problem/${pid}`)
    },
    loadProblemsList: function () {
      this.$http.get(`${window.backendOrigin}/api/problem/problemset/${this.psid}`).then(res => {
          this.problems = res.data
          this.problemsListLoading = false
      })
    }
  },
  mounted() {
    this.loadProblemsList()
  }
}
</script>

<style scoped>

</style>
