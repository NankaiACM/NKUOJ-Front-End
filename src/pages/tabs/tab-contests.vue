<template>
  <div id="tab-contests">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4"><b-icon icon="trophy" class="mr-1"></b-icon>我的竞赛</h1>
          <p class="lead">查看我报名的竞赛。
            <b-link class="text-decoration-none text-muted" @click="registerContest"><b-icon icon="person-plus"></b-icon>报名竞赛</b-link></p>
        </div>
      </div>
      <div class="container">
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                        v-for="i in Array(42).keys()" :key="i"></b-skeleton>
          </template>

          <b-list-group v-if="contests && contests.length > 0">
            <b-list-group-item button @click="$router.push('/contest/' + contest.id)" v-for="contest in contests" v-bind:key="contest.id">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{contest.name}}</h5>
                <small>{{getLocaleDate(contest.end)}} 截止</small>
              </div>
              <p class="mb-1">{{contest.courseName ? contest.courseName : '无所属课程'}}</p>
            </b-list-group-item>
          </b-list-group>
          <h5 v-if="loading" class="m-5 text-center">
            正在加载
          </h5>
          <h5 v-else-if="statusCode !== 200" class="m-5 text-center">
            [{{statusCode}}] 网络请求出错，内容获取失败。
          </h5>
          <h5 v-else-if="contests.length === 0" class="m-5 text-center">
            暂无已报名的竞赛。
            <b-link class="text-decoration-none text-muted" @click="registerContest"><b-icon icon="person-plus"></b-icon>报名竞赛</b-link>
          </h5>

        </b-skeleton-wrapper>
      </div>
    </div>

    <b-modal id="register-modal" title="报名竞赛" centered ok-title="关闭" ok-only>
      <div class="container">
        <b-list-group v-if="registrableContestsList.length !== 0">
          <b-list-group-item button @click="subscribeContest(contest)"
                             v-for="contest in registrableContestsList" v-bind:key="contest.id">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> {{ contest.title }}</h5>
            </div>
            <small> 竞赛 </small>
          </b-list-group-item>
        </b-list-group>
        <h5 class="text-muted text-center" v-else>没有可报名的竞赛</h5>
      </div>
    </b-modal>
  </div>
</template>

<script>
import date2Text from "@/util/date-to-str";
import code2str from "@/util/http-code-to-str";

export default {
  name: "tab-contests",
  data: function () {
    return {
      contests: [],
      registrableContestsList: [],
      loading: true,
      statusCode: 200,
    }
  },
  methods: {
    getLocaleDate: function (string) {
      return date2Text(string)
    },
    registerContest: function () {
      this.$bvModal.show('register-modal')
    },
    loadRegistrableContestsData: function () {
      this.$http.get(`${window.backendOrigin}/api/problemset/public`)
        .then(res => {
          this.registrableContestsList = res.data
          this.registrableContestsList = this.registrableContestsList.filter(obj => obj.type === 'contest')
        })
    },
    loadMyContestsData: function () {
      this.$http.get(`${window.backendOrigin}/api/contest`).then(res => {
        this.contests = res.data
        this.loading = false
      }, e => {
        this.statusCode = e.status
        this.loading = false
      })
    },
    subscribeContest: function (contest) {
      this.$bvModal.msgBoxConfirm('确定要加入该竞赛？您将无法退出竞赛。',
        {centered: true, title: '警告', okTitle: '加入', cancelTitle: '取消'}).then(value => {
        if (value) {
          this.$http.get(`${window.backendOrigin}/api/problemset/subscribe/${contest.psid}`)
            .then(res => {
              if (res.status === 200) {
                this.$bvModal.msgBoxOk('成功加入该竞赛', {centered: true, title: '提示'})
              } else if (res.status === 295) {
                this.$bvModal.msgBoxOk('已经加入过该竞赛', {centered: true, title: '提示'})
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
    this.loadMyContestsData()
    this.loadRegistrableContestsData()
  }
}
</script>

<style scoped>

</style>
