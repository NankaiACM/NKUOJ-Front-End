<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 mb-4 order-md-last order-first">
        <b-card bg-variant="light" :title="`提交 #${sid}`">
          <b-skeleton-wrapper :loading="loading">
            <template #loading>
              <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                          v-for="i in Array(9).keys()" :key="i"></b-skeleton>
            </template>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left"><b>用户：</b></b-col>
              <b-col>{{data.nickname}} #{{data.uid}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left"><b>题目：</b></b-col>
              <b-col><b-link @click="$router.push(`/problem/${data.pid}`)" class="text-decoration-none">{{data.name}}</b-link> #{{data.pid}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left"><b>时间：</b></b-col>
              <b-col>{{getLocaleDate(data.when)}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left"><b>公开：</b></b-col>
              <b-col>{{data.share ? '是' : '否'}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left"><b>语言：</b></b-col>
              <b-col>{{getLangText(data.langId)}}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left"><b>用时：</b></b-col>
              <b-col>{{data.runTime}} ms</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left"><b>内存：</b></b-col>
              <b-col>{{data.runMemory}} KiB</b-col>
            </b-row>
            <b-row class="mb-2" v-if="data.compileInfo">
              <b-col sm="3" class="text-sm-left"><b>编译：</b></b-col>
              <b-col><b-link @click="viewCompilationInfo()" class="text-primary text-decoration-none">查看编译信息</b-link></b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left"><b>判定：</b></b-col>
              <b-col>
                <span :class="`text-${getStatusVariant(data.statusId)}`">{{getStatusText(data.statusId)}}</span>
                <span v-if="data.score !== null" :class="`ml-4 text-${getVariantForScore(data.score)}`">{{data.score}}分</span>
              </b-col>
            </b-row>
          </b-skeleton-wrapper>
        </b-card>
      </div>
      <div class="col-md-8 order-md-first order-last">
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-card class="mb-4">
              <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                          v-for="i in Array(8).keys()" :key="i"></b-skeleton>
            </b-card>
          </template>

          <status-details-button :details="data.detail" v-if="data.detail" class="mb-4"></status-details-button>
          <b-alert show variant="info" v-else class="mb-4">
            <h4 class="alert-heading">无法查看测试点详情</h4>
            <hr>
            <p class="mb-0">
              无法查看测试点详情，可能是由于以下原因：对于编译失败的题目，代码未进行测试，您无法查看测试点通过详情；非公开的提交不会向您提供测试点详情；通过制的题目不会计分，亦不会提供测试点详情。
            </p>
          </b-alert>
        </b-skeleton-wrapper>

        <b-card title="代码" class="mb-4" v-if="data.code || loading">
          <b-skeleton-wrapper :loading="loading">
            <template #loading>
              <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                          v-for="i in Array(42).keys()" :key="i"></b-skeleton>
            </template>

            <pre><code>{{data.code}}</code></pre>
          </b-skeleton-wrapper>
        </b-card>
        <b-alert show variant="warning" v-else class="mb-4">
          <h4 class="alert-heading">没有权限查看该代码</h4>
          <hr>
          <p class="mb-0">
            您没有权限查看该代码，可能是由于以下原因：只有代码的提交者将其设为公开后才能被查看；为了防止抄袭代码，作业、考试、竞赛的提交在其截止之前不会向他人公开；若您正在参加考试，您无法查看先前提交过的代码。
          </p>
        </b-alert>
      </div>
    </div>

    <b-modal id="compile-info-modal" title="编译信息" size="lg" centered ok-only ok-title="关闭">
      <pre>{{data.compileInfo}}</pre>
    </b-modal>
  </div>
</template>

<script>

import status2text from "@/util/status-text";
import status2variant from "@/util/status-variant";
import langId2Text from "@/util/lang-code-text";
import date2Text from "@/util/date";
import StatusDetailsButton from "@/components/status/status-details-button";

export default {
  name: "entity-page-submission",
  components: {StatusDetailsButton},
  data: function () {
    return {
      sid: 0,
      loading: true,
      data: {}
    }
  },
  methods: {
    loadSubmissionData: function () {
      this.sid = this.$route.params.submissionId
      this.$http.get(`${window.backendOrigin}/api/solution/id/${this.sid}`).then(res => {
        this.data = res.data
        this.loading = false
      }, e => {
        console.log(e)
        if (e.status === 403) {
          this.loading = false
        }
      })
    },
    getStatusText: function (status) {
      return status2text(status)
    },
    getStatusVariant: function (status) {
      return status2variant(status)
    },
    getLangText: function (id) {
      return langId2Text(id)
    },
    getLocaleDate: function (string) {
      return date2Text(string)
    },
    getVariantForScore: function (score) {
      if (score <= 0) {
        return 'danger'
      } else if (score >= 100) {
        return 'success'
      }
      return 'warning'
    },
    viewCompilationInfo: function () {
      this.$bvModal.show('compile-info-modal')
    }
  },
  mounted() {
    this.loadSubmissionData()
  }
}
</script>

<style scoped>

</style>
