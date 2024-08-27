import axiosClient from '@/api/axiosClient'
import { useMutation } from '@tanstack/vue-query'

const useCreateUser = () => {
  return useMutation({
    mutationFn: async (credentials) =>
      await axiosClient
        .post('/user', credentials)
        .then(({ data }) => {
          return data
        })
        .catch((error) => {
          console.log(error)
        }),

    onSuccess: () => {}
  })
}

export default useCreateUser
