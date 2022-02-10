<template>
  <div class="container">
    <b-card>
      <div class="container-fluid text-center">
        <h4>请通过验证后加入</h4>
        <h6 class="text-muted">本场竞赛或考试采用防作弊验证。请您输入考试或竞赛组织人员提供的口令。</h6>
        <h6 class="text-muted">请注意，请在开场后十五分钟之内完成验证。如超过验证可行时间，则还需要组织者亲自在此输入密码。</h6>
        <h6 class="text-muted">请勿在通过验证后退出登录或者关闭浏览器。否则您需要重新登录、重新验证。</h6>
        <h6 class="text-muted">如果验证失败，请检查口令、密码是否正确，或者刷新页面。</h6>
      </div>
      <div class="form-group">
        <label>口令：</label>
        <b-form-input type="text" v-model="securityCode"></b-form-input>
        <small class="form-text text-muted">该口令将由监考人员或者竞赛组织人员公布。</small>
      </div>
      <div class="form-group">
        <label>密码：</label>
        <b-form-input type="password" v-model="password"></b-form-input>
        <small class="form-text text-muted">您已经超过可以正常验证的时间，需要特殊验证。请监考人员<span class="text-danger">亲自</span>在此输入密码。该密码可以在管理面板查看。</small>
      </div>
      <div class="container mt-4 d-flex justify-content-center">
        <b-button variant="outline-primary" class="m-2">验证并进入</b-button>
        <b-button variant="danger" class="m-2">签退</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'authorize',
  data: function () {
    return {
      password: '',
      securityCode: ''
    }
  }
}
</script>

<style scoped>

</style>
