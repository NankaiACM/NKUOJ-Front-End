<template>
  <div>
    <b-modal ref="modal" title="提交" centered @ok="submitProblem" size="lg" no-close-on-backdrop ok-title="提交" cancel-title="取消">
      <div class="form-row align-items-center">
        <div class="container">
          <form>
            <div class="form-group">
              <label>选择语言</label>
              <b-form-select v-model="selectedLanguage" :options="options" id="codeLanguageSelect"></b-form-select>
            </div>
            <div class="form-group">
              <label>代码</label>
              <b-form-textarea v-model="sourceCode" placeholder="粘贴您的代码"></b-form-textarea>
            </div>
            <div class="form-group">
              <b-form-checkbox v-model="codePublic" value="true" unchecked-value="false">
                公开所提交的代码
              </b-form-checkbox>
              <small class="text-muted">作业、比赛、考试中的题目只有在其截止提交后才可以被他人查看。</small>
            </div>
          </form>
        </div>
      </div>
    </b-modal>
    <status-tracing-modal ref="tracing-modal"></status-tracing-modal>
  </div>
</template>

<script>
import StatusTracingModal from "@/components/problem/status-tracing-modal";
import code2str from '@/util/code'

export default {
  name: "submit-modal",
  components: {
    StatusTracingModal
  },
  props: {
    pid: Number
  },
  data: function () {
    return {
      options: [],
      sourceCode: '',
      validateResults: ['', '未填写代码', '未选择语言'],
      selectedLanguage: -1,
      codePublic: "false",
      languageList: ['c++', 'python', 'javascript', 'go', 'text', 'pypy3']
    }
  },
  methods: {
    submitProblem: function (view) {
      const validateCode = this.validateSubmitForm()
      if (validateCode !== 0) {
        this.$bvModal.msgBoxOk(this.validateResults[validateCode], {title: '提示', centered: true})
        return view.preventDefault()
      }
      const requestPackage = {
        pid: this.pid,
        lang: this.languageList[this.selectedLanguage],
        code: this.sourceCode,
        share: this.codePublic !== 'false'
      }
      this.$http.post(`${window.backendOrigin}/api/judge`, requestPackage).then(res => {
        if (res.status !== 200) {
          this.$bvModal.msgBoxOk(code2str(res.status), {title: '提交失败', centered: true})
        } else {
          this.$refs['tracing-modal'].show(res.data)
        }
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {title: '提交失败', centered: true})
      })
    },
    validateSubmitForm: function () {
      if (this.sourceCode === '') {
        return 1
      } else if (this.selectedLanguage === -1) {
        return 2
      }
      return 0
    },
    show: function () {
      this.$refs['modal'].show()
    }
  },
  mounted() {
    this.options = [
      { value: -1, text: '请选择...', disabled: true },
      { value: 0, text: 'C++' },
      { value: 1, text: 'Python' },
      { value: 2, text: 'Javascript' },
      { value: 3, text: 'Go' },
      { value: 4, text: 'Text' },
      { value: 5, text: 'Pypy3' },
    ]
  }
}
</script>

<style scoped>

</style>
