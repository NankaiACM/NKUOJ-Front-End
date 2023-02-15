import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'vue-final-modal/style.css'
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
    }
    const fromStorage = serializer.deserialize(window.localStorage.getItem(storeId))
    if (fromStorage) {
        context.store.$patch(fromStorage)
    }
    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serializer.serialize(state))
    })
})

app.use(pinia)
app.use(vfm)
app.use(router)

app.mount('#app')
