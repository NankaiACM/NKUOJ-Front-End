<template>
  <div class="container-fluid pattern-background">
    <div class="container d-flex justify-content-center">
      <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="page-slogan m-5">
    </div>

    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card text-center m-3 shadow-sm">
            <img v-if="imageIndex === 0" src="../assets/404-img/new-game.jpg" class="card-img-top" alt="...">
            <img v-if="imageIndex === 1" src="../assets/404-img/ReLIFE-Confused.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">404-未找到</h5>
              <p>本页面未找到，或者您没有足够的权限访问。</p>
            </div>
            <div class="card-body">
              <h5 class="card-title">继续</h5>
              <div class="container d-flex justify-content-center">
                <div class="buttons-wrapper">
                  <b-button pill variant="outline-warning" class="btn-block" @click="toPreviousPage()">返回前页</b-button>
                  <b-button pill variant="outline-success" class="btn-block" @click="$router.replace('/')">返回首页</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found-page',
  computed: {
    imageIndex: function () {
      return Math.random() < 0.5 ? 0 : 1
    }
  },
  methods: {
    toPreviousPage: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.page-slogan {
  height: 100px;
}
.buttons-wrapper {
  width: 16rem;
}
.pattern-background {
  background: url("../assets/pattern.svg");
}
</style>
