<template>
  <div class="container">
    <item-select-card api="user" @select="onItemSelected" :newable="false"></item-select-card>

    <b-card class="mt-4 p-3 mb-4" v-if="hasItemSelected">
      <div class="form-group">
        <label>用户名：</label>
        <b-form-input type="text" v-model="dataObject.username"></b-form-input>
        <small class="form-text text-muted">用户名，用户使用该邮箱注册。极不建议修改！会导致该用户无法登录。</small>
      </div>
      <div class="form-group">
        <label>用户ID：</label>
        <b-form-input type="text" v-model="selectedId" disabled></b-form-input>
        <small class="form-text text-muted">用户的索引ID，不可修改。</small>
      </div>
      <div class="form-group">
        <label>用户昵称：</label>
        <b-form-input type="text" v-model="dataObject.nickname"></b-form-input>
        <small class="form-text text-muted">用户昵称，一般是姓名。</small>
      </div>
      <div class="form-group">
        <label>权限组：</label>
        <b-form-select v-model="dataObject.permission" :options="[
          { value: 0, text: '学生' },
          { value: 1, text: '教师' }]"></b-form-select>
        <small class="form-text text-muted">选择用户权限组。</small>
      </div>
      <div class="container d-flex justify-content-center">
        <b-button-group>
          <b-button variant="outline-info" @click="submit">保存并提交</b-button>
          <b-button variant="danger" @click="remove">移除用户</b-button>
        </b-button-group>
      </div>
    </b-card>
  </div>
</template>

<script>
import itemSelectCard from '../../components/admin/admin-item-select-card'

export default {
  name: 'user-page',
  components: {
    itemSelectCard
  },
  data () {
    return {
      selectedId: '',
      hasItemSelected: false,
      dataObject: {
        username: '',
        nickname: '',
        permission: 0
      }
    }
  },
  methods: {
    onItemSelected: function (id) {
      this.selectedId = id
      this.loadSelectedItem()
    },
    loadSelectedItem: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/user/get/${this.selectedId}`).then(res => {
        this.dataObject = res.data
        this.hasItemSelected = true
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('载入信息失败', {title: '提示'})
      })
    },
    submit: function () {
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/user/set/${this.selectedId}`, this.dataObject).then(_ => {
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
          this.$http.post(`${window.backendOrigin}/api/admin/user/remove/${this.selectedId}`).then(_ => {
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
