<template>
  <div class="oj-pattern-background">
    <HeadBarPublic class="w-100">
    </HeadBarPublic>
    <div>
      <RouterView/>
    </div>
  </div>
</template>

<script>
import HeadBarPublic from "@/components/headbar/HeadBarPublic.vue";

export default {
  components: {HeadBarPublic},
  name: 'AppPublic'
}
</script>

<style>
</style>
