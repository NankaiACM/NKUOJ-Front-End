<template>
  <b-modal id="modal" title="预览" centered ok-only ok-title="关闭">
    <div class="p-2">
      <div v-html="problemMarkDown"></div>
    </div>
  </b-modal>
</template>

<script>
import markdownIt from 'markdown-it'
import markdownItMathjax from 'markdown-it-mathjax'
import markdownItLatex from 'markdown-it-latex'
import 'markdown-it-latex/dist/index.css'
const markdownItObject = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})

markdownItObject.use(markdownItMathjax)
markdownItObject.use(markdownItLatex)
window.markdownit = markdownItObject

export default {
  name: "admin-markdown-preview-modal",
  props: {
    markdownText: String
  },
  data: function () {
    return {
      problemMarkDown: ''
    }
  },
  methods: {
    show: function () {
      this.loadMarkdownView()
      this.$bvModal.show('modal')
    },
    getMarkMathjaxLatex () {
      let markdown = this.markdownText
      window.markdown = markdown
      return markdownItObject.render(markdown)
    },
    loadMarkdownView: function () {
      this.problemMarkDown = this.getMarkMathjaxLatex()
    }
  }
}
</script>

<style scoped>

</style>
