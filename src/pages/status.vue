<template>
  <div class="container">
    <b-jumbotron header="评测记录" lead="在此查看您最近的评测记录。">
    </b-jumbotron>
    <b-table hover :items="items" :fields="fields" striped class="text-center" :busy="isLoading" responsive>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="ml-4">加载中...</strong>
        </div>
      </template>

      <template #cell(status)="data">
        <status-button :status="data.value"></status-button>
      </template>
      <template #cell(status_id)="data">
        <p class="p-3">{{data.value}}</p>
      </template>
      <template #cell(submit_id)="data">
        <p class="p-3">{{data.value}}</p>
      </template>
      <template #cell(problem_id)="data">
        <p class="p-3">{{data.value}}</p>
      </template>
      <template #cell(problem_name)="data">
        <p class="p-3">{{data.value}}</p>
      </template>
    </b-table>
  </div>
</template>

<script>
import statusButton from '../components/status/status-button'

export default {
  name: "status",
  components: {
    statusButton
  },
  data: function () {
    return {
      items: [],
      fields: [
        { key: 'status_id', label: '记录ID' },
        { key: 'submit_id', label: '提交ID' },
        { key: 'problem_id', label: '题目ID' },
        { key: 'problem_name', label: '题目名' },
        { key: 'status', label: '状态' }
      ],
      isLoading: true
    }
  },
  methods: {
    loadStatus: function () {
      this.$http.post(`${window.backendOrigin}/api/status`, {
        start: 0,
        end: 100,
        myself: true
      }).then(res => {
        this.items = []
        for(const item of res.data) {
          this.items.push({ status_id: item.statusId, submit_id: item.submitId, problem_id: item.problemId, problem_name: item.problemName, status: item.status })
        }
        this.isLoading = false
      })
    }
  }, mounted() {
    this.loadStatus()
  }
}
</script>

<style scoped>

</style>
