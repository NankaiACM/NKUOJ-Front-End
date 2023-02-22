<template>
  <div class="container">
    <div class="jumbotron text-center">
      <h1 class="display-6">考试榜单</h1>
      <b-link @click="backToProblemSet" class="text-decoration-none text-muted"><b-icon icon="caret-left" class="mr-1"></b-icon>返回考试</b-link> |
      <b-link @click="refresh" class="text-decoration-none text-muted"><b-icon icon="arrow-clockwise" class="mr-1"></b-icon>刷新榜单</b-link>
    </div>
    <ranking-table-exam :id="this.$route.params.examId" ref="rankTable"></ranking-table-exam>
    <h6 class="card-subtitle mb-2 text-muted">提示：点击本表格后，使用左右方向键可以实现水平滚动。</h6>
  </div>
</template>

<script>
const RankingTableExam = () => import("@/components/ranking/ranking-table-exam");

export default {
name: "entity-page-ranking-exam",
  components: {RankingTableExam},
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
      this.$router.push(`/exam/${this.$route.params.examId}`)
    }
  }
}
</script>

<style scoped>

</style>
