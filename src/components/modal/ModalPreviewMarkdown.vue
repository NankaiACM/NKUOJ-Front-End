<template>
  <VueFinalModal class="d-flex justify-content-center align-items-center h-100 w-100"
                 v-model="internalShow" overlayTransition="vfm-fade" contentTransition="vfm-fade">
    <div class="modal">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"> 预览 Markdown </h5>
            <button type="button" class="btn-close" @click="this.dismiss()"></button>
          </div>
          <div class="modal-body">
            <div v-html="compiledHtml"></div>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<script>
import {VueFinalModal} from "vue-final-modal";

export default {
  name: "ModalPreviewMarkdown",
  components: {VueFinalModal},
  data: function () {
    return {
      internalShow: false,
      compiledHtml: ''
    }
  },
  methods: {
    show: function (compiledHtml) {
      this.compiledHtml = compiledHtml;
      this.internalShow = true;
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
</style>
