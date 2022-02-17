<template>
  <b-button :variant="statusVariant()" block disabled class="p-3">
    <b-spinner small v-if="status <= 100"></b-spinner>
    {{ statusText() }}
  </b-button>
</template>

<script>
import status2text from '@/util/status-text'
import status2variant from '@/util/status-variant'

export default {
  name: 'status-button',
  props: {
    status: Number
  },
  methods: {
    statusText: function () {
      return status2text(this.status)
    },
    statusVariant: function () {
      return status2variant(this.status)
    }
  }
}
</script>

<style scoped>

</style>
