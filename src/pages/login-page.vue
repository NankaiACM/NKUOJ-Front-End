<template>
  <div class="container-fluid">
    <div class="container d-flex justify-content-center">
      <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="slogan m-5">
    </div>

    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <b-alert variant="info" show class="text-center mt-5 md-5 p-5" v-if="checkIfUsingIP">
            <h4>网站域名已经可用！</h4>
            <hr>
            <p class="mt-5 md-5">请使用<b-link href="https://acm.nankai.edu.cn/">acm.nankai.edu.cn</b-link>访问我们的网页～</p>
          </b-alert>

          <div class="card text-center m-3 shadow-sm" v-else>
            <img src="../assets/login-img.jpg" class="card-img-top" alt="...">
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
              <p class="m-2 text-secondary">忘记密码或者帐号已被注册？<b-link @click="showResetModal" class="link-info">点击重置</b-link>。</p>
              <b-form-checkbox id="checkbox-student" v-model="isStudent" name="i-am-student"
                               value="true" unchecked-value="false" class="text-muted">
                我是学生
              </b-form-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>

    <login-modal ref="login-modal" :is-student="isStudent === 'true'"></login-modal>
    <signup-modal ref="signup-modal" :is-student="isStudent === 'true'"></signup-modal>
    <reset-pwd-modal ref="reset-pwd-modal" :is-student="isStudent === 'true'"></reset-pwd-modal>
  </div>
</template>

<script>
import loginModal from "@/components/login/login-modal";
import signupModal from "@/components/login/signup-modal";
import resetPwdModal from "@/components/login/reset-pwd-modal";

export default {
  name: 'login-page',
  components: {
    loginModal,
    signupModal,
    resetPwdModal
  },
  data: function () {
    return {
      isStudent: 'true'
    }
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
  computed: {
    checkIfUsingIP: function () {
      return window.location.href.indexOf('222.30.51.68:8080') > -1
    }
  }
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
