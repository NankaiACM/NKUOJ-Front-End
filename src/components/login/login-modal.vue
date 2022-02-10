<template>
  <b-modal ref="modal" title="登录" centered @ok="loginSubmit" ok-title="登录" cancel-title="取消">
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
</template>

<script>
import encryptMsg from "@/encrypt/encryptMsg";
import code2str from "@/code/code";

export default {
  name: "login-modal",
  data: function() {
    return {
      loginForm: {
        username: '',
        passwordRaw: ''
      },
      validateResults: ['', '用户名不合法', '未填写用户名', '密码不一致', '未填写密码', '未填写邮件验证码', '未填写昵称', '密码长度不足6位'],
      usernameRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))/
    }
  },
  methods: {
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
    show: function () {
      this.$refs["modal"].show()
    }
  }
}
</script>

<style scoped>

</style>
