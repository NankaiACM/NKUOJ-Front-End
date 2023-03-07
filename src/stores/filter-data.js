import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterDataStore = defineStore('filter-data', () => {
  const uid = ref(null)
  const pid = ref(null)
  const nickname = ref(null)

  function setUID(v) {
    uid.value = v
  }

  function setPID(v) {
    pid.value = v
  }

  function setNickname(v) {
    nickname.value = v;
  }

  return { uid, pid, nickname, setUID, setPID, setNickname }
})
