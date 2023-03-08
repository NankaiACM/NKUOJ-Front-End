<template>
  <div class="card rounded-4 bg-light border-0 p-4 mb-2">
    <h5 class="d-inline-flex align-items-center mb-3">
      <IconUIChecksGrid/>
      <span class="ms-2 me-1">测试点详情</span>
      <IconChevronDoubleRightSmall/>
    </h5>
    <div v-if="loading">
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7 me-2"></span>
        <span class="placeholder col-4 me-2"></span>
        <span class="placeholder col-4 me-2"></span>
        <span class="placeholder col-6 me-2"></span>
        <span class="placeholder col-8 me-2"></span>
        <span class="placeholder col-5 me-2"></span>
        <span class="placeholder col-12 me-2"></span>
        <span class="placeholder col-4 me-2"></span>
      </p>
    </div>
    <div v-else-if="error" class="d-flex flex-column justify-content-center align-items-center h-100">
      <IconFileXLarge class="text-purple mb-3"/>
      <h5 class="text-purple mb-3">加载提交信息出现错误</h5>
    </div>
    <div class="d-flex flex-wrap" v-else-if="details">
      <div :class="`btn disabled square-box m-1 btn-${statusToVariant(detail.status)}`" v-for="[i, detail] in details.entries()" :key="i">
        <div class="d-inline-flex flex-column justify-content-center align-items-center h-100 w-100">
          <h5 class="text-nowrap">{{statusToCode(detail.status)}}</h5>
          <small class="subtitle-text text-nowrap">{{detail.time}}ms/{{detail.memory >= 10000 ? `${Math.round(detail.memory / 1024)}M` : `${detail.memory}K`}}</small>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="card-text">
        无法查看测试点详情，可能是由于以下原因：
      </p>
      <ul>
        <li>对于编译失败的题目，代码未进行测试，您无法查看测试点通过详情</li>
        <li>非公开的提交不会向您提供测试点详情</li>
        <li>通过制的题目不会计分，亦不会提供测试点详情</li>
      </ul>
    </div>
  </div>
</template>

<script>
import status2code from '@/util/status-code-to-str-short'
import status2variant from '@/util/status-code-to-variant-str'
import IconUIChecksGrid from "@/components/icons/IconUIChecksGrid.vue";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconFileXLarge from "@/components/icons/IconFileXLarge.vue";

export default {
  name: "CardTestCase",
  components: {IconFileXLarge, IconChevronDoubleRightSmall, IconUIChecksGrid},
  props: {
    details: Array,
    loading: Boolean,
    error: Boolean
  },
  methods: {
    statusToCode: function (s) {
      return status2code(s)
    },
    statusToVariant: function (s) {
      return status2variant(s)
    }
  }
}
</script>

<style scoped>
.square-box {
  width: 100px;
  height: 100px;
}
.subtitle-text {
  font-size: 11px;
}
</style>
