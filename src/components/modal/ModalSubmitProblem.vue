<template>
  <VueFinalModal class="d-flex justify-content-center align-items-center h-100 w-100"
                 overlayTransition="vfm-fade" contentTransition="vfm-fade" v-model="internalShow">
    <div class="modal modal-lg">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ `提交题目 #${pid}` }}</h5>
            <button type="button" class="btn-close" @click="dismiss"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="form-row align-items-center">
                <div class="container">
                  <form>
                    <div class="mb-3">
                      <label class="form-label">选择语言</label>
                      <select class="form-select" v-model="selectedLanguage">
                        <option selected value="-1">请选择...</option>
                        <option value="0">C++</option>
                        <option value="1">Python</option>
                        <option value="2">Javascript</option>
                        <option value="3">Go</option>
                        <option value="4">Text</option>
                        <option value="5">Pypy3</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">代码</label>
                      <textarea class="form-control" rows="12" v-model="sourceCode" placeholder="粘贴您的代码"></textarea>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" v-model="codePublic" type="checkbox">
                      <label class="form-check-label" for="flexCheckChecked">
                        公开所提交的代码
                      </label>
                    </div>
                    <small class="text-muted">作业、比赛、考试中的题目只有在其截止提交后才可以被他人查看。</small>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" @click="dismiss" :disabled="submitting">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitting"></span>
              取消
            </button>
            <button type="button" class="btn btn-outline-purple" @click="submit" :disabled="submitting">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submitting"></span>
              提交
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalMsgBox ref="submit_problem_msg_box"/>
  </VueFinalModal>
  <ModalSubmissionStatusTracing ref="modal_submission_tracing"/>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";
import axios from "axios";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import httpCodeToStr from "@/util/http-code-to-str";
import ModalSubmissionStatusTracing from "@/components/modal/ModalSubmissionStatusTracing.vue";
import {VueFinalModal} from "vue-final-modal";

export default {
  name: "ModalSubmitProblem",
  components: {VueFinalModal, ModalSubmissionStatusTracing, ModalMsgBox, ModalBase},
  props: {
    pid: Number
  },
  data: function () {
    return {
      internalShow: false,
      options: [],
      sourceCode: '',
      validateResults: ['', '未填写代码', '未选择语言'],
      selectedLanguage: -1,
      codePublic: "false",
      languageList: ['c++', 'python', 'javascript', 'go', 'text', 'pypy3'],
      submitting: false
    }
  },
  methods: {
    submit: function () {
      const validateCode = this.validateSubmitForm();
      if (validateCode !== 0) {
        this.$refs.submit_problem_msg_box.show('提示', this.validateResults[validateCode]);
        return;
      }
      const requestPackage = {
        pid: this.pid,
        lang: this.languageList[this.selectedLanguage],
        code: this.sourceCode,
        share: this.codePublic !== 'false'
      };
      this.submitting = true;
      axios.post(`/api/judge`, requestPackage).then(res => {
        if (res.status !== 200) {
          this.$refs.submit_problem_msg_box.show('提交失败', httpCodeToStr(res.status));
          this.submitting = false;
        } else {
          this.submitting = false;
          this.dismiss();
          this.$refs.modal_submission_tracing.show(res.data);
        }
      }, e => {
        this.submitting = false;
        this.$refs.submit_problem_msg_box.show('提交失败', httpCodeToStr(e.response.status));
      });
    },
    validateSubmitForm: function () {
      if (this.sourceCode === '') {
        return 1;
      } else if (this.selectedLanguage === -1) {
        return 2;
      }
      return 0;
    },
    show: function () {
      this.internalShow = true;
    },
    dismiss: function () {
      this.internalShow = false;
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  display: block;
}
.modal-header {
  border-bottom: none;
}
.modal-footer {
  border-top: none;
}
</style>
