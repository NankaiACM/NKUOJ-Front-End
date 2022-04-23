<template>
  <b-skeleton-wrapper :loading="loading || problemsListLoading" rounded="sm" >
    <template #loading>
      <b-card>
        <b-skeleton width="85%"></b-skeleton>
        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </b-card>
    </template>

    <b-card class="container-fluid" v-if="problems.length > 1">
      <h6 class="text-center">题目列表</h6>
      <div class="container-fluid d-flex justify-content-center pt-4">
        <b-button-group>
          <b-button :variant="['outline-secondary', 'outline-warning', 'outline-success'][problem.status]"
                    v-b-popover.hover.top="['未提交', '未通过', '已通过'][problem.status]"
                    :title="problem.name" v-for="problem in problems" :key="problem.pid" :pressed="problem.pid === pid"
                    @click="$emit('switchToProblem', $event, problem.pid)">{{problem.name[0]}}</b-button>
        </b-button-group>
      </div>
    </b-card>
  </b-skeleton-wrapper>
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
