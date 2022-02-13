<template>
  <b-modal id="upload-modal" title="上传数据" centered ok-title="上传" cancel-title="取消" @ok="submit">
    <div class="container">
      <form>
        <div class="form-group">
          <label>选择文件</label>
          <b-form-file multiple v-model="files" :state="Boolean(files)" placeholder="选择文件或拖到这里..." drop-placeholder="拖到这里...">
          </b-form-file>
          <small class="text-muted">文件从1开始计数，格式为 *.in 和 *.out ，支持一次上传多个文件。</small>
        </div>

      </form>
    </div>
  </b-modal>
</template>

<script>
import code2str from '@/code/code'
export default {
  name: "admin-problem-upload-data-modal",
  props: {
    pid: Number
  },
  data: function () {
    return {
      files: []
    }
  },
  methods: {
    submit: function () {
      if (!this.files) {
        this.$bvModal.msgBoxOk('未选择文件', {centered: true, title: '提示'})
        return
      }
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append(this.files[i].name, this.files[i])
      }
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/problem/id/${this.pid}/upload/io`, formData).then(_ => {
        this.$bvModal.msgBoxOk('上传成功', {centered: true, title: '提示'})
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '上传失败'})
      })
    },
    show: function () {
      this.$bvModal.show('upload-modal')
    }
  }
}
</script>

<style scoped>

</style>
