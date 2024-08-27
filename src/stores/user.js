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

// import { ref, watch } from 'vue'
// import { defineStore } from 'pinia'

// export const useUserStore = defineStore('user', () => {
//   const user = ref(JSON.parse(localStorage.getItem('user')) || {})
//   const token = ref(localStorage.getItem('token') || '')

//   function setUser(user) {
//     user.value = user
//   }

//   function setToken(token) {
//     token.value = token
//   }

//   // Watch for changes and save to localStorage
//   watch(
//     user,
//     (newUser) => {
//       localStorage.setItem('user', JSON.stringify(newUser))
//     },
//     { deep: true }
//   )

//   watch(token, (newToken) => {
//     localStorage.setItem('token', newToken)
//   })

//   return { user, setUser, token, setToken }
// })
