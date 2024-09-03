import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreateBus = () => {
  const token = useUserStore().token
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (bus) =>
      await axiosClient
        .post('/bus', bus, {
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
        queryKey: ['buses']
      })
    }
  })
}

export default useCreateBus
