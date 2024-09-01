import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || {})
    const token = ref(localStorage.getItem('token') || '')

    function setUser(newUser) {
      user.value = newUser
    }

    function setToken(newToken) {
      token.value = newToken
    }

    return { user, setUser, token, setToken }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['user', 'token']
    }
  }
)
