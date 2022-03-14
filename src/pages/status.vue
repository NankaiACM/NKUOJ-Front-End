<template>
  <div class="container">
    <b-jumbotron header="评测记录">

      <template #lead>
        在此查看评测记录。<b-link v-b-toggle.collapse-1>筛选</b-link>
      </template>
      <b-collapse id="collapse-1">
        <b-card bg-variant="light">
          <b-form-group label-cols-lg="3" label="筛选" label-class="font-weight-bold pt-0" class="mb-0">
            <b-form-group label="用户 UID:" label-for="input-uid" label-cols-sm="3" label-align-sm="right" label-size="sm">
              <b-form-input id="input-uid" type="number" size="sm" placeholder="所有用户" min="1" v-model="filters.uid" @change="updateFilters" no-wheel></b-form-input>
            </b-form-group>
            <b-form-group label="题目 PID:" label-for="input-pid" label-cols-sm="3" label-align-sm="right" label-size="sm">
              <b-form-input id="input-pid" type="number" size="sm" placeholder="所有题目" min="1" v-model="filters.pid" @change="updateFilters" no-wheel></b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>
      </b-collapse>
    </b-jumbotron>

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
        <h6><a class="text-decoration-none text-dark" :href="`/submission/${data.value}`">#{{data.value}}</a></h6>
      </template>
      <template #cell(status)="data">
        <h6 :class="`text-${getStatusVariant(data.value)}`">{{getStatusText(data.value)}}</h6>
      </template>
      <template #cell(problem_info)="data">
        <h6><a class="text-decoration-none text-dark" :href="`/problem/${data.value.pid}`"
               v-b-popover.hover.top="`PID: ${data.value.pid}`">{{data.value.name}}</a></h6>
      </template>
      <template #cell(user)="data">
        <h6 v-b-popover.hover.top="data.value.nickname">{{data.value.uid === uid ? '您' : `#${data.value.uid}`}}</h6>
      </template>
    </b-table>

    <b-pagination v-model="currentPage" :per-page="20" :total-rows="totalRows" v-if="totalRows > 20"
                  @change="changePage" align="center" class="m-4" first-number last-number></b-pagination>
  </div>
</template>

<script>

import status2text from "@/util/status-text";
import status2variant from "@/util/status-variant";

export default {
  name: "status",
  data: function () {
    return {
      items: [],
      fields: [
        { key: 'user', label: '用户' },
        { key: 'status_id', label: '记录ID' },
        { key: 'problem_info', label: '题目名' },
        { key: 'status', label: '状态' }
      ],
      isLoading: true,
      currentPage: 1,
      totalRows: 0,
      uid: this.$store.getters.getUID,
      filters: {
        uid: this.$store.getters.getUID,
        pid: null
      }
    }
  },
  methods: {
    changePage: function (number) {
      this.currentPage = number
      this.$http.get(`${window.backendOrigin}/api/solutions?page=${this.currentPage}&item=20${this.filtersToString(true)}`, ).then(res => {
        this.items = []
        for(const item of res.data) {
          this.items.push({ status_id: item.sid, problem_info: {pid: item.pid, name: item.name},
            status: item.statusId, user: {uid: item.uid, nickname: item.nickname} })
        }
        this.isLoading = false
      }, e => {
        console.log(e)
        this.isLoading = true
        this.items = []
      })
    },
    loadStatus: function () {
      this.$http.get(`${window.backendOrigin}/api/solutions/total${this.filtersToString(false)}`, ).then(res => {
        this.totalRows = res.data
      }, e => {
        console.log(e)
      })
    },
    getStatusText: function (status) {
      return status2text(status)
    },
    getStatusVariant: function (status) {
      return status2variant(status)
    },
    updateFilters: function () {
      this.loadStatus()
      this.changePage(1)
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
        ret += `pid=${this.filters.pid}`
      }
      return ret
    }
  }, mounted() {
    this.loadStatus()
    this.changePage(1)
  }
}
</script>

<style scoped>

</style>
