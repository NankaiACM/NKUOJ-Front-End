<template>
  <ModalBase v-model="internalShow" title="报名竞赛考试"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="关闭"
             :cancel-button="false" @ok="dismiss()" @close="dismiss()" @cancel="dismiss()">
    <div class="container" v-if="!error">
      <h5 class="ms-3 d-inline-flex align-items-center">
        <IconUIChecks/>
        <span class="ms-2 me-1">考试</span>
        <IconChevronDoubleRightSmall/>
      </h5>
      <div class="list-group mt-2 mb-2" v-if="registrableExamsList && registrableExamsList.length > 0">
        <a class="list-group-item list-group-item-action" @click="subscribeExam(exam)"
           v-for="exam in registrableExamsList" v-bind:key="exam.id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1"> {{ exam.name }}</h5>
            <small>{{ exam.number }}</small>
          </div>
          <small> 考试 </small>
        </a>
      </div>
      <h6 v-else class="text-center">
        没有可供报名的考试
      </h6>
      <h5 class="ms-3 d-inline-flex align-items-center">
        <IconTrophy/>
        <span class="ms-2 me-1">竞赛</span>
        <IconChevronDoubleRightSmall/>
      </h5>
      <div class="list-group mt-2 mb-2" v-if="registrableContestsList && registrableContestsList.length > 0">
        <a class="list-group-item list-group-item-action" @click="subscribeContest(contest)"
           v-for="contest in registrableContestsList" v-bind:key="contest.id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1"> {{ contest.name }}</h5>
            <small>{{ contest.number }}</small>
          </div>
          <small> 竞赛 </small>
        </a>
      </div>
      <h6 v-else class="text-center">
        没有可供报名的竞赛
      </h6>
    </div>
    <h6 v-else class="text-center">
      加载失败，请重试
    </h6>
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
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconTrophy from "@/components/icons/IconTrophy.vue";
import IconUIChecks from "@/components/icons/IconUIChecks.vue";

export default {
  name: "ModalAddContestExam",
  components: {
    IconUIChecks,
    IconTrophy, IconChevronDoubleRightSmall, ModalAddCoursePasscode, ModalMsgBox, ModalConfirmBox, ModalBase},
  data: function () {
    return {
      internalShow: false,
      registrableExamsList: [],
      registrableContestsList: [],
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
    subscribeExam: function (exam) {
      this.$refs.confirm_modal.show('警告', `确定要加入考试${exam.name}？您将无法退出考试。`,
        () => {this.submitSubscribeExamRequest(exam.id, {});});
    },
    submitSubscribeExamRequest: function (examId, payload) {
      axios.post(`/api/problemset/subscribe/${examId}`, payload)
        .then(res => {
          if (res.status === 200) {
            this.$refs.msg_box_modal.show('提示', '成功加入该考试');
            this.$emit('success');
          } else if (res.status === 295) {
            this.$refs.msg_box_modal.show('提示', '已经加入过该考试');
          } else {
            this.$refs.msg_box_modal.show('其他消息', httpCodeToStr(res.status));
          }
        }, e => {
          this.$refs.msg_box_modal.show('错误', httpCodeToStr(e.status));
        });
    },
    subscribeContest: function (contest) {
      this.$refs.confirm_modal.show('警告', `确定要加入竞赛${contest.name}？您将无法退出竞赛。`,
        () => {this.submitSubscribeContestRequest(contest.id, {});});
    },
    submitSubscribeContestRequest: function (contestId, payload) {
      axios.post(`/api/problemset/subscribe/${contestId}`, payload)
        .then(res => {
          if (res.status === 200) {
            this.$refs.msg_box_modal.show('提示', '成功加入该竞赛');
            this.$emit('success');
          } else if (res.status === 295) {
            this.$refs.msg_box_modal.show('提示', '已经加入过该竞赛');
          } else {
            this.$refs.msg_box_modal.show('其他消息', httpCodeToStr(res.status));
          }
        }, e => {
          this.$refs.msg_box_modal.show('错误', httpCodeToStr(e.status));
        });
    },
    loadRegistrableData: function () {
      axios.get(`/api/problemset/public`)
        .then(res => {
          this.registrableExamsList = res.data.filter(obj => obj.type === 'exam');
          this.registrableContestsList = res.data.filter(obj => obj.type === 'contest');
        }).catch(() => {
          this.error = true;
      });
    },
  },
  mounted () {
    this.loadRegistrableData();
  },
}
</script>

<style scoped>

</style>
