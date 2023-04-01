import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import 'vue-final-modal/style.css'

import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs_javascript from 'highlight.js/lib/languages/javascript';
import hljs_cpp from 'highlight.js/lib/languages/cpp';
import hljs_c from 'highlight.js/lib/languages/c';
import hljs_go from 'highlight.js/lib/languages/go';
import hljs_python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('javascript', hljs_javascript);
hljs.registerLanguage('cpp', hljs_cpp);
hljs.registerLanguage('c', hljs_c);
hljs.registerLanguage('go', hljs_go);
hljs.registerLanguage('python', hljs_python);

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
const vfm = createVfm()

// configure persistent storage with localstorage
pinia.use((context) => {
    const storeId = context.store.$id
    const serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    };
    const fromStorage = serializer.deserialize(window.localStorage.getItem(storeId));
    if (fromStorage) {
        context.store.$patch(fromStorage);
    }
    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serializer.serialize(state));
    });
});

app.use(pinia);
app.use(vfm);
app.use(router);
app.use(hljsVuePlugin);

app.mount('#app');
