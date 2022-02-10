<template>
  <b-overlay :show="isLoading" rounded="sm">
    <b-card>
      <div class="container-fluid d-flex justify-content-center mt-4 mb-4" v-if="!selected">
        <div class="text-center">
          <h3>未选择项目</h3>
          <b-button-group class="mt-3">
            <b-button variant="outline-success" @click="showSelectModal">选择项目</b-button>
            <b-button variant="outline-info" @click="generateNewItem" v-if="newable">新建项目</b-button>
          </b-button-group>
        </div>
      </div>
      <div class="container-fluid d-flex justify-content-center mt-4 mb-4" v-else>
        <div class="text-center">
          <h3>正在编辑：{{selectedItemName}} #{{selectedItemId}}</h3>
          <b-button-group class="mt-3">
            <b-button variant="outline-success" @click="showSelectModal">重新选择项目</b-button>
            <b-button variant="outline-info" @click="generateNewItem" v-if="newable">新建项目</b-button>
          </b-button-group>
        </div>
      </div>
      <!-- Select Modal -->
      <b-modal id="select-modal" title="选择项目" centered ok-only ok-title="取消">
        <div class="container" v-if="itemsList.length > 0">
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between align-items-center" button @click="selectItem(item)" v-for="item in itemsList.slice((currentPage - 1) * perPage, currentPage * perPage)" :key="item.id">
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
    </b-card>
  </b-overlay>
</template>

<script>
export default {
  name: 'admin-item-select-card',
  props: {
    api: String,
    value: Number,
    newable: Boolean
  },
  data: function () {
    return {
      isLoading: true,
      selected: false,
      currentPage: 1,
      perPage: 8,
      itemsList: [],
      selectedItemName: '',
      selectedItemId: ''
    }
  },
  methods: {
    showSelectModal: function () {
      this.$bvModal.show('select-modal')
    },
    generateNewItem: function () {
      this.$http.post(`${window.backendOrigin}/api/admin/${this.api}/new`).then(res => {
        this.selected = true
        this.selectedItemId = res.data.id
        this.selectedItemName = res.data.name
        this.$emit('select', this.selectedItemId)
        this.$bvModal.msgBoxOk('新建成功', {title: '提示'})
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('新建失败', {title: '提示'})
      })
    },
    loadSelectableItemsCount: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/${this.api}`).then(res => {
        this.itemsList = res.data.items
        this.isLoading = false
      })
    },
    selectItem: function (item) {
      this.$bvModal.hide('select-modal')
      this.selected = true
      this.selectedItemId = item.id
      this.selectedItemName = item.name
      this.$emit('select', this.selectedItemId)
    }
  },
  mounted () {
    this.loadSelectableItemsCount()
  }
}
</script>

<style scoped>

</style>
