<template>
  <b-modal id="status-modal" :title="'评测 #' + sid" size="sm" centered no-close-on-esc no-close-on-backdrop hide-header-close ok-only :ok-disabled="!judgeFinished">
    <div class="form-row align-items-center">
      <div class="container text-center" v-if="statusUpdateTries <= 0">
        <h5>(っ╥╯﹏╰╥c)</h5>
        <h6 class="text-muted">服务器长时间无法完成评测，该评测结果将不会继续进行跟踪。</h6>
        <h6 class="text-muted">请前往评测记录页面查看您的评测结果。</h6>
      </div>
      <div class="container" v-if="statusUpdateTries > 0">
        <status-button :status="statusObject.code"></status-button>
        <div class="container-fluid text-center text-muted mt-3" v-if="statusObject.showDetails && judgeFinished">
          通过{{statusObject.rate}}%，{{statusObject.time}}ms，{{statusObject.memory}}kb
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import StatusButton from "@/components/status/status-button";
export default {
  name: "status-tracing-modal",
  components: {StatusButton},
  props: {
    sid: Number
  },
  data: function () {
    return {
      statusShouldUpdate: false,
      statusUpdateTries: 0,
      statusId: '',
      statusObject: {},
      judgeFinished: true,
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
