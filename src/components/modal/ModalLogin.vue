<template>
  <ModalBase v-model="internalShow" :title="isStudent ? '学生登录' : '访客登录'"
             ok-button ok-class="btn-outline-purple" ok-text="登录" @ok="loginSubmit()"
             cancel-button cancel-class="btn-outline-primary" cancel-text="注册" @cancel="showRegisterModal()"
             @close="internalShow = false">
    <div class="container">
      <div class="form-row align-items-center">
        <div class="container">
          <label>邮箱</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="loginUserNameInput" :placeholder="isStudent ? '学号' : '邮箱'"
                   v-model="loginForm.email">
            <div class="input-group-prepend" v-if="isStudent">
              <div class="input-group-text">@mail.nankai.edu.cn</div>
            </div>
          </div>
        </div>
        <div class="container">
          <label>密码</label>
          <div class="input-group mb-2">
            <input type="password" id="loginPasswordInput" class="form-control" v-model="loginForm.passwordRaw">
          </div>
        </div>
        <div class="container" v-if="isStrict">
          <label>考试码</label>
          <div class="input-group mb-2">
            <input type="text" id="loginPasscodeInput" class="form-control" v-model="loginForm.examKeyRaw">
          </div>
        </div>
        <div class="container">
          <label class="text-muted">忘记密码？<a class="text-decoration-none text-muted" href="#" @click="showResetModal()">点击重置</a></label>
        </div>
      </div>
    </div>
  </ModalBase>
  <ModalMsgBox ref="modal-msg-login"></ModalMsgBox>
  <ModalSignup ref="modal-signup-student" @success="this.$emit('success')" :is-student="true"></ModalSignup>
  <ModalSignup ref="modal-signup-guest" @success="this.$emit('success')" :is-student="false"></ModalSignup>
  <ModalResetPwd ref="modal-reset-pwd-student" @success="this.$emit('success')" :is-student="true"></ModalResetPwd>
  <ModalResetPwd ref="modal-reset-pwd-guest" @success="this.$emit('success')" :is-student="false"></ModalResetPwd>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import axios from "axios";
import httpCodeToStr from "@/util/http-code-to-str";
import {useUserDataStore} from "@/stores/user-data";
import encryptor from "@/util/encrypt";
import ModalSignup from "@/components/modal/ModalSignup.vue";
import ModalResetPwd from "@/components/modal/ModalResetPwd.vue";

export default {
  name: "ModalLogin",
  components: {ModalResetPwd, ModalSignup, ModalMsgBox, ModalBase},
  props: {
    isStudent: Boolean,
    isStrict: Boolean
  },
  data: function () {
    return {
      internalShow: false,
      loginForm: {
        email: '',
        passwordRaw: '',
        examKeyRaw: ''
      },
      validateResults: ['', '邮箱不合法', '未填写邮箱', '密码不一致', '未填写密码', '未填写邮件验证码', '未填写昵称', '密码长度不足6位', '未填写考试码'],
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
  },
  setup() {
    const store = useUserDataStore()
    return {
      store
    }
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
      } else if (this.loginForm.examKeyRaw === '' && this.isStrict) {
        return 8
      }
      return 0
    },
    loginSubmit: async function () {
      const validateResult = this.validateLoginForm()
      if (validateResult !== 0) {
        this.$refs["modal-msg-login"].show('提示', this.validateResults[validateResult])
        return
      }
      const encryptedPassword = encryptor.encrypt(this.loginForm.passwordRaw)
      const encryptedPasscode = encryptor.encrypt(this.loginForm.examKeyRaw)

      console.log(encryptedPassword)
      const postPackage = {
        username: this.loginForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''),
        password: encryptedPassword,
        passcode: encryptedPasscode,
      }
      axios.post(`/api/login`, postPackage).then(res => {
        if (res.data.ok) {
          console.log('Successfully logged in.')
          this.store.setUID(res.data.userData.uid)
          this.store.setUsername(res.data.userData.username)
          this.store.setNickname(res.data.userData.nickname)
          this.store.setPermission(res.data.userData.permission)
          this.store.setValid()
          this.$emit('success')
        } else {
          this.store.clear()
          this.$refs["modal-msg-login"].show('提示', httpCodeToStr(res.status))
        }
      }, e => {
        this.store.clear()
        this.$refs["modal-msg-login"].show('提示', httpCodeToStr(e.status))
      })
    },
    show: function () {
      this.internalShow = true;
    },
    showRegisterModal: function () {
      if (this.isStudent) {
        this.$refs["modal-signup-student"].show()
      } else {
        this.$refs["modal-signup-guest"].show()
      }
    },
    showResetModal: function () {
      if (this.isStudent) {
        this.$refs["modal-reset-pwd-student"].show()
      } else {
        this.$refs["modal-reset-pwd-guest"].show()
      }
    }
  }
}
</script>

<style scoped>

</style>