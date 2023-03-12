<template>
  <div class="card rounded-4 h-100 border-0 bg-light">
    <div class="card-body">
      <h4 class="card-subtitle mb-2">榜单</h4>
      <p class="card-text">查看考试、竞赛榜单。</p>
    </div>
    <div class="card-footer text-muted bg-transparent border-top-0">
      <a href="#" class="card-link text-decoration-none text-purple" @click="showIndexExamModal">考试榜单</a>
      <a href="#" class="card-link text-decoration-none text-purple" @click="showIndexContestModal">竞赛榜单</a>
    </div>
    <ModalAdminIndexProblemSet ref="modal_index_problem_set_contest" @then="toContestRanking"/>
    <ModalAdminIndexProblemSet ref="modal_index_problem_set_exam" @then="toExamRanking"/>
  </div>
</template>

<script>
import ModalAdminIndexProblemSet from "@/components/modal/ModalAdminIndexProblemSet.vue";
import router from "@/router";

export default {
  name: "CardRanking",
  components: {ModalAdminIndexProblemSet},
  methods: {
    toContestRanking: function (id) {
      router.push(`/admin/ranking/contest/${id}`);
    },
    toExamRanking: function (id) {
      router.push(`/admin/ranking/exam/${id}`);
    },
    showIndexContestModal: function () {
      this.$refs.modal_index_problem_set_contest.show();
    },
    showIndexExamModal: function () {
      this.$refs.modal_index_problem_set_exam.show();
    }
  }
}
</script>

<style scoped>

</style>
