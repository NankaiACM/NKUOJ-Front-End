<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <IconSliders class="text-purple me-2"/>
      <span class="text-purple page-title">编辑数据</span>
    </div>
    <p class="text-purple ms-3">
      题目：#{{ this.$route.params.id }} |
      <a class="text-decoration-none text-purple" :href="`/admin/problem/${this.$route.params.id}`"><IconReplySmall/>返回题目配置</a>
    </p>
    <div class="card bg-light p-4 border-0 rounded-4">
      <form>
        <div class="form-group mb-2">
          <label class="mb-2">选择文件</label>
          <input multiple :disabled="uploading" placeholder="选择文件或拖到这里..." @change="onFileInput" class="form-control" type="file">
          <small class="text-muted">文件从1开始计数，格式为 *.in 和 *.out ，支持一次上传多个文件。</small>
        </div>
      </form>
      <div class="container d-flex justify-content-center">
        <button class="btn btn-outline-success m-2" @click="uploadData" :disabled="uploading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="uploading"></span>
          上传数据
        </button>
        <button class="btn btn-outline-purple m-2" @click="downloadData" :disabled="downloading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="downloading"></span>
          下载数据
        </button>
      </div>
    </div>
    <ModalMsgBox ref="modal_msg_box"/>
  </div>
</template>

<script>
import IconSliders from "@/components/icons/IconSliders.vue";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";
import axios from "axios";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";
import httpCodeToStr from "@/util/http-code-to-str";

export default {
  name: "AdminProblemDataPage",
  components: {ModalMsgBox, IconReplySmall, IconSliders},
  data: function () {
    return {
      uploading: false,
      downloading: false,
      files: null,
    }
  },
  methods: {
    uploadData: function () {
      if (!this.files) {
        this.$refs.modal_msg_box.show('提示', '未选择文件');
        return;
      }
      this.uploading = true;
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append(this.files[i].name, this.files[i]);
      }
      axios.post(`/api/admin/problem/id/${this.$route.params.id}/upload/io`, formData).then(() => {
        this.$refs.modal_msg_box.show('提示', '上传成功');
        this.uploading = false;
      }, e => {
        this.$refs.modal_msg_box.show('上传失败', httpCodeToStr(e.response.status));
        this.uploading = false;
      });
    },
    onFileInput: function (event) {
      this.files = event.target.files;
    },
    downloadData: function () {
      this.downloading = true;
      axios.get(`/api/admin/problem/id/${this.$route.params.id}/io`, {responseType: 'arraybuffer'})
        .then(response => {
          const blob = new Blob([response.data], {type: 'application/zip'});
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `problem-data-${this.$route.params.id}.zip`;
          link.click();
          this.downloading = false;
        }).catch(e => {
          this.$refs.modal_msg_box.show('下载失败', httpCodeToStr(e.response.status));
          this.downloading = false;
      });
    },
  }
}
</script>

<style scoped>

</style>
