<template>
  <div class="card p-2 rounded-4 border-0 bg-light">
    <div class="card-body">
      <h5 class="d-inline-flex align-items-center mb-3">
        <IconClockHistory/>
        <span class="ms-2 me-1">倒计时</span>
        <IconChevronDoubleRightSmall/>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">本倒计时基于您计算机的时间</h6>
      <div v-if="started && !ended && !loading">
        <h1 :class="`text-center ${variant}`">{{hours}}:{{String(minutes).padStart(2, '0')}}:{{String(seconds).padStart(2, '0')}}</h1>
        <div class="progress mt-2">
          <div :class="`progress-bar progress-bar-striped progress-bar-animated ${progressVariant}`"
               role="progressbar" :style="`width: ${progress}%`"></div>
        </div>
      </div>
      <h1 class="text-center" v-else-if="loading">未知</h1>
      <h1 class="text-center" v-else-if="!started">暂未开始</h1>
      <h1 class="text-center text-danger" v-else-if="ended">已经结束</h1>
    </div>
  </div>
</template>

<script>
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconClockHistory from "@/components/icons/IconClockHistory.vue";

export default {
  name: "CardProgressBar",
  components: {IconClockHistory, IconChevronDoubleRightSmall},
  props: {
    begin: String,
    end: String,
    warningTime: Number,
    loading: Boolean
  },
  data: function () {
    return {
      currentDate: new Date()
    }
  },
  computed: {
    hours: function () {
      return Math.floor((new Date(Date.parse(this.end)) - this.currentDate) / (1000 * 3600));
    },
    minutes: function () {
      return Math.floor((new Date(Date.parse(this.end)) - this.currentDate - this.hours * 1000 * 3600) / (60 * 1000));
    },
    seconds: function () {
      return Math.floor((new Date(Date.parse(this.end)) - this.currentDate - this.hours * 1000 * 3600 - this.minutes * 60000) / (1000));
    },
    progress: function () {
      return Math.round(100 - (this.currentDate - new Date(Date.parse(this.begin))) / (new Date(Date.parse(this.end)) - new Date(Date.parse(this.begin))) * 100);
    },
    started: function () {
      return this.currentDate > new Date(Date.parse(this.begin));
    },
    ended: function () {
      return this.currentDate > new Date(Date.parse(this.end));
    },
    variant: function () {
      if (this.hours === 0 && this.minutes < this.warningTime) {
        return this.seconds % 2 ? "text-dark" : "text-danger";
      }
      return "text-dark";
    },
    progressVariant: function () {
      if (this.hours === 0 && this.minutes < this.warningTime) {
        return "bg-danger";
      }
      return "bg-info";
    }
  },
  mounted() {
    const updater = () => {
      this.currentDate = new Date();
      setTimeout(updater, 1000);
    };
    setTimeout(updater, 1000);
  }
}
</script>

<style scoped>

</style>
