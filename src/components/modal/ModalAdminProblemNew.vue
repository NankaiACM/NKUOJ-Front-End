<template>
  <ModalBase v-model="internalShow" title="新建题目"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="新建"
             :cancel-button="true" cancel-class="btn-outline-primary" cancel-text="取消"
             @ok="submit()" @close="dismiss()" @cancel="dismiss()">
    <div class="container">
      <form>
        <div class="form-group">
          <label class="mb-2">新建到</label>
          <select class="form-select mb-2" id="codeLanguageSelect" v-model="type">
            <option value="-1">请选择...</option>
            <option value="0">公开</option>
            <option value="1">属于某个题目集...</option>
          </select>
        </div>
        <div class="form-group" v-if="Number(type) === 1">
          <label class="mb-2">题目集ID</label>
          <input type="number" class="form-control mb-2" v-model="psid" placeholder="题目集的ID">
        </div>
      </form>
    </div>
    <ModalMsgBox ref="modal_create_problem_msg"/>
  </ModalBase>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";
import axios from "axios";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import httpCodeToStr from "@/util/http-code-to-str";

export default {
  name: "ModalAdminProblemNew",
  components: {ModalMsgBox, ModalBase},
  data: function () {
    return {
      internalShow: false,
      psid: null,
      type: -1,
      validateResults: ['', '未选择目的', '未填写题目集ID'],
      createDummy: {
        title: '未命名题目',
        extra: '',
        specialJudge: 0,
        detailJudge: false,
        cases: 0,
        timeLimit: 0,
        memoryLimit: 0,
        extension: 'md',
        content: []
      },
    }
  },
  methods: {
    dismiss: function () {
      this.internalShow = false;
    },
    show: function () {
      this.internalShow = true;
    },
    validateSubmitForm: function () {
      if (Number(this.type) === -1) {
        return 1;
      } else if (Number(this.type) === 1 && !this.psid) {
        return 2;
      }
      return 0;
    },
    submit: function () {
      const validateResult = this.validateSubmitForm();
      if (validateResult) {
        this.$refs.modal_create_problem_msg.show('新建失败', this.validateResults[validateResult]);
        return;
      }
      const createUrl = [
        `/api/admin/problem/create/global`,
        `/api/admin/problem/create/into/${this.psid}`][this.type];
      axios.post(createUrl, this.createDummy).then(res => {
        this.$emit('then', res.data);
      }, e => {
        this.$refs.modal_create_problem_msg.show('新建失败', httpCodeToStr(e.status));
      });
    },
  }
}
</script>

<style scoped>

</style>
