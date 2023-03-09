<template>
  <div class="card rounded-4 bg-light border-0 p-4 mb-2" v-if="problems.length > 1">
    <h5 class="d-inline-flex align-items-center mb-3">
      <IconListOL/>
      <span class="ms-2 me-1">快速跳转</span>
      <IconChevronDoubleRightSmall/>
    </h5>
    <select class="form-select form-select-lg mb-3" v-model="sel" @change="redirectToProblem()">
      <option :value="index" :selected="problem.pid === pid" v-for="(problem, index) in problems" :key="problem.pid">{{ordinalNumberToStr(index + 1)}}.{{problem.name}}</option>
    </select>
  </div>
</template>

<script>
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconListOL from "@/components/icons/IconListOL.vue";
import ordinalNumberToStr from "@/util/ordinal-number-to-str";
import axios from "axios";
import router from "@/router";

export default {
  name: "DropdownNavigator",
  components: {IconListOL, IconChevronDoubleRightSmall},
  props: {
    psid: Number,
    pid: Number,
  },
  data: function () {
    return {
      sel: 0,
      problems: [],
      problemsListLoading: true,
    }
  },
  methods: {
    loadProblemsList: function () {
      axios.get(`/api/problem/problemset/${this.psid}`).then(res => {
        this.problems = res.data;
        this.problemsListLoading = false;
        this.sel = this.problems.findIndex(p => p.pid === Number(this.pid));
      });
    },
    ordinalNumberToStr: function (val) {
      return ordinalNumberToStr(val);
    },
    redirectToProblem: function () {
      if (Number(this.pid) !== this.problems[this.sel].pid) {
        router.push(`/problem/${this.problems[this.sel].pid}`);
      }
    }
  },
  mounted() {
    this.loadProblemsList();
  }
}
</script>

<style scoped>

</style>
