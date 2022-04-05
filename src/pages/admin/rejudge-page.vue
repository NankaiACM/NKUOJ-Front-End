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

    <b-modal title="重测题目" centered id="rejudge-problem-modal" ok-title="重测" cancel-title="取消" @ok="rejudgeProblemModalOK">
      <b-alert show variant="danger" class="mb-4">
        <h4 class="alert-heading">再次警告！</h4>
        <hr>
        <p>
          对整个问题的所有提交进行重测会导致大规模的提交排队现象！
        </p>
      </b-alert>
      <p>请在下方输入：<strong>{{desiredText}}</strong></p>
      <b-form-input type="text" placeholder="请输入..." v-model="captcha"></b-form-input>
    </b-modal>
  </div>
</template>

<script>
import code2str from "@/util/code";

export default {
  name: "rejudge-page",
  data: function () {
    return {
      pid: null,
      sid: null,
      captcha: '',
      desiredText: '我已阅读并知悉所有警告并愿意为此负责'
    }
  },
  methods: {
    rejudgeSubmission: function () {
      this.$bvModal.msgBoxConfirm(`确定重新测评 #${this.sid}？`, {centered: true, title: '重测提交', okTitle: '确定', cancelTitle: '取消'}).then(value => {
        if (value) {
          this.$http.get(`${window.backendOrigin}/api/admin/rejudge/sid/${this.sid}`).then(res => {
            if (res.status === 200) {
              this.$bvModal.msgBoxOk(`已经向服务器提交对 #${this.sid} 的重测`, {centered: true, size: 'sm', okTitle: '关闭', title: '提示'})
            } else {
              this.$bvModal.msgBoxOk(code2str(res.status), {title: '提示', centered: true})
            }
          }, e => {
            this.$bvModal.msgBoxOk(code2str(e.status), {title: '提示', centered: true})
          })
        }
      })
    },
    rejudgeProblem: function () {
      this.$bvModal.show('rejudge-problem-modal')
    },
    rejudgeProblemModalOK: function () {
      if (this.desiredText === this.captcha) {
        this.$bvModal.msgBoxOk('还没做好', {centered: true, size: 'sm', okTitle: '关闭', title: '重测失败'})
      } else {
        this.$bvModal.msgBoxOk('未正确输入，不会进行重测。', {centered: true, size: 'sm', okTitle: '关闭', title: '重测失败'})
      }
    }
  }
}
</script>

<style scoped>

</style>
