<template>
  <ModalBase v-model="internalShow" title="请输入口令"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="跳转"
             :cancel-button="true" cancel-class="btn-outline-primary" cancel-text="取消"
             @ok="ok()" @close="dismiss()" @cancel="dismiss()">
    <div class="container">
      <div class="form-row align-items-center">
        <div class="container">
          <label>口令：</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" v-model="passcode" @keydown.enter="ok()">
          </div>
        </div>
      </div>
    </div>
  </ModalBase>

</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";

export default {
  name: "ModalAddCoursePasscode",
  components: {ModalBase},
  data: function () {
    return {
      internalShow: false,
      passcode: null,
      callback: null
    }
  },
  methods: {
    dismiss: function () {
      this.internalShow = false;
    },
    show: function (callback) {
      this.passcode = '';
      this.internalShow = true;
      this.callback = callback;
    },
    ok: function () {
      this.internalShow = false;
      this.callback(this.passcode);
    }
  }
}
</script>

<style scoped>

</style>
