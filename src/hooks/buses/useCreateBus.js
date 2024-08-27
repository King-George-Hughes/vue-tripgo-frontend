import axiosClient from '@/api/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreateBus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (bus) =>
      await axiosClient
        .post('/bus', bus)
        .then(({ data }) => {
          console.log(data)
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
