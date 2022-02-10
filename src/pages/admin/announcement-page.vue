<template>
  <div class="container">
    <item-select-card api="announcement" @select="onItemSelected"></item-select-card>

    <b-card class="mt-4 p-3 mb-4" v-if="hasItemSelected">
      <div class="form-group">
        <label>公告标题：</label>
        <b-form-input type="text" v-model="dataObject.title"></b-form-input>
        <small class="form-text text-muted">公告的标题。</small>
      </div>
      <div class="form-group">
        <label>公告ID：</label>
        <b-form-input type="text" v-model="selectedId" disabled></b-form-input>
        <small class="form-text text-muted">公告的索引ID，不可修改。</small>
      </div>
      <div class="form-group">
        <label>所属课程的索引ID：</label>
        <b-form-input type="text" v-model="dataObject.courseId"></b-form-input>
        <small class="form-text text-muted">公告所属的课程ID。请确保该ID有效！</small>
      </div>
      <div class="form-group">
        <label>公告内容：</label>
        <b-form-textarea v-model="dataObject.content"></b-form-textarea>
        <small class="form-text text-muted">公告内容，纯文本。</small>
      </div>
      <div class="form-group">
        <label>公告发布时间：</label>
        <b-form-datepicker v-model="dataObject.postDate" locale="zh" class="mb-1"></b-form-datepicker>
        <b-form-timepicker v-model="dataObject.postTime" locale="zh" class="mb-1"></b-form-timepicker>
        <small class="form-text text-muted">发布时间，在这个时间之后作业才会出现。</small>
      </div>
      <div class="container d-flex justify-content-center">
        <b-button-group>
          <b-button variant="outline-info" @click="submit">保存并提交</b-button>
          <b-button variant="danger" @click="remove">删除</b-button>
        </b-button-group>
      </div>
    </b-card>
  </div>
</template>

<script>
import itemSelectCard from '../../components/admin/admin-item-select-card'

export default {
  name: 'announcement-page',
  components: {
    itemSelectCard
  },
  data () {
    return {
      selectedId: '',
      hasItemSelected: false,
      dataObject: {
        title: '',
        content: '',
        postDate: '',
        postTime: '',
        courseId: ''
      }
    }
  },
  methods: {
    onItemSelected: function (id) {
      this.selectedId = id
      this.loadSelectedItem()
    },
    loadSelectedItem: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/announcement/get/${this.selectedId}`).then(res => {
        this.dataObject = res.data
        this.hasItemSelected = true
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('载入信息失败', {title: '提示'})
      })
    },
    submit: function () {
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/announcement/set/${this.selectedId}`, this.dataObject).then(_ => {
        this.$bvModal.msgBoxOk('保存成功！', {title: '提示'})
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('保存失败，请重试', {title: '提示'})
      })
    },
    remove: function () {
      this.$bvModal.msgBoxConfirm('确认删除？', {title: '警告', okTitle: '删除', okVariant: 'danger', cancelTitle: '取消'}).then(value => {
        if (value) {
          // eslint-disable-next-line no-unused-vars
          this.$http.post(`${window.backendOrigin}/api/admin/announcement/remove/${this.selectedId}`).then(_ => {
            location.reload()
          }, e => {
            console.log(e)
            this.$bvModal.msgBoxOk('删除失败，请重试', {title: '提示'})
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
