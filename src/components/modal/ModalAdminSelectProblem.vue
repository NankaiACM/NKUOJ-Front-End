<template>
  <ModalBase v-model="internalShow" title="选择题目"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="取消"
             @ok="dismiss()" @close="dismiss()" @cancel="dismiss()">
    <div class="container" v-if="itemsList.length > 0">
      <div class="list-group">
        <a class="list-group-item-action list-group-item d-flex justify-content-between align-items-center cursor-pointer"
                     @click="selectItem(item.id)" v-for="item in itemsList" :key="item.id">
          {{ item.name }}
          <span class="text-muted">#{{ item.id }}</span>
        </a>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <Pagination v-model="currentPage" :total-rows="itemsCount" :per-page="perPage" v-if="itemsCount > perPage"
                    @update:modelValue="updateItemsInPage"></Pagination>
      </div>
    </div>
    <div class="container" v-else>
      <h5 class="text-muted text-center">没有内容可供选择。</h5>
    </div>
  </ModalBase>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";
import axios from "axios";
import Pagination from "@/components/wrapper/Pagination.vue";

export default {
  name: "ModalAdminSelectProblem",
  components: {Pagination, ModalBase},
  data: function () {
    return {
      internalShow: false,
      id: null,
      currentPage: 1,
      perPage: 8,
      itemsCount: 0,
      itemsList: [],
    }
  },
  methods: {
    dismiss: function () {
      this.internalShow = false;
    },
    show: function () {
      this.internalShow = true;
    },
    loadItemsData: function () {
      axios.get(`/api/admin/problem/total`).then(res => {
        this.itemsCount = res.data;
      });
    },
    updateItemsInPage: function (pageNumber) {
      this.currentPage = pageNumber
      axios.get(`/api/admin/problem?page=${pageNumber}&item=${this.perPage}`)
        .then(res => {
          this.itemsList = res.data;
        });
    },
    selectItem: function (item) {
      this.internalShow = false;
      this.$emit('then', item);
    }
  },
  mounted() {
    this.loadItemsData();
    this.updateItemsInPage(this.currentPage);
  }
}
</script>

<style scoped>

</style>
