<template>
  <b-card v-if="details" title="测试点信息">
    <b-button disabled class="square-box m-1" :variant="statusToVariant(detail.status)" v-for="[i, detail] in details.entries()" :key="i">
      <h5 class="text-nowrap">{{statusToCode(detail.status)}}</h5>
      <small class="subtitle-text text-nowrap">{{detail.time}}ms/{{detail.memory >= 10000 ? `${Math.round(detail.memory / 1024)}M` : `${detail.memory}K`}}</small>
    </b-button>
  </b-card>

</template>

<script>
import status2code from '@/util/status-code-to-str-short'
import status2variant from '@/util/status-code-to-variant-str'

export default {
  name: "status-details-button",
  props: {
    details: Array
  },
  methods: {
    statusToCode: function (s) {
      return status2code(s)
    },
    statusToVariant: function (s) {
      return status2variant(s)
    }
  }
}
</script>

<style scoped>
.square-box {
  width: 100px;
  height: 100px;
}
.subtitle-text {
  font-size: 11px;
}
</style>
