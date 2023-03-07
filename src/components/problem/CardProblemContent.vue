<template>
<div class="card rounded-4 bg-light border-0 p-4 mb-2">
  <div v-html="markdownView" v-if="type === 'md'"></div>
</div>
</template>

<script>
import markdownIt from 'markdown-it';
import markdownItMathjax from 'markdown-it-mathjax';
import markdownItLatex from 'markdown-it-latex';
import 'markdown-it-latex/dist/index.css';

export default {
  name: "CardProblemContent",
  props: {
    loading: Boolean,
  },
  data: function () {
    return {
      markdownView: '',
      markdownItObject: null,
      content: '',
      type: ''
    }
  },
  methods: {
    getMarkMathjaxLatex: function (content) {
      if (this.markdownItObject === null) {
        this.markdownItObject = markdownIt({
          html: true,
          linkify: true,
          typographer: true
        });
        this.markdownItObject.use(markdownItMathjax);
        this.markdownItObject.use(markdownItLatex);
      }
      let markdown = this.b64DecodeUnicode(content);
      return this.markdownItObject.render(markdown);
    },
    loadMarkdownView: function (content) {
      this.markdownView = this.getMarkMathjaxLatex(content);
    },
    load: function (content, type) {
      this.type = type;
      if (type === 'pdf') {
        // this.loadPDFView()
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
