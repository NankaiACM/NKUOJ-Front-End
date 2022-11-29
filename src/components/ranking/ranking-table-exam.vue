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
      <template #head(user)="data">
        <span><b-icon icon="person" v-b-popover.hover.bottom="data.label"></b-icon></span>
      </template>
      <template #head(ranking)="data">
        <span><b-icon icon="bar-chart" v-b-popover.hover.bottom="data.label"></b-icon></span>
      </template>
      <template #head(score)="data">
        <span><b-icon icon="check-all" v-b-popover.hover.bottom="data.label"></b-icon></span>
      </template>
      <template #head()="data">
        <span v-b-popover.hover.bottom="problemsInfos[data.field.key]"><b-link class="text-decoration-none text-muted" :href="`/problem/${problems[data.field.key]}`">{{ data.label }}</b-link></span>
      </template>
      <template #cell(user)="data">
        <small v-b-popover.hover.top="data.value.nickname">{{data.value.uid === $store.getters.getUID ? '您' : `#${uid2Str(data.value.uid)}`}}</small>
      </template>
      <template #cell(ranking)="data">
        <small>{{data.value}}</small>
      </template>
      <template #cell(score)="data">
        <small>{{data.value}}</small>
      </template>
      <template v-slot:cell()="data">
        <small v-if="data.value">
          <b-link class="text-decoration-none text-dark" :href="data.value.sid ? `/submission/${data.value.sid}` : '#'">{{data.value.score}}
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
  name: "ranking-table-exam",
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
      problemsInfos: []
    }
  },
  methods: {
    loadData: function () {
      this.$http.get(`${window.backendOrigin}/api/exam/id/${this.id}/rank`).then(res => {
        this.fields = [
          { key: 'user', label: '用户' },
          { key: 'ranking', label: '排名' },
          { key: 'score', label: '得分' },
        ]
        this.problems = []
        this.problemsInfos = []
        for (const [i, obj] of res.data.meta.entries()) {
          this.fields.push({ key: `${i}`, label: `${ordinalNumber2Str(i + 1)}`})
          this.problems.push(obj.pid)
          this.problemsInfos.push(obj)
        }
        this.items = []
        for (const [i, obj] of res.data.tab.entries()) {
          if (this.limit && i >= this.limit)
            break
          let row = {
            user: {uid: obj.uid, nickname: obj.nickname},
            ranking: i + 1,
            score: obj.totScore,
          }
          let cellVariants = {}
          for (const d of obj.detail) {
            row[`${this.problems.indexOf(d.pid)}`] = {pid: d.pid, score: d.score, sid: d.sid, time: d.time, when: d.when, memory: d.memory}
            cellVariants[`${this.problems.indexOf(d.pid)}`] = d.score === 100 ? 'success' : 'danger'
          }
          row['_cellVariants'] = cellVariants
          this.items.push(row)
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
      if (key === 'user')
        return '80px'
      else if (key === 'ranking')
        return '50px'
      else if (key === 'score')
        return '80px'
      return '95px'
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style>

</style>
