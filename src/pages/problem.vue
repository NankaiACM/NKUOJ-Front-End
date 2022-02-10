<template>
  <div id="problemPage" :key="problemInfo.id">
    <div class="container">
      <b-overlay :show="isLoading" rounded="sm">
        <div class="jumbotron">
          <h1 class="display-6 d-flex justify-content-center">{{ problemInfo.title ? problemInfo.title : '(～﹃～)~zZ' }}</h1>
          <div class="container-md">
            <div class="row d-flex justify-content-center">
              <div class="btn-group m-2" role="group">
                <button type="button" class="btn btn-success disabled">通过率</button>
                <button type="button" class="btn btn-light disabled">{{ problemInfo.acceptedCount }} /
                  {{ problemInfo.submittedCount }}</button>
              </div>
              <div class="btn-group m-2" role="group">
                <button type="button" class="btn btn-info disabled">测试点数量</button>
                <button type="button" class="btn btn-light disabled">{{ problemInfo.testcaseCount }}</button>
              </div>
              <div class="btn-group m-2" role="group">
                <button type="button" class="btn btn-danger disabled">难度</button>
                <button type="button" class="btn btn-light disabled">{{ problemInfo.level }}</button>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="btn-group m-2" role="group">
                <button type="button" class="btn btn-primary disabled">时间限制</button>
                <button type="button" class="btn btn-light disabled">{{ problemInfo.timeLimit }} ms</button>
              </div>
              <div class="btn-group m-2" role="group">
                <button type="button" class="btn btn-warning disabled">空间限制</button>
                <button type="button" class="btn btn-light disabled">{{ problemInfo.memoryLimit }} kB</button>
              </div>
              <div class="btn-group m-2" role="group" v-if="problemInfo.enabledSpecialJudge">
                <button type="button" class="btn btn-outline-warning disabled">Special Judge</button>
              </div>
              <div class="btn-group m-2" role="group" v-if="problemInfo.enabledDetailJudge">
                <button type="button" class="btn btn-outline-info disabled">Detail Judge</button>
              </div>
            </div>
          </div>
        </div>
        <b-card class="container-fluid" v-if="contestId !== '' || assignmentId !== ''">
          <h4 class="display-6 d-flex justify-content-center text-muted">{{problemInfo.meta.title}}</h4>
          <small class="display-6 d-flex justify-content-center text-muted" v-if="problemInfo.meta.subtitle !== ''">{{problemInfo.meta.subtitle}}</small>

          <div class="container-fluid d-flex justify-content-center pt-4">
            <b-button-group>
              <b-button :variant="['outline-secondary', 'outline-warning', 'outline-success'][problem.status]" v-b-popover.hover.top="problem.name" :title="problem.label + '题'"
                        v-for="problem in problemInfo.meta.problems" :key="problem.id" :pressed="problem.id === problemInfo.id" @click="switchToProblem(problem.id)">{{problem.label}}</b-button>
            </b-button-group>
          </div>
        </b-card>
        <div class="card mt-4">
          <div class="p-5">
            <div v-html="problemMarkDown"></div>
          </div>
        </div>
        <div class="container d-flex justify-content-center">
          <div class="btn-group m-4" role="group">
            <b-button type="button" variant="success" @click="showSubmitModal">提交</b-button>
            <b-button type="button" variant="info" @click="toSubmitStatus">查看提交记录</b-button>
          </div>
        </div>
      </b-overlay>
    </div>

    <!-- Submit Modal -->
    <b-modal id="submit-modal" title="提交" centered @ok="submitProblem" size="lg" no-close-on-backdrop ok-title="提交" cancel-title="取消">
      <div class="form-row align-items-center">
        <div class="container">
          <form>
            <div class="form-group">
              <label>选择语言</label>
              <b-form-select v-model="selectedLanguage" :options="options" id="codeLanguageSelect"></b-form-select>
            </div>
            <div class="form-group">
              <label>代码</label>
              <editor @init="editorInit" lang="c_cpp" v-model="sourceCode" height="430px"></editor>
            </div>
          </form>
        </div>
      </div>
    </b-modal>

    <!-- Status Modal -->
    <b-modal id="status-modal" :title="'评测 #' + statusId" size="sm" centered no-close-on-esc no-close-on-backdrop hide-header-close ok-only :ok-disabled="!judgeFinished">
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
  </div>
</template>
<script>
import markdownIt from 'markdown-it'
import markdownItMathjax from 'markdown-it-mathjax'
import markdownItLatex from 'markdown-it-latex'
import 'markdown-it-latex/dist/index.css'
import statusButton from '../components/status/status-button'

const markdownItObject = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})

markdownItObject.use(markdownItMathjax)
markdownItObject.use(markdownItLatex)
window.markdownit = markdownItObject

export default {
  name: 'problems-page',
  components: {
    editor: require('vue2-ace-editor'),
    statusButton
  },
  data: function () {
    return {
      problemInfo: {
        acceptedCount: 0,
        submittedCount: 0,
        timeLimit: 0,
        memoryLimit: 0,
        testcaseCount: 0,
        level: 0,
        enabledDetailJudge: false,
        enabledSpecialJudge: false,
        id: '',
        tags: [],
        content: '',
        title: '',
        submitId: '',
        supportedLanguages: [],
        meta: {}
      },
      problemMarkDown: '',
      contestId: '',
      assignmentId: '',
      isLoading: true,
      selectedLanguage: -1,
      options: [],
      sourceCode: '',
      validateResults: ['', '未填写代码', '未选择语言'],
      backendResults: ['', '没有权限', '已截止提交', '不支持所选择的语言', '重复提交'],
      statusShouldUpdate: false,
      statusUpdateTries: 0,
      statusId: '',
      statusObject: {},
      judgeFinished: true
    }
  },
  mounted: function () {
    this.loadProblemData()
  },
  methods: {
    getMarkMathjaxLatex () {
      let markdown = this.problemInfo.content
      window.markdown = markdown
      return markdownItObject.render(markdown)
    },
    loadProblemData: function () {
      let requestType = 0
      let requestId = ''
      // eslint-disable-next-line no-prototype-builtins
      if (this.$route.params.hasOwnProperty('contestId')) {
        this.contestId = this.$route.params.contestId
        requestType = 2
        requestId = this.contestId
      }
      // eslint-disable-next-line no-prototype-builtins
      if (this.$route.params.hasOwnProperty('assignmentId')) {
        this.assignmentId = this.$route.params.assignmentId
        requestType = 1
        requestId = this.assignmentId
      }
      const requestPackage = {
        type: requestType,
        id: requestId
      }
      this.$http.post(`${window.backendOrigin}/api/problem/id/${this.$route.params.problemId}`, requestPackage).then(
        (res) => {
          this.problemInfo = res.data
          this.problemMarkDown = this.getMarkMathjaxLatex()
          this.options = [{ value: -1, text: '请选择...', disabled: true }]
          let index = 0
          for (const lang of this.problemInfo.supportedLanguages) {
            this.options.push({ value: index++, text: lang })
          }
          this.isLoading = false
        })
    },
    switchToProblem: function (pid) {
      if (this.contestId !== '') {
        window.location.href = (`/contest/${this.contestId}/problem/${pid}`)
      } else if (this.assignmentId !== '') {
        window.location.href = (`/assignment/${this.assignmentId}/problem/${pid}`)
      } else {
        window.location.href = (`/problem/${pid}`)
      }
    },
    showSubmitModal: function () {
      this.$bvModal.show('submit-modal')
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
    editorInit: function () {
      require('brace/mode/html')
      require('brace/mode/javascript')
      require('brace/mode/c_cpp')
      require('brace/mode/less')
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
        this.$bvModal.msgBoxOk('同步评测记录失败', {
          title: '网络错误',
          centered: true
        })
        this.$bvModal.hide('status-modal')
        this.statusShouldUpdate = false
        this.judgeFinished = true
      })
    },
    toSubmitStatus: function () {
      window.location.href = ('/status')
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
