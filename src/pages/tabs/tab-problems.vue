<template>
  <div id="tab-problems">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4"><b-icon icon="collection" class="mr-1"></b-icon>公开题库</h1>
          <p class="lead">您可以在此挑选题目练习。此处题目不会计入课程成绩。</p>
        </div>
      </div>
      <div class="container">
        <b-pagination v-model="currentPage" :per-page="20" :total-rows="totalRows" v-if="totalRows > 20"
                      align="center" class="m-4" first-number last-number @change="loadDataOfPage"></b-pagination>

        <div class="list-group">
          <router-link :to="{path:'/problem/' + problem.pid}" class="list-group-item list-group-item-action" v-for="problem in problemList" v-bind:key="problem.pid">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> {{problem.name}}</h5>
              <small>{{problem.pid}}</small>
            </div>
            <small v-if="problem.status === 0"> 未提交 </small>
            <small v-else-if="problem.status === 1" class="text-warning"> 未通过 </small>
            <small v-else class="text-success"> 已通过 </small>
          </router-link>
        </div>

        <b-pagination v-model="currentPage" :per-page="20" :total-rows="totalRows" v-if="totalRows > 20"
                      align="center" class="m-4" first-number last-number @change="loadDataOfPage"></b-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tab-problems',
  components: {
  },
  data: function () {
    return {
      problemList: [],
      totalRows: 0,
    }
  },
  mounted: function () {
    this.loadProblemsTotalData()
    this.loadDataOfPage(this.currentPage)
  },
  computed: {
    currentPage: {
      get: function () {
        return this.$route.query.page || 1;
      },
      set(newPage) {
        this.$router
          .replace({query: {...this.$route.query, page: newPage}}).catch(() => {});
      }
    }
  },
  methods: {
    loadProblemsTotalData: function () {
      this.$http.get(`${window.backendOrigin}/api/problems/global/total`)
        .then(res => {
          this.totalRows = res.data
        })
    },
    loadDataOfPage: function (pageNumber) {
      this.currentPage = pageNumber
      this.$http.get(`${window.backendOrigin}/api/problems/global?page=${pageNumber}&item=20`)
        .then(res => {
          this.problemList = res.data
        })
    }
  }
}
</script>
<style lang="less" scoped>
.pagination-wrapper {
  margin: 40px;
}
</style>
