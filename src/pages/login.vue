<template>
  <div class="container-fluid">
    <div class="container d-flex justify-content-center">
      <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="slogan m-5">
    </div>

    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card text-center m-3 shadow-sm">
            <img src="../assets/Sakura_Nene_CPP.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">南开大学计算机课程辅助评测系统</h5>
              <p>本站由 ACM 算法协会开发、维护，旨在为南开的计算机程序设计类课程提供评判系统。</p>
            </div>
            <div class="card-body">
              <h5 class="card-title">登录以继续</h5>
              <div class="container d-flex justify-content-center">
                <div class="buttons-wrapper">
                  <b-button pill variant="outline-info" class="btn-block" @click="showLoginModal">登录</b-button>
                  <b-button pill variant="outline-success" class="btn-block" @click="showSignupModal">注册</b-button>
                </div>
              </div>
              <p class="m-2 text-secondary">忘记密码或者帐号已被注册？<a @click="showResetModal" href="#" class="link-info">点击重置</a>。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <login-modal ref="login-modal"></login-modal>
    <signup-modal ref="signup-modal"></signup-modal>
    <reset-pwd-modal ref="reset-pwd-modal"></reset-pwd-modal>
  </div>
</template>

<script>
import loginModal from "@/components/login/login-modal";
import signupModal from "@/components/login/signup-modal";
import resetPwdModal from "@/components/login/reset-pwd-modal";

export default {
  name: 'login',
  components: {
    loginModal,
    signupModal,
    resetPwdModal
  },
  methods: {
    showLoginModal: function () {
      this.$refs['login-modal'].show()
    },
    showResetModal: function () {
      this.$refs['reset-pwd-modal'].show()
    },
    showSignupModal: function () {
      this.$refs['signup-modal'].show()
    },
  },
}
</script>

<style scoped>
.slogan {
  height: 100px;
}
.buttons-wrapper {
  width: 16rem;
}
</style>
