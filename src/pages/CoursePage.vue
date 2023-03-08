<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <span class="text-purple page-title">{{ courseData.name }}</span>
    </div>
    <p class="text-purple ms-3">
      课程 | #{{ this.$route.params.id }}
    </p>
    <div class="row">
      <div class="col-md-8 col-12 order-last order-md-first">
        <div class="card card-activities-min-height rounded-4 bg-light border-0 p-4 mb-2">
          <h5 class="d-inline-flex align-items-center mb-3">
            <IconEasel/>
            <span class="ms-2 me-1">课程活动</span>
            <IconChevronDoubleRightSmall/>
          </h5>
          <div v-if="isLoading">
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
              <span class="placeholder col-6 me-2"></span>
              <span class="placeholder col-8 me-2"></span>
              <span class="placeholder col-5 me-2"></span>
              <span class="placeholder col-12 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
            </p>
          </div>
          <h6 v-else-if="this.activities.length === 0" class="text-center m-3">
            本课程暂无任何活动（包括公告、作业、考试等）。请等待教师发布。
          </h6>
          <div v-for="activity in activities" :key="activity.object.id" class="mb-2" v-else>
            <div class="card rounded-3 p-3 border-0 flex-column align-items-start" v-if="activity.type === 0">
              <h5 class="mb-1"><span class="badge bg-warning text-light me-2">公告</span>{{activity.object.title}}</h5>
              <p class="mb-1 text-muted">
                {{getLocaleDate(activity.object.time)}} 发布
              </p>
              <pre class="mb-1">{{activity.object.content}}</pre>
            </div>
            <div class="card rounded-3 p-3 border-0 flex-column align-items-start" v-else-if="activity.type === 1">
              <h5 class="mb-1"><span class="badge bg-info text-light me-2">作业</span>{{activity.object.name}}</h5>
              <p class="mb-1 text-muted">
                {{getLocaleDate(activity.object.begin)}} 发布，{{getLocaleDate(activity.object.end)}} 截止
              </p>
              <a class="text-decoration-none text-muted stretched-link pe-auto" :href="'/assignment/' + activity.object.id">查看作业</a>
            </div>
            <div class="card rounded-3 p-3 border-0 flex-column align-items-start" v-else-if="activity.type === 2">
              <h5 class="mb-1"><span class="badge bg-danger text-light me-2">考试</span>{{activity.object.name}}</h5>
              <p class="mb-1 text-muted">
                {{getLocaleDate(activity.object.begin)}} 发布，{{getLocaleDate(activity.object.end)}} 截止
              </p>
              <a class="text-decoration-none text-muted stretched-link pe-auto" :href="'/exam/' + activity.object.id">查看考试</a>
            </div>
            <div class="card rounded-3 p-3 border-0 flex-column align-items-start" v-else-if="activity.type === 3">
              <h5 class="mb-1"><span class="badge bg-primary text-light me-2">竞赛</span>{{activity.object.name}}</h5>
              <p class="mb-1 text-muted">
                {{getLocaleDate(activity.object.begin)}} 发布，{{getLocaleDate(activity.object.end)}} 截止
              </p>
              <a class="text-decoration-none text-muted stretched-link pe-auto" :href="'/contest/' + activity.object.id">查看竞赛</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-12 order-first order-md-last">
        <div class="card rounded-4 bg-light border-0 p-4 mb-2">
          <h5 class="d-inline-flex align-items-center mb-3">
            <IconListColumnsReverse/>
            <span class="ms-2 me-1">课程信息</span>
            <IconChevronDoubleRightSmall/>
          </h5>
          <p><span class="h6" v-if="courseData.teachers">讲授方：</span>{{ courseData.teachers }}</p>
          <p v-if="courseData.description"><span class="h6">介绍：</span>{{ courseData.description }}</p>
          <p v-if="courseData.semester"><span class="h6">学期：</span>{{ courseData.semester }}</p>
          <p v-if="courseData.number"><span class="h6">课程号：</span>{{ courseData.number }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateToStr from "@/util/date-to-str";
import axios from "axios";
import IconListColumnsReverse from "@/components/icons/IconListColumnsReverse.vue";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconEasel from "@/components/icons/IconEasel.vue";

export default {
  name: "CoursePage",
  components: {IconEasel, IconChevronDoubleRightSmall, IconListColumnsReverse},
  data: function () {
    return {
      isLoading: true,
      completedTasks: 0,
      courseData: {},
      activities: [],
      announcements: [],
      assignments: [],
      exams: [],
      contests: [],
    }
  },
  methods: {
    loadCourseData: function () {
      axios.get(`/api/courses/id/${this.$route.params.id}`).then(res => {
        this.courseData = res.data;
        this.isLoading = false;
      });
      axios.get(`/api/announcement/course/${this.$route.params.id}`).then(res => {
        this.announcements = res.data;
        this.completedTasks += 1;
        this.updateActivities();
      });
      axios.get(`/api/assignment/course/${this.$route.params.id}`).then(res => {
        this.assignments = res.data;
        this.completedTasks += 1;
        this.updateActivities();
      });
      axios.get(`/api/exam/course/${this.$route.params.id}`).then(res => {
        this.exams = res.data;
        this.completedTasks += 1;
        this.updateActivities();
      });
      axios.get(`/api/contest/course/${this.$route.params.id}`).then(res => {
        this.contests = res.data;
        this.completedTasks += 1;
        this.updateActivities();
      });
    },
    updateActivities: function () {
      if (this.completedTasks === 4) {
        this.activities = [];
        this.announcements.forEach((obj) => {
          this.activities.push({type: 0, object: obj, time: obj.time});
        });
        this.assignments.forEach((obj) => {
          this.activities.push({type: 1, object: obj, time: obj.begin});
        });
        this.exams.forEach((obj) => {
          this.activities.push({type: 2, object: obj, time: obj.begin});
        });
        this.contests.forEach((obj) => {
          this.activities.push({type: 3, object: obj, time: obj.begin});
        });
        this.activities.sort((a, b) => (a.time < b.time) ? 1 : -1);
      }
    },
    getLocaleDate: function (string) {
      return dateToStr(string);
    }
  },
  mounted() {
    this.loadCourseData();
  }
}
</script>

<style scoped>
.card-activities-min-height {
  min-height: 20rem;
}
pre {
  white-space: pre-wrap;
  word-break: keep-all;
}
</style>
