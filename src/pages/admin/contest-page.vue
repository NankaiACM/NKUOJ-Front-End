<template>
  <div class="container">
    <item-select-card api="contest" @select="onItemSelected"></item-select-card>

    <b-card class="mt-4 p-3 mb-4" v-if="hasItemSelected">
      <div class="form-group">
        <label>竞赛或考试名称：</label>
        <b-form-input type="text" v-model="dataObject.name"></b-form-input>
        <small class="form-text text-muted">竞赛或考试名称。</small>
      </div>
      <div class="form-group">
        <label>竞赛或考试ID：</label>
        <b-form-input type="text" v-model="selectedId" disabled></b-form-input>
        <small class="form-text text-muted">竞赛或考试的索引ID，不可修改。</small>
      </div>
      <div class="form-group">
        <label>竞赛或考试介绍：</label>
        <b-form-textarea v-model="dataObject.description"></b-form-textarea>
        <small class="form-text text-muted">竞赛或考试介绍，可以留空。</small>
      </div>
      <div class="form-group">
        <label>竞赛或考试开始时间：</label>
        <b-form-datepicker v-model="dataObject.startDate" locale="zh" class="mb-1"></b-form-datepicker>
        <b-form-timepicker v-model="dataObject.startTime" locale="zh" class="mb-1"></b-form-timepicker>
        <small class="form-text text-muted">竞赛或考试开始时间，在这个时间之后才可加入。</small>
      </div>
      <div class="form-group">
        <label>竞赛或考试截止时间：</label>
        <b-form-datepicker v-model="dataObject.endDate" locale="zh" class="mb-1"></b-form-datepicker>
        <b-form-timepicker v-model="dataObject.endTime" locale="zh" class="mb-1"></b-form-timepicker>
        <small class="form-text text-muted">竞赛或考试截止时间，在这个时间之后禁止提交。</small>
      </div>
      <div class="form-group">
        <label>题目：</label>
        <b-form-tags input-id="tags-basic" v-model="dataObject.problems" input-type="text" add-button-text="添加" placeholder="添加题目..." duplicate-tag-text="题目重复" invalid-tag-text="题目不合法"></b-form-tags>
        <small class="form-text text-muted">请添加需要完成的题目ID。请确保题目未被设为私有。</small>
      </div>
      <div class="form-group">
        <label>参加该竞考的课程：</label>
        <b-form-tags input-id="tags-basic" v-model="dataObject.assignedCourses" input-type="text" add-button-text="添加" placeholder="添加..." duplicate-tag-text="重复" invalid-tag-text="不合法"></b-form-tags>
        <small class="form-text text-muted">参加该竞考的课程的所有学生会自动报名该竞赛考试。</small>
      </div>
      <div class="form-group">
        <label>参加该竞考的学生：</label>
        <b-form-tags input-id="tags-basic" v-model="dataObject.assignedUsers" input-type="text" add-button-text="添加" placeholder="添加..." duplicate-tag-text="重复" invalid-tag-text="不合法"></b-form-tags>
        <small class="form-text text-muted">参加该竞考的学生会自动报名该竞赛考试。</small>
      </div>
      <div class="form-group">
        <label>反作弊：</label>
        <b-form-checkbox v-model="dataObject.enableAntiCheat" name="开启反作弊">开启反作弊</b-form-checkbox>
        <small class="form-text text-muted">开启反作弊之后，该竞赛或考试将会开启严格的验证制度。建议应用于考试。</small>
      </div>
      <div class="form-group" v-if="dataObject.enableAntiCheat">
        <label>验证用口令：</label>
        <b-form-input type="text" v-model="dataObject.securityCode"></b-form-input>
        <small class="form-text text-muted">使用该口令可以在开场十五分钟以内登入竞赛或考试。请将该口令公布于所有考生。不建议修改。</small>
      </div>
      <div class="form-group" v-if="dataObject.enableAntiCheat">
        <label>验证用密码：</label>
        <b-form-input type="text" v-model="dataObject.password"></b-form-input>
        <small class="form-text text-muted">使用该口令可以在开场十五分钟后登入竞赛或考试。<span class="text-danger">为防作弊，请勿将密码公布！如有需要，请您亲自输入密码，不要告诉考生。</span>不建议修改。</small>
      </div>
      <div class="form-group">
        <label>排行榜：</label>
        <b-form-checkbox v-model="dataObject.enableRanking" name="开启排行榜">开启排行榜</b-form-checkbox>
        <small class="form-text text-muted">开启排行榜后，用户可以查看竞赛排名和其他人解题状态。建议应用于竞赛。</small>
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
  name: 'contest-page',
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
        endDate: '',
        endTime: '',
        startDate: '',
        startTime: '',
        problems: [],
        assignedUsers: [],
        assignedCourses: [],
        enableRanking: false,
        enableAntiCheat: false,
        password: '',
        securityCode: ''
      }
    }
  },
  methods: {
    onItemSelected: function (id) {
      this.selectedId = id
      this.loadSelectedItem()
    },
    loadSelectedItem: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/contest/get/${this.selectedId}`).then(res => {
        this.dataObject = res.data
        this.hasItemSelected = true
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('载入信息失败', {title: '提示'})
      })
    },
    submit: function () {
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/contest/set/${this.selectedId}`, this.dataObject).then(_ => {
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
          this.$http.post(`${window.backendOrigin}/api/admin/contest/remove/${this.selectedId}`).then(_ => {
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
