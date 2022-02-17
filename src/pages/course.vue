<template>
  <div class="container">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="jumbotron text-center">
        <h1 class="display-4">{{courseData.name}}</h1>
        <p class="lead">{{courseData.teachers}} 讲授</p>
        <p>[{{courseData.number}}] {{courseData.semester}}</p>
        <hr class="my-4" v-if="courseData.description !== ''">
        <p v-if="courseData.description !== ''">{{courseData.description}}</p>
      </div>
    </b-overlay>

    <b-overlay :show="completedTasks < 2" rounded="sm">
      <b-card no-body>
        <b-tabs content-class="mt-3" fill card>
          <b-tab title="公告">
            <b-card :title="announcement.title" :sub-title="getLocaleDate(announcement.time) + '发布'" class="mt-3" v-for="announcement in announcements" :key="announcement.id">
              <b-card-text>
                {{announcement.content}}
              </b-card-text>
            </b-card>
          </b-tab>

          <b-tab title="作业">
            <b-card :title="assignment.name" :sub-title="'截止时间 ' + getLocaleDate(assignment.end)" class="mt-3" v-for="assignment in assignments" :key="assignment.id">
              <a :href="'/assignment/' + assignment.id" class="card-link">
                <b-card-text class="text-muted">
                  点击查看
                </b-card-text>
              </a>
            </b-card>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import date2Text from "@/util/date";

export default {
  name: 'course',
  data: function () {
    return {
      isLoading: true,
      completedTasks: 0,
      courseData: {},
      announcements: [],
      assignments: []
    }
  },
  methods: {
    loadCourseData: function () {
      this.$http.get(`${window.backendOrigin}/api/courses/id/${this.$route.params.courseId}`).then(res => {
        this.courseData = res.data
        this.isLoading = false
      }, e => {
        console.log(e)
      })
      this.$http.get(`${window.backendOrigin}/api/announcement/course/${this.$route.params.courseId}`).then(res => {
        this.announcements = res.data
        this.completedTasks += 1
      }, e => {
        console.log(e)
      })
      this.$http.get(`${window.backendOrigin}/api/assignment?cid=${this.$route.params.courseId}`).then(res => {
        this.assignments = res.data
        this.completedTasks += 1
      }, e => {
        console.log(e)
      })
    },
    getLocaleDate: function (string) {
      return date2Text(string)
    }
  },
  mounted () {
    this.loadCourseData()
  }
}
</script>

<style scoped>

</style>
