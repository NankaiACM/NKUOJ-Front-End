<template>
  <ModalBase v-model="internalShow" title="索引题目"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="索引"
             :cancel-button="true" cancel-class="btn-outline-primary" cancel-text="取消"
             @ok="ok()" @close="dismiss()" @cancel="dismiss()">
    <div class="container">
      <div class="form-row align-items-center">
        <div class="container">
          <label class="mb-2">题目编号：</label>
          <div class="input-group mb-2">
            <input type="number" class="form-control" v-model="id" @keydown.enter="ok()">
          </div>
        </div>
      </div>
    </div>
  </ModalBase>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";

export default {
  name: "ModalAdminIndexProblem",
  components: {ModalBase},
  data: function () {
    return {
      internalShow: false,
      id: null
    }
  },
  methods: {
    dismiss: function () {
      this.internalShow = false;
    },
    show: function () {
      this.internalShow = true;
    },
    ok: function () {
      this.$emit('then', this.id);
      this.internalShow = false;
    }
  }
}
</script>

<style scoped>

</style>
