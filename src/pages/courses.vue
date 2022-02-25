<template>
  <div id="courses">
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4">课程</h1>
          <p class="lead">查看和加入课程。</p>
        </div>
      </div>
      <div class="container">
        <b-list-group>
          <b-list-group-item button @click="subscribeCourse(course)"
                             v-for="course in coursesList" v-bind:key="course.id">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> {{course.name}}</h5>
            </div>
            <small v-if="course.public"> 公开 </small>
            <small v-else class="text-info"> 需要验证加入 </small>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <b-modal id="passcode-modal" title="输入口令" centered ok-title="确定" cancel-title="取消" @ok="passcodeSubmit">
      <div class="container">
        <div class="form-group">
          <label>课程“<b>{{selectedCourse.name}}</b>”需要验证。请输入口令：</label>
          <b-form-input type="text" v-model="passcode"></b-form-input>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import code2str from '@/util/code'

export default {
  name: 'courses',
  components: {
  },
  data: function () {
    return {
      coursesList: [],
      passcode: '',
      selectedCourse: {}
    }
  },
  mounted: function () {
    this.loadCoursesData()
  },
  methods: {
    loadCoursesData: function () {
      this.$http.get(`${window.backendOrigin}/api/course/all`)
        .then(res => {
          this.coursesList = res.data
        })
    },
    subscribeCourse: function (course) {
      this.selectedCourse = course
      if (course.public) {
        this.$bvModal.msgBoxConfirm('确定要加入该课程？您将无法退出课程。',
          { centered: true, title: '警告', okTitle: '加入', cancelTitle: '取消' }).then(value => {
            if (value) {
              this.submitSubscribeRequest(course.id, {})
            }
        })
      } else {
        this.$bvModal.show('passcode-modal')
      }
    },
    passcodeSubmit: function () {
      this.submitSubscribeRequest(this.selectedCourse.id, {passcode: this.passcode})
    },
    submitSubscribeRequest: function (courseId, payload) {
      this.$http.post(`${window.backendOrigin}/api/course/subscribe/${courseId}`, payload)
        .then(res => {
          if (res.status === 200) {
            this.$bvModal.msgBoxOk('成功加入该课程', { centered: true, title: '提示' })
          } else if (res.status === 295) {
            this.$bvModal.msgBoxOk('已经加入过该课程', { centered: true, title: '提示' })
          } else if (res.status === 298) {
            this.$bvModal.msgBoxOk('口令错误', { centered: true, title: '提示' })
          } else {
            this.$bvModal.msgBoxOk(code2str(res.status), { centered: true, title: '其他消息' })
          }
        }, e => {
          this.$bvModal.msgBoxOk(code2str(e.status), { centered: true, title: '错误' })
        })
    }
  }
}
</script>
<style lang="less" scoped>
.pagination-wrapper {
  margin: 40px;
}
</style>
