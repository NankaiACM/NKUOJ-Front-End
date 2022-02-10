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

    <!-- Login Modal -->
    <b-modal ref="login-modal" title="登录" centered @ok="loginSubmit" ok-title="登录" cancel-title="取消">
      <div class="container">
        <div class="form-row align-items-center">
          <div class="container">
            <label for="loginUserNameInput">用户名</label>
            <div class="input-group mb-2">
              <input type="text" class="form-control" id="loginUserNameInput" placeholder="学号（邮箱）" v-model="loginForm.username">
              <div class="input-group-prepend">
                <div class="input-group-text">@mail.nankai.edu.cn</div>
              </div>
            </div>
          </div>
          <div class="container">
            <label for="loginPasswordInput">密码</label>
            <div class="input-group mb-2">
              <input type="password" id="loginPasswordInput" class="form-control" v-model="loginForm.passwordRaw">
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- Signup Modal -->
    <b-modal ref="signup-modal" title="填写注册信息" centered @ok="signupSubmit" ok-title="注册" cancel-title="取消">
      <div class="container">
        <div class="form-row align-items-center needs-validation">
        <div class="container">
          <label for="signupUserNameInput">用户名</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="signupUserNameInput" placeholder="学号（邮箱）" v-model="signupForm.username">
            <div class="input-group-prepend">
              <div class="input-group-text">@mail.nankai.edu.cn</div>
            </div>
          </div>
        </div>
        <div class="container">
          <label for="signupPasswordInput1">密码</label>
          <div class="input-group mb-2">
            <input type="password" id="signupPasswordInput1" class="form-control" v-model="signupForm.passwordRaw1">
          </div>
          <label for="signupPasswordInput2">重复密码</label>
          <div class="input-group mb-2">
            <input type="password" id="signupPasswordInput2" class="form-control" v-model="signupForm.passwordRaw2">
          </div>
        </div>
          <div class="container">
            <label for="signupNickNameInput">昵称</label>
            <div class="input-group mb-2">
              <input type="text" class="form-control" id="signupNickNameInput" placeholder="建议填写真实姓名" v-model="signupForm.nickname">
            </div>
          </div>
        <div class="container">
          <label for="signupEmailValidationCode">邮箱核验</label>
          <b-input-group class="mb-2">
            <input type="text" id="signupEmailValidationCode" class="form-control" placeholder="验证码" v-model="signupForm.emailCaptcha">
            <b-input-group-append>
              <b-button variant="outline-primary" v-if="emailCaptchaSendTimer<=0" v-on:click="sendEmailValidationCode(signupForm.username)">发送验证码</b-button>
              <b-button variant="outline-success" v-if="emailCaptchaSendTimer>0" v-on:click="gotoEmailBox">前往邮箱 {{ emailCaptchaSendTimer }}</b-button>
            </b-input-group-append>
          </b-input-group>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- Reset Password Modal -->
    <b-modal ref="reset-modal" title="重置密码" centered @ok="resetSubmit" ok-title="重置密码并登录" cancel-title="取消">
      <div class="container">
        <div class="form-row align-items-center needs-validation">
          <div class="container">
            <label for="resetUserNameInput">用户名</label>
            <div class="input-group mb-2">
              <input type="text" class="form-control" id="resetUserNameInput" placeholder="学号（邮箱）" v-model="resetForm.username">
              <div class="input-group-prepend">
                <div class="input-group-text">@mail.nankai.edu.cn</div>
              </div>
            </div>
          </div>
          <div class="container">
            <label for="resetPasswordInput1">新密码</label>
            <div class="input-group mb-2">
              <input type="password" id="resetPasswordInput1" class="form-control" v-model="resetForm.passwordRaw1">
            </div>
            <label for="resetPasswordInput2">重复新密码</label>
            <div class="input-group mb-2">
              <input type="password" id="resetPasswordInput2" class="form-control" v-model="resetForm.passwordRaw2">
            </div>
          </div>
          <div class="container">
            <label for="resetEmailValidationCode">邮箱核验</label>
            <b-input-group class="mb-2">
              <input type="text" id="resetEmailValidationCode" class="form-control" placeholder="验证码" v-model="resetForm.emailCaptcha">
              <b-input-group-append>
                <b-button variant="outline-primary" v-if="emailCaptchaSendTimer<=0" v-on:click="sendEmailValidationCode(resetForm.username)">发送验证码</b-button>
                <b-button variant="outline-success" v-if="emailCaptchaSendTimer>0" v-on:click="gotoEmailBox">前往邮箱 {{ emailCaptchaSendTimer }}</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import encryptMsg from '../encrypt/encryptMsg.js'
import code2str from '../code/code'

export default {
  name: 'login',
  data: function () {
    return {
      loginForm: {
        username: '',
        passwordRaw: ''
      },
      signupForm: {
        username: '',
        nickname: '',
        passwordRaw1: '',
        passwordRaw2: '',
        emailCaptcha: ''
      },
      resetForm: {
        username: '',
        passwordRaw1: '',
        passwordRaw2: '',
        emailCaptcha: ''
      },
      emailCaptchaSendTimer: 0,
      validateResults: ['', '用户名不合法', '未填写用户名', '密码不一致', '未填写密码', '未填写邮件验证码', '未填写昵称', '密码长度不足6位'],
      usernameRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))/
    }
  },
  methods: {
    showLoginModal: function () {
      this.$refs['login-modal'].show()
    },
    validateLoginForm: function () {
      if (this.loginForm.username === '') {
        return 2
      } else if (!this.usernameRegex.test(this.loginForm.username)) {
        return 1
      } else if (this.loginForm.nickname === '') {
        return 6
      } else if (this.loginForm.passwordRaw === '') {
        return 4
      } else if (this.loginForm.passwordRaw.length < 6) {
        return 7
      }
      return 0
    },
    loginSubmit: function (view) {
      const validateResult = this.validateLoginForm()
      if (validateResult !== 0) {
        this.$bvModal.msgBoxOk(this.validateResults[validateResult], {title: '提示', centered: true})
        view.preventDefault()
        return
      }
      const postPackage = {
        username: this.loginForm.username + '@mail.nankai.edu.cn',
        password: encryptMsg(this.loginForm.passwordRaw)
      }
      this.$http.post(`${window.backendOrigin}/api/login`, postPackage).then(res => {
        console.log('Successfully logged in.')
        console.log(res)
        if (res.data.ok) {
          this.$store.commit('setUserData', res.data.userData)
          this.$router.push('/home')
        } else {
          this.$store.commit('clearUserData')
          this.$bvModal.msgBoxOk(code2str(res.status), {title: '提示', centered: true})
        }
      }, e => {
        console.log(e)
        this.$store.commit('clearUserData')
        this.$bvModal.msgBoxOk(code2str(e.status), {title: '提示', centered: true})
      })
    },
    showResetModal: function () {
      this.$refs['reset-modal'].show()
    },
    validateResetForm: function () {
      if (this.resetForm.username === '') {
        return 2
      } else if (!this.usernameRegex.test(this.resetForm.username)) {
        return 1
      } else if (this.resetForm.passwordRaw1 === '' || this.resetForm.passwordRaw2 === '') {
        return 4
      } else if (this.resetForm.passwordRaw1 !== this.resetForm.passwordRaw2) {
        return 3
      } else if (this.resetForm.passwordRaw1.length < 6) {
        return 7
      } else if (this.resetForm.emailCaptcha === '') {
        return 5
      }
      return 0
    },
    resetSubmit: function (view) {
      const validateResult = this.validateResetForm()
      if (validateResult !== 0) {
        this.$bvModal.msgBoxOk(this.validateResults[validateResult], {title: '提示', centered: true})
        view.preventDefault()
        return
      }
      const postPackage = {
        username: this.resetForm.username + '@mail.nankai.edu.cn',
        password: encryptMsg(this.resetForm.passwordRaw1),
        emailCaptcha: this.resetForm.emailCaptcha
      }
      this.$http.post(`${window.backendOrigin}/api/reset/password`, postPackage).then(res => {
        if (res.data.ok) {
          this.$store.commit('setUserData', res.data.userData)
          this.$router.push('/home')
        } else {
          this.$store.commit('clearUserData')
          this.$bvModal.msgBoxOk(code2str(res.status), {title: '提示', centered: true})
        }
      }, e => {
        console.log(e)
        this.$store.commit('clearUserData')
        this.$bvModal.msgBoxOk(code2str(e.status), {title: '提示', centered: true})
      })
    },
    showSignupModal: function () {
      this.$refs['signup-modal'].show()
    },
    validateSignupForm: function () {
      if (this.signupForm.username === '') {
        return 2
      } else if (!this.usernameRegex.test(this.signupForm.username)) {
        return 1
      } else if (this.signupForm.nickname === '') {
        return 6
      } else if (this.signupForm.passwordRaw1 === '' || this.signupForm.passwordRaw2 === '') {
        return 4
      } else if (this.signupForm.passwordRaw1 !== this.signupForm.passwordRaw2) {
        return 3
      } else if (this.signupForm.passwordRaw1.length < 6) {
        return 7
      } else if (this.signupForm.emailCaptcha === '') {
        return 5
      }
      return 0
    },
    signupSubmit: function (view) {
      const validateResult = this.validateSignupForm()
      if (validateResult !== 0) {
        this.$bvModal.msgBoxOk(this.validateResults[validateResult], {title: '提示', centered: true})
        view.preventDefault()
        return
      }
      const postPackage = {
        username: this.signupForm.username + '@mail.nankai.edu.cn',
        nickname: this.signupForm.nickname,
        password: encryptMsg(this.signupForm.passwordRaw1),
        emailCaptcha: this.signupForm.emailCaptcha
      }
      this.$http.post(`${window.backendOrigin}/api/signup`, postPackage).then(res => {
        if (res.data.ok) {
          this.$store.commit('setUserData', res.data.userData)
          this.$router.push('/home')
        } else {
          this.$store.commit('clearUserData')
          this.$bvModal.msgBoxOk(code2str(res.status), {title: '提示', centered: true})
        }
      }, e => {
        console.log(e)
        this.$store.commit('clearUserData')
        this.$bvModal.msgBoxOk(code2str(e.status), {title: '提示', centered: true})
      })
    },
    sendEmailValidationCode: function (username) {
      if (username === '') {
        this.$bvModal.msgBoxOk(this.validateResults[2], {title: '提示', centered: true})
        return
      } else if (!this.usernameRegex.test(username)) {
        this.$bvModal.msgBoxOk(this.validateResults[1], {title: '提示', centered: true})
        return
      }
      const postPackage = {
        email: username + '@mail.nankai.edu.cn'
      }
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/email-captcha`, postPackage).then(_ => {
        this.emailCaptchaSendTimer = 60
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {title: '邮件验证码发送失败', centered: true})
      })
    },
    gotoEmailBox: function () {
      window.open('https://mail.nankai.edu.cn/', '_blank')
    }
  },
  watch: {
    emailCaptchaSendTimer: {
      handler (value) {
        if (value > 0) {
          setTimeout(() => {
            this.emailCaptchaSendTimer--
          }, 1000)
        }
      },
      immediate: true
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
