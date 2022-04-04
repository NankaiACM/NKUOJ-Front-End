<template>
  <div class="container">
    <item-select-card api="problem" @select="onItemSelected" :newable="true" :create-dummy="createDummy"></item-select-card>

    <b-card class="mt-4 p-3 mb-4" v-if="hasItemSelected">
      <div class="form-group">
        <label>题目名称：</label>
        <b-form-input type="text" v-model="dataObject.name"></b-form-input>
        <small class="form-text text-muted">题目的标题。</small>
      </div>
      <div class="form-group">
        <label>题目ID：</label>
        <b-form-input type="text" v-model="dataObject.pid" disabled></b-form-input>
        <small class="form-text text-muted">题目的索引ID，不可修改。</small>
      </div>
      <div class="form-group" v-if="dataObject.psid">
        <label>题目单ID：</label>
        <b-form-input type="text" v-model="dataObject.psid" disabled></b-form-input>
        <small class="form-text text-muted">题目单的索引ID，不可修改。如要转移题目请使用克隆功能。</small>
      </div>
      <div class="form-group" v-else>
        <label>题目公开：该题目位于公开练习题内。</label>
        <small class="form-text text-muted">如要转移题目请使用克隆功能。</small>
      </div>
      <div class="form-group">
        <label>题面：</label>
        <b-form-textarea v-model="dataObject.content"></b-form-textarea>
        <small class="form-text text-muted">题面。使用Markdown语言，  <b-link @click="previewMarkdown">预览</b-link>。</small>
        <small class="form-text text-muted">公式请使用`$和$`包围，例如`$e=mc^2$`。</small>
      </div>
      <div class="form-group">
        <label>时间限制：</label>
        <b-form-input type="number" v-model="dataObject.timeLimit"></b-form-input>
        <small class="form-text text-muted">以ms为单位，是单个测试点的限时。</small>
      </div>
      <div class="form-group">
        <label>内存限制：</label>
        <b-form-input type="number" v-model="dataObject.memoryLimit"></b-form-input>
        <small class="form-text text-muted">以KiB为单位，是单个测试点的内存限制。</small>
      </div>
      <div class="form-group">
        <label>测试点数量：</label>
        <b-form-input type="number" v-model="dataObject.cases"></b-form-input>
        <small class="form-text text-muted">测试点的数量。</small>
      </div>
      <div class="form-group">
        <label>Detail Judge：</label>
        <b-form-checkbox v-model="dataObject.detailJudge">启用 Detail Judge</b-form-checkbox>
        <small class="form-text text-muted">Detail Judge会对所有测试点进行评测。如不启用该功能，则评测机遇到第一个非正确测试点就会停止评测，导致分数偏低。</small>
      </div>
      <div class="container d-flex justify-content-center">
        <b-button-group>
          <b-button variant="outline-info" @click="submit">保存提交</b-button>
          <b-button variant="outline-primary" @click="clone">克隆题目</b-button>
          <b-button variant="outline-success" @click="uploadData">上传数据</b-button>
          <b-button variant="outline-warning" @click="downloadData">下载数据</b-button>
        </b-button-group>
      </div>
    </b-card>

    <admin-problem-clone-modal :pid="selectedId" ref="clone-modal"></admin-problem-clone-modal>
    <admin-problem-upload-data-modal :pid="selectedId" ref="upload-modal"></admin-problem-upload-data-modal>
    <admin-markdown-preview-modal :markdown-text="dataObject.content" ref="preview-modal"></admin-markdown-preview-modal>
  </div>
</template>

<script>
import itemSelectCard from '../../components/admin/admin-problem-select-card'
import code2str from '@/util/code'
import AdminProblemCloneModal from "@/components/admin/admin-problem-clone-modal";
import AdminProblemUploadDataModal from "@/components/admin/admin-problem-upload-data-modal";
import AdminMarkdownPreviewModal from "@/components/admin/admin-markdown-preview-modal";

export default {
  name: 'problem-page',
  components: {
    AdminMarkdownPreviewModal,
    AdminProblemUploadDataModal,
    AdminProblemCloneModal,
    itemSelectCard
  },
  data () {
    return {
      selectedId: 0,
      hasItemSelected: false,
      dataObject: {},
      createDummy: {
        title: '未命名题目',
        extra: '',
        specialJudge: 0,
        detailJudge: false,
        cases: 0,
        timeLimit: 0,
        memoryLimit: 0,
        content: '',
      }
    }
  },
  methods: {
    onItemSelected: function (id) {
      this.selectedId = id
      this.loadSelectedItem()
    },
    loadSelectedItem: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/problem/id/${this.selectedId}`).then(res => {
        this.dataObject = res.data
        this.dataObject.content = new TextDecoder('utf-8').decode(new Uint8Array(this.dataObject.content.data).buffer)
        this.hasItemSelected = true
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '载入信息失败'})
      })
    },
    submit: function () {
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/problem/update/${this.selectedId}`, this.dataObject).then(_ => {
        this.$bvModal.msgBoxOk('保存成功！', {centered: true, title: '提示'})
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '保存失败'})
      })
    },
    clone: function () {
      this.$bvModal.msgBoxConfirm('是否保存后再克隆？', {centered: true, title: '提示', okTitle: '保存后克隆', cancelTitle: '直接克隆', noCloseOnBackdrop: true}).then(value => {
        if (value) {
          // eslint-disable-next-line no-unused-vars
          this.$http.post(`${window.backendOrigin}/api/admin/problem/update/${this.selectedId}`, this.dataObject).then(_ => {
            this.$refs['clone-modal'].show()
          }, e => {
            console.log(e)
            this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '保存失败。'})
          })
        } else {
          this.$refs['clone-modal'].show()
        }
      })
    },
    uploadData: function () {
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/problem/update/${this.selectedId}`, this.dataObject).then(_ => {
        this.$refs['upload-modal'].show()
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '保存失败，无法进行上传'})
      })
    },
    downloadData: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/problem/id/${this.selectedId}/io`, {responseType: 'arraybuffer'})
        .then(response => {
          const blob = new Blob([response.data], {type: 'application/zip'});

          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `problem-data-${this.selectedId}.zip`;
          link.click();
        })
    },
    previewMarkdown: function () {
      this.$refs['preview-modal'].show()
    }
  }
}
</script>

<style scoped>

</style>
