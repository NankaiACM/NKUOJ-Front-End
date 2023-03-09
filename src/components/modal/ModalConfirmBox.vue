<template>
  <VueFinalModal class="d-flex justify-content-center align-items-center h-100 w-100"
                 v-model="internalShow" overlayTransition="vfm-fade" contentTransition="vfm-fade"
                 :esc-to-close="false">
    <div class="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="this.dismiss()"></button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" :class="`btn btn-outline-danger`" @click="this.cancel()"> 取消 </button>
            <button type="button" :class="`btn btn-outline-purple`" @click="this.ok()"> 确定 </button>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<script>
import {VueFinalModal} from "vue-final-modal";

export default {
  name: "ModalConfirmBox",
  data: function () {
    return {
      title: '',
      message: '',
      internalShow: false,
      then: null,
      fail: null
    }
  },
  components: {VueFinalModal},
  methods: {
    show: function (title, message, then = null, fail = null) {
      this.title = title;
      this.message = message;
      this.internalShow = true;
      this.then = then;
      this.fail = fail;
    },
    cancel: function () {
      this.internalShow = false;
      if (this.fail) {
        this.fail();
      }
      this.$emit('cancel');
    },
    ok: function () {
      this.internalShow = false;
      if (this.then) {
        this.then();
      }
      this.$emit('ok');
    },
    dismiss: function () {
      this.internalShow = false;
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  display: block;
}
.modal-header {
  border-bottom: none;
}
.modal-footer {
  border-top: none;
}
</style>
