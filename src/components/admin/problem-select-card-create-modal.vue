<template>
  <b-modal id="create-modal" title="新建项目" centered ok-title="新建" cancel-title="取消" @ok="submit">
    <div class="container">
      <form>
        <div class="form-group">
          <label>新建到</label>
          <b-form-select v-model="type" :options="options" id="codeLanguageSelect"></b-form-select>
        </div>
        <div class="form-group" v-if="type === 1">
          <label>题目集ID</label>
          <b-form-input v-model="psid" placeholder="题目集的ID"></b-form-input>
        </div>
      </form>
    </div>
  </b-modal>
</template>

<script>
import code2str from "@/util/http-code-to-str";

export default {
  name: "problem-select-card-create-modal",
  props: {
    api: String,
    createDummy: Object
  },
  data: function () {
    return {
      type: -1,
      psid: '',
      options:
        [{ value: -1, text: '请选择...', disabled: true },
        { value: 0, text: '公开' },
        { value: 1, text: '属于某个题目集...' }],
      validateResults: ['', '未选择目的', '未填写题目集ID'],
    }
  },
  methods: {
    validateSubmitForm: function () {
      if (this.type === -1) {
        return 1
      } else if (this.type === 1 && this.psid === '') {
        return 2
      }
      return 0
    },
    submit: function () {
      const validateResult = this.validateSubmitForm()
      if (validateResult) {
        this.$bvModal.msgBoxOk(this.validateResults[validateResult], {centered: true, title: '新建失败'})
        return
      }

      const createUrl = [
        `${window.backendOrigin}/api/admin/${this.api}/create/global`,
        `${window.backendOrigin}/api/admin/${this.api}/create/into/${this.psid}`][this.type]

      this.$http.post(createUrl, this.createDummy).then(res => {
        this.$bvModal.msgBoxOk('新建成功', {centered: true, title: '提示'})
        this.$emit('select', res.data)
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '新建失败'})
      })
    },
    show: function () {
      this.$bvModal.show('create-modal')
    }
  }
}
</script>

<style scoped>

</style>
