<template>
  <div class="d-grid gap-2">
    <button class="btn btn-outline-purple p-3 rounded-4"><span class="h5"><IconSend class="me-3"/>提  交   题   目</span></button>
    <button class="btn btn-outline-success p-3 rounded-4"><span class="h5"><IconSendCheck class="me-3"/>提  交   记   录</span></button>
  </div>
</template>

<script>
import IconSend from "@/components/icons/IconSend.vue";
import IconSendCheck from "@/components/icons/IconSendCheck.vue";

export default {
  name: "ButtonSubmit",
  components: {IconSendCheck, IconSend},
  props: {
    pid: Number
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
