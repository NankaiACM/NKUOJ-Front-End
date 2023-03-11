<template>
<div class="card rounded-4 bg-light border-0 p-4 mb-2 h-100">
  <div v-if="loading">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
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
    <h5 class="text-purple mb-3">加载题目数据出现错误</h5>
  </div>
  <div v-html="markdownView" v-else-if="type === 'md'"></div>
  <div v-else-if="type === 'pdf'" class="d-flex flex-column justify-content-center align-items-center h-100">
    <IconPDFLarge class="text-purple mb-3"/>
    <h5 class="text-purple mb-3">PDF 题面，请下载查看</h5>
    <a class="btn btn-outline-purple" :download="`problem-${this.pid}.pdf`" :href="`data:application/pdf;base64,${this.content}`">下载</a>
  </div>
</div>
</template>

<script>
import IconPDFLarge from "@/components/icons/IconPDFLarge.vue";
import IconFileXLarge from "@/components/icons/IconFileXLarge.vue";

export default {
  name: "CardProblemContent",
  components: {IconFileXLarge, IconPDFLarge},
  props: {
    loading: Boolean,
    error: Boolean,
    pid: Number
  },
  data: function () {
    return {
      markdownView: '',
      content: '',
      type: ''
    }
  },
  methods: {
    loadMarkdownView: function (content) {
      const json = this.b64DecodeUnicode(content);
      try {
        const jsonObject = JSON.parse(json);
        if (jsonObject['html'])
          this.markdownView = jsonObject['html'];
        else
          this.markdownView = json;
      } catch (e) {
        this.markdownView = json;
      }
    },
    load: function (content, type) {
      this.type = type;
      if (type === 'pdf') {
        this.content = content;
      } else if (type === 'md') {
        this.loadMarkdownView(content);
      }
    },
    b64DecodeUnicode: function(str) {
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
  }
}
</script>

<style scoped>

</style>
