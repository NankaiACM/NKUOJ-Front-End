<template>
  <b-modal ref="modal" title="登录" centered @ok="loginSubmit" ok-title="登录" cancel-title="取消" auto-focus-button="ok">
    <div class="container">
      <div class="form-row align-items-center">
        <div class="container">
          <label>邮箱</label>
          <div class="input-group mb-2">
            <b-input type="text" class="form-control" id="loginUserNameInput" :placeholder="isStudent ? '学号' : '邮箱'" v-model="loginForm.email" @keydown.enter.native="loginSubmit"></b-input>
            <div class="input-group-prepend" v-if="isStudent">
              <div class="input-group-text">@mail.nankai.edu.cn</div>
            </div>
          </div>
        </div>
        <div class="container">
          <label>密码</label>
          <div class="input-group mb-2">
            <b-input type="password" id="loginPasswordInput" class="form-control" v-model="loginForm.passwordRaw" @keydown.enter.native="loginSubmit"></b-input>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import encryptMsg from "@/encrypt/encryptMsg";
import code2str from "@/util/http-code-to-str";

export default {
  name: "login-modal",
  data: function() {
    return {
      loginForm: {
        email: '',
        passwordRaw: ''
      },
      validateResults: ['', '邮箱不合法', '未填写邮箱', '密码不一致', '未填写密码', '未填写邮件验证码', '未填写昵称', '密码长度不足6位'],
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
  },
  props: {
    isStudent: Boolean
  },
  methods: {
    validateLoginForm: function () {
      if (this.loginForm.email === '') {
        return 2
      } else if (!this.emailRegex.test(this.loginForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''))) {
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
        username: this.loginForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''),
        password: encryptMsg(this.loginForm.passwordRaw)
      }
      this.$http.post(`${window.backendOrigin}/api/login`, postPackage).then(res => {
        if (res.data.ok) {
          console.log('Successfully logged in.')
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
    show: function () {
      this.$refs["modal"].show()
    }
  }
}
</script>

<style scoped>

</style>
