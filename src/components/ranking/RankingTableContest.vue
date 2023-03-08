<template>
<div class="table-responsive">
  <div v-if="loading">
    <p class="placeholder-glow" v-for="i in 4" :key="i">
      <span class="placeholder col-7 me-2"></span>
      <span class="placeholder col-4 me-2"></span>
      <span class="placeholder col-4 me-2"></span>
      <span class="placeholder col-6 me-2"></span>
      <span class="placeholder col-8 me-2"></span>
    </p>
  </div>
  <table class="table table-bordered" v-else>
    <thead>
      <tr>
        <th scope="col"><span class="d-inline-flex justify-content-center align-items-center h-100 w-100"><IconPerson/></span></th>
        <th scope="col"><span class="d-inline-flex justify-content-center align-items-center h-100 w-100"><IconPerson/></span></th>
        <th scope="col"><span class="d-inline-flex justify-content-center align-items-center h-100 w-100"><IconReception/></span></th>
        <th scope="col"><span class="d-inline-flex justify-content-center align-items-center h-100 w-100"><IconCheck2Circle/></span></th>
        <th scope="col"><span class="d-inline-flex justify-content-center align-items-center h-100 w-100"><IconClock/></span></th>
        <th scope="col" v-for="field in fields" :key="field.key">
          <div class="d-flex flex-column align-items-center">
            <span><a class="text-decoration-none text-muted text-nowrap" :href="`/problem/${problems[field.key]}`">{{ field.label }}</a></span>
            <small class="text-muted text-nowrap">{{ field.passed }} / {{ field.submitted }}</small>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in this.items" :key="item.uid">
        <th class="text-center" scope="row">u:{{ uid2Str(item.user.uid) }}</th>
        <td class="text-center"><span class="d-inline-block text-truncate" style="max-width: 100px;">@{{ item.user.nickname }}</span></td>
        <td class="text-center">{{ item.ranking }}</td>
        <td class="text-center">{{ item.passed }}</td>
        <td class="text-center">{{ item.penalty }}</td>
        <td :class="`text-center${item[field.key] ? ' table-' + item.variants[field.key] : ''}`" v-for="field in fields" :key="field.key">
          <small v-if="item[field.key]">
            <a class="text-decoration-none text-dark text-nowrap" :href="item[field.key].sid ? `/submission/${item[field.key].sid}` : '#'">{{item[field.key].passed ? item[field.key].elapse : ''}}
              <span class="text-muted">{{item[field.key].tries ? `(-${item[field.key].tries})`: ''}}</span>
            </a>
          </small>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import uidToStr from "@/util/uid-to-str";
import dateToStr from "@/util/date-to-str";
import axios from "axios";
import IconPerson from "@/components/icons/IconPerson.vue";
import IconReception from "@/components/icons/IconReception.vue";
import IconCheck2Circle from "@/components/icons/IconCheck2Circle.vue";
import IconClock from "@/components/icons/IconClock.vue";
import ordinalNumberToStr from "@/util/ordinal-number-to-str";
import IconArrowClockwiseSmall from "@/components/icons/IconArrowClockwiseSmall.vue";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";

export default {
  name: "RankingTableContest",
  components: {IconReplySmall, IconArrowClockwiseSmall, IconClock, IconCheck2Circle, IconReception, IconPerson},
  props: {
    id: String,
    limit: Number
  },
  data: function () {
    return {
      loading: true,
      items: [],
      fields: [],
      problems: [],
      firstUsers: [],
      problemsInfos: []
    }
  },
  methods: {
    loadData: function () {
      axios.get(`/api/contest/id/${this.id}/rank`).then(res => {
        this.problems = [];
        this.firstUsers = [];
        this.problemsInfos = [];
        this.fields = [];
        let problemSubmittedCount = [];
        let problemPassedCount = [];
        for (const [, obj] of res.data.meta.entries()) {
          this.problems.push(obj.pid);
          this.problemsInfos.push(obj);
          this.firstUsers.push(obj.firstUser);
          problemSubmittedCount.push(0);
          problemPassedCount.push(0);
        }
        this.items = []
        for (const [i, obj] of res.data.tab.entries()) {
          for (const d of obj.detail) {
            problemSubmittedCount[this.problems.indexOf(d.pid)] += d.tryCount + (d.pass ? 1 : 0);
            problemPassedCount[this.problems.indexOf(d.pid)] += (d.pass ? 1 : 0);
          }
          if (this.limit && i >= this.limit)
            continue;
          let row = {
            user: {uid: obj.uid, nickname: obj.nickname},
            ranking: i + 1,
            passed: obj.passCount,
            penalty: Math.ceil(obj.virtTime / 60000),
            variants: {}
          }
          let cellVariants = {};
          for (const d of obj.detail) {
            row[this.problems.indexOf(d.pid)] = {pid: d.pid, passed: d.pass, sid: d.sid, time: d.when, tries: d.tryCount, elapse: Math.ceil(d.elapse / 60000)}
            let variant = 'success-stripped';
            if (this.firstUsers[this.problems.indexOf(d.pid)] !== obj.uid)
              variant = d.pass ? 'success' : 'danger';
            cellVariants[this.problems.indexOf(d.pid)] = variant;
          }
          row['variants'] = cellVariants;
          this.items.push(row);
        }
        for (const [i, ] of res.data.meta.entries()) {
          this.fields.push({ key: i, label: `${ordinalNumberToStr(i + 1)}`, passed: problemPassedCount[i], submitted: problemSubmittedCount[i]});
        }
        this.loading = false;
      }, () => {
        this.loading = true;
      });
    },
    refresh: function () {
      this.loading = true;
      this.loadData();
    },
    uid2Str: function (val) {
      return uidToStr(val);
    },
    getLocaleDate: function (string) {
      return dateToStr(string);
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>
