<template>
  <VueFinalModal class="d-flex justify-content-center align-items-center h-100 w-100" v-model="internalShow" overlayTransition="vfm-fade" contentTransition="vfm-fade">
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
            <button type="button" :class="`btn btn-outline-purple`" @click="this.dismiss()"> 继续 </button>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<script>
import {VueFinalModal} from "vue-final-modal";

export default {
  name: "ModalMsgBox",
  data: function () {
    return {
      title: '',
      message: '',
      internalShow: false
    }
  },
  components: {VueFinalModal},
  methods: {
    show: function (title, message) {
      this.title = title
      this.message = message
      this.internalShow = true
    },
    dismiss: function () {
      this.internalShow = false
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