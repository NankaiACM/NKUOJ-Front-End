<template>
<div v-if="contests && exams && contests.length + exams.length > 0">
  <h5 class="ms-3 d-inline-flex align-items-center justify-content-between">
    <IconTrophy/>
    <span class="ms-2 me-1">竞赛考试</span>
    <IconChevronDoubleRightSmall/>
  </h5>

  <div class="row row-cols-lg-2">
    <div class="col-lg-6 col-12" v-for="exam in exams" :key="exam.id">
      <a
        class="card clickable-card border-0 m-2 rounded-4 text-dark text-decoration-none p-3 d-flex flex-column justify-content-between"
        :href="`/exam/${exam.id}`">
        <h5 class="mb-1"><span class="badge rounded-pill bg-danger me-2">考试</span>{{exam.name}}</h5>
        <div class="d-flex w-100 justify-content-between">
          <small>{{getLocaleDate(exam.end)}} 截止</small>
          <p class="mb-1">{{exam.courseName ? exam.courseName : '无所属课程'}}</p>
        </div>
      </a>
    </div>
  </div>
  <div class="row row-cols-lg-2">
    <div class="col-lg-6 col-12" v-for="contest in contests" :key="contest.id">
      <a
        class="card clickable-card border-0 m-2 rounded-4 text-dark text-decoration-none p-3 d-flex flex-column justify-content-between"
        :href="`/contest/${contest.id}`">
        <h5 class="mb-1"><span class="badge rounded-pill bg-success me-2">竞赛</span>{{contest.name}}</h5>
        <div class="d-flex w-100 justify-content-between">
          <small>{{getLocaleDate(contest.end)}} 截止</small>
          <p class="mb-1">{{contest.courseName ? contest.courseName : '无所属课程'}}</p>
        </div>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconTrophy from "@/components/icons/IconTrophy.vue";
import axios from "axios";
import dateToStr from "@/util/date-to-str";

export default {
  name: "PanelContestExam",
  components: {IconTrophy, IconChevronDoubleRightSmall},
  data: function () {
    return {
      exams: [],
      contests: [],
      loading: true,
      statusCode: 200
    }
  },
  methods: {
    getLocaleDate: function (string) {
      return dateToStr(string);
    }
  },
  mounted() {
    let loadingIdentifier = 2;
    const onLoaded = () => {
      loadingIdentifier -= 1;
      if (loadingIdentifier === 0)
        this.loading = false;
    };
    axios.get(`/api/exam/open`).then(res => {
      this.exams = res.data;
      onLoaded();
    }, e => {
      this.statusCode = e.status;
      onLoaded();
    });
    axios.get(`/api/contest/open`).then(res => {
      this.contests = res.data;
      onLoaded();
    }, e => {
      this.statusCode = e.status;
      onLoaded();
    });
  }
}
</script>

<style scoped>

</style>
