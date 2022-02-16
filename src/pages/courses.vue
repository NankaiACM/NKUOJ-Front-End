<template>
  <div id="problem">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4">课程</h1>
          <p class="lead">查看和加入课程。</p>
        </div>
      </div>
      <div class="container">
        <div class="list-group">
          <router-link :to="{path:'/problem/' + course.id}" class="list-group-item list-group-item-action"
                       v-for="course in coursesList" v-bind:key="course.id">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> {{course.name}}</h5>
            </div>
            <small v-if="course.status === 0"> 公开 </small>
            <small v-else class="text-info"> 需要验证加入 </small>
          </router-link>
        </div>

        <b-pagination v-model="currentPage" :per-page="20" :total-rows="totalRows" v-if="totalRows > 20"
                      @change="loadDataOfPage" align="center" class="m-4" first-number last-number>
        </b-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'courses',
  components: {
  },
  data: function () {
    return {
      coursesList: [],
      totalRows: 0,
      currentPage: 1
    }
  },
  mounted: function () {
    this.loadCoursesData()
    this.loadDataOfPage(this.currentPage)
  },
  methods: {
    loadCoursesData: function () {
      this.$http.get(`${window.backendOrigin}/api/problems/global/total`)
        .then(res => {
          this.totalRows = res.data
        })
    },
    loadDataOfPage: function (pageNumber) {
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
