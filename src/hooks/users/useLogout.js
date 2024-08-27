import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const useLogout = () => {
  const userStore = useUserStore()
  const toast = useToast()
  const router = useRouter()

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
      userStore.setToken('')
      userStore.setUser({})

      router.push('/')

      toast.success('Successfully Logged Out!')
    },

    onError: () => {
      toast.error('There was an error!')
    }
  })
}

export default useLogout
