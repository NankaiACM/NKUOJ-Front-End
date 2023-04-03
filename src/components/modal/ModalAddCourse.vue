<template>
  <ModalBase v-model="internalShow" title="加入课程"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="关闭"
             :cancel-button="false" @ok="dismiss()" @close="dismiss()" @cancel="dismiss()">
    <div class="container">
      <div class="list-group" v-if="electableCoursesList && electableCoursesList.length > 0">
        <a class="list-group-item list-group-item-action" @click="subscribeCourse(course)"
           v-for="course in electableCoursesList" v-bind:key="course.id" href="#">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1"> {{ course.name }}</h5>
            <small>{{ course.number }}</small>
          </div>
          <small v-if="course.public"> 公开 </small>
          <small v-else> 需要验证加入 </small>
        </a>
      </div>
      <h6 class="text-center" v-else-if="error">加载失败，请重试</h6>
      <h6 class="text-center" v-else>没有可报名的课程</h6>
    </div>
    <ModalConfirmBox ref="confirm_modal"/>
    <ModalMsgBox ref="msg_box_modal"/>
    <ModalAddCoursePasscode ref="passcode_modal"/>
  </ModalBase>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";
import axios from "axios";
import ModalConfirmBox from "@/components/modal/ModalConfirmBox.vue";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import httpCodeToStr from "@/util/http-code-to-str";
import ModalAddCoursePasscode from "@/components/modal/ModalAddCoursePasscode.vue";

export default {
  name: "ModalAddCourse",
  components: {ModalAddCoursePasscode, ModalMsgBox, ModalConfirmBox, ModalBase},
  data: function () {
    return {
      internalShow: false,
      electableCoursesList: [],
      error: false,
    }
  },
  methods: {
    dismiss: function () {
      this.internalShow = false;
    },
    show: function () {
      this.internalShow = true;
    },
    subscribeCourse: function (course) {
      if (course.public) {
        this.$refs.confirm_modal.show('警告', `确定要加入课程${course.name}？您将无法退出课程。`,
          () => {this.submitSubscribeRequest(course.id, {});});
      } else {
        this.$refs.passcode_modal.show(passcode => {this.submitSubscribeRequest(course.id, {passcode: passcode});});
      }
    },
    submitSubscribeRequest: function (courseId, payload) {
      axios.post(`/api/course/subscribe/${courseId}`, payload)
        .then(res => {
          if (res.status === 200) {
            this.$refs.msg_box_modal.show('提示', '成功加入该课程');
          } else if (res.status === 295) {
            this.$refs.msg_box_modal.show('提示', '已经加入过该课程');
          } else if (res.status === 298) {
            this.$refs.msg_box_modal.show('提示', '口令错误');
          } else {
            this.$refs.msg_box_modal.show('其他消息', httpCodeToStr(res.status));
          }
        }, e => {
          this.$refs.msg_box_modal.show('错误', httpCodeToStr(e.response.status));
        })
    },
    loadElectableCoursesData: function () {
      axios.get(`/api/course/all`)
        .then(res => {
          this.electableCoursesList = res.data;
        }).catch(() => {
          this.error = true;
      });
    },
  },
  mounted () {
    this.loadElectableCoursesData();
  },
}
</script>

<style scoped>

</style>
