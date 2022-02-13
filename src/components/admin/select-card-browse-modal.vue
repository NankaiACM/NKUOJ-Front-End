<template>
  <b-modal ref="modal" title="浏览项目" centered ok-only ok-title="取消">
    <div class="container" v-if="itemsList.length > 0">
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center" button @click="selectItem(item.id)"
                           v-for="item in itemsList.slice((currentPage - 1) * perPage, currentPage * perPage)"
                           :key="item.id">
          {{item.name}}
          <span class="text-muted">#{{item.id}}</span>
        </b-list-group-item>
      </b-list-group>
      <div class="container-fluid d-flex justify-content-center mt-4">
        <b-pagination v-model="currentPage" :total-rows="itemsList.length" :per-page="perPage"></b-pagination>
      </div>
    </div>
    <div class="container" v-else>
      <h5 class="text-muted text-center" v-if="newable">没有内容可供选择，请新建。</h5>
      <h5 class="text-muted text-center" v-else>没有内容可供选择。</h5>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "select-card-browse-modal",
  props: {
    newable: Boolean,
    api: String
  },
  data: function () {
    return {
      currentPage: 1,
      perPage: 8,
      itemsCount: 0,
      itemsList: [],
      loading: true
    }
  },
  methods: {
    show: function () {
      this.$refs['modal'].show()
    },
    loadItemsData: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/${this.api}/total`).then(res => {
        this.itemsCount = res.data
        this.loading = false
      })
    },
    updateItemsInPage: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/${this.api}?page=${this.currentPage}&item=${this.perPage}`)
        .then(res => {
        this.itemsList = res.data
        this.loading = false
      })
    },
    selectItem: function (item) {
      this.$refs['modal'].hide()
      this.$emit('select', item)
    }
  },
  mounted() {
    this.loadItemsData()
    this.updateItemsInPage()
  },
  watch: {
    currentPage: {
      handler() {
        this.updateItemsInPage()
      }
    }
  }
}
</script>

<style scoped>

</style>
