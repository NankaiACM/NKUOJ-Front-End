<template>
<div class="container mb-2">
  <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
    <IconPerson class="text-purple me-2"/>
    <span class="page-title text-purple"> 个人信息 </span>
  </div>
  <p class="text-purple ms-3">
    查看和修改个人信息。
  </p>
  <div class="card rounded-4 p-4 border-0 bg-light">
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>UID:</b></div>
      <div class="col">{{ userDataStore.uid }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>用户名：</b></div>
      <div class="col">{{ userDataStore.username }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>昵称：</b></div>
      <div class="col">{{ userDataStore.nickname }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>权限级：</b></div>
      <div class="col">{{ userDataStore.permission }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>联系电话：</b></div>
      <div class="col">{{ profileData.tel }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>QQ:</b></div>
      <div class="col">{{ profileData.qq }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>学校：</b></div>
      <div class="col">{{ profileData.school }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>个人介绍：</b></div>
      <div class="col">{{ profileData.words }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-3 text-sm-left"><b>姓名：</b></div>
      <div class="col">{{ profileData.realname }}</div>
    </div>
    <a @click="showUpdateModal" class="card-link text-muted text-decoration-none" href="#">更新个人信息</a>
  </div>
  <ModalUpdateProfile ref="modal_update_profile" @submitted="loadProfileData()"/>
</div>
</template>

<script>
import IconPerson from "@/components/icons/IconPerson.vue";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import axios from "axios";
import {useUserDataStore} from "@/stores/user-data";
import ModalUpdateProfile from "@/components/modal/ModalUpdateProfile.vue";

export default {
  name: "ProfilePage",
  components: {ModalUpdateProfile, IconChevronDoubleRightSmall, IconPerson},
  data: function () {
    return {
      profileData: {},
    }
  },
  methods: {
    loadProfileData: function () {
      axios.get(`/api/user/id/${this.userDataStore.uid}`).then(res => {
        this.profileData = res.data;
        this.updateForm = {
          realname: this.profileData.realname,
          school: this.profileData.school,
          words: this.profileData.words,
          tel: this.profileData.tel,
          qq: this.profileData.qq,
          nickname: this.profileData.nickname
        };
        this.userDataStore.setNickname(this.profileData.nickname);
      });
    },
    showUpdateModal: function () {
      this.$refs.modal_update_profile.show(this.updateForm);
    }
  },
  mounted() {
    this.loadProfileData();
  },
  setup() {
    const userDataStore = useUserDataStore();
    return {
      userDataStore
    }
  }
}
</script>

<style scoped>

</style>
