<template>
  <ModalBase v-model="internalShow" :title="`提交题目 #${pid}`"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="提交"
             :cancel-button="true" cancel-class="btn-outline-danger" cancel-text="取消"
             @ok="submit()" @close="dismiss()" @cancel="dismiss()" large>
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
    <ModalMsgBox ref="submit_problem_msg_box"/>
  </ModalBase>
  <ModalSubmissionStatusTracing ref="modal_submission_tracing"/>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";
import axios from "axios";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import httpCodeToStr from "@/util/http-code-to-str";
import ModalSubmissionStatusTracing from "@/components/modal/ModalSubmissionStatusTracing.vue";

export default {
  name: "ModalSubmitProblem",
  components: {ModalSubmissionStatusTracing, ModalMsgBox, ModalBase},
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
      languageList: ['c++', 'python', 'javascript', 'go', 'text', 'pypy3']
    }
  },
  methods: {
    submit: function (view) {
      const validateCode = this.validateSubmitForm()
      if (validateCode !== 0) {
        this.$refs.submit_problem_msg_box.show('提示', this.validateResults[validateCode]);
        return view.preventDefault()
      }
      const requestPackage = {
        pid: this.pid,
        lang: this.languageList[this.selectedLanguage],
        code: this.sourceCode,
        share: this.codePublic !== 'false'
      }
      axios.post(`/api/judge`, requestPackage).then(res => {
        if (res.status !== 200) {
          this.$refs.submit_problem_msg_box.show('提交失败', httpCodeToStr(res.status));
        } else {
          this.dismiss();
          this.$refs.modal_submission_tracing.show(res.data);
        }
      }, e => {
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

</style>
