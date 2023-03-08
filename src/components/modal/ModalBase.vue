<template>
  <VueFinalModal class="d-flex justify-content-center align-items-center h-100 w-100" overlayTransition="vfm-fade" contentTransition="vfm-fade">
    <div :class="`modal${large ? ' modal-lg' : ''}${small ? ' modal-sm' : ''}`">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="this.$emit('close')"></button>
          </div>
          <div class="modal-body">
            <slot/>
          </div>
          <div class="modal-footer" v-if="okButton || cancelButton">
            <button type="button" :class="`btn ${cancelClass}`" v-if="cancelButton" @click="this.$emit('cancel')">{{ cancelText }}</button>
            <button type="button" :class="`btn ${okClass}`" v-if="okButton" @click="this.$emit('ok')">{{ okText }}</button>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<script>
import {VueFinalModal} from "vue-final-modal";

export default {
  name: "ModalBase",
  props: {
    title: String,
    okButton: Boolean,
    cancelButton: Boolean,
    okText: String,
    cancelText: String,
    escToClose: Boolean,
    okClass: String,
    cancelClass: String,
    large: {type: Boolean, default: false},
    small: {type: Boolean, default: false}
  },
  components: {VueFinalModal}
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
