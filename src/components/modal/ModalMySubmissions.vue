<template>
  <ModalBase v-model="internalShow" title="我的提交记录"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="关闭"
             :cancel-button="false"
             @ok="dismiss()">
    <div class="container" v-if="submissions.length > 0">
      <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" @click="selectItem(item.sid)" v-for="item in submissions" :key="item.sid">
          <span :class="`text-${getStatusVariant(item.statusId)}`">{{getStatusText(item.statusId)}}</span>
          <span class="text-muted">#{{item.sid}}</span>
        </button>
      </div>
      <div v-if="itemsCount > perPage" class="d-flex justify-content-center mt-4">
        <Pagination v-model="currentPage" :total-rows="itemsCount" :per-page="perPage"
                    @update:modelValue="updateItemsInPage"></Pagination>
      </div>
    </div>
    <div class="container" v-else>
      <h5 class="text-muted text-center">没有相关提交记录</h5>
    </div>
  </ModalBase>
</template>

<script>
import axios from "axios";
import statusCodeToStr from "@/util/status-code-to-str";
import statusCodeToVariantStr from "@/util/status-code-to-variant-str";
import ModalBase from "@/components/modal/ModalBase.vue";
import Pagination from "@/components/wrapper/Pagination.vue";
import router from "@/router";

export default {
  name: "ModalMySubmissions",
  components: {Pagination, ModalBase},
  props: {
    pid: Number,
    uid: Number,
  },
  data: function () {
    return {
      submissions: [],
      currentPage: 1,
      perPage: 8,
      itemsCount: 0,
      internalShow: false,
    }
  },
  methods: {
    show: function () {
      this.loadItemsData();
      this.updateItemsInPage();
      this.currentPage = 1;
      this.internalShow = true;
    },
    loadItemsData: function () {
      axios.get(`/api/solutions/total?pid=${this.pid}&uid=${this.uid}`).then(res => {
        this.itemsCount = res.data
      });
    },
    updateItemsInPage: function () {
      axios.get(`/api/solutions?pid=${this.pid}&uid=${this.uid}&page=${this.currentPage}&item=${this.perPage}`).then(res => {
        this.submissions = res.data;
      });
    },
    selectItem: function (item) {
      this.dismiss();
      router.push(`/submission/${item}`)
    },
    getStatusText: function (status) {
      return statusCodeToStr(status)
    },
    getStatusVariant: function (status) {
      return statusCodeToVariantStr(status)
    },
    dismiss: function () {
      this.internalShow = false;
    }
  }
}
</script>

<style scoped>

</style>
