<template>
  <div class="container mb-2">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <span class="text-purple page-title">{{ contestData.name }}</span>
    </div>
    <p class="text-purple ms-3">
      竞赛 | #{{ this.$route.params.id }}
    </p>
    <div class="row">
      <div class="col-md-8 col-12 order-last order-md-first">
        <div class="card rounded-4 bg-light border-0 p-4 mb-2">
          <h5 class="d-inline-flex align-items-center mb-3">
            <IconListOL/>
            <span class="ms-2 me-1">竞赛题目</span>
            <IconChevronDoubleRightSmall/>
          </h5>
          <div v-if="isProblemsLoading">
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
              <span class="placeholder col-6 me-2"></span>
              <span class="placeholder col-8 me-2"></span>
              <span class="placeholder col-5 me-2"></span>
              <span class="placeholder col-12 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
            </p>
          </div>
          <h6 v-else-if="problemsData.length === 0" class="text-center m-4">
            本次竞赛暂无题目。
          </h6>
          <div class="list-group" v-else>
            <router-link class="list-group-item list-group-item-action border-0 flex-column align-items-start"
                         v-for="problem in problemsData" v-bind:key="problem.pid" :to="{path:'/problem/' + problem.pid}">
            <span class="d-flex w-100 justify-content-between flex-column">
              <span class="h5 mb-1">{{ problem.name }}</span>
            </span>
              <small class="text-muted" v-if="problem.status === 0">未提交</small>
              <small class="text-warning" v-else-if="problem.status === 1">未通过</small>
              <small class="text-success" v-else>已通过</small>
            </router-link>
          </div>
        </div>
        <div class="card rounded-4 bg-light border-0 p-4 mb-2">
          <h5 class="d-inline-flex align-items-center mb-3">
            <IconReception/>
            <span class="ms-2 me-1">竞赛榜单</span>
            <IconChevronDoubleRightSmall/>
          </h5>
          <RankingTableContest :id="this.$route.params.id" :limit="20" ref="ranking_table"/>
          <h6 class="card-subtitle mb-2 text-muted">
            <a class="text-decoration-none text-muted me-1" href="#" @click="loadRankingList()">
              本榜单只显示前20名。<IconArrowClockwiseSmall/>刷新</a> | <a class="text-decoration-none text-muted me-1" :href="`/ranking/contest/${this.$route.params.id}`"><IconReplySmall/>完整榜单</a></h6>
        </div>
      </div>
      <div class="col-md-4 col-12 order-first order-md-last">
        <CardProgressBar :begin="contestData.begin" :end="contestData.end" class="mb-2" :warning-time="30" :loading="isDetailsLoading"/>
        <div class="card rounded-4 bg-light border-0 p-4 mb-2">
          <h5 class="d-inline-flex align-items-center mb-3">
            <IconListColumnsReverse/>
            <span class="ms-2 me-1">竞赛信息</span>
            <IconChevronDoubleRightSmall/>
          </h5>
          <div v-if="isDetailsLoading">
            <p class="card-text placeholder-glow">
              <span class="placeholder col-4 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
              <span class="placeholder col-5 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
            </p>
          </div>
          <div v-else>
            <p><span class="h6" v-if="contestData.courseName">课程：</span>{{ contestData.courseName }}</p>
            <p><span class="h6">介绍：</span>{{ contestData.description }}</p>
            <p><span class="h6">时间：</span>{{ getLocaleDate(contestData.begin) }} 开始，至 {{ getLocaleDate(contestData.end) }} 截止</p>
            <p><span class="h6">状态：</span><span v-if="contestData.open" class="text-success">正在进行</span><span v-else class="text-danger">无法提交</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import statusCodeToStr from "@/util/status-code-to-str";
import statusCodeToVariantStr from "@/util/status-code-to-variant-str";
import dateToStr from "@/util/date-to-str";
import {useUserDataStore} from "@/stores/user-data";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconListColumnsReverse from "@/components/icons/IconListColumnsReverse.vue";
import IconListOL from "@/components/icons/IconListOL.vue";
import IconClipboardCheck from "@/components/icons/IconClipboardCheck.vue";
import IconArrowClockwiseSmall from "@/components/icons/IconArrowClockwiseSmall.vue";
import CardProgressBar from "@/components/wrapper/CardProgressBar.vue";
import IconReception from "@/components/icons/IconReception.vue";
import RankingTableContest from "@/components/ranking/RankingTableContest.vue";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";

export default {
  name: "ContestPage",
  components: {
    IconReplySmall,
    RankingTableContest,
    IconReception,
    CardProgressBar,
    IconArrowClockwiseSmall,
    IconClipboardCheck, IconListOL, IconListColumnsReverse, IconChevronDoubleRightSmall},
  data: function () {
    return {
      contestData: {},
      problemsData: [],
      isDetailsLoading: true,
      isProblemsLoading: true,
    }
  },
  setup() {
    const userDataStore = useUserDataStore();
    return {
      userDataStore
    }
  },
  methods: {
    loadContestData: async function () {
      await axios.get(`/api/contest/id/${this.$route.params.id}`).then(res => {
        this.contestData = res.data;
        this.isDetailsLoading = false;
      })
      await axios.get(`/api/problem/problemset/${this.$route.params.id}`).then(res => {
        this.problemsData = res.data;
        this.isProblemsLoading = false;
      })
    },
    loadRankingList: function () {
      this.$refs.ranking_table.refresh();
    },
    getLocaleDate: function (string) {
      return dateToStr(string);
    },
    getStatusText: function (status) {
      return statusCodeToStr(status);
    },
    getStatusVariant: function (status) {
      return statusCodeToVariantStr(status);
    },
    loadData: async function () {
      await this.loadContestData();
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>
