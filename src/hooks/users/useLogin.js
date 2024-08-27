import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useMutation } from '@tanstack/vue-query'

const useLogin = () => {
  const userStore = useUserStore()

  return useMutation({
    mutationFn: async (credentials) =>
      await axiosClient
        .post('/auth/login', credentials)
        .then(({ data }) => {
          return data
        })
        .catch((error) => {
          console.log(error)
        }),

    onSuccess: (data) => {
      userStore.setToken(data.token)
      userStore.setUser(data.user)
    }
  })
}

export default useLogin
