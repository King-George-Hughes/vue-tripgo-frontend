import axiosClient from '@/api/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreateDriver = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (driver) =>
      await axiosClient
        .post('/driver', driver)
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
