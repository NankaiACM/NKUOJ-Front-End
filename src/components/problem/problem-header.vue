<template>
  <div class="jumbotron">
    <h1 class="display-6 d-flex justify-content-center">{{ problemInfo.title ? problemInfo.title : '(～﹃～)~zZ' }}</h1>
    <div class="container-md">
      <div class="row d-flex justify-content-center">
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-info disabled">测试点数量</button>
          <button type="button" class="btn btn-light disabled">{{ problemInfo.cases }}</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-primary disabled">时间限制</button>
          <button type="button" class="btn btn-light disabled">{{ problemInfo.time_limit }} ms</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-warning disabled">空间限制</button>
          <button type="button" class="btn btn-light disabled">{{ problemInfo.memory_limit }} kB</button>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-success disabled">完成状态</button>
          <button type="button" class="btn btn-light disabled">{{ ['未提交', '未通过', '已提交'][problemInfo.status] }}</button>
        </div>
        <div class="btn-group m-2" role="group">
          <button type="button" class="btn btn-primary disabled">通过率</button>
          <button type="button" class="btn btn-light disabled">{{ problemInfo.submit_ac }} / {{ problemInfo.submit_all }}</button>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="btn-group m-2" role="group" v-if="problemInfo.enabledSpecialJudge">
          <button type="button" class="btn btn-outline-warning disabled">Special Judge</button>
        </div>
        <div class="btn-group m-2" role="group" v-if="problemInfo.enabledDetailJudge">
          <button type="button" class="btn btn-outline-info disabled">Detail Judge</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "problem-header",
  props: {
    problemInfo: Object
  }
}
</script>

<style scoped>

</style>
