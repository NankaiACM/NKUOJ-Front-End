<script>
import { RouterView } from 'vue-router'
export default {
  name: "App",
  components: {
    RouterView
  },
  mounted() {
    const today = new Date();
    if (today.getMonth() + 1 === 4 && today.getDate() === 1) {
      const element = document.createElement("link");
      element.setAttribute("rel", "stylesheet");
      element.setAttribute("type", "text/css");
      element.setAttribute("href", "/public/main.tju.css");
      document.getElementsByTagName("head")[0].appendChild(element);
      document.title = "TJU-OJ";
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = '/public/favicon-tju.ico';
      document.head.querySelector('link[rel="icon"]').remove(); // remove old favicon
      document.head.appendChild(newFavicon); // append new favicon
    }
  }
}
</script>

<template>
  <RouterView />
</template>

<style>

</style>
