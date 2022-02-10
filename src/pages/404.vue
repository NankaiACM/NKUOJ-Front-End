<template>
  <div class="container-fluid">
    <div class="container d-flex justify-content-center">
      <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="slogan m-5">
    </div>

    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card text-center m-3 pt-5 pb-5">
            <div class="card-body">
              <h5 class="card-title">(っ╥╯﹏╰╥c)</h5>
              <p class="text-muted mt-4">您要访问的网页不存在，或者您没有权限</p>
              <a class="btn btn-info mt-5" type="button" href="/">返回首页</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
  computed: {
    stickerIndex: function () {
      const min = Math.ceil(0)
      const max = Math.floor(8)
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
}
</script>

<style>
.slogan {
  height: 100px;
}
</style>
