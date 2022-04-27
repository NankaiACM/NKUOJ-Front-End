<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">评测记录</h1>
      <p class="lead">在此查看评测记录。
        <b-link @click="showFilterModal" class="text-decoration-none text-muted"><b-icon icon="funnel"></b-icon>筛选</b-link> |
        <b-link @click="showJumpModal" class="text-decoration-none text-muted"><b-icon icon="reply"></b-icon>跳转</b-link> |
        <b-link @click="reloadStatusTable" class="text-decoration-none text-muted"><b-icon icon="arrow-clockwise"></b-icon>刷新</b-link>
      </p>
    </div>

    <b-pagination v-model="currentPage" :per-page="20" :total-rows="totalRows" v-if="totalRows > 20"
                  @change="changePage" align="center" class="m-4" first-number last-number></b-pagination>

    <b-table hover :items="items" :fields="fields" striped class="text-center mt-4" :busy="isLoading" responsive show-empty>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="ml-4">加载中...</strong>
        </div>
      </template>
      <template #empty>
        <strong class="text-muted"> 没有相关记录 </strong>
      </template>

      <template #cell(status_id)="data">
        <h6><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value}`">#{{data.value}}</b-link></h6>
      </template>
      <template #cell(status)="data">
        <h6 :class="`text-${getStatusVariant(data.value)}`">{{getStatusText(data.value)}}</h6>
      </template>
      <template #cell(problem_info)="data">
        <h6><b-link class="text-decoration-none text-dark" :href="`/problem/${data.value.pid}`">{{data.value.name}}</b-link> #{{data.value.pid}}</h6>
      </template>
      <template #cell(user)="data">
        <h6 v-b-popover.hover.top="data.value.nickname">{{data.value.uid === uid ? '您' : `#${uidToStr(data.value.uid)}`}}</h6>
      </template>
    </b-table>

    <b-pagination v-model="currentPage" :per-page="20" :total-rows="totalRows" v-if="totalRows > 20"
                  @change="changePage" align="center" class="m-4" first-number last-number></b-pagination>

    <b-modal id="filter-modal" title="筛选" ok-title="确定" ok-only centered @ok="updateFilters">
      <label>筛选用户：<span class="text-muted">您的UID: {{uid}}</span></label>
      <b-form-group label="用户 UID:" label-for="input-uid" label-cols-sm="3" label-align-sm="right" label-size="sm">
        <b-form-input id="input-uid" type="number" size="sm" placeholder="所有用户" min="1" v-model="filters.uid" no-wheel @keydown.enter.native="updateFilters"></b-form-input>
      </b-form-group>
      <b-form-group label="昵称:" label-for="input-nickname" label-cols-sm="3" label-align-sm="right" label-size="sm">
        <b-form-input id="input-nickname" type="text" size="sm" placeholder="所有用户" min="1" v-model="filters.nickname" no-wheel @keydown.enter.native="updateFilters"></b-form-input>
      </b-form-group>
      <label>筛选题目：</label>
      <b-form-group label="题目 PID:" label-for="input-pid" label-cols-sm="3" label-align-sm="right" label-size="sm">
        <b-form-input id="input-pid" type="number" size="sm" placeholder="所有题目" min="1" v-model="filters.pid" no-wheel @keydown.enter.native="updateFilters"></b-form-input>
      </b-form-group>
    </b-modal>

    <b-modal id="jump-modal" title="跳转到某个记录" ok-title="确定" ok-only centered @ok="jumpToSubmission">
      <b-form-input type="number" size="sm" placeholder="键入提交记录的ID..." v-model="jumpID" no-wheel @keydown.enter.native="jumpToSubmission"></b-form-input>
    </b-modal>
  </div>
</template>

<script>

import status2text from "@/util/status-text";
import status2variant from "@/util/status-variant";
import uid2Str from "@/util/uidToStr";

export default {
  name: "tab-status",
  data: function () {
    return {
      items: [],
      fields: [
        { key: 'user', label: '用户' },
        { key: 'status_id', label: '记录ID' },
        { key: 'problem_info', label: '题目' },
        { key: 'status', label: '状态' }
      ],
      isLoading: true,
      currentPage: 1,
      totalRows: 0,
      uid: this.$store.getters.getUID,
      filters: {
        uid: null,
        pid: null,
        nickname: '',
        meOnly: false
      },
      jumpID: null
    }
  },
  methods: {
    changePage: function (number) {
      this.currentPage = number
      this.loadRowsCount()
      this.loadStatusData()
    },
    loadRowsCount: function () {
      this.$http.get(`${window.backendOrigin}/api/solutions/total${this.filtersToString(false)}`, ).then(res => {
        this.totalRows = res.data
      })
    },
    loadStatusData: function () {
      this.isLoading = true
      this.$http.get(`${window.backendOrigin}/api/solutions?page=${this.currentPage}&item=20${this.filtersToString(true)}`, ).then(res => {
        this.items = []
        for(const item of res.data) {
          this.items.push({ status_id: item.sid, problem_info: {pid: item.pid, name: item.name},
            status: item.statusId, user: {uid: item.uid, nickname: item.nickname} })
        }
        this.isLoading = false
      }, () => {
        this.isLoading = true
        this.items = []
      })
    },
    getStatusText: function (status) {
      return status2text(status)
    },
    getStatusVariant: function (status) {
      return status2variant(status)
    },
    uidToStr: function (uid) {
      return uid2Str(uid)
    },
    updateFilters: function () {
      this.loadRowsCount()
      this.changePage(1)
      this.saveFilterPreferences()
      this.$bvModal.hide('filter-modal')
    },
    loadFilterPreferences: function () {
      this.filters.nickname = this.$store.state.preferences.statusFilterNickname
      this.filters.uid = this.$store.state.preferences.statusFilterUID
      this.filters.pid = this.$store.state.preferences.statusFilterPID
    },
    saveFilterPreferences: function () {
      this.$store.commit('setPreferencesItem', {
        statusFilterNickname: this.filters.nickname,
        statusFilterUID: this.filters.uid,
        statusFilterPID: this.filters.pid,
      })
    },
    filtersToString: function (flag) {
      let ret = ''
      if (this.filters.uid) {
        ret += flag ? '&' : '?'
        flag = true
        ret += `uid=${this.filters.uid}`
      }
      if (this.filters.pid) {
        ret += flag ? '&' : '?'
        flag = true
        ret += `pid=${this.filters.pid}`
      }
      if (this.filters.nickname) {
        ret += flag ? '&' : '?'
        ret += `nickname=${this.filters.nickname}`
      }
      return ret
    },
    showFilterModal: function () {
      this.$bvModal.show('filter-modal')
    },
    showJumpModal: function () {
      this.$bvModal.show('jump-modal')
    },
    jumpToSubmission: function () {
      this.$router.push(`/submission/${this.jumpID}`)
    },
    reloadStatusTable: function () {
      this.loadRowsCount()
      this.loadStatusData()
      this.$bvToast.toast(`刷新成功！`, {
        title: '提示',
        autoHideDelay: 5000,
        appendToast: true,
        variant: 'success'
      })
    }
  }, mounted() {
    this.loadFilterPreferences()
    this.loadRowsCount()
    this.changePage(1)
  }
}
</script>

<style scoped>

</style>
