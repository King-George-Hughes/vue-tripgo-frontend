import axiosClient from '@/api/axiosClient'
import { useMutation } from '@tanstack/vue-query'

const useSignup = () => {
  return useMutation({
    mutationFn: async (credentials) =>
      await axiosClient
        .post('/user/signup', credentials)
        .then(({ data }) => {
          return data
        })
        .catch((error) => {
          console.log(error)
        }),

    onSuccess: () => {}
  })
}

export default useSignup
