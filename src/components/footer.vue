<template>
  <div class="container d-flex justify-content-center flex-column text-center">
    <hr class="my-4 custom-foot-hr">
    <p class="footer-text-1">NKUOJ © NKU ACM Association, All Rights Reserved. </p>
    <p class="footer-text-1">如需技术支持请联系 ACM 算法协会</p>
  </div>
</template>

<script>
export default {
  name: 'foot'
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
