<template>
  <b-modal id="clone-modal" title="克隆" centered ok-title="克隆" cancel-title="取消" @ok="submit">
    <div class="container">
      <form>
        <div class="form-group">
          <label>克隆到</label>
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
import code2str from "@/code/code";

export default {
  name: "admin-problem-clone-modal",
  props: {
    pid: Number
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
        `${window.backendOrigin}/api/admin/problem/fork/${this.pid}/global`,
        `${window.backendOrigin}/api/admin/problem/fork/${this.pid}/into/${this.psid}`][this.type]

      this.$http.get(createUrl).then(res => {
        this.$bvModal.msgBoxOk(`克隆成功，新题目ID为#${res.data}`, {centered: true, title: '提示'})
        this.$emit('select', res.data)
      }, e => {
        console.log(e)
        this.$bvModal.msgBoxOk(code2str(e.status), {centered: true, title: '克隆失败'})
      })
    },
    show: function () {
      this.$bvModal.show('clone-modal')
    }
  }
}
</script>

<style scoped>

</style>
