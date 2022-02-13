<template>
  <div class="container">
    <item-select-card api="course" @select="onItemSelected"></item-select-card>

    <b-card class="mt-4 p-3 mb-4" v-if="hasItemSelected">
      <div class="form-group">
        <label>课程名称：</label>
        <b-form-input type="text" v-model="dataObject.name"></b-form-input>
        <small class="form-text text-muted">课程的标题。</small>
      </div>
      <div class="form-group">
        <label>课程ID：</label>
        <b-form-input type="text" v-model="selectedId" disabled></b-form-input>
        <small class="form-text text-muted">课程的索引ID，不可修改。</small>
      </div>
      <div class="form-group">
        <label>课程学期：</label>
        <b-form-input type="text" v-model="dataObject.semester"></b-form-input>
        <small class="form-text text-muted">课程的学期。例如“2077年秋季学期”。</small>
      </div>
      <div class="form-group">
        <label>课程编号：</label>
        <b-form-input type="text" v-model="dataObject.number"></b-form-input>
        <small class="form-text text-muted">课程在教务系统中的编号。</small>
      </div>
      <div class="form-group">
        <label>课程介绍：</label>
        <b-form-textarea v-model="dataObject.description"></b-form-textarea>
        <small class="form-text text-muted">课程介绍，可以留空。</small>
      </div>
      <div class="form-group">
        <label>教师：</label>
        <b-form-tags input-id="tags-basic" v-model="dataObject.teachers" input-type="text" add-button-text="添加" placeholder="添加用户名..." duplicate-tag-text="用户名重复" invalid-tag-text="用户名不合法"></b-form-tags>
        <small class="form-text text-muted">所有教师均对该课程有操作权限。请输入该教师的用户名。请注意，若注册邮箱为000001@nankai.edu.cn，那么用户名为000001。用户名同样可以在主页看到，@符号右边的内容就是用户名。</small>
      </div>
      <div class="form-group">
        <label>学生：</label>
        <b-form-tags input-id="tags-basic" v-model="dataObject.students" input-type="text" add-button-text="添加" placeholder="添加用户名..." duplicate-tag-text="用户名重复" invalid-tag-text="用户名不合法"></b-form-tags>
        <small class="form-text text-muted">请输入学生用户名（学生学号）。</small>
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
  name: 'course-page',
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
        semester: '',
        teachers: [],
        students: [],
        number: ''
      }
    }
  },
  methods: {
    onItemSelected: function (id) {
      this.selectedId = id
      this.loadSelectedItem()
    },
    loadSelectedItem: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/course/get/${this.selectedId}`).then(res => {
        this.dataObject = res.data
        this.hasItemSelected = true
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('载入信息失败', {title: '提示'})
      })
    },
    submit: function () {
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/course/set/${this.selectedId}`, this.dataObject).then(_ => {
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
          this.$http.post(`${window.backendOrigin}/api/admin/course/remove/${this.selectedId}`).then(_ => {
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
