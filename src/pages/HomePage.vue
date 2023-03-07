<template>
<div class="container mb-4">
  <div class="row">
    <div class="col-md-8 col-12 order-last order-md-first ">
      <PanelCourse class="mb-4"/>
      <PanelAssignment class="mb-4"/>
      <PanelContestExam class="mb-4"/>
    </div>
    <div class="col-md-4 col-12 order-first order-md-last">
      <PanelJump class="mb-4 d-none d-md-block"/>
      <PanelBulletin class="mb-4"/>
    </div>
  </div>
</div>
</template>

<script>

import PanelBulletin from "@/components/panels/PanelBulletin.vue";
import PanelCourse from "@/components/panels/PanelCourse.vue";
import PanelJump from "@/components/panels/PanelJump.vue";
import PanelAssignment from "@/components/panels/PanelAssignment.vue";
import PanelContestExam from "@/components/panels/PanelContestExam.vue";

export default {
  name: "HomePage",
  components: {PanelContestExam, PanelAssignment, PanelJump, PanelCourse, PanelBulletin},
}
</script>

<style scoped>

</style>
