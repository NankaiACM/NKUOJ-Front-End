<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <IconSliders class="text-purple me-2"/>
      <span class="text-purple page-title">配置题目</span>
    </div>
    <p class="text-purple ms-3">
      题目：#{{ this.$route.params.id }}
    </p>
    <div class="row">
      <div class="col-md-8 col-12 order-first">
        <div class="card border-0 rounded-4 bg-light mb-2 p-4">
          <h4>题目配置</h4>
          <div v-if="loading">
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
              <span class="placeholder col-6 me-2"></span>
              <span class="placeholder col-8 me-2"></span>
              <span class="placeholder col-5 me-2"></span>
              <span class="placeholder col-12 me-2"></span>
              <span class="placeholder col-4 me-2"></span>
            </p>
          </div>
          <div v-else-if="error" class="d-flex flex-column justify-content-center align-items-center m-3">
            <IconFileXLarge class="text-purple mb-3"/>
            <h5 class="text-purple mb-3">加载题目数据出现错误</h5>
          </div>
          <div v-else>
            <div class="form-group mb-2">
              <label class="mb-2">题目名称：</label>
              <input type="text" v-model="dataObject.name" class="form-control">
              <small class="form-text text-muted">题目的标题。</small>
            </div>
            <div class="form-group mb-2">
              <label>题目ID：</label>
              <input type="number" v-model="dataObject.pid" class="form-control" disabled>
              <small class="form-text text-muted">题目的索引ID，不可修改。</small>
            </div>
            <div class="form-group mb-2" v-if="dataObject.psid">
              <label>题目单ID：</label>
              <input type="number" v-model="dataObject.psid" class="form-control" disabled>
              <small class="form-text text-muted">题目单的索引ID，不可修改。如要转移题目请使用克隆或转移功能。</small>
            </div>
            <div class="form-group mb-2" v-else>
              <label>题目公开：该题目位于公开练习题内。</label><br>
              <small class="form-text text-muted">如要转移题目请使用克隆或转移功能。</small>
            </div>
            <div class="form-group mb-2">
              <label>题面类型：</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="md" id="radio-md" v-model="dataObject.extension">
                <label class="form-check-label" for="radio-md">
                  Markdown
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="pdf" id="radio-pdf" v-model="dataObject.extension">
                <label class="form-check-label" for="radio-pdf">
                  PDF
                </label>
              </div>
            </div>
            <div class="form-group mb-2">
              <label>时间限制：</label>
              <input type="number" v-model="dataObject.timeLimit" class="form-control">
              <small class="form-text text-muted">以ms为单位，是单个测试点的限时。</small>
            </div>
            <div class="form-group mb-2">
              <label>内存限制：</label>
              <input type="number" v-model="dataObject.memoryLimit" class="form-control">
              <small class="form-text text-muted">以KiB为单位，是单个测试点的内存限制。</small>
            </div>
            <div class="form-group mb-2">
              <label>测试点数量：</label>
              <input type="number" v-model="dataObject.cases" class="form-control">
              <small class="form-text text-muted">测试点的数量。</small>
            </div>
            <div class="form-group mb-2">
              <label>Detail Judge：</label>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="detailJudgeCheck" v-model="dataObject.detailJudge">
                <label class="form-check-label" for="detailJudgeCheck">
                  启用 Detail Judge
                </label>
              </div>
              <small class="form-text text-muted">Detail
                Judge会对所有测试点进行评测。如不启用该功能，则评测机遇到第一个非正确测试点就会停止评测，导致分数偏低。</small>
            </div>
            <div class="container d-flex justify-content-center">
              <button class="btn btn-outline-purple m-2" @click="submit" :disabled="submittingButton1">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submittingButton1"></span>
                保存提交
              </button>
              <button class="btn btn-outline-success m-2" @click="submitAndEditContent" :disabled="submittingButton2">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submittingButton2"></span>
                保存提交并编辑题面
              </button>
              <button class="btn btn-outline-primary m-2" @click="submitAndUploadData" :disabled="submittingButton3">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="submittingButton3"></span>
                保存提交并编辑数据
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-12 order-last">
        <div class="card border-0 rounded-4 bg-light mb-2">
          <div class="card border-0 rounded-4 bg-light mb-2 p-4">
            <h4>克隆题目</h4>
            <small class="text-muted">如您修改了题目配置，请在克隆前记得保存提交；否则克隆的数据为修改之前的数据。</small>
            <form>
              <div class="form-group mb-2">
                <label class="mb-2">克隆到</label>
                <select v-model="cloning.type" class="form-select">
                  <option value="-1">请选择...</option>
                  <option value="0">公开</option>
                  <option value="1">属于某个题目集...</option>
                </select>
              </div>
              <div class="form-group mb-2" v-if="Number(cloning.type) === 1">
                <label class="mb-2">题目集ID</label>
                <input v-model="cloning.psid" placeholder="题目集的ID" class="form-control" type="number">
              </div>
            </form>
            <div class="container d-flex justify-content-center mt-2">
              <button class="btn btn-outline-purple" @click="submitClone" :disabled="cloningButton">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="cloningButton"></span>
                克隆
              </button>
            </div>
          </div>
        </div>
        <div class="card border-0 rounded-4 bg-light mb-2">
          <div class="card border-0 rounded-4 bg-light mb-2 p-4">
            <h4>转移题目</h4>
            <small class="text-muted">如您修改了题目配置，请在转移前记得保存提交；否则转移的数据为修改之前的数据。</small>
            <form>
              <div class="form-group mb-2">
                <label class="mb-2">转移到</label>
                <select v-model="transfer.type" class="form-select">
                  <option value="-1">请选择...</option>
                  <option value="0">公开</option>
                  <option value="1">属于某个题目集...</option>
                </select>
              </div>
              <div class="form-group mb-2" v-if="Number(transfer.type) === 1">
                <label class="mb-2">题目集ID</label>
                <input v-model="transfer.psid" placeholder="题目集的ID" class="form-control" type="number">
              </div>
            </form>
            <div class="container d-flex justify-content-center mt-2">
              <button class="btn btn-outline-purple" @click="submitTransfer" :disabled="transferringButton">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="transferringButton"></span>
                转移
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalMsgBox ref="modal_msg_box"/>
  </div>
</template>

<script>
import IconSliders from "@/components/icons/IconSliders.vue";
import axios from "axios";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import httpCodeToStr from "@/util/http-code-to-str";
import IconFileXLarge from "@/components/icons/IconFileXLarge.vue";
import router from "@/router";

export default {
  name: "AdminProblemPage",
  components: {IconFileXLarge, ModalMsgBox, IconSliders},
  data() {
    return {
      dataObject: {},
      loading: true,
      error: false,
      submittingButton1: false,
      submittingButton2: false,
      submittingButton3: false,
      cloningButton: false,
      transferringButton: false,
      cloning: {
        type: -1,
        psid: null,
        validateResults: ['', '未选择目的', '未填写题目集ID'],
      },
      transfer: {
        type: -1,
        psid: null,
        validateResults: ['', '未选择目的', '未填写题目集ID'],
      }
    }
  },
  methods: {
    loadSelectedItem: function () {
      this.loading = true;
      this.error = false;
      axios.get(`/api/admin/problem/id/${this.$route.params.id}`).then(res => {
        this.dataObject = res.data;
        this.loading = false;
        this.error = false;
      }, () => {
        this.loading = false;
        this.error = true;
      });
    },
    submit: function () {
      this.submittingButton1 = true;
      axios.post(`/api/admin/problem/update/${this.$route.params.id}`, this.dataObject).then(() => {
        this.submittingButton1 = false;
        this.$refs.modal_msg_box.show('提示', '保存成功！');
      }, e => {
        this.submittingButton1 = false;
        this.$refs.modal_msg_box.show('保存失败', httpCodeToStr(e.status));
      });
    },
    submitAndEditContent: function () {
      this.submittingButton2 = true;
      axios.post(`/api/admin/problem/update/${this.$route.params.id}`, this.dataObject).then(() => {
        this.submittingButton2 = false;
        router.push(`/admin/problem/content/${this.$route.params.id}`);
      }, e => {
        this.submittingButton2 = false;
        this.$refs.modal_msg_box.show('保存失败', httpCodeToStr(e.status));
      });
    },
    submitAndUploadData: function () {
      this.submittingButton3 = true;
      axios.post(`/api/admin/problem/update/${this.$route.params.id}`, this.dataObject).then(() => {
        this.submittingButton3 = false;
        router.push(`/admin/problem/data/${this.$route.params.id}`);
      }, e => {
        this.submittingButton3 = false;
        this.$refs.modal_msg_box.show('保存失败', httpCodeToStr(e.status));
      });
    },
    validateCloneForm: function () {
      if (Number(this.cloning.type) === -1) {
        return 1;
      } else if (Number(this.cloning.type) === 1 && !this.cloning.psid) {
        return 2;
      }
      return 0;
    },
    validateTransferForm: function () {
      if (Number(this.transfer.type) === -1) {
        return 1
      } else if (Number(this.transfer.type) === 1 && !this.transfer.psid) {
        return 2;
      }
      return 0;
    },
    submitClone: function () {
      const validateResult = this.validateCloneForm();
      if (validateResult) {
        this.$refs.modal_msg_box.show('克隆失败', this.transfer.validateResults[validateResult]);
        return;
      }
      this.cloningButton = true;
      const createUrl = [
        `/api/admin/problem/fork/${this.$route.params.id}/global`,
        `/api/admin/problem/fork/${this.$route.params.id}/into/${this.cloning.psid}`][this.cloning.type];
      axios.get(createUrl).then(res => {
        this.cloningButton = false;
        this.$refs.modal_msg_box.show('提示', `克隆成功，新题目ID为#${res.data}`);
      }, e => {
        this.cloningButton = false;
        this.$refs.modal_msg_box.show('克隆失败', httpCodeToStr(e.status));
      });
    },
    submitTransfer: function () {
      const validateResult = this.validateTransferForm();
      if (validateResult) {
        this.$refs.modal_msg_box.show('转移失败', this.transfer.validateResults[validateResult]);
        return;
      }
      this.transferringButton = true;
      const createUrl = [
        `/api/admin/problem/move/${this.$route.params.id}/from/${this.dataObject.psid ? this.dataObject.psid : 'global'}/to/global`,
        `/api/admin/problem/move/${this.$route.params.id}/from/${this.dataObject.psid ? this.dataObject.psid : 'global'}/to/${this.transfer.psid}`][this.transfer.type]
      axios.get(createUrl).then(() => {
        this.transferringButton = false;
        this.$refs.modal_msg_box.show('提示', '转移成功！');
        this.loadSelectedItem();
      }, e => {
        this.transferringButton = false;
        this.$refs.modal_msg_box.show('转移失败', httpCodeToStr(e.status));
      });
    }
  },
  mounted() {
    this.loadSelectedItem();
  }
}
</script>

<style scoped>

</style>
