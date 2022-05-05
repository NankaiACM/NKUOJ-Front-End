<template>
  <div class="container">
    <item-select-card api="problem" @select="onItemSelected" :newable="true" :create-dummy="createDummy"></item-select-card>

    <b-card no-body class="mt-4 mb-4" v-if="hasItemSelected">
      <b-tabs card>
        <b-tab title="配置" active>
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
            <small class="form-text text-muted">题目单的索引ID，不可修改。如要转移题目请使用克隆或转移功能。</small>
          </div>
          <div class="form-group" v-else>
            <label>题目公开：该题目位于公开练习题内。</label>
            <small class="form-text text-muted">如要转移题目请使用克隆或转移功能。</small>
          </div>
          <div class="form-group">
            <label>题面类型：</label>
            <b-form-radio-group v-model="dataObject.extension">
              <b-form-radio value="md">Markdown</b-form-radio>
              <b-form-radio value="pdf">PDF</b-form-radio>
            </b-form-radio-group>
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
            </b-button-group>
          </div>
        </b-tab>
        <b-tab title="题面">
          <div class="form-group">
            <b-alert variant="secondary" show class="text-center" dismissible fade> 注意：上传题面前请先保存提交配置信息。</b-alert>
            <label>题面：</label>
            <div v-if="dataObject.extension === 'md'">
              <b-form-textarea v-model="edit.markdownText" rows="10" placeholder="输入新的题面..."></b-form-textarea>
              <small class="form-text text-muted">题面。使用Markdown语言，<b-link @click="previewMarkdown">预览</b-link>。</small>
              <small class="form-text text-muted">公式请使用`$和$`包围，例如`$e=mc^2$`。</small>
              <small class="form-text text-muted">如需查看现有题面请使用下载功能。</small>
            </div>
            <div v-else-if="dataObject.extension === 'pdf'">
              <b-form-file v-model="edit.pdfFile" placeholder="选择文件或者拖到这里..." drop-placeholder="拖到这里..."></b-form-file>
              <small class="form-text text-muted">如需查看现有题面请使用下载功能。</small>
            </div>
          </div>
          <div class="container d-flex justify-content-center">
            <b-button-group>
              <b-button variant="outline-success" @click="uploadContent">保存题面</b-button>
              <b-button variant="outline-warning" @click="downloadContent">下载题面</b-button>
            </b-button-group>
          </div>
        </b-tab>
        <b-tab title="数据">
          <b-alert variant="secondary" show class="text-center" dismissible fade> 注意：上传数据前请先保存提交配置信息。</b-alert>
          <p class="text-center">上传或下载题目数据</p>
          <div class="container d-flex justify-content-center">
            <b-button-group>
              <b-button variant="outline-success" @click="uploadData">上传数据</b-button>
              <b-button variant="outline-warning" @click="downloadData">下载数据</b-button>
            </b-button-group>
          </div>
        </b-tab>
        <b-tab title="克隆">
          <form>
            <div class="form-group">
              <label>克隆到</label>
              <b-form-select v-model="cloning.type" :options="cloning.options"></b-form-select>
            </div>
            <div class="form-group" v-if="cloning.type === 1">
              <label>题目集ID</label>
              <b-form-input v-model="cloning.psid" placeholder="题目集的ID"></b-form-input>
            </div>
          </form>
          <div class="container d-flex justify-content-center">
            <b-button-group>
              <b-button variant="outline-primary" @click="submitClone">克隆</b-button>
            </b-button-group>
          </div>
        </b-tab>
        <b-tab title="转移">
          <form>
            <div class="form-group">
              <label>转移到</label>
              <b-form-select v-model="transfer.type" :options="transfer.options"></b-form-select>
            </div>
            <div class="form-group" v-if="transfer.type === 1">
              <label>题目集ID</label>
              <b-form-input v-model="transfer.psid" placeholder="题目集的ID"></b-form-input>
            </div>
          </form>
          <div class="container d-flex justify-content-center">
            <b-button-group>
              <b-button variant="outline-danger" @click="submitTransfer">转移</b-button>
            </b-button-group>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>

    <admin-problem-upload-data-modal :pid="selectedId" ref="upload-modal"></admin-problem-upload-data-modal>
    <admin-markdown-preview-modal :markdown-text="edit.markdownText" ref="preview-modal"></admin-markdown-preview-modal>
  </div>
</template>

<script>
import itemSelectCard from '../../components/admin/admin-problem-select-card'
import code2str from '@/util/http-code-to-str'
import AdminProblemUploadDataModal from "@/components/admin/admin-problem-upload-data-modal";
import AdminMarkdownPreviewModal from "@/components/admin/admin-markdown-preview-modal";

export default {
  name: 'admin-problem-page',
  components: {
    AdminMarkdownPreviewModal,
    AdminProblemUploadDataModal,
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
        extension: 'md',
        content: Buffer.from([])
      },
      edit: {
        markdownText: '',
        pdfFile: null,
      },
      cloning: {
        type: -1,
        psid: '',
        options:
          [{ value: -1, text: '请选择...', disabled: true },
            { value: 0, text: '公开' },
            { value: 1, text: '属于某个题目集...' }],
        validateResults: ['', '未选择目的', '未填写题目集ID'],
      },
      transfer: {
        type: -1,
        psid: '',
        options:
          [{ value: -1, text: '请选择...', disabled: true },
            { value: 0, text: '公开' },
            { value: 1, text: '属于某个题目集...' }],
        validateResults: ['', '未选择目的', '未填写题目集ID'],
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
        this.hasItemSelected = true
      }, e => {
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '载入信息失败'})
      })
    },
    submit: function () {
      this.$http.post(`${window.backendOrigin}/api/admin/problem/update/${this.selectedId}`, this.dataObject).then(() => {
        this.$bvModal.msgBoxOk('保存成功！', {centered: true, title: '提示'})
      }, e => {
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '保存失败'})
      })
    },
    uploadData: function () {
      this.$refs['upload-modal'].show()
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
    uploadContent: function () {
      if (this.dataObject.extension === 'md') {
        const formData = new FormData();
        const blob = new Blob([this.edit.markdownText], {type : 'text/plain'})
        formData.append('content', blob)
        this.$http.post(`${window.backendOrigin}/api/admin/problem/id/${this.selectedId}/upload/content`, formData).then(() => {
          this.$bvModal.msgBoxOk('上传成功', {centered: true, title: '提示'})
        }, e => {
          this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '上传失败'})
        })
      } else if (this.dataObject.extension === 'pdf') {
        const formData = new FormData();
        formData.append('content', this.edit.pdfFile)
        this.$http.post(`${window.backendOrigin}/api/admin/problem/id/${this.selectedId}/upload/content`, formData).then(() => {
          this.$bvModal.msgBoxOk('上传成功', {centered: true, title: '提示'})
        }, e => {
          this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '上传失败'})
        })
      }
    },
    downloadContent: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/problem/id/${this.selectedId}/content`)
        .then(response => {
          if (response.data.extension === 'md') {
            const blob = new Blob([response.data.content.data], {type: 'text/plain'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `problem-content-${this.selectedId}.md`;
            link.click();
          } else {
            const blob = new Blob([Buffer.from(response.data.content.data)], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `problem-content-${this.selectedId}.pdf`;
            link.click();
          }
        }, error => {
          this.$bvModal.msgBoxOk(code2str(error.status), {centered: true, title: '下载失败'})
        })
    },
    validateCloneForm: function () {
      if (this.cloning.type === -1) {
        return 1
      } else if (this.cloning.type === 1 && this.cloning.psid === '') {
        return 2
      }
      return 0
    },
    validateTransferForm: function () {
      if (this.transfer.type === -1) {
        return 1
      } else if (this.transfer.type === 1 && this.transfer.psid === '') {
        return 2
      }
      return 0
    },
    submitClone: function () {
      const validateResult = this.validateCloneForm()
      if (validateResult) {
        this.$bvModal.msgBoxOk(this.cloning.validateResults[validateResult], {centered: true, title: '克隆失败'})
        return
      }

      const createUrl = [
        `${window.backendOrigin}/api/admin/problem/fork/${this.selectedId}/global`,
        `${window.backendOrigin}/api/admin/problem/fork/${this.selectedId}/into/${this.cloning.psid}`][this.cloning.type]

      this.$http.get(createUrl).then(res => {
        this.$bvModal.msgBoxOk(`克隆成功，新题目ID为#${res.data}`, {centered: true, title: '提示'})
      }, e => {
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '克隆失败'})
      })
    },
    submitTransfer: function () {
      const validateResult = this.validateTransferForm()
      if (validateResult) {
        this.$bvModal.msgBoxOk(this.transfer.validateResults[validateResult], {centered: true, title: '转移失败'})
        return
      }

      const createUrl = [
        `${window.backendOrigin}/api/admin/problem/move/${this.selectedId}/from/${this.dataObject.psid ? this.dataObject.psid : 'global'}/to/global`,
        `${window.backendOrigin}/api/admin/problem/move/${this.selectedId}/from/${this.dataObject.psid ? this.dataObject.psid : 'global'}/to/${this.transfer.psid}`][this.transfer.type]

      this.$http.get(createUrl).then(() => {
        this.$bvModal.msgBoxOk(`转移成功。`, {centered: true, title: '提示'})
        this.loadSelectedItem()
      }, e => {
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '转移失败'})
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
