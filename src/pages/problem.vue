<template>
  <div class="container">
    <problem-header :problem-info="problemInfo" :loading="loading"></problem-header>
    <problem-navigator :psid="problemInfo.psid" v-if="problemInfo.psid" :loading="loading" :pid="problemInfo.pid">
    </problem-navigator>
    <problem-content :markdown-text="markdownText" :loading="loading"></problem-content>
    <submit-modal ref="submit-modal" :pid="problemInfo.pid"></submit-modal>

    <div class="container d-flex justify-content-center">
      <div class="btn-group m-4" role="group">
        <b-button type="button" variant="success" @click="showSubmitModal">提交</b-button>
        <b-button type="button" variant="info" @click="toSubmitStatus">查看提交记录</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import ProblemNavigator from "@/components/problem/problem-navigator";
import SubmitModal from "@/components/problem/submit-modal";
import ProblemContent from "@/components/problem/problem-content";
import ProblemHeader from "@/components/problem/problem-header";

export default {
  name: 'problems-page',
  components: {
    ProblemHeader,
    ProblemContent,
    SubmitModal,
    ProblemNavigator,
  },
  data: function () {
    return {
      problemInfo: {},
      problemMarkDown: '',
      loading: true,
      markdownText: ''
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
          this.markdownText = new TextDecoder('utf-8').decode(new Uint8Array(this.problemInfo.content.data).buffer)
          this.loading = false
      })
    },
    showSubmitModal: function () {
      this.$refs['submit-modal'].show()
    },
    toSubmitStatus: function () {
      window.location.href = ('/status')
    }
  }
}
</script>

<style scoped>

</style>
