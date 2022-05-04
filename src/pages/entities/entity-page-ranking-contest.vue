<template>
  <div class="container">
    <div class="jumbotron text-center">
      <h1 class="display-6">竞赛榜单</h1>
      <b-link @click="backToProblemSet" class="text-decoration-none text-muted"><b-icon icon="caret-left" class="mr-1"></b-icon>返回竞赛</b-link> |
      <b-link @click="toggleAutoRefresh" class="text-decoration-none text-muted" v-if="autoRefresh"><b-icon icon="pause-circle" class="mr-1"></b-icon>自动刷新</b-link>
      <b-link @click="toggleAutoRefresh" class="text-decoration-none text-muted" v-else><b-icon icon="play-circle" class="mr-1"></b-icon>刷新暂停</b-link>
    </div>
    <ranking-table-contest :id="this.$route.params.contestId" :auto-refresh-enabled="autoRefresh" :auto-refresh-interval="autoRefreshInterval * 1000"></ranking-table-contest>
  </div>
</template>

<script>
import RankingTableContest from "@/components/ranking/ranking-table-contest";
export default {
  name: "entity-page-ranking-contest",
  components: {RankingTableContest},
  data: function () {
    return {
      autoRefresh: true,
      autoRefreshInterval: 10
    }
  }, methods: {
    toggleAutoRefresh: function () {
      if (this.autoRefresh) {
        this.autoRefresh = false
        this.$bvToast.toast(`已经关闭自动刷新。`, {
          title: '提示',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger'
        })
      } else {
        this.autoRefresh = true
        this.$bvToast.toast(`已经开启自动刷新。每${this.autoRefreshInterval}秒会对数据进行自动刷新。`, {
          title: '提示',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'success'
        })
      }
    },
    backToProblemSet: function () {
      this.$router.push(`/contest/${this.$route.params.contestId}`)
    }
  }
}
</script>

<style scoped>

</style>
