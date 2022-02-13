<template>
  <div class="container">
    <item-select-card api="assignment" @select="onItemSelected"></item-select-card>

    <b-card class="mt-4 p-3 mb-4" v-if="hasItemSelected">
      <div class="form-group">
        <label>作业名称：</label>
        <b-form-input type="text" v-model="dataObject.name"></b-form-input>
        <small class="form-text text-muted">作业的标题。</small>
      </div>
      <div class="form-group">
        <label>作业ID：</label>
        <b-form-input type="text" v-model="selectedId" disabled></b-form-input>
        <small class="form-text text-muted">作业的索引ID，不可修改。</small>
      </div>
      <div class="form-group">
        <label>所属课程的索引ID：</label>
        <b-form-input type="text" v-model="dataObject.courseId"></b-form-input>
        <small class="form-text text-muted">作业所属的课程ID。请确保该ID有效！</small>
      </div>
      <div class="form-group">
        <label>作业介绍：</label>
        <b-form-textarea v-model="dataObject.description"></b-form-textarea>
        <small class="form-text text-muted">作业介绍，可以留空。</small>
      </div>
      <div class="form-group">
        <label>作业发布时间：</label>
        <b-form-datepicker v-model="dataObject.postDate" locale="zh" class="mb-1"></b-form-datepicker>
        <b-form-timepicker v-model="dataObject.postTime" locale="zh" class="mb-1"></b-form-timepicker>
        <small class="form-text text-muted">发布时间，在这个时间之后作业才会出现。</small>
      </div>
      <div class="form-group">
        <label>作业截止时间：</label>
        <b-form-datepicker v-model="dataObject.deadlineDate" locale="zh" class="mb-1"></b-form-datepicker>
        <b-form-timepicker v-model="dataObject.deadlineTime" locale="zh" class="mb-1"></b-form-timepicker>
        <small class="form-text text-muted">截止时间，在这个时间之后作业禁止提交。</small>
      </div>
      <div class="form-group">
        <label>作业类型：</label>
        <b-form-select v-model="dataObject.type" :options="[
          { value: 0, text: '提交题目' },
          { value: 1, text: '提交文本' }]"></b-form-select>
        <small class="form-text text-muted">请选择作业类型。</small>
      </div>
      <div class="form-group" v-if="dataObject.type === 0">
        <label>题目：</label>
        <b-form-tags input-id="tags-basic" v-model="dataObject.problems" input-type="text" add-button-text="添加" placeholder="添加题目..." duplicate-tag-text="题目重复" invalid-tag-text="题目不合法"></b-form-tags>
        <small class="form-text text-muted">请添加需要完成的题目ID。请确保题目未被设为私有。</small>
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
import itemSelectCard from '../../components/admin/admin-problem-select-card'

export default {
  name: 'assignment-page',
  components: {
    itemSelectCard
  },
  data () {
    return {
      selectedId: '',
      hasItemSelected: false,
      dataObject: {
        name: '',
        description: '',
        deadlineDate: '',
        deadlineTime: '',
        postDate: '',
        postTime: '',
        type: 0,
        problems: [],
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
      this.$http.get(`${window.backendOrigin}/api/admin/assignment/get/${this.selectedId}`).then(res => {
        this.dataObject = res.data
        this.hasItemSelected = true
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('载入信息失败', {title: '提示'})
      })
    },
    submit: function () {
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/assignment/set/${this.selectedId}`, this.dataObject).then(_ => {
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
          this.$http.post(`${window.backendOrigin}/api/admin/assignment/remove/${this.selectedId}`).then(_ => {
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
