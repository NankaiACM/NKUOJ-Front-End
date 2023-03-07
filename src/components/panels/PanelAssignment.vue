<template>
  <div v-if="assignments && assignments.length > 0">
    <h5 class="ms-3 d-inline-flex align-items-center">
      <IconPencilSquare/>
      <span class="ms-2 me-1">我的作业</span>
      <IconChevronDoubleRightSmall/>
    </h5>
    <div class="row row-cols-lg-2">
      <div class="col-lg-6 col-12" v-for="assignment in assignments" :key="assignment.id">
        <a
          class="card clickable-card border-0 m-2 rounded-4 text-dark text-decoration-none"
          :href="`/assignment/${assignment.id}`">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{assignment.name}}</h5>
            <small>{{getLocaleDate(assignment.end)}} 截止</small>
          </div>
          <p class="mb-1">{{assignment.courseName ? assignment.courseName : '无所属课程'}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconPencilSquare from "@/components/icons/IconPencilSquare.vue";
import axios from "axios";
import dateToStr from "@/util/date-to-str";

export default {
  name: "PanelAssignment",
  components: {IconPencilSquare, IconChevronDoubleRightSmall},
  data: function () {
    return {
      assignments: [],
      loading: true,
      statusCode: 200
    }
  },
  methods: {
    getLocaleDate: function (string) {
      return dateToStr(string)
    }
  },
  mounted() {
    axios.get(`/api/assignment/open`).then(res => {
      this.assignments = res.data
      this.loading = false
    }, e => {
      this.statusCode = e.status
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
