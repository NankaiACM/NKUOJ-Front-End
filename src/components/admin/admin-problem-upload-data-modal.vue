<template>
  <b-modal id="upload-modal" title="上传数据" centered ok-title="上传" cancel-title="取消" @ok="submit"
           :no-close-on-backdrop="uploading" :no-close-on-esc="uploading" :ok-disabled="uploading"
           :hide-header-close="uploading" :ok-only="uploading">
    <div class="container">
      <form v-if="!uploading">
        <div class="form-group">
          <label>选择文件</label>
          <b-form-file multiple v-model="files" :state="Boolean(files)" placeholder="选择文件或拖到这里..." drop-placeholder="拖到这里...">
          </b-form-file>
          <small class="text-muted">文件从1开始计数，格式为 *.in 和 *.out ，支持一次上传多个文件。</small>
        </div>
      </form>
      <div class="text-center" v-else>
        <b-spinner class="align-middle"></b-spinner>
        <strong class="ml-4">上传中...</strong>
      </div>
    </div>
  </b-modal>
</template>

<script>
import code2str from '@/util/http-code-to-str'
export default {
  name: "admin-problem-upload-data-modal",
  props: {
    pid: Number
  },
  data: function () {
    return {
      files: [],
      uploading: false
    }
  },
  methods: {
    submit: function (event) {
      if (!this.files) {
        this.$bvModal.msgBoxOk('未选择文件', {centered: true, title: '提示'})
        return
      }

      this.uploading = true
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append(this.files[i].name, this.files[i])
      }
      this.$http.post(`${window.backendOrigin}/api/admin/problem/id/${this.pid}/upload/io`, formData).then(() => {
        this.$bvModal.msgBoxOk('上传成功', {centered: true, title: '提示'})
        this.uploading = false
        this.$bvModal.hide('upload-modal')
      }, e => {
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '上传失败'})
        this.uploading = false
        this.$bvModal.hide('upload-modal')
      })
      event.preventDefault()
    },
    show: function () {
      this.$bvModal.show('upload-modal')
    }
  }
}
</script>

<style scoped>

</style>
