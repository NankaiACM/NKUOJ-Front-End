<template>
  <div class="container">
    <b-card title="个人信息" sub-title="查看您的个人信息">
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>UID:</b></b-col>
        <b-col>{{userData.uid}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>用户名：</b></b-col>
        <b-col>{{userData.username}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>昵称：</b></b-col>
        <b-col>{{profileData.nickname}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>权限级：</b></b-col>
        <b-col>{{userData.permission}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>联系电话：</b></b-col>
        <b-col>{{profileData.tel}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>QQ:</b></b-col>
        <b-col>{{profileData.qq}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>学校：</b></b-col>
        <b-col>{{profileData.school}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>个人介绍：</b></b-col>
        <b-col>{{profileData.words}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-left"><b>姓名：</b></b-col>
        <b-col>{{profileData.realname}}</b-col>
      </b-row>

      <b-link @click="showUpdateModal" class="card-link text-muted">更新个人信息</b-link>
    </b-card>

    <!-- Login Modal -->
    <b-modal ref="update-modal" title="更新个人信息" centered @ok="submitProfileData" ok-title="更新" cancel-title="取消">
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
    </b-modal>
  </div>
</template>

<script>
import code2str from "../util/http-code-to-str";

export default {
  name: "profile-page",
  data() {
    return {
      profileData: {},
      userData: {},
      updateForm: {
        realname: '',
        school: '',
        words: '',
        tel: '',
        qq: '',
        nickname: ''
      }
    }
  }, methods: {
    loadProfileData: function () {
      this.$http.get(`${window.backendOrigin}/api/user/id/${this.userData.uid}`).then(res => {
        this.profileData = res.data
        this.updateForm = {
          realname: this.profileData.realname,
          school: this.profileData.school,
          words: this.profileData.words,
          tel: this.profileData.tel,
          qq: this.profileData.qq,
          nickname: this.profileData.nickname
        }
      })
    }, submitProfileData: function () {
      this.$http.post(`${window.backendOrigin}/api/reset/profile`, this.updateForm).then(res => {
        if (res.status === 200) {
          this.profileData = res.data
        } else {
          this.$bvModal.msgBoxOk(code2str(res.status), {title: '提示', centered: true})
        }
      }, e => {
        this.$bvModal.msgBoxOk(code2str(e.status), {title: '提示', centered: true})
      })
    }, showUpdateModal: function () {
      this.$refs['update-modal'].show()
    },
  }, mounted() {
    this.userData = this.$store.getters.getUserData
    this.loadProfileData()
  }
}
</script>

<style scoped>

</style>
