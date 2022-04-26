<template>
  <b-modal id="fortune-stick-modal" title="每日签到" centered ok-title="坠吼滴" ok-only auto-focus-button="ok">
    <h6 class="text-center"> 今日运势 </h6>
    <div>
      <h1 :class="`text-${['danger', 'danger', 'success', 'dark', 'dark'][stickResult.primary.type]} text-center`">
        § {{stickResult.primary.title}} § </h1>
      <div class="row">
        <div class="col-md-6">
          <div v-for="item in stickResult.secondary.good" :key="item.title">
            <h6 class="text-center"> 宜：{{item.title}} </h6>
            <h6 class="text-muted text-center"> {{item.summary}} </h6>
          </div>
        </div>
        <div class="col-md-6">
          <div v-for="item in stickResult.secondary.bad" :key="item.title">
            <h6 class="text-center"> 忌：{{item.title}} </h6>
            <h6 class="text-muted text-center"> {{item.summary}} </h6>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import drawAStick from "@/util/fortune-sticks";

export default {
  name: "fortune-stick-modal",
  computed: {
    stickResult: function () {
      return drawAStick(this.$store.getters.getUID)
    }
  },
  methods: {
    show: function () {
      this.$bvModal.show('fortune-stick-modal')
    }
  }
}
</script>

<style scoped>

</style>
