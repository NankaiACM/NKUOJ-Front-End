<template>
  <div class="container d-flex justify-content-center flex-column text-center">
    <hr class="my-4 custom-foot-hr">
    <p class="footer-text-1">NKUOJ © NKU ACM Association, All Rights Reserved. </p>
    <p class="footer-text-1">NKUOJ 目前处于考试模式，部分功能不可用。</p>
  </div>
</template>

<script>
export default {
  name: 'strict-footer'
}
</script>

<style lang="less">
.footer-text-1 {
  color: #888888;
  font-size: 12px;
}
.custom-foot-hr {
  border: 0;
  width: 100%;
  background-color:#cccccc;
  height: 1px;
}
</style>
