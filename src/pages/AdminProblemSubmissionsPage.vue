<template>
<div class="container">
  <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
    <IconSliders class="text-purple me-2"/>
    <span class="text-purple page-title">题目完成数据</span>
  </div>
  <p class="text-purple ms-3">
    题目：#{{ this.$route.params.id }}
    <span v-if="!isLoading">
      <span> | </span>
      <a @click="loadSelectedItem" class="text-decoration-none text-purple" href="#"><IconArrowClockwiseSmall/>刷新</a> |
      <a @click="downloadStatisticsJson" class="text-decoration-none text-purple" href="#"><IconDownloadSmall/>下载JSON</a> |
      <a @click="downloadStatisticsCsv" class="text-decoration-none text-purple" href="#"><IconDownloadSmall/>下载CSV</a> |
      <a @click="downloadSourceCode" class="text-decoration-none text-purple" href="#"><IconDownloadSmall/>下载源码</a>
    </span>
  </p>
  <div v-if="isLoading">
    <p class="placeholder-glow" v-for="i in 4" :key="i">
      <span class="placeholder col-7 me-2"></span>
      <span class="placeholder col-4 me-2"></span>
      <span class="placeholder col-4 me-2"></span>
      <span class="placeholder col-6 me-2"></span>
      <span class="placeholder col-8 me-2"></span>
    </p>
  </div>
  <div class="table-responsive" v-else>
    <table class="table">
      <thead>
      <tr>
        <th scope="col" class="text-center">UID</th>
        <th scope="col" class="text-center">昵称</th>
        <th scope="col" class="text-center">实名</th>
        <th scope="col" class="text-center">用户名</th>
        <th scope="col" class="text-center">语言</th>
        <th scope="col" class="text-center text-purple">记录ID</th>
        <th scope="col" class="text-center">状态</th>
        <th scope="col" class="text-center">分数</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.submission_id">
        <th scope="row" class="text-center text-muted">u:{{ uidToStr(item.uid) }}</th>
        <td class="text-center text-muted">@{{ item.nickname }}</td>
        <td class="text-center text-muted">{{ item.name }}</td>
        <td class="text-center text-muted">{{ item.username }}</td>
        <td class="text-center text-muted">{{ item.lang }}</td>
        <td class="text-center"><a :href="`/submission/${item.submission_id}`" class="text-decoration-none text-purple">#{{ item.submission_id }}<IconBoxArrowInUpRightSmall/></a></td>
        <td class="text-center">{{ item.status }}</td>
        <td class="text-center text-muted">{{ item.score }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <ModalMsgBox ref="modal_msg_box"/>
</div>
</template>

<script>
import IconSliders from "@/components/icons/IconSliders.vue";
import axios from "axios";
import uidToStr from "@/util/uid-to-str";
import httpCodeToStr from "@/util/http-code-to-str";
import IconBoxArrowInUpRightSmall from "@/components/icons/IconBoxArrowInUpRightSmall.vue";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import status2text from "@/util/status-code-to-str";
import status2variant from "@/util/status-code-to-variant-str";
import IconDownloadSmall from "@/components/icons/IconDownloadSmall.vue";
import IconArrowClockwiseSmall from "@/components/icons/IconArrowClockwiseSmall.vue";

export default {
  name: "AdminProblemSubmissionsPage",
  components: {IconArrowClockwiseSmall, IconDownloadSmall, ModalMsgBox, IconBoxArrowInUpRightSmall, IconSliders},
  data: function () {
    return {
      statisticsJSON: [],
      statisticsCSV: '',
      items: [],
      hasItemSelected: false,
      isLoading: true,
    }
  },
  methods: {
    loadSelectedItem: function () {
      this.hasItemSelected = true;
      this.isLoading = true;
      axios.get(`/api/admin/problem/id/${this.$route.params.id}/statistics`).then(res => {
        this.statisticsJSON = res.data.json;
        this.statisticsCSV = res.data.csv;
        this.items = [];
        for(const item of res.data.json) {
          this.items.push({ submission_id: item.sid, score: item.score, nickname: item.nickname, username: item.email,
            status: item.status, uid: item.uid, name: item.realname, lang: item.lang });
        }
        this.isLoading = false;
      }, e => {
        this.$refs.modal_msg_box.show('载入信息失败', httpCodeToStr(e.response.status));
      });
    },
    uidToStr: function (uid) {
      return uidToStr(uid);
    },
    getStatusText: function (status) {
      return status2text(status);
    },
    getStatusVariant: function (status) {
      return status2variant(status);
    },
    downloadStatisticsJson: function () {
      const blob = new Blob([JSON.stringify(this.statisticsJSON)], {type: 'application/text'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `statistics-${this.$route.params.id}.json`;
      link.click();
    },
    downloadStatisticsCsv: function () {
      const blob = new Blob([this.statisticsCSV], {type: 'application/text'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `statistics-${this.$route.params.id}.csv`;
      link.click();
    },
    downloadSourceCode: function () {
      axios.get(`/api/admin/problem/id/${this.$route.params.id}/statistics/code`, {responseType: 'arraybuffer'})
        .then(response => {
          const blob = new Blob([response.data], {type: 'application/zip'});
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `source-code-${this.$route.params.id}.zip`;
          link.click();
        });
    }
  },
  mounted() {
    this.loadSelectedItem();
  }
}
</script>

<style scoped>

</style>
