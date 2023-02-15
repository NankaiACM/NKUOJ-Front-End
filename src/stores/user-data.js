import {computed, ref} from 'vue'
import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('user-data', () => {
  const uid = ref(0)
  const username = ref('')
  const nickname = ref('')
  const valid = ref(false)
  const permission = ref(0)

  function setUID(newUID) {
    uid.value = newUID
  }

  function setUsername(newUsername) {
    username.value = newUsername
  }

  function setNickname(newNickname) {
    nickname.value = newNickname
  }

  function setPermission(permissionLevel) {
    permission.value = permissionLevel
  }

  function setValid() {
    valid.value = true
  }

  function clear() {
    valid.value = false
    nickname.value = ''
    username.value = ''
    uid.value = 0
    permission.value = 0
  }

  const isAdministrator = computed(() => permission.value > 0)

  return { uid, username, nickname, valid, permission, setUID, setUsername, setNickname, setPermission, setValid, clear, isAdministrator }
})
