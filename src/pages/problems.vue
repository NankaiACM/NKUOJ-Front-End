<template>
  <div id="problem">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4">公开题库</h1>
          <p class="lead">这里收录了来自各方面公开的题目。您可以在此挑选题目练习。</p>
          <p class="lead">请注意：在此处完成的作业不会计入课程，请前往作业页面提交答案。</p>
        </div>
      </div>
      <div class="container">
        <div class="list-group">
          <router-link :to="{path:'/problem/'+problem.id}" class="list-group-item list-group-item-action" v-for="problem in problemList" v-bind:key="problem.id">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> {{problem.title}}</h5>
              <small>{{problem.id}}</small>
            </div>
            <small> {{problem.acceptedCount}} / {{problem.submittedCount}}</small>
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
      this.$http.get(`${window.backendOrigin}/api/problems`)
        .then(res => {
          this.totalRows = res.data.rows
        })

      this.loadDataOfPage(this.currentPage)
    },
    loadDataOfPage: function (pageNumber) {
      this.$http.get(`${window.backendOrigin}/api/problems/page/${pageNumber}`)
        .then(res => {
          this.problemList = res.data.problems
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
