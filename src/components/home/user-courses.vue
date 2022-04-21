<template>
  <b-card no-body>
    <template #header>
      <h6 class="m-1">
        <b-icon icon="journals" class="mr-2"></b-icon>
        我听的课
      </h6>
    </template>

    <b-list-group flush v-if="courses && courses.length > 0">
      <b-list-group-item v-bind:href="'/course/' + course.id"
                         class="d-flex justify-content-between align-items-center pt-4 pb-4"
                         v-for="course in courses" v-bind:key="course.id">
        {{ course.name }}
      </b-list-group-item>
    </b-list-group>

    <b-card-body v-if="loading">
      <b-skeleton width="85%"></b-skeleton>
      <b-skeleton width="55%"></b-skeleton>
    </b-card-body>
    <b-card-body v-else-if="statusCode !== 200">
      [{{ statusCode }}] 网络请求出错，内容获取失败。
    </b-card-body>
    <b-card-body v-else-if="courses.length === 0">
      暂无修读的课程。
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'user-courses',
  data: function () {
    return {
      courses: [],
      statusCode: 200,
      loading: true
    }
  },
  mounted() {
    this.$http.get(`${window.backendOrigin}/api/courses`).then(res => {
      this.courses = res.data
      this.loading = false
    }, e => {
      console.log(e)
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
