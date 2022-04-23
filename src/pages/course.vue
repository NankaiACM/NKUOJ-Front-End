<template>
  <div class="container">
    <b-overlay :show="isLoading" rounded="sm">
      <div class="jumbotron text-center">
        <h1 class="display-4">{{ courseData.name }}</h1>
        <h4><span class="badge bg-success text-light">课程</span></h4>
      </div>
    </b-overlay>

    <b-card title="课程详情" class="mb-3">
      <b-skeleton-wrapper :loading="isLoading">
        <template #loading>
          <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                      v-for="i in Array(5).keys()" :key="i"></b-skeleton>
        </template>
        <p>
          <span class="h6" v-if="courseData.teachers">讲授方：</span>
          {{ courseData.teachers }}
        </p>
        <p v-if="courseData.description">
          <span class="h6">介绍：</span>
          {{ courseData.description }}
        </p>
        <p v-if="courseData.semester">
          <span class="h6">学期：</span>
          {{ courseData.semester }}
        </p>
        <p v-if="courseData.number">
          <span class="h6">课程号：</span>
          {{ courseData.number }}
        </p>
      </b-skeleton-wrapper>
    </b-card>

    <b-card title="课程活动" class="mb-3">
      <b-skeleton-wrapper :loading="completedTasks < 2">
        <template #loading>
          <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                      v-for="i in Array(21).keys()" :key="i"></b-skeleton>
        </template>

      </b-skeleton-wrapper>

        <p v-if="this.activities.length === 0" class="pt-2 pl-2">
          暂无任何活动
        </p>

        <div v-for="activity in activities" :key="activity.object.id" class="mb-2">
          <b-card class="flex-column align-items-start" v-if="activity.type === 0">
            <h5 class="mb-1"><span class="badge bg-warning text-light mr-2">公告</span>{{activity.object.title}}</h5>
            <p class="mb-1 text-muted">
              {{getLocaleDate(activity.object.time)}} 发布
            </p>
            <pre class="mb-1">{{activity.object.content}}</pre>
          </b-card>
          <b-card class="flex-column align-items-start" v-else-if="activity.type === 1">
            <h5 class="mb-1"><span class="badge bg-info text-light mr-2">作业</span>{{activity.object.name}}</h5>
            <p class="mb-1 text-muted">
              {{getLocaleDate(activity.object.begin)}} 发布，{{getLocaleDate(activity.object.end)}} 截止
            </p>
            <b-link class="text-decoration-none text-muted stretched-link" @click="$router.push('/assignment/' + activity.object.id)">查看作业</b-link>
          </b-card>
          <b-card class="flex-column align-items-start" v-else-if="activity.type === 2">
            <h5 class="mb-1"><span class="badge bg-danger text-light mr-2">考试</span>{{activity.object.name}}</h5>
            <p class="mb-1 text-muted">
              {{getLocaleDate(activity.object.begin)}} 发布，{{getLocaleDate(activity.object.end)}} 截止
            </p>
            <b-link class="text-decoration-none text-muted stretched-link" @click="$router.push('/exam/' + activity.object.id)">查看考试</b-link>
          </b-card>
          <b-card class="flex-column align-items-start" v-else-if="activity.type === 3">
            <h5 class="mb-1"><span class="badge bg-primary text-light mr-2">竞赛</span>{{activity.object.name}}</h5>
            <p class="mb-1 text-muted">
              {{getLocaleDate(activity.object.begin)}} 发布，{{getLocaleDate(activity.object.end)}} 截止
            </p>
            <b-link class="text-decoration-none text-muted stretched-link" @click="$router.push('/contest/' + activity.object.id)">查看竞赛</b-link>
          </b-card>
        </div>
    </b-card>
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
      activities: [],
      announcements: [],
      assignments: [],
      exams: [],
      contests: []
    }
  },
  methods: {
    loadCourseData: function () {
      this.$http.get(`${window.backendOrigin}/api/courses/id/${this.$route.params.courseId}`).then(res => {
        this.courseData = res.data
        this.isLoading = false
      })
      this.$http.get(`${window.backendOrigin}/api/announcement/course/${this.$route.params.courseId}`).then(res => {
        this.announcements = res.data
        this.completedTasks += 1
        this.updateActivities()
      })
      this.$http.get(`${window.backendOrigin}/api/assignment/course/${this.$route.params.courseId}`).then(res => {
        this.assignments = res.data
        this.completedTasks += 1
        this.updateActivities()
      })
      this.$http.get(`${window.backendOrigin}/api/exam/course/${this.$route.params.courseId}`).then(res => {
        this.exams = res.data
        this.completedTasks += 1
        this.updateActivities()
      })
      this.$http.get(`${window.backendOrigin}/api/contest/course/${this.$route.params.courseId}`).then(res => {
        this.contests = res.data
        this.completedTasks += 1
        this.updateActivities()
      })
    },
    updateActivities: function () {
      if (this.completedTasks === 4) {
        this.activities = []
        this.announcements.forEach((obj) => {
          this.activities.push({type: 0, object: obj, time: obj.time})
        })
        this.assignments.forEach((obj) => {
          this.activities.push({type: 1, object: obj, time: obj.begin})
        })
        this.exams.forEach((obj) => {
          this.activities.push({type: 2, object: obj, time: obj.begin})
        })
        this.contests.forEach((obj) => {
          this.activities.push({type: 3, object: obj, time: obj.begin})
        })
        this.activities.sort((a, b) => (a.time < b.time) ? 1 : -1)
      }
    },
    getLocaleDate: function (string) {
      return date2Text(string)
    }
  },
  mounted() {
    this.loadCourseData()
  }
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: keep-all;
}
</style>
