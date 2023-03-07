<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <IconClipboardCheck class="text-purple me-2"/>
      <span class="text-purple page-title">评测记录</span>
    </div>
    <p class="text-purple ms-3">
      <a @click="showFilterModal" class="text-decoration-none text-purple" href="#"><IconFunnelFillSmall v-if="hasFilters"/><IconFunnelSmall v-else/>筛选</a> |
      <a @click="showJumpModal" class="text-decoration-none text-purple" href="#"><IconReplySmall/>跳转</a> |
      <a @click="reloadStatusTable" class="text-decoration-none text-purple" href="#"><IconArrowClockwiseSmall/>刷新</a>
    </p>
    <div class="table-responsive" v-if="isLoading">
      <table class="table">
        <thead>
        <tr>
          <th scope="col" class=" text-center text-purple">记录</th>
          <th scope="col" class="text-center">用户</th>
          <th scope="col" class="text-center text-purple">题目</th>
          <th scope="col" class="text-center">状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="i in 50" :key="i">
          <th scope="row" class="text-center placeholder-glow"><span class="placeholder col-3"></span></th>
          <td class="text-center col-3"><span class="placeholder col-5"></span></td>
          <td class="text-center col-3"><span class="placeholder col-5"></span></td>
          <td class="text-center col-3"><span class="placeholder col-4"></span></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="table-responsive" v-else>
      <table class="table">
        <thead>
        <tr>
          <th scope="col" class=" text-center text-purple">记录</th>
          <th scope="col" class="text-center">用户</th>
          <th scope="col" class="text-center text-purple">题目</th>
          <th scope="col" class="text-center">状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.submission_id">
          <th scope="row" class="text-center"><a :href="`/submission/${item.submission_id}`" class="text-decoration-none text-purple">#{{ item.submission_id }}</a></th>
          <td class="text-center">@{{ item.user.nickname }}</td>
          <td class="text-center"><a :href="`/problem/${item.problem_info.pid}`" class="text-decoration-none text-purple">{{item.problem_info.name}}</a></td>
          <td :class="`text-center text-${getStatusVariant(item.status)}`">{{getStatusText(item.status)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="m-4 d-flex justify-content-center">
      <Pagination v-model="currentPage" :per-page="50" :total-rows="totalRows" v-if="totalRows > 20"
                  @update:modelValue="changePage"></Pagination>
    </div>
  <ModalFilter ref="filter_modal" v-model:uid="filters.uid" v-model:pid="filters.pid" v-model:nickname="filters.nickname" @change="updateFilters" :self_uid="userDataStore.uid"/>
  <ModalJumpToSubmission ref="jump_modal"/>
  </div>
</template>

<script>

import status2text from "@/util/status-code-to-str";
import status2variant from "@/util/status-code-to-variant-str";
import uid2Str from "@/util/uid-to-str";
import Pagination from "@/components/wrapper/Pagination.vue";
import axios from "axios";
import {useUserDataStore} from "@/stores/user-data";
import IconFunnelFillSmall from "@/components/icons/IconFunnelFillSmall.vue";
import IconFunnelSmall from "@/components/icons/IconFunnelSmall.vue";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";
import IconArrowClockwiseSmall from "@/components/icons/IconArrowClockwiseSmall.vue";
import {useFilterDataStore} from "@/stores/filter-data";
import IconClipboardCheck from "@/components/icons/IconClipboardCheck.vue";
import ModalFilter from "@/components/modal/ModalFilter.vue";
import ModalJumpToSubmission from "@/components/modal/ModalJumpToSubmission.vue";

export default {
  name: "SiteSubmissionPage",
  components: {
    ModalJumpToSubmission,
    ModalFilter,
    IconClipboardCheck,
    IconArrowClockwiseSmall,
    IconReplySmall, IconFunnelSmall, IconFunnelFillSmall, Pagination},
  data: function () {
    return {
      items: [],
      isLoading: true,
      currentPage: 1,
      totalRows: 0,
      filters: {
        uid: null,
        pid: null,
        nickname: '',
      },
      jumpID: null
    }
  },
  setup() {
    const userDataStore = useUserDataStore();
    const filterDataStore = useFilterDataStore();
    return {
      userDataStore, filterDataStore
    }
  },
  methods: {
    changePage: function (number) {
      this.currentPage = number;
      this.loadRowsCount();
      this.loadStatusData();
    },
    loadRowsCount: function () {
      axios.get(`/api/solutions/total${this.filtersToString(false)}`, ).then(res => {
        this.totalRows = res.data;
      });
    },
    loadStatusData: function () {
      this.isLoading = true
      axios.get(`/api/solutions?page=${this.currentPage}&item=50${this.filtersToString(true)}`, ).then(res => {
        this.items = [];
        for(const item of res.data) {
          this.items.push({ submission_id: item.sid, problem_info: {pid: item.pid, name: item.name},
            status: item.statusId, user: {uid: item.uid, nickname: item.nickname} });
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = true;
        this.items = [];
      })
    },
    getStatusText: function (status) {
      return status2text(status);
    },
    getStatusVariant: function (status) {
      return status2variant(status);
    },
    uidToStr: function (uid) {
      return uid2Str(uid);
    },
    updateFilters: function () {
      this.loadRowsCount();
      this.changePage(1);
      this.saveFilterPreferences();
    },
    loadFilterPreferences: function () {
      this.filters.nickname = this.filterDataStore.nickname;
      this.filters.uid = this.filterDataStore.uid;
      this.filters.pid = this.filterDataStore.pid;
    },
    saveFilterPreferences: function () {
      this.filterDataStore.setPID(this.filters.pid);
      this.filterDataStore.setUID(this.filters.uid);
      this.filterDataStore.setNickname(this.filters.nickname);
    },
    filtersToString: function (flag) {
      let ret = '';
      if (this.filters.uid) {
        ret += flag ? '&' : '?';
        flag = true;
        ret += `uid=${this.filters.uid}`;
      }
      if (this.filters.pid) {
        ret += flag ? '&' : '?';
        flag = true;
        ret += `pid=${this.filters.pid}`;
      }
      if (this.filters.nickname) {
        ret += flag ? '&' : '?';
        ret += `nickname=${this.filters.nickname}`;
      }
      return ret;
    },
    showFilterModal: function () {
      this.$refs.filter_modal.show();
    },
    showJumpModal: function () {
      this.$refs.jump_modal.show();
    },
    reloadStatusTable: function () {
      this.loadRowsCount();
      this.loadStatusData();
    }
  },
  mounted() {
    this.loadFilterPreferences();
    this.loadRowsCount();
    this.changePage(1);
  },
  computed: {
    hasFilters: function () {
      return this.filters.uid || this.filters.pid || this.filters.nickname;
    }
  }
}
</script>

<style scoped>

</style>
