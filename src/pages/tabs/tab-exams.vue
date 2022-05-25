<template>
  <div id="tab-exams">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4"><b-icon icon="card-checklist" class="mr-1"></b-icon>我的考试</h1>
          <p class="lead">查看我报名的考试。
            <b-link class="text-decoration-none text-muted" @click="enableClientStrictModeAndRedirect"><b-icon icon="shield-lock"></b-icon>进入考试模式</b-link> |
            <b-link class="text-decoration-none text-muted" @click="openRegisterExamModal"><b-icon icon="person-plus"></b-icon>注册考试</b-link>
          </p>
        </div>
      </div>
      <div class="container">
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                        v-for="i in Array(42).keys()" :key="i"></b-skeleton>
          </template>

          <b-list-group v-if="exams && exams.length > 0">
            <b-list-group-item button @click="$router.push('/exam/' + exam.id)" v-for="exam in exams" v-bind:key="exam.id">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{exam.name}}</h5>
                <small>{{getLocaleDate(exam.end)}} 截止</small>
              </div>
              <p class="mb-1">{{exam.courseName ? exam.courseName : '无所属课程'}}</p>
            </b-list-group-item>
          </b-list-group>
          <h5 v-if="loading" class="m-5 text-center">
            正在加载
          </h5>
          <h5 v-else-if="statusCode !== 200" class="m-5 text-center">
            [{{statusCode}}] 网络请求出错，内容获取失败。
          </h5>
          <h5 v-else-if="exams.length === 0" class="m-5 text-center">
            暂无已报名的考试。
          </h5>

        </b-skeleton-wrapper>
      </div>
    </div>
    <b-modal id="register-modal" title="报名公开考试" centered ok-title="关闭" ok-only>
      <div class="container">
        <b-list-group v-if="registrableExamsList.length !== 0">
          <b-list-group-item button @click="subscribeExam(exam)"
                             v-for="exam in registrableExamsList" v-bind:key="exam.id">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> {{ exam.title }}</h5>
            </div>
            <small> 考试 </small>
          </b-list-group-item>
        </b-list-group>
        <h5 class="text-muted text-center" v-else>没有可报名的考试</h5>
      </div>
    </b-modal>
  </div>
</template>

<script>
import date2Text from "@/util/date-to-str";
import code2str from "@/util/http-code-to-str";

export default {
  name: "tab-exams",
  data: function () {
    return {
      exams: [],
      loading: true,
      registrableExamsList: [],
      statusCode: 200
    }
  },
  methods: {
    getLocaleDate: function (string) {
      return date2Text(string)
    },
    enableClientStrictModeAndRedirect: function () {
      this.$bvModal.msgBoxConfirm("真的要进入考试模式吗？在服务器未强制启用考试模式的情况下，您可以随意进出考试模式。", {title: '提示', centered: true, okTitle: '进入', cancelTitle: '取消'}).then(value => {
        if (value) {
          this.$store.commit('setVersion', {
            clientStrictMode: true
          })
          this.$router.push('/strict/home')
        }
      })
    },
    openRegisterExamModal: function () {
      this.loadRegistrableExamsData()
      this.$bvModal.show('register-modal')
    },
    loadRegistrableExamsData: function () {
      this.$http.get(`${window.backendOrigin}/api/problemset/public`)
        .then(res => {
          this.registrableExamsList = res.data
          this.registrableExamsList = this.registrableExamsList.filter(obj => obj.type === 'exam')
        })
    },
    loadMyExamsData: function () {
      this.$http.get(`${window.backendOrigin}/api/exam`).then(res => {
        this.exams = res.data
        this.loading = false
      }, e => {
        this.statusCode = e.status
        this.loading = false
      })
    },
    subscribeExam: function (exam) {
      this.$bvModal.msgBoxConfirm('确定要加入该考试？您将无法退出考试。',
        {centered: true, title: '警告', okTitle: '加入', cancelTitle: '取消'}).then(value => {
        if (value) {
          this.$http.get(`${window.backendOrigin}/api/problemset/subscribe/${exam.psid}`)
            .then(res => {
              if (res.status === 200) {
                this.$bvModal.msgBoxOk('成功加入该考试', {centered: true, title: '提示'})
              } else if (res.status === 295) {
                this.$bvModal.msgBoxOk('已经加入过该考试', {centered: true, title: '提示'})
              } else {
                this.$bvModal.msgBoxOk(code2str(res.status), {centered: true, title: '其他消息'})
              }
            }, e => {
              this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '错误'})
            })
        }
      })
    }
  },
  mounted () {
    this.loadMyExamsData()
  }
}
</script>

<style scoped>

</style>
