<template>
  <ModalBase v-model="internalShow" :title="`评测 #${id}`"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="关闭"
             :cancel-button="judgeFinished" cancel-class="btn-outline-purple" cancel-text="查看"
             @ok="dismiss()" @cancel="viewSubmission()">
    <div class="form-row align-items-center">
      <div class="container text-center" v-if="statusUpdateTries <= 0">
        <h5>(っ╥╯﹏╰╥c)</h5>
        <h6 class="text-muted">服务器长时间无法完成评测，该评测结果将不会继续进行跟踪。</h6>
        <h6 class="text-muted">但服务器会继续评测您的提交，您的提交仍会计入到考试或竞赛结果中。</h6>
        <h6 class="text-muted">如有需要，请前往评测记录页面查看您的评测结果。</h6>
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column" v-if="statusUpdateTries > 0">
        <div class="spinner-border mb-2" role="status" v-if="statusCode <= 100">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h4 :class="`text-${statusVariant(statusCode)}`">{{ statusText(statusCode) }}</h4>
      </div>
    </div>
  </ModalBase>
  <ModalMsgBox ref="modal_msg_box_status_tracing"/>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";
import axios from "axios";
import statusCodeToStr from "@/util/status-code-to-str";
import statusCodeToVariantStr from "@/util/status-code-to-variant-str";
import httpCodeToStr from "@/util/http-code-to-str";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import router from "@/router";

export default {
  name: "ModalSubmissionStatusTracing",
  components: {ModalMsgBox, ModalBase},
  data: function () {
    return {
      internalShow: false,
      id: 0,
      statusShouldUpdate: false,
      statusUpdateTries: 0,
      statusCode: 100,
      judgeFinished: true,
    }
  },
  methods: {
    dismiss: function () {
      this.internalShow = false;
    },
    show: function (id) {
      this.id = id;
      this.startTraceStatus();
      this.internalShow = true;
    },
    startTraceStatus: function (id) {
      this.statusId = id;
      this.judgeFinished = false;
      this.statusUpdateTries = 300;
      this.statusCode = 100;
      this.updateSubmitStatus();
    },
    updateSubmitStatus: function () {
      if (this.statusUpdateTries > 0) {
        this.statusUpdateTries--;
      } else {
        this.statusShouldUpdate = false;
        this.judgeFinished = true;
        return;
      }
      axios.get(`/api/solution/id/${this.id}/status`).then(res => {
        this.statusCode = res.data;
        this.statusShouldUpdate = this.statusCode <= 100;
        this.judgeFinished = !this.statusShouldUpdate;
      }, e => {
        this.$refs.modal_msg_box_status_tracing.show('同步评测记录失败', `${httpCodeToStr(e.response.status)}：与服务器之间的网络通信出现问题，无法继续获知评测结果。但您的提交已经被服务器接受，结果仍会计入到考试或竞赛中。`);
        this.internalShow = false;
        this.statusShouldUpdate = false;
        this.judgeFinished = true;
      })
    },
    viewSubmission: function () {
      router.push(`/submission/${this.id}`);
    },
    statusText: function (s) {
      return statusCodeToStr(s);
    },
    statusVariant: function (s) {
      return statusCodeToVariantStr(s);
    }
  },
  watch: {
    statusShouldUpdate: {
      handler (value) {
        if (value) {
          setTimeout(() => {
            this.updateSubmitStatus();
            this.statusShouldUpdate = false;
          }, 200);
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
