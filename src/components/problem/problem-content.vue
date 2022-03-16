<template>
  <b-skeleton-wrapper :loading="loading">
    <template #loading>
      <b-card>
        <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                    v-for="i in Array(42).keys()" :key="i"></b-skeleton>
      </b-card>
    </template>
    <b-card class="p-3">
      <div v-html="problemMarkDown"></div>
    </b-card>
  </b-skeleton-wrapper>
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
