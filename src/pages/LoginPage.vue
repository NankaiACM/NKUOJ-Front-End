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
          <span class="btn btn-success disabled card-accepted"> (≧∀≦)ゞAccepted! </span>
        </div>
        <div class="part-right">
          <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="page-slogan">
          <h5 class="m-2 text-purple">南开大学计算机课程</h5>
          <h1 class="m-2 text-purple">在线评测平台</h1>
          <div class="d-flex align-items-baseline mt-5">
            <button class="btn btn-outline-purple ms-2" @click="this.showStudentLoginModal()">
              <IconLightBulb/>
              进入平台
            </button>
            <h6><a class="text-decoration-none text-purple ms-3" @click="this.showGuestLoginModal()" href="#"> 我是访客 &gt;</a></h6>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center justify-content-center d-md-none d-block h-100 w-100 position-absolute">
        <img src="../assets/nkuoj-slogan.svg" alt="slogan" class="page-slogan">
        <h5 class="m-2 text-purple">南开大学计算机课程</h5>
        <h1 class="m-2 text-purple">在线评测平台</h1>
        <div class="d-flex align-items-baseline mt-5">
          <button class="btn btn-outline-purple ms-2" @click="this.showStudentLoginModal()">
            <IconLightBulb/>
            进入平台
          </button>
          <h6><a class="text-decoration-none text-purple ms-3" @click="this.showGuestLoginModal()" href="#"> 我是访客 &gt;</a></h6>
        </div>
      </div>
    </div>
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
              <li><a class="text-decoration-none text-light" @click="this.showStudentSignupModal()" href="#">学生注册</a> | <a class="text-decoration-none text-light" @click="this.showGuestSignupModal()" href="#">访客注册</a></li>
              <li><a class="text-decoration-none text-light" @click="this.showStudentLoginModal()" href="#">学生登录</a> | <a class="text-decoration-none text-light" @click="this.showGuestLoginModal()" href="#">访客登录</a></li>
              <li><a class="text-decoration-none text-light" @click="this.showStudentResetModal()" href="#">学生改密</a> | <a class="text-decoration-none text-light" @click="this.showGuestResetModal()" href="#">访客改密</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5>开发和管理</h5>
            <ul>
              <li><a class="text-decoration-none text-light" href="https://github.com/NankaiACM/NKUOJ-Front-End">前端仓库</a></li>
              <li><a class="text-decoration-none text-light" href="https://github.com/ArcanusNEO/ArcOJ-BackEnd">后端仓库</a></li>
              <li><a class="text-decoration-none text-light" href="https://google.com">平台管理</a></li>
            </ul>
          </div>
        </div>
        <p class="h6 mt-4 mb-3">南开大学ACM算法协会 © 2022–2023</p>
      </div>
    </div>
  </div>
  <ModalLogin ref="modal-student-login" :is-student="true" :is-strict="false" @success="handleSuccessEvent"></ModalLogin>
  <ModalLogin ref="modal-guest-login" :is-student="false" :is-strict="false" @success="handleSuccessEvent"></ModalLogin>
  <ModalSignup ref="modal-signup-student-in-page" @success="handleSuccessEvent" :is-student="true"></ModalSignup>
  <ModalSignup ref="modal-signup-guest-in-page" @success="handleSuccessEvent" :is-student="false"></ModalSignup>
  <ModalResetPwd ref="modal-reset-pwd-student-in-page" @success="handleSuccessEvent" :is-student="true"></ModalResetPwd>
  <ModalResetPwd ref="modal-reset-pwd-guest-in-page" @success="handleSuccessEvent" :is-student="false"></ModalResetPwd>
</template>

<script>
import { useUserDataStore } from '@/stores/user-data'
import IconLightBulb from "@/components/icons/IconLightBulbSmall.vue";
import ModalLogin from "@/components/modal/ModalLogin.vue";
import axios from "axios";
import ModalSignup from "@/components/modal/ModalSignup.vue";
import ModalResetPwd from "@/components/modal/ModalResetPwd.vue";
export default {
  name: 'login-page',
  components: {
    ModalResetPwd,
    ModalSignup,
    ModalLogin,
    IconLightBulb
  },
  setup() {
    const store = useUserDataStore()
    return {
      store
    }
  },
  data: function () {
    return {
      show: true,
      isStudent: 'true',
      isStrictMode: false
    }
  },
  methods: {
    showStudentLoginModal: function () {
      this.$refs['modal-student-login'].show()
    },
    showGuestLoginModal: function () {
      this.$refs['modal-guest-login'].show()
    },
    showStudentResetModal: function () {
      this.$refs['modal-reset-pwd-student-in-page'].show()
    },
    showGuestResetModal: function () {
      this.$refs['modal-reset-pwd-guest-in-page'].show()
    },
    showStudentSignupModal: function () {
      this.$refs['modal-signup-student-in-page'].show()
    },
    showGuestSignupModal: function () {
      this.$refs['modal-signup-guest-in-page'].show()
    },
    checkStrictMode: function () {
      axios.get(`/api/version/strict-mode`).then(res => {
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
    handleSuccessEvent: function () {
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("redirect")) {
        window.location.replace(`${searchParams.get("redirect")}`);
      } else window.location.replace("/home" );
    }
  },
  computed: {
    hasRedirectPath: function () {
      let searchParams = new URLSearchParams(window.location.search);
      return searchParams.has("redirect")
    }
  },
  mounted() {
    // this.checkStrictMode()
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
  background: url("/pattern.svg");
}
.slogan-footer {
  height: 60px;
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
</style>
