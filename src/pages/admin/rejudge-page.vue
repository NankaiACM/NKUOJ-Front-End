<template>
  <div class="container">
    <b-alert show variant="danger" class="mb-4">
      <h4 class="alert-heading">！！！警告！！！</h4>
      <p>
        这里是重测页面，重测前请三思！
      </p>
      <hr>
      <p class="mb-0">
        对某一个提交进行重测往往可以接受。但是对整个问题的所有提交进行重测会导致OJ服务器进行大量的计算。
      </p>
      <p class="mb-0">
        这可能会导致大规模的提交排队现象！
      </p>
    </b-alert>

    <b-card title="重测">
      <div class="container pl-4 pr-4">
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>
            对提交重测
          </b-input-group-prepend>
          <b-input-group-prepend is-text>
            <b-icon icon="geo"></b-icon>
          </b-input-group-prepend>
          <b-form-input type="number" no-wheel placeholder="请输入提交ID..." v-model="sid"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-secondary" v-on:click="rejudgeSubmission">重测</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-input-group class="mt-4">
          <b-input-group-prepend is-text>
            对题目重测
          </b-input-group-prepend>
          <b-input-group-prepend is-text>
            <b-icon icon="geo-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input type="number" no-wheel placeholder="请输入题目ID..." v-model="pid"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-danger" v-on:click="rejudgeProblem">重测</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "rejudge-page",
  data: function () {
    return {
      pid: null,
      sid: null
    }
  },
  methods: {
    rejudgeSubmission: function () {

    },
    rejudgeProblem: function () {}

  }
}
</script>

<style scoped>

</style>
