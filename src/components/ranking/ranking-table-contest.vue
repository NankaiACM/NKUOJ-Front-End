<template>
<div>
  <b-table hover :items="items" :fields="fields" striped class="text-center mt-4" :busy="loading" responsive show-empty bordered fixed>
    <template #table-busy>
      <div class="text-center my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong class="ml-4">加载中...</strong>
      </div>
    </template>
    <template #empty>
      <strong class="text-muted"> 没有相关记录 </strong>
    </template>
    <template #table-colgroup="scope">
      <col v-for="field in scope.fields" :key="field.key" :style="{ width: getColumnWidth(field.key) }">
    </template>
    <template #head(uid)="data">
      <span><b-icon icon="person" v-b-popover.hover.bottom="data.label"></b-icon></span>
    </template>
    <template #head(username)="data">
      <span><b-icon icon="person" v-b-popover.hover.bottom="data.label"></b-icon></span>
    </template>
    <template #head(penalty)="data">
      <span><b-icon icon="clock" v-b-popover.hover.bottom="data.label"></b-icon></span>
    </template>
    <template #head(ranking)="data">
      <span><b-icon icon="bar-chart" v-b-popover.hover.bottom="data.label"></b-icon></span>
    </template>
    <template #head(passed)="data">
      <span><b-icon icon="check2-circle" v-b-popover.hover.bottom="data.label"></b-icon></span>
    </template>
    <template #head()="data">
      <span v-b-popover.hover.bottom="problemsInfos[data.field.key]"><b-link class="text-decoration-none text-muted" :href="`/problem/${problems[data.field.key]}`">{{ data.label }}</b-link></span>
      <br><small class="text-muted">{{ data.field.passed }} / {{ data.field.submitted }}</small>
    </template>
    <template #cell(uid)="data">
      <small v-b-popover.hover.bottom="data.value.nickname" :class="data.value.uid === $store.getters.getUID ? 'font-weight-bold' : ''">{{`#${uid2Str(data.value.uid)}`}}</small>
    </template>
    <template #cell(username)="data">
      <div class="text-truncate"><small :class="data.value.uid === $store.getters.getUID ? 'font-weight-bold' : ''">{{data.value.nickname}}</small></div>
    </template>
    <template #cell(penalty)="data">
      <small v-b-popover.hover.top="`${Math.floor(data.value / 60)}:${data.value % 60}`">{{data.value}}</small>
    </template>
    <template #cell(ranking)="data">
      <small>{{data.value}}</small>
    </template>
    <template #cell(passed)="data">
      <small>{{data.value}}</small>
    </template>
    <template v-slot:cell()="data">
      <small v-if="data.value" v-b-popover.hover.top="data.value.time ? getLocaleDate(data.value.time) : undefined">
        <b-link class="text-decoration-none text-dark" :href="data.value.sid ? `/submission/${data.value.sid}` : '#'">{{data.value.passed ? data.value.elapse : ''}}
          <span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span>
        </b-link>
      </small>
    </template>
  </b-table>
</div>
</template>

<script>
import ordinalNumber2Str from "@/util/ordinal-number-to-str";
import uid2Str from "@/util/uid-to-str";
import date2Text from "@/util/date-to-str";

export default {
  name: "ranking-table-contest",
  props: {
    id: String,
    autoRefreshEnabled: Boolean,
    autoRefreshInterval: Number,
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
      this.$http.get(`${window.backendOrigin}/api/contest/id/${this.id}/rank`).then(res => {
        this.fields = [
          { key: 'uid', label: '用户' },
          { key: 'username', label: '用户名' },
          { key: 'ranking', label: '排名' },
          { key: 'passed', label: '通过' },
          { key: 'penalty', label: '用时' },
        ]
        this.problems = []
        this.firstUsers = []
        this.problemsInfos = []
        let problemSubmittedCount = []
        let problemPassedCount = []
        for (const [, obj] of res.data.meta.entries()) {
          this.problems.push(obj.pid)
          this.problemsInfos.push(obj)
          this.firstUsers.push(obj.firstUser)
          problemSubmittedCount.push(0)
          problemPassedCount.push(0)
        }
        this.items = []
        for (const [i, obj] of res.data.tab.entries()) {
          for (const d of obj.detail) {
            problemSubmittedCount[this.problems.indexOf(d.pid)] += d.tryCount + (d.pass ? 1 : 0)
            problemPassedCount[this.problems.indexOf(d.pid)] += (d.pass ? 1 : 0)
          }
          if (this.limit && i >= this.limit)
            continue;
          let row = {
            uid: {uid: obj.uid, nickname: obj.nickname},
            username: {uid: obj.uid, nickname: obj.nickname},
            ranking: i + 1,
            passed: obj.passCount,
            penalty: Math.ceil(obj.virtTime / 60000)
          }
          let cellVariants = {}
          for (const d of obj.detail) {
            row[`${this.problems.indexOf(d.pid)}`] = {pid: d.pid, passed: d.pass, sid: d.sid, time: d.when, tries: d.tryCount, elapse: Math.ceil(d.elapse / 60000)}
            let variant = 'success-stripped'
            if (this.firstUsers[this.problems.indexOf(d.pid)] !== obj.uid)
              variant = d.pass ? 'success' : 'danger'
            cellVariants[`${this.problems.indexOf(d.pid)}`] = variant
          }
          row['_cellVariants'] = cellVariants
          this.items.push(row)
        }
        for (const [i, ] of res.data.meta.entries()) {
          this.fields.push({ key: `${i}`, label: `${ordinalNumber2Str(i + 1)}`, passed: problemPassedCount[i], submitted: problemSubmittedCount[i]})
        }
        this.loading = false
      }, () => {
        this.loading = true
      })
    },
    refresh: function () {
      this.loading = true
      this.loadData()
    },
    uid2Str: function (val) {
      return uid2Str(val)
    },
    getLocaleDate: function (string) {
      return date2Text(string)
    },
    getColumnWidth: function (key) {
      if (key === 'uid')
        return '80px'
      else if (key === 'username')
        return '100px'
      else if (key === 'ranking')
        return '50px'
      else if (key === 'passed')
        return '50px'
      else if (key === 'penalty')
        return '90px'
      return '95px'
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style>
.table thead th {
  vertical-align: middle;
}
</style>
