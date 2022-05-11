<template>
  <b-modal id="profile-modal" ok-title="关闭" title="考生信息" ok-only centered>
    <b-row class="mb-2">
      <b-col sm="3" class="text-sm-left"><b>UID:</b></b-col>
      <b-col>{{ userData.uid }}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col sm="3" class="text-sm-left"><b>昵称：</b></b-col>
      <b-col>{{ userData.nickname }}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col sm="3" class="text-sm-left"><b>学号：</b></b-col>
      <b-col>{{ studentID }}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col sm="3" class="text-sm-left"><b>实名：</b></b-col>
      <b-col>{{ realname }}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col sm="3" class="text-sm-left"><b>用户名：</b></b-col>
      <b-col>{{ userData.username }}</b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  name: "strict-profile-modal",
  data: function () {
    return {
      userData: {},
      realname: ''
    }
  },
  methods: {
    show: function () {
      this.$bvModal.show('profile-modal')
    },
    loadProfileData: function () {
      this.$http.get(`${window.backendOrigin}/api/user/id/${this.userData.uid}`).then(res => {
        this.realname = res.data.realname
      })
    }
  },
  computed: {
    studentID: function () {
      if (!this.userData.username)
        return null
      const i = this.userData.username.indexOf('@mail.nankai.edu.cn')
      if (i === -1) {
        return '非学生'
      }
      return this.userData.username.substring(0, i)
    }
  },
  mounted() {
    this.userData = this.$store.getters.getUserData
    this.loadProfileData()
  }
}
</script>

<style scoped>

</style>
