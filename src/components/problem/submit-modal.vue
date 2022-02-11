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
              <b-form-textarea v-model="sourceCode" placeholder="粘贴您的代码，不建议直接在此输入。"></b-form-textarea>
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
export default {
  name: "submit-modal",
  components: {
    StatusTracingModal
  },
  data: function () {
    return {
      options: [],
      sourceCode: '',
      validateResults: ['', '未填写代码', '未选择语言'],
      backendResults: ['', '没有权限', '已截止提交', '不支持所选择的语言', '重复提交'],
      selectedLanguage: -1,
      codePublic: true
    }
  },
  methods: {
    submitProblem: function (view) {
      const validateCode = this.validateSubmitForm()
      if (validateCode !== 0) {
        this.$bvModal.msgBoxOk(this.validateResults[validateCode], {
          title: '提示',
          centered: true
        })
        return view.preventDefault()
      }
      const requestPackage = {
        submitId: this.problemInfo.submitId,
        language: this.selectedLanguage,
        code: this.sourceCode
      }
      this.$http.post(`${window.backendOrigin}/api/judge`, requestPackage).then(res => {
        if (!res.data.ok) {
          this.$bvModal.msgBoxOk(this.backendResults[res.data.errorCode], {
            title: '提交失败',
            centered: true
          })
        } else {
          this.startTrackStatus(res.data.statusId)
          this.$bvModal.show('status-modal')
        }
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('网络错误', {
          title: '提交失败',
          centered: true
        })
      })
    },
    validateSubmitForm: function () {
      if (this.sourceCode === '') {
        return 1
      } else if (this.selectedLanguage === '') {
        return 2
      }
      return 0
    },
    startTrackStatus: function (id) {
      this.statusId = id
      this.judgeFinished = false
      this.statusUpdateTries = 300
      this.statusObject = {
        code: 99
      }
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
      this.$http.get(`${window.backendOrigin}/api/judge/status/${this.statusId}`).then(res => {
        this.statusObject = res.data
        this.statusShouldUpdate = this.statusObject.code <= 100
        this.judgeFinished = !this.statusShouldUpdate
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('同步评测记录失败', { title: '网络错误', centered: true })
        this.$bvModal.hide('status-modal')
        this.statusShouldUpdate = false
        this.judgeFinished = true
      })
    },
    show: function () {
      this.$refs['modal'].show()
    }
  },
  mounted() {
    this.options = [{ value: -1, text: '请选择...', disabled: true }]
  }
}
</script>

<style scoped>

</style>
