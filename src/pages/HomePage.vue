<template>
<div class="container">
  <div class="row">
    <div class="col-8">
      <PanelCourse class="mb-4"/>
      <PanelAssignment/>
    </div>
    <div class="col-4">
      <PanelJump class="mb-4"/>
      <PanelBulletin/>
    </div>
  </div>
</div>
</template>

<script>

import PanelBulletin from "@/components/panels/PanelBulletin.vue";
import PanelCourse from "@/components/panels/PanelCourse.vue";
import PanelJump from "@/components/panels/PanelJump.vue";
import PanelAssignment from "@/components/panels/PanelAssignment.vue";

export default {
  name: "HomePage",
  components: {PanelAssignment, PanelJump, PanelCourse, PanelBulletin},
}
</script>

<style scoped>

</style>
