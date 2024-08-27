import axiosClient from '@/api/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreateLocation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (location) =>
      await axiosClient
        .post('/location', location)
        .then(({ data }) => {
          console.log(data)
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
