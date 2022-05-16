<template>
  <b-skeleton-wrapper :loading="loading || problemsListLoading" rounded="sm" v-if="problems.length > 1">
    <template #loading>
      <b-skeleton width="85%"></b-skeleton>
      <b-skeleton width="55%"></b-skeleton>
    </template>

    <div class="container-fluid d-flex justify-content-center pt-4">
      <b-button-group>
        <b-button :variant="['outline-secondary', 'outline-warning', 'outline-success'][problem.status]"
                  v-b-popover.hover.top="['未提交', '未通过', '已通过'][problem.status]"
                  :title="problem.name" v-for="(problem, index) in problems" :key="problem.pid" :pressed="problem.pid === pid"
                  @click="$emit('switchToProblem', $event, problem.pid)">{{ordinalNumber2Str(index + 1)}}</b-button>
      </b-button-group>
    </div>
  </b-skeleton-wrapper>
</template>

<script>
import ordinalNumber2Str from "@/util/ordinal-number-to-str";

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
    },
    ordinalNumber2Str: function (val) {
      return ordinalNumber2Str(val)
    }
  },
  mounted() {
    this.loadProblemsList()
  }
}
</script>

<style scoped>

</style>
