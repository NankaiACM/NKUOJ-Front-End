<template>
  <b-modal id="warning-modal" ok-title="关闭" title="考试模式-警告" header-bg-variant="danger" ok-only centered no-close-on-backdrop no-close-on-esc hide-header-close>
    <ul>
      <li>您现在已经进入考试模式，请遵守考试秩序；</li>
      <li>到达考试开始时间时，请使用页面中的<span class="text-muted"><b-icon icon="arrow-clockwise"></b-icon>刷新</span>刷新页面，不要使用<span class="text-danger">F5</span>或浏览器的<span class="text-danger"><b-icon icon="arrow-clockwise"></b-icon>按钮</span>，避免您无法进入考试页面；</li>
      <li>如若考试时间未到，<span class="text-danger">请勿频繁刷新页面</span>，将带宽留给其他还未进入的同学！</li>
    </ul>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-between align-items-center">
        <b-form-checkbox id="checkbox-not-show-again" name="checkbox-not-show-again" v-model="doNotShowAgain">
          <span class="text-muted">我已知晓，不要再次显示</span>
        </b-form-checkbox>
        <b-button variant="danger" class="float-right" @click="hide()" :disabled="hideAvailability > 0">
          关闭{{ hideAvailability === 0 ? '' : ` (${hideAvailability})` }}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "strict-warning-modal",
  data: function () {
    return {
      doNotShowAgain: false,
      hideAvailability: 10
    }
  },
  methods: {
    show: function () {
      this.$bvModal.show('warning-modal')
    },
    hide: function () {
      this.$bvModal.hide('warning-modal')
      if (this.doNotShowAgain) {
        this.$store.commit('setWarningRead', {strictModeWarnings: true})
      }
    },
    countDownHideAvailability: function () {
      --this.hideAvailability;
      if (this.hideAvailability > 0) {
        setTimeout(this.countDownHideAvailability, 1000);
      }
    }
  },
  mounted() {
    setTimeout(this.countDownHideAvailability, 1000);
  }
}
</script>

<style scoped>

</style>
