<template>
  <b-modal ref="modal" title="重置密码" centered @ok="resetSubmit" ok-title="重置密码并登录" cancel-title="取消" auto-focus-button="ok">
    <div class="container">
      <div class="form-row align-items-center needs-validation">
        <div class="container">
          <label for="resetUserNameInput">邮箱</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="resetUserNameInput" :placeholder="isStudent ? '学号' : '邮箱'" v-model="resetForm.email">
            <div class="input-group-prepend" v-if="isStudent">
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
              <b-button variant="outline-primary" v-if="emailCaptchaSendTimer<=0" v-on:click="sendEmailValidationCode()">发送验证码</b-button>
              <b-button variant="outline-success" v-if="emailCaptchaSendTimer>0" v-on:click="gotoEmailBox">前往邮箱 {{ emailCaptchaSendTimer }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import code2str from "@/util/code";
import encryptMsg from "@/encrypt/encryptMsg";

export default {
  name: "reset-pwd-modal",
  data: function () {
    return {
      resetForm: {
        email: '',
        passwordRaw1: '',
        passwordRaw2: '',
        emailCaptcha: ''
      },
      emailCaptchaSendTimer: 0,
      validateResults: ['', '邮箱不合法', '未填写邮箱', '密码不一致', '未填写密码', '未填写邮件验证码', '未填写昵称', '密码长度不足6位'],
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
  },
  props: {
    isStudent: Boolean
  },
  methods: {
    show: function () {
      this.$refs["modal"].show()
    },
    sendEmailValidationCode: function () {
      if (this.resetForm.email === '') {
        this.$bvModal.msgBoxOk(this.validateResults[2], {title: '提示', centered: true})
        return
      } else if (!this.emailRegex.test(this.resetForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''))) {
        this.$bvModal.msgBoxOk(this.validateResults[1], {title: '提示', centered: true})
        return
      }
      const postPackage = {
        email: this.resetForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : '')
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
    resetSubmit: function (view) {
      const validateResult = this.validateResetForm()
      if (validateResult !== 0) {
        this.$bvModal.msgBoxOk(this.validateResults[validateResult], {title: '提示', centered: true})
        view.preventDefault()
        return
      }
      const postPackage = {
        username: this.resetForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''),
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
    validateResetForm: function () {
      if (this.resetForm.email === '') {
        return 2
      } else if (!this.emailRegex.test(this.resetForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''))) {
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
