<template>
  <b-skeleton-wrapper :loading="loading">
    <template #loading>
      <b-card>
        <b-skeleton :width="`${Math.floor(Math.random() * 80 + 20)}%`"
                    v-for="i in Array(42).keys()" :key="i"></b-skeleton>
      </b-card>
    </template>
    <b-card class="p-3">
      <div v-html="markdownView" v-if="type === 'md'"></div>
      <vue-pdf-embed :source="`data:application/pdf;base64,${content}`" v-else-if="type === 'pdf'"/>
    </b-card>
  </b-skeleton-wrapper>
</template>

<script>
import markdownIt from 'markdown-it'
import markdownItMathjax from 'markdown-it-mathjax'
import markdownItLatex from 'markdown-it-latex'
import 'markdown-it-latex/dist/index.css'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

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
  components: {
    VuePdfEmbed: VuePdfEmbed
  },
  props: {
    content: String,
    loading: Boolean,
    type: String
  },
  data: function () {
    return {
      markdownView: '',
    }
  },
  methods: {
    getMarkMathjaxLatex () {
      let markdown = Buffer.from(this.content, 'base64').toString('utf-8');
      window.markdown = markdown
      return markdownItObject.render(markdown)
    },
    loadMarkdownView: function () {
      this.markdownView = this.getMarkMathjaxLatex()
    },
    loadPDFView: function () {

    },
    reload: function () {
      if (this.type === 'pdf') {
        this.loadPDFView()
      } else if (this.type === 'md') {
        this.loadMarkdownView()
      }
    }
  },
  watch: {
    content: function () {
      this.reload()
    }
  }
}
</script>

<style scoped>

</style>
