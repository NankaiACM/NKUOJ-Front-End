<template>
  <ModalBase v-model="internalShow" :title="isStudent ? '学生注册' : '访客注册'"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="注册并登录"
             :cancel-button="true" cancel-class="btn-outline-danger" cancel-text="取消"
             @ok="signupSubmit()" @close="dismiss()" @cancel="dismiss()">
    <div class="container">
      <div class="form-row align-items-center needs-validation">
        <div class="container">
          <label>邮箱</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="signupUserNameInput" :placeholder="isStudent ? '学号' : '邮箱'" v-model="signupForm.email">
            <div class="input-group-prepend" v-if="isStudent">
              <div class="input-group-text">@mail.nankai.edu.cn</div>
            </div>
          </div>
        </div>
        <div class="container">
          <label>密码</label>
          <div class="input-group mb-2">
            <input type="password" id="signupPasswordInput1" class="form-control" v-model="signupForm.passwordRaw1">
          </div>
          <label>重复密码</label>
          <div class="input-group mb-2">
            <input type="password" id="signupPasswordInput2" class="form-control" v-model="signupForm.passwordRaw2">
          </div>
        </div>
        <div class="container">
          <label>昵称</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="signupNickNameInput" placeholder="建议填写真实姓名" v-model="signupForm.nickname">
          </div>
        </div>
        <div class="container">
          <label>邮箱核验</label>
          <div class="mb-2 input-group">
            <input type="text" id="signupEmailValidationCode" class="form-control" placeholder="验证码" v-model="signupForm.emailCaptcha">
            <button class="btn btn-outline-primary" v-if="emailCaptchaSendTimer<=0" v-on:click="sendEmailValidationCode()">发送验证码</button>
            <button class="btn btn-outline-success" v-if="emailCaptchaSendTimer>0" v-on:click="gotoEmailBox">前往邮箱 {{ emailCaptchaSendTimer }}</button>
          </div>
        </div>
      </div>
    </div>
  </ModalBase>
  <ModalMsgBox ref="modal-msg-signup"></ModalMsgBox>
</template>

<script>
import encryptor from "@/util/encrypt";
import httpCodeToStr from "@/util/http-code-to-str";
import axios from "axios";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import ModalBase from "@/components/modal/ModalBase.vue";
import {useUserDataStore} from "@/stores/user-data";

export default {
  name: "ModalSignup",
  components: {ModalBase, ModalMsgBox},
  data: function () {
    return {
      signupForm: {
        email: '',
        nickname: '',
        passwordRaw1: '',
        passwordRaw2: '',
        emailCaptcha: ''
      },
      internalShow: false,
      emailCaptchaSendTimer: 0,
      validateResults: ['', '邮箱不合法', '未填写邮箱', '密码不一致', '未填写密码', '未填写邮件验证码', '未填写昵称', '密码长度不足6位'],
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
  },
  props: {
    isStudent: Boolean
  },
  setup() {
    const store = useUserDataStore()
    return {
      store
    }
  },
  methods: {
    signupSubmit: function () {
      const validateResult = this.validateSignupForm()
      if (validateResult !== 0) {
        this.$refs["modal-msg-signup"].show('提示', this.validateResults[validateResult])
        return
      }
      const postPackage = {
        username: this.signupForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''),
        nickname: this.signupForm.nickname,
        password: encryptor.encrypt(this.signupForm.passwordRaw1),
        emailCaptcha: this.signupForm.emailCaptcha
      }
      axios.post(`/api/signup`, postPackage).then(res => {
        if (res.data.ok) {
          this.store.setUID(res.data.userData.uid)
          this.store.setUsername(res.data.userData.username)
          this.store.setNickname(res.data.userData.nickname)
          this.store.setPermission(res.data.userData.permission)
          this.store.setValid()
          this.$emit('success')
        } else {
          this.store.clear()
          this.$refs["modal-msg-signup"].show('提示', httpCodeToStr(res.status))
        }
      }, e => {
        this.store.clear()
        this.$refs["modal-msg-signup"].show('提示', httpCodeToStr(e.status))
      })
    },
    sendEmailValidationCode: function () {
      if (this.signupForm.email === '') {
        this.$refs["modal-msg-signup"].show('提示', this.validateResults[2])
        return
      } else if (!this.emailRegex.test(this.signupForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''))) {
        this.$refs["modal-msg-signup"].show('提示', this.validateResults[1])
        return
      }
      const postPackage = {
        email: this.signupForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : '')
      }
      axios.post(`/api/email-captcha`, postPackage).then(() => {
        this.emailCaptchaSendTimer = 60
      }, e => {
        this.$refs["modal-msg-signup"].show('邮件验证码发送失败', httpCodeToStr(e.status))
      })
    },
    gotoEmailBox: function () {
      window.open('https://mail.nankai.edu.cn/', '_blank')
    },
    validateSignupForm: function () {
      if (this.signupForm.email === '') {
        return 2
      } else if (!this.emailRegex.test(this.signupForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''))) {
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
      this.internalShow = true;
    },
    dismiss: function () {
      this.internalShow = false;
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

</style>
