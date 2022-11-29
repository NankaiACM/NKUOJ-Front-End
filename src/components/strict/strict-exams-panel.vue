<template>
  <b-card no-body>
    <b-list-group flush v-if="exams && exams.length > 0">
      <b-list-group-item button @click="$router.push('/exam/' + exam.id)" v-for="exam in exams" v-bind:key="exam.id">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{exam.name}}</h5>
          <small>{{getLocaleDate(exam.end)}} 截止</small>
        </div>
        <p class="mb-1">{{exam.courseName ? exam.courseName : '无所属课程'}}</p>
      </b-list-group-item>
    </b-list-group>

    <b-card-body v-if="loading">
      <b-skeleton width="85%"></b-skeleton>
      <b-skeleton width="55%"></b-skeleton>
    </b-card-body>
    <b-card-body v-else-if="statusCode !== 200" class="text-center">
      [{{ statusCode }}] 网络请求出错，内容获取失败。<b-link @click="reloadData" class="text-decoration-none text-muted"><b-icon icon="arrow-clockwise"></b-icon>刷新</b-link>
    </b-card-body>
    <b-card-body v-else-if="exams.length === 0" class="text-center">
      没有正在进行中的考试，请等待考试开始。<b-link @click="reloadData" class="text-decoration-none text-muted"><b-icon icon="arrow-clockwise"></b-icon>刷新</b-link>
    </b-card-body>
  </b-card>
</template>

<script>
import date2Text from "@/util/date-to-str";

export default {
  name: 'strict-exams-panel',
  data: function () {
    return {
      exams: [],
      loading: true,
      statusCode: 200
    }
  },
  methods: {
    getLocaleDate: function (string) {
      return date2Text(string)
    },
    reloadData: function () {
      this.loading = true
      this.$http.get(`${window.backendOrigin}/api/exam/open`).then(res => {
        this.exams = res.data
        this.loading = false
      }, e => {
        this.statusCode = e.status
      })
    }
  },
  mounted() {
    this.reloadData()
  }
}
</script>

<style scoped>

</style>
