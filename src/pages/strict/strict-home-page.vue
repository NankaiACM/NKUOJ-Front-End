<template>
<div class="container">
  <h1 class="display-3 text-center pt-4 pb-4 text-muted">考试模式</h1>
  <h6 class="text-center text-muted" v-if="this.$store.getters.isServerStrictMode">NKUOJ 处于考试模式，除考试外其他功能不可用。请遵守考场纪律，专心完成考试。</h6>
  <h6 class="text-center text-muted" v-else>NKUOJ 服务器暂未启用考试模式。您可以<b-link class="text-decoration-none" @click="exitStrictMode">点此退出</b-link>。</h6>
  <hr>
  <div class="container d-flex justify-content-center pb-1 mt-4">
    <div class="col-md-8">
      <h5 class="text-center text-muted m-2"><b-icon icon="person-badge" class="mr-2"></b-icon>考生信息</h5>
      <strict-profile-panel></strict-profile-panel>
    </div>
  </div>
  <div class="container d-flex justify-content-center pb-1 mt-4">
    <div class="col-md-8">
      <h5 class="text-center text-muted m-2"><b-icon icon="card-checklist" class="mr-2"></b-icon>考试列表</h5>
      <strict-exams-panel></strict-exams-panel>
    </div>
  </div>
  <div class="container d-flex justify-content-center pb-1 mt-4">
    <div class="col-md-8">
      <h5 class="text-center text-muted m-2"><b-icon icon="trophy" class="mr-2"></b-icon>竞赛列表</h5>
      <strict-contests-panel></strict-contests-panel>
    </div>
  </div>
</div>
</template>

<script>
import strictExamsPanel from '../../components/strict/strict-exams-panel'
import strictContestsPanel from '../../components/strict/strict-contests-panel'
import StrictProfilePanel from "@/components/strict/strict-profile-panel";

export default {
  name: "strict-home-page",
  components: {
    StrictProfilePanel,
    strictExamsPanel,
    strictContestsPanel
  },
  methods: {
    exitStrictMode: function () {
      this.$store.commit('setVersion', {
        clientStrictMode: false
      })
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>
