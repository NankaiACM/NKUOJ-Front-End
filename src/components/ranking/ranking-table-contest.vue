<template>
<div>
  <b-table hover :items="items" :fields="fields" striped class="text-center mt-4" :busy="loading" responsive show-empty>
    <template #table-busy>
      <div class="text-center my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong class="ml-4">加载中...</strong>
      </div>
    </template>
    <template #empty>
      <strong class="text-muted"> 没有相关记录 </strong>
    </template>

    <template #cell(user)="data">
      <h6 v-b-popover.hover.top="data.value.nickname">{{data.value.uid === $store.getters.getUID ? '您' : `#${uid2Str(data.value.uid)}`}}</h6>
    </template>
    <template #cell(penalty)="data">
      <h6 v-b-popover.hover.top="`${Math.floor(data.value / 60)}:${data.value % 60}`">{{data.value}}</h6>
    </template>
    <template #cell(A)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(B)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(C)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(D)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(E)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(F)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(G)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(H)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(I)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(J)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(K)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(L)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(M)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(N)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(O)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(P)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(Q)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(R)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(S)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(T)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(U)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(V)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(W)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(X)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(Y)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>
    <template #cell(Z)="data"><small v-if="data.value" v-b-popover.hover.top="getLocaleDate(data.value.time)"><b-link class="text-decoration-none text-dark" :href="`/submission/${data.value.sid}`">{{data.value.passed ? data.value.elapse : ''}}<span class="text-muted">{{data.value.tries ? `(-${data.value.tries})`: ''}}</span></b-link></small></template>

  </b-table>
</div>
</template>

<script>
import ordinalNumber2Str from "@/util/ordinal-number-to-string";
import uid2Str from "@/util/uidToStr";
import date2Text from "@/util/date";

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
      firstUsers: []
    }
  },
  methods: {
    loadData: function () {
      this.$http.get(`${window.backendOrigin}/api/contest/id/${this.id}/rank`).then(res => {
        this.fields = [
          { key: 'user', label: '用户' },
          { key: 'ranking', label: '排名' },
          { key: 'passed', label: '通过' },
          { key: 'penalty', label: '罚时' },
        ]
        this.problems = []
        this.firstUsers = []
        for (const [i, obj] of res.data.meta.entries()) {
          this.fields.push({ key: `${ordinalNumber2Str(i + 1)}`, label: `${ordinalNumber2Str(i + 1)}`})
          this.problems.push(obj.pid)
          this.firstUsers.push(obj.firstUser)
        }
        this.items = []
        for (const [i, obj] of res.data.tab.entries()) {
          if (this.limit && i >= this.limit)
            break
          let row = {
            user: {uid: obj.uid, nickname: obj.nickname},
            ranking: i + 1,
            passed: obj.passCount,
            penalty: Math.ceil(obj.virtTime / 60000)
          }
          let cellVariants = {}
          for (const d of obj.detail) {
            row[`${ordinalNumber2Str(this.problems.indexOf(d.pid) + 1)}`] = {pid: d.pid, passed: d.pass, sid: d.sid, time: d.when, tries: d.tryCount, elapse: Math.ceil(d.elapse / 60000)}
            let variant = 'info'
            if (this.firstUsers[this.problems.indexOf(d.pid)] !== obj.uid)
              variant = d.pass ? 'success' : 'warning'
            cellVariants[`${ordinalNumber2Str(this.problems.indexOf(d.pid) + 1)}`] = variant
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
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>
