<template>
  <b-card no-body header="我听的课">
    <b-overlay :show="loading" rounded="sm">
      <b-list-group flush>
        <b-list-group-item v-bind:href="'/course/' + course.id" class="d-flex justify-content-between align-items-center pt-4 pb-4"
                           v-for="course in courses" v-bind:key="course.id">
          {{course.name}}
        </b-list-group-item>
      </b-list-group>

      <b-card-body v-if="loading">
        正在加载
      </b-card-body>
      <b-card-body v-else-if="statusCode !== 200">
        [{{statusCode}}] 网络请求出错，内容获取失败。
      </b-card-body>
      <b-card-body v-else-if="courses.length === 0">
        暂无修读的课程。若未找到您修读的课程，请联系授课教师。
      </b-card-body>
    </b-overlay>
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
  mounted () {
    this.$http.get(`${window.backendOrigin}/api/courses`).then(res => {
      this.courses = res.data.courses
      this.loading = false
    }, e => {
      console.log(e)
      this.success = false
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
