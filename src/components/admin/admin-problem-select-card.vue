<template>
  <b-card>
    <div class="container-fluid d-flex justify-content-center mt-4 mb-4" >
      <div class="text-center">
        <h3 v-if="!selected">未选择项目</h3>
        <h3 v-else>正在编辑 #{{selectedItemId}}</h3>

        <b-button-group class="mt-3">
          <b-button variant="outline-primary" @click="showSelectModal">选择</b-button>
          <b-button variant="outline-success" @click="showBrowseModal">浏览</b-button>
          <b-button variant="outline-info" @click="showCreateModal" v-if="newable">新建</b-button>
        </b-button-group>
      </div>
    </div>

    <!-- Select Modal -->
    <select-card-select-modal ref="select-modal" :api="api" @select="selectItem"></select-card-select-modal>

    <!-- Browse Modal -->
    <select-card-browse-modal ref="browse-modal" :newable="newable" :api="api" @select="selectItem"></select-card-browse-modal>

    <!-- Create Modal -->
    <problem-select-card-create-modal ref="create-modal" @select="selectItem" :api="api" :create-dummy="createDummy"></problem-select-card-create-modal>
  </b-card>
</template>

<script>
import SelectCardBrowseModal from "@/components/admin/select-card-browse-modal";
import SelectCardSelectModal from "@/components/admin/select-card-select-modal";
import ProblemSelectCardCreateModal from "@/components/admin/problem-select-card-create-modal";

export default {
  name: 'admin-problem-select-card',
  components: {ProblemSelectCardCreateModal, SelectCardSelectModal, SelectCardBrowseModal},
  props: {
    api: String,
    newable: Boolean,
    createDummy: Object
  },
  data: function () {
    return {
      selected: false,
      selectedItemId: '',
    }
  },
  methods: {
    showBrowseModal: function () {
      this.$refs['browse-modal'].show()
    },
    showSelectModal: function () {
      this.$refs['select-modal'].show()
    },
    showCreateModal: function () {
      this.$refs['create-modal'].show()
    },
    selectItem: function (item) {
      this.selected = true
      this.selectedItemId = item
      this.$emit('select', item)
    }
  },
}
</script>

<style scoped>

</style>
