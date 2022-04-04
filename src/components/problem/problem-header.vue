<template>
  <b-skeleton-wrapper :loading="loading">
    <template #loading>
      <b-card>
        <h6 class="text-center">题目信息</h6>
        <b-skeleton width="100%"></b-skeleton>
      </b-card>
    </template>

    <b-card>
      <h6 class="text-center">题目信息 #{{pid}}</h6>
      <div class="row d-flex justify-content-center">
        <div class="btn-group m-2" role="group">
          <button type="button" disabled class="btn btn-sm btn-info">测试点数量</button>
          <button type="button" disabled class="btn btn-sm btn-light">{{ problemInfo.cases }}</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" disabled class="btn btn-sm btn-primary">时间限制</button>
          <button type="button" disabled class="btn btn-sm btn-light">{{ problemInfo.timeLimit }} ms</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" disabled class="btn btn-sm btn-warning">空间限制</button>
          <button type="button" disabled class="btn btn-sm btn-light">{{ problemInfo.memoryLimit }} KiB</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" disabled class="btn btn-sm btn-success">完成状态</button>
          <button type="button" disabled class="btn btn-sm btn-light">{{['未提交', '未通过', '已通过'][problemInfo.status]}}
          </button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" disabled class="btn btn-sm btn-primary">通过率</button>
          <button type="button" disabled class="btn btn-sm btn-light">{{ problemInfo.submitAc }} /
            {{ problemInfo.submitAll }}
          </button>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="btn-group m-2" role="group" v-if="problemInfo.specialJudge" v-b-popover.hover.bottom="'本题启用 Special Judge。所有输出会使用特别程序校验，而不是与标准输出进行比对。'">
          <button type="button" disabled class="btn btn-sm btn-outline-warning">Special Judge</button>
        </div>
        <div class="btn-group m-2" role="group" v-if="problemInfo.detailJudge" v-b-popover.hover.bottom="'本题启用 Detail Judge。所有测试点都会被评测，而不是遇到第一个非正确运行即停止评测。'">
          <button type="button" disabled class="btn btn-sm btn-outline-info">Detail Judge</button>
        </div>
      </div>
    </b-card>
  </b-skeleton-wrapper>
</template>

<script>
export default {
  name: "problem-header",
  props: {
    problemInfo: Object,
    loading: Boolean,
    pid: Number
  }
}
</script>

<style scoped>

</style>
