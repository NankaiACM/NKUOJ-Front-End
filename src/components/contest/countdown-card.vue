<template>
  <b-card title="倒计时">
    <div v-if="started && !ended">
      <h1 :class="`text-center ${variant}`">{{hours}}:{{String(minutes).padStart(2, '0')}}:{{String(seconds).padStart(2, '0')}}</h1>
      <b-progress :value="progress" :variant="progressVariant" striped animated class="mt-2"></b-progress>
    </div>
    <h1 class="text-center" v-else-if="!started">暂未开始</h1>
    <h1 class="text-center text-danger" v-else-if="ended">已经结束</h1>
  </b-card>
</template>

<script>
export default {
  name: "countdown-card",
  props: {
    begin: String,
    end: String,
    warningTime: Number
  },
  data: function () {
    return {
      currentDate: new Date()
    }
  },
  computed: {
    hours: function () {
      return Math.floor((new Date(Date.parse(this.end)) - this.currentDate) / (1000 * 3600))
    },
    minutes: function () {
      return Math.floor((new Date(Date.parse(this.end)) - this.currentDate - this.hours * 1000 * 3600) / (60 * 1000))
    },
    seconds: function () {
      return Math.floor((new Date(Date.parse(this.end)) - this.currentDate - this.hours * 1000 * 3600 - this.minutes * 60000) / (1000))
    },
    progress: function () {
      return 100 - (this.currentDate - new Date(Date.parse(this.begin))) / (new Date(Date.parse(this.end)) - new Date(Date.parse(this.begin))) * 100
    },
    started: function () {
      return this.currentDate > new Date(Date.parse(this.begin))
    },
    ended: function () {
      return this.currentDate > new Date(Date.parse(this.end))
    },
    variant: function () {
      if (this.hours === 0 && this.minutes < this.warningTime) {
        return this.seconds % 2 ? "text-dark" : "text-danger"
      }
      return "text-dark"
    },
    progressVariant: function () {
      if (this.hours === 0 && this.minutes < this.warningTime) {
        return "danger"
      }
      return "info"
    }
  },
  mounted() {
    const updater = () => {
      this.currentDate = new Date()
      setTimeout(updater, 1000)
    }
    setTimeout(updater, 1000)
  }
}
</script>

<style scoped>

</style>
