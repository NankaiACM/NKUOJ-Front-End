<template>
  <ModalBase v-model="internalShow" title="正在重测"
             :ok-button="!processing" ok-class="btn-outline-purple" ok-text="关闭"
             :cancel-button="false" :close-button="!processing"
             @ok="dismiss()" @close="dismiss()" @cancel="dismiss()" :esc-to-close="!processing">
    <div class="container">
      <div class="progress" role="progressbar">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" :style="`width: ${Math.round(failedRejudges / submissionsCount * 100)}%`"></div>
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" :style="`width: ${Math.round(successRejudges / submissionsCount * 100)}%`"></div>
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" :style="`width: ${Math.round(submittingRejudges / submissionsCount * 100)}%`"></div>
      </div>
      <p class="text-center text-muted mt-3" v-if="processing || submittingRejudges !== 0">正在提交重测...完成{{successRejudges}}，失败{{failedRejudges}}，正在提交{{submittingRejudges}}</p>
      <p class="text-center text-muted mt-3" v-else>已经完成重测。成功{{successRejudges}}，失败{{failedRejudges}}</p>
      <p class="text-center text-muted mt-3 text-break" v-if="failedSubmissions.length > 0">所有失败的重测：<br> {{JSON.stringify(this.failedSubmissions)}}</p>
    </div>
  </ModalBase>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";

export default {
  name: "ModalRejudgeProgressing",
  components: {ModalBase},
  props: {
    failedRejudges: Number,
    successRejudges: Number,
    submittingRejudges: Number,
    submissionsCount: Number,
    processing: Boolean,
    failedSubmissions: Array
  },
  data: function () {
    return {
      internalShow: false,
      submissionId: null
    }
  },
  methods: {
    dismiss: function () {
      this.internalShow = false;
    },
    show: function () {
      this.internalShow = true;
    },
    ok: function () {
      this.internalShow = false;
    }
  }
}
</script>

<style scoped>

</style>
