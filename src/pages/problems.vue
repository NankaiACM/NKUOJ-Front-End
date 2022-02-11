<template>
  <div id="problem">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4">公开题库</h1>
          <p class="lead">这里收录了一些练习题，您可以在此挑选题目练习。</p>
        </div>
      </div>
      <div class="container">
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

        <div class="container d-flex justify-content-center p-5">
          <b-pagination
            v-model="currentPage"
            :per-page="20"
            :total-rows="totalRows"
            first-text="<<"
            prev-text="<"
            next-text=">"
            last-text=">>"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'problems-page',
  components: {
  },
  data: function () {
    return {
      problemList: [],
      totalRows: 0,
      currentPage: 1
    }
  },
  mounted: function () {
    this.loadProblemsData()
  },
  methods: {
    loadProblemsData: function () {
      this.$http.get(`${window.backendOrigin}/api/problems/global/total`)
        .then(res => {
          this.totalRows = res.data
        })
      this.loadDataOfPage(this.currentPage)
    },
    loadDataOfPage: function (pageNumber) {
      this.$http.get(`${window.backendOrigin}/api/problems/global?page=${pageNumber}&item=20`)
        .then(res => {
          this.problemList = res.data
        })
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    currentPage: function (current, _) {
      this.loadDataOfPage(current)
    }
  }
}
</script>
<style lang="less" scoped>
.pagination-wrapper {
  margin: 40px;
}
</style>
