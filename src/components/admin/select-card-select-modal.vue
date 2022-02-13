<template>
  <b-modal id="select-modal" title="选择项目" centered ok-title="确定" cancel-title="取消" @ok="submit">
    <div class="container">
      <div class="form-group">
        <label>ID:</label>
        <b-form-input type="text" v-model="itemID"></b-form-input>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "select-card-select-modal",
  props: {
    api: String
  },
  data: function () {
    return {
      itemID: ''
    }
  },
  methods: {
    show: function () {
      this.$bvModal.show('select-modal')
    },
    submit: function () {
      if (this.itemID === '') {
        this.$bvModal.msgBoxOk('ID不能为空', {centered: true, title: '提示'})
      } else {
        this.$emit('select', this.itemID)
      }
    }
  }
}
</script>

<style scoped>

</style>
