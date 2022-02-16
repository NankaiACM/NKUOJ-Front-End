<template>
  <div class="container">
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
          <b-col><a :href="`/problem/${data.pid}`" class="text-decoration-none text-dark">{{data.name}}</a> #{{data.pid}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-left"><b>时间：</b></b-col>
          <b-col>{{data.when}}</b-col>
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
          <b-col sm="3" class="text-sm-left"><b>运行时间：</b></b-col>
          <b-col>{{data.runTime}} ms</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-left"><b>运行内存：</b></b-col>
          <b-col>{{data.runMemory}} KiB</b-col>
        </b-row>
        <b-row class="mb-2" v-if="data.compileInfo">
          <b-col sm="3" class="text-sm-left"><b>编译信息：</b></b-col>
          <b-col><b-link @click="viewCompilationInfo()" class="text-primary text-decoration-none">查看</b-link></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-left"><b>判定结果：</b></b-col>
          <b-col>
            <span :class="`text-${getStatusVariant(data.statusId)}`">{{getStatusText(data.statusId)}}</span>
            <span v-if="data.score !== null" :class="`ml-4 text-${getVariantForScore(data.score)}`">{{data.score}}分</span>
          </b-col>
        </b-row>
      </b-skeleton-wrapper>
    </b-card>

    <b-card title="代码" class="mt-4" v-if="data.code && !loading">
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                      v-for="i in Array(42).keys()" :key="i"></b-skeleton>
        </template>

        <pre><code>{{data.code}}</code></pre>
      </b-skeleton-wrapper>
    </b-card>
    <b-card bg-variant="light" class="p-5 mt-4" v-else>
      <h2 class="text-center text-muted">没有权限查看该代码</h2>
    </b-card>
  </div>
</template>

<script>

import status2text from "@/code/status-text";
import status2variant from "@/code/status-variant";
import langId2Text from "@/code/lang-code-text";

export default {
  name: "submission",
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
    getVariantForScore: function (score) {
      if (score <= 0) {
        return 'danger'
      } else if (score >= 100) {
        return 'success'
      }
      return 'warning'
    },
    viewCompilationInfo: function () {
      this.$bvModal.msgBoxOk(this.data.compileInfo, {centered: true, title: '编译信息'})
    },
  },
  mounted() {
    this.loadSubmissionData()
  }
}
</script>

<style scoped>

</style>
