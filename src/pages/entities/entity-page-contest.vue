<template>
  <div class="container">
    <div class="jumbotron text-center">
      <h1 class="display-4">{{ contestData.name }}</h1>
      <h4><span class="badge bg-primary text-light">竞赛</span></h4>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4 order-md-last order-first">
        <countdown-card :begin="contestData.begin" :end="contestData.end" class="mb-2"></countdown-card>
        <b-card title="竞赛详情" class="mb-2">
          <b-skeleton-wrapper :loading="isDetailsLoading">
            <template #loading>
              <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                          v-for="i in Array(5).keys()" :key="i"></b-skeleton>
            </template>

            <p>
              <span class="h6" v-if="contestData.courseName">课程：</span>
              {{ contestData.courseName }}
            </p>
            <p>
              <span class="h6">介绍：</span>
              {{ contestData.description }}
            </p>
            <p>
              <span class="h6">时间：</span>
              {{ getLocaleDate(contestData.begin) }} 开始，至 {{ getLocaleDate(contestData.end) }} 截止
            </p>
            <p>
              <span class="h6">状态：</span>
              <span v-if="contestData.open" class="text-success">正在进行</span>
              <span v-else class="text-danger">无法提交</span>
            </p>
          </b-skeleton-wrapper>
        </b-card>
      </div>
      <div class="col-md-8 order-md-first order-last">
        <b-card title="赛题" class="mb-2">
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
                本次竞赛暂无题目。
              </b-list-group-item>
            </b-list-group>
          </b-skeleton-wrapper>
        </b-card>
        <b-card title="榜单">
          <ranking-table-contest :id="this.$route.params.contestId" :limit="20" ref="ranking-table"></ranking-table-contest>
          <p class="text-muted">本榜单只显示前20名。
            <b-link class="text-decoration-none" :href="`/ranking/contest/${this.$route.params.contestId}`">查看完整榜单</b-link> |
            <b-link class="text-decoration-none" @click="refreshRanking">刷新榜单</b-link>
          </p>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import date2Text from "@/util/date-to-str";
import CountdownCard from "@/components/contest/countdown-card";
import RankingTableContest from "@/components/ranking/ranking-table-contest";

export default {
  name: 'entity-page-contest',
  components: {RankingTableContest, CountdownCard},
  data: function () {
    return {
      contestId: '',
      contestData: {},
      problemsData: [],
      isDetailsLoading: true,
      isProblemsLoading: true
    }
  },
  methods: {
    loadAssignmentData: function () {
      this.$http.get(`${window.backendOrigin}/api/contest/id/${this.contestId}`).then(res => {
        this.contestData = res.data
        this.isDetailsLoading = false
      })
      this.$http.get(`${window.backendOrigin}/api/problem/problemset/${this.contestId}`).then(res => {
        this.problemsData = res.data
        this.isProblemsLoading = false
      })
    },
    getLocaleDate: function (string) {
      return date2Text(string)
    },
    refreshRanking: function () {
      this.$refs['ranking-table'].refresh()
      this.$bvToast.toast(`刷新完成`, {
        title: '提示',
        autoHideDelay: 5000,
        appendToast: true,
        variant: 'success'
      })
    }
  },
  mounted() {
    this.contestId = this.$route.params.contestId
    this.loadAssignmentData()
  }
}
</script>

<style scoped>

</style>
