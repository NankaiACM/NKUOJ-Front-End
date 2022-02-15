<template>
  <b-button :variant="statusColorVariant" block disabled class="p-3">
    <b-spinner small v-if="status <= 100"></b-spinner>
    {{ statusText }}
  </b-button>
</template>

<script>
export default {
  name: 'status-button',
  props: {
    status: Number
  },
  computed: {
    statusText: function () {
      switch (this.status) {
        case 99:
          return '排队中...'
        case 100:
          return '评测中...'
        case 107:
          return '答案正确'
        case 102:
          return '答案错误'
        case 108:
          return '答案正确（格式有误）'
        case 101:
          return '编译失败'
        case 103:
          return '运行时错误'
        case 105:
          return '运行超时'
        case 104:
          return '内存超限'
        case 106:
          return '输出超限'
        case 109:
          return '函数数量超限'
        case 118:
          return '评测系统错误'
        case 98:
          return '正在编译'
        case 110:
          return '多组数据'
      }
      return '未知状态'
    },
    statusColorVariant: function () {
      switch (this.status) {
        case 99:
          return 'secondary'
        case 100:
          return 'secondary'
        case 107:
          return 'success'
        case 102:
          return 'danger'
        case 108:
          return 'success'
        case 101:
          return 'warning'
        case 103:
          return 'primary'
        case 105:
          return 'info'
        case 104:
          return 'info'
        case 106:
          return 'dark'
        case 109:
          return 'dark'
        case 118:
          return 'dark'
        case 110:
          return 'dark'
        case 98:
          return 'secondary'
      }
      return 'light'
    }
  }
}
</script>

<style scoped>

</style>
