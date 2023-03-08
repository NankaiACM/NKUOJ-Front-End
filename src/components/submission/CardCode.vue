<template>
  <div class="card rounded-4 bg-light border-0 p-4 mb-2">
    <h5 class="d-inline-flex align-items-center mb-3">
      <IconCodeSquare/>
      <span class="ms-2 me-1">提交的代码</span>
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
    <div v-else-if="code">
      <pre v-if="Number(lang) === 5"><code>{{code}}</code></pre>
      <highlightjs v-else :language="langCodeToHighlightJSLang(Number(lang))" :code="code"/>
    </div>
    <div v-else>
      <p class="card-text">
        您没有权限查看该代码，可能是由于以下原因：
      </p>
      <ul>
        <li>只有代码的提交者将其设为公开后才能被查看</li>
        <li>为了防止抄袭代码，作业、考试、竞赛的提交在其截止之前不会向他人公开</li>
        <li>若您正在参加考试或竞赛，您无法查看先前提交过的任何代码</li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconUIChecksGrid from "@/components/icons/IconUIChecksGrid.vue";
import IconChevronDoubleRightSmall from "@/components/icons/IconChevronDoubleRightSmall.vue";
import IconFileXLarge from "@/components/icons/IconFileXLarge.vue";
import IconCodeSquare from "@/components/icons/IconCodeSquare.vue";
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

export default {
  name: "CardCode",
  components: {IconCodeSquare, IconFileXLarge, IconChevronDoubleRightSmall, IconUIChecksGrid, highlightjs: hljsVuePlugin.component},
  props: {
    loading: Boolean,
    error: Boolean,
    code: String,
    lang: Number
  },
  methods: {
    langCodeToHighlightJSLang: function (code) {
      const codeText = {
        0: 'c',
        1: 'cpp',
        2: 'python',
        3: 'javascript',
        4: 'go',
        6: 'python',
      }
      if (!(code in codeText)) {
        return ''
      }
      return codeText[code]
    },
  }
}
</script>

<style scoped>

</style>
