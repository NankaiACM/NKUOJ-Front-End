<template>
  <div>
    <b-card title="南开大学 ACM 算法协会" sub-title="欢迎喵">
      <b-link v-b-toggle.collapse-1 class="text-decoration-none text-muted">显示二维码</b-link>
      <b-collapse id="collapse-1" class="mt-2">
        <img class="img-fluid" src="../../assets/qq-group.jpg" alt="QQ Group ID: 1001918732">
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "association-poster-panel"
}
</script>

<style scoped>

</style>
