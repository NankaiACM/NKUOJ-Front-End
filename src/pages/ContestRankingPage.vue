<template>
<div class="container">
  <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
    <span class="text-purple page-title">竞赛榜单</span>
  </div>
  <p class="text-purple ms-3">
    竞赛 #{{ this.$route.params.id }} | <a
    @click="refresh()" class="text-decoration-none text-purple" href="#"><IconArrowClockwiseSmall/>刷新</a> | <a
    class="text-decoration-none text-purple" :href="`/contest/${this.$route.params.id}`"><IconReplySmall/>返回</a>
  </p>
  <p class="text-purple ms-3">
    您可以快速跳转到题目和提交记录。如需查看完整用户名，请选中后复制。
  </p>
  <RankingTableContest :id="this.$route.params.id" :limit="null" ref="ranking_table"/>
</div>
</template>

<script>
import RankingTableContest from "@/components/ranking/RankingTableContest.vue";
import IconArrowClockwiseSmall from "@/components/icons/IconArrowClockwiseSmall.vue";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";

export default {
  name: "ContestRankingPage",
  components: {IconReplySmall, IconArrowClockwiseSmall, RankingTableContest},
  methods: {
    refresh : function () {
      this.$refs.ranking_table.refresh();
    }
  }
}
</script>

<style scoped>

</style>
