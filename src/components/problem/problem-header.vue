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
          <button type="button" class="btn btn-sm btn-info disabled">测试点数量</button>
          <button type="button" class="btn btn-sm btn-light disabled">{{ problemInfo.cases }}</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-sm btn-primary disabled">时间限制</button>
          <button type="button" class="btn btn-sm btn-light disabled">{{ problemInfo.timeLimit }} ms</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-sm btn-warning disabled">空间限制</button>
          <button type="button" class="btn btn-sm btn-light disabled">{{ problemInfo.memoryLimit }} KiB</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-sm btn-success disabled">完成状态</button>
          <button type="button" class="btn btn-sm btn-light disabled">{{['未提交', '未通过', '已通过'][problemInfo.status]}}
          </button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-sm btn-primary disabled">通过率</button>
          <button type="button" class="btn btn-sm btn-light disabled">{{ problemInfo.submitAc }} /
            {{ problemInfo.submitAll }}
          </button>
        </div>
        <div class="btn-group m-2" role="group" v-if="problemInfo.specialJudge !== 0">
          <button type="button" class="btn btn-sm btn-outline-warning disabled">Special Judge</button>
        </div>
        <div class="btn-group m-2" role="group" v-if="problemInfo.detailJudge">
          <button type="button" class="btn btn-sm btn-outline-info disabled">Detail Judge</button>
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
