<template>
  <b-modal id="tracing-modal" :title="'评测 #' + statusId" size="md" centered
           :no-close-on-esc="!judgeFinished" :no-close-on-backdrop="!judgeFinished"
           :hide-header-close="!judgeFinished" :ok-only="!judgeFinished" :ok-disabled="!judgeFinished" ok-title="关闭" cancel-title="查看" @cancel="viewSubmission">
    <div class="form-row align-items-center">
      <div class="container text-center" v-if="statusUpdateTries <= 0">
        <h5>(っ╥╯﹏╰╥c)</h5>
        <h6 class="text-muted">服务器长时间无法完成评测，该评测结果将不会继续进行跟踪。</h6>
        <h6 class="text-muted">请前往评测记录页面查看您的评测结果。</h6>
      </div>
      <div class="container text-center m-4" v-if="statusUpdateTries > 0">
        <b-spinner v-if="statusCode <= 100" small class="m-2" type="grow"></b-spinner>
        <b-spinner v-if="statusCode <= 100" small class="m-2" type="grow"></b-spinner>
        <b-spinner v-if="statusCode <= 100" small class="m-2" type="grow"></b-spinner>
        <h3 :class="`text-${statusVariant(statusCode)}`">{{ statusText(statusCode) }}</h3>
      </div>
    </div>
  </b-modal>
</template>

<script>
import code2str from '@/util/http-code-to-str'
import status2text from "@/util/status-code-to-str";
import status2variant from "@/util/status-code-to-variant-str";

export default {
  name: "status-tracing-modal",
  data: function () {
    return {
      statusShouldUpdate: false,
      statusUpdateTries: 0,
      statusId: '',
      statusCode: 100,
      judgeFinished: true,
    }
  },
  methods: {
    show: function (sid) {
      this.startTraceStatus(sid)
      this.$bvModal.show('tracing-modal')
    },
    startTraceStatus: function (id) {
      this.statusId = id
      this.judgeFinished = false
      this.statusUpdateTries = 300
      this.statusCode = 100
      this.updateSubmitStatus()
    },
    updateSubmitStatus: function () {
      if (this.statusUpdateTries > 0) {
        this.statusUpdateTries--
      } else {
        this.statusShouldUpdate = false
        this.judgeFinished = true
        return
      }
      this.$http.get(`${window.backendOrigin}/api/solution/id/${this.statusId}/status`).then(res => {
        this.statusCode = res.data
        this.statusShouldUpdate = this.statusCode <= 100
        this.judgeFinished = !this.statusShouldUpdate
      }, e => {
        this.$bvModal.msgBoxOk(code2str(e.status), { title: '同步评测记录失败', centered: true })
        this.$bvModal.hide('tracing-modal')
        this.statusShouldUpdate = false
        this.judgeFinished = true
      })
    },
    viewSubmission: function () {
      this.$router.push(`/submission/${this.statusId}`)
    },
    statusText: function (s) {
      return status2text(s)
    },
    statusVariant: function (s) {
      return status2variant(s)
    }
  },
  watch: {
    statusShouldUpdate: {
      handler (value) {
        if (value) {
          setTimeout(() => {
            this.updateSubmitStatus()
            this.statusShouldUpdate = false
          }, 200)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
