<template>
  <div class="container">
    <b-jumbotron header="评测记录" lead="在此查看评测记录。">
    </b-jumbotron>
    <b-table hover :items="items" :fields="fields" striped class="text-center" :busy="isLoading" responsive>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="ml-4">加载中...</strong>
        </div>
      </template>

      <template #cell(status_id)="data">
        <h6>{{data.value}}</h6>
      </template>
      <template #cell(status)="data">
        <h6 :class="`text-${getStatusVariant(data.value)}`">{{getStatusText(data.value)}}</h6>
      </template>
      <template #cell(problem_id)="data">
        <h6>{{data.value}}</h6>
      </template>
      <template #cell(problem_name)="data">
        <h6>{{data.value}}</h6>
      </template>
      <template #cell(uid)="data">
        <h6>{{data.value === uid ? '您' : `#${data.value}`}}</h6>
      </template>
    </b-table>

    <div class="container d-flex justify-content-center p-5">
      <b-pagination v-model="currentPage" :per-page="20" :total-rows="totalRows" first-text="<<"
        prev-text="<" next-text=">" last-text=">>" @change="changePage"
      ></b-pagination>
    </div>
  </div>
</template>

<script>

import status2text from "@/code/status-text";
import status2variant from "@/code/status-variant";

export default {
  name: "status",
  data: function () {
    return {
      items: [],
      fields: [
        { key: 'uid', label: '用户' },
        { key: 'status_id', label: '记录ID' },
        { key: 'problem_id', label: '题目ID' },
        { key: 'problem_name', label: '题目名' },
        { key: 'status', label: '状态' }
      ],
      isLoading: true,
      currentPage: 1,
      totalRows: 0,
      uid: this.$store.getters.getUID
    }
  },
  methods: {
    changePage: function (number) {
      this.currentPage = number
      this.$http.get(`${window.backendOrigin}/api/solutions?page=${this.currentPage}&item=20`, ).then(res => {
        this.items = []
        for(const item of res.data) {
          this.items.push({ status_id: item.sid, problem_id: item.pid, problem_name: item.name,
            status: item.statusId, uid: item.uid })
        }
        this.isLoading = false
      }, e => {
        console.log(e)
        this.isLoading = true
        this.items = []
      })
    },
    loadStatus: function () {
      this.$http.get(`${window.backendOrigin}/api/solutions/total`, ).then(res => {
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
    }
  }, mounted() {
    this.loadStatus()
    this.changePage(1)
  }
}
</script>

<style scoped>

</style>
