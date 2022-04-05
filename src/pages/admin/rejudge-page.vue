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
          <b-input-group-prepend is-text>
            时延(ms)
          </b-input-group-prepend>
          <b-form-input type="number" no-wheel placeholder="时延" v-model="interval" min="50"></b-form-input>
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

    <b-modal title="正在进行重测..." centered id="rejudge-problem-processing-modal" ok-only
             :ok-disabled="processing || submittingRejudges !== 0"
             :hide-header-close="processing || submittingRejudges !== 0"
             ok-title="关闭" no-close-on-backdrop no-close-on-esc>
      <b-progress class="mt-2" :max="submissionsCount" animated>
        <b-progress-bar :value="successRejudges" variant="success"></b-progress-bar>
        <b-progress-bar :value="submittingRejudges" variant="warning"></b-progress-bar>
        <b-progress-bar :value="failedRejudges" variant="danger"></b-progress-bar>
      </b-progress>
      <p class="text-center text-muted mt-3" v-if="processing || submittingRejudges !== 0">正在提交重测...完成{{successRejudges}}，失败{{failedRejudges}}，正在提交{{submittingRejudges}}</p>
      <p class="text-center text-muted mt-3" v-else>已经完成重测。成功{{successRejudges}}，失败{{failedRejudges}}</p>
      <p class="text-center text-muted mt-3" v-if="failedSubmissions.length > 0">所有失败的重测：{{JSON.stringify(this.failedSubmissions)}}</p>
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
      desiredText: '我已阅读并知悉所有警告并愿意为此负责',
      processing: false,
      interval: 50,
      submissionsCount: 0,
      successRejudges: 0,
      submittingRejudges: 0,
      failedRejudges: 0,
      submissions: [],
      failedSubmissions: []
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
        if (this.interval < 50) {
          this.$bvModal.msgBoxOk('时间间隔不合法。', {centered: true, size: 'sm', okTitle: '关闭', title: '重测失败'})
        } else {
          this.rejudgeProblemProcess()
        }
      } else {
        this.$bvModal.msgBoxOk('未正确输入，不会进行重测。', {centered: true, size: 'sm', okTitle: '关闭', title: '重测失败'})
      }
    },
    rejudgeProblemProcess: function () {
      this.processing = true
      this.submittingRejudges = 0
      this.failedRejudges = 0
      this.successRejudges = 0
      this.failedSubmissions = 0
      this.$http.get(`${window.backendOrigin}/api/solutions?pid=${this.pid}`, ).then(res => {
        if (res.status === 200) {
          this.submissions = res.data
          this.submissionsCount = res.data.length
          let worker = (index) => {
            if (index < this.submissions.length) {
              this.submittingRejudges += 1
              this.$http.get(`${window.backendOrigin}/api/admin/rejudge/sid/${this.submissions[index].sid}`).then(res => {
                if (res.status === 200) {
                  this.submittingRejudges -= 1
                  this.successRejudges += 1
                } else {
                  this.submittingRejudges -= 1
                  this.failedRejudges += 1
                  this.failedSubmissions.push(this.submissions[index].sid)
                }
                // eslint-disable-next-line no-unused-vars
              }, _ => {
                this.submittingRejudges -= 1
                this.failedRejudges += 1
                this.failedSubmissions.push(this.submissions[index].sid)
              })
              setTimeout(worker, this.interval, index + 1)
            } else {
              this.processing = false
            }
          }
          setTimeout(worker, this.interval, 0)
          this.$bvModal.show('rejudge-problem-processing-modal')
        } else {
          this.$bvModal.msgBoxOk(code2str(res.status), {centered: true, size: 'sm', okTitle: '关闭', title: '获取题目的提交列表失败'})
        }
      }, e => {
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, size: 'sm', okTitle: '关闭', title: '获取题目的提交列表失败'})
      })
    }
  }
}
</script>

<style scoped>

</style>
