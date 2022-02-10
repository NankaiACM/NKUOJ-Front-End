<template>
  <div class="container">
    <item-select-card api="problem" @select="onItemSelected"></item-select-card>

    <b-card class="mt-4 p-3 mb-4" v-if="hasItemSelected">
      <div class="form-group">
        <label>题目名称：</label>
        <b-form-input type="text" v-model="dataObject.name"></b-form-input>
        <small class="form-text text-muted">题目的标题。</small>
      </div>
      <div class="form-group">
        <label>题目ID：</label>
        <b-form-input type="text" v-model="selectedId" disabled></b-form-input>
        <small class="form-text text-muted">题目的索引ID，不可修改。</small>
      </div>
      <div class="form-group">
        <label>题目内容：</label>
        <b-form-textarea v-model="dataObject.content"></b-form-textarea>
        <small class="form-text text-muted">题面。使用Markdown语言，暂不支持预览；建议使用Typora编辑后复制到这里。</small>
      </div>
      <div class="form-group">
        <label>时间限制：</label>
        <b-form-input type="number" v-model="dataObject.time"></b-form-input>
        <small class="form-text text-muted">以ms为单位，是单个测试点的限时。</small>
      </div>
      <div class="form-group">
        <label>内存限制：</label>
        <b-form-input type="number" v-model="dataObject.memory"></b-form-input>
        <small class="form-text text-muted">以kb为单位，是单个测试点的内存限制，包括程序的运行时所占用的内存。</small>
      </div>
      <div class="form-group">
        <label>公开度：</label>
        <b-form-select v-model="dataObject.publicity" :options="[
          { value: 0, text: '不公开' },
          { value: 1, text: '半公开，仅作业、考试可用' },
          { value: 2, text: '完全公开，任何人可见' }]"></b-form-select>
        <small class="form-text text-muted">请勿将用于考试的题目设置为完全公开，否则会造成泄题。建议考试结束后更改为公开，便于学生自主练习。</small>
      </div>
      <div class="form-group">
        <label>难度：</label>
        <b-form-input v-model="dataObject.level" type="range" min="0" max="10"></b-form-input>
        <small class="form-text text-muted">请标注题目相对难度。</small>
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
  name: 'problem-page',
  components: {
    itemSelectCard
  },
  data () {
    return {
      selectedId: '',
      hasItemSelected: false,
      dataObject: {
        name: '',
        content: '',
        level: 0,
        publicity: 0,
        memory: 0,
        time: 0,
        enabledSpecialJudge: false,
        enabledDetailJudge: false
      }
    }
  },
  methods: {
    onItemSelected: function (id) {
      this.selectedId = id
      this.loadSelectedItem()
    },
    loadSelectedItem: function () {
      this.$http.get(`${window.backendOrigin}/api/admin/problem/get/${this.selectedId}`).then(res => {
        this.dataObject = res.data
        this.hasItemSelected = true
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk('载入信息失败', {title: '提示'})
      })
    },
    submit: function () {
      // eslint-disable-next-line no-unused-vars
      this.$http.post(`${window.backendOrigin}/api/admin/problem/set/${this.selectedId}`, this.dataObject).then(_ => {
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
          this.$http.post(`${window.backendOrigin}/api/admin/problem/remove/${this.selectedId}`).then(_ => {
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
