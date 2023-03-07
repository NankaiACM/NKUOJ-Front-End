<template>
<div>
  <h5 class="ms-3 d-inline-flex align-items-center">
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
  <div class="row row-cols-lg-2">
    <div class="col-lg-6 col-12" v-if="!loading">
      <a class="card clickable-card border-0 m-2 rounded-4 text-muted text-decoration-none" href="#" @click="showAddModal">
          <span class="d-inline-flex justify-content-center h-100 w-100 align-items-center h6"><IconJournalPlus
            class="me-2"/>报名竞赛考试</span>
      </a>
    </div>
  </div>
  <ModalAddContestExam ref="add_contest_exam_modal"/>
</div>
</template>

<script>
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconTrophy from "@/components/icons/IconTrophy.vue";
import axios from "axios";
import dateToStr from "@/util/date-to-str";
import IconJournalPlus from "@/components/icons/IconJournalPlus.vue";
import ModalAddContestExam from "@/components/modal/ModalAddContestExam.vue";

export default {
  name: "PanelContestExam",
  components: {ModalAddContestExam, IconJournalPlus, IconTrophy, IconChevronDoubleRightSmall},
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
    },
    showAddModal: function () {
      this.$refs.add_contest_exam_modal.show();
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
