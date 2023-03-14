<template>
  <ModalBase v-model="internalShow" title="重置密码" @ok="resetSubmit" ok-class="btn-outline-purple" cancel-class="btn-outline-danger" ok-text="重置并登录" cancel-text="取消" ok-button cancel-button @close="internalShow = false" @cancel="internalShow = false">
    <div class="container">
      <div class="form-row align-items-center needs-validation">
        <div class="container">
          <label>邮箱</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="resetUserNameInput" :placeholder="isStudent ? '学号' : '邮箱'" v-model="resetForm.email">
            <span class="input-group-text" v-if="isStudent">@mail.nankai.edu.cn</span>
          </div>
        </div>
        <div class="container">
          <label>新密码</label>
          <div class="input-group mb-2">
            <input type="password" id="resetPasswordInput1" class="form-control" v-model="resetForm.passwordRaw1">
          </div>
          <label>重复新密码</label>
          <div class="input-group mb-2">
            <input type="password" id="resetPasswordInput2" class="form-control" v-model="resetForm.passwordRaw2">
          </div>
        </div>
        <div class="container">
          <label>邮箱核验</label>
          <div class="input-group">
            <input type="text" id="resetEmailValidationCode" class="form-control" placeholder="验证码" v-model="resetForm.emailCaptcha">
            <button class="btn btn-outline-primary" v-if="emailCaptchaSendTimer<=0" v-on:click="sendEmailValidationCode()" :disabled="emailCaptchaRequesting">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="emailCaptchaRequesting"></span>
              发送验证码
            </button>
            <button class="btn btn-outline-success" v-if="emailCaptchaSendTimer>0" v-on:click="gotoEmailBox">前往邮箱 {{ emailCaptchaSendTimer }}</button>
          </div>
        </div>
        <div class="container" v-if="isStrict">
          <label>考试码</label>
          <div class="input-group mb-2">
            <input type="text" id="loginPasscodeInput" class="form-control" v-model="resetForm.examKeyRaw">
          </div>
        </div>
      </div>
    </div>
    <ModalMsgBox ref="modal-msg-reset"></ModalMsgBox>
  </ModalBase>
</template>

<script>
import encryptor from "@/util/encrypt";
import httpCodeToStr from "@/util/http-code-to-str";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import ModalBase from "@/components/modal/ModalBase.vue";
import {useUserDataStore} from "@/stores/user-data";
import axios from "axios";

export default {
  name: "ModalResetPwd",
  components: {ModalBase, ModalMsgBox},
  data: function () {
    return {
      resetForm: {
        email: '',
        passwordRaw1: '',
        passwordRaw2: '',
        emailCaptcha: '',
        examKeyRaw: ''
      },
      internalShow: false,
      emailCaptchaSendTimer: 0,
      emailCaptchaRequesting: false,
      validateResults: ['', '邮箱不合法', '未填写邮箱', '密码不一致', '未填写密码', '未填写邮件验证码', '未填写昵称', '密码长度不足6位', '未填写考试码', '学号不正确，请填写数字学号'],
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
  },
  props: {
    isStudent: Boolean,
    isStrict: Boolean
  },
  setup() {
    const store = useUserDataStore();
    return {
      store
    }
  },
  methods: {
    sendEmailValidationCode: function () {
      if (this.resetForm.email === '') {
        this.$refs["modal-msg-reset"].show('提示', this.validateResults[2]);
        return;
      } else if (!this.emailRegex.test(this.resetForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''))) {
        this.$refs["modal-msg-reset"].show('提示', this.validateResults[1]);
        return;
      } else if (this.isStrict && this.resetForm.examKeyRaw === '') {
        this.$refs["modal-msg-reset"].show('提示', this.validateResults[8]);
        return;
      }
      const postPackage = {
        email: this.resetForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''),
        passcode: encryptor.encrypt(this.resetForm.examKeyRaw),
      };
      this.emailCaptchaRequesting = true;
      axios.post(`/api/email-captcha`, postPackage).then(() => {
        this.emailCaptchaRequesting = false;
        this.emailCaptchaSendTimer = 60;
      }, e => {
        this.$refs["modal-msg-reset"].show('邮件验证码发送失败', httpCodeToStr(e.response.status));
        this.emailCaptchaRequesting = false;
      });
    },
    gotoEmailBox: function () {
      window.open('https://mail.nankai.edu.cn/', '_blank');
    },
    resetSubmit: function () {
      const validateResult = this.validateResetForm();
      if (validateResult !== 0) {
        this.$refs["modal-msg-reset"].show('提示', this.validateResults[validateResult]);
        return
      }
      const postPackage = {
        username: this.resetForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''),
        password: encryptor.encrypt(this.resetForm.passwordRaw1),
        emailCaptcha: this.resetForm.emailCaptcha,
        passcode: encryptor.encrypt(this.resetForm.examKeyRaw),
      };
      axios.post(`/api/reset/password`, postPackage).then(res => {
        if (res.data.ok) {
          this.store.setUID(res.data.userData.uid);
          this.store.setUsername(res.data.userData.username);
          this.store.setNickname(res.data.userData.nickname);
          this.store.setPermission(res.data.userData.permission);
          this.store.setValid();
          this.$emit('success');
        } else {
          this.store.clear();
          this.$refs["modal-msg-reset"].show('提示', httpCodeToStr(res.status));
        }
      }, e => {
        this.store.clear();
        this.$refs["modal-msg-reset"].show('提示', httpCodeToStr(e.response.status));
      });
    },
    validateResetForm: function () {
      if (this.resetForm.email === '') {
        return 2;
      } else if (this.isStudent && !/^\d+$/.test(this.resetForm.email)) {
        return 9;
      } else if (!this.emailRegex.test(this.resetForm.email + (this.isStudent ? '@mail.nankai.edu.cn' : ''))) {
        return 1;
      } else if (this.resetForm.passwordRaw1 === '' || this.resetForm.passwordRaw2 === '') {
        return 4;
      } else if (this.resetForm.passwordRaw1 !== this.resetForm.passwordRaw2) {
        return 3;
      } else if (this.resetForm.passwordRaw1.length < 6) {
        return 7;
      } else if (this.resetForm.emailCaptcha === '') {
        return 5;
      } else if (this.resetForm.examKeyRaw === '' && this.isStrict) {
        return 8;
      }
      return 0;
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
          }, 1000);
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
