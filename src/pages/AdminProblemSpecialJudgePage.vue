<template>
  <div class="container mb-2">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <IconSliders class="text-purple me-2"/>
      <span class="text-purple page-title">配置 Special Judge</span>
    </div>
    <p class="text-purple ms-3">
      题目：#{{ this.$route.params.id }} |
      <a class="text-decoration-none text-purple" :href="`/admin/problem/${this.$route.params.id}`"><IconReplySmall/>返回题目配置</a>
    </p>
    <div class="card bg-light p-4 border-0 rounded-4 mb-2">
      <h4> Special Judge 配置指南 </h4>
      <p> Special Judge 分为比较和交互两种模式。对于比较模式，Special Judge 程序将在用户程序执行结束后运行。</p>
      <p> 参数为：</p>
      <ul>
        <li> argv[1]：测试数据输入</li>
        <li> argv[2]：测试数据输出</li>
        <li> argv[3]：用户程序输出</li>
        <li> argv[4]：用户程序写在磁盘的文件所在的文件夹</li>
      </ul>
      <p> 评测结果：</p>
      <ul>
        <li> 0: 答案正确</li>
        <li> 1: 格式错误（答案正确*）</li>
        <li> 2: 答案错误</li>
      </ul>
    </div>
    <div class="card bg-light p-4 border-0 rounded-4 mb-2">
      <form>
        <div class="mb-3">
          <label class="form-label">选择语言</label>
          <select class="form-select" v-model="selectedLanguage">
            <option selected value="-1">请选择...</option>
            <option value="0">C++</option>
            <option value="1">Python</option>
            <option value="2">Javascript</option>
            <option value="3">Go</option>
            <option value="4">Text</option>
            <option value="5">Pypy3</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">代码</label>
          <textarea class="form-control" rows="12" v-model="sourceCode" placeholder="粘贴您的代码"></textarea>
          <small class="text-muted">请您妥善保管 Special Judge 源代码，系统不会为您存储源码。</small>
        </div>
      </form>
      <div class="container d-flex justify-content-center">
        <button class="btn btn-outline-success m-2" @click="uploadConfigurations" :disabled="uploading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="uploading"></span>
          提交配置
        </button>
      </div>
    </div>
    <ModalMsgBox ref="modal_msg_box"/>
  </div>
</template>

<script>
import IconSliders from "@/components/icons/IconSliders.vue";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import axios from "axios";
import httpCodeToStr from "@/util/http-code-to-str";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";

export default {
  name: "AdminProblemSpecialJudgePage",
  components: {IconReplySmall, ModalMsgBox, IconSliders},
  data: function () {
    return {
      uploading: false,
      sourceCode: '',
      selectedLanguage: -1,
      languageList: ['c++', 'python', 'javascript', 'go', 'text', 'pypy3'],
      validateResults: ['', '未填写代码', '未选择语言'],
    }
  },
  methods: {
    validateSubmitForm: function () {
      if (this.sourceCode === '') {
        return 1;
      } else if (this.selectedLanguage === -1) {
        return 2;
      }
      return 0;
    },
    uploadConfigurations: function () {
      const validateCode = this.validateSubmitForm();
      if (validateCode !== 0) {
        this.$refs.modal_msg_box.show('提示', this.validateResults[validateCode]);
        return;
      }
      this.uploading = true;
      axios.post(`/api/admin/problem/update/${this.$route.params.id}/spj`, {
        code: this.sourceCode,
        lang: this.languageList[this.selectedLanguage],
      }).then(res => {
        if (res.status === 292) {
          this.$refs.modal_msg_box.show('错误', '编译失败');
        } else {
          this.$refs.modal_msg_box.show('已通过编译', res.data.stdout.compiler ? res.data.stdout.compiler : '编译器无输出。');
        }
        this.uploading = false;
      }).catch(e => {
        this.$refs.modal_msg_box.show('错误', httpCodeToStr(e.response.status));
        this.uploading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>
