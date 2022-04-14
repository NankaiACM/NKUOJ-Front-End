<template>
  <div class="container">
    <div class="jumbotron text-center">
      <h1 class="display-6">{{ problemInfo.name ? problemInfo.name : '加载中...' }}</h1>
      <h4><span class="badge bg-danger text-light">题目</span></h4>
    </div>
    <problem-header :problem-info="problemInfo" :loading="loading" class="mb-3" :pid="problemInfo.pid"></problem-header>
    <problem-navigator :psid="problemInfo.psid" v-if="problemInfo.psid" :loading="loading" :pid="problemInfo.pid" class="mb-3">
    </problem-navigator>
    <problem-content :type="extension" :content="content" :loading="loading" class="mb-4"></problem-content>
    <submit-modal ref="submit-modal" :pid="problemInfo.pid"></submit-modal>
    <status-list-modal ref="status-list-modal" :pid="problemInfo.pid" :uid="$store.getters.getUID"></status-list-modal>
    <div class="container d-flex justify-content-center">
      <div class="btn-group" role="group">
        <b-button type="button" variant="success" @click="showSubmitModal">提交代码</b-button>
        <b-button type="button" variant="info" @click="toSubmitStatus">查看记录</b-button>
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
  name: 'problems-page',
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
    }
  }
}
</script>

<style scoped>

</style>
