<template>
  <div id="tab-courses">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4"><b-icon icon="journals" class="mr-1"></b-icon>我的课程</h1>
          <p class="lead">查看我修读的课程。
            <b-link class="text-decoration-none text-muted" @click="electCourse"><b-icon icon="person-plus"></b-icon>加入课程</b-link>
          </p>
        </div>
      </div>
      <div class="container">
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                        v-for="i in Array(42).keys()" :key="i"></b-skeleton>
          </template>

          <b-list-group v-if="myCourses && myCourses.length > 0">
            <b-list-group-item button @click="$router.push(`/course/${course.id}`)"
                               class="d-flex justify-content-between align-items-center pt-4 pb-3 pl-4"
                               v-for="course in myCourses" v-bind:key="course.id">
              <h5>{{ course.name }}</h5>
            </b-list-group-item>
          </b-list-group>

          <h5 v-if="loading" class="m-5 text-center">
            正在加载
          </h5>
          <h5 v-else-if="statusCode !== 200" class="m-5 text-center">
            [{{ statusCode }}] 网络请求出错，内容获取失败。
          </h5>
          <h5 v-else-if="myCourses.length === 0" class="m-5 text-center">
            暂无修读的课程。
            <b-link class="text-decoration-none text-muted" @click="electCourse"><b-icon icon="person-plus"></b-icon>加入课程</b-link>
          </h5>
        </b-skeleton-wrapper>
      </div>
    </div>

    <b-modal id="elect-modal" title="加入课程" centered ok-title="关闭" ok-only>
      <div class="container">
        <b-list-group>
          <b-list-group-item button @click="subscribeCourse(course)"
                             v-for="course in electableCoursesList" v-bind:key="course.id">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> {{ course.name }}</h5>
              <small>{{ course.number }}</small>
            </div>
            <small v-if="course.public"> 公开 </small>
            <small v-else> 需要验证加入 </small>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-modal>

    <b-modal id="passcode-modal" title="输入口令" centered ok-title="确定" cancel-title="取消" @ok="passcodeSubmit">
      <div class="container">
        <div class="form-group">
          <label>课程“<b>{{ electedCourse.name }}</b>”需要验证。请输入口令：</label>
          <b-form-input type="text" v-model="passcode"></b-form-input>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import code2str from '@/util/http-code-to-str'

export default {
  name: 'tab-courses',
  components: {},
  data: function () {
    return {
      electableCoursesList: [],
      electedCourse: {},
      passcode: '',
      myCourses: [],
      statusCode: 200,
      loading: true
    }
  },
  mounted: function () {
    this.loadElectableCoursesData()
    this.loadMyCoursesData()
  },
  methods: {
    loadElectableCoursesData: function () {
      this.$http.get(`${window.backendOrigin}/api/course/all`)
        .then(res => {
          this.electableCoursesList = res.data
        })
    },
    loadMyCoursesData: function () {
      this.$http.get(`${window.backendOrigin}/api/courses`).then(res => {
        this.myCourses = res.data
        this.loading = false
      }, e => {
        console.log(e)
        this.statusCode = e.status
        this.loading = false
      })
    },
    subscribeCourse: function (course) {
      this.electedCourse = course
      if (course.public) {
        this.$bvModal.msgBoxConfirm('确定要加入该课程？您将无法退出课程。',
          {centered: true, title: '警告', okTitle: '加入', cancelTitle: '取消'}).then(value => {
          if (value) {
            this.submitSubscribeRequest(course.id, {})
          }
        })
      } else {
        this.$bvModal.show('passcode-modal')
      }
    },
    passcodeSubmit: function () {
      this.submitSubscribeRequest(this.electedCourse.id, {passcode: this.passcode})
    },
    submitSubscribeRequest: function (courseId, payload) {
      this.$http.post(`${window.backendOrigin}/api/course/subscribe/${courseId}`, payload)
        .then(res => {
          if (res.status === 200) {
            this.$bvModal.msgBoxOk('成功加入该课程', {centered: true, title: '提示'})
          } else if (res.status === 295) {
            this.$bvModal.msgBoxOk('已经加入过该课程', {centered: true, title: '提示'})
          } else if (res.status === 298) {
            this.$bvModal.msgBoxOk('口令错误', {centered: true, title: '提示'})
          } else {
            this.$bvModal.msgBoxOk(code2str(res.status), {centered: true, title: '其他消息'})
          }
        }, e => {
          this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '错误'})
        })
    },
    electCourse: function () {
      this.$bvModal.show('elect-modal')
    }
  }
}
</script>
<style lang="less" scoped>

</style>
