import markdownIt from 'markdown-it';
import markdownItMathjax from 'markdown-it-mathjax3';

export const compileMarkdown = function (content) {
  const markdownItObject = markdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  markdownItObject.use(markdownItMathjax);
  return markdownItObject.render(content);
}

