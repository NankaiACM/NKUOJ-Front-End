<template>
  <div class="container mb-2">
    <div class="d-flex justify-content-start align-items-center ms-3 mb-3 me-3">
      <IconSliders class="text-purple me-2"/>
      <span class="text-purple page-title">编辑题面</span>
    </div>
    <p class="text-purple ms-3">
      题目：#{{ this.$route.params.id }} |
      <a class="text-decoration-none text-purple" :href="`/admin/problem/${this.$route.params.id}`"><IconReplySmall/>返回题目配置</a>
    </p>
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
    <div class="card bg-light p-4 border-0 rounded-4" v-else>
      <div class="form-group">
        <h4>题面：</h4>
        <div v-if="extension === 'md'">
          <textarea class="form-control" v-model="edit.markdownText" rows="10" placeholder="输入新的题面..."></textarea>
          <small class="form-text text-muted">题面。使用 Markdown 语言，<a @click="previewMarkdown" href="#" class="text-decoration-none">预览</a>。</small><br>
          <small class="form-text text-muted">公式请使用`$和$`包围，例如`$e=mc^2$`。</small><br>
        </div>
        <div v-else-if="extension === 'pdf'">
          <input class="form-control" type="file" placeholder="选择文件或者拖到这里..." @change="onFileInput">
          <small class="form-text text-muted">如需查看现有题面请使用下载功能。</small>
        </div>
      </div>
      <div class="container d-flex justify-content-center">
        <button class="btn btn-outline-success m-2" @click="uploadContent" :disabled="uploading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="uploading"></span>
          保存题面
        </button>
        <button class="btn btn-outline-purple m-2" @click="downloadContent">下载题面</button>
      </div>
    </div>
    <ModalMsgBox ref="modal_msg_box"/>
  </div>
</template>

<script>
import IconSliders from "@/components/icons/IconSliders.vue";
import IconReplySmall from "@/components/icons/IconReplySmall.vue";
import axios from "axios";
import httpCodeToStr from "@/util/http-code-to-str";
import IconFileXLarge from "@/components/icons/IconFileXLarge.vue";
import ModalMsgBox from "@/components/modal/ModalMsgBox.vue";

export default {
  name: "AdminProblemContentPage",
  components: {ModalMsgBox, IconFileXLarge, IconReplySmall, IconSliders},
  data: function () {
    return {
      edit: {
        markdownText: '',
        pdfFile: null,
      },
      uploading: false,
      extension: '',
      loading: true,
      error: false
    }
  },
  methods: {
    uploadContent: function () {
      if (this.extension === 'md') {
        const formData = new FormData();
        const blob = new Blob([this.edit.markdownText], {type: 'text/plain'});
        formData.append('content', blob);
        this.uploading = true;
        axios.post(`/api/admin/problem/id/${this.$route.params.id}/upload/content`, formData).then(() => {
          this.$refs.modal_msg_box.show('提示', '上传成功！');
          this.uploading = false;
        }, e => {
          this.$refs.modal_msg_box.show('上传失败', httpCodeToStr(e.response.status));
          this.uploading = false;
        });
      } else if (this.extension === 'pdf') {
        if (this.edit.pdfFile === null) {
          this.$refs.modal_msg_box.show('提示', '未选择文件（或选择超过一个文件）。');
          return;
        }
        const formData = new FormData();
        formData.append('content', this.edit.pdfFile);
        this.uploading = true;
        axios.post(`/api/admin/problem/id/${this.$route.params.id}/upload/content`, formData).then(() => {
          this.$refs.modal_msg_box.show('提示', '上传成功！');
          this.uploading = false;
        }, e => {
          this.$refs.modal_msg_box.show('上传失败', httpCodeToStr(e.response.status));
          this.uploading = false;
        });
      }
    },
    downloadContent: function () {
      axios.get(`/api/admin/problem/id/${this.$route.params.id}/content`)
        .then(response => {
          if (response.data.extension === 'md') {
            const blob = new Blob([new Uint8Array(response.data.content.data)], {type: 'text/plain'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `problem-content-${this.$route.params.id}.md`;
            link.click();
          } else {
            const blob = new Blob([new Uint8Array(response.data.content.data)], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `problem-content-${this.$route.params.id}.pdf`;
            link.click();
          }
        }, e => {
          this.$refs.modal_msg_box.show('下载失败', httpCodeToStr(e.response.status));
        });
    },
    previewMarkdown: function () {

    },
    loadProblemData: function () {
      this.loading = true;
      this.error = false;
      axios.get(`/api/admin/problem/id/${this.$route.params.id}/content`).then(response => {
        this.extension = response.data.extension;
        if (response.data.extension === 'md')
          this.edit.markdownText = this.b64DecodeUnicode(btoa(this.Uint8ToBase64(new Uint8Array(response.data.content.data))));
        this.loading = false;
        this.error = false;
      }).catch(e => {
        console.log(e);
        this.loading = false;
        this.error = true;
      });
    },
    onFileInput: function (event) {
      const files = event.target.files;
      if (files.length === 1) {
        this.edit.pdfFile = files[0];
      } else {
        this.edit.pdfFile = null;
      }
    },
    Uint8ToBase64: function (u8a) {
      const CHUNK_SZ = 0x8000;
      const c = [];
      for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
      }
      return c.join("");
    },
    b64DecodeUnicode: function(str) {
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
  },
  mounted() {
    this.loadProblemData();
  }
}
</script>

<style scoped>

</style>
