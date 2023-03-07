<template>
  <div>
    <h5 class="ms-3 d-inline-flex align-items-center">
      <IconEasel/>
      <span class="ms-2 me-1">我的课程</span>
      <IconChevronDoubleRightSmall/>
    </h5>
    <div class="row row-cols-lg-2">
      <div class="col-lg-6 col-12" v-if="loading">
        <a
          class="card clickable-card border-0 m-2 rounded-4 text-dark text-decoration-none h5 text-wrap text-center"
          href="#">
          <span class="d-inline-flex justify-content-center align-items-center h-100 w-100">
            <span class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></span>
          </span>
        </a>
      </div>
      <div class="col-lg-6 col-12" v-for="course in courses" v-bind:key="course.id" v-else>
        <a
          class="card clickable-card border-0 m-2 rounded-4 text-dark text-decoration-none h5 text-wrap text-center"
          :href="`/course/${course.id}`">
          <span class="d-inline-flex justify-content-center align-items-center h-100 w-100">{{ course.name }}</span>
        </a>
      </div>
      <div class="col-lg-6 col-12" v-if="!loading">
        <a class="card clickable-card border-0 m-2 rounded-4 text-muted text-decoration-none" href="#" @click="showAddCourseModal">
          <span class="d-inline-flex justify-content-center h-100 w-100 align-items-center h6"><IconJournalPlus
          class="me-2"/>加入课程</span>
        </a>
      </div>
    </div>
    <ModalAddCourse ref="modal_add_course"/>
  </div>
</template>

<script>
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconEasel from "@/components/icons/IconEasel.vue";
import IconJournalPlus from "@/components/icons/IconJournalPlus.vue";
import axios from "axios";
import ModalAddCourse from "@/components/modal/ModalAddCourse.vue";

export default {
  name: "PanelCourse",
  components: {ModalAddCourse, IconJournalPlus, IconEasel, IconChevronDoubleRightSmall},
  data: function () {
    return {
      courses: [],
      statusCode: 200,
      loading: true
    }
  },
  methods: {
    showAddCourseModal: function () {
      this.$refs.modal_add_course.show();
    }
  },
  mounted() {
    axios.get(`/api/courses`).then(res => {
      this.courses = res.data
      this.loading = false
    }, e => {
      this.statusCode = e.status
      this.loading = false
    });
  }
}
</script>

<style scoped>

</style>
