<template>
<div class="container oj-pattern-background h-100 w-100">
  <div class="d-flex flex-column h-100 justify-content-center align-items-center">
    <div class="d-flex justify-content-center align-items-center">
      <img class="slogan-404" src="/tjuoj-slogan.svg" alt="Tianjin University Online Judge" v-if="isFoolsDay">
      <img class="slogan-404" src="/nkuoj-slogan.svg" alt="Nankai University Online Judge" v-else>
      <div class="vertical-separator ms-3"></div>
      <span class="text-purple text-404 ms-3">404</span>
    </div>
    <h4 class="text-center text-purple mt-4">本页面未找到，或者您没有足够的权限访问。</h4>
    <div>
      <a class="btn btn-outline-purple mt-3" href="/" type="button">返回首页</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "NotFoundPage",
  computed: {
    isFoolsDay: function () {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      return month === 4 && day === 1;
    }
  }
}
</script>

<style scoped>
.slogan-404 {
  height: 100px;
}
.text-404 {
  font-size: xxx-large;
}
</style>
