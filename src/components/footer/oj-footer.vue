<template>
  <div class="container d-flex justify-content-center flex-column text-center">
    <hr class="my-4 custom-foot-hr">
    <p class="footer-text-1">NKUOJ © NKU ACM Association, All Rights Reserved. </p>
    <p class="footer-text-1">来 Github Star 我们喵～
      <b-link class="text-decoration-none text-muted" href="https://github.com/NankaiACM/NKUOJ-Front-End"><b-icon icon="github" class="mr-1"></b-icon>前端</b-link> |
      <b-link class="text-decoration-none text-muted" href="https://github.com/ArcanusNEO/ArcOJ-BackEnd"><b-icon icon="github" class="mr-1"></b-icon>后端</b-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'oj-footer'
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
