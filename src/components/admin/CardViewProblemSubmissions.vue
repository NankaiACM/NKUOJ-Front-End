<template>
  <div class="card rounded-4 h-100 border-0 bg-light">
    <div class="card-body">
      <h4 class="card-subtitle mb-2">题目完成数据</h4>
      <p class="card-text">查看和下载题目完成数据。</p>
    </div>
    <div class="card-footer text-muted bg-transparent border-top-0">
      <a href="#" class="card-link text-decoration-none text-purple" @click="showIndexProblemModal">索引题目</a>
      <a href="#" class="card-link text-decoration-none text-purple" @click="showSelectProblemModal">浏览题目</a>
    </div>
    <ModalAdminIndexProblem ref="modal_admin_index_problem" @then="toAdminProblem"/>
    <ModalAdminSelectProblem ref="modal_admin_select_problem" @then="toAdminProblem"/>
  </div>
</template>

<script>
import ModalAdminIndexProblem from "@/components/modal/ModalAdminIndexProblem.vue";
import ModalAdminSelectProblem from "@/components/modal/ModalAdminSelectProblem.vue";
import router from "@/router";

export default {
  name: "CardViewProblemSubmissions",
  components: {ModalAdminSelectProblem, ModalAdminIndexProblem},
  methods: {
    showIndexProblemModal: function () {
      this.$refs.modal_admin_index_problem.show();
    },
    showSelectProblemModal: function () {
      this.$refs.modal_admin_select_problem.show();
    },
    toAdminProblem: function (id) {
      router.push(`/admin/problem/submissions/${id}`);
    }
  }
}
</script>

<style scoped>

</style>
