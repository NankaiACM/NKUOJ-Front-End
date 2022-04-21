<template>
  <b-card title="倒计时">
    <div v-if="enabled">
      <h1 :class="`text-center ${variant}`">{{hours}}:{{String(minutes).padStart(2, '0')}}:{{String(seconds).padStart(2, '0')}}</h1>
      <b-progress :value="progress" variant="info" striped animated class="mt-2"></b-progress>
    </div>
    <h1 class="text-center" v-else>暂未开始</h1>
  </b-card>
</template>

<script>
export default {
  name: "countdown",
  props: {
    begin: String,
    end: String
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
      return (this.currentDate - new Date(Date.parse(this.begin))) / (new Date(Date.parse(this.end)) - new Date(Date.parse(this.begin))) * 100
    },
    enabled: function () {
      return new Date() > new Date(Date.parse(this.begin))
    },
    variant: function () {
      if (this.hours === 0 && this.minutes < 5) {
        return this.seconds % 2 ? "text-dark" : "text-danger"
      }
      return "text-dark"
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
