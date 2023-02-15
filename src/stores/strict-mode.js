import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStrictModeStore = defineStore('strict-mode', () => {
  const clientStrictMode = ref(false)
  const serverStrictMode = ref(false)

  function setClientStrictMode(mode) {
    clientStrictMode.value = mode
  }

  function setServerStrictMode(mode) {
    serverStrictMode.value = mode
  }

  return { clientStrictMode, serverStrictMode, setClientStrictMode, setServerStrictMode }
})
