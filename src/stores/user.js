import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const token = ref(undefined)

  function setUser(user) {
    user.value = user
  }

  function setToken(token) {
    token.value = token
  }

  return { user, setUser, token, setToken }
})
