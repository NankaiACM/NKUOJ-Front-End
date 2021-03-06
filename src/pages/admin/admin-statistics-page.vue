<template>
  <div class="container">
    <item-select-card api="problem" @select="onItemSelected" :newable="false"></item-select-card>
    <div v-if="hasItemSelected" class="mt-3">
      <b-alert show variant="secondary" class="text-center" dismissible fade>提示：统计数据只提供最高分中的最后一次提交。没有提交的用户不会计入统计。</b-alert>
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
          <h6><b-link class="text-decoration-none" :href="`/submission/${data.value}`">#{{data.value}}</b-link></h6>
        </template>
        <template #cell(status)="data">
          <h6 :class="`text-dark`">{{data.value}}</h6>
        </template>
        <template #cell(uid)="data">
          <h6>{{`#${uidToStr(data.value)}`}}</h6>
        </template>
      </b-table>
      <div class="container-fluid d-flex justify-content-center mt-4 mb-4 position-sticky fixed-bottom pb-1">
        <b-button-group class="center">
          <b-button variant="success" :disabled="isLoading" @click="downloadStatisticsJson">
            <b-spinner small type="grow" v-if="isLoading"></b-spinner>
            下载数据 (Json)
          </b-button>
          <b-button variant="info" :disabled="isLoading" @click="downloadStatisticsCsv">
            <b-spinner small type="grow" v-if="isLoading"></b-spinner>
            下载数据 (Csv)
          </b-button>
          <b-button variant="secondary" :disabled="isLoading" @click="downloadSourceCode">
            <b-spinner small type="grow" v-if="isLoading"></b-spinner>
            下载源码 (Zip)
          </b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import itemSelectCard from '../../components/admin/admin-problem-select-card'
import code2str from "@/util/http-code-to-str";
import uid2Str from "@/util/uid-to-str";

export default {
  name: "admin-statistics-page",
  components: {
    itemSelectCard
  },
  data: function () {
    return {
      statisticsJSON: [],
      statisticsCSV: '',
      items: [],
      selectedId: 0,
      hasItemSelected: false,
      fields: [
        { sortable: true, key: 'uid', label: 'UID' },
        { sortable: true, key: 'nickname', label: '昵称' },
        { sortable: true, key: 'name', label: '实名' },
        { sortable: true, key: 'username', label: '用户名' },
        { sortable: true, key: 'lang', label: '语言' },
        { sortable: true, key: 'status_id', label: '记录ID' },
        { sortable: true, key: 'status', label: '状态' },
        { sortable: true, key: 'score', label: '分数' },
      ],
      isLoading: true,
    }
  },
  methods: {
    onItemSelected: function (id) {
      this.selectedId = id
      this.loadSelectedItem()
    },
    loadSelectedItem: function () {
      this.hasItemSelected = true
      this.isLoading = true
      this.$http.get(`${window.backendOrigin}/api/admin/problem/id/${this.selectedId}/statistics`).then(res => {
        this.statisticsJSON = res.data.json
        this.statisticsCSV = res.data.csv
        this.items = []
        for(const item of res.data.json) {
          this.items.push({ status_id: item.sid, score: item.score, nickname: item.nickname, username: item.email,
            status: item.status, uid: item.uid, name: item.realname, lang: item.lang })
        }
        this.isLoading = false
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '载入信息失败'})
      })
    },
    uidToStr: function (uid) {
      return uid2Str(uid)
    },
    downloadStatisticsJson: function () {
      const blob = new Blob([JSON.stringify(this.statisticsJSON)], {type: 'application/text'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `statistics-${this.selectedId}.json`;
      link.click();
    },
    downloadStatisticsCsv: function () {
      const blob = new Blob([this.statisticsCSV], {type: 'application/text'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `statistics-${this.selectedId}.csv`;
      link.click();
    },
    downloadSourceCode: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/problem/id/${this.selectedId}/statistics/code`, {responseType: 'arraybuffer'})
        .then(response => {
          const blob = new Blob([response.data], {type: 'application/zip'});

          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `source-code-${this.selectedId}.zip`;
          link.click();
        })
    }
  }
}
</script>

<style scoped>

</style>
