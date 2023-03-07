<template>
  <ModalBase v-model="internalShow" title="跳转到提交记录"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="跳转"
             :cancel-button="true" cancel-class="btn-outline-primary" cancel-text="取消"
             @ok="ok()" @close="dismiss()" @cancel="dismiss()">
    <div class="container">
      <div class="form-row align-items-center">
        <div class="container">
          <label>记录ID：</label>
          <div class="input-group mb-2">
            <input type="number" class="form-control" v-model="submissionId" @keydown.enter="ok()">
          </div>
        </div>
      </div>
    </div>
  </ModalBase>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";

export default {
  name: "ModalJumpToSubmission",
  components: {ModalBase},
  data: function () {
    return {
      internalShow: false,
      submissionId: null
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
      this.$router.push(`/submission/${this.submissionId}`);
    }
  }
}
</script>

<style scoped>

</style>
