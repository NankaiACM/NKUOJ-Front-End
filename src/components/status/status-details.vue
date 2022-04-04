<template>
  <b-card v-if="details" title="测试点信息">
    <b-button disabled class="square-box m-1" :variant="statusToVariant(detail.status)" v-for="detail in details" :key="detail">
      <p class="text-nowrap">{{statusToCode(detail.status)}}</p>
      <small class="text-nowrap">{{detail.time}}ms/{{detail.memory}}K</small>
    </b-button>
  </b-card>

</template>

<script>
import status2code from '@/util/status-code'
import status2variant from '@/util/status-variant'

export default {
  name: "status-details",
  props: {
    details: Object
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
</style>
