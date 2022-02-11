<template>
  <b-card class="container-fluid">
    <small class="display-6 d-flex justify-content-center text-muted">题目列表</small>

<!--    <div class="container-fluid d-flex justify-content-center pt-4">-->
<!--      <b-button-group>-->
<!--        <b-button :variant="['outline-secondary', 'outline-warning', 'outline-success'][problem.status]" v-b-popover.hover.top="problem.name" :title="problem.label + '题'"-->
<!--                  v-for="problem in problemInfo.meta.problems" :key="problem.id" :pressed="problem.id === problemInfo.id" @click="switchToProblem(problem.id)">{{problem.label}}</b-button>-->
<!--      </b-button-group>-->
<!--    </div>-->
  </b-card>
</template>

<script>
export default {
  name: "problem-navigator",
  data: function () {
    return {
      problems: []
    }
  },
  props: {
    psid: Number
  },
  methods: {
    switchToProblem: function (pid) {
      window.location.href = (`/problem/${pid}`)
    },
    loadProblemsList: function () {

    }
  },
  watch: {
    psid: {
      handler() {
        this.loadProblemsList()
      }
    }
  }
}
</script>

<style scoped>

</style>
