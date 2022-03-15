<template>
  <b-card>
    <template #header>
      <h6 class="m-1"><b-icon icon="reply" class="mr-2"></b-icon>快速跳转</h6>
    </template>

    <b-input-group>
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input type="number" @keydown.enter.native="jumpTo" no-wheel placeholder="请输入题目ID..." v-model="pid" :state="state"></b-form-input>
    </b-input-group>
  </b-card>
</template>

<script>
export default {
  name: "jump-panel",
  data: function () {
    return {
      pid: null,
      state: null
    }
  },
  methods: {
    jumpTo: function () {
      if (isNaN(this.pid) || this.pid === null) {
        this.state = false
      } else {
        this.$router.push(`/problem/${this.pid}`)
        this.state = null
      }
    }
  }
}
</script>

<style scoped>

</style>
