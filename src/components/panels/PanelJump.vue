<template>
  <div>
    <h5 class="ms-3 d-inline-flex align-items-center justify-content-between">
      <IconJump/>
      <span class="ms-2 me-1">跳转题目</span>
      <IconChevronDoubleRight/>
    </h5>
    <div class="ms-4 me-4">
      <div class="input-group">
        <input type="number" class="form-control" placeholder="请输入题目ID..." v-model="pid">
        <button class="btn btn-outline-purple" @click="jumpTo()">跳转</button>
      </div>
    </div>
  </div>
</template>

<script>
import IconJump from "@/components/icons/IconJump.vue";
import IconChevronDoubleRight from "@/components/icons/IconChevronDoubleRight.vue";

export default {
  name: "PanelJump",
  components: {IconChevronDoubleRight, IconJump},
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
        window.location.push(`/problem/${this.pid}`)
        this.state = null
      }
    }
  }
}
</script>

<style scoped>

</style>
