<template>
  <div class="container-fluid pattern-background">
    <div class="container d-flex justify-content-center">
      <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="page-slogan m-5">
    </div>

    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <b-alert variant="info" show class="text-center mt-5 md-5 p-5" v-if="clientUsingIP">
            <h4>网站域名已经可用！</h4>
            <hr>
            <p class="mt-5 md-5">请使用<b-link href="https://acm.nankai.edu.cn/">acm.nankai.edu.cn</b-link>访问我们的网页～</p>
          </b-alert>

          <div class="card text-center m-3 shadow-sm" v-else>
            <div class="card-body">
              <h5 class="card-title">南开大学计算机课程辅助评测系统</h5>
              <p>本站由 ACM 算法协会开发、维护，旨在为南开的计算机程序设计类课程提供评判系统。</p>
            </div>
            <div class="card-body">
              <h5 class="card-title" v-if="hasRedirectPath">登录以继续访问</h5>
              <h5 class="card-title" v-else>进入本系统</h5>
              <div class="container d-flex justify-content-center">
                <div class="buttons-wrapper">
                  <b-button pill variant="outline-info" class="btn-block" @click="showLoginModal">登录</b-button>
                  <b-button pill variant="outline-success" class="btn-block" @click="showSignupModal" v-if="!isStrictMode">注册</b-button>
                </div>
              </div>
              <p class="m-2 text-secondary" v-if="isStrictMode">考试模式已开启，您需要输入考试码进入本系统</p>
              <p class="m-2 text-secondary" >忘记密码或者帐号已被注册？<b-link @click="showResetModal" class="text-decoration-none">点击重置</b-link></p>
              <b-form-checkbox id="checkbox-student" v-model="isStudent" name="i-am-student"
                               value="true" unchecked-value="false" class="text-muted">
                我是学生
              </b-form-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>

    <login-modal @next="handleNextEvent" ref="login-modal" :is-student="isStudent === 'true'" :is-strict="isStrictMode"></login-modal>
    <signup-modal @next="handleNextEvent" ref="signup-modal" :is-student="isStudent === 'true'" :is-strict="isStrictMode"></signup-modal>
    <reset-pwd-modal @next="handleNextEvent" ref="reset-pwd-modal" :is-student="isStudent === 'true'" :is-strict="isStrictMode"></reset-pwd-modal>
  </div>
</template>

<script>
const loginModal = () => import("@/components/login/login-modal")
const signupModal = () => import("@/components/login/signup-modal")
const resetPwdModal = () => import("@/components/login/reset-pwd-modal")

export default {
  name: 'login-page',
  components: {
    loginModal,
    signupModal,
    resetPwdModal
  },
  data: function () {
    return {
      isStudent: 'true',
      isStrictMode: false
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
    checkStrictMode: function () {
      this.$http.get(`${window.backendOrigin}/api/version/strict-mode`).then(res => {
        const strictModeBefore = this.$store.getters.isStrictMode
        const strictModeAfter = res.data.enable
        if (strictModeBefore !== strictModeAfter) {
          this.$store.commit('setVersion', {
            strictMode: strictModeAfter
          })
        }
        this.isStrictMode = strictModeAfter
      })
    },
    handleNextEvent: function () {
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("redirect")) {
        this.$router.replace({ path: `${searchParams.get("redirect")}` });
      } else this.$router.replace({ path: "/home" });
    }
  },
  computed: {
    clientUsingIP: function () {
      return window.location.href.indexOf('222.30.51.68:8080') > -1
    },
    hasRedirectPath: function () {
      let searchParams = new URLSearchParams(window.location.search);
      return searchParams.has("redirect")
    }
  },
  mounted() {
    this.checkStrictMode()
    console.log(`%c
      ___           ___           ___           ___           ___           ___
     /\\  \\         /|  |         /\\  \\         /\\  \\         /\\__\\         /\\  \\
     \\:\\  \\       |:|  |         \\:\\  \\       /::\\  \\       /:/  /        |::\\  \\
      \\:\\  \\      |:|  |          \\:\\  \\     /:/\\:\\  \\     /:/  /         |:|:\\  \\
  _____\\:\\  \\   __|:|  |      ___  \\:\\  \\   /:/ /::\\  \\   /:/  /  ___   __|:|\\:\\  \\
 /::::::::\\__\\ /\\ |:|__|____ /\\  \\  \\:\\__\\ /:/_/:/\\:\\__\\ /:/__/  /\\__\\ /::::|_\\:\\__\\
 \\:\\~~\\~~\\/__/ \\:\\/:::::/__/ \\:\\  \\ /:/  / \\:\\/:/  \\/__/ \\:\\  \\ /:/  / \\:\\~~\\  \\/__/
  \\:\\  \\        \\::/~~/~      \\:\\  /:/  /   \\::/__/       \\:\\  /:/  /   \\:\\  \\
   \\:\\  \\        \\:\\~~\\        \\:\\/:/  /     \\:\\  \\        \\:\\/:/  /     \\:\\  \\
    \\:\\__\\        \\:\\__\\        \\::/  /       \\:\\__\\        \\::/  /       \\:\\__\\
     \\/__/         \\/__/         \\/__/         \\/__/         \\/__/         \\/__/

     @NKUACM 2022
`, 'color: #6cf')
    console.log('%c Release 3.0.0. Sunrisefox & Saurus & 墨染 SaucerHi & 什锦 & Alexhaoge & ArcanusNEO & Listerily', 'color: #6cf')
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
</style>
