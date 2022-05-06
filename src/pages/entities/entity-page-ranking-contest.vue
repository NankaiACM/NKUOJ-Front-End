<template>
  <div class="container">
    <div class="jumbotron text-center">
      <h1 class="display-6">竞赛榜单</h1>
      <b-link @click="backToProblemSet" class="text-decoration-none text-muted"><b-icon icon="caret-left" class="mr-1"></b-icon>返回竞赛</b-link> |
      <b-link @click="refresh" class="text-decoration-none text-muted"><b-icon icon="arrow-clockwise" class="mr-1"></b-icon>刷新榜单</b-link>
    </div>
    <ranking-table-contest :id="this.$route.params.contestId" ref="rankTable"></ranking-table-contest>
  </div>
</template>

<script>
import RankingTableContest from "@/components/ranking/ranking-table-contest";
export default {
  name: "entity-page-ranking-contest",
  components: {RankingTableContest},
  data: function () {
    return {

    }
  }, methods: {
    refresh: function () {
      this.$refs['rankTable'].refresh()
      this.$bvToast.toast(`刷新完成`, {
        title: '提示',
        autoHideDelay: 5000,
        appendToast: true,
        variant: 'success'
      })
    },
    backToProblemSet: function () {
      this.$router.push(`/contest/${this.$route.params.contestId}`)
    }
  }
}
</script>

<style scoped>

</style>
