<template>
  <b-modal ref="modal" title="提交记录" centered ok-only ok-title="关闭">
    <div class="container" v-if="submissions.length > 0">
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center" button @click="selectItem(item.sid)"
                           v-for="item in submissions" :key="item.sid">
          <span :class="`text-${getStatusVariant(item.statusId)}`">{{getStatusText(item.statusId)}}</span>
          <span class="text-muted">#{{item.sid}}</span>
        </b-list-group-item>
      </b-list-group>
      <b-pagination v-model="currentPage" :total-rows="itemsCount" :per-page="perPage" v-if="itemsCount > perPage"
                    @change="updateItemsInPage" align="center" class="m-4" first-number last-number></b-pagination>
    </div>
    <div class="container" v-else>
      <h5 class="text-muted text-center">没有相关提交记录</h5>
    </div>
  </b-modal>
</template>

<script>
import status2text from "@/code/status-text";
import status2variant from "@/code/status-variant";

export default {
  name: "status-list-modal",
  props: {
    pid: Number,
    uid: Number
  },
  data: function () {
    return {
      submissions: [],
      currentPage: 1,
      perPage: 8,
      itemsCount: 0,
    }
  },
  methods: {
    show: function () {
      this.loadItemsData()
      this.updateItemsInPage(this.currentPage)
      this.$refs['modal'].show()
    },
    loadItemsData: function () {
      this.$http.get(`${window.backendOrigin}/api/solutions/total?pid=${this.pid}&uid=${this.uid}`).then(res => {
        this.itemsCount = res.data
      })
    },
    updateItemsInPage: function (pageNumber) {
      this.currentPage = pageNumber
      this.$http.get(`${window.backendOrigin}/api/solutions?pid=${this.pid}&uid=${this.uid}&page=${pageNumber}&item=${this.perPage}`)
        .then(res => {
          this.submissions = res.data
        })
    },
    selectItem: function (item) {
      this.$refs['modal'].hide()
      this.$router.push(`/submission/${item}`)
    },
    getStatusText: function (status) {
      return status2text(status)
    },
    getStatusVariant: function (status) {
      return status2variant(status)
    },
  }
}
</script>

<style scoped>

</style>
