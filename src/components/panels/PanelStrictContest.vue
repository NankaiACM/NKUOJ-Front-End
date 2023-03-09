<template>
  <div>
    <h5 class="ms-3 d-inline-flex align-items-center">
      <IconTrophy/>
      <span class="ms-2 me-1">竞赛</span>
      <IconChevronDoubleRightSmall/>
    </h5>
    <div class="row row-cols-2">
      <div class="col-12" v-if="loading">
        <a
          class="card clickable-card border-0 m-2 rounded-4 text-dark text-decoration-none h5 text-wrap text-center"
          href="#">
          <span class="d-inline-flex justify-content-center align-items-center h-100 w-100">
            <span class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></span>
          </span>
        </a>
      </div>
      <div class="col-12" v-for="contest in contests" :key="contest.id" v-if="contests && contests.length > 0 && !loading">
        <a
          class="card clickable-card border-0 m-2 rounded-4 text-dark text-decoration-none p-3 d-flex flex-column justify-content-between"
          :href="`/contest/${contest.id}`">
          <h5 class="mb-1">{{contest.name}}</h5>
          <div class="d-flex w-100 justify-content-between">
            <small>{{getLocaleDate(contest.end)}} 截止</small>
            <p class="mb-1">{{contest.courseName ? contest.courseName : '无所属课程'}}</p>
          </div>
        </a>
      </div>
      <div class="col-12" v-if="!loading">
        <a class="card clickable-card border-0 m-2 rounded-4 text-muted text-decoration-none" href="#" @click="loadData">
          <span class="d-inline-flex justify-content-center h-100 w-100 align-items-center h6"><IconArrowClockwise
            class="me-2"/>刷新</span>
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
import IconJournalPlus from "@/components/icons/IconJournalPlus.vue";
import ModalAddContestExam from "@/components/modal/ModalAddContestExam.vue";
import IconArrowClockwise from "@/components/icons/IconArrowClockwise.vue";

export default {
  name: "PanelStrictContest",
  components: {IconArrowClockwise, ModalAddContestExam, IconJournalPlus, IconTrophy, IconChevronDoubleRightSmall},
  data: function () {
    return {
      contests: [],
      loading: true,
      error: false,
      statusCode: 200
    }
  },
  methods: {
    getLocaleDate: function (string) {
      return dateToStr(string);
    },
    loadData: function () {
      this.contests = [];
      this.loading = true;
      axios.get(`/api/contest/open`).then(res => {
        this.contests = res.data;
        this.loading = false;
      }, e => {
        this.statusCode = e.status;
      });
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>
