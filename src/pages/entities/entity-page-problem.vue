<template>
  <div id="entity-page-problem">
    <div class="container">
      <div class="jumbotron text-center">
        <h1 class="display-6">{{ problemInfo.name ? problemInfo.name : '加载中...' }}</h1>
        <h4><span class="badge bg-secondary text-light">题目</span></h4>
      </div>
      <problem-navigator :psid="problemInfo.psid" v-if="problemInfo.psid" :loading="loading" :pid="problemInfo.pid" class="mb-3"
                         @switchToProblem="switchToProblem"></problem-navigator>
      <problem-header :problem-info="problemInfo" :loading="loading" class="mb-3" :pid="problemInfo.pid"></problem-header>
      <problem-content :type="extension" :content="content" :loading="loading" class="mb-4"></problem-content>
      <submit-modal ref="submit-modal" :pid="problemInfo.pid"></submit-modal>
      <status-list-modal ref="status-list-modal" :pid="problemInfo.pid" :uid="$store.getters.getUID"></status-list-modal>
      <div class="fixed-bottom container d-flex justify-content-center pb-1 position-sticky">
        <div class="btn-group" role="group">
          <b-button type="button" variant="success" @click="showSubmitModal">提交代码</b-button>
          <b-button type="button" variant="info" @click="toSubmitStatus">查看记录</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProblemNavigator from "@/components/problem/problem-navigator";
import SubmitModal from "@/components/problem/submit-modal";
import ProblemContent from "@/components/problem/problem-content";
import ProblemHeader from "@/components/problem/problem-header";
import StatusListModal from "@/components/status/status-list-modal";

export default {
  name: 'entity-page-problem',
  components: {
    StatusListModal,
    ProblemHeader,
    ProblemContent,
    SubmitModal,
    ProblemNavigator,
  },
  data: function () {
    return {
      problemInfo: {},
      loading: true,
      content: '',
      extension: ''
    }
  },
  mounted: function () {
    this.loadProblemData()
  },
  methods: {
    loadProblemData: function () {
      this.loading = true
      this.$http.get(`${window.backendOrigin}/api/problem/id/${this.$route.params.problemId}`).then(
        res => {
          this.problemInfo = res.data
          this.extension = this.problemInfo.extension
          this.content = Buffer.from(new Uint8Array(this.problemInfo.content.data).buffer).toString('base64')
          this.loading = false
      })
    },
    showSubmitModal: function () {
      this.$refs['submit-modal'].show()
    },
    toSubmitStatus: function () {
      this.$refs['status-list-modal'].show()
    },
    switchToProblem: function (event, pid) {
      if (`${pid}` !== `${this.$route.params.problemId}`) {
        this.$router.push('/problem/' + pid)
      }
    }
  }, watch: {
    '$route': function () {
      this.loadProblemData()
    }
  }
}
</script>

<style scoped>

</style>
