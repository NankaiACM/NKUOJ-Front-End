<template>
  <div>
    <h5 class="ms-3 d-inline-flex align-items-center justify-content-between">
      <IconEasel/>
      <span class="ms-2 me-1">我的课程</span>
      <IconChevronDoubleRight/>
    </h5>
    <div class="d-flex flex-wrap course-container">
      <a
        class="card clickable-course-card bg-light border-0 m-2 rounded-4 text-dark text-decoration-none h5 text-wrap text-center"
        href="#" v-if="loading">
      <span class="d-inline-flex justify-content-center align-items-center h-100 w-100">
        <span class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></span>
      </span>
      </a>
      <a
        class="card clickable-course-card bg-light border-0 m-2 rounded-4 text-dark text-decoration-none h5 text-wrap text-center"
        :href="`/course/${course.id}`" v-for="course in courses" v-bind:key="course.id" v-else>
        <span class="d-inline-flex justify-content-center align-items-center h-100 w-100">{{ course.name }}</span>
      </a>
      <a class="card clickable-course-card bg-light border-0 m-2 rounded-4 text-muted text-decoration-none" href="#" v-if="!loading">
      <span class="d-inline-flex justify-content-center h-100 w-100 flex-column align-items-center"><IconJournalPlus
        class="mb-3"/>添加课程</span>
      </a>
    </div>
  </div>
</template>

<script>
import IconChevronDoubleRight from "@/components/icons/IconChevronDoubleRight.vue";
import IconEasel from "@/components/icons/IconEasel.vue";
import IconJournalPlus from "@/components/icons/IconJournalPlus.vue";
import axios from "axios";

export default {
  name: "PanelCourse",
  components: {IconJournalPlus, IconEasel, IconChevronDoubleRight},
  data: function () {
    return {
      courses: [],
      statusCode: 200,
      loading: true
    }
  },
  mounted() {
    axios.get(`/api/courses`).then(res => {
      this.courses = res.data
      this.loading = false
    }, e => {
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>
.clickable-course-card {
  width: 150px;
  height: 150px;
  transition: box-shadow 0.3s;
}

.clickable-course-card:hover {
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;
}
</style>
