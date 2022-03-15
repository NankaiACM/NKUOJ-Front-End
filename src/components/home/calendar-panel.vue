<template>
  <b-card>
    <template #header>
      <h6 class="m-1"><b-icon icon="calendar3" class="mr-2"></b-icon>日历</h6>
    </template>

    <b-calendar readonly block hide-header></b-calendar>
  </b-card>

</template>

<script>
export default {
  name: "calendar-panel"
}
</script>

<style scoped>

</style>
