<template>
<div class="container">
  <h1 class="display-3 text-center pt-4 pb-4 text-muted">考试模式</h1>
  <h6 class="text-center text-muted">NKUOJ 处于考试模式，除考试外其他功能不可用。请遵守考场纪律，专心完成考试。</h6>
  <hr>
  <div class="fixed-bottom container d-flex justify-content-center pb-1 position-sticky mt-4">
    <div class="col-8">
      <h5 class="text-center text-muted m-2"><b-icon icon="person-badge" class="mr-2"></b-icon>考生信息</h5>
      <strict-profile-panel></strict-profile-panel>
    </div>
  </div>
  <div class="fixed-bottom container d-flex justify-content-center pb-1 position-sticky mt-4">
    <div class="col-8">
      <h5 class="text-center text-muted m-2"><b-icon icon="card-checklist" class="mr-2"></b-icon>考试列表</h5>
      <strict-exams-panel></strict-exams-panel>
    </div>
  </div>
</div>
</template>

<script>
import strictExamsPanel from '../../components/strict/strict-exams-panel'
import StrictProfilePanel from "@/components/strict/strict-profile-panel";

export default {
  name: "strict-home-page",
  components: {
    StrictProfilePanel,
    strictExamsPanel
  }
}
</script>

<style scoped>

</style>
