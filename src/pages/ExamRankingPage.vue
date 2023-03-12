<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <span class="text-purple page-title">考试榜单</span>
    </div>
    <p class="text-purple ms-3">
      考试 #{{ this.$route.params.id }} | <a
      @click="refresh()" class="text-decoration-none text-purple" href="#"><IconArrowClockwiseSmall/>刷新</a> | <a
      class="text-decoration-none text-purple" :href="`/exam/${this.$route.params.id}`"><IconReplySmall/>跳转考试</a>
    </p>
    <p class="text-purple ms-3">
      您可以快速跳转到题目和提交记录。如需查看完整用户名，请选中后复制。
    </p>
    <RankingTableExam :id="this.$route.params.id" :limit="null" ref="ranking_table"/>
  </div>
</template>

<script>
import RankingTableExam from "@/components/ranking/RankingTableExam.vue";
import IconArrowClockwiseSmall from "@/components/icons/IconArrowClockwiseSmall.vue";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";

export default {
  name: "ExamRankingPage",
  components: {IconReplySmall, IconArrowClockwiseSmall, RankingTableExam},
  methods: {
    refresh : function () {
      this.$refs.ranking_table.refresh();
    }
  }
}
</script>

<style scoped>

</style>
