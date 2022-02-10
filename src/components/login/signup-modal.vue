<template>
  <b-modal ref="modal" title="填写注册信息" centered @ok="signupSubmit" ok-title="注册" cancel-title="取消">
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
</template>

<script>
import encryptMsg from "@/encrypt/encryptMsg";
import code2str from "@/code/code";

export default {
  name: "signup-modal",
  data: function () {
    return {
      signupForm: {
        username: '',
        nickname: '',
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
    show: function () {
      this.$refs["modal"].show()
    },
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

</style>
