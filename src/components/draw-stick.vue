<template>
  <b-card body-bg-variant="light">
    <h6 class="text-center"> 今日运势 </h6>
    <div v-if="stickDrown">
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
    <div class="container d-flex justify-content-center" v-else>
      <b-button variant="secondary" @click="drawStick" class="m-2">求签！</b-button>
    </div>
  </b-card>
</template>

<script>
import drawAStick from "@/util/fortune-sticks";

export default {
  name: "draw-stick",
  data: function () {
    return {
      stickDrown: this.isStickDrown(),
      stickResult: drawAStick(this.$store.getters.getUID)
    }
  },
  methods: {
    isStickDrown: function() {
      return (new Date().getDate()) === this.$store.state.userData.lastPulledStick
    },
    drawStick: function () {
      this.$store.commit('setUserData', {lastPulledStick: new Date().getDate()})
      this.stickDrown = true
    }
  }
}
</script>

<style scoped>

</style>
