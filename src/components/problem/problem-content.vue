<template>
  <b-overlay :show="loading" rounded="sm">
    <div class="card mt-4">
      <div class="p-5">
        <div v-html="problemMarkDown"></div>
      </div>
    </div>
  </b-overlay>
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
  name: "problem-content",
  props: {
    markdownText: String,
    loading: Boolean
  },
  data: function () {
    return {
      problemMarkDown: ''
    }
  },
  methods: {
    getMarkMathjaxLatex () {
      let markdown = this.markdownText
      window.markdown = markdown
      return markdownItObject.render(markdown)
    },
    loadMarkdownView: function () {
      this.problemMarkDown = this.getMarkMathjaxLatex()
    }
  },
  watch: {
    markdownText: {
      handler() {
        this.loadMarkdownView()
      }
    }
  }
}
</script>

<style scoped>

</style>
