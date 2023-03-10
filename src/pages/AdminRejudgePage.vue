<template>
<div class="container">
  <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
    <IconSliders class="text-purple me-2"/>
    <span class="text-purple page-title">重测</span>
  </div>
  <p class="text-purple ms-3">
    重测题目、提交。
  </p>
  <div class="card bg-light rounded-4 p-4 mb-4 border-0">
    <h4 class="text-danger">警告：请慎重使用重测！</h4>
    <ul>
      <li class="mb-0">
        对某一个提交进行重测往往可以接受；
      </li>
      <li class="mb-0">
        但是对整个问题的所有提交进行重测会导致OJ服务器进行大量的计算；
      </li>
      <li class="mb-0">
        这可能会导致大规模的提交排队现象！
      </li>
    </ul>
  </div>
  <div class="row">
    <div class="col-md-6 col-12 order-first">
      <div class="card h-100 border-0 rounded-4 p-2 bg-light mb-2">
        <div class="card-body bg-transparent">
          <h4>重测提交</h4>
          <label class="mb-2">提交编号：</label>
          <input class="form-control mb-2" type="number" placeholder="提交编号" v-model="sid">
        </div>
        <div class="card-footer bg-transparent border-top-0 d-flex justify-content-end">
          <button class="btn btn-outline-purple" @click="rejudgeSubmission">重测</button>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-12 order-last">
      <div class="card h-100 border-0 p-2 rounded-4 bg-light mb-2">
        <div class="card-body bg-transparent">
          <h4>重测题目</h4>
          <label class="mb-2">题目编号：</label>
          <input class="form-control mb-2" type="number" placeholder="题目编号" v-model="pid">
          <label class="mb-2">时延：</label>
          <input class="form-control mb-2" type="number" placeholder="重测时延" v-model="interval">
        </div>
        <div class="card-footer bg-transparent border-top-0 d-flex justify-content-end">
          <button class="btn btn-outline-danger" @click="rejudgeProblem">重测</button>
        </div>
      </div>
    </div>
  </div>
  <ModalConfirmBox ref="modal_confirm_box_rejudge"/>
  <ModalMsgBox ref="modal_msg_box_rejudge"/>
  <ModalRejudgeProgressing ref="modal_rejudge_progressing" :processing="processing" :submissions-count="submissionsCount" :success-rejudges="successRejudges" :failed-rejudges="failedRejudges" :failed-submissions="failedSubmissions" :submitting-rejudges="submittingRejudges"/>
</div>
</template>

<script>
import ModalConfirmBox from "@/components/modal/ModalConfirmBox.vue";
import axios from "axios";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import httpCodeToStr from "@/util/http-code-to-str";
import ModalRejudgeProgressing from "@/components/modal/ModalRejudgeProgressing.vue";
import IconSliders from "@/components/icons/IconSliders.vue";

export default {
  name: "AdminRejudgePage",
  components: {IconSliders, ModalRejudgeProgressing, ModalMsgBox, ModalConfirmBox},
  data: function () {
    return {
      pid: null,
      sid: null,
      processing: false,
      interval: 200,
      submissionsCount: 0,
      successRejudges: 0,
      submittingRejudges: 0,
      failedRejudges: 0,
      submissions: [],
      failedSubmissions: []
    }
  },
  methods: {
    rejudgeSubmission: function () {
      this.$refs.modal_confirm_box_rejudge.show('重测提交', `确定重新测评 #${this.sid}？`, () => {
        axios.get(`/api/admin/rejudge/sid/${this.sid}`).then(res => {
          if (res.status === 200) {
            this.$refs.modal_msg_box_rejudge.show('提示', `已经向服务器提交对 #${this.sid} 的重测`);
          } else {
            this.$refs.modal_msg_box_rejudge.show('提示', httpCodeToStr(res.status));
          }
        }, e => {
          this.$refs.modal_msg_box_rejudge.show('提示', httpCodeToStr(e.response.status));
        });
      });
    },
    rejudgeProblem: function () {
      this.$refs.modal_confirm_box_rejudge.show('重测题目', this.pid ? `确定重新测评题目 #${this.pid}？再次警告，这可能大幅增加服务器评测压力。` : '警告：即将重新测评全站所有题目！如果这不是您的意图，请勿空置题目编号！', () => {
        if (this.interval < 100) {
          this.$refs.modal_msg_box_rejudge.show('重测失败', '时间间隔太短。');
        } else {
          this.rejudgeProblemProcess();
        }
      });
    },
    rejudgeProblemProcess: function () {
      this.processing = true;
      this.submittingRejudges = 0;
      this.failedRejudges = 0;
      this.successRejudges = 0;
      this.failedSubmissions = [];
      axios.get(`/api/solutions?pid=${this.pid}`, ).then(res => {
        if (res.status === 200) {
          this.submissions = res.data;
          this.submissionsCount = res.data.length;
          let worker = (index) => {
            if (index < this.submissions.length) {
              this.submittingRejudges += 1;
              axios.get(`/api/admin/rejudge/sid/${this.submissions[index].sid}`).then(res => {
                if (res.status === 200) {
                  this.submittingRejudges -= 1;
                  this.successRejudges += 1;
                } else {
                  this.submittingRejudges -= 1;
                  this.failedRejudges += 1;
                  this.failedSubmissions.push(this.submissions[index].sid);
                }
                // eslint-disable-next-line no-unused-vars
              }, _ => {
                this.submittingRejudges -= 1;
                this.failedRejudges += 1;
                this.failedSubmissions.push(this.submissions[index].sid);
              });
              setTimeout(worker, this.interval, index + 1);
            } else {
              this.processing = false;
            }
          }
          setTimeout(worker, this.interval, 0);
          this.$refs.modal_rejudge_progressing.show();
        } else {
          this.$refs.modal_msg_box_rejudge.show('获取题目的提交列表失败', httpCodeToStr(res.status));
        }
      }, e => {
        this.$refs.modal_msg_box_rejudge.show('获取题目的提交列表失败', httpCodeToStr(e.response.status));
      });
    }
  }
}
</script>

<style scoped>

</style>
