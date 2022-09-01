<template>
  <div class="container">
    <div class="jumbotron text-center">
      <h1 class="display-4">{{ examData.name }}</h1>
      <h4><span class="badge bg-danger text-light">考试</span></h4>
    </div>

    <div class="row">
      <div class="col-md-4 order-md-last order-first">
        <countdown-card :begin="examData.begin" :end="examData.end" class="mb-2" :warning-time="30"></countdown-card>
        <b-card title="考试详情" class="mb-2">
          <b-skeleton-wrapper :loading="isDetailsLoading">
            <template #loading>
              <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                          v-for="i in Array(5).keys()" :key="i"></b-skeleton>
            </template>

            <p>
              <span class="h6" v-if="examData.courseName">课程：</span>
              {{ examData.courseName }}
            </p>
            <p>
              <span class="h6">介绍：</span>
              {{ examData.description }}
            </p>
            <p>
              <span class="h6">时间：</span>
              {{ getLocaleDate(examData.begin) }} 开始，至 {{ getLocaleDate(examData.end) }} 截止
            </p>
            <p>
              <span class="h6">状态：</span>
              <span v-if="examData.open" class="text-success">正在进行</span>
              <span v-else class="text-danger">无法提交</span>
            </p>
          </b-skeleton-wrapper>
        </b-card>
        <b-card title="我的成绩" sub-title="当前成绩仅供参考" class="mb-2">
          <b-skeleton-wrapper :loading="isMyScoreLoading">
            <template #loading>
              <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                          v-for="i in Array(4).keys()" :key="i"></b-skeleton>
            </template>

            <h2 class="text-center">{{ myScore === -1 ? '未作答' : myScore }} / {{ problemsData.length * 100 }}</h2>
            <h6 class="card-subtitle mb-2 text-muted"><b-link class="text-decoration-none text-muted" @click="loadScoreData"><b-icon icon="arrow-clockwise"></b-icon>刷新</b-link></h6>
          </b-skeleton-wrapper>
        </b-card>
      </div>
      <div class="col-md-8 order-md-first order-last">
        <b-card title="试题" class="mb-2">
          <b-skeleton-wrapper :loading="isProblemsLoading">
            <template #loading>
              <b-card>
                <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                            v-for="i in Array(10).keys()" :key="i"></b-skeleton>
              </b-card>
            </template>

            <b-list-group>
              <b-list-group-item button @click="$router.push('/problem/' + problem.pid)" class="flex-column align-items-start"
                                 v-for="problem in problemsData" v-bind:key="problem.pid">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ problem.name }}</h5>
                </div>

                <small class="text-muted" v-if="problem.status === 0">未提交</small>
                <small class="text-warning" v-else-if="problem.status === 1">未通过</small>
                <small class="text-success" v-else>已通过</small>
              </b-list-group-item>
              <b-list-group-item v-if="problemsData.length === 0" class="pt-4 pb-4">
                本次考试暂无题目。
              </b-list-group-item>
            </b-list-group>
          </b-skeleton-wrapper>
        </b-card>
        <b-card title="我的提交">
          <b-table hover :items="mySubmissionsItems" :fields="mySubmissionsFields" striped class="text-center" :busy="isMySubmissionsLoading" responsive show-empty>
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="ml-4">加载中...</strong>
              </div>
            </template>
            <template #empty>
              <strong class="text-muted"> 没有相关记录 </strong>
            </template>

            <template #cell(status_id)="data">
              <h6><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value}`">#{{data.value}}</b-link></h6>
            </template>
            <template #cell(status)="data">
              <h6 :class="`text-${getStatusVariant(data.value)}`">{{getStatusText(data.value)}}</h6>
            </template>
            <template #cell(problem_info)="data">
              <h6><b-link class="text-decoration-none text-dark" :href="`/problem/${data.value.pid}`">{{data.value.name}}</b-link> #{{data.value.pid}}</h6>
            </template>
          </b-table>
          <h6 class="card-subtitle mb-2 text-muted"><b-link class="text-decoration-none text-muted" @click="loadSubmissionsData"><b-icon icon="arrow-clockwise"></b-icon>刷新</b-link></h6>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import date2Text from "@/util/date-to-str";
import CountdownCard from "@/components/contest/countdown-card";
import status2text from "@/util/status-code-to-str";
import status2variant from "@/util/status-code-to-variant-str";

export default {
  name: 'entity-page-exam',
  components: {CountdownCard},
  data: function () {
    return {
      examId: '',
      examData: {},
      problemsData: [],
      isDetailsLoading: true,
      isProblemsLoading: true,
      isMySubmissionsLoading: true,
      isMyScoreLoading: true,
      mySubmissionsItems: [],
      mySubmissionsFields: [
        { key: 'status_id', label: '记录ID' },
        { key: 'problem_info', label: '题目' },
        { key: 'status', label: '状态' }
      ],
      myScore: -1
    }
  },
  methods: {
    loadExamData: async function () {
      await this.$http.get(`${window.backendOrigin}/api/exam/id/${this.examId}`).then(res => {
        this.examData = res.data
        this.isDetailsLoading = false
      })
      await this.$http.get(`${window.backendOrigin}/api/problem/problemset/${this.examId}`).then(res => {
        this.problemsData = res.data
        this.isProblemsLoading = false
      })
    },
    getLocaleDate: function (string) {
      return date2Text(string)
    },
    getStatusText: function (status) {
      return status2text(status)
    },
    getStatusVariant: function (status) {
      return status2variant(status)
    },
    loadSubmissionsData: async function () {
      this.isMySubmissionsLoading = true
      this.mySubmissionsItems = []
      let respondedRequests = 0
      for (const problem of this.problemsData) {
        await this.$http.get(`${window.backendOrigin}/api/solutions?uid=${this.$store.getters.getUID}&pid=${problem.pid}`, ).then(res => {
          for(const item of res.data) {
            this.mySubmissionsItems.push({ status_id: item.sid, problem_info: {pid: item.pid, name: item.name},
              status: item.statusId })
          }
          respondedRequests += 1
        })
      }
      this.isMySubmissionsLoading = respondedRequests !== this.problemsData.length
    },
    loadScoreData: async function () {
      this.isMyScoreLoading = true
      this.$http.get(`${window.backendOrigin}/api/exam/id/${this.examId}/rank`).then(res => {
        for (const obj of res.data.tab) {
          if (obj.uid === this.$store.getters.getUID) {
            this.myScore = obj.totScore
          }
        }
        this.isMyScoreLoading = false
      }, () => {
        this.isMyScoreLoading = true
      })
    },
    loadData: async function () {
      this.examId = this.$route.params.examId
      await this.loadExamData()
      await this.loadSubmissionsData()
      await this.loadScoreData()
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>
