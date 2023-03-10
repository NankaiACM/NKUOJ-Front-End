<template>
  <ModalBase v-model="internalShow" title="更新个人信息"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="提交"
             :cancel-button="true" cancel-class="btn-outline-danger" cancel-text="取消"
             @ok="submitProfileData()" @close="dismiss()" @cancel="dismiss()">
    <div class="container">
      <div class="form-row align-items-center">
        <div class="container">
          <label for="profileNameInput">姓名</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="profileNameInput" v-model="updateForm.realname">
          </div>
        </div>
        <div class="container">
          <label for="profileNickNameInput">昵称</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="profileNickNameInput" v-model="updateForm.nickname">
          </div>
        </div>
        <div class="container">
          <label for="profileSchoolInput">学校</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="profileSchoolInput" v-model="updateForm.school">
          </div>
        </div>
        <div class="container">
          <label for="profileTelInput">电话</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="profileTelInput" v-model="updateForm.tel">
          </div>
        </div>
        <div class="container">
          <label for="profileQQInput">QQ</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="profileQQInput" v-model="updateForm.qq">
          </div>
        </div>
        <div class="container">
          <label for="profileBioInput">个人介绍</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="profileBioInput" v-model="updateForm.words">
          </div>
        </div>
      </div>
    </div>
    <ModalMsgBox ref="modal_msg_box_submit_profile"/>
  </ModalBase>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";
import axios from "axios";
import httpCodeToStr from "@/util/http-code-to-str";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";

export default {
  name: "ModalUpdateProfile",
  components: {ModalMsgBox, ModalBase},
  data: function () {
    return {
      internalShow: false,
      updateForm: {
        realname: '',
        school: '',
        words: '',
        tel: '',
        qq: '',
        nickname: ''
      }
    }
  },
  methods: {
    submitProfileData: function () {
      axios.post(`/api/reset/profile`, this.updateForm).then(res => {
        if (res.status === 200) {
          this.$emit('submitted');
          this.dismiss();
        } else {
          this.$refs.modal_msg_box_submit_profile.show('提示', httpCodeToStr(res.status));
        }
      }, e => {
        this.$refs.modal_msg_box_submit_profile.show('提交失败', httpCodeToStr(e.response.status));
      })
    },
    dismiss: function () {
      this.internalShow = false;
    },
    show: function (updateForm) {
      this.updateForm = updateForm;
      this.internalShow = true;
    }
  }
}
</script>

<style scoped>

</style>
