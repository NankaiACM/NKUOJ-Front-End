<template>
  <div>
    <h5 class="ms-3 d-inline-flex align-items-center justify-content-between">
      <IconPencilSquare/>
      <span class="ms-2 me-1">我的作业</span>
      <IconChevronDoubleRight/>
    </h5>
    <div class="row row-cols-lg-2">
      <div class="col-12 col-lg">
        <a
          class="card clickable-assignment-card border-0 m-2 rounded-4 text-dark text-decoration-none p-3 d-flex flex-column justify-content-between"
          href="#">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">测试作业</h5>
            <small>2022-02-02 截止</small>
          </div>
          <p class="mb-1">无所属课程</p>
        </a>
      </div>
      <div class="col-lg-6 col-lg">
        <a
          class="card clickable-assignment-card border-0 m-2 rounded-4 text-dark text-decoration-none"
          href="#">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{assignment.name}}</h5>
            <small>{getLocaleDate(assignment.end)}} 截止</small>
          </div>
          <p class="mb-1">{assignment.courseName ? assignment.courseName : '无所属课程'}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconChevronDoubleRight from "@/components/icons/IconChevronDoubleRight.vue";
import IconPencilSquare from "@/components/icons/IconPencilSquare.vue";
import axios from "axios";
import dateToStr from "@/util/date-to-str";

export default {
  name: "PanelAssignment",
  components: {IconPencilSquare, IconChevronDoubleRight},
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
.clickable-assignment-card {
  height: 100px;
  background-color: #f8f9fa;
  transition: background-color 0.3s;
}

.clickable-assignment-card:hover {
  background-color: #eff0f1;
}
</style>
