import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreateDriver = () => {
  const token = useUserStore().token
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (driver) =>
      await axiosClient
        .post('/driver', driver, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ data }) => {
          console.log(data)
          return data
        })
        .catch((error) => {
          console.log(error)
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['drivers']
      })
    }
  })
}

export default useCreateDriver
