import axiosClient from '@/api/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useUserStore } from '@/stores/user'

const useCreateLocation = () => {
  const token = useUserStore().token
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (location) =>
      await axiosClient
        .post('/location', location, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ data }) => {
          return data
        })
        .catch((error) => {
          console.log(error)
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['locations']
      })
    }
  })
}

export default useCreateLocation
