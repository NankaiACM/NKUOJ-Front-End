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
        <th scope="col"><span class="d-inline-flex justify-content-center align-items-center h-100 w-100"><IconCheckAll/></span></th>
        <th scope="col" v-for="field in fields" :key="field.key">
          <div class="d-flex flex-column align-items-center">
            <span><a class="text-decoration-none text-muted text-nowrap" :href="`/problem/${problems[field.key]}`">{{ field.label }}</a></span>
            <small class="text-muted text-nowrap d-inline-block text-truncate" style="max-width: 80px">{{ problemsInfos[field.key].title }}</small>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in this.items" :key="item.uid">
        <th class="text-center" scope="row">u:{{ uid2Str(item.user.uid) }}</th>
        <td class="text-center"><span class="d-inline-block text-truncate" style="max-width: 100px;">@{{ item.user.nickname }}</span></td>
        <td class="text-center">{{ item.ranking }}</td>
        <td class="text-center">{{ item.score }}</td>
        <td :class="`text-center${item[field.key] ? ' table-' + item.variants[field.key] : ''}`" v-for="field in fields" :key="field.key">
          <small v-if="item[field.key]">
            <a class="text-decoration-none text-dark text-nowrap" :href="item[field.key].sid ? `/submission/${item[field.key].sid}` : '#'">{{item[field.key].score }}</a>
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
import IconClock from "@/components/icons/IconClock.vue";
import ordinalNumberToStr from "@/util/ordinal-number-to-str";
import IconArrowClockwiseSmall from "@/components/icons/IconArrowClockwiseSmall.vue";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";
import IconCheckAll from "@/components/icons/IconCheckAll.vue";

export default {
  name: "RankingTableExam",
  components: {
    IconCheckAll,
    IconReplySmall, IconArrowClockwiseSmall, IconClock, IconReception, IconPerson},
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
      axios.get(`/api/exam/id/${this.id}/rank`).then(res => {
        this.fields = [];
        this.problems = [];
        this.problemsInfos = [];
        for (const [i, obj] of res.data.meta.entries()) {
          this.fields.push({ key: i, label: `${ordinalNumberToStr(i + 1)}`});
          this.problems.push(obj.pid);
          this.problemsInfos.push(obj);
        }
        this.items = [];
        for (const [i, obj] of res.data.tab.entries()) {
          if (this.limit && i >= this.limit)
            break;
          let row = {
            user: {uid: obj.uid, nickname: obj.nickname},
            ranking: i + 1,
            score: obj.totScore,
          }
          let cellVariants = {};
          for (const d of obj.detail) {
            row[this.problems.indexOf(d.pid)] = {pid: d.pid, score: d.score, sid: d.sid, time: d.time, when: d.when, memory: d.memory};
            cellVariants[this.problems.indexOf(d.pid)] = d.score === 100 ? 'success' : 'danger';
          }
          row['variants'] = cellVariants;
          this.items.push(row);
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
