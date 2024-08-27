import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useMutation } from '@tanstack/vue-query'

const useLogout = () => {
  const userStore = useUserStore()

  return useMutation({
    mutationFn: async () =>
      await axiosClient
        .post('/auth/logout')
        .then(({ data }) => {
          return data
        })
        .catch((error) => {
          console.log(error)
        }),

    onSuccess: () => {
      userStore.setToken(undefined)
      userStore.setUser({})
    }
  })
}

export default useLogout
