<template>
<div class="oj-pattern-background">
  <div class="container mt-5 mb-5">
    <div class="d-flex flex-column align-items-center">
      <h4 class="text-purple text-center m-4" v-if="isFoolsDay">欢迎加入天津大学 ACM 算法协会</h4>
      <h4 class="text-purple text-center m-4" v-else>欢迎加入南开大学 ACM 算法协会</h4>
      <div class="card rounded-4 img-card">
        <img src="/qq-group.jpg" alt="QQ Group Number: 639336485" class="card-img-top rounded-4">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "AlgoAssociationPage",
  computed: {
    isFoolsDay: function () {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      return month === 4 && day === 1;
    }
  }
}
</script>

<style scoped>
.img-card {
  max-width: 20rem;
}
</style>
