<template>
  <div class="container mb-2">
    <div class="row">
      <div class="col-md-8 col-12 order-last order-md-first">
        <div class="card rounded-4 p-4 border-0 bg-light mb-4">
          <div v-if="!this.strictModeStore.serverStrictMode">
            <h5 class="text-dark">NKU-OJ 已启用考试模式：</h5>
            <ul>
              <li>您现在已经进入考试模式，请遵守考试或竞赛的规则与秩序；</li>
              <li>到达开始时间时，请使用页面中的<span class="text-muted"><IconArrowClockwiseSmall/>刷新</span>刷新页面，不要使用<span class="text-danger">F5</span>或浏览器的<span class="text-danger"><IconArrowClockwiseSmall/>按钮</span>，避免您无法进入考试页面；</li>
              <li>如若时间未到，<span class="text-danger">请勿频繁刷新页面</span>，将带宽留给其他还未进入的同学；</li>
              <li>预祝您取得良好的成绩。</li>
            </ul>
          </div>
          <h6 class="text-center text-muted" v-else>NKU-OJ 暂未启用考试模式。您可以
            <a class="text-decoration-none text-purple" href="/home" @click="exitStrictMode">点此退出</a>。
          </h6>
        </div>
        <PanelStrictExam class="mb-2"/>
        <PanelStrictContest class="mb-2"/>
      </div>
      <div class="col-md-4 col-12 order-first order-md-last">
        <div class="card border-0 bg-light p-4 rounded-4">
          <h5 class="d-inline-flex align-items-center mb-3">
            <IconPerson/>
            <span class="ms-2 me-1">个人信息</span>
            <IconChevronDoubleRightSmall/>
          </h5>
          <div class="row mb-2">
            <div class="col col-sm-3 text-sm-left"><b>UID:</b></div>
            <div class="col">u:{{ uidToStr(userDataStore.uid) }}</div>
          </div>
          <div class="row mb-2">
            <div class="col col-sm-3 text-sm-left"><b>昵称：</b></div>
            <div class="col">@{{ userDataStore.nickname }}</div>
          </div>
          <div class="row mb-2">
            <div class="col col-sm-3 text-sm-left"><b>学号：</b></div>
            <div class="col">{{ studentID }}</div>
          </div>
          <div class="row mb-2">
            <div class="col col-sm-3 text-sm-left"><b>实名：</b></div>
            <div class="col">{{ realname }}</div>
          </div>
          <div class="row mb-2">
            <div class="col col-sm-3 text-sm-left"><b>用户名：</b></div>
            <div class="col">{{ userDataStore.username }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelStrictExam from "@/components/panels/PanelStrictExam.vue";
import PanelStrictContest from "@/components/panels/PanelStrictContest.vue";
import {useStrictModeStore} from "@/stores/strict-mode";
import router from "@/router";
import IconArrowClockwiseSmall from "@/components/icons/IconArrowClockwiseSmall.vue";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconPerson from "@/components/icons/IconPerson.vue";
import {useUserDataStore} from "@/stores/user-data";
import uidToStr from "@/util/uid-to-str";
import axios from "axios";

export default {
  name: "PageStrictHome",
  components: {IconPerson, IconChevronDoubleRightSmall, IconArrowClockwiseSmall, PanelStrictContest, PanelStrictExam},
  setup() {
    const strictModeStore = useStrictModeStore();
    const userDataStore = useUserDataStore();
    return {
      userDataStore, strictModeStore
    }
  },
  data: function () {
    return {
      realname: ''
    }
  },
  methods: {
    exitStrictMode: function () {
      this.strictModeStore.setClientStrictMode(false);
      router.push('/home');
    },
    uidToStr: function (str) {
      return uidToStr(str);
    },
    loadProfileData: function () {
      axios.get(`/api/user/id/${this.userDataStore.uid}`).then(res => {
        this.realname = res.data.realname;
      });
    }
  },
  computed: {
    studentID: function () {
      if (!this.userDataStore.username)
        return null
      const i = this.userDataStore.username.indexOf('@mail.nankai.edu.cn')
      if (i === -1) {
        return '非学生'
      }
      return this.userDataStore.username.substring(0, i)
    },
  },
  mounted() {
    this.loadProfileData();
  }
}
</script>

<style scoped>

</style>
