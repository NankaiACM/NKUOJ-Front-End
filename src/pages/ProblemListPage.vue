<template>
<div class="container">
  <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
    <IconJournalCode class="text-purple me-2"/>
    <span class="text-purple page-title">公开题库</span>
  </div>
  <p class="text-purple ms-3">
    您可以在此挑选题目练习。此处题目不会计入课程成绩。
  </p>
  <div class="list-group" v-if="loading">
    <div class="list-group-item list-group-item-action placeholder-glow" v-for="i in 20" :key="i">
      <h5 class="mb-1 placeholder col-4"></h5><br>
      <span><small class="placeholder col-3"></small></span>
    </div>
  </div>
  <div class="list-group" v-else>
    <router-link :to="{path:'/problem/' + problem.pid}" class="list-group-item list-group-item-action"
                 v-for="problem in problemList" v-bind:key="problem.pid">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1"> {{ problem.name }}</h5>
        <small>{{ problem.pid }}</small>
      </div>
      <small v-if="problem.status === 0"> 未提交 </small>
      <small v-else-if="problem.status === 1" class="text-warning"> 未通过 </small>
      <small v-else class="text-success"> 已通过 </small>
    </router-link>
  </div>

  <div class="d-flex justify-content-center">
    <Pagination v-model="currentPage" :per-page="20" :total-rows="totalRows" v-if="totalRows > 20"
                class="m-4" @update:modelValue="loadDataOfPage"></Pagination>
  </div>
</div>
</template>
<script>
import axios from "axios";
import Pagination from "@/components/wrapper/Pagination.vue";
import IconJournalCode from "@/components/icons/IconJournalCode.vue";
import router from "@/router";

export default {
  name: 'ProblemListPage',
  components: {IconJournalCode, Pagination},
  data: function () {
    return {
      problemList: [],
      totalRows: 0,
      loading: true,
    }
  },
  mounted() {
    this.loadProblemsTotalData()
    this.loadDataOfPage(this.currentPage)
  },
  computed: {
    currentPage: {
      get: function () {
        return this.$route.query.page || 1;
      },
      set(newPage) {
        router.replace({query: {...this.$route.query, page: newPage}}).catch(() => {
        });
      }
    }
  },
  methods: {
    loadProblemsTotalData: function () {
      axios.get(`/api/problems/global/total`).then(res => {
          this.totalRows = res.data;
        });
    },
    loadDataOfPage: function (pageNumber) {
      this.loading = true;
      this.currentPage = pageNumber;
      axios.get(`/api/problems/global?page=${pageNumber}&item=20`).then(res => {
          this.problemList = res.data;
          this.loading = false;
      });
    }
  }
}
</script>
<style scoped>
.pagination-wrapper {
  margin: 40px;
}

</style>
