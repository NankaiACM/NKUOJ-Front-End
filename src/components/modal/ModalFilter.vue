<template>
  <ModalBase v-model="internalShow" title="筛选"
             :ok-button="true" ok-class="btn-outline-purple" ok-text="确定"
             :cancel-button="false" :esc-to-close="false"
             @ok="dismiss()" @close="dismiss()" @cancel="dismiss()">
    <div class="container">
      <div class="form-row align-items-center">
        <div class="container">
          <label>用户UID：（您的UID：{{self_uid}}）</label>
          <div class="input-group mb-2">
            <input type="number" class="form-control" placeholder="不设限制" :value="uid" @input="$emit('update:uid', $event.target.value)">
          </div>
        </div>
        <div class="container">
          <label>用户昵称：</label>
          <div class="input-group mb-2">
            <input type="text" id="signupPasswordInput1" class="form-control" placeholder="不设限制" :value="nickname" @input="$emit('update:nickname', $event.target.value)">
          </div>
        </div>
        <div class="container">
          <label>题目 PID：</label>
          <div class="input-group mb-2">
            <input type="number" class="form-control" placeholder="不设限制" :value="pid" @input="$emit('update:pid', $event.target.value)">
          </div>
        </div>
      </div>
    </div>
  </ModalBase>
</template>

<script>
import ModalBase from "@/components/modal/ModalBase.vue";

export default {
  name: "ModalFilter",
  components: {ModalBase},
  data: function () {
    return {
      internalShow: false,
    }
  },
  props: {
    self_uid: Number,
    nickname: String,
    pid: Number,
    uid: Number
  },
  emits: ['update:pid', 'update:uid', 'update:nickname'],
  methods: {
    dismiss: function () {
      this.internalShow = false;
      this.$emit('change');
    },
    show: function () {
      this.internalShow = true;
      this.$emit('change');
    }
  }
}
</script>

<style scoped>

</style>
