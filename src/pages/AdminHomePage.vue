<template>
<div class="container">
  <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
    <IconSliders class="text-purple me-2"/>
    <span class="text-purple page-title">管理中心</span>
  </div>
  <p class="text-purple ms-3">
    管理题目、作业、比赛、考试、用户等。
  </p>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    <div class="col">
      <CardManageProblem/>
    </div>
    <div class="col">
      <CardViewProblemSubmissions/>
    </div>
    <div class="col">
      <CardRejudge/>
    </div>
  </div>
</div>
</template>

<script>
import IconSliders from "@/components/icons/IconSliders.vue";
import CardManageProblem from "@/components/admin/CardManageProblem.vue";
import CardViewProblemSubmissions from "@/components/admin/CardViewProblemSubmissions.vue";
import CardRejudge from "@/components/admin/CardRejudge.vue";

export default {
  name: "AdminHomePage",
  components: {CardRejudge, CardViewProblemSubmissions, CardManageProblem, IconSliders}
}
</script>

<style scoped>

</style>
