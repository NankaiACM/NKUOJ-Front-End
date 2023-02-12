<template>
  <div>
    <div class="pattern-background">
      <div class="position-absolute w-100 h-100 d-md-block d-none">
        <div class="card border-0 bg-dark shadow-lg code-card p-3">
          <p class="mb-0">
            <span class="placeholder bg-success col-4"></span>
          </p>
          <p class="mb-0">
            <span class="placeholder bg-success col-3"></span>
          </p>
          <p class="mb-0">
            <span class="placeholder bg-light col-2 me-1"></span>
            <span class="placeholder bg-secondary col-3 me-1"></span>
            <span class="placeholder bg-danger col-1 me-1"></span>
          </p>
          <p class="mb-0">
            <span class="placeholder bg-info col-2 me-1"></span>
            <span class="placeholder bg-light col-2 me-1"></span>
            <span class="placeholder bg-warning col-1 me-1"></span>
          </p>
          <p class="mb-0 ms-4">
            <span class="placeholder bg-info col-1 me-1"></span>
            <span class="placeholder bg-light col-2 me-1"></span>
            <span class="placeholder bg-warning col-1 me-1"></span>
          </p>
          <p class="mb-0 ms-4">
            <span class="placeholder bg-primary col-2 me-1"></span>
            <span class="placeholder bg-warning col-1 me-1"></span>
            <span class="placeholder bg-light col-2 me-1"></span>
          </p>
          <p class="mb-0 ms-4">
            <span class="placeholder bg-danger col-1 me-1"></span>
            <span class="placeholder bg-warning col-1 me-1"></span>
            <span class="placeholder bg-secondary col-2 me-1"></span>
            <span class="placeholder bg-light col-1 me-1"></span>
            <span class="placeholder bg-warning col-1 me-1"></span>
          </p>
          <p class="mb-0 ms-5">
            <span class="placeholder bg-danger col-3 me-1"></span>
            <span class="placeholder bg-warning col-1 me-1"></span>
            <span class="placeholder bg-secondary col-1 me-1"></span>
            <span class="placeholder bg-success col-1 me-1"></span>
            <span class="placeholder bg-warning col-2 me-1"></span>
          </p>
          <p class="mb-0 ms-5">
            <span class="placeholder bg-success col-2 me-1"></span>
            <span class="placeholder bg-primary col-1 me-1"></span>
            <span class="placeholder bg-light col-1 me-1"></span>
            <span class="placeholder bg-info col-2 me-1"></span>
            <span class="placeholder bg-warning col-1 me-1"></span>
          </p>
          <p class="mb-0 ms-4">
            <span class="placeholder bg-primary col-2 me-1"></span>
            <span class="placeholder bg-light col-1 me-1"></span>
            <span class="placeholder bg-warning col-3 me-1"></span>
          </p>
          <p class="mb-0 ms-4">
            <span class="placeholder bg-success col-2 me-1"></span>
            <span class="placeholder bg-light col-3 me-1"></span>
          </p>
          <p class="mb-0 ms-4">
            <span class="placeholder bg-primary col-2 me-1"></span>
            <span class="placeholder bg-secondary col-1 me-1"></span>
          </p>
          <p class="mb-0">
            <span class="placeholder bg-warning col-1 me-1"></span>
          </p>
          <span class="btn btn-success disabled card-accepted"> Accepted! </span>
        </div>
        <div class="part-right">
          <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="page-slogan">
          <h5 class="m-2 text-purple">南开大学计算机课程</h5>
          <h1 class="m-2 text-purple">在线评测平台</h1>
          <div class="d-flex align-items-baseline mt-5">
            <button class="btn btn-outline-purple ms-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
              </svg>
              进入平台
            </button>
            <h6><a class="text-decoration-none text-purple ms-3" href="http://github.com"> 我是教师 &gt;</a></h6>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center justify-content-center d-md-none d-block h-100 w-100 position-absolute">
        <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="page-slogan">
        <h5 class="m-2 text-purple">南开大学计算机课程</h5>
        <h1 class="m-2 text-purple">在线评测平台</h1>
        <div class="d-flex align-items-baseline mt-5">
          <button class="btn btn-outline-purple ms-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
              <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
            </svg>
            进入平台
          </button>
          <h6><a class="text-decoration-none text-purple ms-3" href="http://github.com"> 我是教师 &gt;</a></h6>
        </div>
      </div>
    </div>
<!--    <div class="container d-flex justify-content-center">-->
<!--      <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="page-slogan m-5">-->
<!--    </div>-->

<!--    <div class="container">-->
<!--      <div class="row d-flex justify-content-center">-->
<!--        <div class="col-md-6">-->
<!--          <b-alert variant="info" show class="text-center mt-5 md-5 p-5" v-if="clientUsingIP">-->
<!--            <h4>网站域名已经可用！</h4>-->
<!--            <hr>-->
<!--            <p class="mt-5 md-5">请使用<b-link href="https://acm.nankai.edu.cn/">acm.nankai.edu.cn</b-link>访问我们的网页～</p>-->
<!--          </b-alert>-->

<!--          <div class="card text-center m-3 shadow-sm" v-else>-->
<!--            <img src="../assets/login-img/reading-rust-cookbook.png" class="card-img-top" alt="...">-->
<!--            <div class="card-body">-->
<!--              <h5 class="card-title">南开大学计算机课程辅助评测系统</h5>-->
<!--              <p>本站由 ACM 算法协会开发、维护，旨在为南开的计算机程序设计类课程提供评判系统。</p>-->
<!--            </div>-->
<!--            <div class="card-body">-->
<!--              <h5 class="card-title" v-if="hasRedirectPath">登录以继续访问</h5>-->
<!--              <h5 class="card-title" v-else>进入本系统</h5>-->
<!--              <div class="container d-flex justify-content-center">-->
<!--                <div class="buttons-wrapper">-->
<!--                  <b-button pill variant="outline-info" class="btn-block" @click="showLoginModal">登录</b-button>-->
<!--                  <b-button pill variant="outline-success" class="btn-block" @click="showSignupModal" v-if="!isStrictMode">注册</b-button>-->
<!--                </div>-->
<!--              </div>-->
<!--              <p class="m-2 text-secondary" v-if="isStrictMode">考试模式已开启，您需要输入考试码进入本系统</p>-->
<!--              <p class="m-2 text-secondary" >忘记密码或者帐号已被注册？<b-link @click="showResetModal" class="text-decoration-none">点击重置</b-link></p>-->
<!--              <b-form-checkbox id="checkbox-student" v-model="isStudent" name="i-am-student"-->
<!--                               value="true" unchecked-value="false" class="text-muted">-->
<!--                我是学生-->
<!--              </b-form-checkbox>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="bg-dark site-footer text-light">
      <div class="container">
        <div class="d-flex align-items-center mt-5 mb-5">
          <img src="../assets/nkuoj-slogan-light.svg" alt="light slogan" class="slogan-footer">
          <strong class="ms-5" style="font-size: 1.4rem">南开大学计算机课程在线评测平台</strong>
        </div>
        <div class="row justify-content-between">
          <div class="col-md-3">
            <h5>外部链接</h5>
            <ul>
              <li><a class="text-decoration-none text-light" href="https://www.nankai.edu.cn/">南开大学</a></li>
              <li><a class="text-decoration-none text-light" href="https://cc.nankai.edu.cn/">计算机学院</a></li>
              <li><a>算法协会</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5>账户</h5>
            <ul>
              <li><a>学生注册</a> | <a>教师注册</a></li>
              <li><a>学生登录</a> | <a>教师登录</a></li>
              <li><a>修改密码</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5>参与开发</h5>
            <ul>
              <li><a class="text-decoration-none text-light" href="https://github.com/NankaiACM/NKUOJ-Front-End">前端</a></li>
              <li><a class="text-decoration-none text-light" href="https://github.com/ArcanusNEO/ArcOJ-BackEnd">后端</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-4 mb-3 d-flex justify-content-between">
          <span class="h6">南开大学ACM算法协会 © 2022–2023</span>
          <span class="h6">(≧∀≦)ゞ Accepted</span>
        </div>
      </div>
    </div>
    <login-modal @next="handleNextEvent" ref="login-modal" :is-student="isStudent === 'true'" :is-strict="isStrictMode"></login-modal>
    <signup-modal @next="handleNextEvent" ref="signup-modal" :is-student="isStudent === 'true'" :is-strict="isStrictMode"></signup-modal>
    <reset-pwd-modal @next="handleNextEvent" ref="reset-pwd-modal" :is-student="isStudent === 'true'" :is-strict="isStrictMode"></reset-pwd-modal>
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
.part-right {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(10%, -20%);
}
.site-footer {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
}
.pattern-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background: url("../assets/pattern.svg");
}
.slogan-footer {
  height: 60px;
}
.text-purple {
  color: #923262 !important;
}
.code-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-105%, -50%);
  width: 350px;
  max-width: 50%;
  max-height: 80%;
  height: 500px;
  border-radius: 15px;
}
.placeholder {
  cursor: default;
}
.card-accepted {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.btn-outline-purple {
  --bs-btn-color: #923262;
  --bs-btn-border-color: #923262;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #923262;
  --bs-btn-hover-border-color: #923262;
  --bs-btn-focus-shadow-rgb: 25,135,84;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #923262;
  --bs-btn-active-border-color: #923262;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #923262;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #923262;
  --bs-gradient: none;
}
</style>
